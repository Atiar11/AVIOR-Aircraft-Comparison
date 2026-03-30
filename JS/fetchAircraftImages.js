import fs from 'fs';
import https from 'https';

let currentAircrafts = [];
try {
  const content = fs.readFileSync('src/data/aircrafts.js', 'utf8');
  const jsonStr = content.substring(content.indexOf('['), content.lastIndexOf(']') + 1);
  currentAircrafts = JSON.parse(jsonStr);
} catch (e) {
  console.log('Error parsing current aircrafts: ', e.message);
  process.exit(1);
}

// Function to fetch the image from Wikimedia API based on search string
const fetchWikipediaImage = (searchTerm) => {
  return new Promise((resolve, reject) => {
    const query = encodeURIComponent(searchTerm);
    const url = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&pithumbsize=1000&generator=search&gsrsearch=${query}&gsrlimit=1`;
    
    https.get(url, {
        headers: { 'User-Agent': 'AircraftCompareBot/1.0 (test@example.com)' }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.query && json.query.pages) {
            const pages = json.query.pages;
            const pageId = Object.keys(pages)[0];
            const pageInfo = pages[pageId];
            if (pageInfo.thumbnail && pageInfo.thumbnail.source) {
              resolve(pageInfo.thumbnail.source);
            } else {
              resolve(null); // No image found on page
            }
          } else {
            resolve(null); // No search results
          }
        } catch (e) {
          resolve(null);
        }
      });
    }).on('error', (err) => resolve(null));
  });
};

const delay = ms => new Promise(res => setTimeout(res, ms));

const run = async () => {
  let successCount = 0;
  console.log(`Starting image fetch for ${currentAircrafts.length} aircraft...`);
  
  for (let i = 0; i < currentAircrafts.length; i++) {
    const plane = currentAircrafts[i];
    console.log(`[${i+1}/${currentAircrafts.length}] Searching for ${plane.name}...`);
    
    // We try to search by the exact manufacturer + name
    const imageURL = await fetchWikipediaImage(plane.manufacturer + " " + plane.name);
    
    if (imageURL) {
      plane.image = imageURL;
      successCount++;
    } else {
      console.log(`   -> Failed to find image for ${plane.name}, fallback retained.`);
    }
    
    // Slight delay to avoid hammering the Wikipedia API
    await delay(300);
  }

  const newContent = 'export const aircrafts = ' + JSON.stringify(currentAircrafts, null, 2) + ';';
  fs.writeFileSync('src/data/aircrafts.js', newContent);
  console.log(`SUCCESS: Fetched and applied ${successCount} unique aircraft images.`);
};

run();
