import { motion } from "framer-motion";
import { Player, Position } from "@/data/types";
import { Plus, X } from "lucide-react";

const posColors: Record<Position, string> = {
  GK: "text-warning border-warning/30 bg-warning/10",
  DEF: "text-info border-info/30 bg-info/10",
  MID: "text-primary border-primary/30 bg-primary/10",
  FWD: "text-live border-live/30 bg-live/10",
};

export function PlayerCard({
  player,
  onSelect,
  selected,
  disabled,
}: {
  player: Player;
  onSelect: (p: Player) => void;
  selected: boolean;
  disabled: boolean;
}) {
  return (
    <motion.button
      whileHover={{ scale: disabled && !selected ? 1 : 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(player)}
      disabled={disabled && !selected}
      className={`w-full text-left rounded-xl p-3 transition-all duration-200 ${
        selected
          ? "neon-border bg-primary/5"
          : disabled
          ? "glass opacity-40 cursor-not-allowed"
          : "glass hover:bg-surface-hover cursor-pointer"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Position badge */}
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${posColors[player.position]}`}>
            {player.position}
          </span>
          <div>
            <p className="text-sm font-semibold text-foreground">{player.name}</p>
            <p className="text-xs text-muted-foreground">{player.team}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Salary</p>
            <p className="text-sm font-display font-semibold text-foreground">
              ${(player.salary / 1000).toFixed(1)}k
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Pts</p>
            <p className="text-sm font-display font-bold text-primary">{player.points}</p>
          </div>
          <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
            selected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
          }`}>
            {selected ? <X className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
          </div>
        </div>
      </div>
    </motion.button>
  );
}
