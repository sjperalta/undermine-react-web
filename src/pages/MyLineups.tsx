import { motion } from "framer-motion";
import { LayoutGrid } from "lucide-react";
import { Link } from "react-router-dom";

export default function MyLineups() {
  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-20">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-muted border border-border mb-4">
            <LayoutGrid className="w-7 h-7 text-muted-foreground" />
          </div>
          <h1 className="font-display text-2xl font-bold text-foreground mb-2">My Lineups</h1>
          <p className="text-muted-foreground mb-6">You haven't entered any contests yet.</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-display font-semibold text-sm hover:bg-primary/90 transition-colors glow-sm"
          >
            Browse Contests
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
