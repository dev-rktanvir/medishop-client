import React, { use } from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import { Link } from "react-router";

const sliderPromiss = fetch('http://localhost:5000/all-ads').then(res => res.json());
const SliderBanner = () => {
    const slides = use(sliderPromiss);
    const activeSlides = slides.filter(slide => slide.status === 'active');
    console.log(activeSlides);

    const settings = {
        dots: true,
        infinite: true,
        speed: 600,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        arrows: true,
    };

    return (
        <div className="w-full overflow-hidden shadow-xl">
            <Slider {...settings}>
                {activeSlides.map((slide) => (
                    <div key={slide._id}>
                        <div
                            className="h-[400px] md:h-[600px] flex items-center justify-center bg-cover bg-center relative"
                            style={{ backgroundImage: `url(${slide.image})` }}
                        >
                            <div className="absolute inset-0 bg-black/20 "></div>
                            <div className="bg-primary/40 w-full flex justify-center">
                                <motion.div
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.7 }}
                                    className="relative text-center text-white py-6 px-6 max-w-3xl"
                                >
                                    <h2 className="text-3xl md:text-5xl font-bold mb-4">{slide.medicine_name}</h2>
                                    <p className="text-lg md:text-xl mb-6">{slide.medicine_description}</p>
                                    <Link to='/shop'>
                                        <button className="btn text-white btn-primary">Shop Now</button>
                                    </Link>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default SliderBanner;
