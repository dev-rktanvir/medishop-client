import { useState, useEffect } from "react";
import { FaCartPlus, FaEye } from "react-icons/fa";
import MedicineDetailsModal from "./MedicineDetailsModal";
import useAuth from "../../hooks/useAuth";
import useAlert from "../../hooks/useAlert";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router";

const ShopMobile = ({
    medicines,
    currentPage,
    totalCount,
    itemsPerPage,
    onPageChange,

    // নতুন props
    searchText,
    onSearchChange,
    sortOrder,
    onSortChange,
}) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const showAlert = useAlert();
    const [selectedMedicine, setSelectedMedicine] = useState(null);

    const totalPages = Math.ceil(totalCount / itemsPerPage);

    // Local state for search input UI
    const [localSearch, setLocalSearch] = useState(searchText);

    useEffect(() => {
        setLocalSearch(searchText);
    }, [searchText]);

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
        };
        const res = await axiosSecure.post("/cart", cartItem);
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
    };

    const handlePrev = () => {
        if (currentPage > 1) onPageChange(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) onPageChange(currentPage + 1);
    };

    // Search input handler
    const handleSearchChange = (e) => {
        setLocalSearch(e.target.value);
        onSearchChange(e.target.value);
        onPageChange(1); // reset page
    };

    // Sort toggle handler
    const toggleSortOrder = () => {
        onSortChange(sortOrder === "price_asc" ? "price_desc" : "price_asc");
        onPageChange(1); // reset page
    };

    if (!medicines || medicines.length === 0) {
        return <p className="text-accent">No medicines found.</p>;
    }

    return (
        <>
            {/* Search and Sort UI for Mobile */}
            <div className="md:hidden flex flex-col gap-3 mb-4">
                <input
                    type="text"
                    placeholder="Search medicine, generic, company..."
                    value={localSearch}
                    onChange={handleSearchChange}
                    className="border rounded px-3 py-2 w-full"
                />
                <button
                    onClick={toggleSortOrder}
                    className="px-4 py-2 bg-primary text-white rounded hover:bg-secondary"
                >
                    Sort by Price {sortOrder === "price_asc" ? "↑" : "↓"}
                </button>
            </div>

            {/* Medicine list */}
            <div className="md:hidden grid gap-4">
                {medicines.map((m) => (
                    <div
                        key={m._id}
                        className="bg-base-200 p-4 rounded-xl shadow-sm flex items-center justify-between"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-20 h-20 rounded-full flex items-center justify-center bg-white overflow-hidden border">
                                <img
                                    src={m.image}
                                    alt={m.name}
                                    className="w-16 h-16 object-cover rounded-full"
                                />
                            </div>
                            <div>
                                <h3 className="text-secondary font-semibold">{m.name}</h3>
                                <p className="text-sm text-accent">{m.genericName}</p>
                                <p className="text-xs text-accent">
                                    {m.category} • {m.company}
                                </p>
                                <p className="text-sm mt-1 font-medium">
                                    ${m.price?.toFixed(2)}{" "}
                                    {m.discount ? (
                                        <span className="text-xs text-red-600">
                                            ({m.discount}% off)
                                        </span>
                                    ) : null}
                                </p>
                                <div className="text-xs text-accent">
                                    Unit: {m.massUnit?.toUpperCase()}
                                </div>
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
            </div>

            {/* Pagination Buttons */}
            <div className="md:hidden flex justify-center mt-6 gap-3">
                <button
                    onClick={handlePrev}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 cursor-pointer"
                >
                    Previous
                </button>

                <span className="px-4 py-2">
                    Page {currentPage} / {totalPages}
                </span>

                <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 cursor-pointer"
                >
                    Next
                </button>
            </div>

            {/* Medicine Details Modal */}
            {selectedMedicine && (
                <MedicineDetailsModal
                    medicine={selectedMedicine}
                    onClose={() => setSelectedMedicine(null)}
                />
            )}
        </>
    );
};

export default ShopMobile;
