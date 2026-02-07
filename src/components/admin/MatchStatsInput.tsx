import { useState } from "react";
import { motion } from "framer-motion";
import { BarChart3, Save, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAdmin, MatchStat } from "@/contexts/AdminContext";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";

export function MatchStatsInput() {
  const { contests, players, setMatchStats } = useAdmin();
  const [selectedContest, setSelectedContest] = useState("");
  const [stats, setStats] = useState<MatchStat[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const eligibleContests = contests.filter((c) => c.status === "locked" || c.status === "completed");

  const handleSelectContest = (contestId: string) => {
    setSelectedContest(contestId);
    setShowDropdown(false);
    const contest = contests.find((c) => c.id === contestId);

    // If already has stats, load them
    if (contest?.matchStats.length) {
      setStats(contest.matchStats);
    } else {
      // Initialize stats for all players
      setStats(
        players.map((p) => ({
          playerId: p.id,
          playerName: p.name,
          minutesPlayed: 0,
          goals: 0,
          assists: 0,
          cleanSheet: false,
          yellowCards: 0,
          redCards: 0,
          saves: 0,
          penaltiesMissed: 0,
          ownGoals: 0,
          fantasyPoints: 0,
        }))
      );
    }
  };

  const updateStat = (playerId: string, field: keyof MatchStat, value: any) => {
    setStats((prev) =>
      prev.map((s) => (s.playerId === playerId ? { ...s, [field]: value } : s))
    );
  };

  const handleSave = () => {
    if (!selectedContest) return;
    setMatchStats(selectedContest, stats);
    toast.success("Match statistics saved!");
  };

  const selectedContestObj = contests.find((c) => c.id === selectedContest);
  const activePlayers = stats.filter((s) => s.minutesPlayed > 0);

  return (
    <div className="space-y-6">
      {/* Contest Selector */}
      <div className="glass rounded-xl p-6">
        <h2 className="font-display text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-primary" />
          Input Match Statistics
        </h2>

        <div className="relative mb-4">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="w-full flex items-center justify-between bg-muted/50 border border-border rounded-lg px-4 py-3 text-sm text-left"
          >
            <span className={selectedContestObj ? "text-foreground" : "text-muted-foreground"}>
              {selectedContestObj?.title ?? "Select a contest..."}
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
                <p className="px-4 py-3 text-sm text-muted-foreground">No locked/completed contests available</p>
              ) : (
                eligibleContests.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => handleSelectContest(c.id)}
                    className="w-full text-left px-4 py-3 text-sm hover:bg-muted/50 transition-colors border-b border-border/50 last:border-0"
                  >
                    <span className="text-foreground">{c.title}</span>
                    <span className="text-xs text-muted-foreground ml-2">({c.status})</span>
                  </button>
                ))
              )}
            </motion.div>
          )}
        </div>

        {selectedContest && (
          <p className="text-xs text-muted-foreground">
            {activePlayers.length} players with minutes • {stats.length} total players
          </p>
        )}
      </div>

      {/* Stats Table */}
      {selectedContest && stats.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-display text-sm font-semibold text-foreground">
              Player Statistics
            </h3>
            <Button onClick={handleSave} className="bg-primary text-primary-foreground hover:bg-primary/90 glow-sm">
              <Save className="w-4 h-4 mr-2" />
              Save Stats
            </Button>
          </div>

          <div className="glass rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left px-3 py-2.5 text-[10px] text-muted-foreground font-medium sticky left-0 bg-card/90 backdrop-blur-sm">Player</th>
                    <th className="text-center px-2 py-2.5 text-[10px] text-muted-foreground font-medium">MIN</th>
                    <th className="text-center px-2 py-2.5 text-[10px] text-muted-foreground font-medium">⚽ G</th>
                    <th className="text-center px-2 py-2.5 text-[10px] text-muted-foreground font-medium">🅰️ A</th>
                    <th className="text-center px-2 py-2.5 text-[10px] text-muted-foreground font-medium">CS</th>
                    <th className="text-center px-2 py-2.5 text-[10px] text-muted-foreground font-medium">🟨</th>
                    <th className="text-center px-2 py-2.5 text-[10px] text-muted-foreground font-medium">🟥</th>
                    <th className="text-center px-2 py-2.5 text-[10px] text-muted-foreground font-medium">SV</th>
                    <th className="text-center px-2 py-2.5 text-[10px] text-muted-foreground font-medium">PM</th>
                    <th className="text-center px-2 py-2.5 text-[10px] text-muted-foreground font-medium">OG</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.map((stat, i) => {
                    const player = players.find((p) => p.id === stat.playerId);
                    return (
                      <tr key={stat.playerId} className="border-b border-border/30 hover:bg-muted/20">
                        <td className="px-3 py-2 sticky left-0 bg-card/90 backdrop-blur-sm">
                          <p className="text-xs font-semibold text-foreground truncate max-w-[120px]">{stat.playerName}</p>
                          <p className="text-[10px] text-muted-foreground">{player?.team} • {player?.position}</p>
                        </td>
                        <td className="px-1 py-2">
                          <Input
                            type="number"
                            min={0}
                            max={120}
                            value={stat.minutesPlayed || ""}
                            onChange={(e) => updateStat(stat.playerId, "minutesPlayed", parseInt(e.target.value) || 0)}
                            className="w-14 h-7 text-xs text-center bg-muted/30 border-border px-1"
                          />
                        </td>
                        <td className="px-1 py-2">
                          <Input
                            type="number"
                            min={0}
                            value={stat.goals || ""}
                            onChange={(e) => updateStat(stat.playerId, "goals", parseInt(e.target.value) || 0)}
                            className="w-12 h-7 text-xs text-center bg-muted/30 border-border px-1"
                          />
                        </td>
                        <td className="px-1 py-2">
                          <Input
                            type="number"
                            min={0}
                            value={stat.assists || ""}
                            onChange={(e) => updateStat(stat.playerId, "assists", parseInt(e.target.value) || 0)}
                            className="w-12 h-7 text-xs text-center bg-muted/30 border-border px-1"
                          />
                        </td>
                        <td className="px-1 py-2 text-center">
                          <Checkbox
                            checked={stat.cleanSheet}
                            onCheckedChange={(val) => updateStat(stat.playerId, "cleanSheet", !!val)}
                          />
                        </td>
                        <td className="px-1 py-2">
                          <Input
                            type="number"
                            min={0}
                            value={stat.yellowCards || ""}
                            onChange={(e) => updateStat(stat.playerId, "yellowCards", parseInt(e.target.value) || 0)}
                            className="w-12 h-7 text-xs text-center bg-muted/30 border-border px-1"
                          />
                        </td>
                        <td className="px-1 py-2">
                          <Input
                            type="number"
                            min={0}
                            value={stat.redCards || ""}
                            onChange={(e) => updateStat(stat.playerId, "redCards", parseInt(e.target.value) || 0)}
                            className="w-12 h-7 text-xs text-center bg-muted/30 border-border px-1"
                          />
                        </td>
                        <td className="px-1 py-2">
                          <Input
                            type="number"
                            min={0}
                            value={stat.saves || ""}
                            onChange={(e) => updateStat(stat.playerId, "saves", parseInt(e.target.value) || 0)}
                            className="w-12 h-7 text-xs text-center bg-muted/30 border-border px-1"
                          />
                        </td>
                        <td className="px-1 py-2">
                          <Input
                            type="number"
                            min={0}
                            value={stat.penaltiesMissed || ""}
                            onChange={(e) => updateStat(stat.playerId, "penaltiesMissed", parseInt(e.target.value) || 0)}
                            className="w-12 h-7 text-xs text-center bg-muted/30 border-border px-1"
                          />
                        </td>
                        <td className="px-1 py-2">
                          <Input
                            type="number"
                            min={0}
                            value={stat.ownGoals || ""}
                            onChange={(e) => updateStat(stat.playerId, "ownGoals", parseInt(e.target.value) || 0)}
                            className="w-12 h-7 text-xs text-center bg-muted/30 border-border px-1"
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
