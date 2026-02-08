import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2, ShieldAlert } from "lucide-react";

export function LineupHealth() {
    const alerts = [
        { team: "Man City", player: "Kevin De Bruyne", status: "Out", type: "injury" },
        { team: "Arsenal", player: "Bukayo Saka", status: "Doubtful", type: "doubt" },
    ];

    return (
        <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-red-500/10 rounded-lg">
                        <ShieldAlert className="w-5 h-5 text-red-500" />
                    </div>
                    <h3 className="text-lg font-display font-bold">Lineup Health</h3>
                </div>
                <span className="text-[10px] font-black bg-red-500/10 text-red-500 px-2 py-0.5 rounded-full">2 ALERTS</span>
            </div>

            <div className="space-y-3">
                {alerts.map((alert, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 bg-muted/20 border border-border rounded-xl">
                        <div className={`w-2 h-12 rounded-full ${alert.type === 'injury' ? 'bg-red-500' : 'bg-yellow-500'}`} />
                        <div className="flex-1">
                            <p className="text-sm font-bold text-foreground">{alert.player}</p>
                            <p className="text-xs text-muted-foreground">{alert.team} • {alert.status}</p>
                        </div>
                        <AlertCircle className={`w-5 h-5 ${alert.type === 'injury' ? 'text-red-500' : 'text-yellow-500'}`} />
                    </div>
                ))}
            </div>

            <button className="w-full mt-6 py-3 bg-muted hover:bg-muted/80 text-muted-foreground text-xs font-bold rounded-xl transition-colors uppercase tracking-widest">
                Review My Squads
            </button>
        </div>
    );
}
