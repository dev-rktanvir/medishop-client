import { useQuery } from '@tanstack/react-query';
import { AiFillStar } from 'react-icons/ai';
import useAxiosSecure from '../../hooks/useAxiosSecure'; // adjust path as needed
import { Link } from 'react-router';

const LatestProducts = () => {
    const axiosSecure = useAxiosSecure();

    const { data: products = [], isLoading } = useQuery({
        queryKey: ['latestProducts'],
        queryFn: async () => {
            const res = await axiosSecure.get('/lat-product');
            return res.data;
        },
    });

    if (isLoading) {
        return <p className="text-center text-secondary py-20">Loading latest products...</p>;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary text-center mb-10 lg:mb-16">
                Latest Products
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product) => {
                    return (
                        <div
                            key={product._id}
                            className="rounded-lg shadow-md overflow-hidden hover:shadow-lg transition bg-white flex flex-col"
                        >
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-48 object-cover"
                            />

                            <div className="p-4 flex flex-col flex-1">
                                {/* Product Name */}
                                <h3 className="font-semibold text-secondary text-lg mb-1">
                                    {product.name}
                                </h3>

                                {/* Review Stars */}
                                <div className="flex items-center mb-2 text-yellow-500 text-sm">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <AiFillStar key={i} className="text-yellow-400" />
                                    ))}
                                </div>

                                {/* Price */}
                                <div className="text-primary font-bold text-lg mb-4">
                                    ${product.price}
                                </div>

                                {/* Shop Now Button */}
                                <Link to='/shop'>
                                    <button
                                        className="inline-block bg-primary text-white px-4 py-2 rounded-md uppercase text-sm font-semibold hover:bg-secondary transition cursor-pointer"
                                    >
                                        Shop Now
                                    </button>
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default LatestProducts;
