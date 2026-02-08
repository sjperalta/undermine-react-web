import { Newspaper, Stethoscope, CheckCircle, Repeat, Bell } from "lucide-react";
import { PlayerNews } from "@/data/types";

interface PlayerNewsFeedProps {
    news: PlayerNews[];
}

export function PlayerNewsFeed({ news }: PlayerNewsFeedProps) {
    const getCategoryIcon = (category: string) => {
        switch (category) {
            case "injury": return Stethoscope;
            case "starting": return CheckCircle;
            case "transfer": return Repeat;
            default: return Bell;
        }
    };

    const getCategoryTheme = (category: string) => {
        switch (category) {
            case "injury": return "text-red-500 bg-red-500/10 border-red-500/20";
            case "starting": return "text-green-500 bg-green-500/10 border-green-500/20";
            case "transfer": return "text-blue-500 bg-blue-500/10 border-blue-500/20";
            default: return "text-primary bg-primary/10 border-primary/20";
        }
    };

    return (
        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
            <div className="bg-muted/30 px-5 py-4 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Newspaper className="w-4 h-4 text-primary" />
                    <h3 className="text-xs font-bold text-foreground uppercase tracking-widest">Player News Feed</h3>
                </div>
                <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-[10px] font-black text-muted-foreground uppercase tracking-wider">Live Feed</span>
                </div>
            </div>

            <div className="divide-y divide-border/50">
                {news.map((item) => {
                    const Icon = getCategoryIcon(item.category);
                    const theme = getCategoryTheme(item.category);
                    const isBreaking = item.time.includes('m') || item.time.includes('now');

                    return (
                        <div key={item.id} className="p-5 hover:bg-muted/20 transition-all group relative overflow-hidden">
                            {isBreaking && (
                                <div className="absolute top-0 right-0">
                                    <div className="bg-primary text-[8px] font-black text-primary-foreground px-2 py-0.5 rounded-bl-lg uppercase tracking-tighter">
                                        Breaking
                                    </div>
                                </div>
                            )}

                            <div className="flex gap-4">
                                <div className={`shrink-0 w-10 h-10 rounded-xl border flex items-center justify-center transition-transform group-hover:scale-110 ${theme}`}>
                                    <Icon className="w-5 h-5" />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-[10px] font-black text-primary uppercase tracking-wider truncate">
                                            {item.playerName}
                                        </span>
                                        <span className="text-[9px] text-muted-foreground font-medium">• {item.time}</span>
                                    </div>
                                    <p className="text-sm font-semibold text-foreground leading-snug group-hover:text-primary transition-colors cursor-pointer line-clamp-2">
                                        {item.headline}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <button className="w-full py-3 text-[10px] font-bold text-muted-foreground hover:text-primary transition-colors border-t border-border bg-muted/5 uppercase tracking-widest">
                Load More Updates
            </button>
        </div>
    );
}
