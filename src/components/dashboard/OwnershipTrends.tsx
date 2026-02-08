import { Users, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { OwnershipTrend } from "@/data/types";

interface OwnershipTrendsProps {
    trends: OwnershipTrend[];
}

export function OwnershipTrends({ trends }: OwnershipTrendsProps) {
    return (
        <div className="bg-muted/20 border border-muted-foreground/10 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
                <Users className="w-4 h-4 text-primary" />
                <h3 className="text-sm font-bold text-foreground uppercase tracking-widest">Ownership Trends</h3>
            </div>

            <div className="space-y-4">
                {trends.map((trend) => (
                    <div key={trend.playerName} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-foreground">{trend.playerName}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="text-right">
                                <span className="text-xs font-bold text-foreground">{trend.percentage}%</span>
                                <p className="text-[8px] text-muted-foreground uppercase leading-none">Owned</p>
                            </div>
                            {trend.change === 'up' ? <TrendingUp className="w-3.5 h-3.5 text-green-500" /> :
                                trend.change === 'down' ? <TrendingDown className="w-3.5 h-3.5 text-red-500" /> :
                                    <Minus className="w-3.5 h-3.5 text-muted-foreground" />}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
