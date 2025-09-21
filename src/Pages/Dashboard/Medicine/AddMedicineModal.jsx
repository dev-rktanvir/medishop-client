import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { FaTimes } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useHandleImg from "../../../hooks/useHandleImg";
import useAlert from "../../../hooks/useAlert";


const AddMedicineModal = ({ onClose }) => {
    const axiosSecure = useAxiosSecure();
    const showAlert = useAlert();
    const { handleImageChange, preview, uploadedUrl, loading, resetImage } = useHandleImg();

    const { register, handleSubmit, reset } = useForm();
    const { data: categories = [] } = useQuery({
        queryKey: ['category'],
        queryFn: async () => {
            const res = await axiosSecure.get('/cats')
            return res.data;
        }
    })
    const companies = [
        { "id": 1, "name": "Pfizer" },
        { "id": 2, "name": "Johnson & Johnson" },
        { "id": 3, "name": "Roche" },
        { "id": 4, "name": "Novartis" },
        { "id": 5, "name": "Merck & Co." },
        { "id": 6, "name": "Sanofi" },
        { "id": 7, "name": "GlaxoSmithKline (GSK)" },
        { "id": 8, "name": "AbbVie" },
        { "id": 9, "name": "Bayer" },
        { "id": 10, "name": "AstraZeneca" },
        { "id": 11, "name": "Eli Lilly and Company" },
        { "id": 12, "name": "Amgen" },
        { "id": 13, "name": "Bristol Myers Squibb" },
        { "id": 14, "name": "Takeda Pharmaceutical" },
        { "id": 15, "name": "Sun Pharmaceutical" }
    ]

    const submitForm = async (data) => {
        const newMedicine = {
            name: data.name,
            genericName: data.genericName,
            shortDescription: data.shortDescription,
            category: data.category,
            company: data.company,
            massUnit: data.massUnit,
            price: parseFloat(data.price),
            discount: parseFloat(data.discount || 0),
            image: uploadedUrl
        };

        // save Data in DB
        const res = await axiosSecure.post('/medicine', newMedicine)
        console.log(res)
        if (res.data.insertedId) {
            showAlert({
                title: "Medicine Added!",
                text: "The medicine has been successfully saved to the database.",
                icon: "success",
            });
            resetImage();
        }
        reset();
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-xl p-6 w-full max-w-2xl relative">
                <button className="absolute top-4 right-4 text-accent" onClick={onClose}>
                    <FaTimes />
                </button>

                <h3 className="text-xl font-bold mb-4 text-secondary">Add New Medicine</h3>

                <form onSubmit={handleSubmit(submitForm)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="col-span-1 md:col-span-2">
                        <label className="block text-sm font-medium mb-1">Item Name</label>
                        <input
                            {...register("name", { required: true })}
                            className="w-full border px-3 py-2 rounded-md focus:ring focus:ring-primary"
                            placeholder="Enter item name"
                            required
                        />
                    </div>

                    {/* Generic */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Generic Name</label>
                        <input
                            {...register("genericName", { required: true })}
                            className="w-full border px-3 py-2 rounded-md"
                            placeholder="e.g. Paracetamol"
                            required
                        />
                    </div>

                    {/* Short description */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Short Description</label>
                        <input
                            {...register("shortDescription", { required: true })}
                            className="w-full border px-3 py-2 rounded-md"
                            placeholder="Short description"
                            required
                        />
                    </div>

                    {/* Image: Upload */}
                    <div>
                        <label className="block text-sm font-medium mb-1"> Upload image </label>
                        <input
                            type="file"
                            accept="image/*"
                            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-primary"
                            onChange={handleImageChange}
                            required
                        />
                        {preview && (
                            <img
                                src={preview}
                                alt="Medicine Preview"
                                className="w-20 h-20 mt-2 object-cover rounded-lg"
                            />
                        )}
                        {loading && <p>Uploading...</p>}
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Category</label>
                        <select {...register("category", { required: true })} className="w-full border px-3 py-2 rounded-md" required>
                            <option value="">Select category</option>
                            {categories.map((c) => (
                                <option key={c._id} value={c.category_name}>
                                    {c.category_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Company */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Company</label>
                        <select {...register("company", { required: true })} className="w-full border px-3 py-2 rounded-md" required>
                            <option value="">Select company</option>
                            {companies.map((c) => (
                                <option key={c.id} value={c.name}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Mass Unit */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Item Mass Unit</label>
                        <select {...register("massUnit", { required: true })} className="w-full border px-3 py-2 rounded-md" required>
                            <option value="">Select unit</option>
                            <option value="mg">MG</option>
                            <option value="ml">ML</option>
                        </select>
                    </div>

                    {/* Price */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Per Unit Price (USD)</label>
                        <input type="number" step="0.01" {...register("price", { required: true })} className="w-full border px-3 py-2 rounded-md" placeholder="0.00" required />
                    </div>

                    {/* Discount */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Discount % (default 0)</label>
                        <input type="number" step="0.01" defaultValue={0} {...register("discount")} className="w-full border px-3 py-2 rounded-md" />
                    </div>

                    {/* Submit full width */}
                    <div className="col-span-1 md:col-span-2 flex items-center justify-end gap-3 mt-2">
                        <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg border text-accent cursor-pointer hover:bg-gray-100">Cancel</button>
                        <button type="submit" className="px-4 py-2 cursor-pointer rounded-lg bg-primary text-white">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddMedicineModal;
