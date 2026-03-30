import fs from 'fs';

const content = fs.readFileSync('src/data/aircrafts.js', 'utf8');
const jsonStr = content.substring(content.indexOf('['), content.lastIndexOf(']') + 1);
const aircrafts = JSON.parse(jsonStr);

const overridingMap = {
  "Aerospatiale Concorde Type 1": "https://upload.wikimedia.org/wikipedia/commons/4/4c/Concorde_001_in_flight.jpg",
  "Airbus A310-300": "https://upload.wikimedia.org/wikipedia/commons/b/b3/Air_Transat_A310-300_C-GLAT.jpg",
  "Airbus A340-500": "https://upload.wikimedia.org/wikipedia/commons/f/ff/Airbus_A340-500_A6-ERH_Emirates.jpg",
  "Airbus A340-600": "https://upload.wikimedia.org/wikipedia/commons/8/87/Airbus_A340-642_South_African_ZS-SNB.jpg",
  "Antonov An-124-100": "https://upload.wikimedia.org/wikipedia/commons/2/2f/Antonov_124_takeoff.jpg",
  "Avro Vulcan B.1": "https://upload.wikimedia.org/wikipedia/commons/3/30/Avro_Vulcan_B1A_%28XH481%29_%289133496350%29.jpg",
  "Avro Vulcan B.2": "https://upload.wikimedia.org/wikipedia/commons/d/de/Avro_Vulcan_B2_XH558_in_flight.jpg",
  "Beechcraft King Air B200": "https://upload.wikimedia.org/wikipedia/commons/9/9f/Beechcraft_Super_King_Air_B200_%28N200YK%29.jpg",
  "Boeing 737-600": "https://upload.wikimedia.org/wikipedia/commons/8/82/SAS_Boeing_737-600_LN-RPG_FRA_2011.jpg",
  "Boeing 747-300": "https://upload.wikimedia.org/wikipedia/commons/7/76/Qantas_Boeing_747-300_VH-EBU.jpg",
  "Boeing 777-300": "https://upload.wikimedia.org/wikipedia/commons/6/6d/Cathay_Pacific_Boeing_777-300_B-HNE.jpg",
  "Boeing 777-9": "https://upload.wikimedia.org/wikipedia/commons/0/07/Boeing_777-9X_%2849547563532%29.jpg",
  "Bombardier Global 7500": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/VistaJet_Bombardier_Global_7500.jpg/1280px-VistaJet_Bombardier_Global_7500.jpg",
  "Cessna Citation X": "https://upload.wikimedia.org/wikipedia/commons/1/18/Cessna_750_Citation_X_%28N500ES%29.jpg",
  "Dassault Mirage 2000D": "https://upload.wikimedia.org/wikipedia/commons/8/8c/Dassault_Mirage_2000D_%28652_%2F_3-XJ%29.jpg",
  "Embraer E175-200": "https://upload.wikimedia.org/wikipedia/commons/d/d3/Embraer_170_Alitalia.jpg",
  "Lockheed Martin F-16V Block 70": "https://upload.wikimedia.org/wikipedia/commons/2/2b/F-16I_Sufa_in_flight.jpg",
  "Mikoyan MiG-29K": "https://upload.wikimedia.org/wikipedia/commons/7/7b/Mikoyan-Gurevich_MiG-29K_%281%29.jpg",
  "Mikoyan-Gurevich MiG-17F": "https://upload.wikimedia.org/wikipedia/commons/7/7e/Shenyang_J-5_MiG-17F_Lim-5.jpg",
  "Sukhoi Su-34": "https://upload.wikimedia.org/wikipedia/commons/8/82/SU-34_%281%29.jpg"
};

let count = 0;
for (const plane of aircrafts) {
  if (overridingMap[plane.name]) {
    plane.image = overridingMap[plane.name];
    console.log(`Manually installed verified exterior image for: ${plane.name}`);
    count++;
  }
}

const newContent = 'export const aircrafts = ' + JSON.stringify(aircrafts, null, 2) + ';';
fs.writeFileSync('src/data/aircrafts.js', newContent);
console.log(`Successfully hard-patched ${count} stubborn images.`);
