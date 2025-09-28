import React from "react";
import { useQuery } from "@tanstack/react-query";
import Countdown from "react-countdown";
import { HiLightningBolt } from "react-icons/hi";
import useAxiosSecure from "../../hooks/useAxiosSecure";

// Swiper.js v12 imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Link } from "react-router";

// Helper function: 2 days later
const getTwoDaysFromNow = () => {
    const now = new Date();
    now.setDate(now.getDate() + 2);
    return now;
};

// Countdown Custom Renderer
const CountdownRenderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
        return <span className="text-red-500">Expired</span>;
    }

    return (
        <div className="text-sm text-center bg-gray-100 rounded p-2 font-mono">
            <span>{days}d </span>
            <span>{hours}h </span>
            <span>{minutes}m </span>
            <span>{seconds}s</span>
        </div>
    );
};

const DiscountProducts = () => {
    const axiosSecure = useAxiosSecure();

    // Fetch discounted products
    const { data: discountProducts = [], isLoading } = useQuery({
        queryKey: ["discountPrice"],
        queryFn: async () => {
            const res = await axiosSecure.get("/discount");
            return res.data.filter((product) => product.discount > 0);
        },
    });

    if (isLoading) {
        return (
            <section className="my-10 px-4 text-center">
                <p className="text-gray-500">Loading discount products...</p>
            </section>
        );
    }

    if (discountProducts.length === 0) {
        return (
            <section className="my-10 px-4 text-center">
                <p className="text-gray-500">No discount products found.</p>
            </section>
        );
    }

    return (
        <section className="max-w-7xl mx-auto my-10 px-4">
            <h2 className="text-2xl font-bold text-center mb-6">Deal Of The Day</h2>

            <Swiper
                modules={[Pagination, Navigation, Autoplay]}
                slidesPerView={2}
                spaceBetween={15}
                loop={true}
                autoplay={{ delay: 3000 }}
                pagination={{ clickable: true }}
                breakpoints={{
                    0: {
                        slidesPerView: 1,
                        spaceBetween: 10,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 15,
                    },
                }}
                className="rounded"
            >
                {discountProducts.map((product) => (
                    <SwiperSlide key={product._id}>
                        <div className="p-2 flex flex-col md:flex-row bg-white border-2 items-center border-primary shadow rounded mb-15">
                            {/* Left Side */}
                            <div className="w-full md:w-1/2 p-4 flex flex-col gap-4">
                                {/* Discount Badge */}
                                <div className="w-14 bg-red-600 -ml-3 text-white text-xs font-semibold px-2 py-1 rounded shadow flex items-center gap-1">
                                    <HiLightningBolt className="text-yellow-300 text-base" />
                                    {product.discount}%
                                </div>

                                {/* Product Image */}
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="object-cover w-full h-auto max-h-64 rounded"
                                />
                            </div>

                            {/* Right Side */}
                            <div className="w-full md:w-1/2 p-4 flex flex-col justify-center">
                                <h3 className="font-semibold text-lg mb-2">{product.name}</h3>

                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-gray-500 line-through">${product.price}</span>
                                    <span className="text-primary font-bold">
                                        ${product.price - product.discount}
                                    </span>
                                </div>

                                {/* Countdown */}
                                <Countdown date={getTwoDaysFromNow()} renderer={CountdownRenderer} />

                                {/* Add to Cart Button */}
                                <Link to='/shop'>
                                    <button className="mt-4 bg-primary hover:bg-secondary cursor-pointer text-white font-bold text-lg px-4 py-2 rounded w-full">
                                        Buy Now
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default DiscountProducts;
