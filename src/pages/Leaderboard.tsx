import { motion } from "framer-motion";
import { Trophy, Medal, Crown, ArrowLeft } from "lucide-react";
import { mockLeaderboard } from "@/data/mockData";
import { useNavigate } from "react-router-dom";

const rankIcons: Record<number, JSX.Element> = {
  1: <Crown className="w-5 h-5 text-yellow-500" />,
  2: <Medal className="w-5 h-5 text-slate-400" />,
  3: <Medal className="w-5 h-5 text-amber-600" />,
};

export default function Leaderboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pt-24 pb-20 bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to Dashboard</span>
        </button>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 mb-4 glow-sm">
            <Trophy className="w-8 h-8 text-primary" />
          </div>
          <h1 className="font-display text-4xl font-bold text-foreground mb-2">Global Standings</h1>
          <p className="text-muted-foreground">Premier League Gameweek 24 • Final Results</p>
        </motion.div>

        <div className="space-y-2">
          {mockLeaderboard.map((entry, i) => (
            <motion.div
              key={entry.rank}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`flex items-center gap-4 rounded-xl p-4 transition-all ${entry.rank <= 3 ? "glass neon-border" : "glass"
                }`}
            >
              {/* Rank */}
              <div className="w-10 text-center">
                {rankIcons[entry.rank] ?? (
                  <span className="font-display text-lg font-bold text-muted-foreground">{entry.rank}</span>
                )}
              </div>

              {/* Avatar placeholder */}
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm font-bold text-muted-foreground">
                {entry.username.charAt(0)}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-semibold truncate ${entry.rank <= 3 ? "text-foreground" : "text-foreground"}`}>
                  {entry.username}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {entry.lineup.join(" · ")}
                </p>
              </div>

              {/* Points */}
              <div className="text-right">
                <p className={`font-display text-xl font-bold ${entry.rank === 1 ? "text-primary text-glow" : "text-foreground"}`}>
                  {entry.points}
                </p>
                <p className="text-[10px] text-muted-foreground">PTS</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
