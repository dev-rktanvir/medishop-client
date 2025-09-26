import React from 'react';
import useAuth from '../../hooks/useAuth';
import useUserRole from '../../hooks/useUserRole';
import Loading from '../../Components/Loading/Loading';
import Forbidden from '../../Pages/Forbidden/Forbidden';
import { Navigate } from 'react-router';

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const { isAdmin, isLoading } = useUserRole();

    if (loading || isLoading) {
        return <Loading></Loading>
    }
    if (!user || !isAdmin) {
        return <Navigate to='/forbidden'><Forbidden></Forbidden></Navigate>
    }
    return children;
};

export default AdminRoute;