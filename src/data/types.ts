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

export interface LiveEvent {
  id: string;
  type: "GOAL" | "ASSIST" | "YELLOW_CARD" | "RED_CARD" | "SAVE" | "PENALTY";
  player: string;
  match: string;
  team: string; // Added field
  minute: number;
  points: number;
}

export interface UserStats {
  rank: number;
  totalPoints: number;
  activeContests: number;
  pointsThisWeek: number;
}

export interface RealMatch {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeCrest?: string;
  awayCrest?: string;
  startTime: string;
  status: "scheduled" | "live" | "finished";
  score?: { home: number; away: number };
}

export interface PlayerNews {
  id: string;
  playerName: string;
  category: "injury" | "starting" | "transfer";
  headline: string;
  time: string;
}

export interface OwnershipTrend {
  playerName: string;
  percentage: number;
  change: "up" | "down" | "neutral";
}

export interface UserLineup {
  id: string;
  contestId: string;
  contestTitle: string;
  players: Player[];
  points: number;
  rank?: number;
  status: "upcoming" | "live" | "completed";
}
