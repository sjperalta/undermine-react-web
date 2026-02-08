import { motion } from "framer-motion";
import { Info, CheckCircle2 } from "lucide-react";

export function ScoringRules() {
    const rules = [
        { event: "Goal", points: "+10", detail: "Forwards & Midfielders" },
        { event: "Clean Sheet", points: "+8", detail: "Goalkeepers & Defenders" },
        { event: "Assist", points: "+5", detail: "All positions" },
        { event: "Saves (3)", points: "+3", detail: "Goalkeepers only" },
        { event: "Yellow Card", points: "-2", detail: "All positions" },
    ];

    return (
        <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-6">
                <div className="p-2 bg-primary/10 rounded-lg">
                    <Info className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-display font-bold">Scoring Rules</h3>
            </div>
            <div className="space-y-4">
                {rules.map((rule, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-muted/30 rounded-xl border border-border/50">
                        <div>
                            <p className="text-sm font-bold text-foreground">{rule.event}</p>
                            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{rule.detail}</p>
                        </div>
                        <span className={`text-sm font-black ${rule.points.startsWith('+') ? 'text-primary' : 'text-red-500'}`}>
                            {rule.points}
                        </span>
                    </div>
                ))}
            </div>
            <div className="mt-6 p-4 bg-primary/5 rounded-xl border border-primary/20">
                <div className="flex items-center gap-2 mb-1">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <p className="text-xs font-bold text-primary">Fair Play Guarantee</p>
                </div>
                <p className="text-[10px] text-muted-foreground leading-relaxed">
                    All statistics are verified against official league data providers within 24 hours of match completion.
                </p>
            </div>
        </div>
    );
}
