import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Hospital from '../models/Hospital.js';

dotenv.config();

const hospitals = [
  {
    name: 'Mercy General Hospital',
    type: 'Trauma Center',
    address: '400 Mercy Dr, Sacramento, CA 95814',
    phone: '+1 (555) 777-8888',
    distance: '2.4 miles',
    waitTime: 15,
    isOpen: true,
    status: 'Open',
    capabilities: ['Level 1 Trauma', 'Stroke Center', 'Cardiac Unit', 'ICU'],
    location: { type: 'Point', coordinates: [-121.4944, 38.5816] }
  },
  {
    name: 'St. Jude Medical Center',
    type: 'Pediatrics',
    address: '1200 Sperry Ave, Stockton, CA 95206',
    phone: '+1 (555) 444-5555',
    distance: '3.8 miles',
    waitTime: 45,
    isOpen: true,
    status: 'Limited Capacity',
    capabilities: ['Pediatrics ER', 'NICU', 'Pediatric Surgery'],
    location: { type: 'Point', coordinates: [-121.2880, 37.9577] }
  },
  {
    name: 'CityMD Urgent Care',
    type: 'Urgent Care',
    address: '889 Embarcadero Dr, Sacramento, CA 95823',
    phone: '+1 (555) 222-3333',
    distance: '1.2 miles',
    waitTime: 5,
    isOpen: true,
    status: 'Open',
    capabilities: ['X-Ray on site', 'Open Late', 'Lab Services'],
    location: { type: 'Point', coordinates: [-121.4210, 38.5720] }
  },
  {
    name: 'Valley Children\'s Hospital',
    type: 'Pediatrics',
    address: '9300 Valley Children\'s Pl, Madera, CA 93636',
    phone: '+1 (555) 666-7777',
    distance: '8.5 miles',
    waitTime: 30,
    isOpen: true,
    status: 'Open',
    capabilities: ['Pediatric ER', 'Pediatric ICU', 'Neonatal Surgery'],
    location: { type: 'Point', coordinates: [-120.0607, 36.9474] }
  },
  {
    name: 'Dignity Health ER',
    type: 'Trauma Center',
    address: '3010 L St, Sacramento, CA 95816',
    phone: '+1 (555) 333-4444',
    distance: '1.8 miles',
    waitTime: 25,
    isOpen: true,
    status: 'Open',
    capabilities: ['Level 2 Trauma', 'Stroke Center', 'Burn Unit'],
    location: { type: 'Point', coordinates: [-121.4590, 38.5720] }
  },
  {
    name: 'UC Davis Medical Center',
    type: 'Trauma Center',
    address: '2315 Stockton Blvd, Sacramento, CA 95817',
    phone: '+1 (555) 111-2222',
    distance: '3.2 miles',
    waitTime: 35,
    isOpen: true,
    status: 'Open',
    capabilities: ['Level 1 Trauma', 'Poison Control', 'Burn Unit', 'Transplant Center'],
    location: { type: 'Point', coordinates: [-121.4520, 38.5540] }
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    await Hospital.deleteMany({});
    console.log('Cleared existing hospitals');

    await Hospital.insertMany(hospitals);
    console.log(`Seeded ${hospitals.length} hospitals`);

    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error.message);
    process.exit(1);
  }
}

seed();
