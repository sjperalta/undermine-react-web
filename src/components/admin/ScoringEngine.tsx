import { useState } from "react";
import { motion } from "framer-motion";
import { Zap, Play, CheckCircle2, ChevronDown, Trophy, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAdmin } from "@/contexts/AdminContext";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

export function ScoringEngine() {
  const { contests, scoreContest } = useAdmin();
  const [selectedContest, setSelectedContest] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [scored, setScored] = useState(false);

  const eligibleContests = contests.filter(
    (c) => c.matchStats.length > 0 && (c.status === "locked" || c.status === "completed")
  );

  const selectedContestObj = contests.find((c) => c.id === selectedContest);
  const activeStats = selectedContestObj?.matchStats.filter((s) => s.minutesPlayed > 0) ?? [];

  const handleScore = () => {
    if (!selectedContest) return;
    setProcessing(true);
    setScored(false);

    // Simulate processing time for dramatic effect
    setTimeout(() => {
      scoreContest(selectedContest);
      setProcessing(false);
      setScored(true);
      toast.success("🎯 Scoring complete! Fantasy points calculated.");
    }, 1500);
  };

  const scoredStats = selectedContestObj?.matchStats
    .filter((s) => s.fantasyPoints !== 0 || s.minutesPlayed > 0)
    .sort((a, b) => b.fantasyPoints - a.fantasyPoints) ?? [];

  return (
    <div className="space-y-6">
      {/* Engine Panel */}
      <div className="glass rounded-xl p-6">
        <h2 className="font-display text-lg font-semibold text-foreground mb-1 flex items-center gap-2">
          <Zap className="w-5 h-5 text-primary" />
          Scoring Engine
        </h2>
        <p className="text-xs text-muted-foreground mb-5">
          Calculate fantasy points based on match statistics. Points are calculated using the standard scoring rules.
        </p>

        {/* Contest selector */}
        <div className="relative mb-6">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="w-full flex items-center justify-between bg-muted/50 border border-border rounded-lg px-4 py-3 text-sm text-left"
          >
            <span className={selectedContestObj ? "text-foreground" : "text-muted-foreground"}>
              {selectedContestObj?.title ?? "Select contest with stats..."}
            </span>
            <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${showDropdown ? "rotate-180" : ""}`} />
          </button>

          {showDropdown && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-full mt-1 left-0 right-0 bg-card border border-border rounded-lg shadow-lg z-20 overflow-hidden"
            >
              {eligibleContests.length === 0 ? (
                <p className="px-4 py-3 text-sm text-muted-foreground">No contests with stats available. Input match stats first.</p>
              ) : (
                eligibleContests.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      setSelectedContest(c.id);
                      setShowDropdown(false);
                      setScored(c.scored);
                    }}
                    className="w-full text-left px-4 py-3 text-sm hover:bg-muted/50 transition-colors border-b border-border/50 last:border-0"
                  >
                    <span className="text-foreground">{c.title}</span>
                    <span className="text-xs text-muted-foreground ml-2">
                      ({c.matchStats.filter((s) => s.minutesPlayed > 0).length} players with minutes)
                    </span>
                    {c.scored && <Badge variant="outline" className="ml-2 text-[9px] bg-primary/10 text-primary border-primary/20">SCORED</Badge>}
                  </button>
                ))
              )}
            </motion.div>
          )}
        </div>

        {/* Scoring rules reference */}
        <div className="bg-muted/30 rounded-lg p-4 mb-6">
          <p className="text-xs font-semibold text-foreground mb-2">Scoring Rules</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-1.5 gap-x-4 text-[11px] text-muted-foreground">
            <span>⏱️ 60+ min: +2 pts</span>
            <span>⏱️ 1-59 min: +1 pt</span>
            <span>⚽ Goal (FWD): +4 pts</span>
            <span>⚽ Goal (MID): +5 pts</span>
            <span>⚽ Goal (DEF/GK): +6 pts</span>
            <span>🅰️ Assist: +3 pts</span>
            <span>🛡️ CS (DEF/GK): +4 pts</span>
            <span>🛡️ CS (MID): +1 pt</span>
            <span>🟨 Yellow: -1 pt</span>
            <span>🟥 Red: -3 pts</span>
            <span>🧤 3 Saves: +1 pt</span>
            <span>❌ Pen Miss: -2 pts</span>
          </div>
        </div>

        {/* Run Button */}
        {selectedContest && (
          <Button
            onClick={handleScore}
            disabled={processing || activeStats.length === 0}
            className={`w-full h-14 text-lg font-display font-bold rounded-xl transition-all ${
              processing
                ? "bg-primary/50 text-primary-foreground"
                : scored
                ? "bg-primary text-primary-foreground glow-md"
                : "bg-primary text-primary-foreground hover:bg-primary/90 glow-sm"
            }`}
          >
            {processing ? (
              <motion.span
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="flex items-center gap-2"
              >
                <Zap className="w-5 h-5" />
                Processing {activeStats.length} players...
              </motion.span>
            ) : scored ? (
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                Re-run Scoring
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Play className="w-5 h-5" />
                Calculate Fantasy Points
              </span>
            )}
          </Button>
        )}
      </div>

      {/* Results */}
      {scored && scoredStats.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h3 className="font-display text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <Trophy className="w-4 h-4 text-primary" />
            Scoring Results
          </h3>

          <div className="space-y-1.5">
            {scoredStats.map((stat, i) => {
              const isTop3 = i < 3;
              return (
                <motion.div
                  key={stat.playerId}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className={`flex items-center gap-3 rounded-lg p-3 ${
                    isTop3 ? "glass neon-border" : "glass"
                  }`}
                >
                  <span className="w-6 text-center font-display text-xs font-bold text-muted-foreground">
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">{stat.playerName}</p>
                    <p className="text-[10px] text-muted-foreground">
                      {stat.minutesPlayed}' • {stat.goals}G • {stat.assists}A
                      {stat.cleanSheet ? " • CS" : ""}
                      {stat.saves > 0 ? ` • ${stat.saves}SV` : ""}
                    </p>
                  </div>
                  <span className={`font-display text-lg font-bold ${
                    isTop3 ? "text-primary text-glow" : "text-foreground"
                  }`}>
                    {stat.fantasyPoints}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
}
