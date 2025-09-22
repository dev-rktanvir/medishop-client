import React from 'react';
import { Link } from 'react-router';

const FeaturedSection = () => {
    const cards = [
        {
            id: 1,
            title: "Ply Surgical Mask With Filter",
            subtitle: "Fabric Surgical Mask",
            image: "https://demos.codezeel.com/prestashop/PRS22/PRS220545/default/img/cms/sub-banner-1.jpg",
            link: "/shop",
        },
        {
            id: 2,
            title: "Digital Stethoscope For Doctors",
            subtitle: "Smart Care Stethoscopes",
            image: "https://demos.codezeel.com/prestashop/PRS22/PRS220545/default/img/cms/sub-banner-2.jpg",
            link: "/shop",
        },
    ];

    return (
        <section className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {cards.map((card) => (
                <div
                    key={card.id}
                    className="relative h-64 md:h-72 rounded-xl overflow-hidden group"
                >
                    {/* Background Image */}
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                        style={{ backgroundImage: `url(${card.image})` }}
                    ></div>

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/2"></div>

                    {/* Content */}
                    <div className="relative z-10 h-full w-full flex items-center justify-end p-6 text-secondary">
                        <div className="max-w-[65%] text-left">
                            <p className="text-sm md:text-base font-medium uppercase mb-1 opacity-90">
                                {card.subtitle}
                            </p>
                            <h2 className="text-xl lg:text-3xl font-bold mb-4 leading-tight">
                                {card.title}
                            </h2>
                            <Link
                                to={card.link}
                                className="inline-block bg-primary text-white px-4 py-2 rounded-md uppercase text-sm font-semibold hover:bg-secondary transition"
                            >
                                Shop Now
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </section>
    );
};

export default FeaturedSection;
