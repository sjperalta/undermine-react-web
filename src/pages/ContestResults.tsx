import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Trophy, Users, DollarSign, BarChart3 } from "lucide-react";
import { mockContests } from "@/data/mockData";
import { mockContestResults } from "@/data/mockResults";
import { ResultRow } from "@/components/ResultRow";
import { Badge } from "@/components/ui/badge";

export default function ContestResults() {
  const { id } = useParams();
  const contest = mockContests.find((c) => c.id === id);
  const results = mockContestResults[id ?? ""] ?? [];

  if (!contest) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <p className="text-muted-foreground">Contest not found.</p>
      </div>
    );
  }

  if (contest.status !== "completed") {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center flex-col gap-4">
        <BarChart3 className="w-12 h-12 text-muted-foreground" />
        <p className="text-muted-foreground">Results are not available yet.</p>
        <Link to={`/contest/${id}`} className="text-sm text-primary hover:underline">
          Back to contest
        </Link>
      </div>
    );
  }

  const topThree = results.slice(0, 3);
  const rest = results.slice(3);

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Back */}
        <Link
          to={`/contest/${id}`}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Contest
        </Link>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Badge variant="outline" className="mb-3 text-[10px] font-bold tracking-widest bg-muted text-muted-foreground border-border">
            FINAL RESULTS
          </Badge>
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">{contest.title}</h1>
          <div className="flex items-center gap-4 mt-2 flex-wrap">
            <div className="flex items-center gap-2 bg-gold/10 border border-gold/20 rounded-lg px-4 py-2">
              <Trophy className="w-5 h-5 text-gold" />
              <span className="font-display text-xl font-bold text-gold">{contest.prizePool}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="w-4 h-4" />
              {contest.entrants.toLocaleString()} entrants
            </div>
          </div>
        </motion.div>

        {/* Podium */}
        {topThree.length >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-10"
          >
            <div className="flex items-end justify-center gap-3 sm:gap-4 mb-2">
              {/* 2nd place */}
              <PodiumCard result={topThree[1]} height="h-28" />
              {/* 1st place */}
              <PodiumCard result={topThree[0]} height="h-36" isFirst />
              {/* 3rd place */}
              <PodiumCard result={topThree[2]} height="h-24" />
            </div>
          </motion.div>
        )}

        {/* Full leaderboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="font-display text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            Full Standings
          </h2>
          <div className="space-y-2">
            {results.map((result, i) => (
              <ResultRow key={result.rank} result={result} index={i} />
            ))}
          </div>

          {results.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              No results available for this contest.
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

function PodiumCard({ result, height, isFirst }: { result: { rank: number; username: string; totalPoints: number; prize: string }; height: string; isFirst?: boolean }) {
  const podiumColors: Record<number, string> = {
    1: "from-gold/20 to-gold/5 border-gold/30",
    2: "from-silver/20 to-silver/5 border-silver/30",
    3: "from-bronze/20 to-bronze/5 border-bronze/30",
  };
  const textColor: Record<number, string> = {
    1: "text-gold",
    2: "text-silver",
    3: "text-bronze",
  };

  return (
    <div className={`flex flex-col items-center w-28 sm:w-32`}>
      {/* Avatar + info */}
      <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-muted flex items-center justify-center text-lg font-bold mb-2 ${textColor[result.rank]} ${isFirst ? "ring-2 ring-gold/50 glow-sm" : ""}`}>
        {result.username.charAt(0)}
      </div>
      <p className="text-xs font-semibold text-foreground truncate w-full text-center">{result.username}</p>
      <p className={`font-display text-lg font-bold ${isFirst ? "text-primary text-glow" : "text-foreground"}`}>{result.totalPoints}</p>
      {result.prize && (
        <span className={`text-[11px] font-bold ${textColor[result.rank]}`}>{result.prize}</span>
      )}
      {/* Podium bar */}
      <div className={`w-full ${height} mt-2 rounded-t-xl bg-gradient-to-t border ${podiumColors[result.rank]} flex items-center justify-center`}>
        <span className={`font-display text-2xl font-bold ${textColor[result.rank]}`}>
          {result.rank === 1 ? "🥇" : result.rank === 2 ? "🥈" : "🥉"}
        </span>
      </div>
    </div>
  );
}
