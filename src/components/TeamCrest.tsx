import { Shield } from "lucide-react";

interface teamCrestProps {
    crestId?: string;
    teamName: string;
    size?: "sm" | "md" | "lg";
}

export function TeamCrest({ crestId, teamName, size = "md" }: teamCrestProps) {
    const sizeClasses = {
        sm: "w-6 h-6",
        md: "w-10 h-10",
        lg: "w-16 h-16",
    };

    // For now, since we're using mock data, we'll use colored initials as fallbacks
    // In a real app, this would be src={crestId}

    const getInitialColor = (name: string) => {
        const brandColors: Record<string, string> = {
            "Man City": "bg-sky-400",
            "Liverpool": "bg-red-700",
            "Arsenal": "bg-red-600",
            "Chelsea": "bg-blue-700",
            "Tottenham": "bg-slate-300",
            "Man Utd": "bg-red-800",
            "Real Madrid": "bg-slate-50",
            "PSG": "bg-blue-900",
            "Bayern": "bg-red-600",
            "Barcelona": "bg-blue-800",
        };

        if (brandColors[name]) return brandColors[name];

        const colors = [
            "bg-red-500", "bg-blue-500", "bg-yellow-500",
            "bg-green-500", "bg-purple-500", "bg-orange-500"
        ];
        let hash = 0;
        for (let i = 0; i < name.length; i++) {
            hash = name.charCodeAt(i) + ((hash << 5) - hash);
        }
        return colors[Math.abs(hash) % colors.length];
    };

    return (
        <div className={`${sizeClasses[size]} rounded-full flex items-center justify-center border-2 border-background/20 relative group overflow-hidden`}>
            <div className={`absolute inset-0 ${getInitialColor(teamName)} opacity-20`} />
            <span className="text-[10px] font-black tracking-tighter uppercase relative z-10">
                {teamName.substring(0, 3)}
            </span>
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
            <Shield className="absolute -bottom-1 -right-1 w-3 h-3 text-white/40 z-20" />
        </div>
    );
}
