import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const PopularCategories = () => {
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [showAll, setShowAll] = useState(false);

    const { data: categories = [] } = useQuery({
        queryKey: ['allCategory'],
        queryFn: async () => {
            const res = await axiosSecure.get('/cats')
            return res.data;
        }
    });

    const displayedCategories = showAll ? categories : categories.slice(0, 6);

    const handleCardClick = (categoryName) => {
        navigate(`/category/${categoryName}`);
    };

    return (
        <section className="max-w-7xl mx-auto px-4 py-12">
            {/* Title */}
            <h2 className="text-3xl font-bold text-center text-secondary md:my-12">
                Popular Categories
            </h2>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedCategories.map((cat) => (
                    <div
                        key={cat._id}
                        onClick={() => handleCardClick(cat.category_name)}
                        className="bg-white shadow-md rounded-xl p-6 text-center hover:bg-primary/15 transition cursor-pointer"
                    >
                        {/* Image in Circle */}
                        <div className="w-28 h-28 flex items-center justify-center mx-auto rounded-full bg-secondary/10 mb-4">
                            <img className="w-16 h-16" src={cat.category_image} alt={cat.category_name} />
                        </div>

                        {/* Category Info */}
                        <h3 className="text-lg font-semibold text-secondary">{cat.category_name}</h3>
                        <p className="text-accent text-sm">{cat.medicine_Qty} medicines</p>
                    </div>
                ))}
            </div>

            {/* View All Button */}
            {!showAll && categories.length > 6 && (
                <div className="text-center mt-8">
                    <button
                        onClick={() => setShowAll(true)}
                        className="px-6 py-2 bg-secondary text-white rounded-md hover:bg-primary/90 transition"
                    >
                        View All Categories
                    </button>
                </div>
            )}
        </section>
    );
};

export default PopularCategories;
