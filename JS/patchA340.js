import fs from 'fs';

const content = fs.readFileSync('src/data/aircrafts.js', 'utf8');
const jsonStr = content.substring(content.indexOf('['), content.lastIndexOf(']') + 1);
const aircrafts = JSON.parse(jsonStr);

// Hardcoded explicit images for the A340 series
const patchMap = {
  "Airbus A340-200": "https://upload.wikimedia.org/wikipedia/commons/4/4e/Airbus_A340-200_Aerolineas_Argentinas_LV-ZPO.jpg",
  "Airbus A340-300": "https://upload.wikimedia.org/wikipedia/commons/6/69/Lufthansa_Airbus_A340-300_D-AIGL_MUC_2015_04.jpg",
  "Airbus A340-500": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Thai_Airways_International_A340-500_HS-TLA.jpg/1280px-Thai_Airways_International_A340-500_HS-TLA.jpg",
  "Airbus A340-600": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Lufthansa_A340-600_D-AIHN.jpg/1280px-Lufthansa_A340-600_D-AIHN.jpg"
};

let patchedCount = 0;
for (const plane of aircrafts) {
  if (patchMap[plane.name]) {
    plane.image = patchMap[plane.name];
    console.log(`Patched ${plane.name} with static image.`);
    patchedCount++;
  }
}

const newContent = 'export const aircrafts = ' + JSON.stringify(aircrafts, null, 2) + ';';
fs.writeFileSync('src/data/aircrafts.js', newContent);
console.log(`Applied patch to ${patchedCount} aircraft.`);
