import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Trophy, Users, Swords, ChevronRight, Ticket, DollarSign, CheckCircle2 } from "lucide-react";
import { mockContests, mockPlayers } from "@/data/mockData";
import { useCountdown } from "@/hooks/useCountdown";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScoringRules } from "@/components/dashboard/ScoringRules";
import { useAuth } from "@/contexts/AuthContext";
import { useContest } from "@/contexts/ContestContext";
import { toast } from "sonner";

export default function ContestDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { joinContest, hasJoinedContest, getLineup } = useContest();
  const contest = mockContests.find((c) => c.id === id);
  const countdown = useCountdown(contest?.startTime ?? "");

  const hasJoined = contest ? hasJoinedContest(contest.id) : false;
  const lineup = contest ? getLineup(contest.id) : undefined;
  const isLocked = contest?.status === "locked" || contest?.status === "completed";

  if (!contest) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <p className="text-muted-foreground">Contest not found.</p>
      </div>
    );
  }

  const topPlayers = mockPlayers.slice(0, 6);

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Back */}
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Contests
        </Link>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Badge variant="outline" className={`mb-3 text-[10px] font-bold tracking-widest ${contest.status === "open" ? "bg-primary/20 text-primary border-primary/30" :
            contest.status === "locked" ? "bg-live/20 text-live border-live/30" :
              "bg-muted text-muted-foreground border-border"
            }`}>
            {contest.status.toUpperCase()}
          </Badge>
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">{contest.title}</h1>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-2 bg-gold/10 border border-gold/20 rounded-lg px-4 py-2">
              <Trophy className="w-5 h-5 text-gold" />
              <span className="font-display text-xl font-bold text-gold">{contest.prizePool}</span>
            </div>
            <div className="flex items-center gap-2 bg-muted/60 border border-border rounded-lg px-4 py-2">
              <Ticket className="w-4 h-4 text-muted-foreground" />
              <span className="font-display text-lg font-semibold text-foreground">
                {contest.entryFee === 0 ? "FREE ENTRY" : `$${contest.entryFee} Entry`}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8"
        >
          {[
            { icon: Users, label: "Entrants", value: `${contest.entrants.toLocaleString()} / ${contest.maxEntrants.toLocaleString()}` },
            { icon: DollarSign, label: "Entry Fee", value: contest.entryFee === 0 ? "FREE" : `$${contest.entryFee}` },
            { icon: Clock, label: "Countdown", value: contest.status === "open" ? countdown : contest.status === "locked" ? "LIVE" : "FINAL" },
            { icon: Swords, label: "Matches", value: contest.matches.length.toString() },
          ].map((item) => (
            <div key={item.label} className="glass rounded-xl p-4 text-center">
              <item.icon className="w-5 h-5 text-primary mx-auto mb-2" />
              <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
              <p className="font-display text-lg font-bold text-foreground">{item.value}</p>
            </div>
          ))}
        </motion.div>

        {/* Matches */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-8">
          <h2 className="font-display text-lg font-semibold text-foreground mb-3">Matches</h2>
          <div className="space-y-2">
            {contest.matches.map((match) => (
              <div key={match} className="glass rounded-lg px-4 py-3 flex items-center justify-between">
                <span className="text-sm text-foreground">{match}</span>
                <span className="text-xs text-muted-foreground">
                  {contest.status === "locked" ? "🔴 LIVE" : contest.status === "completed" ? "FT" : "Upcoming"}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Top Players Preview */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-8">
          <h2 className="font-display text-lg font-semibold text-foreground mb-3">Top Available Players</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {topPlayers.map((p) => (
              <div key={p.id} className="glass rounded-lg p-3">
                <p className="text-sm font-semibold text-foreground truncate">{p.name}</p>
                <p className="text-xs text-muted-foreground">{p.team} • {p.position}</p>
                <p className="text-sm font-display font-bold text-primary mt-1">${(p.salary / 1000).toFixed(1)}k</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Scoring Rules */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="mb-8">
          <ScoringRules />
        </motion.div>

        {/* CTA */}
        {contest.status === "open" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            {!hasJoined ? (
              <Button
                onClick={() => {
                  if (!isAuthenticated) {
                    toast.error("Please sign in to join contests");
                    navigate("/login");
                    return;
                  }

                  const success = joinContest(contest.id);
                  if (success) {
                    toast.success("Successfully joined contest!");
                    navigate(`/contest/${contest.id}/build`);
                  } else {
                    toast.error("You've already joined this contest");
                  }
                }}
                className="w-full h-14 text-lg font-display font-bold glow-md rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
              >
                Join Contest & Build Lineup
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            ) : (
              <div className="space-y-3">
                <div className="glass rounded-xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span className="font-semibold text-foreground">Contest Joined</span>
                  </div>
                  {lineup && (
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                      Lineup {lineup.lineup.filter(s => s.player).length > 0 ? "Submitted" : "Draft"}
                    </Badge>
                  )}
                </div>
                <Link to={`/contest/${contest.id}/build`}>
                  <Button className="w-full h-14 text-lg font-display font-bold rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all">
                    {lineup && lineup.lineup.filter(s => s.player).length > 0 ? "Edit" : "Build"} Your Lineup
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            )}
          </motion.div>
        )}

        {contest.status === "locked" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <div className="glass rounded-xl p-6 text-center">
              <p className="text-lg font-semibold text-foreground mb-2">Contest is Live</p>
              <p className="text-sm text-muted-foreground">Lineup changes are no longer allowed</p>
            </div>
          </motion.div>
        )}

        {contest.status === "completed" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Link to={`/contest/${contest.id}/results`}>
              <Button className="w-full h-14 text-lg font-display font-bold rounded-xl bg-gold/10 text-gold border border-gold/30 hover:bg-gold/20 transition-all">
                <Trophy className="w-5 h-5 mr-2" />
                View Final Results
              </Button>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}
