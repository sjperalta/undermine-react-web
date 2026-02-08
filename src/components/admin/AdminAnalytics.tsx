import { motion } from "framer-motion";
import { TrendingUp, Users, Zap, AlertCircle, Clock, CheckCircle, Smartphone } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function AdminAnalytics() {
    const metrics = [
        { label: "Total Users", value: "3,412", change: "+12%", icon: Users, color: "text-blue-500" },
        { label: "Active Contests", value: "14", change: "Stable", icon: Zap, color: "text-yellow-500" },
        { label: "Completion Rate", value: "88%", change: "+4%", icon: TrendingUp, color: "text-green-500" },
        { label: "Mobile Users", value: "62%", change: "+8%", icon: Smartphone, color: "text-purple-500" },
    ];

    return (
        <div className="space-y-6">
            {/* Top Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {metrics.map((m, i) => (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        key={m.label}
                        className="bg-card border border-border rounded-xl p-5"
                    >
                        <div className="flex items-start justify-between mb-3">
                            <div className={`p-2 rounded-lg bg-muted/50 ${m.color}`}>
                                <m.icon className="w-5 h-5" />
                            </div>
                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded bg-muted/50 ${m.change.startsWith('+') ? 'text-green-500' : 'text-muted-foreground'
                                }`}>
                                {m.change}
                            </span>
                        </div>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{m.label}</p>
                        <p className="text-2xl font-display font-black text-foreground">{m.value}</p>
                    </motion.div>
                ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                {/* System Health */}
                <div className="bg-card border border-border rounded-2xl p-6">
                    <h3 className="text-sm font-bold text-foreground uppercase tracking-widest mb-6 flex items-center gap-2">
                        <Activity className="w-4 h-4 text-primary" />
                        System Health
                    </h3>
                    <div className="space-y-4">
                        {[
                            { label: "Scoring Engine", status: "Operational", sub: "Last run 4m ago", icon: CheckCircle, color: "text-green-500" },
                            { label: "Data Import API", status: "Operational", sub: "Syncing every 1h", icon: CheckCircle, color: "text-green-500" },
                            { label: "Auth Service", status: "Latent", sub: "340ms average response", icon: Clock, color: "text-yellow-500" },
                            { label: "Database", status: "Operational", sub: "4% usage", icon: CheckCircle, color: "text-green-500" },
                        ].map((item) => (
                            <div key={item.label} className="flex items-center justify-between p-3 bg-muted/20 border border-border rounded-xl">
                                <div className="flex items-center gap-3">
                                    <item.icon className={`w-4 h-4 ${item.color}`} />
                                    <div>
                                        <p className="text-sm font-bold text-foreground">{item.label}</p>
                                        <p className="text-[10px] text-muted-foreground">{item.sub}</p>
                                    </div>
                                </div>
                                <Badge variant="outline" className={`text-[10px] font-bold ${item.color.replace('text', 'bg').replace('500', '500/10') + " " + item.color + " border-current/20"
                                    }`}>
                                    {item.status.toUpperCase()}
                                </Badge>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Critical Alerts */}
                <div className="bg-card border border-border rounded-2xl p-6">
                    <h3 className="text-sm font-bold text-foreground uppercase tracking-widest mb-6 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-red-500" />
                        Recent Admin Actions
                    </h3>
                    <div className="space-y-4">
                        {[
                            { text: "Scoring completed for Premier League WK24", time: "10m ago", user: "Admin (Sergio)" },
                            { text: "New contest 'Champions League Final' created", time: "2h ago", user: "Admin (Sergio)" },
                            { text: "User James Smith flagged for multi-accounting", time: "5h ago", user: "System" },
                            { text: "Player stats imported for 20 matches", time: "1d ago", user: "System" },
                        ].map((log, i) => (
                            <div key={i} className="flex gap-3 text-xs border-l-2 border-primary/20 pl-4 py-1">
                                <div className="flex-1">
                                    <p className="text-foreground font-medium">{log.text}</p>
                                    <p className="text-[10px] text-muted-foreground mt-1">{log.user} • {log.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function Activity(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
    );
}
