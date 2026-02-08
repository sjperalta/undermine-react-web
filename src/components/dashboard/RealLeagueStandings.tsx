import { motion } from "framer-motion";
import { ListOrdered } from "lucide-react";
import { Link } from "react-router-dom";

export function RealLeagueStandings() {
    const teams = [
        { pos: 1, name: "Liverpool", gp: 24, gd: 28, pts: 54 },
        { pos: 2, name: "Man City", gp: 23, gd: 29, pts: 52 },
        { pos: 3, name: "Arsenal", gp: 24, gd: 31, pts: 52 },
        { pos: 4, name: "Tottenham", gp: 24, gd: 13, pts: 47 },
        { pos: 5, name: "Aston Villa", gp: 24, gd: 18, pts: 46 },
    ];

    return (
        <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-6">
                <div className="p-2 bg-primary/10 rounded-lg">
                    <ListOrdered className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-display font-bold">Premier League</h3>
            </div>

            <div className="space-y-1">
                <div className="flex items-center text-[10px] font-black text-muted-foreground uppercase tracking-widest px-3 mb-2">
                    <span className="w-8">#</span>
                    <span className="flex-1">Club</span>
                    <span className="w-10 text-center">GD</span>
                    <span className="w-10 text-right">PTS</span>
                </div>
                {teams.map((team, i) => (
                    <div
                        key={i}
                        className={`flex items-center p-3 rounded-xl transition-colors hover:bg-muted/30 ${team.pos <= 4 ? 'bg-primary/5' : ''
                            }`}
                    >
                        <span className="w-8 text-xs font-black text-muted-foreground">{team.pos}</span>
                        <span className="flex-1 text-sm font-bold">{team.name}</span>
                        <span className="w-10 text-center text-xs font-medium text-muted-foreground">{team.gd}</span>
                        <span className="w-10 text-right text-sm font-black text-primary">{team.pts}</span>
                    </div>
                ))}
            </div>

            <Link to="/league-table" className="block w-full mt-6 text-center text-[10px] font-bold text-muted-foreground hover:text-primary uppercase tracking-widest transition-colors">
                View Full Table
            </Link>
        </div>
    );
}
