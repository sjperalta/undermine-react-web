import { Crown, Trophy, Medal } from "lucide-react";
import { mockLeaderboard } from "@/data/mockData";
import { Link } from "react-router-dom";

export function LeaderboardTeaser() {
    const top3 = mockLeaderboard.slice(0, 3);
    const icons = [Crown, Trophy, Medal];
    const colors = ["text-yellow-500", "text-slate-400", "text-amber-600"];

    return (
        <div className="bg-muted/20 border border-muted-foreground/10 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-foreground uppercase tracking-widest">Top Contenders</h3>
                <Link to="/leaderboard" className="text-[10px] text-primary font-bold cursor-pointer hover:underline">Full Standings</Link>
            </div>

            <div className="space-y-3">
                {top3.map((entry, i) => {
                    const Icon = icons[i];
                    return (
                        <div key={entry.username} className="flex items-center justify-between p-2 rounded-xl bg-background/40 hover:bg-background transition-all">
                            <div className="flex items-center gap-3">
                                <div className={`p-1.5 rounded-lg bg-background/50 ${colors[i]}`}>
                                    <Icon className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-foreground">{entry.username}</p>
                                    <p className="text-[10px] text-muted-foreground">{entry.points} pts</p>
                                </div>
                            </div>
                            <span className="text-[10px] font-black text-muted-foreground/30">#0{i + 1}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
