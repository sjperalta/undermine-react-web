import { TrendingUp } from "lucide-react";
import { mockPlayers } from "@/data/mockData";

export function LiveTopPlayers() {
    const topPlayers = mockPlayers.slice(0, 4); // Just mock top 4

    return (
        <div className="bg-muted/20 border border-muted-foreground/10 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-4 h-4 text-primary" />
                <h3 className="text-sm font-bold text-foreground uppercase tracking-widest">Top Performers (Live)</h3>
            </div>

            <div className="space-y-3">
                {topPlayers.map((player) => (
                    <div key={player.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-background/50 transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-[10px] text-primary">
                                {player.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                                <p className="text-xs font-bold text-foreground">{player.name}</p>
                                <p className="text-[10px] text-muted-foreground">{player.team} • {player.position}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-bold text-primary">{player.points}</p>
                            <p className="text-[9px] text-muted-foreground uppercase">FPTS</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
