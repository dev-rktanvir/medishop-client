import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import useAlert from '../../hooks/useAlert';
import { useNavigate } from 'react-router';

const StripeForm = ({ order }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const showAlert = useAlert();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const amount = order.totalAmount;
    const amountInCents = amount * 100;

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setError(error.message);
        } else {
            setError('');
            const res = await axiosSecure.post('/create-payment-intent', {
                amount: amountInCents
            })
            const clientSecret = res.data.clientSecret;

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: user.displayName,
                        email: user.email
                    },
                },
            });
            if (result.paymentIntent.status === "succeeded") {
                showAlert({
                    title: "Payment Successful!",
                    text: "Your payment was completed successfully. Thank you!",
                    icon: "success",
                });
                navigate('/shop');
            }
            else setError(result.error.message);
        }
    };

    return (
        <div className=" bg-white rounded-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="p-3 border border-gray-300 rounded focus-within:ring-2 focus-within:ring-primary transition">
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#32325d',
                                    '::placeholder': {
                                        color: '#a0aec0',
                                    },
                                },
                                invalid: {
                                    color: '#fa755a',
                                    iconColor: '#fa755a',
                                },
                            },
                        }}
                    />
                </div>
                {error && <p className='text-red-600 font-semibold'>{error}</p>}

                <button
                    type="submit"
                    className="w-full bg-primary text-white py-3 font-bold rounded hover:bg-secondary transition cursor-pointer duration-200"
                    disabled={!stripe}
                >
                    Pay ${amount}
                </button>
            </form>
        </div>
    );
};

export default StripeForm;
