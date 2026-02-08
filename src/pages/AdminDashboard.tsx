import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Plus, Upload, BarChart3, Zap, ChevronLeft, LayoutDashboard, Users, Activity } from "lucide-react";
import { Link } from "react-router-dom";
import { ContestCreator } from "@/components/admin/ContestCreator";
import { ContestManager } from "@/components/admin/ContestManager"; // Added
import { UserManagement } from "@/components/admin/UserManagement"; // Added
import { AdminAnalytics } from "@/components/admin/AdminAnalytics"; // Added
import { PlayerImport } from "@/components/admin/PlayerImport";
import { MatchStatsInput } from "@/components/admin/MatchStatsInput";
import { ScoringEngine } from "@/components/admin/ScoringEngine";

const tabs = [
  { id: "analytics", label: "Analytics", icon: LayoutDashboard }, // Added
  { id: "contests", label: "Create Contest", icon: Plus },
  { id: "manage", label: "Contest Manager", icon: Activity }, // Added
  { id: "users", label: "User Management", icon: Users }, // Added
  { id: "import", label: "Import Players", icon: Upload },
  { id: "stats", label: "Match Stats", icon: BarChart3 },
  { id: "scoring", label: "Scoring Engine", icon: Zap },
] as const;

type TabId = (typeof tabs)[number]["id"];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabId>("analytics"); // Default to analytics

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center glow-sm shadow-[0_0_15px_-3px_rgba(var(--primary-rgb),0.3)]">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h1 className="font-display text-2xl font-bold text-foreground">Admin Command Center</h1>
                <p className="text-xs text-muted-foreground">Professional Platform Control</p>
              </div>
            </div>
          </div>

          <div className="hidden md:flex gap-6">
            <div className="text-right">
              <p className="text-[10px] font-bold text-muted-foreground uppercase">System Status</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-bold text-foreground">Operational</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-card/50 border border-border rounded-xl p-1.5 mb-8 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${activeTab === tab.id
                  ? "text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                }`}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="admin-tab"
                  className="absolute inset-0 bg-primary rounded-lg shadow-lg shadow-primary/20"
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
            {activeTab === "analytics" && <AdminAnalytics />}
            {activeTab === "contests" && <ContestCreator />}
            {activeTab === "manage" && <ContestManager />}
            {activeTab === "users" && <UserManagement />}
            {activeTab === "import" && <PlayerImport />}
            {activeTab === "stats" && <MatchStatsInput />}
            {activeTab === "scoring" && <ScoringEngine />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
