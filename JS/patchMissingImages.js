import fs from 'fs';
import https from 'https';

const content = fs.readFileSync('src/data/aircrafts.js', 'utf8');
const jsonStr = content.substring(content.indexOf('['), content.lastIndexOf(']') + 1);
const aircrafts = JSON.parse(jsonStr);

const fetchRealExteriorImage = (searchTerm) => {
  return new Promise((resolve) => {
    const query = encodeURIComponent(searchTerm);
    const url = `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=${query}&gsrnamespace=6&gsrlimit=10&prop=imageinfo&iiprop=url`;

    https.get(url, { headers: { 'User-Agent': 'AircraftCompareBot/4.2' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.query && json.query.pages) {
            const pages = Object.values(json.query.pages);
            
            // Strictly enforce real exterior photos (only jpg, no diagrams, no drawings, no cockpits, no logos)
            const validPages = pages.filter(p => {
              if (!p.imageinfo || !p.imageinfo[0]) return false;
              const title = p.title.toLowerCase();
              return title.includes('.jpg') 
                  && !title.includes('logo') 
                  && !title.includes('diagram') 
                  && !title.includes('drawing') 
                  && !title.includes('cockpit')
                  && !title.includes('cabin')
                  && !title.includes('wing.')
                  && !title.includes('tail.');
            });
            
            if (validPages.length > 0) resolve(validPages[0].imageinfo[0].url);
            else resolve(null);
          } else resolve(null);
        } catch (e) {
          resolve(null);
        }
      });
    }).on('error', () => resolve(null));
  });
};

const delay = ms => new Promise(res => setTimeout(res, ms));

const run = async () => {
  const missingList = [
    "Aerospatiale Concorde Type 1", "Airbus A310-300", "Airbus A340-500", "Airbus A340-600", 
    "Antonov An-124-100", "Avro Vulcan B.1", "Avro Vulcan B.2", "Beechcraft King Air B200", 
    "Boeing 737-600", "Boeing 747-300", "Boeing 777-300", "Boeing 777-9", 
    "Bombardier Global 7500", "Cessna Citation X", "Dassault Mirage 2000D", "Embraer E175-200", 
    "Lockheed Martin F-16V Block 70", "Mikoyan MiG-29K", "Mikoyan-Gurevich MiG-17F", "Sukhoi Su-34"
  ];
  
  let patchedCount = 0;

  for (const plane of aircrafts) {
    if (missingList.includes(plane.name)) {
      console.log(`Fetching real exterior image for ${plane.name}...`);
      
      // Add 'inflight' or 'aircraft' to the search to strongly bias towards real external shots
      let img = await fetchRealExteriorImage(plane.name + ' inflight');
      if(!img) {
         await delay(400);
         img = await fetchRealExteriorImage(plane.name + ' landing');
      }
      if(!img) {
         await delay(400);
         img = await fetchRealExteriorImage(plane.name + ' aircraft');
      }

      if (img) {
        plane.image = img;
        console.log(` -> Found: ${img}`);
        patchedCount++;
      } else {
        console.log(` -> FAILED to find real image for ${plane.name}`);
      }
      await delay(400);
    }
  }

  const newContent = 'export const aircrafts = ' + JSON.stringify(aircrafts, null, 2) + ';';
  fs.writeFileSync('src/data/aircrafts.js', newContent);
  console.log(`Applied patch to ${patchedCount} missing / incorrect images.`);
};

run();
