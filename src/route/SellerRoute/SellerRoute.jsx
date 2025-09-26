import React from 'react';
import useAuth from '../../hooks/useAuth';
import useUserRole from '../../hooks/useUserRole';
import Loading from '../../Components/Loading/Loading';
import { Navigate } from 'react-router';
import Forbidden from '../../Pages/Forbidden/Forbidden';

const SellerRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const { isSeller, isLoading } = useUserRole();

    if (loading || isLoading) {
        return <Loading></Loading>
    }
    if (!user || !isSeller) {
        return <Navigate to='/forbidden'><Forbidden></Forbidden></Navigate>
    }
    return children;
};

export default SellerRoute;