import { TeamCrest } from "@/components/TeamCrest";

export function FeaturedTeams() {
    const teams = [
        "Man City", "Liverpool", "Arsenal", "Chelsea", "Tottenham", "Man Utd"
    ];

    return (
        <div className="mb-8">
            <h3 className="text-sm font-bold text-foreground uppercase tracking-widest mb-4">Participating Clubs</h3>
            <div className="bg-muted/30 border border-muted-foreground/10 rounded-xl p-6">
                <div className="flex flex-wrap justify-between gap-6">
                    {teams.map((team, i) => (
                        <div key={i} className="flex items-center gap-3 group cursor-default">
                            <TeamCrest teamName={team} size="sm" />
                            <div className="hidden sm:block">
                                <p className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">{team}</p>
                                <p className="text-[10px] text-muted-foreground">Premier League</p>
                            </div>
                            <div className="sm:hidden text-xs font-bold text-foreground">{team.substring(0, 3)}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
