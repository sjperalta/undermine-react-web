import { motion } from "framer-motion";
import { LineupSlot as LineupSlotType, Position } from "@/data/types";
import { User } from "lucide-react";

const posLabels: Record<Position, string> = {
  GK: "Goalkeeper",
  DEF: "Defender",
  MID: "Midfielder",
  FWD: "Forward",
};

const posAccent: Record<Position, string> = {
  GK: "border-warning/30",
  DEF: "border-info/30",
  MID: "border-primary/30",
  FWD: "border-live/30",
};

export function LineupSlotCard({ slot, index }: { slot: LineupSlotType; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`flex items-center gap-3 rounded-lg p-3 border transition-all ${
        slot.player
          ? `glass neon-border`
          : `border-dashed ${posAccent[slot.position]} bg-muted/20`
      }`}
    >
      <div className={`w-9 h-9 rounded-full flex items-center justify-center ${
        slot.player ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
      }`}>
        <User className="w-4 h-4" />
      </div>
      <div className="flex-1 min-w-0">
        {slot.player ? (
          <>
            <p className="text-sm font-semibold text-foreground truncate">{slot.player.name}</p>
            <p className="text-xs text-muted-foreground">{slot.player.team}</p>
          </>
        ) : (
          <p className="text-sm text-muted-foreground">Select {posLabels[slot.position]}</p>
        )}
      </div>
      {slot.player && (
        <span className="text-xs font-display font-bold text-primary">${(slot.player.salary / 1000).toFixed(1)}k</span>
      )}
    </motion.div>
  );
}
