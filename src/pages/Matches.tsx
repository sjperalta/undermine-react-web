import { motion } from "framer-motion";
import { format } from "date-fns";
import { mockRealMatches } from "@/data/mockData";
import { RealMatch } from "@/data/types";
import { ArrowLeft, Calendar, Trophy } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Matches() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen pt-24 pb-20 bg-background text-foreground">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <button
                    onClick={() => navigate("/")}
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm font-medium">Back to Dashboard</span>
                </button>

                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
                    <div>
                        <h1 className="font-display text-4xl font-bold mb-2">Matchday Schedule</h1>
                        <p className="text-muted-foreground">Stay up to date with real-world soccer matches and live scores.</p>
                    </div>
                    <div className="flex items-center gap-4 bg-muted/30 px-6 py-3 rounded-2xl border border-border">
                        <Calendar className="w-5 h-5 text-primary" />
                        <div className="text-right">
                            <p className="text-[10px] font-bold text-muted-foreground uppercase leading-none mb-1">Current Matchday</p>
                            <p className="text-sm font-bold">{format(new Date(), 'MMMM dd, yyyy')}</p>
                        </div>
                    </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {mockRealMatches.map((match, i) => (
                        <MatchCard key={match.id} match={match} index={i} />
                    ))}
                </div>
            </div>
        </div>
    );
}

function MatchCard({ match, index }: { match: RealMatch; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-card border border-border rounded-2xl p-6 hover:shadow-xl transition-all hover:border-primary/50 group"
        >
            <div className="flex justify-between items-center mb-6">
                <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${match.status === 'live' ? 'bg-red-500/10 text-red-500 animate-pulse' : 'bg-muted text-muted-foreground'
                    }`}>
                    {match.status === 'live' ? '• LIVE' : 'SCHEDULED'}
                </span>
                <Trophy className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>

            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-foreground">{match.homeTeam}</span>
                    {match.status === 'live' && (
                        <span className="text-2xl font-display font-black text-primary">{match.score?.home}</span>
                    )}
                </div>
                <div className="flex items-center gap-4 py-2">
                    <div className="h-px flex-1 bg-border" />
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">VS</span>
                    <div className="h-px flex-1 bg-border" />
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-foreground">{match.awayTeam}</span>
                    {match.status === 'live' && (
                        <span className="text-2xl font-display font-black text-primary">{match.score?.away}</span>
                    )}
                </div>
            </div>

            <div className="mt-8 pt-4 border-t border-border flex justify-between items-center">
                <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase leading-none mb-1">Kickoff</span>
                    <span className="text-xs font-medium text-foreground">{format(new Date(match.startTime), 'HH:mm')} local</span>
                </div>
                <button className="text-[10px] font-bold text-primary hover:underline uppercase tracking-wider">Match Details</button>
            </div>
        </motion.div>
    );
}
