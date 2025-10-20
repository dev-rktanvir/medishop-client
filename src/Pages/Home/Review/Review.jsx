import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const reviews = [
    {
        title: "Fast Delivery",
        text: "Order arrived within 24 hours. Excellent service!",
        image: "https://randomuser.me/api/portraits/women/44.jpg",
        name: "Sara Ahmed",
    },
    {
        title: "Helpful Support",
        text: "Customer support was kind and very responsive.",
        image: "https://randomuser.me/api/portraits/men/46.jpg",
        name: "Omar Zaki",
    },
    {
        title: "Genuine Products",
        text: "I feel safe ordering medicine from here. Trustworthy!",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
        name: "Ali Hussain",
    },
    {
        title: "Super Easy",
        text: "No more pharmacy visits. Everything is online!",
        image: "https://randomuser.me/api/portraits/women/65.jpg",
        name: "Fatima Noor",
    },
];

// Animation variants for sliding
const variants = {
    enter: (direction) => ({
        x: direction > 0 ? 300 : -300,
        opacity: 0,
    }),
    center: {
        x: 0,
        opacity: 1,
        transition: { duration: 0.5 },
    },
    exit: (direction) => ({
        x: direction > 0 ? -300 : 300,
        opacity: 0,
        transition: { duration: 0.5 },
    }),
};

const Review = () => {
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const length = reviews.length;

    const handleNext = () => {
        setDirection(1);
        setIndex((prev) => (prev + 1) % length);
    };

    const handlePrev = () => {
        setDirection(-1);
        setIndex((prev) => (prev - 1 + length) % length);
    };

    // Show 2 cards starting from current index (with wrap-around)
    const visibleReviews = [
        reviews[index],
        reviews[(index + 1) % length],
    ];

    return (
        <section className="bg-gray-100">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="flex gap-10">
                    {/* Left column - 40% */}
                    <div className="flex flex-col justify-center" style={{ flexBasis: "40%" }}>
                        <h2 className="text-3xl sm:text-4xl font-bold text-secondary mb-6">
                            What Our <br /> Clients Say
                        </h2>
                        <div className="flex space-x-4">
                            <button
                                onClick={handlePrev}
                                className="w-10 h-10 rounded-full bg-white shadow hover:bg-gray-200 flex items-center justify-center cursor-pointer"
                                aria-label="Previous reviews"
                            >
                                <FaArrowLeft />
                            </button>
                            <button
                                onClick={handleNext}
                                className="w-10 h-10 rounded-full bg-white shadow hover:bg-gray-200 flex items-center justify-center cursor-pointer"
                                aria-label="Next reviews"
                            >
                                <FaArrowRight />
                            </button>
                        </div>
                    </div>

                    {/* Right column - 60% */}
                    <div
                        className="relative overflow-hidden"
                        style={{ flexBasis: "60%", minHeight: "220px" }}
                    >
                        <AnimatePresence custom={direction} initial={false} mode="wait">
                            <motion.div
                                key={index} // key is the current index to trigger animation
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                className="grid grid-cols-1 sm:grid-cols-2 gap-6 absolute top-0 left-0 w-full"
                            >
                                {visibleReviews.map((review, i) => (
                                    <div
                                        key={i}
                                        className="bg-white shadow-md rounded-xl p-6"
                                        style={{ minWidth: "calc(50% - 0.75rem)" }}
                                    >
                                        <h3 className="text-lg font-semibold text-secondary mb-2">
                                            {review.title}
                                        </h3>
                                        <p className="text-accent text-sm mb-4">{review.text}</p>
                                        <div className="flex items-center space-x-4 mt-4">
                                            <img
                                                src={review.image}
                                                alt={review.name}
                                                className="w-12 h-12 rounded-full object-cover"
                                            />
                                            <span className="font-medium text-secondary">{review.name}</span>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Review;
