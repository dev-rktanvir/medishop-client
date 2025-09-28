import { FaEye, FaCartPlus } from "react-icons/fa";
import ShopMobile from "../../Pages/ShopPage/ShopMobile";
import MedicineDetailsModal from "../../Pages/ShopPage/MedicineDetailsModal";
import { useState, useEffect } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAlert from "../../hooks/useAlert";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import Loading from "../Loading/Loading";

const ShopTable = ({
    medicines,
    pageTitle,
    refetch,
    currentPage,
    totalCount,
    itemsPerPage,
    onPageChange,
    isLoading,

    // নতুন props
    searchText,
    onSearchChange,
    sortOrder,
    onSortChange,
}) => {
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const showAlert = useAlert();
    const queryClient = useQueryClient();

    const [selectedMedicine, setSelectedMedicine] = useState(null);
    const totalPages = Math.ceil(totalCount / itemsPerPage);

    // Local state to control search input UI
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

    const handlePrev = () => {
        if (currentPage > 1) onPageChange(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) onPageChange(currentPage + 1);
    };

    // Search input change handler
    const handleSearchChange = (e) => {
        setLocalSearch(e.target.value);
        onSearchChange(e.target.value);
        // Pagination reset (optional)
        onPageChange(1);
    };

    // Sort button click handler
    const toggleSortOrder = () => {
        onSortChange(sortOrder === "price_asc" ? "price_desc" : "price_asc");
        // Pagination reset (optional)
        onPageChange(1);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold text-secondary mb-6">{pageTitle}</h2>

            {/* Search & Sort Controls */}
            <div className="hidden md:flex flex-col md:flex-row md:justify-between mb-4 gap-3">
                <input
                    type="text"
                    placeholder="Search medicine, generic, company..."
                    value={localSearch}
                    onChange={handleSearchChange}
                    className="border rounded px-3 py-2 md:w-1/3"
                />

                <button
                    onClick={toggleSortOrder}
                    className="px-4 py-2 bg-primary text-white rounded hover:bg-secondary"
                >
                    Sort by Price {sortOrder === "price_asc" ? "↑" : "↓"}
                </button>
            </div>

            {isLoading ? (
                <p className="text-center my-10"><Loading /></p>
            ) : (
                <>
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
                                            <button
                                                className="p-2 bg-primary text-white rounded-md hover:bg-secondary cursor-pointer"
                                                onClick={() => setSelectedMedicine(med)}
                                            >
                                                <FaEye />
                                            </button>
                                            <button
                                                className="p-2 bg-primary text-white rounded-md hover:bg-secondary cursor-pointer"
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
                    <ShopMobile
                        medicines={medicines}
                        currentPage={currentPage}
                        totalCount={totalCount}
                        itemsPerPage={itemsPerPage}
                        onPageChange={onPageChange}
                        searchText={searchText}
                        onSearchChange={onSearchChange}
                        sortOrder={sortOrder}
                        onSortChange={onSortChange}
                    />

                    {/* Pagination */}
                    <div className="hidden md:flex justify-center mt-6 gap-3">
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
            )}
        </div>
    );
};

export default ShopTable;
