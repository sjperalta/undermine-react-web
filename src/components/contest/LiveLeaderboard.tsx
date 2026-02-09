import { motion } from "framer-motion";
import { Trophy, ArrowUp, ArrowDown, Minus } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface LeaderboardUser {
    rank: number;
    username: string;
    points: number;
    isCurrentUser: boolean;
    trend: 'up' | 'down' | 'neutral';
}

const mockEntrants = [
    { username: "DraftMaster", points: 84.5 },
    { username: "SoccerPro44", points: 79.2 },
    { username: "GoalGetter", points: 72.8 },
    { username: "FantasyKing", points: 68.4 },
    { username: "PitchPerfect", points: 65.1 },
];

export function LiveLeaderboard({ contestId, userPoints }: { contestId: string; userPoints: number }) {
    const { user } = useAuth();

    // Combine mock entrants with current user and sort
    const leaderboard: LeaderboardUser[] = [
        ...mockEntrants.map(e => ({ ...e, isCurrentUser: false, trend: 'neutral' as const })),
        { username: user?.username || "You", points: userPoints, isCurrentUser: true, trend: 'up' as const }
    ]
        .sort((a, b) => b.points - a.points)
        .map((entry, index) => ({
            ...entry,
            rank: index + 1
        }));

    return (
        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-lg">
            <div className="bg-muted/30 px-5 py-4 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-primary" />
                    <h3 className="font-display font-bold text-sm uppercase tracking-wider">Live Standings</h3>
                </div>
                <span className="text-[10px] font-black bg-primary/10 text-primary px-2 py-0.5 rounded-full uppercase">Live</span>
            </div>

            <div className="divide-y divide-border">
                {leaderboard.map((entry, i) => (
                    <motion.div
                        layout
                        key={entry.username}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className={`px-5 py-3 flex items-center gap-4 transition-colors ${entry.isCurrentUser ? "bg-primary/5" : "hover:bg-muted/20"}`}
                    >
                        <div className="w-6 text-center">
                            <span className={`text-xs font-black ${entry.rank <= 3 ? "text-primary" : "text-muted-foreground"}`}>
                                {entry.rank}
                            </span>
                        </div>

                        <div className="flex-1 min-w-0">
                            <p className={`text-sm font-bold truncate ${entry.isCurrentUser ? "text-primary" : "text-foreground"}`}>
                                {entry.username} {entry.isCurrentUser && <span className="text-[10px] ml-1 opacity-60">(YOU)</span>}
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="text-right">
                                <p className="text-sm font-black text-foreground">{entry.points.toFixed(1)}</p>
                            </div>
                            {entry.trend === 'up' && <ArrowUp className="w-3 h-3 text-green-500" />}
                            {entry.trend === 'down' && <ArrowDown className="w-3 h-3 text-red-500" />}
                            {entry.trend === 'neutral' && <Minus className="w-3 h-3 text-muted-foreground/30" />}
                        </div>
                    </motion.div>
                ))}
            </div>

            <button className="w-full py-3 text-[10px] font-black text-muted-foreground uppercase tracking-widest hover:text-primary transition-colors border-t border-border">
                View Full Leaderboard
            </button>
        </div>
    );
}
