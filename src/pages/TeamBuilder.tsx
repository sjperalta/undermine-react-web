import { useState, useMemo, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Check, AlertCircle, Info, ShieldAlert } from "lucide-react";
import { mockContests, mockPlayers } from "@/data/mockData";
import { Player, Position, LineupSlot } from "@/data/types";
import { PlayerCard } from "@/components/PlayerCard";
import { LineupSlotCard } from "@/components/LineupSlotCard";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { validateLineup, getRemainingSalary, TOTAL_PLAYERS, MAX_PLAYERS_FROM_TEAM } from "@/utils/validation";
import { useContest } from "@/contexts/ContestContext";

// Define the flexible formation structure
const REQUIRED_SLOTS: Position[] = ["GK", "DEF", "DEF", "DEF", "MID", "MID", "MID", "FWD"];
const FLEX_SLOTS = ["FLEX", "FLEX", "FLEX"];
const INITIAL_FORMATION = [...REQUIRED_SLOTS, ...FLEX_SLOTS];

// Helper to map UI slots to actual data slots
// We use a local state that includes "FLEX" as a concept, but map it to valid data types
interface BuilderSlot extends Omit<LineupSlot, "position"> {
  position: Position; // The actual position of the player or the required position
  displayPosition: Position | "FLEX"; // What to show in UI
  id: string; // Unique ID for the slot to help with keying
}

export default function TeamBuilder() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { submitLineup, getLineup, isContestLocked } = useContest();
  const contest = mockContests.find((c) => c.id === id);
  const salaryCap = contest?.salaryCap ?? 100000;

  useEffect(() => {
    if (id && isContestLocked(id)) {
      toast.error("Contest is locked. Lineups cannot be edited.");
      navigate(`/contest/${id}`);
    }
  }, [id, isContestLocked, navigate]);

  // Initialize slots
  const [builderSlots, setBuilderSlots] = useState<BuilderSlot[]>(() => {
    // Check if there's an existing lineup
    const existing = id ? getLineup(id) : undefined;

    if (existing && existing.lineup.length === 11) {
      // Map existing lineup to builder slots
      // This is a bit tricky because we need to map back to our specific ordered structure
      // For simplicity in this demo, we'll try to fill the required slots first then flex
      // In a real app, you'd save the slot index or type with the lineup
      return INITIAL_FORMATION.map((pos, i) => ({
        id: `slot-${i}`,
        position: existing.lineup[i].player?.position || (pos === "FLEX" ? "DEF" : pos as Position), // Fallback
        displayPosition: pos as Position | "FLEX",
        player: existing.lineup[i].player
      }));
    }

    return INITIAL_FORMATION.map((pos, i) => ({
      id: `slot-${i}`,
      position: (pos === "FLEX" ? "DEF" : pos) as Position, // Default placeholder, will change when filled
      displayPosition: pos as Position | "FLEX",
      player: null,
    }));
  });

  const [posFilter, setPosFilter] = useState<Position | "ALL">("ALL");
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const selectedIds = new Set(builderSlots.filter(s => s.player).map(s => s.player!.id));
  const usedSalary = builderSlots.reduce((sum, s) => sum + (s.player?.salary ?? 0), 0);
  const remaining = salaryCap - usedSalary;
  const filledCount = builderSlots.filter(s => s.player).length;

  // Filter players
  const filteredPlayers = useMemo(() => {
    let list = mockPlayers.filter(p => {
      if (selectedIds.has(p.id)) return false; // Don't show selected players in pool
      if (posFilter !== "ALL" && p.position !== posFilter) return false;
      return true;
    });
    return list.sort((a, b) => b.salary - a.salary);
  }, [posFilter, selectedIds]);

  // Validation
  useEffect(() => {
    // Convert builder slots to data slots for validation
    const dataSlots: LineupSlot[] = builderSlots.map(s => ({
      position: s.player?.position || s.position,
      player: s.player
    }));

    const result = validateLineup(dataSlots, salaryCap);
    // Only show errors if we are trying to submit or nearing completion? 
    // Actually, distinct errors are useful.
    // Let's filter out "count" errors until we are full, but valid errors like salary cap should always show
  }, [builderSlots, salaryCap]);

  const handleSelect = (player: Player) => {
    // 1. Check Salary Cap
    if (usedSalary + player.salary > salaryCap) {
      toast.error("Exceeds salary cap!");
      return;
    }

    // 2. Check Team Constraints
    const teamCount = builderSlots.filter(s => s.player?.team === player.team).length;
    if (teamCount >= MAX_PLAYERS_FROM_TEAM) {
      toast.error(`Max ${MAX_PLAYERS_FROM_TEAM} players from ${player.team}`);
      return;
    }

    // 3. Find appropriate slot
    // First try to find an empty REQUIRED slot for this position
    let slotIndex = builderSlots.findIndex(s =>
      !s.player && s.displayPosition === player.position
    );

    // If no required slot, try an empty FLEX slot (if valid)
    if (slotIndex === -1 && player.position !== "GK") {
      slotIndex = builderSlots.findIndex(s =>
        !s.player && s.displayPosition === "FLEX"
      );
    }

    if (slotIndex === -1) {
      // If we are full on this position, see if we can swap? 
      // For now, just error
      if (player.position === "GK") {
        toast.error("Goalkeeper slot already filled");
      } else {
        toast.error(`No available ${player.position} or FLEX slots`);
      }
      return;
    }

    // Update slot
    setBuilderSlots(prev => prev.map((s, i) =>
      i === slotIndex ? { ...s, player, position: player.position } : s
    ));

    toast.success(`Added ${player.name}`);
  };

  const handleRemove = (slotId: string) => {
    setBuilderSlots(prev => prev.map(s =>
      s.id === slotId ? { ...s, player: null } : s
    ));
  };

  const handleSubmit = () => {
    // Final Full Validation
    const dataSlots: LineupSlot[] = builderSlots.map(s => ({
      position: s.player?.position || s.position,
      player: s.player
    }));

    const result = validateLineup(dataSlots, salaryCap);

    if (!result.isValid) {
      setValidationErrors(result.errors);
      toast.error("Please fix validation errors before submitting");
      return;
    }

    if (!id) return;

    const success = submitLineup(id, dataSlots, usedSalary);
    if (success) {
      toast.success("Lineup submitted successfully!");
      navigate(`/contest/${id}`);
    } else {
      toast.error("Failed to submit lineup");
    }
  };

  return (
    <div className="min-h-screen pt-16 pb-20 md:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 md:py-8">
        <Link to={`/contest/${id}`} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Contest
        </Link>

        {/* Validation Errors */}
        <AnimatePresence>
          {validationErrors.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 bg-destructive/10 border border-destructive/30 rounded-xl overflow-hidden"
            >
              <div className="p-4">
                <div className="flex items-center gap-2 text-destructive font-bold mb-2">
                  <ShieldAlert className="w-5 h-5" />
                  <span>Lineup Issues</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-sm text-destructive/90">
                  {validationErrors.map((err, i) => (
                    <li key={i}>{err}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Left Panel: Lineup & stats */}
          <div className="lg:col-span-2 space-y-4">
            {/* Stats Card */}
            <div className="glass rounded-xl p-5 sticky top-20 z-20 backdrop-blur-md">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Salary Remaining</p>
                  <p className={`text-2xl font-display font-bold ${remaining < 0 ? "text-destructive" : "text-foreground"}`}>
                    ${(remaining / 1000).toFixed(1)}k
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground font-medium">Players</p>
                  <p className={`text-2xl font-display font-bold ${filledCount === 11 ? "text-success" : "text-foreground"}`}>
                    {filledCount}/11
                  </p>
                </div>
              </div>

              <div className="relative h-2 bg-muted rounded-full overflow-hidden mb-2">
                <motion.div
                  className={`absolute top-0 left-0 h-full rounded-full ${remaining < 0 ? "bg-destructive" : remaining < 5000 ? "bg-warning" : "bg-primary"}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min((usedSalary / salaryCap) * 100, 100)}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>$0</span>
                <span>${(salaryCap / 1000).toFixed(0)}k</span>
              </div>
            </div>

            {/* Slots */}
            <div className="space-y-2">
              {builderSlots.map((slot, i) => (
                <div key={slot.id} onClick={() => slot.player && handleRemove(slot.id)} className={slot.player ? "cursor-pointer hover:opacity-80 transition-opacity" : ""}>
                  <LineupSlotCard slot={{
                    position: slot.position,
                    player: slot.player
                  }} index={i} displayPosition={slot.displayPosition} />
                </div>
              ))}
            </div>

            <Button
              onClick={handleSubmit}
              disabled={filledCount < 11}
              className="w-full h-14 font-display font-bold text-lg glow-md rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40 disabled:glow-none transition-all shadow-lg"
            >
              {filledCount < 11 ? (
                <><Info className="w-5 h-5 mr-2" />{11 - filledCount} Player{11 - filledCount !== 1 ? 's' : ''} Needed</>
              ) : (
                <><Check className="w-5 h-5 mr-2" />Submit Lineup</>
              )}
            </Button>
          </div>

          {/* Right Panel: Player Pool */}
          <div className="lg:col-span-3">
            <div className="glass rounded-xl overflow-hidden flex flex-col h-[calc(100vh-8rem)]">
              {/* Filters */}
              <div className="p-4 border-b border-white/10">
                <h2 className="font-display font-bold text-lg mb-3">Available Players</h2>
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {["ALL", "GK", "DEF", "MID", "FWD"].map((pos) => (
                    <button
                      key={pos}
                      onClick={() => setPosFilter(pos as Position | "ALL")}
                      className={`px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${posFilter === pos
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                        }`}
                    >
                      {pos}
                    </button>
                  ))}
                </div>
              </div>

              {/* List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {filteredPlayers.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-muted-foreground opacity-60">
                    <ShieldAlert className="w-12 h-12 mb-2" />
                    <p>No players found</p>
                  </div>
                ) : (
                  filteredPlayers.map((player) => (
                    <PlayerCard
                      key={player.id}
                      player={player}
                      onSelect={handleSelect}
                      selected={selectedIds.has(player.id)}
                      disabled={
                        !selectedIds.has(player.id) &&
                        (usedSalary + player.salary > salaryCap)
                      }
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
