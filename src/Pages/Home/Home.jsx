import React from 'react';
import SliderBanner from './SliderBanner';
import PopularCategories from './PopularCategories';
import FeaturedSection from './FeaturedSection';

const Home = () => {
    return (
        <div>
            <SliderBanner></SliderBanner>
            <FeaturedSection></FeaturedSection>
            <PopularCategories></PopularCategories>
        </div>
    );
};

export default Home;