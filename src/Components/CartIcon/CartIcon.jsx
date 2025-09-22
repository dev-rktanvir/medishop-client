import { FaShoppingCart } from 'react-icons/fa';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';

const CartIcon = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: cartItems = [], isLoading } = useQuery({
        queryKey: ['cartItems', user?.email], // Ensure it updates if user changes
        queryFn: async () => {
            const res = await axiosSecure.get(`/cart?buyer=${user.email}`);
            return res.data;
        },
        enabled: !!user?.email // only fetch if user is logged in
    });

    const itemCount = cartItems.length;

    return (
        <div className="relative">
            <FaShoppingCart className="text-2xl text-primary" />

            {/* Badge */}
            <span className="absolute -top-3 -right-3 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {isLoading ? '...' : itemCount}
            </span>
        </div>
    );
};

export default CartIcon;
