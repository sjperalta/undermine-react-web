import { motion } from "framer-motion";
import { ListFilter, Search, Play, Lock, CheckCircle2, MoreVertical, Edit3, Trash2 } from "lucide-react";
import { useState } from "react";
import { mockContests } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function ContestManager() {
    const [search, setSearch] = useState("");
    const [contests, setContests] = useState(mockContests);

    const stats = {
        draft: contests.filter((c) => c.status === "draft").length,
        open: contests.filter((c) => c.status === "open").length,
        locked: contests.filter((c) => c.status === "locked").length,
        completed: contests.filter((c) => c.status === "completed").length,
    };

    return (
        <div className="space-y-6">
            {/* Overview Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                    { label: "Draft", value: stats.draft, color: "text-muted-foreground" },
                    { label: "Open", value: stats.open, color: "text-primary" },
                    { label: "Live", value: stats.locked, color: "text-live" },
                    { label: "Completed", value: stats.completed, color: "text-muted-foreground" },
                ].map((s) => (
                    <div key={s.label} className="bg-card border border-border rounded-xl p-4">
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">
                            {s.label}
                        </p>
                        <p className={`text-2xl font-display font-black ${s.color}`}>{s.value}</p>
                    </div>
                ))}
            </div>

            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-card border border-border rounded-xl p-4">
                <div className="relative w-full sm:w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search contests..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-muted/50 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                        <ListFilter className="w-4 h-4" />
                        Filter
                    </Button>
                    <Button size="sm" className="gap-2">
                        <Plus className="w-4 h-4" />
                        New Contest
                    </Button>
                </div>
            </div>

            {/* Contest List */}
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-muted/30 border-b border-border">
                                <th className="px-6 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Contest</th>
                                <th className="px-6 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Status</th>
                                <th className="px-6 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Entrants</th>
                                <th className="px-6 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Prize Pool</th>
                                <th className="px-6 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Start Time</th>
                                <th className="px-6 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/50">
                            {contests.map((contest) => (
                                <motion.tr
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    key={contest.id}
                                    className="hover:bg-muted/10 transition-colors group text-sm"
                                >
                                    <td className="px-6 py-4">
                                        <p className="font-bold text-foreground">{contest.title}</p>
                                        <p className="text-[10px] text-muted-foreground uppercase">{contest.matches.length} Matches • ${contest.salaryCap / 1000}k Cap</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <Badge variant="outline" className={`text-[10px] font-bold ${contest.status === 'open' ? 'bg-primary/10 text-primary border-primary/20' :
                                                contest.status === 'locked' ? 'bg-live/10 text-live border-live/20' :
                                                    'bg-muted text-muted-foreground border-border'
                                            }`}>
                                            {contest.status.toUpperCase()}
                                        </Badge>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-1 w-24">
                                            <div className="flex justify-between text-[10px]">
                                                <span className="font-bold">{contest.entrants}</span>
                                                <span className="text-muted-foreground">/ {contest.maxEntrants}</span>
                                            </div>
                                            <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-primary"
                                                    style={{ width: `${(contest.entrants / contest.maxEntrants) * 100}%` }}
                                                />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-display font-bold text-foreground">
                                        {contest.prizePool}
                                    </td>
                                    <td className="px-6 py-4 text-xs text-muted-foreground whitespace-nowrap">
                                        {new Date(contest.startTime).toLocaleDateString()}
                                        <br />
                                        {new Date(contest.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            {contest.status === 'draft' && (
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-primary" title="Open Contest">
                                                    <Play className="w-4 h-4" />
                                                </Button>
                                            )}
                                            {contest.status === 'open' && (
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-live" title="Lock Contest">
                                                    <Lock className="w-4 h-4" />
                                                </Button>
                                            )}
                                            {contest.status === 'locked' && (
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-green-500" title="Finalize Scoring">
                                                    <CheckCircle2 className="w-4 h-4" />
                                                </Button>
                                            )}
                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                <Edit3 className="w-4 h-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-red-500">
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

function Plus(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
        </svg>
    );
}
