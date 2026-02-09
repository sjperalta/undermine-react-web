import { motion, AnimatePresence } from "framer-motion";
import { UserLineup } from "@/data/types";
import { Trophy, Users, Timer, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface LineupCardProps {
    lineup: UserLineup;
    index: number;
}

export function LineupCard({ lineup, index }: LineupCardProps) {
    const navigate = useNavigate();

    const getStatusColor = (status: UserLineup["status"]) => {
        switch (status) {
            case "live": return "text-red-500 bg-red-500/10";
            case "upcoming": return "text-blue-500 bg-blue-500/10";
            case "completed": return "text-green-500 bg-green-500/10";
            default: return "text-muted-foreground bg-muted";
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl transition-all group cursor-pointer"
            onClick={() => navigate(`/contest/${lineup.contestId}`)}
        >
            <div className="p-5">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter flex items-center gap-1 w-fit ${getStatusColor(lineup.status)}`}>
                            {lineup.status === 'live' && <span className="w-1 h-1 rounded-full bg-red-500 animate-pulse" />}
                            {lineup.status === 'live' ? 'LIVE' : lineup.status}
                        </span>
                        <h3 className="text-lg font-display font-bold text-foreground mt-2 group-hover:text-primary transition-colors">
                            {lineup.contestTitle}
                        </h3>
                    </div>
                    <div className="text-right">
                        <AnimatePresence mode="wait">
                            <motion.p
                                key={lineup.points}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-2xl font-display font-black text-foreground leading-none"
                            >
                                {lineup.points.toFixed(1)}
                            </motion.p>
                        </AnimatePresence>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase">Points</p>
                    </div>
                </div>

                <div className="flex items-center gap-3 mb-6">
                    <div className="flex -space-x-2">
                        {lineup.players.slice(0, 3).map((player) => (
                            <div
                                key={player.id}
                                className="w-8 h-8 rounded-full border-2 border-card bg-muted flex items-center justify-center text-[10px] font-bold text-muted-foreground"
                            >
                                {player.name[0]}
                            </div>
                        ))}
                        {lineup.players.length > 3 && (
                            <div className="w-8 h-8 rounded-full border-2 border-card bg-muted flex items-center justify-center text-[10px] font-bold text-muted-foreground">
                                +{lineup.players.length - 3}
                            </div>
                        )}
                    </div>
                    <span className="text-xs text-muted-foreground font-medium">
                        {lineup.players.length} Players Selected
                    </span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center gap-4">
                        {lineup.rank && (
                            <div className="flex items-center gap-1.5">
                                <Trophy className="w-3.5 h-3.5 text-yellow-500" />
                                <span className="text-xs font-bold text-foreground">#{lineup.rank}</span>
                            </div>
                        )}
                        <div className="flex items-center gap-1.5">
                            <Timer className="w-3.5 h-3.5 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">Ends in 4h</span>
                        </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                </div>
            </div>
        </motion.div>
    );
}
