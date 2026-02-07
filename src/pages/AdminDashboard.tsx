import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Plus, Upload, BarChart3, Zap, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { ContestCreator } from "@/components/admin/ContestCreator";
import { PlayerImport } from "@/components/admin/PlayerImport";
import { MatchStatsInput } from "@/components/admin/MatchStatsInput";
import { ScoringEngine } from "@/components/admin/ScoringEngine";

const tabs = [
  { id: "contests", label: "Create Contest", icon: Plus },
  { id: "import", label: "Import Players", icon: Upload },
  { id: "stats", label: "Match Stats", icon: BarChart3 },
  { id: "scoring", label: "Scoring Engine", icon: Zap },
] as const;

type TabId = (typeof tabs)[number]["id"];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabId>("contests");

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center glow-sm">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-xs text-muted-foreground">Manage contests, players, and scoring</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-muted/30 rounded-xl p-1.5 mb-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? "text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="admin-tab"
                  className="absolute inset-0 bg-primary rounded-lg glow-sm"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </span>
            </button>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === "contests" && <ContestCreator />}
            {activeTab === "import" && <PlayerImport />}
            {activeTab === "stats" && <MatchStatsInput />}
            {activeTab === "scoring" && <ScoringEngine />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
