import { motion } from "framer-motion";
import { LineupSlot, Position } from "@/data/types";
import { User, Shield } from "lucide-react";

type DisplayPosition = Position | "FLEX";

const posLabels: Record<DisplayPosition, string> = {
  GK: "Goalkeeper",
  DEF: "Defender",
  MID: "Midfielder",
  FWD: "Forward",
  FLEX: "Flex (DEF/MID/FWD)",
};

const posAccent: Record<DisplayPosition, string> = {
  GK: "border-warning/30",
  DEF: "border-info/30",
  MID: "border-primary/30",
  FWD: "border-live/30",
  FLEX: "border-purple-500/30", // Distinct color for FLEX
};

interface LineupSlotCardProps {
  slot: LineupSlot;
  index: number;
  displayPosition?: DisplayPosition;
}

export function LineupSlotCard({ slot, index, displayPosition }: LineupSlotCardProps) {
  const position = (displayPosition || slot.position) as DisplayPosition;

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`flex items-center gap-3 rounded-lg p-3 border transition-all ${slot.player
          ? `glass neon-border`
          : `border-dashed ${posAccent[position]} bg-muted/20`
        }`}
    >
      <div className={`w-9 h-9 rounded-full flex items-center justify-center ${slot.player ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
        }`}>
        {position === "FLEX" && !slot.player ? <Shield className="w-4 h-4" /> : <User className="w-4 h-4" />}
      </div>
      <div className="flex-1 min-w-0">
        {slot.player ? (
          <>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded border border-border bg-muted/50">
                {slot.player.position}
              </span>
              <p className="text-sm font-semibold text-foreground truncate">{slot.player.name}</p>
            </div>
            <p className="text-xs text-muted-foreground">{slot.player.team}</p>
          </>
        ) : (
          <p className="text-sm text-muted-foreground">Select {posLabels[position]}</p>
        )}
      </div>
      {slot.player && (
        <span className="text-xs font-display font-bold text-primary">${(slot.player.salary / 1000).toFixed(1)}k</span>
      )}
    </motion.div>
  );
}
