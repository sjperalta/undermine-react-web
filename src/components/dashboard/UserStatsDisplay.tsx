import { Trophy, Target, Activity } from "lucide-react";
import { UserStats } from "@/data/types";

interface UserStatsDisplayProps {
    stats: UserStats;
}

export function UserStatsDisplay({ stats }: UserStatsDisplayProps) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <StatItem
                label="Global Rank"
                value={`#${stats.rank.toLocaleString()}`}
                icon={Trophy}
                color="text-yellow-500"
            />
            <StatItem
                label="Total Points"
                value={stats.totalPoints.toLocaleString()}
                icon={Target}
                color="text-blue-500"
            />
            <StatItem
                label="Active Contests"
                value={stats.activeContests.toString()}
                icon={Activity}
                color="text-green-500"
            />
            <StatItem
                label="Points This Week"
                value={`+${stats.pointsThisWeek}`}
                icon={Trophy}
                color="text-primary"
            />
        </div>
    );
}

function StatItem({ label, value, icon: Icon, color }: { label: string; value: string; icon: any; color: string }) {
    return (
        <div className="bg-muted/30 border border-muted-foreground/10 rounded-xl p-4 flex items-center gap-4 hover:bg-muted/50 transition-colors cursor-default">
            <div className={`p-2 rounded-lg bg-background shadow-sm ${color}`}>
                <Icon className="w-5 h-5" />
            </div>
            <div>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{label}</p>
                <p className="text-lg font-display font-bold text-foreground">{value}</p>
            </div>
        </div>
    );
}
