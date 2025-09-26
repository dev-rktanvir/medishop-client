import React from 'react';
import AdminHome from '../AdminHome/AdminHome';
import SellerHome from '../SellerHome/SellerHome';
import useAuth from '../../../hooks/useAuth';
import useUserRole from '../../../hooks/useUserRole';
import Loading from '../../../Components/Loading/Loading';
import PaymentHistory from '../PaymentHistory/PaymentHistory';

const DashboardHome = () => {
    const { user, loading } = useAuth();
    const { isAdmin, isSeller, isUser, isLoading } = useUserRole();

    if (loading || isLoading) {
        return <Loading></Loading>
    }
    if (user && isAdmin) {
        return <AdminHome></AdminHome>
    }
    if (user && isSeller) {
        return <SellerHome></SellerHome>
    }
    if (user && isUser) {
        return <PaymentHistory></PaymentHistory>
    }
};

export default DashboardHome;