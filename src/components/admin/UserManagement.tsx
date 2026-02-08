import { motion } from "framer-motion";
import { Search, UserPlus, MoreVertical, Mail, Shield, Ban, Activity } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Mock users for simulation
const mockUsers = [
    { id: "u1", name: "Sergio Peralta", email: "sergio@example.com", status: "active", rank: 1, points: 24500, lineups: 12 },
    { id: "u2", name: "Alex Johnson", email: "alex@example.com", status: "active", rank: 45, points: 18200, lineups: 8 },
    { id: "u3", name: "Maria Garcia", email: "maria@example.com", status: "flagged", rank: 124, points: 15400, lineups: 5 },
    { id: "u4", name: "James Smith", email: "james@example.com", status: "active", rank: 890, points: 9200, lineups: 3 },
    { id: "u5", name: "Linda Chen", email: "linda@example.com", status: "inactive", rank: 0, points: 0, lineups: 0 },
];

export function UserManagement() {
    const [search, setSearch] = useState("");

    return (
        <div className="space-y-6">
            {/* Search & Bulk Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-card border border-border rounded-xl p-4">
                <div className="relative w-full sm:w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-muted/50 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                </div>
                <Button size="sm" className="gap-2">
                    <UserPlus className="w-4 h-4" />
                    Add Internal User
                </Button>
            </div>

            {/* User Table */}
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-muted/30 border-b border-border">
                                <th className="px-6 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest">User</th>
                                <th className="px-6 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Status</th>
                                <th className="px-6 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Activity</th>
                                <th className="px-6 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Rank/Points</th>
                                <th className="px-6 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/50">
                            {mockUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-muted/10 transition-colors group text-sm">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-[10px] font-bold text-primary">
                                                {user.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div>
                                                <p className="font-bold text-foreground">{user.name}</p>
                                                <p className="text-[10px] text-muted-foreground lowercase flex items-center gap-1">
                                                    <Mail className="w-3 h-3" /> {user.email}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <Badge variant="outline" className={`text-[10px] font-bold ${user.status === 'active' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                                                user.status === 'flagged' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                                                    'bg-muted text-muted-foreground border-border'
                                            }`}>
                                            {user.status.toUpperCase()}
                                        </Badge>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                            <Activity className="w-3.5 h-3.5 text-primary" />
                                            <span>{user.lineups} lineups joined</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="font-display font-black text-foreground">#{user.rank}</p>
                                        <p className="text-[10px] text-muted-foreground uppercase font-bold">{user.points.toLocaleString()} PTS</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-primary">
                                                <Shield className="w-4 h-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-yellow-500">
                                                <Ban className="w-4 h-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                <MoreVertical className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
