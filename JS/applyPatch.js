import fs from 'fs';

let currentAircrafts = [];
try {
  // Read existing file and extract the data
  const content = fs.readFileSync('src/data/aircrafts.js', 'utf8');
  const jsonStr = content.substring(content.indexOf('['), content.lastIndexOf(']') + 1);
  currentAircrafts = JSON.parse(jsonStr);
} catch (e) {
  console.log('Error parsing current aircrafts: ', e.message);
}

const applyPatch = (filePath) => {
    const csvContent = fs.readFileSync(filePath, 'utf8');
    const lines = csvContent.split('\n');
    const headers = lines[0].split(',');

    let updatedCount = 0;

    for(let i=1; i<lines.length; i++) {
        if(!lines[i].trim()) continue;
        const row = lines[i].split(',');
        const id = row[0];
        
        let target = currentAircrafts.find(a => a.id === id);
        if(target) {
            target.length = parseFloat(row[1]);
            target.wingspan = parseFloat(row[2]);
            target.wingArea = parseFloat(row[3]);
            target.height = parseFloat(row[4]);
            target.engines = parseInt(row[5]);
            target.thrustPerEngine = parseFloat(row[6]);
            target.totalThrust = target.engines * target.thrustPerEngine;
            target.mtow = parseFloat(row[7]);
            target.range = parseFloat(row[8]);
            target.cruiseSpeed = parseFloat(row[9]);
            target.capacity = parseInt(row[10]);
            target.maxCapacity = parseInt(row[11]);
            updatedCount++;
        } else {
            // Find similarly named if id didn't match strictly
            target = currentAircrafts.find(a => a.id.includes(id) || id.includes(a.id));
            if(target) {
                target.length = parseFloat(row[1]);
                target.wingspan = parseFloat(row[2]);
                target.wingArea = parseFloat(row[3]);
                target.height = parseFloat(row[4]);
                target.engines = parseInt(row[5]);
                target.thrustPerEngine = parseFloat(row[6]);
                target.totalThrust = target.engines * target.thrustPerEngine;
                target.mtow = parseFloat(row[7]);
                target.range = parseFloat(row[8]);
                target.cruiseSpeed = parseFloat(row[9]);
                target.capacity = parseInt(row[10]);
                target.maxCapacity = parseInt(row[11]);
                updatedCount++;
            }
        }
    }
    console.log(`Applied ${updatedCount} precise entries from ${filePath}`);
};

const patchFile = process.argv[2] || 'patch_1.csv';
applyPatch(patchFile);

// Write the updated entries back to the file
const newContent = 'export const aircrafts = ' + JSON.stringify(currentAircrafts, null, 2) + ';';
fs.writeFileSync('src/data/aircrafts.js', newContent);
console.log('Saved exact data to aircrafts.js');
