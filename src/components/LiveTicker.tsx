import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import { mockLiveEvents } from "@/data/mockData";
import { TeamCrest } from "@/components/TeamCrest";

export function LiveTicker() {
    const duplicatedEvents = [...mockLiveEvents, ...mockLiveEvents];

    return (
        <div className="bg-primary/5 border-y border-primary/10 py-2 overflow-hidden whitespace-nowrap">
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-4 border-r border-primary/20 bg-background/50 backdrop-blur-sm z-10 relative">
                    <Zap className="w-3.5 h-3.5 text-primary animate-pulse" />
                    <span className="text-[10px] font-bold text-primary uppercase tracking-tighter">Live Events</span>
                </div>
                <motion.div
                    animate={{ x: [0, -1000] }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="flex gap-8 items-center"
                >
                    {duplicatedEvents.map((event, i) => (
                        <div key={`${event.id}-${i}`} className="flex items-center gap-2">
                            <span className="text-[10px] font-medium text-muted-foreground">{event.match}</span>
                            {event.type === 'GOAL' && (
                                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                                    <TeamCrest teamName={event.team} size="sm" />
                                </div>
                            )}
                            <span className="text-[10px] font-bold text-foreground">
                                {event.player} {event.type === "GOAL" ? "⚽" : event.type === "ASSIST" ? "🅰️" : "🟨"}
                            </span>
                            <span className="text-[10px] text-primary">+{event.points} pts</span>
                            <span className="text-[10px] text-muted-foreground/50">{event.minute}'</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
