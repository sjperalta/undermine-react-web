import { motion } from "framer-motion";
import { Swords, TrendingUp, Users, Zap } from "lucide-react";
import { ContestCard } from "@/components/ContestCard";
import { ContestStatus } from "@/data/types";
import { useState, useMemo } from "react";
import { LiveTicker } from "@/components/LiveTicker";
import { MatchCountdown } from "@/components/MatchCountdown";
import { UserStatsDisplay } from "@/components/dashboard/UserStatsDisplay";
import { ResumeDraftCard } from "@/components/dashboard/ResumeDraftCard";
import { MatchdayOverview } from "@/components/dashboard/MatchdayOverview";
import { LiveTopPlayers } from "@/components/dashboard/LiveTopPlayers";
import { PlayerNewsFeed } from "@/components/dashboard/PlayerNewsFeed";
import { OwnershipTrends } from "@/components/dashboard/OwnershipTrends";
import { LeaderboardTeaser } from "@/components/dashboard/LeaderboardTeaser";
import { RealLeagueStandings } from "@/components/dashboard/RealLeagueStandings";
import { FeaturedTeams } from "@/components/dashboard/FeaturedTeams";
import { Search } from "lucide-react";
import {
  mockContests,
  mockUserStats,
  mockJoinedContests,
  mockRealMatches,
  mockPlayerNews,
  mockOwnershipTrends
} from "@/data/mockData";

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
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    let result = filter === "all" ? mockContests : mockContests.filter((c) => c.status === filter);
    if (searchQuery) {
      result = result.filter(c => c.title.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    return result;
  }, [filter, searchQuery]);

  const nextContest = mockContests.find(c => c.status === 'open');

  return (
    <div className="min-h-screen pt-16">
      <LiveTicker />
      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
          <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-primary/3 blur-[80px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5">
                <Zap className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-semibold text-primary tracking-wide">DAILY FANTASY SOCCER</span>
              </div>
              {nextContest && <MatchCountdown startTime={nextContest.startTime} />}
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-3 leading-tight">
              Build Your Squad.
              <br />
              <span className="text-primary text-glow">Dominate the Pitch.</span>
            </h1>
            <p className="text-base text-muted-foreground max-w-lg mx-auto mb-6">
              Pick real players. Compete in daily contests. Climb the ranks. No money required.
            </p>
          </motion.div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex justify-center gap-8 sm:gap-16"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="flex items-center justify-center gap-1.5 ">
                  <stat.icon className="w-3.5 h-3.5 text-primary" />
                  <span className="font-display text-xl font-bold text-foreground">{stat.value}</span>
                </div>
                <span className="text-xs text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Teams Marquee */}
      <FeaturedTeams />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
        <UserStatsDisplay stats={mockUserStats} />

        {mockJoinedContests.length > 0 && (
          <ResumeDraftCard contest={mockJoinedContests[0]} />
        )}

        <MatchdayOverview matches={mockRealMatches} />

        <div className="grid lg:grid-cols-[1fr_320px] gap-12">
          {/* Left Column: Contests */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <h2 className="font-display text-2xl font-bold text-foreground">Active Contests</h2>

              <div className="flex flex-col sm:flex-row gap-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search contests..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-muted/50 border border-border rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                {/* Filters */}
                <div className="flex gap-1 bg-muted/50 rounded-lg p-1 w-fit">
                  {filters.map((f) => (
                    <button
                      key={f.value}
                      onClick={() => setFilter(f.value)}
                      className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${filter === f.value
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                        }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {filtered.map((contest, i) => (
                <ContestCard key={contest.id} contest={contest} index={i} />
              ))}
              {filtered.length === 0 && (
                <div className="col-span-2 text-center py-16 text-muted-foreground bg-muted/20 border border-dashed border-border rounded-2xl">
                  No contests found matching your search.
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Sidebar */}
          <aside className="space-y-8">
            <LiveTopPlayers />
            <RealLeagueStandings />
            <PlayerNewsFeed news={mockPlayerNews} />
            <LeaderboardTeaser />
            <OwnershipTrends trends={mockOwnershipTrends} />
          </aside>
        </div>
      </main>
    </div>
  );
}
