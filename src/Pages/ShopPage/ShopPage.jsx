import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import ShopTable from "../../Components/ShopTable/ShopTable";

const ShopPage = () => {
    const axiosSecure = useAxiosSecure();
    const { data: allmedicines = [] } = useQuery({
        queryKey: ['shop'],
        queryFn: async () => {
            const res = await axiosSecure.get('/medicine')
            return res.data;
        }
    })

    return (
        <div>
            <ShopTable
                medicines={allmedicines}
                pageTitle={'Medicine Shop'}
            ></ShopTable>
        </div>
    );
};

export default ShopPage;
