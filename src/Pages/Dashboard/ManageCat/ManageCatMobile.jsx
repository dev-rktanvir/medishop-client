import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import AddCategoryModal from "./AddCategoryModal";
import UpdateCategoryModal from "./UpdateCategoryModal";

const ManageCatMobile = ({ categories, handleDelete, refetch }) => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    refetch();
    return (
        <div className="md:hidden grid gap-4">
            {categories.map((cat) => (
                <div
                    key={cat._id}
                    className="bg-white p-4 rounded-lg shadow flex items-center justify-between"
                >
                    <div className="flex items-center gap-4">
                        <img
                            src={cat.category_image}
                            alt={cat.category_name}
                            className="w-16 h-16 object-cover rounded-md"
                        />
                        <div>
                            <h3 className="font-bold text-secondary">{cat.category_name}</h3>
                            <p className="text-sm text-accent">
                                Quantity: {cat.medicine_Qty}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
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
                    </div>
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
            ))}
        </div>
    );
};

export default ManageCatMobile;
