import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [search, setSearch] = useState("");
    const [triggerSearch, setTriggerSearch] = useState("");

    const { data: users = [], isFetching } = useQuery({
        queryKey: ["users", triggerSearch],
        enabled: !!triggerSearch,
        queryFn: async () => {
            if (!triggerSearch) return [];
            const res = await axiosSecure.get(`/users?email=${encodeURIComponent(triggerSearch)}`);
            return res.data.slice(0, 10);
        },
    });

    const [updating, setUpdating] = useState(null);

    const mutation = useMutation({
        mutationFn: async ({ id, role }) => {
            setUpdating(id);
            return axiosSecure.patch(`/users/${id}`, { role });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["users", triggerSearch]);
            setUpdating(null);
        },
        onError: () => {
            setUpdating(null);
        },
    });

    const handleRoleChange = (id, newRole) => {
        mutation.mutate({ id, role: newRole });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setTriggerSearch(search.trim());
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Manage Users</h2>

            {/* Search Bar */}
            <form
                onSubmit={handleSearch}
                className="mb-6 flex flex-wrap gap-2"
            >
                <input
                    type="text"
                    placeholder="Search by email..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border px-4 py-2 rounded-md flex-1 min-w-[200px]"
                />
                <button
                    type="submit"
                    className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary"
                >
                    Search
                </button>
            </form>

            {/* Responsive Table */}
            <div className="overflow-x-auto bg-white rounded-xl shadow-md">
                <table className="min-w-full text-left border border-gray-200 rounded-lg">
                    <thead className="bg-base-200 text-secondary">
                        <tr>
                            <th className="px-4 py-3">#</th>
                            <th className="px-4 py-3">Name</th>
                            <th className="px-4 py-3">Email</th>
                            <th className="px-4 py-3">Role</th>
                            <th className="px-4 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!triggerSearch ? (
                            <tr>
                                <td colSpan="5" className="px-4 py-6 text-center text-accent">
                                    Please search by email.
                                </td>
                            </tr>
                        ) : isFetching ? (
                            <tr>
                                <td colSpan="5" className="px-4 py-6 text-center">Loading...</td>
                            </tr>
                        ) : users.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="px-4 py-6 text-center text-accent">
                                    No users found.
                                </td>
                            </tr>
                        ) : (
                            users.map((user, idx) => (
                                <tr key={user._id} className="border-t">
                                    <td className="px-4 py-3">{idx + 1}</td>
                                    <td className="px-4 py-3">{user.name}</td>
                                    <td className="px-4 py-3">{user.email}</td>
                                    <td className="px-4 py-3 capitalize">{user.role}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex flex-wrap gap-2">
                                            {user.role !== "admin" && (
                                                <button
                                                    onClick={() => handleRoleChange(user._id, "admin")}
                                                    disabled={updating === user._id}
                                                    className="px-5 py-2 bg-primary text-white rounded-md font-bold hover:opacity-90 disabled:opacity-50"
                                                >
                                                    Make Admin
                                                </button>
                                            )}

                                            {user.role !== "seller" && (
                                                <button
                                                    onClick={() => handleRoleChange(user._id, "seller")}
                                                    disabled={updating === user._id}
                                                    className="px-5 py-2 bg-secondary text-white rounded-md font-bold hover:opacity-90 disabled:opacity-50"
                                                >
                                                    Make Seller
                                                </button>
                                            )}

                                            {user.role !== "user" && (
                                                <button
                                                    onClick={() => handleRoleChange(user._id, "user")}
                                                    disabled={updating === user._id}
                                                    className="px-5 py-2 bg-red-600 text-white rounded-md font-bold hover:opacity-90 disabled:opacity-50"
                                                >
                                                    Make User
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;
