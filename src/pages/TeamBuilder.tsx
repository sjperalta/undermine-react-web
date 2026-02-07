import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Check, AlertCircle } from "lucide-react";
import { mockContests, mockPlayers } from "@/data/mockData";
import { Player, Position, LineupSlot } from "@/data/types";
import { PlayerCard } from "@/components/PlayerCard";
import { LineupSlotCard } from "@/components/LineupSlotCard";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const FORMATION: Position[] = ["GK", "DEF", "DEF", "DEF", "DEF", "MID", "MID", "MID", "FWD", "FWD", "FWD"];
const POS_FILTER: (Position | "ALL")[] = ["ALL", "GK", "DEF", "MID", "FWD"];

export default function TeamBuilder() {
  const { id } = useParams();
  const contest = mockContests.find((c) => c.id === id);
  const salaryCap = contest?.salaryCap ?? 100000;

  const [slots, setSlots] = useState<LineupSlot[]>(
    FORMATION.map((pos) => ({ position: pos, player: null }))
  );
  const [posFilter, setPosFilter] = useState<Position | "ALL">("ALL");

  const selectedIds = new Set(slots.filter((s) => s.player).map((s) => s.player!.id));
  const usedSalary = slots.reduce((sum, s) => sum + (s.player?.salary ?? 0), 0);
  const remaining = salaryCap - usedSalary;
  const filledCount = slots.filter((s) => s.player).length;

  const filteredPlayers = useMemo(() => {
    let list = mockPlayers;
    if (posFilter !== "ALL") list = list.filter((p) => p.position === posFilter);
    return list.sort((a, b) => b.salary - a.salary);
  }, [posFilter]);

  const handleSelect = (player: Player) => {
    if (selectedIds.has(player.id)) {
      // Remove
      setSlots((prev) => prev.map((s) => (s.player?.id === player.id ? { ...s, player: null } : s)));
      return;
    }
    // Find first empty slot of matching position
    const idx = slots.findIndex((s) => s.position === player.position && !s.player);
    if (idx === -1) {
      toast.error(`No empty ${player.position} slot available`);
      return;
    }
    if (usedSalary + player.salary > salaryCap) {
      toast.error("Exceeds salary cap!");
      return;
    }
    setSlots((prev) => prev.map((s, i) => (i === idx ? { ...s, player } : s)));
  };

  const handleSubmit = () => {
    if (filledCount < 11) {
      toast.error("Fill all 11 positions before submitting");
      return;
    }
    toast.success("Lineup submitted! Good luck! ⚽");
  };

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <Link to={`/contest/${id}`} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Contest
        </Link>

        <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-display text-2xl font-bold text-foreground mb-6">
          Build Your Lineup
        </motion.h1>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Lineup Panel */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-2">
            {/* Salary Cap */}
            <div className="glass rounded-xl p-4 mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">Salary Cap</span>
                <span className="font-display font-bold text-foreground">
                  ${(usedSalary / 1000).toFixed(1)}k / ${(salaryCap / 1000).toFixed(0)}k
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className={`h-full rounded-full transition-colors ${
                    remaining < 5000 ? "bg-live" : "bg-primary"
                  }`}
                  animate={{ width: `${(usedSalary / salaryCap) * 100}%` }}
                  transition={{ type: "spring", stiffness: 200 }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                ${(remaining / 1000).toFixed(1)}k remaining • {filledCount}/11 players
              </p>
            </div>

            {/* Lineup Slots */}
            <div className="space-y-2 mb-4">
              {slots.map((slot, i) => (
                <LineupSlotCard key={i} slot={slot} index={i} />
              ))}
            </div>

            <Button
              onClick={handleSubmit}
              disabled={filledCount < 11}
              className="w-full h-12 font-display font-bold glow-md rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40 disabled:glow-none transition-all"
            >
              {filledCount < 11 ? (
                <><AlertCircle className="w-4 h-4 mr-2" />{11 - filledCount} more needed</>
              ) : (
                <><Check className="w-4 h-4 mr-2" />Submit Lineup</>
              )}
            </Button>
          </motion.div>

          {/* Player Pool */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-3">
            <div className="flex gap-1 bg-muted/50 rounded-lg p-1 mb-4 sticky top-20 z-10">
              {POS_FILTER.map((pos) => (
                <button
                  key={pos}
                  onClick={() => setPosFilter(pos)}
                  className={`flex-1 px-3 py-2 rounded-md text-xs font-bold transition-all ${
                    posFilter === pos
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {pos}
                </button>
              ))}
            </div>

            <div className="space-y-2">
              {filteredPlayers.map((player) => (
                <PlayerCard
                  key={player.id}
                  player={player}
                  onSelect={handleSelect}
                  selected={selectedIds.has(player.id)}
                  disabled={
                    !selectedIds.has(player.id) &&
                    (usedSalary + player.salary > salaryCap ||
                      !slots.some((s) => s.position === player.position && !s.player))
                  }
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
