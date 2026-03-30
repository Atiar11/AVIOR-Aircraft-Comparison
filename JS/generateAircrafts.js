import fs from 'fs';

const names = [
    "Aero L-29A Akrobat", "Aero L-29R", "Aero L-39C", "Aero L-39ZA", "Aero L-39NG",
    "Aerospatiale Concorde Type 1", "Aerospatiale Concorde Type 2",
    "Airbus A220-100", "Airbus A220-300", "Airbus A300B2", "Airbus A300B4", "Airbus A300-600",
    "Airbus A300-600R", "Airbus A300-600ST Beluga", "Airbus A310-200", "Airbus A310-300",
    "Airbus A318-100", "Airbus A319-100", "Airbus A319neo", "Airbus A320-200", "Airbus A320neo",
    "Airbus A321-100", "Airbus A321-200", "Airbus A321neo", "Airbus A321LR", "Airbus A321XLR",
    "Airbus A330-200", "Airbus A330-200F", "Airbus A330-300", "Airbus A330-800neo", "Airbus A330-900neo",
    "Airbus A340-200", "Airbus A340-300", "Airbus A340-500", "Airbus A340-600",
    "Airbus A350-900", "Airbus A350-1000", "Airbus A350F", "Airbus A380-800", "Airbus A400M Atlas",
    "Antonov An-2T", "Antonov An-2TP", "Antonov An-12BP", "Antonov An-22A", "Antonov An-24B",
    "Antonov An-24RV", "Antonov An-26B", "Antonov An-32B", "Antonov An-72A", "Antonov An-124-100",
    "Antonov An-124-100M", "Antonov An-225 Mriya",
    "Avro Lancaster B Mark I", "Avro Lancaster B Mark III", "Avro Vulcan B.1", "Avro Vulcan B.2",
    "BAE Systems Hawk T1", "BAE Systems Hawk T2",
    "Beechcraft Baron 55", "Beechcraft Baron 58", "Beechcraft Baron G58",
    "Beechcraft Bonanza V35", "Beechcraft Bonanza A36", "Beechcraft Bonanza G36",
    "Beechcraft King Air C90", "Beechcraft King Air B200", "Beechcraft King Air 350",
    "Bell AH-1G HueyCobra", "Bell AH-1W SuperCobra", "Bell AH-1Z Viper",
    "Bell OH-58A Kiowa", "Bell OH-58D Kiowa Warrior", "Bell UH-1D Iroquois", "Bell UH-1H Iroquois", "Bell UH-1Y Venom",
    "Boeing 707-120", "Boeing 707-320B", "Boeing 707-320C", "Boeing 717-200",
    "Boeing 727-100", "Boeing 727-200", "Boeing 727-200 Advanced",
    "Boeing 737-100", "Boeing 737-200", "Boeing 737-300", "Boeing 737-400", "Boeing 737-500",
    "Boeing 737-600", "Boeing 737-700", "Boeing 737-800", "Boeing 737-900", "Boeing 737-900ER",
    "Boeing 737 MAX 7", "Boeing 737 MAX 8", "Boeing 737 MAX 8200", "Boeing 737 MAX 9", "Boeing 737 MAX 10",
    "Boeing 747-100", "Boeing 747-200B", "Boeing 747-200F", "Boeing 747-300", "Boeing 747-400",
    "Boeing 747-400ER", "Boeing 747-400F", "Boeing 747-8I", "Boeing 747-8F",
    "Boeing 757-200", "Boeing 757-200PF", "Boeing 757-300",
    "Boeing 767-200", "Boeing 767-200ER", "Boeing 767-300", "Boeing 767-300ER", "Boeing 767-300F", "Boeing 767-400ER",
    "Boeing 777-200", "Boeing 777-200ER", "Boeing 777-200LR", "Boeing 777-300", "Boeing 777-300ER", "Boeing 777F", "Boeing 777-8", "Boeing 777-9",
    "Boeing 787-8 Dreamliner", "Boeing 787-9 Dreamliner", "Boeing 787-10 Dreamliner",
    "Boeing AH-64A Apache", "Boeing AH-64D Apache Longbow", "Boeing AH-64E Apache Guardian",
    "Boeing B-17F Flying Fortress", "Boeing B-17G Flying Fortress", "Boeing B-29A Superfortress",
    "Boeing B-52D Stratofortress", "Boeing B-52G Stratofortress", "Boeing B-52H Stratofortress",
    "Boeing CH-47D Chinook", "Boeing CH-47F Chinook",
    "Boeing F-15E Strike Eagle", "Boeing F-15EX Eagle II", "Boeing F/A-18E Super Hornet", "Boeing F/A-18F Super Hornet",
    "Bombardier CRJ100ER", "Bombardier CRJ200ER", "Bombardier CRJ700", "Bombardier CRJ900", "Bombardier CRJ1000",
    "Bombardier Global 5000", "Bombardier Global 6000", "Bombardier Global 7500",
    "Cessna 150M", "Cessna 152", "Cessna 172M Skyhawk", "Cessna 172N Skyhawk", "Cessna 172R Skyhawk",
    "Cessna 172S Skyhawk SP", "Cessna 182T Skylane", "Cessna 206H Stationair", "Cessna 208B Grand Caravan EX",
    "Cessna Citation CJ3", "Cessna Citation X",
    "Convair B-36H Peacemaker", "Convair B-36J Peacemaker",
    "Dassault Falcon 2000EX", "Dassault Falcon 900LX", "Dassault Mirage 2000C", "Dassault Mirage 2000D",
    "Dassault Mirage 2000-5", "Dassault Rafale C", "Dassault Rafale M", "Dassault Rafale B",
    "De Havilland Canada DHC-8-100", "De Havilland Canada DHC-8-200", "De Havilland Canada DHC-8-300", "De Havilland Canada DHC-8-400 (Q400)",
    "Douglas C-47A Skytrain", "Douglas DC-3A", "Douglas DC-4", "Douglas DC-6B", "Douglas DC-8-50", "Douglas DC-8-63", "Douglas DC-8-73",
    "Embraer E170-100", "Embraer E175-200", "Embraer E190-100", "Embraer E195-200",
    "Embraer E175-E2", "Embraer E190-E2", "Embraer E195-E2",
    "Embraer ERJ 135LR", "Embraer ERJ 140LR", "Embraer ERJ 145LR", "Embraer ERJ 145XR",
    "Embraer EMB 314 Super Tucano",
    "Eurofighter Typhoon Tranche 1", "Eurofighter Typhoon Tranche 2", "Eurofighter Typhoon Tranche 3A",
    "Fairchild Republic A-10A Thunderbolt II", "Fairchild Republic A-10C Thunderbolt II",
    "Fokker 100", "Fokker 70", "Fokker F27 Mk 500", "Fokker F28 Mk 4000",
    "Grumman E-2C Hawkeye", "Grumman E-2D Advanced Hawkeye", "Grumman F-14A Tomcat", "Grumman F-14B Tomcat", "Grumman F-14D Super Tomcat",
    "Ilyushin Il-2M3", "Ilyushin Il-18D", "Ilyushin Il-62M", "Ilyushin Il-76MD", "Ilyushin Il-76TD", "Ilyushin Il-76MD-90A", "Ilyushin Il-96-300",
    "Lockheed C-130E Hercules", "Lockheed C-130H Hercules", "Lockheed Martin C-130J Super Hercules",
    "Lockheed C-5A Galaxy", "Lockheed C-5B Galaxy", "Lockheed C-5M Super Galaxy",
    "Lockheed L-1049 Super Constellation", "Lockheed F-104G Starfighter", "Lockheed F-117A Nighthawk",
    "Lockheed Martin F-16A Fighting Falcon", "Lockheed Martin F-16C Block 50", "Lockheed Martin F-16V Block 70",
    "Lockheed Martin F-22A Raptor", "Lockheed Martin F-35A Lightning II", "Lockheed Martin F-35B Lightning II", "Lockheed Martin F-35C Lightning II",
    "Lockheed P-3C Orion", "Lockheed SR-71A Blackbird", "Lockheed U-2S",
    "McDonnell Douglas DC-10-10", "McDonnell Douglas DC-10-30", "McDonnell Douglas F-15A Eagle", "McDonnell Douglas F-15C Eagle",
    "McDonnell Douglas F-4E Phantom II", "McDonnell Douglas F-4J Phantom II",
    "McDonnell Douglas MD-11F", "McDonnell Douglas MD-82", "McDonnell Douglas MD-83", "McDonnell Douglas MD-88", "McDonnell Douglas MD-90-30",
    "Mikoyan MiG-29A (Product 9.12)", "Mikoyan MiG-29S (Product 9.13)", "Mikoyan MiG-29K", "Mikoyan MiG-31BM", "Mikoyan MiG-35S",
    "Mikoyan-Gurevich MiG-15bis", "Mikoyan-Gurevich MiG-17F", "Mikoyan-Gurevich MiG-21MF", "Mikoyan-Gurevich MiG-21bis",
    "Mikoyan-Gurevich MiG-23MLD", "Mikoyan-Gurevich MiG-25PD",
    "North American P-51D Mustang",
    "Northrop B-2A Spirit", "Northrop F-5E Tiger II",
    "Panavia Tornado GR4",
    "Piper PA-28-140 Cherokee Cruiser", "Piper PA-28-181 Archer II", "Piper PA-28-236 Dakota",
    "Saab 340B", "Saab JAS 39C Gripen", "Saab JAS 39E Gripen",
    "Sikorsky CH-53E Super Stallion", "Sikorsky CH-53K King Stallion", "Sikorsky UH-60A Black Hawk", "Sikorsky UH-60M Black Hawk",
    "Sukhoi Su-17M4", "Sukhoi Su-24M", "Sukhoi Su-25SM", "Sukhoi Su-27S", "Sukhoi Su-27SK", "Sukhoi Su-30MKI", "Sukhoi Su-30SM", "Sukhoi Su-33", "Sukhoi Su-34", "Sukhoi Su-35S", "Sukhoi Su-57",
    "Supermarine Spitfire Mk Vb", "Supermarine Spitfire Mk IX",
    "Tupolev Tu-16K", "Tupolev Tu-95MS", "Tupolev Tu-134A", "Tupolev Tu-154M", "Tupolev Tu-160M", "Tupolev Tu-204-100",
    "Vought F4U-1A Corsair", "Vought F4U-4 Corsair"
];

const parseAircraft = (name) => {
    let manufacturer = name.split(' ')[0];
    if (name.includes('Airbus')) manufacturer = 'Airbus';
    if (name.includes('Boeing')) manufacturer = 'Boeing';
    if (name.includes('Antonov')) manufacturer = 'Antonov';
    if (name.includes('Cessna') || name.includes('Citation')) manufacturer = 'Cessna';
    if (name.includes('Embraer')) manufacturer = 'Embraer';
    if (name.includes('Lockheed')) manufacturer = 'Lockheed Martin';
    if (name.includes('Sukhoi')) manufacturer = 'Sukhoi';
    if (name.includes('Mikoyan')) manufacturer = 'Mikoyan';
    if (name.includes('Dassault')) manufacturer = 'Dassault Aviation';
    if (name.includes('Bombardier')) manufacturer = 'Bombardier';

    let type = 'Aircraft';
    let range = 2000;
    let capacity = 20;
    let maxSpeed = 0.8;
    let length = 30;
    let wingspan = 30;
    let mtow = 50000;

    // Heuristics
    const n = name.toLowerCase();

    // Commercial / Large
    if (n.includes('a380') || n.includes('747') || n.includes('an-124') || n.includes('an-225') || n.includes('c-5 galaxy')) {
        type = 'Wide-body Heavy'; range = 8000; capacity = 500; length = 70; wingspan = 68; mtow = 400000;
    } else if (n.includes('a330') || n.includes('a340') || n.includes('a350') || n.includes('777') || n.includes('787') || n.includes('dc-10') || n.includes('md-11')) {
        type = 'Wide-body Airliner'; range = 7000; capacity = 350; length = 60; wingspan = 60; mtow = 250000;
        maxSpeed = 0.86;
    } else if (n.includes('a320') || n.includes('a319') || n.includes('a321') || n.includes('a318') || n.includes('737') || n.includes('757') || n.includes('md-8') || n.includes('md-9') || n.includes('tu-154') || n.includes('dc-8')) {
        type = 'Narrow-body Airliner'; range = 3500; capacity = 180; length = 38; wingspan = 35; mtow = 80000;
    } else if (n.includes('crj') || n.includes('e17') || n.includes('e19') || n.includes('erj') || n.includes('fokker') || n.includes('dhc-8') || n.includes('saab')) {
        type = 'Regional Jet / Turboprop'; range = 1500; capacity = 80; length = 35; wingspan = 25; mtow = 45000;
        if (n.includes('dhc-8') || n.includes('saab')) maxSpeed = 0.6;
    }
    // High performance / Military / Fighters
    else if (n.includes('f-') || n.includes('mig-') || n.includes('su-') || n.includes('mirage') || n.includes('rafale') || n.includes('typhoon') || n.includes('tornado') || n.includes('a-10') || n.includes('gripen')) {
        type = 'Fighter Jet'; range = 1500; capacity = 1; maxSpeed = 2.0; length = 18; wingspan = 13; mtow = 25000;
        if (n.includes('a-10')) maxSpeed = 0.7;
        if (n.includes('mig-25') || n.includes('mig-31')) maxSpeed = 2.8;
    } else if (n.includes('concorde') || n.includes('sr-71')) {
        type = 'Supersonic'; range = 3500; capacity = (n.includes('concorde') ? 100 : 2); maxSpeed = (n.includes('sr-71') ? 3.3 : 2.0); length = 60; wingspan = 25; mtow = 180000;
    } else if (n.includes('b-52') || n.includes('b-1') || n.includes('b-2') || n.includes('b-36') || n.includes('tu-95') || n.includes('tu-160')) {
        type = 'Strategic Bomber'; range = 6000; capacity = 5; maxSpeed = 0.9; length = 45; wingspan = 56; mtow = 200000;
        if (n.includes('b-36') || n.includes('tu-95')) maxSpeed = 0.6;
        if (n.includes('tu-160')) maxSpeed = 2.05;
    } else if (n.includes('c-130') || n.includes('an-12') || n.includes('a400m')) {
        type = 'Transport'; range = 3000; capacity = 90; maxSpeed = 0.6; length = 30; wingspan = 40; mtow = 70000;
    }
    // Helicopters
    else if (n.includes('ah-') || n.includes('uh-') || n.includes('ch-') || n.includes('oh-')) {
        type = 'Helicopter'; range = 400; capacity = 12; maxSpeed = 0.15; length = 15; wingspan = 16; mtow = 10000;
    }
    // General Aviation
    else if (n.includes('cessna 1') || n.includes('cessna 2') || n.includes('baron') || n.includes('bonanza') || n.includes('piper')) {
        type = 'General Aviation / Light'; range = 800; capacity = 4; maxSpeed = 0.25; length = 8; wingspan = 11; mtow = 1500;
    } else if (n.includes('citation') || n.includes('falcon') || n.includes('global') || n.includes('king air')) {
        type = 'Business Jet'; range = 4000; capacity = 12; maxSpeed = 0.85; length = 20; wingspan = 20; mtow = 20000;
        if (n.includes('king air')) maxSpeed = 0.5;
    }
    // Vintage
    else if (n.includes('mustang') || n.includes('spitfire') || n.includes('corsair') || n.includes('lancaster')) {
        type = 'WWII Era'; range = 1000; capacity = 1; maxSpeed = 0.6; length = 10; wingspan = 11; mtow = 4000;
        if (n.includes('lancaster')) { capacity = 7; wingspan = 31; mtow = 30000; maxSpeed = 0.35; }
    }

    // Variations based on hashing the string to make each entry relatively unique
    const hash = name.split('').reduce((a, b) => { a = ((a << 5) - a) + b.charCodeAt(0); return a & a }, 0);
    const mod = Math.abs(hash) % 20; // 0 to 19 percentage variation

    range = Math.round(range * (1 + (mod - 10) / 100)); // +/- 10%
    if (type !== 'Fighter Jet' && type !== 'Supersonic' && maxSpeed > 0.5) {
        maxSpeed = parseFloat((maxSpeed * (1 + (mod - 10) / 100)).toFixed(2));
    }

    let imgURL = '';
    if (type.includes('Heavy') || type.includes('Airliner')) imgURL = 'https://images.unsplash.com/photo-1542282200-a6ad00cc553f?auto=format&fit=crop&q=80&w=800'; // Airliner
    else if (type.includes('Fighter')) imgURL = 'https://images.unsplash.com/photo-1588668988085-30df2b792ff4?auto=format&fit=crop&q=80&w=800'; // Fighter
    else if (type.includes('Business') || type.includes('Light')) imgURL = 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&q=80&w=800'; // Biz jet
    else imgURL = 'https://images.unsplash.com/photo-1558230588-ce911db65fde?auto=format&fit=crop&q=80&w=800'; // Generic Plane

    const id = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    return { id, name, manufacturer, type, range, capacity, maxSpeed, length, wingspan, mtow, image: imgURL };
};

const aircrafts = names.map(parseAircraft);

const fileContent = 'export const aircrafts = ' + JSON.stringify(aircrafts, null, 2) + ';';
fs.writeFileSync('src/data/aircrafts.js', fileContent);
console.log('Successfully wrote ' + aircrafts.length + ' aircraft models to src/data/aircrafts.js');
