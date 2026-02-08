import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Crown, Medal, ChevronDown, Target, Footprints, Shield, Clock, AlertTriangle } from "lucide-react";
import { ContestResult, PlayerResult } from "@/data/mockResults";

const rankStyles: Record<number, { icon: JSX.Element; ring: string }> = {
  1: { icon: <Crown className="w-5 h-5 text-gold" />, ring: "neon-border bg-gold/5" },
  2: { icon: <Medal className="w-5 h-5 text-silver" />, ring: "border-silver/30 bg-silver/5" },
  3: { icon: <Medal className="w-5 h-5 text-bronze" />, ring: "border-bronze/30 bg-bronze/5" },
};

const posColors: Record<string, string> = {
  GK: "text-info",
  DEF: "text-primary",
  MID: "text-gold",
  FWD: "text-live",
};

function StatPill({ icon, value, label }: { icon: React.ReactNode; value: number; label: string }) {
  if (value === 0) return null;
  return (
    <div className="flex items-center gap-1 bg-muted/60 rounded-md px-2 py-0.5 text-[11px] text-muted-foreground">
      {icon}
      <span className="font-medium text-foreground">{value}</span>
      <span>{label}</span>
    </div>
  );
}

function PlayerBreakdownRow({ player, index }: { player: PlayerResult; index: number }) {
  const s = player.stats;
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
      className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
    >
      {/* Position badge */}
      <span className={`text-[10px] font-bold tracking-wider w-8 text-center ${posColors[player.position]}`}>
        {player.position}
      </span>

      {/* Player info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">{player.name}</p>
        <p className="text-[11px] text-muted-foreground">{player.team}</p>
      </div>

      {/* Key stats */}
      <div className="hidden sm:flex items-center gap-1.5 flex-wrap justify-end">
        <StatPill icon={<Target className="w-3 h-3" />} value={s.goals} label="G" />
        <StatPill icon={<Footprints className="w-3 h-3" />} value={s.assists} label="A" />
        {s.cleanSheet && (
          <div className="flex items-center gap-1 bg-primary/10 rounded-md px-2 py-0.5 text-[11px] text-primary">
            <Shield className="w-3 h-3" />
            <span className="font-medium">CS</span>
          </div>
        )}
        {s.saves > 0 && <StatPill icon={<Shield className="w-3 h-3" />} value={s.saves} label="SV" />}
        {s.yellowCards > 0 && (
          <div className="flex items-center gap-1 bg-warning/10 rounded-md px-2 py-0.5 text-[11px] text-warning">
            <AlertTriangle className="w-3 h-3" />
            <span className="font-medium">YC</span>
          </div>
        )}
      </div>

      {/* Minutes */}
      <div className="hidden sm:flex items-center gap-1 text-[11px] text-muted-foreground w-12 justify-end">
        <Clock className="w-3 h-3" />
        {s.minutesPlayed}'
      </div>

      {/* Points */}
      <div className="w-10 text-right">
        <span className="font-display text-sm font-bold text-primary">{player.points}</span>
      </div>
    </motion.div>
  );
}

export function ResultRow({ result, index }: { result: ContestResult; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const style = rankStyles[result.rank];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      {/* Main row */}
      <button
        onClick={() => setExpanded(!expanded)}
        className={`w-full flex items-center gap-4 rounded-xl p-4 transition-all cursor-pointer hover:bg-surface-hover ${
          style ? `glass ${style.ring}` : "glass"
        }`}
      >
        {/* Rank */}
        <div className="w-10 text-center flex-shrink-0">
          {style?.icon ?? (
            <span className="font-display text-lg font-bold text-muted-foreground">{result.rank}</span>
          )}
        </div>

        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm font-bold text-muted-foreground flex-shrink-0">
          {result.username.charAt(0)}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 text-left">
          <p className="text-sm font-semibold text-foreground truncate">{result.username}</p>
          <p className="text-xs text-muted-foreground">11 players • {result.lineup.filter(p => p.stats.goals > 0).length} scorers</p>
        </div>

        {/* Prize */}
        {result.prize && (
          <span className="hidden sm:inline text-sm font-display font-bold text-gold">{result.prize}</span>
        )}

        {/* Points */}
        <div className="text-right flex-shrink-0">
          <p className={`font-display text-xl font-bold ${result.rank === 1 ? "text-primary text-glow" : "text-foreground"}`}>
            {result.totalPoints}
          </p>
          <p className="text-[10px] text-muted-foreground">PTS</p>
        </div>

        {/* Expand */}
        <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform flex-shrink-0 ${expanded ? "rotate-180" : ""}`} />
      </button>

      {/* Expanded lineup */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pt-2 pb-4 px-2 space-y-1">
              {/* Header */}
              <div className="flex items-center justify-between px-3 py-1 mb-1">
                <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">Lineup Breakdown</span>
                <span className="text-[10px] text-muted-foreground">
                  {result.lineup.reduce((sum, p) => sum + p.stats.goals, 0)} goals •{" "}
                  {result.lineup.reduce((sum, p) => sum + p.stats.assists, 0)} assists
                </span>
              </div>

              {result.lineup.map((player, i) => (
                <PlayerBreakdownRow key={player.name} player={player} index={i} />
              ))}

              {/* Total bar */}
              <div className="flex items-center justify-between px-3 py-2 mt-2 rounded-lg bg-primary/5 border border-primary/10">
                <span className="text-xs font-semibold text-muted-foreground">TOTAL</span>
                <span className="font-display text-lg font-bold text-primary">{result.totalPoints} PTS</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
