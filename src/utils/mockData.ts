import { v4 as uuidv4 } from 'uuid';

// Vessel types
const vesselTypes = ['Cargo', 'Tanker', 'Passenger', 'Fishing', 'Special Craft', 'High Speed Craft'];

// Vessel statuses
const vesselStatuses = ['moving', 'anchored', 'moored', 'underway', 'aground'];

// Country flags
const flags = ['Panama', 'Liberia', 'Marshall Islands', 'Hong Kong', 'Singapore', 'Malta', 'China', 'Greece', 'Japan', 'USA'];

// Random vessel names
const vesselNames = [
  'Ocean Explorer', 'Northern Star', 'Atlantic Voyager', 'Pacific Guardian', 
  'Golden Horizon', 'Silver Wind', 'Blue Marlin', 'Crimson Tide', 
  'Emerald Duchess', 'Diamond Princess', 'Sapphire Queen', 'Ruby Fortune',
  'Arctic Pioneer', 'Southern Cross', 'Eastern Glory', 'Western Spirit',
  'Coastal Ranger', 'Infinity Explorer', 'Nautilus Prime', 'Poseidon Venture'
];

// Random ports for destinations
const ports = [
  'Rotterdam', 'Singapore', 'Shanghai', 'Hong Kong', 'Busan', 
  'Antwerp', 'Los Angeles', 'New York', 'Hamburg', 'Dubai',
  'Tokyo', 'Felixstowe', 'Valencia', 'Sydney', 'Santos'
];

// Generate a random number between min and max
const randomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// Generate random coordinates within a bounding box (North Atlantic)
const randomCoordinates = () => {
  // North Atlantic bounding box
  const minLat = 25;
  const maxLat = 55;
  const minLng = -70;
  const maxLng = 0;
  
  return {
    latitude: minLat + (Math.random() * (maxLat - minLat)),
    longitude: minLng + (Math.random() * (maxLng - minLng))
  };
};

// Generate a random date in the past year
const randomDate = () => {
  const now = new Date();
  const pastYear = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
  const timestamp = pastYear.getTime() + Math.random() * (now.getTime() - pastYear.getTime());
  return new Date(timestamp);
};

// Generate random IMO number (7 digits)
const randomIMO = () => {
  return 'IMO' + randomNumber(1000000, 9999999);
};

// Generate random MMSI number (9 digits)
const randomMMSI = () => {
  return randomNumber(100000000, 999999999).toString();
};

// Generate random call sign (combination of letters and numbers)
const randomCallSign = () => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let callSign = '';
  
  // Generate 3 letters
  for (let i = 0; i < 3; i++) {
    callSign += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  
  // Generate 4 digits
  callSign += randomNumber(1000, 9999);
  
  return callSign;
};

// Generate ETA based on current date
const generateETA = () => {
  const now = new Date();
  const futureDate = new Date(now);
  futureDate.setDate(now.getDate() + randomNumber(1, 14));
  
  return futureDate.toLocaleDateString('en-GB');
};

// Generate mock vessel data
export const generateMockVessels = (count: number) => {
  const vessels = [];
  
  for (let i = 0; i < count; i++) {
    const coords = randomCoordinates();
    const vesselType = vesselTypes[Math.floor(Math.random() * vesselTypes.length)];
    const status = vesselStatuses[Math.floor(Math.random() * vesselStatuses.length)];
    const flag = flags[Math.floor(Math.random() * flags.length)];
    
    // Determine speed based on status
    let speed = 0;
    if (status === 'moving' || status === 'underway') {
      speed = randomNumber(5, 25);
    } else if (status === 'aground') {
      speed = 0;
    } else {
      speed = randomNumber(0, 2);
    }
    
    const vessel = {
      id: uuidv4(),
      name: vesselNames[Math.floor(Math.random() * vesselNames.length)],
      imo: randomIMO(),
      mmsi: randomMMSI(),
      callsign: randomCallSign(),
      type: vesselType,
      flag: flag,
      length: randomNumber(50, 400),
      beam: randomNumber(10, 60),
      draught: randomNumber(5, 20),
      grossTonnage: randomNumber(1000, 200000),
      status: status,
      speed: speed,
      course: randomNumber(0, 359),
      heading: randomNumber(0, 359),
      latitude: coords.latitude,
      longitude: coords.longitude,
      lastUpdate: new Date(),
    };
    
    // Add destination and ETA for moving vessels
    if (status === 'moving' || status === 'underway') {
      vessel.destination = ports[Math.floor(Math.random() * ports.length)];
      vessel.eta = generateETA();
    }
    
    vessels.push(vessel);
  }
  
  return vessels;
};

// Generate additional vessel details
export const generateVesselDetails = (vessel: any) => {
  // Generate dead weight if not present
  const deadWeight = vessel.grossTonnage * randomNumber(12, 18) / 10;
  
  // Generate build year
  const builtYear = randomNumber(1990, 2022);
  
  // Generate recent activity
  const recentActivity = [];
  
  // Number of activities to generate
  const activityCount = randomNumber(3, 6);
  
  for (let i = 0; i < activityCount; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i * randomNumber(1, 3));
    
    const activities = [
      'Departed from port',
      'Arrived at port',
      'Changed course',
      'Reduced speed',
      'Increased speed',
      'Anchored',
      'Started voyage',
      'Completed voyage',
      'Reported position',
      'Changed destination'
    ];
    
    recentActivity.push({
      time: date.toLocaleString(),
      event: activities[Math.floor(Math.random() * activities.length)],
      location: `${vessel.latitude.toFixed(2)}°N ${vessel.longitude.toFixed(2)}°W`
    });
  }
  
  return {
    deadWeight,
    built: builtYear.toString(),
    recentActivity
  };
};