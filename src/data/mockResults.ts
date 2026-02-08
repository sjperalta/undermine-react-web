import { Position } from "./types";

export interface PlayerResult {
  name: string;
  team: string;
  position: Position;
  stats: {
    goals: number;
    assists: number;
    cleanSheet: boolean;
    saves: number;
    yellowCards: number;
    redCards: number;
    minutesPlayed: number;
  };
  points: number;
}

export interface ContestResult {
  rank: number;
  username: string;
  totalPoints: number;
  prize: string;
  lineup: PlayerResult[];
}

export const mockContestResults: Record<string, ContestResult[]> = {
  c4: [
    {
      rank: 1,
      username: "TacticalGenius99",
      totalPoints: 142,
      prize: "$50,000",
      lineup: [
        { name: "Alisson Becker", team: "Liverpool", position: "GK", stats: { goals: 0, assists: 0, cleanSheet: true, saves: 5, yellowCards: 0, redCards: 0, minutesPlayed: 90 }, points: 14 },
        { name: "Virgil van Dijk", team: "Liverpool", position: "DEF", stats: { goals: 1, assists: 0, cleanSheet: true, saves: 0, yellowCards: 0, redCards: 0, minutesPlayed: 90 }, points: 18 },
        { name: "William Saliba", team: "Arsenal", position: "DEF", stats: { goals: 0, assists: 1, cleanSheet: true, saves: 0, yellowCards: 0, redCards: 0, minutesPlayed: 90 }, points: 13 },
        { name: "Trent Alexander-Arnold", team: "Liverpool", position: "DEF", stats: { goals: 0, assists: 2, cleanSheet: false, saves: 0, yellowCards: 1, redCards: 0, minutesPlayed: 90 }, points: 11 },
        { name: "Kevin De Bruyne", team: "Man City", position: "MID", stats: { goals: 1, assists: 2, cleanSheet: false, saves: 0, yellowCards: 0, redCards: 0, minutesPlayed: 90 }, points: 16 },
        { name: "Bukayo Saka", team: "Arsenal", position: "MID", stats: { goals: 1, assists: 1, cleanSheet: false, saves: 0, yellowCards: 0, redCards: 0, minutesPlayed: 90 }, points: 14 },
        { name: "Phil Foden", team: "Man City", position: "MID", stats: { goals: 0, assists: 1, cleanSheet: false, saves: 0, yellowCards: 0, redCards: 0, minutesPlayed: 78 }, points: 8 },
        { name: "Cole Palmer", team: "Chelsea", position: "MID", stats: { goals: 2, assists: 0, cleanSheet: false, saves: 0, yellowCards: 0, redCards: 0, minutesPlayed: 90 }, points: 15 },
        { name: "Declan Rice", team: "Arsenal", position: "MID", stats: { goals: 0, assists: 0, cleanSheet: false, saves: 0, yellowCards: 0, redCards: 0, minutesPlayed: 90 }, points: 5 },
        { name: "Erling Haaland", team: "Man City", position: "FWD", stats: { goals: 2, assists: 1, cleanSheet: false, saves: 0, yellowCards: 0, redCards: 0, minutesPlayed: 90 }, points: 17 },
        { name: "Mohamed Salah", team: "Liverpool", position: "FWD", stats: { goals: 1, assists: 1, cleanSheet: false, saves: 0, yellowCards: 0, redCards: 0, minutesPlayed: 85 }, points: 11 },
      ],
    },
    {
      rank: 2,
      username: "xGoalMaster",
      totalPoints: 138,
      prize: "$25,000",
      lineup: [
        { name: "André Onana", team: "Man United", position: "GK", stats: { goals: 0, assists: 0, cleanSheet: false, saves: 7, yellowCards: 0, redCards: 0, minutesPlayed: 90 }, points: 10 },
        { name: "Joško Gvardiol", team: "Man City", position: "DEF", stats: { goals: 1, assists: 0, cleanSheet: false, saves: 0, yellowCards: 0, redCards: 0, minutesPlayed: 90 }, points: 12 },
        { name: "Virgil van Dijk", team: "Liverpool", position: "DEF", stats: { goals: 1, assists: 0, cleanSheet: true, saves: 0, yellowCards: 0, redCards: 0, minutesPlayed: 90 }, points: 18 },
        { name: "Lisandro Martínez", team: "Man United", position: "DEF", stats: { goals: 0, assists: 0, cleanSheet: false, saves: 0, yellowCards: 1, redCards: 0, minutesPlayed: 90 }, points: 4 },
        { name: "Kevin De Bruyne", team: "Man City", position: "MID", stats: { goals: 1, assists: 2, cleanSheet: false, saves: 0, yellowCards: 0, redCards: 0, minutesPlayed: 90 }, points: 16 },
        { name: "Martin Ødegaard", team: "Arsenal", position: "MID", stats: { goals: 1, assists: 1, cleanSheet: false, saves: 0, yellowCards: 0, redCards: 0, minutesPlayed: 90 }, points: 13 },
        { name: "Cole Palmer", team: "Chelsea", position: "MID", stats: { goals: 2, assists: 0, cleanSheet: false, saves: 0, yellowCards: 0, redCards: 0, minutesPlayed: 90 }, points: 15 },
        { name: "Bernardo Silva", team: "Man City", position: "MID", stats: { goals: 0, assists: 2, cleanSheet: false, saves: 0, yellowCards: 0, redCards: 0, minutesPlayed: 90 }, points: 10 },
        { name: "Bukayo Saka", team: "Arsenal", position: "MID", stats: { goals: 1, assists: 1, cleanSheet: false, saves: 0, yellowCards: 0, redCards: 0, minutesPlayed: 90 }, points: 14 },
        { name: "Alexander Isak", team: "Newcastle", position: "FWD", stats: { goals: 2, assists: 0, cleanSheet: false, saves: 0, yellowCards: 0, redCards: 0, minutesPlayed: 90 }, points: 15 },
        { name: "Erling Haaland", team: "Man City", position: "FWD", stats: { goals: 1, assists: 0, cleanSheet: false, saves: 0, yellowCards: 0, redCards: 0, minutesPlayed: 67 }, points: 11 },
      ],
    },
    {
      rank: 3,
      username: "PitchProphet",
      totalPoints: 131,
      prize: "$15,000",
      lineup: [
        { name: "Alisson Becker", team: "Liverpool", position: "GK", stats: { goals: 0, assists: 0, cleanSheet: true, saves: 5, yellowCards: 0, redCards: 0, minutesPlayed: 90 }, points: 14 },
        { name: "William Saliba", team: "Arsenal", position: "DEF", stats: { goals: 0, assists: 1, cleanSheet: true, saves: 0, yellowCards: 0, redCards: 0, minutesPlayed: 90 }, points: 13 },
        { name: "Trent Alexander-Arnold", team: "Liverpool", position: "DEF", stats: { goals: 0, assists: 2, cleanSheet: false, saves: 0, yellowCards: 1, redCards: 0, minutesPlayed: 90 }, points: 11 },
        { name: "Joško Gvardiol", team: "Man City", position: "DEF", stats: { goals: 1, assists: 0, cleanSheet: false, saves: 0, yellowCards: 0, redCards: 0, minutesPlayed: 90 }, points: 12 },
        { name: "Phil Foden", team: "Man City", position: "MID", stats: { goals: 1, assists: 1, cleanSheet: false, saves: 0, yellowCards: 0, redCards: 0, minutesPlayed: 90 }, points: 13 },
        { name: "Martin Ødegaard", team: "Arsenal", position: "MID", stats: { goals: 1, assists: 1, cleanSheet: false, saves: 0, yellowCards: 0, redCards: 0, minutesPlayed: 90 }, points: 13 },
        { name: "Declan Rice", team: "Arsenal", position: "MID", stats: { goals: 0, assists: 1, cleanSheet: false, saves: 0, yellowCards: 0, redCards: 0, minutesPlayed: 90 }, points: 7 },
        { name: "Bernardo Silva", team: "Man City", position: "MID", stats: { goals: 0, assists: 0, cleanSheet: false, saves: 0, yellowCards: 0, redCards: 0, minutesPlayed: 90 }, points: 4 },
        { name: "Bukayo Saka", team: "Arsenal", position: "MID", stats: { goals: 0, assists: 1, cleanSheet: false, saves: 0, yellowCards: 0, redCards: 0, minutesPlayed: 90 }, points: 8 },
        { name: "Erling Haaland", team: "Man City", position: "FWD", stats: { goals: 2, assists: 1, cleanSheet: false, saves: 0, yellowCards: 0, redCards: 0, minutesPlayed: 90 }, points: 17 },
        { name: "Ollie Watkins", team: "Aston Villa", position: "FWD", stats: { goals: 2, assists: 0, cleanSheet: false, saves: 0, yellowCards: 0, redCards: 0, minutesPlayed: 90 }, points: 13 },
      ],
    },
    {
      rank: 4,
      username: "SetPieceKing",
      totalPoints: 127,
      prize: "$5,000",
      lineup: [
        { name: "Robert Sánchez", team: "Chelsea", position: "GK", stats: { goals: 0, assists: 0, cleanSheet: false, saves: 3, yellowCards: 0, redCards: 0, minutesPlayed: 90 }, points: 6 },
        { name: "Virgil van Dijk", team: "Liverpool", position: "DEF", stats: { goals: 1, assists: 0, cleanSheet: true, saves: 0, yellowCards: 0, redCards: 0, minutesPlayed: 90 }, points: 18 },
        { name: "Lisandro Martínez", team: "Man United", position: "DEF", stats: { goals: 0, assists: 0, cleanSheet: false, saves: 0, yellowCards: 1, redCards: 0, minutesPlayed: 90 }, points: 4 },
        { name: "Trent Alexander-Arnold", team: "Liverpool", position: "DEF", stats: { goals: 0, assists: 2, cleanSheet: false, saves: 0, yellowCards: 1, redCards: 0, minutesPlayed: 90 }, points: 11 },
        { name: "Kevin De Bruyne", team: "Man City", position: "MID", stats: { goals: 1, assists: 2, cleanSheet: false, saves: 0, yellowCards: 0, redCards: 0, minutesPlayed: 90 }, points: 16 },
        { name: "Cole Palmer", team: "Chelsea", position: "MID", stats: { goals: 2, assists: 0, cleanSheet: false, saves: 0, yellowCards: 0, redCards: 0, minutesPlayed: 90 }, points: 15 },
        { name: "Bukayo Saka", team: "Arsenal", position: "MID", stats: { goals: 1, assists: 1, cleanSheet: false, saves: 0, yellowCards: 0, redCards: 0, minutesPlayed: 90 }, points: 14 },
        { name: "Declan Rice", team: "Arsenal", position: "MID", stats: { goals: 0, assists: 0, cleanSheet: false, saves: 0, yellowCards: 0, redCards: 0, minutesPlayed: 90 }, points: 5 },
        { name: "Phil Foden", team: "Man City", position: "MID", stats: { goals: 0, assists: 1, cleanSheet: false, saves: 0, yellowCards: 0, redCards: 0, minutesPlayed: 78 }, points: 8 },
        { name: "Mohamed Salah", team: "Liverpool", position: "FWD", stats: { goals: 2, assists: 0, cleanSheet: false, saves: 0, yellowCards: 0, redCards: 0, minutesPlayed: 90 }, points: 15 },
        { name: "Gabriel Jesus", team: "Arsenal", position: "FWD", stats: { goals: 1, assists: 1, cleanSheet: false, saves: 0, yellowCards: 0, redCards: 0, minutesPlayed: 90 }, points: 11 },
      ],
    },
    {
      rank: 5,
      username: "FormationFreak",
      totalPoints: 122,
      prize: "$3,000",
      lineup: [
        { name: "Alisson Becker", team: "Liverpool", position: "GK", stats: { goals: 0, assists: 0, cleanSheet: true, saves: 5, yellowCards: 0, redCards: 0, minutesPlayed: 90 }, points: 14 },
        { name: "Virgil van Dijk", team: "Liverpool", position: "DEF", stats: { goals: 1, assists: 0, cleanSheet: true, saves: 0, yellowCards: 0, redCards: 0, minutesPlayed: 90 }, points: 18 },
        { name: "William Saliba", team: "Arsenal", position: "DEF", stats: { goals: 0, assists: 1, cleanSheet: true, saves: 0, yellowCards: 0, redCards: 0, minutesPlayed: 90 }, points: 13 },
        { name: "Joško Gvardiol", team: "Man City", position: "DEF", stats: { goals: 1, assists: 0, cleanSheet: false, saves: 0, yellowCards: 0, redCards: 0, minutesPlayed: 90 }, points: 12 },
        { name: "Martin Ødegaard", team: "Arsenal", position: "MID", stats: { goals: 1, assists: 1, cleanSheet: false, saves: 0, yellowCards: 0, redCards: 0, minutesPlayed: 90 }, points: 13 },
        { name: "Bernardo Silva", team: "Man City", position: "MID", stats: { goals: 0, assists: 0, cleanSheet: false, saves: 0, yellowCards: 0, redCards: 0, minutesPlayed: 90 }, points: 4 },
        { name: "Declan Rice", team: "Arsenal", position: "MID", stats: { goals: 0, assists: 0, cleanSheet: false, saves: 0, yellowCards: 0, redCards: 0, minutesPlayed: 90 }, points: 5 },
        { name: "Phil Foden", team: "Man City", position: "MID", stats: { goals: 0, assists: 1, cleanSheet: false, saves: 0, yellowCards: 0, redCards: 0, minutesPlayed: 78 }, points: 8 },
        { name: "Cole Palmer", team: "Chelsea", position: "MID", stats: { goals: 0, assists: 0, cleanSheet: false, saves: 0, yellowCards: 0, redCards: 0, minutesPlayed: 65 }, points: 4 },
        { name: "Erling Haaland", team: "Man City", position: "FWD", stats: { goals: 2, assists: 1, cleanSheet: false, saves: 0, yellowCards: 0, redCards: 0, minutesPlayed: 90 }, points: 17 },
        { name: "Alexander Isak", team: "Newcastle", position: "FWD", stats: { goals: 1, assists: 1, cleanSheet: false, saves: 0, yellowCards: 0, redCards: 0, minutesPlayed: 90 }, points: 11 },
      ],
    },
    {
      rank: 6, username: "DerbyDayHero", totalPoints: 118, prize: "$2,000",
      lineup: [
        { name: "André Onana", team: "Man United", position: "GK", stats: { goals: 0, assists: 0, cleanSheet: false, saves: 7, yellowCards: 0, redCards: 0, minutesPlayed: 90 }, points: 10 },
        { name: "Virgil van Dijk", team: "Liverpool", position: "DEF", stats: { goals: 1, assists: 0, cleanSheet: true, saves: 0, yellowCards: 0, redCards: 0, minutesPlayed: 90 }, points: 18 },
        { name: "Lisandro Martínez", team: "Man United", position: "DEF", stats: { goals: 0, assists: 0, cleanSheet: false, saves: 0, yellowCards: 1, redCards: 0, minutesPlayed: 90 }, points: 4 },
        { name: "William Saliba", team: "Arsenal", position: "DEF", stats: { goals: 0, assists: 1, cleanSheet: true, saves: 0, yellowCards: 0, redCards: 0, minutesPlayed: 90 }, points: 13 },
        { name: "Kevin De Bruyne", team: "Man City", position: "MID", stats: { goals: 1, assists: 2, cleanSheet: false, saves: 0, yellowCards: 0, redCards: 0, minutesPlayed: 90 }, points: 16 },
        { name: "Bukayo Saka", team: "Arsenal", position: "MID", stats: { goals: 0, assists: 1, cleanSheet: false, saves: 0, yellowCards: 0, redCards: 0, minutesPlayed: 90 }, points: 8 },
        { name: "Phil Foden", team: "Man City", position: "MID", stats: { goals: 0, assists: 1, cleanSheet: false, saves: 0, yellowCards: 0, redCards: 0, minutesPlayed: 78 }, points: 8 },
        { name: "Declan Rice", team: "Arsenal", position: "MID", stats: { goals: 0, assists: 0, cleanSheet: false, saves: 0, yellowCards: 0, redCards: 0, minutesPlayed: 90 }, points: 5 },
        { name: "Bernardo Silva", team: "Man City", position: "MID", stats: { goals: 0, assists: 0, cleanSheet: false, saves: 0, yellowCards: 0, redCards: 0, minutesPlayed: 90 }, points: 4 },
        { name: "Ollie Watkins", team: "Aston Villa", position: "FWD", stats: { goals: 2, assists: 0, cleanSheet: false, saves: 0, yellowCards: 0, redCards: 0, minutesPlayed: 90 }, points: 13 },
        { name: "Gabriel Jesus", team: "Arsenal", position: "FWD", stats: { goals: 2, assists: 1, cleanSheet: false, saves: 0, yellowCards: 0, redCards: 0, minutesPlayed: 90 }, points: 15 },
      ],
    },
  ],
};
