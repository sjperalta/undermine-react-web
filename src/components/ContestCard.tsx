import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Trophy, Users, Clock, ChevronRight, Zap, CheckCircle2 } from "lucide-react";
import { Contest } from "@/data/types";
import { useCountdown } from "@/hooks/useCountdown";
import { Badge } from "@/components/ui/badge";

const statusConfig: Record<string, { label: string; className: string }> = {
  open: { label: "OPEN", className: "bg-primary/20 text-primary border-primary/30" },
  locked: { label: "LIVE", className: "bg-live/20 text-live border-live/30 animate-pulse-neon" },
  completed: { label: "FINAL", className: "bg-muted text-muted-foreground border-border" },
  draft: { label: "DRAFT", className: "bg-muted text-muted-foreground border-border" },
};

export function ContestCard({ contest, index, isJoined }: { contest: Contest; index: number; isJoined?: boolean }) {
  const countdown = useCountdown(contest.startTime);
  const status = statusConfig[contest.status];
  const fillPercent = (contest.entrants / contest.maxEntrants) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5, scale: 1.01 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay: index * 0.05
      }}
    >
      <Link to={`/contest/${contest.id}`} className="block group">
        <div className="glass rounded-xl p-5 hover:neon-border transition-all duration-300 relative overflow-hidden">
          {/* Glow effect on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-primary/5 via-transparent to-transparent" />

          <div className="relative z-10">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className={status.className + " text-[10px] font-bold tracking-widest"}>
                    {status.label}
                  </Badge>
                  {isJoined && (
                    <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30 text-[10px] font-bold tracking-widest">
                      <CheckCircle2 className="w-3 h-3 mr-1" /> JOINED
                    </Badge>
                  )}
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                  {contest.title}
                </h3>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </div>

            {/* Matches */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {contest.matches.map((match) => (
                <span key={match} className="text-[11px] text-muted-foreground bg-muted/50 px-2 py-0.5 rounded-md">
                  {match}
                </span>
              ))}
            </div>

            {/* Stats row */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
              <span className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" />
                {contest.entrants.toLocaleString()}
              </span>
              <span className="flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5 text-gold" />
                {contest.prizePool}
              </span>
              {contest.status === "open" && (
                <span className="flex items-center gap-1.5 text-primary">
                  <Clock className="w-3.5 h-3.5" />
                  {countdown}
                </span>
              )}
              {contest.status === "locked" && (
                <span className="flex items-center gap-1.5 text-live">
                  <Zap className="w-3.5 h-3.5" />
                  In Progress
                </span>
              )}
            </div>

            {/* Capacity bar */}
            <div className="h-1 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-neon-dim rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${fillPercent}%` }}
                transition={{ delay: index * 0.1 + 0.3, duration: 0.6 }}
              />
            </div>
            <p className="text-[10px] text-muted-foreground mt-1">
              {contest.entrants.toLocaleString()} / {contest.maxEntrants.toLocaleString()} entries
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
