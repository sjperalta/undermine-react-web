import { motion } from "framer-motion";
import { ArrowLeft, Trophy, ListOrdered } from "lucide-react";
import { Link } from "react-router-dom";
import { mockLeagueTable } from "@/data/mockData";
import { TeamCrest } from "@/components/TeamCrest";

export default function LeagueTable() {
    return (
        <div className="min-h-screen pt-24 pb-20 bg-background">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                {/* Back Link */}
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Dashboard
                </Link>

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-primary/10 rounded-lg">
                                <Trophy className="w-6 h-6 text-primary" />
                            </div>
                            <h1 className="font-display text-4xl font-bold text-foreground">Premier League</h1>
                        </div>
                        <p className="text-muted-foreground">Season 2023/24 Standings & Statistics</p>
                    </div>
                    <div className="flex items-center gap-3 bg-muted/30 px-4 py-2 rounded-xl border border-border/50">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        <span className="text-xs font-bold text-foreground">LIVE UPDATES ACTIVE</span>
                    </div>
                </div>

                {/* Table Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-card border border-border rounded-3xl overflow-hidden shadow-xl shadow-black/20"
                >
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-muted/50 border-b border-border">
                                    <th className="px-6 py-4 text-left text-[10px] font-black text-muted-foreground uppercase tracking-widest w-16">#</th>
                                    <th className="px-6 py-4 text-left text-[10px] font-black text-muted-foreground uppercase tracking-widest">Club</th>
                                    <th className="px-4 py-4 text-center text-[10px] font-black text-muted-foreground uppercase tracking-widest w-12">GP</th>
                                    <th className="px-4 py-4 text-center text-[10px] font-black text-muted-foreground uppercase tracking-widest w-12 text-primary/60">W</th>
                                    <th className="px-4 py-4 text-center text-[10px] font-black text-muted-foreground uppercase tracking-widest w-12">D</th>
                                    <th className="px-4 py-4 text-center text-[10px] font-black text-muted-foreground uppercase tracking-widest w-12 text-red-500/60">L</th>
                                    <th className="px-4 py-4 text-center text-[10px] font-black text-muted-foreground uppercase tracking-widest w-16">GD</th>
                                    <th className="px-6 py-4 text-right text-[10px] font-black text-muted-foreground uppercase tracking-widest w-24">Points</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/50">
                                {mockLeagueTable.map((team) => (
                                    <tr
                                        key={team.pos}
                                        className={`group hover:bg-muted/30 transition-colors ${team.pos <= 4 ? 'bg-primary/5' : ''
                                            }`}
                                    >
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-2">
                                                <span className={`text-sm font-black ${team.pos <= 4 ? 'text-primary' : 'text-muted-foreground'
                                                    }`}>{team.pos}</span>
                                                {team.pos <= 4 && <div className="w-1 h-3 rounded-full bg-primary" />}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-4">
                                                <TeamCrest teamName={team.name} size="sm" />
                                                <div>
                                                    <p className="text-sm font-bold text-foreground leading-none mb-1">{team.name}</p>
                                                    <div className="flex items-center gap-2">
                                                        {team.pos <= 4 ? (
                                                            <span className="text-[8px] font-black text-primary px-1 bg-primary/10 rounded uppercase">Champions League</span>
                                                        ) : team.pos === 5 ? (
                                                            <span className="text-[8px] font-black text-blue-500 px-1 bg-blue-500/10 rounded uppercase">Europa League</span>
                                                        ) : null}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-5 text-center text-sm font-medium text-muted-foreground">{team.gp}</td>
                                        <td className="px-4 py-5 text-center text-sm font-bold text-foreground">{team.w}</td>
                                        <td className="px-4 py-5 text-center text-sm font-medium text-muted-foreground">{team.d}</td>
                                        <td className="px-4 py-5 text-center text-sm font-medium text-muted-foreground">{team.l}</td>
                                        <td className="px-4 py-5 text-center">
                                            <span className={`text-xs font-bold ${team.gd >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                                {team.gd > 0 ? `+${team.gd}` : team.gd}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <span className="text-lg font-black text-primary">{team.pts}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>

                {/* Footer info */}
                <div className="mt-8 grid sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-muted/20 rounded-2xl border border-border text-xs text-muted-foreground">
                        <h4 className="font-bold text-foreground mb-2">Qualification Rules</h4>
                        <div className="space-y-1">
                            <p>• Top 4: UEFA Champions League</p>
                            <p>• 5th Place: UEFA Europa League</p>
                        </div>
                    </div>
                    <div className="p-4 bg-muted/20 rounded-2xl border border-border text-xs text-muted-foreground flex items-center justify-center text-center">
                        <p>Positions are based on points, then goal difference, then goals scored.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
