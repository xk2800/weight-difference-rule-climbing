export type Experience = 'beginner' | 'intermediate' | 'advanced';
export type Unit = 'kg' | 'lbs';

export interface ResultState {
  safety: 'safe' | 'caution' | 'unsafe';
  weightDiff: string;
  percentDiff: string;
  recommendation: string;
  tips: string[];
}

export interface Pair {
  climber: number;
  belayer: number;
  unit: string;
  device: string;
  timestamp: string;
} 