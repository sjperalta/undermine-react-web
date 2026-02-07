import { motion } from "framer-motion";
import { Swords, TrendingUp, Users, Zap } from "lucide-react";
import { mockContests } from "@/data/mockData";
import { ContestCard } from "@/components/ContestCard";
import { ContestStatus } from "@/data/types";
import { useState } from "react";

const filters: { label: string; value: ContestStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Open", value: "open" },
  { label: "Live", value: "locked" },
  { label: "Completed", value: "completed" },
];

const stats = [
  { label: "Active Contests", value: "12", icon: Swords },
  { label: "Live Players", value: "3.2K", icon: Users },
  { label: "Lineups Today", value: "8.7K", icon: TrendingUp },
];

export default function Index() {
  const [filter, setFilter] = useState<ContestStatus | "all">("all");
  const filtered = filter === "all" ? mockContests : mockContests.filter((c) => c.status === filter);

  return (
    <div className="min-h-screen pt-16">
      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
          <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-primary/3 blur-[80px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-6">
              <Zap className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-semibold text-primary tracking-wide">DAILY FANTASY SOCCER</span>
            </div>
            <h1 className="font-display text-4xl sm:text-6xl font-bold text-foreground mb-4 leading-tight">
              Build Your Squad.
              <br />
              <span className="text-primary text-glow">Dominate the Pitch.</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
              Pick real players. Compete in daily contests. Climb the ranks. No money required — just pure soccer knowledge.
            </p>
          </motion.div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex justify-center gap-6 sm:gap-12"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <stat.icon className="w-4 h-4 text-primary" />
                  <span className="font-display text-2xl font-bold text-foreground">{stat.value}</span>
                </div>
                <span className="text-xs text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contest Feed */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-xl font-semibold text-foreground">Contests</h2>
          <div className="flex gap-1 bg-muted/50 rounded-lg p-1">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  filter === f.value
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.map((contest, i) => (
            <ContestCard key={contest.id} contest={contest} index={i} />
          ))}
          {filtered.length === 0 && (
            <div className="col-span-2 text-center py-16 text-muted-foreground">
              No contests found for this filter.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
