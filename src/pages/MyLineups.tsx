import { motion } from "framer-motion";
import { LayoutGrid, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { mockUserLineups } from "@/data/mockData";
import { LineupCard } from "@/components/dashboard/LineupCard";
import { LineupHealth } from "@/components/dashboard/LineupHealth";

export default function MyLineups() {
  const hasLineups = mockUserLineups.length > 0;

  return (
    <div className="min-h-screen pt-24 pb-20 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="font-display text-4xl font-bold text-foreground mb-2">My Lineups</h1>
            <p className="text-muted-foreground">Manage your squads and track your performance across active contests.</p>
          </div>
          {hasLineups && (
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-display font-semibold text-sm hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/25"
            >
              <Plus className="w-4 h-4" />
              Join New Contest
            </Link>
          )}
        </div>

        {!hasLineups ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-24 bg-muted/20 border border-dashed border-border rounded-3xl"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-muted border border-border mb-6">
              <LayoutGrid className="w-8 h-8 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">No Lineups Yet</h2>
            <p className="text-muted-foreground mb-8 max-w-xs mx-auto">
              You haven't entered any contests. Build your first squad and start competing!
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-display font-semibold hover:bg-primary/90 transition-all glow-sm"
            >
              Browse Active Contests
            </Link>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_320px] gap-12 items-start">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {mockUserLineups.map((lineup, i) => (
                <LineupCard key={lineup.id} lineup={lineup} index={i} />
              ))}
            </div>
            <aside className="space-y-8">
              <LineupHealth />
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
