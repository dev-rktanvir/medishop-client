import React from 'react';
import SliderBanner from './SliderBanner';
import PopularCategories from './PopularCategories';
import FeaturedSection from './FeaturedSection';
import DiscountProducts from './DiscountProducts';
import CareSection from './CareSection';

const Home = () => {
    return (
        <div>
            <SliderBanner></SliderBanner>
            <FeaturedSection></FeaturedSection>
            <PopularCategories></PopularCategories>
            <CareSection></CareSection>
            <DiscountProducts></DiscountProducts>
        </div>
    );
};

export default Home;