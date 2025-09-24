import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';

const PaymentHistory = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const { data: paymentHistory = [], isLoading } = useQuery({
        queryKey: ["payments"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/orders?buyer=${user.email}`);
            return res.data;
        },
    });
    if (isLoading) return <p className="text-center">Loading...</p>;
    return (
        <div className="p-6 bg-white rounded-xl shadow-md">
            <h2 className="text-xl font-bold text-secondary mb-6">Manage Payments</h2>

            <div className="overflow-x-auto">
                <table className="min-w-full text-left border border-gray-200 rounded-lg">
                    <thead className="bg-base-200 text-secondary">
                        <tr>
                            <th className="px-4 py-3">Medicine</th>
                            <th className="px-4 py-3">Transaction Id</th>
                            <th className="px-4 py-3">Amount</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paymentHistory.map((payment) => (
                            <tr key={payment._id} className="border-t">
                                <td className="px-4 py-3 font-medium">{payment.items.map(d => d.name)}</td>
                                <td className="px-4 py-3">{payment.transId}</td>
                                <td className="px-4 py-3">${payment.totalAmount?.toFixed(2)}</td>
                                <td className="px-4 py-3">
                                    {payment.paymentStatus === "paid" ? (
                                        <span className="text-green-600 font-medium">Paid</span>
                                    ) : (
                                        <span className="text-yellow-600 font-medium">Pending</span>
                                    )}
                                </td>
                                <td className="px-4 py-3">
                                    {payment.paidAt ? new Date(payment.paidAt).toLocaleString() : 'N/A'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;