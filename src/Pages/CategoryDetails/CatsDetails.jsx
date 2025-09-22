import React from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import ShopTable from '../../Components/ShopTable/ShopTable';

const CatsDetails = () => {
    const { name } = useParams();
    const axiosSecure = useAxiosSecure();
    const { data: medicines = [] } = useQuery({
        queryKey: ['category-details'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/medicine/${name}`)
            return res.data;
        }
    })
    return (
        <div>
            <ShopTable
             medicines={medicines}
             pageTitle={'Category Details'}
             ></ShopTable>
        </div>
    );
};

export default CatsDetails;