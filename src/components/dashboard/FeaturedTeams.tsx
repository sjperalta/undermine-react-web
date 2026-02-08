import { TeamCrest } from "@/components/TeamCrest";

export function FeaturedTeams() {
    const teams = [
        "Man City", "Liverpool", "Arsenal", "Chelsea", "Tottenham", "Man Utd"
    ];

    return (
        <div className="max-w-3xl mx-auto px-4 -mt-8 relative z-20">
            <div className="bg-card/40 backdrop-blur-xl border border-border/50 rounded-2xl py-6 relative shadow-2xl shadow-black/40">
                <div className="px-6 mb-4">
                    <h3 className="text-[10px] font-black tracking-[0.2em] text-primary uppercase text-center opacity-80">
                        Featured Clubs
                    </h3>
                </div>

                <div className="flex flex-wrap justify-center gap-x-10 gap-y-4 px-8">
                    {teams.map((team, i) => (
                        <div key={i} className="flex items-center gap-3 group cursor-default">
                            <TeamCrest teamName={team} size="sm" />
                            <span className="text-xs font-display font-bold text-muted-foreground group-hover:text-primary transition-colors whitespace-nowrap">
                                {team}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
