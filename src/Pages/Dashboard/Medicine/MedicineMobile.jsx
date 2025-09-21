import { FaTrash, FaEdit } from "react-icons/fa";

const MedicineMobile = ({ medicines }) => {
    if (!medicines || medicines.length === 0) {
        return <p className="text-accent">No medicines found.</p>;
    }

    return (
        <div className="md:hidden grid gap-4">
            {medicines.map((m) => (
                <div key={m._id} className="bg-base-200 p-4 rounded-xl shadow-sm flex flex-col items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-20 h-20 rounded-full flex items-center justify-center bg-white overflow-hidden border">
                            <img src={m.image} alt={m.name} className="w-16 h-16 object-cover rounded-full" />
                        </div>
                        <div>
                            <h3 className="text-secondary font-semibold">{m.name}</h3>
                            <p className="text-sm text-accent">{m.genericName}</p>
                            <p className="text-xs text-accent">{m.category} • {m.company}</p>
                            <p className="text-sm mt-1 font-medium">${m.price?.toFixed(2)} {m.discount ? <span className="text-xs text-red-600">({m.discount}% off)</span> : null}</p>
                        </div>
                    </div>
                    <div className="ml-6 text-xs text-accent">Unit: {m.massUnit?.toUpperCase()}</div>

                    <div className="flex flex-col items-end gap-3 mt-5">
                        <div className="flex gap-2">
                            <button
                                className="flex gap-3 items-center justify-center px-4 py-2 rounded-lg transition font-medium bg-primary text-white cursor-pointer">
                                <FaEdit /> Edit
                            </button>
                            <button
                                className="flex gap-3 items-center justify-center px-4 py-2 rounded-lg transition font-medium bg-secondary text-white cursor-pointer">
                                <FaTrash /> Delete
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MedicineMobile;
