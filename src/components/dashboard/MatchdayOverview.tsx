import { RealMatch } from "@/data/types";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { TeamCrest } from "@/components/TeamCrest";

interface MatchdayOverviewProps {
    matches: RealMatch[];
}

export function MatchdayOverview({ matches }: MatchdayOverviewProps) {
    return (
        <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-foreground uppercase tracking-widest">Matchday Overview</h3>
                <Link to="/matches" className="text-xs text-primary font-medium cursor-pointer hover:underline">View All Matches</Link>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                {matches.map((match) => (
                    <div
                        key={match.id}
                        className="flex-shrink-0 w-64 bg-card border border-border rounded-xl p-4 hover:shadow-lg transition-all border-l-4 border-l-primary"
                    >
                        <div className="flex justify-between items-center mb-3">
                            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${match.status === 'live' ? 'bg-red-500/10 text-red-500 animate-pulse' : 'bg-muted text-muted-foreground'
                                }`}>
                                {match.status === 'live' ? '• LIVE' : format(new Date(match.startTime), 'HH:mm')}
                            </span>
                            <span className="text-[9px] text-muted-foreground font-medium uppercase tracking-tighter">Premier League</span>
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex flex-col items-center gap-1">
                                    <TeamCrest crestId={match.homeCrest} teamName={match.homeTeam} size="sm" />
                                    <span className="text-[10px] font-bold text-foreground">{match.homeTeam.substring(0, 3)}</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    {match.status === "live" ? (
                                        <span className="text-xl font-display font-black text-primary animate-pulse">{match.score?.home}-{match.score?.away}</span>
                                    ) : (
                                        <span className="text-xs font-bold text-muted-foreground uppercase">{format(new Date(match.startTime), "HH:mm")}</span>
                                    )}
                                </div>
                                <div className="flex flex-col items-center gap-1">
                                    <TeamCrest crestId={match.awayCrest} teamName={match.awayTeam} size="sm" />
                                    <span className="text-[10px] font-bold text-foreground">{match.awayTeam.substring(0, 3)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
