import { FaTimes } from "react-icons/fa";

const MedicineDetailsModal = ({ medicine, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 px-4">
            <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 relative overflow-y-auto max-h-[90vh]">
                {/* Close Button */}
                <button
                    className="absolute top-4 right-4 cursor-pointer text-gray-600 hover:text-red-600"
                    onClick={onClose}
                >
                    <FaTimes size={20} />
                </button>

                {/* Image */}
                <div className="flex justify-center mb-4">
                    <img
                        src={medicine.image}
                        alt={medicine.name}
                        className="w-full max-w-xs h-52 object-cover rounded"
                    />
                </div>

                {/* Info */}
                <h3 className="text-2xl font-bold text-secondary mb-2">{medicine.name}</h3>
                <p className="text-accent mb-2">
                    <span className="font-semibold">Generic:</span> {medicine.genericName}
                </p>
                <p className="text-accent mb-2">
                    <span className="font-semibold">Category:</span> {medicine.category}
                </p>
                <p className="text-accent mb-2">
                    <span className="font-semibold">Company:</span> {medicine.company}
                </p>
                <p className="text-accent mb-2">
                    <span className="font-semibold">Unit:</span> {medicine.massUnit}
                </p>
                <p className="text-accent mb-2">
                    <span className="font-semibold">Price:</span> ${medicine.price}
                </p>
                <p className="text-accent mb-4">
                    <span className="font-semibold">Discount:</span> {medicine.discount}%
                </p>
                <p className="text-gray-700">{medicine.description}</p>
            </div>
        </div>
    );
};

export default MedicineDetailsModal;
