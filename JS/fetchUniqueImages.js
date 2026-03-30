import fs from 'fs';
import https from 'https';

const getAircrafts = () => {
  const content = fs.readFileSync('src/data/aircrafts.js', 'utf8');
  const jsonStr = content.substring(content.indexOf('['), content.lastIndexOf(']') + 1);
  return JSON.parse(jsonStr);
};

const fetchCommonsImage = (searchTerm) => {
  return new Promise((resolve) => {
    // Specifically search the "File" namespace (namespace 6) on Wikimedia Commons
    const query = encodeURIComponent(searchTerm);
    const url = `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=${query}&gsrnamespace=6&gsrlimit=3&prop=imageinfo&iiprop=url`;

    https.get(url, { headers: { 'User-Agent': 'AircraftCompareBot/2.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.query && json.query.pages) {
            const pages = Object.values(json.query.pages);
            
            // Try to find a JPG or PNG, avoiding SVGs or logos
            const validPages = pages.filter(p => p.imageinfo && p.imageinfo[0] && !p.title.toLowerCase().includes('logo') && !p.title.toLowerCase().includes('.svg'));
            
            if (validPages.length > 0) {
              resolve(validPages[0].imageinfo[0].url);
            } else {
              resolve(null);
            }
          } else {
            resolve(null);
          }
        } catch (e) {
          resolve(null);
        }
      });
    }).on('error', () => resolve(null));
  });
};

const delay = ms => new Promise(res => setTimeout(res, ms));

const run = async () => {
  console.log('Reading aircraft data...');
  const aircrafts = getAircrafts();
  
  // Find duplicates
  const imageMap = {};
  aircrafts.forEach(a => {
    if (!a.image) return;
    if (!imageMap[a.image]) imageMap[a.image] = [];
    imageMap[a.image].push(a);
  });

  const allSeenUrls = new Set(aircrafts.map(a => a.image));
  let fixCount = 0;

  for (const [img, models] of Object.entries(imageMap)) {
    // Also explicitly force-fix known bad images (building pictures)
    const isBadHqImage = img.includes('Headquarters') || img.includes('building') || img.toLowerCase().includes('factory');
    
    // Start index: if it's a good image, keep the 1st one and fetch for the rest.
    // If it's a bad HQ image, fetch for ALL of them.
    const startIdx = isBadHqImage ? 0 : 1;

    if (models.length > 1 || isBadHqImage) {
      console.log(`\nFound target grouping: ${models[0].name} series...`);
      for (let i = startIdx; i < models.length; i++) {
        const model = models[i];
        console.log(` -> Fetching unique image from Commons for: ${model.name}`);
        
        let newUrl = await fetchCommonsImage(model.name + " aircraft");
        if (!newUrl || allSeenUrls.has(newUrl)) {
           // Fallback broader search if exact variant fails
           await delay(300);
           newUrl = await fetchCommonsImage(model.manufacturer + " " + model.name);
        }

        if (newUrl && !allSeenUrls.has(newUrl)) {
          model.image = newUrl;
          allSeenUrls.add(newUrl);
          fixCount++;
          console.log(`    [SUCCESS] Found distinct image: ${newUrl}`);
        } else {
          console.log(`    [FAILED] No unique image found.`);
        }
        await delay(300);
      }
    }
  }

  // Rewrite aircrafts.js
  const newContent = 'export const aircrafts = ' + JSON.stringify(aircrafts, null, 2) + ';';
  fs.writeFileSync('src/data/aircrafts.js', newContent);
  console.log(`\nFinished! Successfully applied ${fixCount} new unique images.`);
};

run();
