import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';

const SellerPayment = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const { data: payments = [], isLoading } = useQuery({
        queryKey: ["payments"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/orders?email=${user.email}`);
            return res.data;
        },
    });
    if (isLoading) return <p className="text-center">Loading...</p>;
    return (
        <div className="p-6 bg-white rounded-xl shadow-md">
            <h2 className="text-xl font-bold text-secondary mb-6">Manage Payments</h2>

            {/* Responsive wrapper: add w-full and block */}
            <div className="overflow-x-auto w-full block">
                {/* Add whitespace-nowrap to prevent wrapping */}
                <table className="min-w-full whitespace-nowrap text-left border border-gray-200 rounded-lg">
                    <thead className="bg-base-200 text-secondary">
                        <tr>
                            <th className="px-4 py-3">User</th>
                            <th className="px-4 py-3">Email</th>
                            <th className="px-4 py-3">Amount</th>
                            <th className="px-4 py-3">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment) => (
                            <tr key={payment._id} className="border-t">
                                <td className="px-4 py-3 font-medium">{payment.buyerName}</td>
                                <td className="px-4 py-3">{payment.buyerEmail}</td>
                                <td className="px-4 py-3">${payment.totalAmount?.toFixed(2)}</td>
                                <td className="px-4 py-3">
                                    {payment.paymentStatus === "paid" ? (
                                        <span className="text-green-600 font-medium">Paid</span>
                                    ) : (
                                        <span className="text-yellow-600 font-medium">Pending</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SellerPayment;
