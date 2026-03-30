import fs from 'fs';

try {
  const content = fs.readFileSync('src/data/aircrafts.js', 'utf8');
  const jsonStr = content.substring(content.indexOf('['), content.lastIndexOf(']') + 1);
  const aircrafts = JSON.parse(jsonStr);

  const imageMap = {};
  let duplicatesCount = 0;

  aircrafts.forEach(a => {
    if (!a.image) return;
    if (!imageMap[a.image]) {
      imageMap[a.image] = [];
    }
    imageMap[a.image].push(a.name);
  });

  for (const [img, names] of Object.entries(imageMap)) {
    if (names.length > 1) {
      console.log(`DUPLICATE IMAGE (${names.length}):\n   ${names.join(', ')}\n   URL: ${img}\n`);
      duplicatesCount += (names.length - 1);
    }
  }

  console.log(`Total duplicate images to fix: ${duplicatesCount}`);
} catch (e) {
  console.log('Error:', e.message);
}
