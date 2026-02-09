import { createContext, useContext, useState, ReactNode, useCallback } from "react";
import { LiveEvent } from "@/data/types";
import { toast } from "sonner";

interface PlayerScore {
    points: number;
    goals: number;
    assists: number;
    shots: number;
    passes: number;
    yellows: number;
    saves: number;
}

interface ScoringContextType {
    liveScores: Record<string, PlayerScore>;
    liveEvents: LiveEvent[];
    addEvent: (event: Omit<LiveEvent, "id">) => void;
    resetSimulation: () => void;
}

const ScoringContext = createContext<ScoringContextType | undefined>(undefined);

export function ScoringProvider({ children }: { children: ReactNode }) {
    const [liveScores, setLiveScores] = useState<Record<string, PlayerScore>>({});
    const [liveEvents, setLiveEvents] = useState<LiveEvent[]>([]);

    const addEvent = useCallback((eventData: Omit<LiveEvent, "id">) => {
        const newEvent: LiveEvent = {
            ...eventData,
            id: Math.random().toString(36).substring(2, 9),
        };

        setLiveEvents((prev) => [newEvent, ...prev]);

        // Update player scores
        setLiveScores((prev) => {
            const current = prev[eventData.player] || { points: 0, goals: 0, assists: 0, shots: 0, passes: 0, tackles: 0, yellows: 0, saves: 0 };
            const updated = { ...current, points: current.points + eventData.points };

            switch (eventData.type) {
                case "GOAL": updated.goals++; break;
                case "ASSIST": updated.assists++; break;
                case "YELLOW_CARD": updated.yellows++; break;
                case "SAVE": updated.saves++; break;
                case "PENALTY": updated.points -= 2; break; // Penalty logic
                default: break;
            }

            return { ...prev, [eventData.player]: updated };
        });

        // Toast for major events
        if (["GOAL", "RED_CARD", "YELLOW_CARD"].includes(eventData.type)) {
            toast(`${eventData.type} - ${eventData.player}`, {
                description: `${eventData.team} • ${eventData.minute}'`,
                icon: eventData.type === "GOAL" ? "⚽" : "🟨",
            });
        }

    }, []);

    const resetSimulation = useCallback(() => {
        setLiveScores({});
        setLiveEvents([]);
        toast.info("Simulation reset");
    }, []);

    return (
        <ScoringContext.Provider value={{ liveScores, liveEvents, addEvent, resetSimulation }}>
            {children}
        </ScoringContext.Provider>
    );
}

export function useScoring() {
    const context = useContext(ScoringContext);
    if (context === undefined) {
        throw new Error("useScoring must be used within a ScoringProvider");
    }
    return context;
}
