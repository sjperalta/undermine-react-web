import { Newspaper, Info } from "lucide-react";
import { PlayerNews } from "@/data/types";

interface PlayerNewsFeedProps {
    news: PlayerNews[];
}

export function PlayerNewsFeed({ news }: PlayerNewsFeedProps) {
    return (
        <div className="bg-muted/20 border border-muted-foreground/10 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
                <Newspaper className="w-4 h-4 text-primary" />
                <h3 className="text-sm font-bold text-foreground uppercase tracking-widest">Player News Feed</h3>
            </div>

            <div className="space-y-4">
                {news.map((item) => (
                    <div key={item.id} className="flex gap-3 group">
                        <div className={`mt-0.5 p-1.5 rounded-lg h-fit ${item.category === 'injury' ? 'bg-red-500/10 text-red-500' :
                                item.category === 'starting' ? 'bg-green-500/10 text-green-500' : 'bg-blue-500/10 text-blue-500'
                            }`}>
                            <Info className="w-3.5 h-3.5" />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase leading-none mb-1">{item.playerName} • {item.time}</p>
                            <p className="text-xs font-medium text-foreground group-hover:text-primary transition-colors cursor-pointer">{item.headline}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
