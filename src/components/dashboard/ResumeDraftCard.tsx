import { motion } from "framer-motion";
import { ArrowRight, PencilLine } from "lucide-react";
import { Contest } from "@/data/types";
import { useNavigate } from "react-router-dom";

interface ResumeDraftCardProps {
    contest: Contest;
}

export function ResumeDraftCard({ contest }: ResumeDraftCardProps) {
    const navigate = useNavigate();

    const handleResume = () => {
        navigate(`/contest/${contest.id}/build`);
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={handleResume}
            className="relative overflow-hidden bg-primary/10 border border-primary/20 rounded-2xl p-6 mb-8 group cursor-pointer"
        >
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <PencilLine className="w-24 h-24 text-primary" />
            </div>

            <div className="relative flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                    <div className="inline-flex items-center gap-2 bg-primary/20 text-primary-foreground rounded-full px-3 py-1 mb-3">
                        <span className="text-[10px] font-bold uppercase tracking-widest">Incomplete Lineup</span>
                    </div>
                    <h3 className="text-xl font-display font-bold text-foreground mb-1">{contest.title}</h3>
                    <p className="text-muted-foreground text-sm">
                        You haven't finished your squad for this contest. Don't miss out on the <strong>{contest.prizePool}</strong> prize!
                    </p>
                </div>

                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        handleResume();
                    }}
                    className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-bold hover:shadow-[0_0_20px_rgba(var(--primary),0.4)] transition-all"
                >
                    Resume Drafting
                    <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </motion.div>
    );
}
