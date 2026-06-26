export type Difficulty = 'Easy' | 'Moderate' | 'Hard' | 'Expert';

export interface Trail {
  id: string;
  name: string;
  location: string;
  region: string;
  distance: number;
  elevationGain: number;
  elevationLoss?: number;
  campsites: number;
  rating: number;
  reviewCount: number;
  difficulty: Difficulty;
  duration: string;
  waterSources: number;
  permitRequired: boolean;
  description: string;
  heroImage: string;
}

export interface Campsite {
  id: string;
  name: string;
  mileMarker: number;
  water: boolean;
  fire: boolean;
  bearBox: boolean;
  toilet: boolean;
  capacity: number;
  rating: number;
}

export interface Review {
  id: string;
  user: string;
  avatar: string;
  rating: number;
  date: string;
  tripDates: string;
  text: string;
  helpful: number;
  tags: string[];
}

export interface TripDay {
  day: number;
  date: string;
  startPoint: string;
  endPoint: string;
  campsiteId: string;
  miles: number;
  elevationGain: number;
  elevationLoss: number;
  startTime: string;
  notes: string;
}

export interface Trip {
  id: string;
  name: string;
  trailId: string;
  trailName: string;
  startDate: string;
  endDate: string;
  groupSize: number;
  days: TripDay[];
}

export type PageView = 'discovery' | 'detail' | 'planner';

export interface FilterState {
  duration: string[];
  difficulty: Difficulty[];
  features: string[];
  distance: string | null;
}
