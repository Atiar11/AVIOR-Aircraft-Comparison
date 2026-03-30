import fs from 'fs';
import https from 'https';

const content = fs.readFileSync('src/data/aircrafts.js', 'utf8');
const jsonStr = content.substring(content.indexOf('['), content.lastIndexOf(']') + 1);
const aircrafts = JSON.parse(jsonStr);

const fetchCommonsImage = (searchTerm) => {
  return new Promise((resolve) => {
    const query = encodeURIComponent(searchTerm);
    const url = `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=${query}&gsrnamespace=6&gsrlimit=2&prop=imageinfo&iiprop=url`;

    https.get(url, { headers: { 'User-Agent': 'AircraftCompareBot/3.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.query && json.query.pages) {
            const pages = Object.values(json.query.pages);
            const validPages = pages.filter(p => p.imageinfo && p.imageinfo[0] && !p.title.toLowerCase().includes('logo') && !p.title.toLowerCase().includes('.svg'));
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

const run = async () => {
  const modelsToFix = ["Airbus A340-200", "Airbus A340-300", "Airbus A340-500", "Airbus A340-600"];
  let patchedCount = 0;

  for (const plane of aircrafts) {
    if (modelsToFix.includes(plane.name)) {
      console.log(`Fetching live image for ${plane.name}...`);
      const img = await fetchCommonsImage(plane.name + ' aircraft');
      if (img) {
        plane.image = img;
        console.log(` -> Found: ${img}`);
        patchedCount++;
      } else {
        console.log(` -> Failed to find image for ${plane.name}`);
      }
    }
  }

  const newContent = 'export const aircrafts = ' + JSON.stringify(aircrafts, null, 2) + ';';
  fs.writeFileSync('src/data/aircrafts.js', newContent);
  console.log(`Applied patch to ${patchedCount} aircraft.`);
};

run();
