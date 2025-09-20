import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from '@tanstack/react-query';
import AddCategoryModal from "./AddCategoryModal";

const ManageCat = () => {
    const axiosSecure = useAxiosSecure();
    const { data: categories = [] } = useQuery({
        queryKey: ['allCats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/cats')
            return res.data
        }
    })

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-secondary">
                    Manage Categories
                </h2>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="bg-primary text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-emerald-700"
                >
                   + Add Category
                </button>
            </div>

            {/* Desktop View */}
            <div className="hidden md:block overflow-x-auto">
                <table className="w-full border border-gray-200 text-left">
                    <thead className="bg-base-200">
                        <tr>
                            <th className="p-3">Image</th>
                            <th className="p-3">Name</th>
                            <th className="p-3">Quantity</th>
                            <th className="p-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((cat) => (
                            <tr key={cat._id} className="border-t">
                                <td className="p-3">
                                    <img
                                        src={cat.category_image}
                                        alt={cat.category_name}
                                        className="w-14 h-14 object-cover rounded-md"
                                    />
                                </td>
                                <td className="p-3 font-medium">{cat.category_name}</td>
                                <td className="p-3 text-sm text-gray-600">{cat.medicine_Qty}</td>
                                <td className="flex gap-3 p-3">
                                    <button className="flex gap-3 items-center justify-center px-4 py-2 rounded-lg transition font-medium bg-primary text-white cursor-pointer">
                                        <FaEdit /> Edit
                                    </button>
                                    <button className="flex gap-3 items-center justify-center px-4 py-2 rounded-lg transition font-medium bg-secondary text-white cursor-pointer">
                                        <FaTrash /> Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile View */}


            {/* Modal */}
            {isAddModalOpen && (
                <AddCategoryModal
                    onClose={() => setIsAddModalOpen(false)}
                />
            )}
        </div>
    );
};

export default ManageCat;
