import { useEffect, useState } from "react";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import AddMedicineModal from "./AddMedicineModal";

const Medicine = () => {

    const [isAddOpen, setIsAddOpen] = useState(false);


    return (
        <div className="p-6 bg-white rounded-xl shadow-md">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-secondary">Manage Medicines</h2>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setIsAddOpen(true)}
                        className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:opacity-95 cursor-pointer"
                    >
                        <FaPlus /> Add Medicine
                    </button>
                </div>
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full text-left border border-gray-200 rounded-lg">
                    <thead className="bg-base-200 text-secondary">
                        <tr>
                            <th className="px-4 py-3">Image</th>
                            <th className="px-4 py-3">Name</th>
                            <th className="px-4 py-3">Generic</th>
                            <th className="px-4 py-3">Category</th>
                            <th className="px-4 py-3">Company</th>
                            <th className="px-4 py-3">Mass</th>
                            <th className="px-4 py-3">Price</th>
                            <th className="px-4 py-3">Discount</th>
                            <th className="px-4 py-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {medicines.map((med) => (
                            <tr key={med.id} className="border-t">
                                <td className="px-4 py-3">
                                    <img src={med.image} alt={med.name} className="w-14 h-14 object-cover rounded-md" />
                                </td>
                                <td className="px-4 py-3 font-medium">{med.name}</td>
                                <td className="px-4 py-3 text-sm text-accent">{med.genericName}</td>
                                <td className="px-4 py-3">{med.category}</td>
                                <td className="px-4 py-3">{med.company}</td>
                                <td className="px-4 py-3">{med.massUnit?.toUpperCase()}</td>
                                <td className="px-4 py-3">${med.price?.toFixed(2)}</td>
                                <td className="px-4 py-3">{med.discount ?? 0}%</td>
                                <td className="px-4 py-3 text-center">
                                    <div className="flex items-center justify-center gap-3">
                                        <button
                                            onClick={() => {
                                                setSelected(med);
                                                // TODO: open edit modal if implemented
                                            }}
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            <FaEdit />
                                        </button>
                                        <button onClick={() => handleDelete(med.id)} className="text-red-600 hover:text-red-800">
                                            <FaTrash />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile cards */}


            {/* Add Modal */}
            {isAddOpen && (
                <AddMedicineModal
                    onClose={() => setIsAddOpen(false)}
                />
            )}
        </div>
    );
};

export default Medicine;
