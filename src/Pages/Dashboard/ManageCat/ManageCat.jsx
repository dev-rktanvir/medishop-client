import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from '@tanstack/react-query';
import AddCategoryModal from "./AddCategoryModal";
import UpdateCategoryModal from "./UpdateCategoryModal";
import Swal from "sweetalert2";

const ManageCat = () => {
    const axiosSecure = useAxiosSecure();
    const { data: categories = [], refetch } = useQuery({
        queryKey: ['allCats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/cats')
            return res.data
        }
    })

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "This action will permanently delete the category.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#0a9a73',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            background: '#f2f6f7',
            color: '#071c1f'
        }).then(async (result) => {
            if (result.isConfirmed) {
                // Call delete API here...
                const res = await axiosSecure.delete(`/cats/${id}`)
                if (res.data.deletedCount) {
                    Swal.fire({
                        title: 'Deleted!',
                        text: 'The category has been successfully deleted.',
                        icon: 'success',
                        confirmButtonText: 'OK',
                        background: '#f2f6f7',
                        color: '#071c1f',
                        confirmButtonColor: '#0a9a73',
                        timer: 1500
                    });
                    refetch();
                }
            }
        });

    }

    refetch();
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
                                    <button
                                        onClick={() => {
                                            setSelectedCategory(cat);
                                            setIsUpdateModalOpen(true);
                                        }}
                                        className="flex gap-3 items-center justify-center px-4 py-2 rounded-lg transition font-medium bg-primary text-white cursor-pointer">
                                        <FaEdit /> Edit
                                    </button>
                                    <button
                                        onClick={() => { handleDelete(cat._id) }}
                                        className="flex gap-3 items-center justify-center px-4 py-2 rounded-lg transition font-medium bg-secondary text-white cursor-pointer">
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
            {isUpdateModalOpen && (
                <UpdateCategoryModal
                    category={selectedCategory}
                    onClose={() => setIsUpdateModalOpen(false)}
                />
            )}
        </div>
    );
};

export default ManageCat;
