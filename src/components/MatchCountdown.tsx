import { useEffect, useState } from "react";
import { Timer } from "lucide-react";

interface MatchCountdownProps {
    startTime: string;
}

export function MatchCountdown({ startTime }: MatchCountdownProps) {
    const [timeLeft, setTimeLeft] = useState("");

    useEffect(() => {
        const target = new Date(startTime).getTime();

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = target - now;

            if (distance < 0) {
                setTimeLeft("LIVE");
                clearInterval(interval);
                return;
            }

            const hours = Math.floor(distance / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
        }, 1000);

        return () => clearInterval(interval);
    }, [startTime]);

    return (
        <div className="inline-flex items-center gap-2 bg-secondary/50 border border-secondary/20 rounded-full px-4 py-1.5">
            <Timer className="w-3.5 h-3.5 text-secondary-foreground" />
            <div className="flex flex-col">
                <span className="text-[10px] font-bold text-muted-foreground uppercase leading-none mb-0.5">Next Matchday</span>
                <span className="text-xs font-mono font-bold text-foreground leading-none">{timeLeft}</span>
            </div>
        </div>
    );
}
