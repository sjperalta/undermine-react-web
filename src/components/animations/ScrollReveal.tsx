import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ScrollRevealProps {
    children: ReactNode;
    width?: "fit-content" | "100%";
    className?: string;
    delay?: number;
}

export const ScrollReveal = ({
    children,
    width = "100%",
    className = "",
    delay = 0
}: ScrollRevealProps) => {
    return (
        <div style={{ position: "relative", width, overflow: "hidden" }} className={className}>
            <motion.div
                variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: { opacity: 1, y: 0 },
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                    duration: 0.8,
                    delay: delay,
                    ease: [0.21, 0.47, 0.32, 0.98]
                }}
            >
                {children}
            </motion.div>
        </div>
    );
};
