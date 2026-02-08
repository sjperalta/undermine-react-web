import { Contest, Player, LeaderboardEntry, LiveEvent, UserStats, RealMatch, PlayerNews, OwnershipTrend, UserLineup } from "./types";

export const mockPlayers: Player[] = [
  { id: "p1", name: "Erling Haaland", team: "Man City", position: "FWD", salary: 12000, points: 24, imageUrl: "" },
  { id: "p2", name: "Mohamed Salah", team: "Liverpool", position: "FWD", salary: 11500, points: 21, imageUrl: "" },
  { id: "p3", name: "Bukayo Saka", team: "Arsenal", position: "MID", salary: 10500, points: 18, imageUrl: "" },
  { id: "p4", name: "Kevin De Bruyne", team: "Man City", position: "MID", salary: 11000, points: 22, imageUrl: "" },
  { id: "p5", name: "Virgil van Dijk", team: "Liverpool", position: "DEF", salary: 8500, points: 12, imageUrl: "" },
  { id: "p6", name: "Alisson Becker", team: "Liverpool", position: "GK", salary: 7000, points: 9, imageUrl: "" },
  { id: "p7", name: "Phil Foden", team: "Man City", position: "MID", salary: 10000, points: 16, imageUrl: "" },
  { id: "p8", name: "Martin Ødegaard", team: "Arsenal", position: "MID", salary: 9500, points: 15, imageUrl: "" },
  { id: "p9", name: "William Saliba", team: "Arsenal", position: "DEF", salary: 8000, points: 11, imageUrl: "" },
  { id: "p10", name: "Cole Palmer", team: "Chelsea", position: "MID", salary: 9000, points: 19, imageUrl: "" },
  { id: "p11", name: "Alexander Isak", team: "Newcastle", position: "FWD", salary: 10000, points: 17, imageUrl: "" },
  { id: "p12", name: "Declan Rice", team: "Arsenal", position: "MID", salary: 8500, points: 13, imageUrl: "" },
  { id: "p13", name: "Trent Alexander-Arnold", team: "Liverpool", position: "DEF", salary: 8000, points: 14, imageUrl: "" },
  { id: "p14", name: "André Onana", team: "Man United", position: "GK", salary: 6500, points: 7, imageUrl: "" },
  { id: "p15", name: "Gabriel Jesus", team: "Arsenal", position: "FWD", salary: 8500, points: 10, imageUrl: "" },
  { id: "p16", name: "Bernardo Silva", team: "Man City", position: "MID", salary: 9000, points: 14, imageUrl: "" },
  { id: "p17", name: "Lisandro Martínez", team: "Man United", position: "DEF", salary: 7500, points: 9, imageUrl: "" },
  { id: "p18", name: "Robert Sánchez", team: "Chelsea", position: "GK", salary: 6000, points: 6, imageUrl: "" },
  { id: "p19", name: "Ollie Watkins", team: "Aston Villa", position: "FWD", salary: 9000, points: 15, imageUrl: "" },
  { id: "p20", name: "Joško Gvardiol", team: "Man City", position: "DEF", salary: 7500, points: 10, imageUrl: "" },
];

export const mockContests: Contest[] = [
  {
    id: "c1",
    title: "Premier League Gameweek 24",
    status: "open",
    entryFee: 25,
    prizePool: "$50,000",
    entrants: 1247,
    maxEntrants: 5000,
    startTime: new Date(Date.now() + 3600000 * 4).toISOString(),
    endTime: new Date(Date.now() + 3600000 * 28).toISOString(),
    salaryCap: 100000,
    matches: ["Man City vs Liverpool", "Arsenal vs Chelsea", "Newcastle vs Aston Villa"],
  },
  {
    id: "c2",
    title: "Champions League Round of 16",
    status: "open",
    entryFee: 10,
    prizePool: "$15,000",
    entrants: 892,
    maxEntrants: 3000,
    startTime: new Date(Date.now() + 3600000 * 24).toISOString(),
    endTime: new Date(Date.now() + 3600000 * 48).toISOString(),
    salaryCap: 100000,
    matches: ["Barcelona vs PSG", "Bayern vs Arsenal", "Real Madrid vs Man City"],
  },
  {
    id: "c3",
    title: "La Liga Matchday 22",
    status: "locked",
    entryFee: 5,
    prizePool: "$5,000",
    entrants: 654,
    maxEntrants: 2000,
    startTime: new Date(Date.now() - 3600000 * 2).toISOString(),
    endTime: new Date(Date.now() + 3600000 * 6).toISOString(),
    salaryCap: 100000,
    matches: ["Real Madrid vs Atlético", "Barcelona vs Sevilla"],
  },
  {
    id: "c4",
    title: "Serie A Giornata 20",
    status: "completed",
    entryFee: 50,
    prizePool: "$100,000",
    entrants: 430,
    maxEntrants: 1500,
    startTime: new Date(Date.now() - 3600000 * 48).toISOString(),
    endTime: new Date(Date.now() - 3600000 * 24).toISOString(),
    salaryCap: 100000,
    matches: ["Inter vs Juventus", "AC Milan vs Napoli"],
  },
  {
    id: "c6",
    title: "MLS Weekend Special",
    status: "open",
    entryFee: 0,
    prizePool: "$5,000",
    entrants: 2100,
    maxEntrants: 10000,
    startTime: new Date(Date.now() + 3600000 * 12).toISOString(),
    endTime: new Date(Date.now() + 3600000 * 36).toISOString(),
    salaryCap: 100000,
    matches: ["LAFC vs Galaxy", "Inter Miami vs Orlando"],
  },
  {
    id: "c7",
    title: "Bundesliga Blitz",
    status: "open",
    entryFee: 15,
    prizePool: "$20,000",
    entrants: 450,
    maxEntrants: 2000,
    startTime: new Date(Date.now() + 3600000 * 48).toISOString(),
    endTime: new Date(Date.now() + 3600000 * 72).toISOString(),
    salaryCap: 100000,
    matches: ["Bayern vs Dortmund", "Leipzig vs Leverkusen"],
  },
  {
    id: "c8",
    title: "Friday Night Lights",
    status: "locked",
    entryFee: 2,
    prizePool: "$1,000",
    entrants: 480,
    maxEntrants: 500,
    startTime: new Date(Date.now() - 3600000 * 1).toISOString(),
    endTime: new Date(Date.now() + 3600000 * 3).toISOString(),
    salaryCap: 100000,
    matches: ["Monaco vs Lyon", "Nice vs Marseille"],
  },
  {
    id: "c9",
    title: "Eredivisie Elite",
    status: "open",
    entryFee: 5,
    prizePool: "$3,000",
    entrants: 120,
    maxEntrants: 1000,
    startTime: new Date(Date.now() + 3600000 * 72).toISOString(),
    endTime: new Date(Date.now() + 3600000 * 96).toISOString(),
    salaryCap: 100000,
    matches: ["Ajax vs PSV", "Feyenoord vs AZ"],
  },
];

// Add a contest the user has joined but not finished
export const mockJoinedContests: Contest[] = [
  {
    id: "c5",
    title: "Weekend Warriors",
    status: "open",
    entryFee: 0,
    prizePool: "$2,000",
    entrants: 156,
    maxEntrants: 1000,
    startTime: new Date(Date.now() + 3600000 * 2).toISOString(),
    endTime: new Date(Date.now() + 3600000 * 20).toISOString(),
    salaryCap: 100000,
    matches: ["Spurs vs Man Utd", "West Ham vs Wolves"],
  }
];

export const mockUserStats: UserStats = {
  rank: 1245,
  totalPoints: 2450,
  activeContests: 2,
  pointsThisWeek: 156,
};

export const mockRealMatches: RealMatch[] = [
  {
    id: "m1",
    homeTeam: "Man City",
    awayTeam: "Liverpool",
    homeCrest: "crest_blue_lion",
    awayCrest: "crest_red_phoenix",
    startTime: new Date().toISOString(),
    status: "live",
    score: { home: 1, away: 1 }
  },
  {
    id: "m2",
    homeTeam: "Arsenal",
    awayTeam: "Chelsea",
    homeCrest: "crest_gold_eagle",
    awayCrest: "crest_green_dragon",
    startTime: new Date(Date.now() + 3600000).toISOString(),
    status: "scheduled"
  },
  {
    id: "m3",
    homeTeam: "Tottenham",
    awayTeam: "Man Utd",
    homeCrest: "crest_white_wolf",
    awayCrest: "crest_black_panther",
    startTime: new Date(Date.now() + 3600000 * 24).toISOString(),
    status: "scheduled"
  },
];

export const mockLeagueTable = [
  { pos: 1, name: "Liverpool", gp: 24, w: 16, d: 6, l: 2, gf: 55, ga: 23, gd: 32, pts: 54 },
  { pos: 2, name: "Man City", gp: 23, w: 16, d: 4, l: 3, gf: 56, ga: 25, gd: 31, pts: 52 },
  { pos: 3, name: "Arsenal", gp: 24, w: 16, d: 4, l: 4, gf: 53, ga: 22, gd: 31, pts: 52 },
  { pos: 4, name: "Tottenham", gp: 24, w: 14, d: 5, l: 5, gf: 51, ga: 38, gd: 13, pts: 47 },
  { pos: 5, name: "Aston Villa", gp: 24, w: 14, d: 4, l: 6, gf: 50, ga: 32, gd: 18, pts: 46 },
  { pos: 6, name: "Man Utd", gp: 24, w: 13, d: 2, l: 9, gf: 33, ga: 33, gd: 0, pts: 41 },
  { pos: 7, name: "Newcastle", gp: 24, w: 11, d: 3, l: 10, gf: 51, ga: 39, gd: 12, pts: 36 },
  { pos: 8, name: "West Ham", gp: 24, w: 10, d: 6, l: 8, gf: 36, ga: 42, gd: -6, pts: 36 },
  { pos: 9, name: "Chelsea", gp: 24, w: 10, d: 4, l: 10, gf: 41, ga: 40, gd: 1, pts: 34 },
  { pos: 10, name: "Brighton", gp: 24, w: 9, d: 8, l: 7, gf: 43, ga: 40, gd: 3, pts: 35 },
];

export const mockPlayerNews: PlayerNews[] = [
  { id: "n1", playerName: "Kevin De Bruyne", category: "starting", headline: "Confirmed in starting lineup vs Liverpool", time: "15m ago" },
  { id: "n2", playerName: "Bukayo Saka", category: "injury", headline: "Doubtful for Chelsea match with calf strain", time: "1h ago" },
  { id: "n3", playerName: "Erling Haaland", category: "starting", headline: "Starting as lone striker", time: "15m ago" },
];

export const mockOwnershipTrends: OwnershipTrend[] = [
  { playerName: "Mohamed Salah", percentage: 72, change: "up" },
  { playerName: "Cole Palmer", percentage: 58, change: "up" },
  { playerName: "William Saliba", percentage: 45, change: "neutral" },
  { playerName: "Ollie Watkins", percentage: 38, change: "down" },
];

export const mockUserLineups: UserLineup[] = [
  {
    id: "l1",
    contestId: "c1",
    contestTitle: "Premier League Gameweek 24",
    players: mockPlayers.slice(0, 5),
    points: 124,
    rank: 42,
    status: "live",
  },
  {
    id: "l2",
    contestId: "c2",
    contestTitle: "Champions League Round of 16",
    players: mockPlayers.slice(5, 10),
    points: 0,
    status: "upcoming",
  },
];

export const mockLeaderboard: LeaderboardEntry[] = [
  { rank: 1, username: "TacticalGenius99", points: 142, lineup: ["Haaland", "Salah", "De Bruyne"] },
  { rank: 2, username: "xGoalMaster", points: 138, lineup: ["Palmer", "Saka", "Isak"] },
  { rank: 3, username: "PitchProphet", points: 131, lineup: ["Foden", "Haaland", "Salah"] },
  { rank: 4, username: "SetPieceKing", points: 127, lineup: ["De Bruyne", "Salah", "Saka"] },
  { rank: 5, username: "FormationFreak", points: 122, lineup: ["Haaland", "Palmer", "Ødegaard"] },
  { rank: 6, username: "DerbyDayHero", points: 118, lineup: ["Isak", "Watkins", "Foden"] },
  { rank: 7, username: "SquadRotator", points: 115, lineup: ["Saka", "De Bruyne", "Palmer"] },
  { rank: 8, username: "TransferGuru", points: 110, lineup: ["Salah", "Haaland", "Rice"] },
  { rank: 9, username: "WingPlayWizard", points: 106, lineup: ["Saka", "Foden", "Palmer"] },
  { rank: 10, username: "CleanSheetKing", points: 101, lineup: ["van Dijk", "Saliba", "Alisson"] },
];

export const mockLiveEvents: LiveEvent[] = [
  { id: "e1", match: "MCI vs LIV", team: "Man City", player: "Haaland", type: "GOAL", minute: 24, points: 10 },
  { id: "e2", match: "MCI vs LIV", team: "Man City", player: "De Bruyne", type: "ASSIST", minute: 24, points: 5 },
  { id: "e3", match: "ARS vs CHE", team: "Arsenal", player: "Saka", type: "GOAL", minute: 38, points: 10 },
  { id: "e4", match: "TOT vs MUN", team: "Tottenham", player: "Son", type: "YELLOW_CARD", minute: 42, points: -2 },
  { id: "e5", match: "MCI vs LIV", team: "Liverpool", player: "van Dijk", type: "YELLOW_CARD", minute: 82, points: -1 },
  { id: "e6", match: "ARS vs CHE", team: "Arsenal", player: "Saka", type: "GOAL", minute: 12, points: 6 },
  { id: "e7", match: "ARS vs CHE", team: "Chelsea", player: "Palmer", type: "GOAL", minute: 89, points: 6 },
];
