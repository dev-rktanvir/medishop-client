import { useState } from "react";
import { FaTrash, FaEdit, FaCartPlus, FaEye } from "react-icons/fa";
import MedicineDetailsModal from "./MedicineDetailsModal";
import useAuth from "../../hooks/useAuth";
import useAlert from "../../hooks/useAlert";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ShopMobile = ({ medicines }) => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
    const showAlert = useAlert();
    const [selectedMedicine, setSelectedMedicine] = useState(null);
    const handleAddToCart = async (medicine) => {
        const cartItem = {
            name: medicine.name,
            company: medicine.company,
            price: medicine.price,
            quantity: 1,
            buyer: user.email
        }
        const res = await axiosSecure.post('/cart', cartItem)
        if (res.data.insertedId) {
            showAlert({
                title: "Added to Cart!",
                text: `${medicine.name} has been added to your cart successfully.`,
                icon: "success",
            });
        }
        if (res.data.modifiedCount) {
            showAlert({
                title: "Cart Updated!",
                text: `${medicine.name} is already in your cart. Quantity has been updated.`,
                icon: "success",
            });
        }
    }

    if (!medicines || medicines.length === 0) {
        return <p className="text-accent">No medicines found.</p>;
    }

    return (
        <div className="md:hidden grid gap-4">
            {medicines.map((m) => (
                <div key={m._id} className="bg-base-200 p-4 rounded-xl shadow-sm flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-20 h-20 rounded-full flex items-center justify-center bg-white overflow-hidden border">
                            <img src={m.image} alt={m.name} className="w-16 h-16 object-cover rounded-full" />
                        </div>
                        <div>
                            <h3 className="text-secondary font-semibold">{m.name}</h3>
                            <p className="text-sm text-accent">{m.genericName}</p>
                            <p className="text-xs text-accent">{m.category} • {m.company}</p>
                            <p className="text-sm mt-1 font-medium">
                                ${m.price?.toFixed(2)}{" "}
                                {m.discount ? (
                                    <span className="text-xs text-red-600">({m.discount}% off)</span>
                                ) : null}
                            </p>
                            <div className="text-xs text-accent">Unit: {m.massUnit?.toUpperCase()}</div>
                        </div>
                    </div>


                    <div className="flex items-end gap-3 mt-5">
                        <div className="flex gap-2 flex-col">
                            {/* Eye Button */}
                            <button
                                className="p-2 bg-primary text-white rounded-md hover:bg-secondary cursor-pointer"
                                onClick={() => setSelectedMedicine(m)}
                            >
                                <FaEye />
                            </button>

                            {/* Select Button */}
                            <button
                                className="p-2 bg-green-600 text-white rounded-md hover:bg-green-700 cursor-pointer"
                                onClick={() => handleAddToCart(m)}
                            >
                                <FaCartPlus />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
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

export default ShopMobile;
