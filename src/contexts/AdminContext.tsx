import { useState, createContext, useContext, ReactNode } from "react";
import { Contest, Player, Position } from "../data/types";
import { mockPlayers, mockContests } from "../data/mockData";

export interface MatchStat {
  playerId: string;
  playerName: string;
  minutesPlayed: number;
  goals: number;
  assists: number;
  cleanSheet: boolean;
  yellowCards: number;
  redCards: number;
  saves: number;
  penaltiesMissed: number;
  ownGoals: number;
  fantasyPoints: number;
}

export interface AdminContest extends Contest {
  scored: boolean;
  matchStats: MatchStat[];
}

interface AdminState {
  contests: AdminContest[];
  players: Player[];
  addContest: (contest: AdminContest) => void;
  updateContest: (id: string, updates: Partial<AdminContest>) => void;
  setPlayers: (players: Player[]) => void;
  addPlayers: (players: Player[]) => void;
  setMatchStats: (contestId: string, stats: MatchStat[]) => void;
  scoreContest: (contestId: string) => void;
}

const AdminContext = createContext<AdminState | null>(null);

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used within AdminProvider");
  return ctx;
}

// Scoring rules
const SCORING_RULES = {
  minutesPlayed: (mins: number) => (mins >= 60 ? 2 : mins > 0 ? 1 : 0),
  goals: (pos: Position, goals: number) => {
    const perGoal = pos === "GK" || pos === "DEF" ? 6 : pos === "MID" ? 5 : 4;
    return goals * perGoal;
  },
  assists: (assists: number) => assists * 3,
  cleanSheet: (pos: Position, cs: boolean) => {
    if (!cs) return 0;
    return pos === "GK" || pos === "DEF" ? 4 : pos === "MID" ? 1 : 0;
  },
  yellowCards: (yc: number) => yc * -1,
  redCards: (rc: number) => rc * -3,
  saves: (saves: number) => Math.floor(saves / 3),
  penaltiesMissed: (pm: number) => pm * -2,
  ownGoals: (og: number) => og * -2,
};

function calculatePoints(stat: MatchStat, position: Position): number {
  let pts = 0;
  pts += SCORING_RULES.minutesPlayed(stat.minutesPlayed);
  pts += SCORING_RULES.goals(position, stat.goals);
  pts += SCORING_RULES.assists(stat.assists);
  pts += SCORING_RULES.cleanSheet(position, stat.cleanSheet);
  pts += SCORING_RULES.yellowCards(stat.yellowCards);
  pts += SCORING_RULES.redCards(stat.redCards);
  pts += SCORING_RULES.saves(stat.saves);
  pts += SCORING_RULES.penaltiesMissed(stat.penaltiesMissed);
  pts += SCORING_RULES.ownGoals(stat.ownGoals);
  return pts;
}

export function AdminProvider({ children }: { children: ReactNode }) {
  const [contests, setContests] = useState<AdminContest[]>(
    mockContests.map((c) => ({ ...c, scored: c.status === "completed", matchStats: [] }))
  );
  const [players, setPlayersState] = useState<Player[]>(mockPlayers);

  const addContest = (contest: AdminContest) => {
    setContests((prev) => [...prev, contest]);
  };

  const updateContest = (id: string, updates: Partial<AdminContest>) => {
    setContests((prev) => prev.map((c) => (c.id === id ? { ...c, ...updates } : c)));
  };

  const addPlayers = (newPlayers: Player[]) => {
    setPlayersState((prev) => {
      const existing = new Set(prev.map((p) => p.id));
      const unique = newPlayers.filter((p) => !existing.has(p.id));
      return [...prev, ...unique];
    });
  };

  const setMatchStats = (contestId: string, stats: MatchStat[]) => {
    setContests((prev) =>
      prev.map((c) => (c.id === contestId ? { ...c, matchStats: stats } : c))
    );
  };

  const scoreContest = (contestId: string) => {
    setContests((prev) =>
      prev.map((c) => {
        if (c.id !== contestId) return c;
        const scoredStats = c.matchStats.map((stat) => {
          const player = players.find((p) => p.id === stat.playerId);
          const pos = player?.position ?? "MID";
          return { ...stat, fantasyPoints: calculatePoints(stat, pos) };
        });
        // Also update player points in state
        scoredStats.forEach((stat) => {
          setPlayersState((prev) =>
            prev.map((p) => (p.id === stat.playerId ? { ...p, points: stat.fantasyPoints } : p))
          );
        });
        return { ...c, matchStats: scoredStats, scored: true, status: "completed" as const };
      })
    );
  };

  return (
    <AdminContext.Provider
      value={{
        contests,
        players,
        addContest,
        updateContest,
        setPlayers: setPlayersState,
        addPlayers,
        setMatchStats,
        scoreContest,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}
