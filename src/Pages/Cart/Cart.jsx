import { AiOutlineClose } from 'react-icons/ai';
import { useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import DesktopCart from './DesktopCart';
import MobileCart from './MobileCart';

const Cart = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    // Get cart items
    const { data: cartItems = [], isLoading } = useQuery({
        queryKey: ['cartItems'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/cart?buyer=${user.email}`);
            return res.data;
        }
    });

    // Show loading while fetching
    if (isLoading) {
        return (
            <div className="max-w-7xl mx-auto p-6 text-center text-gray-600">
                <p className="text-lg font-medium">Loading your cart...</p>
            </div>
        );
    }

    // Calculate total
    const totalPrice = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    // Functions
    const increaseQty = async (id) => {
        await axiosSecure.patch(`/cart/${id}`, { action: 'increase' });
        queryClient.invalidateQueries(['cartItems']);
    };

    const decreaseQty = async (id) => {
        await axiosSecure.patch(`/cart/${id}`, { action: 'decrease' });
        queryClient.invalidateQueries(['cartItems']);
    };

    const removeItem = async (id) => {
        await axiosSecure.delete(`/cart?id=${id}`);
        queryClient.invalidateQueries(['cartItems']);
    };

    const clearCart = async () => {
        await axiosSecure.delete(`/cart?buyer=${user.email}`);
        queryClient.invalidateQueries(['cartItems']);
    };

    const handleCheckout = () => {
        navigate('/checkout');
    };

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">My Cart</h2>

            {cartItems.length === 0 ? (
                <p className="text-center text-gray-600">Your cart is empty.</p>
            ) : (
                <>
                    {/* Desktop Table */}
                    <div className="hidden md:block">
                        <DesktopCart
                            cartItems={cartItems}
                            increaseQty={increaseQty}
                            decreaseQty={decreaseQty}
                            removeItem={removeItem}
                        />
                    </div>

                    {/* Mobile Card */}
                    <div className="md:hidden">
                        <MobileCart
                            cartItems={cartItems}
                            increaseQty={increaseQty}
                            decreaseQty={decreaseQty}
                            removeItem={removeItem}
                        />
                    </div>

                    {/* Summary */}
                    <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4">
                        <button
                            onClick={clearCart}
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        >
                            Clear Cart
                        </button>
                        <div className="text-right">
                            <p className="text-lg font-semibold">Total: ৳ {totalPrice}</p>
                            <button
                                onClick={handleCheckout}
                                className="mt-2 bg-primary text-white px-6 py-2 rounded hover:bg-green-700"
                            >
                                Checkout
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;
