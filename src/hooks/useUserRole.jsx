import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';

const useUserRole = () => {
    const { user, loading: authLoading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const {
        data: roleData,
        isLoading: roleLoading,
        isError,
    } = useQuery({
        queryKey: ['userRole', user?.email],
        enabled: !!user?.email && !authLoading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/user-role?email=${user.email}`);
            return res.data.role; // { role: 'admin' } expected
        },
    });

    const role = roleData || null;

    return {
        role,
        isAdmin: role === 'admin',
        isSeller: role === 'seller',
        isUser: role === 'user',
        isLoading: authLoading || roleLoading,
        isError,
    };
};

export default useUserRole;
