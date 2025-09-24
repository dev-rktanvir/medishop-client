import { useParams } from 'react-router';
import OrderSummary from '../../Components/OrderSummary/OrderSummary';
import CartItem from '../../Components/CartItem/CartItem';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const PaymentPage = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure()

    const { data: order = null } = useQuery({
        queryKey: ['order', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/orders/${id}`)
            return res.data;
        }
    })

    if (!order) {
        return <div className="p-6">Loading...</div>;
    }

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Payment</h1>
            <div className="border-2 border-primary rounded-2xl grid grid-cols-1 lg:grid-cols-2 gap-16 p-5">
                {/* Left column: Order summary */}
                <div>
                    <OrderSummary order={order} />
                </div>

                {/* Right column: Cart items + payment button */}
                <div className="p-4 rounded shadow space-y-4">
                    <h2 className="text-xl font-semibold mb-4">Your Cart</h2>

                    <div className="space-y-4">
                        {order.items.map(item => (
                            <CartItem key={item._id} item={item} />
                        ))}
                    </div>

                    {/* Payment button area */}
                    <div className="mt-6">
                        <button
                            className="w-full bg-primary text-white py-3 font-bold cursor-pointer rounded hover:bg-secondary transition"
                            onClick={() => {
                                //    add payment
                            }}
                        >
                            Pay Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;
