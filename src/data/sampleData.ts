import { Trail, Campsite, Review } from '../types';

export const sampleTrails: Trail[] = [
  {
    id: '1',
    name: 'Max Patch to Hot Springs',
    location: 'Max Patch, NC',
    region: 'Appalachian Trail - North Carolina',
    distance: 21.5,
    elevationGain: 4200,
    elevationLoss: 3800,
    campsites: 4,
    rating: 4.8,
    reviewCount: 127,
    difficulty: 'Hard',
    duration: '2-3 days',
    waterSources: 8,
    permitRequired: false,
    description: 'A stunning section of the Appalachian Trail featuring the iconic Max Patch bald with 360° views, lush forests, and ending in the historic town of Hot Springs. This stretch offers incredible mountain vistas, diverse ecosystems, and well-maintained campsites.',
    heroImage: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200'
  },
  {
    id: '2',
    name: 'Eagle Rock to Warner Springs',
    location: 'Julian, CA',
    region: 'Pacific Crest Trail - Southern California',
    distance: 28.3,
    elevationGain: 5200,
    elevationLoss: 6100,
    campsites: 5,
    rating: 4.6,
    reviewCount: 89,
    difficulty: 'Moderate',
    duration: '3-4 days',
    waterSources: 6,
    permitRequired: true,
    description: 'A beautiful desert-to-mountain transition section of the PCT. Starting at the famous Eagle Rock, hikers traverse rolling hills, oak woodlands, and pine forests before descending to Warner Springs. Great for viewing wildflowers in spring.',
    heroImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200'
  },
  {
    id: '3',
    name: 'Lake Serenity Trail',
    location: 'Boulder Basin, CO',
    region: 'Rocky Mountain National Park',
    distance: 14.2,
    elevationGain: 2800,
    elevationLoss: 2800,
    campsites: 3,
    rating: 4.9,
    reviewCount: 203,
    difficulty: 'Moderate',
    duration: '1-2 days',
    waterSources: 4,
    permitRequired: true,
    description: 'A pristine alpine lake trail that winds through old-growth pine forests and wildflower meadows. The crystal-clear lake sits at 10,200 feet elevation, surrounded by granite peaks. Perfect for a weekend getaway with excellent fishing and photography opportunities.',
    heroImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200'
  },
  {
    id: '4',
    name: 'Devil\'s Path Traverse',
    location: 'Elka Park, NY',
    region: 'Catskill Mountains',
    distance: 24.0,
    elevationGain: 6800,
    elevationLoss: 6800,
    campsites: 4,
    rating: 4.5,
    reviewCount: 156,
    difficulty: 'Expert',
    duration: '2-3 days',
    waterSources: 5,
    permitRequired: false,
    description: 'Known as the hardest trail in the Catskills, Devil\'s Path lives up to its name with steep scrambles, multiple peaks over 3,500 feet, and technical descents. This traverse covers the entire eastern section including Indian Head, Twin, Sugarloaf, Plateau, and West Kill Mountains.',
    heroImage: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1200'
  },
  {
    id: '5',
    name: 'Kalalau Trail',
    location: 'Hanalei, HI',
    region: 'Nā Pali Coast, Kauai',
    distance: 22.0,
    elevationGain: 3800,
    elevationLoss: 3800,
    campsites: 2,
    rating: 4.9,
    reviewCount: 312,
    difficulty: 'Hard',
    duration: '2-3 days',
    waterSources: 3,
    permitRequired: true,
    description: 'One of the most spectacular coastal hikes in the world. The Kalalau Trail follows the dramatic Nā Pali coastline with towering sea cliffs, secluded beaches, and lush valleys. Hanakāpīʻai and Kalalau beaches provide idyllic camping spots.',
    heroImage: 'https://images.unsplash.com/photo-1546975490-e8b67ccb8f5e?w=1200'
  },
  {
    id: '6',
    name: 'Four Pass Loop',
    location: 'Aspen, CO',
    region: 'Maroon Bells-Snowmass Wilderness',
    distance: 26.7,
    elevationGain: 7800,
    elevationLoss: 7800,
    campsites: 6,
    rating: 4.9,
    reviewCount: 245,
    difficulty: 'Hard',
    duration: '3-4 days',
    waterSources: 7,
    permitRequired: true,
    description: 'The crown jewel of Colorado backpacking. This loop takes hikers over four 12,000+ foot passes with breathtaking views of the Maroon Bells, Snowmass Mountain, and the entire Elk Range. Wildflower-filled meadows and pristine alpine lakes dot the route.',
    heroImage: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=1200'
  }
];

export const sampleCampsites: Record<string, Campsite[]> = {
  '1': [
    { id: 'c1-1', name: 'Roaring Fork Shelter', mileMarker: 5.2, water: true, fire: true, bearBox: true, toilet: true, capacity: 12, rating: 4.5 },
    { id: 'c1-2', name: 'Deer Park Gap', mileMarker: 11.8, water: true, fire: true, bearBox: false, toilet: false, capacity: 6, rating: 4.2 },
    { id: 'c1-3', name: 'Tumbling Run', mileMarker: 16.5, water: true, fire: true, bearBox: true, toilet: true, capacity: 10, rating: 4.7 },
    { id: 'c1-4', name: 'Hot Springs Access', mileMarker: 21.5, water: true, fire: false, bearBox: false, toilet: true, capacity: 4, rating: 3.8 }
  ],
  '2': [
    { id: 'c2-1', name: 'Scissors Crossing', mileMarker: 4.5, water: false, fire: false, bearBox: false, toilet: false, capacity: 4, rating: 3.5 },
    { id: 'c2-2', name: 'Mount Laguna', mileMarker: 12.3, water: true, fire: true, bearBox: true, toilet: true, capacity: 15, rating: 4.6 },
    { id: 'c2-3', name: 'Pioneer Mail', mileMarker: 17.8, water: true, fire: true, bearBox: true, toilet: false, capacity: 8, rating: 4.3 },
    { id: 'c2-4', name: 'Cibbets Flat', mileMarker: 23.1, water: true, fire: true, bearBox: false, toilet: false, capacity: 6, rating: 4.0 },
    { id: 'c2-5', name: 'Warner Springs Camp', mileMarker: 28.3, water: true, fire: true, bearBox: true, toilet: true, capacity: 20, rating: 4.4 }
  ],
  '3': [
    { id: 'c3-1', name: 'Boulder Basin Camp', mileMarker: 3.2, water: true, fire: true, bearBox: true, toilet: true, capacity: 8, rating: 4.5 },
    { id: 'c3-2', name: 'Alpine Meadow', mileMarker: 8.7, water: false, fire: true, bearBox: true, toilet: false, capacity: 6, rating: 4.8 },
    { id: 'c3-3', name: 'Lake Serenity Shore', mileMarker: 14.2, water: true, fire: true, bearBox: true, toilet: true, capacity: 12, rating: 4.9 }
  ],
  '4': [
    { id: 'c4-1', name: 'Prediger Road', mileMarker: 4.0, water: true, fire: true, bearBox: false, toilet: false, capacity: 4, rating: 3.9 },
    { id: 'c4-2', name: 'Mink Hollow', mileMarker: 10.5, water: true, fire: true, bearBox: true, toilet: true, capacity: 10, rating: 4.4 },
    { id: 'c4-3', name: 'Devil\'s Kitchen', mileMarker: 16.2, water: true, fire: true, bearBox: true, toilet: false, capacity: 8, rating: 4.6 },
    { id: 'c4-4', name: 'Diamond Notch', mileMarker: 21.8, water: true, fire: true, bearBox: true, toilet: true, capacity: 12, rating: 4.7 }
  ],
  '5': [
    { id: 'c5-1', name: 'Hanakāpīʻai Beach', mileMarker: 8.0, water: true, fire: true, bearBox: true, toilet: false, capacity: 15, rating: 4.8 },
    { id: 'c5-2', name: 'Kalalau Beach', mileMarker: 22.0, water: true, fire: true, bearBox: true, toilet: true, capacity: 30, rating: 4.9 }
  ],
  '6': [
    { id: 'c6-1', name: 'Geneva Lake', mileMarker: 6.5, water: true, fire: true, bearBox: true, toilet: false, capacity: 10, rating: 4.7 },
    { id: 'c6-2', name: 'Fravert Basin', mileMarker: 12.3, water: true, fire: true, bearBox: true, toilet: true, capacity: 15, rating: 4.8 },
    { id: 'c6-3', name: 'Snowmass Lake', mileMarker: 18.9, water: true, fire: true, bearBox: true, toilet: true, capacity: 20, rating: 4.9 },
    { id: 'c6-4', name: 'Copper Lake', mileMarker: 23.4, water: true, fire: true, bearBox: true, toilet: false, capacity: 8, rating: 4.6 }
  ]
};

export const sampleReviews: Record<string, Review[]> = {
  '1': [
    { id: 'r1-1', user: 'Mountain Mike', avatar: 'MM', rating: 5, date: '2024-05-15', tripDates: 'May 10-12, 2024', text: 'Absolutely incredible section! Max Patch at sunrise was the highlight of the entire trip. The views are unmatched. Campsites were clean and well-maintained. Bring extra water between mile 8-12.', helpful: 24, tags: ['Scenic', 'Well-marked', 'Great campsites'] },
    { id: 'r1-2', user: 'Backpack Betty', avatar: 'BB', rating: 5, date: '2024-04-22', tripDates: 'April 18-20, 2024', text: 'Wildflowers were blooming everywhere! The descent into Hot Springs is steep but manageable. Tumbling Run campsite has the best sunset views.', helpful: 18, tags: ['Wildflowers', 'Hot springs nearby', 'Sunset views'] },
    { id: 'r1-3', user: 'Trail Runner Tom', avatar: 'TT', rating: 4, date: '2024-06-01', tripDates: 'May 28-29, 2024', text: 'Did this as a trail run with overnight. Challenging elevation but so rewarding. Water sources were flowing well in late May.', helpful: 12, tags: ['Trail running', 'Water sources good', 'Challenging'] }
  ],
  '2': [
    { id: 'r2-1', user: 'Desert Dweller', avatar: 'DD', rating: 5, date: '2024-03-20', tripDates: 'March 15-18, 2024', text: 'Classic PCT desert section. Eagle Rock is iconic. Bring plenty of water capacity - 4L minimum in dry sections. Warner Springs is a great resupply spot.', helpful: 32, tags: ['Water cache', 'Wildflowers', 'Eagle Rock'] },
    { id: 'r2-2', user: 'PCT 2024', avatar: 'P2', rating: 4, date: '2024-04-10', tripDates: 'April 5-8, 2024', text: 'Long water carries but beautiful oak woodlands. The transition from desert to mountains is magical. Saw lots of thru-hikers.', helpful: 15, tags: ['PCT Section', 'Long water carries', 'Oak woodlands'] }
  ],
  '3': [
    { id: 'r3-1', user: 'Alpine Addict', avatar: 'AA', rating: 5, date: '2024-07-05', tripDates: 'July 1-2, 2024', text: 'Perfection! The lake is crystal clear and perfect for a mid-hike swim. Moose sighting at dawn! Permit system works well - book early.', helpful: 28, tags: ['Moose sighting', 'Swimming', 'Permit required'] },
    { id: 'r3-2', user: 'Weekend Warrior', avatar: 'WW', rating: 5, date: '2024-06-25', tripDates: 'June 22-23, 2024', text: 'Did this as a day hike but saw many backpackers. The wildflowers were at peak bloom. Fishing is excellent - caught 4 trout!', helpful: 22, tags: ['Fishing', 'Wildflowers', 'Day hike option'] }
  ],
  '4': [
    { id: 'r4-1', user: 'Catskill Crusher', avatar: 'CC', rating: 5, date: '2024-06-10', tripDates: 'June 7-9, 2024', text: 'The hardest hike I\'ve done in the Northeast. The scrambles are no joke - bring gloves! Views from Indian Head and Twin are incredible. Not for beginners.', helpful: 19, tags: ['Technical scrambling', 'Challenging', 'Great views'] },
    { id: 'r4-2', user: 'Peak Bagger', avatar: 'PB', rating: 4, date: '2024-05-30', tripDates: 'May 25-27, 2024', text: 'Five 3500ers in one trip! Devil\'s Kitchen lean-to is a lifesaver in bad weather. The descent from West Kill is brutal on the knees.', helpful: 14, tags: ['3500 Club', 'Lean-to', 'Knee killer'] }
  ],
  '5': [
    { id: 'r5-1', user: 'Island Hopper', avatar: 'IH', rating: 5, date: '2024-04-15', tripDates: 'April 10-12, 2024', text: 'Paradise on Earth! The trail is challenging with narrow sections, but Hanakāpīʻai and Kalalau beaches make it all worth it. Permit is essential.', helpful: 45, tags: ['Beach camping', 'Permit required', 'Cliff hiking'] },
    { id: 'r5-2', user: 'Hawaii Explorer', avatar: 'HE', rating: 5, date: '2024-03-25', tripDates: 'March 20-22, 2024', text: 'Best hike in Hawaii. Waterfalls, beaches, cliffs, and valleys all in one. Bring water shoes for stream crossings. Camp right on the sand at Kalalau.', helpful: 38, tags: ['Waterfalls', 'Stream crossings', 'Beach camping'] }
  ],
  '6': [
    { id: 'r6-1', user: 'Colorado Native', avatar: 'CN', rating: 5, date: '2024-08-20', tripDates: 'August 15-18, 2024', text: 'The Four Pass Loop is Colorado\'s finest. Every pass offers different views. Snowmass Lake is my favorite campsite. Start early - afternoon storms are real!', helpful: 41, tags: ['Alpine lakes', 'Four passes', 'Thunderstorms'] },
    { id: 'r6-2', user: 'High Altitude', avatar: 'HA', rating: 5, date: '2024-07-30', tripDates: 'July 25-28, 2024', text: 'Hard but incredibly rewarding. The wildflowers in Fravert Basin are the best I\'ve seen. Saw mountain goats near Buckskin Pass.', helpful: 29, tags: ['Mountain goats', 'Wildflowers', 'High altitude'] },
    { id: 'r6-3', user: 'Sunrise Chaser', avatar: 'SC', rating: 5, date: '2024-09-05', tripDates: 'September 1-4, 2024', text: 'Did this counter-clockwise. West Maroon Pass at sunrise was magical. Fewer crowds in September. Aspens were starting to turn.', helpful: 25, tags: ['Fall colors', 'Counter-clockwise', 'Sunrise views'] }
  ]
};
