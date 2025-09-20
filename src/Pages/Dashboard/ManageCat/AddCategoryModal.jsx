import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AddCategoryModal = ({ onClose }) => {
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, reset } = useForm();
    const [MedicinePic, setMedicinePic] = useState('');
    const [preview, setPreview] = useState(null);

    // Handle Image
    const handleImageChange = async (e) => {
        const file = e.target.files[0];

        if (file) {
            setPreview(URL.createObjectURL(file));
        }
        const formData = new FormData();
        formData.append("image", file)

        const imgUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgUpload_key}`
        const res = await axios.post(imgUrl, formData);
        setMedicinePic(res.data.data.url);
    }
    const onSubmit = async (data) => {
        const newCategory = {
            category_name: data.name,
            category_image: MedicinePic,
            medicine_Qty: data.quantity,
            created_at: new Date().toISOString()
        }

        // save data to DB
        const res = await axiosSecure.post('/cats', newCategory)
        if (res.data.insertedId) {
            Swal.fire({
                title: 'Category Added!',
                text: 'The medicine category has been successfully added.',
                icon: 'success',
                confirmButtonText: 'OK',
                background: '#f2f6f7',
                color: '#071c1f',
                confirmButtonColor: '#0a9a73',
                timer: 1500
            });
        }
        reset();
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
                <h3 className="text-xl font-bold mb-4 text-[var(--color-secondary)]">
                    Add New Category
                </h3>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Category Name */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Category Name
                        </label>
                        <input
                            {...register("name", { required: true })}
                            placeholder="Enter category name"
                            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-[var(--color-primary)]"
                            required
                        />
                    </div>

                    {/* Category Image */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Category Image
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-[var(--color-primary)]"
                            onChange={handleImageChange}
                            required
                        />
                        {preview &&
                            <img
                                src={preview}
                                alt="Medicine Preview"
                                className="w-20 h-20 mt-2 object-cover rounded-lg"
                            />
                        }
                    </div>

                    {/* Quantity */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Medicine Quantity
                        </label>
                        <input
                            type="number"
                            {...register("quantity", { valueAsNumber: true }, { required: true })}
                            placeholder="Enter quantity / 0"
                            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-[var(--color-primary)]"
                            required
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded-lg border text-[var(--color-accent)] hover:bg-gray-100"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded-lg bg-[var(--color-primary)] text-white hover:bg-emerald-700"
                        >
                            Add
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddCategoryModal;
