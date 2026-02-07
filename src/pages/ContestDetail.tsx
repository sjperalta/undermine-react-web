import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Trophy, Users, Swords, ChevronRight } from "lucide-react";
import { mockContests, mockPlayers } from "@/data/mockData";
import { useCountdown } from "@/hooks/useCountdown";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function ContestDetail() {
  const { id } = useParams();
  const contest = mockContests.find((c) => c.id === id);
  const countdown = useCountdown(contest?.startTime ?? "");

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
          <Badge variant="outline" className={`mb-3 text-[10px] font-bold tracking-widest ${
            contest.status === "open" ? "bg-primary/20 text-primary border-primary/30" :
            contest.status === "locked" ? "bg-live/20 text-live border-live/30" :
            "bg-muted text-muted-foreground border-border"
          }`}>
            {contest.status.toUpperCase()}
          </Badge>
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">{contest.title}</h1>
          <p className="text-muted-foreground">Free entry • Compete for glory</p>
        </motion.div>

        {/* Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8"
        >
          {[
            { icon: Users, label: "Entrants", value: contest.entrants.toLocaleString() },
            { icon: Trophy, label: "Prize", value: contest.prizePool },
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

        {/* CTA */}
        {contest.status === "open" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Link to={`/contest/${contest.id}/build`}>
              <Button className="w-full h-14 text-lg font-display font-bold glow-md rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all">
                Build Your Lineup
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}
