import { motion } from "framer-motion";

const Loading = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
            {/* Capsule Animation */}
            <motion.div
                className="w-16 h-8 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] rounded-full relative overflow-hidden"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            >
                <div className="absolute top-0 left-1/2 w-1/2 h-full bg-[var(--color-accent)] opacity-80"></div>
            </motion.div>

            {/* Loading Text */}
            <motion.p
                className="mt-4 text-[var(--color-secondary)] font-semibold text-lg"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
            >
                Loading...
            </motion.p>
        </div>
    );
};

export default Loading;
