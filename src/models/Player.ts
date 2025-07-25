export interface Player {
  id: string;
  name: string;
  score: number;
  avatar: string;
  level: number;
  position: number;
  country?: string;
}

export type TimeFilter = 'allTime' | 'thisWeek' | 'thisMonth';
