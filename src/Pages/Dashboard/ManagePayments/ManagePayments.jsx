import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAlert from "../../../hooks/useAlert";

const ManagePayment = () => {
    const axiosSecure = useAxiosSecure();
    const showAlert = useAlert();

    const { data: payments = [], isLoading, refetch } = useQuery({
        queryKey: ["payments"],
        queryFn: async () => {
            const res = await axiosSecure.get("/orders");
            return res.data;
        },
    });

    const handlePayment = async (id) => {
        const res = await axiosSecure.put(`/orders/${id}`);
        if (res.data.modifiedCount) {
            showAlert({
                title: "Payment Successful!",
                text: "Payment was completed By Admin!",
                icon: "success",
            });
        }
        refetch();
    };

    if (isLoading) return <p className="text-center">Loading...</p>;

    return (
        <div className="p-6 bg-white rounded-xl shadow-md">
            <h2 className="text-xl font-bold text-secondary mb-6">Manage Payments</h2>

            <div className="overflow-x-auto w-full block">
                <table className="min-w-full whitespace-nowrap text-left border border-gray-200 rounded-lg">
                    <thead className="bg-base-200 text-secondary">
                        <tr>
                            <th className="px-4 py-3">User</th>
                            <th className="px-4 py-3">Email</th>
                            <th className="px-4 py-3">Amount</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3 text-center">Action</th>
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
                                <td className="px-4 py-3 text-center">
                                    {payment.paymentStatus === "pending" ? (
                                        <button
                                            onClick={() => handlePayment(payment._id)}
                                            className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-secondary cursor-pointer"
                                        >
                                            Accept Payment
                                        </button>
                                    ) : (
                                        <span className="text-gray-500">---</span>
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

export default ManagePayment;
