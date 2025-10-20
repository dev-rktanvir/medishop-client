import React from 'react';
import SliderBanner from './SliderBanner';
import PopularCategories from './PopularCategories';
import FeaturedSection from './FeaturedSection';
import DiscountProducts from './DiscountProducts';
import CareSection from './CareSection';
import useAuth from '../../hooks/useAuth';
import Loading from '../../Components/Loading/Loading';
import LatestProducts from './LatestProducts';
import ServiceFeatures from './ServiceFeatures/ServiceFeatures';
import Review from './Review/Review';

const Home = () => {
    const { loading } = useAuth();
    if (loading) {
        return <Loading></Loading>
    }
    return (
        <div>
            <SliderBanner></SliderBanner>
            <FeaturedSection></FeaturedSection>
            <PopularCategories></PopularCategories>
            <LatestProducts></LatestProducts>
            <CareSection></CareSection>
            <DiscountProducts></DiscountProducts>
            <Review></Review>
            <ServiceFeatures></ServiceFeatures>

        </div>
    );
};

export default Home;