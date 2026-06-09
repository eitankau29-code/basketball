export interface Player {
  id: string;
  name: string;
  isForeign: boolean;
  teams: string[];     // E.g., ["מכבי תל אביב", "הפועל ירושלים"]
  nba: boolean;
  drafted: boolean;
  championship: boolean;
  cup: boolean;
  nationalTeam: boolean;
  over205: boolean;
  position: 'guard' | 'big';
  scored1500: boolean;
  euroleague: boolean;
  coachedByKattash: boolean;
  coachedByGershon: boolean;
  finalsMVP: boolean;
  played3PlusTeams: boolean;
  popularity: number; // Rarity percentage from 1 to 100
}

export interface Category {
  id: string;
  label: string;
  icon: string;
  description: string;
  colorClass: string;
}
