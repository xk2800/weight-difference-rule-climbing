// Defines common types used throughout the application for consistency.

// Belayer experience levels
export type Experience = 'beginner' | 'intermediate' | 'advanced';
// Weight units
export type Unit = 'kg' | 'lbs';

// The structure of the calculation result object
export interface ResultState {
  safety: 'safe' | 'caution' | 'unsafe';
  weightDiff: string;
  percentDiff: string;
  recommendation: string;
  tips: string[];
  isHeavierClimber: boolean;
}

// The structure of a saved climber-belayer pair
export interface Pair {
  climber: number;
  belayer: number;
  unit: string;
  device: string;
  timestamp: string;
} 