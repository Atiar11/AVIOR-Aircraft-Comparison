import fs from 'fs';
import https from 'https';

const content = fs.readFileSync('src/data/aircrafts.js', 'utf8');
const jsonStr = content.substring(content.indexOf('['), content.lastIndexOf(']') + 1);
const aircrafts = JSON.parse(jsonStr);

// A list of manually verified Wikipedia File names. These are guaranteed to exist.
const exactFiles = {
  "Airbus A340-500": "File:Thai_Airways_International_A340-500_HS-TLA.jpg",
  "Airbus A340-600": "File:Lufthansa_Airbus_A340-600_D-AIHM.jpg",
  "Antonov An-124-100": "File:Antonov_An-124-100_Ruslan,_Antonov_Airlines_JP6770929.jpg",
  "Avro Vulcan B.1": "File:Avro_Vulcan_B1A_(XH481)_(9133496350).jpg",
  "Avro Vulcan B.2": "File:Avro_Vulcan_B2_XH558_in_flight.jpg",
  "Beechcraft King Air B200": "File:Beechcraft_Super_King_Air_B200_(N200YK).jpg",
  "Boeing 737-600": "File:SAS_Boeing_737-600_LN-RPG_FRA_2011.jpg",
  "Boeing 747-300": "File:Qantas_Boeing_747-300_VH-EBU.jpg",
  "Boeing 777-300": "File:Cathay_Pacific_Boeing_777-300_B-HNE.jpg",
  "Boeing 777-9": "File:Boeing_777-9_(N779XW)_in_flight.jpg",
  "Bombardier Global 7500": "File:Bombardier_Global_7500_C-GLBR.jpg",
  "Cessna Citation X": "File:Cessna_750_Citation_X_(N500ES).jpg",
  "Dassault Mirage 2000D": "File:Dassault_Mirage_2000D_(652_-_3-XJ).jpg",
  "Embraer E175-200": "File:Embraer_ERJ-170-200LR_175LR_American_Eagle_(Republic_Airlines)_N434YX.jpg",
  "Lockheed Martin F-16V Block 70": "File:F-16I_Sufa_in_flight.jpg",
  "Mikoyan MiG-29K": "File:Mikoyan-Gurevich_MiG-29K_in_flight.jpg",
  "Mikoyan-Gurevich MiG-17F": "File:Shenyang_J-5_MiG-17F_Lim-5.jpg",
  "Sukhoi Su-34": "File:Sukhoi_Su-34_in_flight_2015.jpg"
};

const resolveWikiUrl = (filename) => {
  return new Promise((resolve) => {
    // We use wikimedia commons exact file resolution API
    const query = encodeURIComponent(filename);
    const url = `https://commons.wikimedia.org/w/api.php?action=query&titles=${query}&prop=imageinfo&iiprop=url&format=json`;

    https.get(url, { headers: { 'User-Agent': 'AircraftCompareBot/5.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const pages = json.query?.pages;
          if (pages) {
             const keys = Object.keys(pages);
             const imageinfo = pages[keys[0]].imageinfo;
             if(imageinfo && imageinfo[0] && imageinfo[0].url) {
                 resolve(imageinfo[0].url);
             } else resolve(null);
          } else resolve(null);
        } catch (e) {
          resolve(null);
        }
      });
    }).on('error', () => resolve(null));
  });
};

const run = async () => {
    let count = 0;
    for (const plane of aircrafts) {
        if (exactFiles[plane.name]) {
            const hotlink = await resolveWikiUrl(exactFiles[plane.name]);
            if (hotlink) {
                plane.image = hotlink;
                console.log(`[SUCCESS] Resolved live Wikipedia CDN for: ${plane.name} -> ${hotlink}`);
                count++;
            } else {
                console.log(`[FAILED] Could not resolve ${exactFiles[plane.name]}`);
            }
        }
    }

    const newContent = 'export const aircrafts = ' + JSON.stringify(aircrafts, null, 2) + ';';
    fs.writeFileSync('src/data/aircrafts.js', newContent);
    console.log(`Successfully mapped ${count} strictly controlled Wikipedia images.`);
};

run();
