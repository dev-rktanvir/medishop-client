import { FaGlobeAmericas, FaUndo, FaTags, FaHeadset } from 'react-icons/fa';

const features = [
    {
        icon: <FaGlobeAmericas className="text-3xl text-primary" />,
        title: 'Worldwide Shipping',
        text: 'For all Orders Over $100',
    },
    {
        icon: <FaUndo className="text-3xl text-primary" />,
        title: 'Money Back Guarantee',
        text: 'Guarantee Within 30 Days',
    },
    {
        icon: <FaTags className="text-3xl text-primary" />,
        title: 'Offers And Discounts',
        text: 'Back Returns In 7 Days',
    },
    {
        icon: <FaHeadset className="text-3xl text-primary" />,
        title: '24/7 Support Services',
        text: 'Contact us Anytime',
    },
];

const ServiceFeatures = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-10 md:py-20 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 border-2 border-primary rounded-md p-3">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-center gap-4 p-4 bg-white"
                    >
                        {/* Left: Icon */}
                        <div className="shrink-0">
                            {feature.icon}
                        </div>

                        {/* Right: Title + Text */}
                        <div>
                            <h3 className="font-semibold text-secondary text-lg mb-1">
                                {feature.title}
                            </h3>
                            <p className="text-sm text-gray-600">
                                {feature.text}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ServiceFeatures;
