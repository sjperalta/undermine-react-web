export type Position = "GK" | "DEF" | "MID" | "FWD";
export type ContestStatus = "draft" | "open" | "locked" | "completed";

export interface Player {
  id: string;
  name: string;
  team: string;
  position: Position;
  salary: number;
  points: number;
  imageUrl: string;
}

export interface Contest {
  id: string;
  title: string;
  status: ContestStatus;
  entryFee: number;
  prizePool: string;
  entrants: number;
  maxEntrants: number;
  startTime: string;
  endTime: string;
  salaryCap: number;
  matches: string[];
}

export interface LineupSlot {
  position: Position;
  player: Player | null;
}

export interface LeaderboardEntry {
  rank: number;
  username: string;
  points: number;
  lineup: string[];
}
