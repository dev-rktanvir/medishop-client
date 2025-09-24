import { FaEye, FaCartPlus } from "react-icons/fa";
import ShopMobile from "../../Pages/ShopPage/ShopMobile";
import MedicineDetailsModal from "../../Pages/ShopPage/MedicineDetailsModal";
import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAlert from "../../hooks/useAlert";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";

const ShopTable = ({ medicines, pageTitle }) => {
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const showAlert = useAlert();
    const [selectedMedicine, setSelectedMedicine] = useState(null);
    const queryClient = useQueryClient();

    const handleAddToCart = async (medicine) => {
        if (!user) {
            return navigate('/login');
        }

        const cartItem = {
            name: medicine.name,
            company: medicine.company,
            price: medicine.price,
            quantity: 1,
            buyer: user.email,
            image: medicine.image,
            seller: medicine.sellerEmail,
        };

        const res = await axiosSecure.post('/cart', cartItem);

        if (res.data.insertedId) {
            showAlert({
                title: "Added to Cart!",
                text: `${medicine.name} has been added to your cart successfully.`,
                icon: "success",
            });
            queryClient.invalidateQueries(['cartItems', user.email]);
        }

        if (res.data.modifiedCount) {
            showAlert({
                title: "Cart Updated!",
                text: `${medicine.name} is already in your cart. Quantity has been updated.`,
                icon: "success",
            });
            queryClient.invalidateQueries(['cartItems', user.email]);
        }
    };
    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold text-secondary mb-6">{pageTitle}</h2>

            {/* Table */}
            <div className="hidden md:block overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-base-200 text-secondary">
                            <th className="px-6 py-3">Image</th>
                            <th className="px-6 py-3">Name</th>
                            <th className="px-6 py-3">Generic</th>
                            <th className="px-6 py-3">Category</th>
                            <th className="px-6 py-3">Company</th>
                            <th className="px-6 py-3">Price</th>
                            <th className="px-6 py-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {medicines.map((med) => (
                            <tr key={med._id} className="border-t hover:bg-base-200">
                                <td className="px-6 py-3">
                                    <img
                                        src={med.image}
                                        alt={med.name}
                                        className="w-12 h-12 md:h-16 md:w-16 object-contain"
                                    />
                                </td>
                                <td className="px-6 py-3">{med.name}</td>
                                <td className="px-6 py-3">{med.genericName}</td>
                                <td className="px-6 py-3">{med.category}</td>
                                <td className="px-6 py-3">{med.company}</td>
                                <td className="px-6 py-3">${med.price}</td>
                                <td className="px-6 py-3 flex justify-center gap-3 mt-3">
                                    {/* Eye Button */}
                                    <button
                                        className="p-2 bg-primary text-white rounded-md hover:bg-secondary cursor-pointer"
                                        onClick={() => setSelectedMedicine(med)}
                                    >
                                        <FaEye />
                                    </button>

                                    {/* Select Button */}
                                    <button
                                        className="p-2 bg-green-600 text-white rounded-md hover:bg-green-700 cursor-pointer"
                                        onClick={() => handleAddToCart(med)}
                                    >
                                        <FaCartPlus />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile View */}
            <ShopMobile medicines={medicines}></ShopMobile>

            {/* Medicine Details Modal */}
            {selectedMedicine && (
                <MedicineDetailsModal
                    medicine={selectedMedicine}
                    onClose={() => setSelectedMedicine(null)}
                />
            )}
        </div>
    );
};

export default ShopTable;
