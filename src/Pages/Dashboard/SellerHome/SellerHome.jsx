import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import StatCard from "../../../Components/StatCard/StatCard";
import useAuth from "../../../hooks/useAuth";

const SellerHome = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["sellerRevenue"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/revenue?email=${user.email}`);
            return res.data;
        },
    });

    if (isLoading) return <p className="text-center">Loading...</p>;
    if (isError) return <p className="text-center text-red-500">Error loading revenue data</p>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Seller Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    title="Total Revenue"
                    value={data.totalRevenue}
                    color="text-green-600"
                />
                <StatCard
                    title="Paid Total"
                    value={data.paidTotal}
                    color="text-blue-600"
                />
                <StatCard
                    title="Pending Total"
                    value={data.pendingTotal}
                    color="text-orange-600"
                />
            </div>
        </div>
    );
};

export default SellerHome;
