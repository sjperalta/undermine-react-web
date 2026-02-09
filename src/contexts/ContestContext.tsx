import { createContext, useContext, useState, useEffect, ReactNode, useMemo } from "react";
import { ContestEntry, UserLineupSubmission, LineupSlot, UserLineup, Player } from "@/data/types";
import { useAuth } from "@/contexts/AuthContext";
import { useScoring } from "./ScoringContext";
import { getEntries, saveEntries, getLineups, saveLineups } from "@/utils/storage";
import { mockContests } from "@/data/mockData";

interface ContestState {
    entries: ContestEntry[];
    lineups: UserLineup[];
    joinContest: (contestId: string) => boolean;
    hasJoinedContest: (contestId: string) => boolean;
    submitLineup: (contestId: string, lineup: LineupSlot[], totalSalary: number) => boolean;
    getLineup: (contestId: string) => UserLineupSubmission | undefined;
    isContestLocked: (contestId: string) => boolean;
}

const ContestContext = createContext<ContestState | null>(null);

export function useContest() {
    const ctx = useContext(ContestContext);
    if (!ctx) throw new Error("useContest must be used within ContestProvider");
    return ctx;
}

export function ContestProvider({ children }: { children: ReactNode }) {
    const { user } = useAuth();
    const { liveScores } = useScoring();
    const [entries, setEntries] = useState<ContestEntry[]>(getEntries);
    const [lineups, setLineups] = useState<UserLineupSubmission[]>(getLineups);

    useEffect(() => {
        saveEntries(entries);
    }, [entries]);

    useEffect(() => {
        saveLineups(lineups);
    }, [lineups]);

    // Update lineups with live scores
    const userLineups: UserLineup[] = useMemo(() => {
        return lineups.map((submission) => {
            const contest = mockContests.find(c => c.id === submission.contestId);

            // Map players and calculate total points
            const playersWithPoints = submission.lineup
                .filter((slot): slot is LineupSlot & { player: Player } => slot.player !== null)
                .map((slot) => {
                    const liveStats = liveScores[slot.player.name];
                    return {
                        ...slot.player,
                        points: liveStats ? liveStats.points : slot.player.points
                    };
                });

            const totalPoints = playersWithPoints.reduce((sum, p) => sum + p.points, 0);

            return {
                id: submission.id,
                contestId: submission.contestId,
                contestTitle: contest?.title || "Unknown Contest",
                players: playersWithPoints,
                points: totalPoints,
                status: contest?.status === "completed" ? "completed" : contest?.status === "locked" ? "live" : "upcoming",
                rank: undefined
            };
        });
    }, [lineups, liveScores]);

    const joinContest = (contestId: string): boolean => {
        if (!user) return false;

        if (entries.some(e => e.userId === user.id && e.contestId === contestId)) {
            return false;
        }

        const newEntry: ContestEntry = {
            id: `entry_${Date.now()}`,
            userId: user.id,
            contestId,
            joinedAt: new Date().toISOString(),
            hasSubmittedLineup: false,
        };

        setEntries(prev => [...prev, newEntry]);
        return true;
    };

    const hasJoinedContest = (contestId: string): boolean => {
        if (!user) return false;
        return entries.some(e => e.userId === user.id && e.contestId === contestId);
    };

    const submitLineup = (contestId: string, lineup: LineupSlot[], totalSalary: number): boolean => {
        if (!user) return false;

        const entry = entries.find(e => e.userId === user.id && e.contestId === contestId);
        if (!entry) return false;

        const existingLineup = lineups.find(l => l.userId === user.id && l.contestId === contestId);

        const lineupSubmission: UserLineupSubmission = {
            id: existingLineup?.id || `lineup_${Date.now()}`,
            userId: user.id,
            contestId,
            lineup,
            submittedAt: new Date().toISOString(),
            locked: false,
            totalSalary,
        };

        if (existingLineup) {
            setLineups(prev => prev.map(l => l.id === existingLineup.id ? lineupSubmission : l));
        } else {
            setLineups(prev => [...prev, lineupSubmission]);
        }

        setEntries(prev => prev.map(e =>
            e.id === entry.id ? { ...e, hasSubmittedLineup: true, lineupId: lineupSubmission.id } : e
        ));

        return true;
    };

    const getLineup = (contestId: string): UserLineupSubmission | undefined => {
        if (!user) return undefined;
        return lineups.find(l => l.userId === user.id && l.contestId === contestId);
    };

    const isContestLocked = (contestId: string): boolean => {
        const lineup = getLineup(contestId);
        return lineup?.locked || false;
    };

    return (
        <ContestContext.Provider
            value={{
                entries,
                lineups: userLineups,
                joinContest,
                hasJoinedContest,
                submitLineup,
                getLineup,
                isContestLocked,
            }}
        >
            {children}
        </ContestContext.Provider>
    );
}
