import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Play, CheckCircle2, ChevronDown, Trophy, Terminal, Loader2, ShieldCheck, Database, LayoutPanelTop, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAdmin } from "@/contexts/AdminContext";
import { useScoring } from "@/contexts/ScoringContext";
import { mockPlayers } from "@/data/mockData";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

interface LogEntry {
  id: string;
  msg: string;
  type: "info" | "success" | "warning" | "error" | "system";
  timestamp: string;
}

export function ScoringEngine() {
  const { contests } = useAdmin();
  const { addEvent, resetSimulation, liveEvents, liveScores } = useScoring();
  const [selectedContest, setSelectedContest] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simSpeed, setSimSpeed] = useState(1);
  const [gameMinute, setGameMinute] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const eligibleContests = contests.filter(
    (c) => c.status === "open" || c.status === "locked" || c.status === "completed"
  );

  const selectedContestObj = contests.find((c) => c.id === selectedContest);
  // Auto-scroll logs
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [liveEvents]);

  const toggleSimulation = () => {
    if (isSimulating) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setIsSimulating(false);
    } else {
      setIsSimulating(true);
    }
  };

  const handleReset = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsSimulating(false);
    setGameMinute(0);
    resetSimulation();
  };

  // Simulation Loop
  useEffect(() => {
    if (isSimulating && selectedContest) {
      intervalRef.current = setInterval(() => {
        setGameMinute((prev) => {
          if (prev >= 90) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            setIsSimulating(false);
            toast.success("Match ended!");
            return 90;
          }
          return prev + 1;
        });

        // Randomly generate events
        if (Math.random() < 0.15) { // 15% chance of event per tick
          // Pick random player
          // In a real app, this would be players from the specific matches in the contest
          const player = mockPlayers[Math.floor(Math.random() * mockPlayers.length)];

          const rand = Math.random();
          let type: "GOAL" | "ASSIST" | "YELLOW_CARD" | "RED_CARD" | "SAVE" | "PENALTY" = "GOAL";
          let points = 0;

          if (rand < 0.05) { type = "RED_CARD"; points = -3; }
          else if (rand < 0.15) { type = "YELLOW_CARD"; points = -1; }
          else if (rand < 0.4) { type = "ASSIST"; points = 6; }
          else if (rand < 0.6) { type = "GOAL"; points = 10; } // Increased goal probability for demo
          else if (rand < 0.8) { type = "SAVE"; points = 2; }
          else { type = "PENALTY"; points = -2; } // Penalty conceded

          if (player.position === "GK" && type === "GOAL") points = 100; // GK Goal bonus lol

          addEvent({
            match: "SIM vs SIM", // Placeholder
            team: player.team,
            player: player.name,
            type,
            minute: gameMinute,
            points
          });
        }

      }, 1000 / simSpeed);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isSimulating, selectedContest, simSpeed, gameMinute, addEvent]);

  // Derived stats for UI
  const scoredPlayers = Object.entries(liveScores).map(([name, stats]) => ({
    name,
    ...stats
  })).sort((a, b) => b.points - a.points);

  return (
    <div className="space-y-6">
      {/* Engine Panel */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-xl">
        <div className="bg-muted/30 px-6 py-5 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg bg-primary/10 border border-primary/20 ${isSimulating ? 'animate-pulse' : ''}`}>
              <Zap className="w-5 h-5 text-primary shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]" />
            </div>
            <div>
              <h2 className="font-display text-lg font-bold text-foreground leading-none">Live Simulation Node</h2>
              <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mt-1">Real-time Event Generator</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex bg-muted/20 rounded-lg p-1">
              {[1, 5, 10, 50].map(speed => (
                <button
                  key={speed}
                  onClick={() => setSimSpeed(speed)}
                  className={`px-2 py-1 text-[10px] font-bold rounded-md transition-all ${simSpeed === speed ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  {speed}x
                </button>
              ))}
            </div>
            <Badge variant="outline" className="bg-background/50 border-border text-[9px] font-bold">V3.0-LIVE</Badge>
          </div>
        </div>

        <div className="p-6">
          <div className="relative mb-6">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              disabled={isSimulating}
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
                  {liveEvents.length === 0 && (
                    <div className="h-full flex flex-col items-center justify-center opacity-20">
                      <Terminal className="w-8 h-8 mb-2" />
                      <span>WAITING FOR INPUT...</span>
                    </div>
                  )}
                  {liveEvents.map((log) => (
                    <div key={log.id} className="flex gap-3">
                      <span className="text-white/20 shrink-0 w-8 text-right">{log.minute}'</span>
                      <span className={`
                        ${log.type === 'GOAL' ? 'text-green-400 font-bold' :
                          log.type === 'ASSIST' ? 'text-blue-400' :
                            log.type === 'RED_CARD' ? 'text-red-500 font-bold' :
                              log.type === 'YELLOW_CARD' ? 'text-yellow-400' : 'text-white/70'}
                      `}>
                        {log.type}: {log.player} ({log.team}) <span className="opacity-50 text-[10px] ml-2">+{log.points}pts</span>
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-2 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-white/40">
                  <span className="flex items-center gap-2">
                    <Clock className={`w-3 h-3 ${isSimulating ? "text-live animate-pulse" : ""}`} />
                    MATCH TIME: {gameMinute}'
                  </span>
                  <span>{liveEvents.length} EVENTS</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  onClick={toggleSimulation}
                  disabled={!selectedContest || gameMinute >= 90}
                  className={`h-14 text-sm font-black uppercase tracking-widest rounded-xl ${isSimulating ? "bg-red-500/10 text-red-500 hover:bg-red-500/20" : "bg-primary text-primary-foreground hover:bg-primary/90"}`}
                >
                  {isSimulating ? "PAUSE SIM" : "START SIM"}
                </Button>
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="h-14 text-sm font-bold uppercase tracking-widest rounded-xl border-border bg-transparent hover:bg-muted/10"
                >
                  RESET
                </Button>
              </div>
            </div>

            {/* Verification Checklist */}
            <div className="bg-muted/10 border border-border rounded-xl p-5 space-y-5">
              <h4 className="text-[10px] font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verification Checklist
              </h4>
              <div className="space-y-3">
                {[
                  { label: "Contest Selected", ok: !!selectedContestObj },
                  { label: "Simulation Ready", ok: !!selectedContestObj },
                  { label: "Scoring Bridge", ok: true },
                  { label: "Live Connection", ok: isSimulating }
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
        {scoredPlayers.length > 0 && (
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
              {scoredPlayers.slice(0, 12).map((stat, i) => (
                <motion.div
                  key={stat.name}
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
                    <p className="text-sm font-bold text-foreground truncate group-hover:text-primary transition-colors">{stat.name}</p>
                    <p className="text-[10px] text-muted-foreground font-medium truncate uppercase tracking-tighter">
                      {stat.goals}G • {stat.assists}A • {stat.shots} Shots
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-display font-black text-foreground">{stat.points}</p>
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
