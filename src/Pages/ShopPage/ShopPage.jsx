import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import ShopTable from "../../Components/ShopTable/ShopTable";

const ShopPage = () => {
    const axiosSecure = useAxiosSecure();
    const [page, setPage] = useState(1);
    const limit = 5;

    // নতুন state: searchText এবং sortOrder
    const [searchText, setSearchText] = useState("");
    const [sortOrder, setSortOrder] = useState("price_asc");

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['shop', page, searchText, sortOrder],
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/medicine?page=${page}&limit=${limit}&search=${searchText}&sort=${sortOrder}`
            );
            return res.data;
        },
        keepPreviousData: true,
    });

    return (
        <div>
            <ShopTable
                medicines={data?.data || []}
                pageTitle="Medicine Shop"
                refetch={refetch}
                currentPage={page}
                totalCount={data?.total || 0}
                itemsPerPage={limit}
                onPageChange={setPage}
                isLoading={isLoading}

                // নতুন props: search ও sort এর জন্য
                searchText={searchText}
                onSearchChange={setSearchText}
                sortOrder={sortOrder}
                onSortChange={setSortOrder}
            />
        </div>
    );
};

export default ShopPage;
