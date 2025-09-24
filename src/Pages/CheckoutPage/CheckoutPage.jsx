import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import AddressForm from '../../Components/AddressForm/AddressForm';
import CartItem from '../../Components/CartItem/CartItem';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const CheckoutPage = () => {
    const navigate = useNavigate();
    const addressFormRef = useRef();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure()

    const { data: cartItems = [] } = useQuery({
        queryKey: ['cartItem'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/cart?buyer=${user.email}`)
            return res.data;
        }
    })

    const [deliveryCost, setDeliveryCost] = useState(0);
    const [addressSubmitted, setAddressSubmitted] = useState(false); // Block duplicate
    const [addressData, setAddressData] = useState(null);

    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const grandTotal = totalPrice + deliveryCost;

    const handleAddressSubmit = (data) => {
        setAddressData(data);
        setAddressSubmitted(true);
        placeOrder(data);
    };

    const handleOrderNow = () => {
        if (addressSubmitted) {
            placeOrder(addressData);
        } else {
            addressFormRef.current?.submit();
        }
    };

    const placeOrder = async (shippingData) => {
        if (!shippingData) {
            alert('Shipping details missing.');
            return;
        }

        const newOrder = {
            items: cartItems,
            shipping: shippingData,
            deliveryCharge: deliveryCost,
            totalAmount: grandTotal,
            paymentStatus: 'Pending',
            createdAt: new Date().toISOString(),
        };

        // save order in DB
        const result = await axiosSecure.post('/orders', newOrder)
        if (result.data.insertedId) {
            const orderId = result.data.insertedId
            // Redirect to payment page
            navigate(`/payment/${orderId}`);

            // clear Cart items
            await axiosSecure.delete(`/cart?buyer=${user.email}`)
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-6 my-20 rounded-2xl">
            <h1 className="text-3xl font-bold mb-6">Checkout</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 rounded-2xl border-2 border-primary p-5">
                {/* Left Column - Address Form */}
                <div className='flex flex-col justify-center'>
                    <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>
                    <AddressForm
                        ref={addressFormRef}
                        onSubmit={handleAddressSubmit}
                        onDeliveryCostChange={setDeliveryCost}
                    />
                </div>

                {/* Right Column - Cart Summary */}
                <div className="p-4 rounded shadow">
                    <h2 className="text-xl font-semibold mb-4">Your Products</h2>

                    <div className="space-y-4">
                        {cartItems.map(item => (
                            <CartItem key={item._id} item={item} />
                        ))}

                        <div className="text-right text-lg font-semibold mt-4">
                            Items Total: ${totalPrice.toFixed(2)}
                        </div>
                        <div className="text-right text-lg font-semibold mt-2">
                            Delivery Charge: ${deliveryCost}
                        </div>
                        <div className="text-right text-xl font-bold mt-4">
                            Total Order: ${grandTotal.toFixed(2)}
                        </div>

                        <button
                            onClick={handleOrderNow}
                            className="mt-4 w-full bg-primary text-white py-3 rounded hover:bg-secondary cursor-pointer font-bold transition"
                        >
                            Order Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
