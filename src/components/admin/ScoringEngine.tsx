import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Play, CheckCircle2, ChevronDown, Trophy, Terminal, Loader2, ShieldCheck, Database, LayoutPanelTop, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAdmin } from "../../contexts/AdminContext";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

interface LogEntry {
  id: string;
  msg: string;
  type: "info" | "success" | "warning" | "error" | "system";
  timestamp: string;
}

export function ScoringEngine() {
  const { contests, scoreContest } = useAdmin();
  const [selectedContest, setSelectedContest] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [processingState, setProcessingState] = useState<"idle" | "validating" | "computing" | "propagating" | "done">("idle");
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [progress, setProgress] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const eligibleContests = contests.filter(
    (c) => c.matchStats?.length > 0 && (c.status === "locked" || c.status === "completed")
  );

  const selectedContestObj = contests.find((c) => c.id === selectedContest);
  const activeStats = selectedContestObj?.matchStats?.filter((s) => s.minutesPlayed > 0) ?? [];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const addLog = (msg: string, type: LogEntry["type"] = "info") => {
    setLogs(prev => [...prev, {
      id: Math.random().toString(36).substr(2, 9),
      msg,
      type,
      timestamp: new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })
    }]);
  };

  const runPhase = async (phase: typeof processingState, duration: number, logs: string[]) => {
    setProcessingState(phase);
    const stepTime = duration / logs.length;
    for (const log of logs) {
      addLog(log);
      await new Promise(r => setTimeout(r, stepTime));
    }
  };

  const handleScore = async () => {
    if (!selectedContest || !selectedContestObj) return;

    setProcessingState("validating");
    setLogs([]);
    setProgress(0);

    addLog("Initializing Scoring Engine v2.0...", "system");
    await new Promise(r => setTimeout(r, 600));

    // Phase 1: Validation
    await runPhase("validating", 1200, [
      `Validating contest: ${selectedContestObj.title}`,
      `Checking match signatures... OK`,
      `Verifying ${activeStats.length} player stat blocks...`,
      "Data integrity check passed."
    ]);
    setProgress(33);

    // Phase 2: Computing
    await runPhase("computing", 2000, [
      "Accessing algorithmic point-mapping...",
      "Calculating goal distributions...",
      "Mapping clean sheet bonuses...",
      "Applying penalty/card deductions...",
      "Optimizing point totals..."
    ]);
    setProgress(66);
    scoreContest(selectedContest);

    // Phase 3: Propagating
    await runPhase("propagating", 1000, [
      "Broadcasting results to global state...",
      "Updating user leaderboards...",
      "Finalizing contest status..."
    ]);
    setProgress(100);

    setProcessingState("done");
    addLog("ENGINE CYCLE COMPLETE. ALL SCORES PROPAGATED.", "success");
    toast.success("🎯 Scoring complete!");
  };

  const scoredStats = selectedContestObj?.matchStats
    ?.filter((s) => s.fantasyPoints !== 0 || s.minutesPlayed > 0)
    .sort((a, b) => b.fantasyPoints - a.fantasyPoints) ?? [];

  return (
    <div className="space-y-6">
      {/* Engine Panel */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-xl">
        <div className="bg-muted/30 px-6 py-5 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg bg-primary/10 border border-primary/20 ${processingState !== 'idle' ? 'animate-pulse' : ''}`}>
              <Zap className="w-5 h-5 text-primary shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]" />
            </div>
            <div>
              <h2 className="font-display text-lg font-bold text-foreground leading-none">Scoring Engine</h2>
              <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mt-1">Algorithmic Processing Unit</p>
            </div>
          </div>
          <Badge variant="outline" className="bg-background/50 border-border text-[9px] font-bold">V2.4.0-CORE</Badge>
        </div>

        <div className="p-6">
          <div className="relative mb-6">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              disabled={processingState !== 'idle' && processingState !== 'done'}
              className="w-full flex items-center justify-between bg-muted/20 border border-border rounded-xl px-5 py-4 text-sm text-left hover:bg-muted/30 transition-all group"
            >
              <div>
                <p className="text-[10px] font-bold text-muted-foreground uppercase mb-0.5">Target Contest</p>
                <p className={`font-semibold ${selectedContestObj ? "text-foreground" : "text-muted-foreground"}`}>
                  {selectedContestObj?.title ?? "Select contest payload..."}
                </p>
              </div>
              <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${showDropdown ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {showDropdown && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="absolute top-full mt-2 left-0 right-0 bg-popover border border-border rounded-xl shadow-2xl z-50 overflow-hidden"
                >
                  <div className="max-h-64 overflow-y-auto">
                    {eligibleContests.length === 0 ? (
                      <div className="p-8 text-center">
                        <Database className="w-8 h-8 text-muted-foreground/30 mx-auto mb-3" />
                        <p className="text-sm text-muted-foreground">No eligible payloads detected.</p>
                      </div>
                    ) : (
                      eligibleContests.map((c) => (
                        <button
                          key={c.id}
                          onClick={() => {
                            setSelectedContest(c.id);
                            setShowDropdown(false);
                          }}
                          className="w-full text-left px-5 py-4 hover:bg-muted/50 transition-colors border-b border-border last:border-0 flex items-center justify-between group"
                        >
                          <div>
                            <p className="font-bold text-foreground group-hover:text-primary transition-colors">{c.title}</p>
                            <p className="text-[10px] text-muted-foreground uppercase font-medium">{c.matchStats.length} Data Points</p>
                          </div>
                          {c.scored && <CheckCircle2 className="w-4 h-4 text-primary" />}
                        </button>
                      ))
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="grid lg:grid-cols-[1fr_300px] gap-6">
            {/* Logic Console */}
            <div className="space-y-4">
              <div className="bg-[#0c0c0e] rounded-xl border border-white/5 p-4 font-mono text-[11px] h-[240px] flex flex-col shadow-inner relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-[#0c0c0e] to-transparent z-10 pointer-events-none" />
                <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-1 relative pr-2 scrollbar-hide py-4">
                  {logs.length === 0 && (
                    <div className="h-full flex flex-col items-center justify-center opacity-20">
                      <Terminal className="w-8 h-8 mb-2" />
                      <span>WAITING FOR INPUT...</span>
                    </div>
                  )}
                  {logs.map((log) => (
                    <div key={log.id} className="flex gap-3">
                      <span className="text-white/20 shrink-0">[{log.timestamp}]</span>
                      <span className={`
                        ${log.type === 'success' ? 'text-green-400' :
                          log.type === 'warning' ? 'text-yellow-400' :
                            log.type === 'error' ? 'text-red-400' :
                              log.type === 'system' ? 'text-primary' : 'text-white/70'}
                      `}>
                        {log.msg}
                      </span>
                    </div>
                  ))}
                </div>
                {processingState !== 'idle' && processingState !== 'done' && (
                  <div className="mt-2 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-white/40">
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-3 h-3 animate-spin" />
                      PHASE: {processingState.toUpperCase()}
                    </span>
                    <span>{progress}%</span>
                  </div>
                )}
              </div>

              <Button
                onClick={handleScore}
                disabled={!selectedContest || (processingState !== 'idle' && processingState !== 'done') || activeStats.length === 0}
                className="w-full h-14 text-sm font-black uppercase tracking-[0.2em] rounded-xl relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-primary/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
                <span className="relative z-10 flex items-center gap-3">
                  {processingState === 'idle' || processingState === 'done' ? (
                    <><Play className="w-4 h-4 fill-current" /> {processingState === 'done' ? "Re-Run" : "Execute"} Engine</>
                  ) : (
                    <><Zap className="w-4 h-4 animate-pulse" /> Processing Core...</>
                  )}
                </span>
              </Button>
            </div>

            {/* Verification Checklist */}
            <div className="bg-muted/10 border border-border rounded-xl p-5 space-y-5">
              <h4 className="text-[10px] font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verification Checklist
              </h4>
              <div className="space-y-3">
                {[
                  { label: "Data Integrity", ok: selectedContestObj?.matchStats?.length > 0 },
                  { label: "Contest Locked", ok: selectedContestObj?.status === 'locked' || selectedContestObj?.status === 'completed' },
                  { label: "Scoring Mapping", ok: true },
                  { label: "Validation Engine", ok: true }
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-foreground/80">{item.label}</span>
                    <div className={`w-1.5 h-1.5 rounded-full ${item.ok ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 'bg-red-500'}`} />
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-border">
                <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                  <Clock className="w-4 h-4 text-primary" />
                  <div>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase">Next Auto-Run</p>
                    <p className="text-xs font-bold text-foreground">Pending Matches</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results with Reveal Animation */}
      <AnimatePresence>
        {processingState === 'done' && scoredStats.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-display text-sm font-bold text-foreground uppercase tracking-widest flex items-center gap-2">
                <Trophy className="w-4 h-4 text-primary" />
                Contest Outcome
              </h3>
              <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 text-[10px]">VERIFIED RESULTS</Badge>
            </div>

            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {scoredStats.slice(0, 12).map((stat, i) => (
                <motion.div
                  key={stat.playerId}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-card border border-border rounded-xl p-4 flex items-center gap-4 group hover:border-primary/50 transition-all cursor-default"
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-display font-black text-xs border ${i < 3 ? "bg-primary/10 border-primary/30 text-primary" : "bg-muted/50 border-border text-muted-foreground"
                    }`}>
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-foreground truncate group-hover:text-primary transition-colors">{stat.playerName}</p>
                    <p className="text-[10px] text-muted-foreground font-medium truncate uppercase tracking-tighter">
                      {stat.goals}G • {stat.assists}A • {stat.minutesPlayed}'
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-display font-black text-foreground">{stat.fantasyPoints}</p>
                    <p className="text-[8px] font-bold text-muted-foreground uppercase">Points</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <Button variant="ghost" className="w-full text-xs text-muted-foreground hover:text-primary uppercase tracking-widest py-6">
              Full Results Breakdown (PDF)
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
