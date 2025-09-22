import React from 'react';
import SliderBanner from './SliderBanner';
import PopularCategories from './PopularCategories';
import FeaturedSection from './FeaturedSection';
import DiscountProducts from './DiscountProducts';

const Home = () => {
    return (
        <div>
            <SliderBanner></SliderBanner>
            <FeaturedSection></FeaturedSection>
            <PopularCategories></PopularCategories>
            <DiscountProducts></DiscountProducts>
        </div>
    );
};

export default Home;