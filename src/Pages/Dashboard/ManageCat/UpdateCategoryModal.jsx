import { useForm } from "react-hook-form";
import { useEffect } from "react";
import useHandleImg from "../../../hooks/useHandleImg";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const UpdateCategoryModal = ({ category, onClose }) => {
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, setValue } = useForm();
    const { handleImageChange, preview, uploadedUrl, loading, resetImage } = useHandleImg();

    // Prefill form data
    useEffect(() => {
        if (category) {
            setValue("name", category.category_name);
            setValue("quantity", category.medicine_Qty);
        }
    }, [category, setValue]);

    const onSubmit = async (data) => {
        const finalUrl = uploadedUrl || category?.category_image
        const updateCat = {
            category_name: data.name,
            category_image: finalUrl,
            medicine_Qty: data.quantity
        }
        const res = await axiosSecure.patch(`cats/${category._id}`, updateCat)
        if (res.data.modifiedCount) {
            Swal.fire({
                title: 'Category Updated!',
                text: 'The category has been successfully updated.',
                icon: 'success',
                confirmButtonText: 'OK',
                background: '#f2f6f7',
                color: '#071c1f',
                confirmButtonColor: '#0a9a73',
                timer: 1500
            });
            resetImage();
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
                <h3 className="text-xl font-bold mb-4 text-secondary">
                    Update Category
                </h3>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Category Name */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Category Name</label>
                        <input
                            {...register("name", { required: true })}
                            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-primary"
                            required
                        />
                    </div>

                    {/* Category Image */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Category Image URL
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-primary"
                            onChange={handleImageChange}
                        />
                        {preview &&
                            <img
                                src={preview}
                                alt="Medicine Preview"
                                className="w-20 h-20 mt-2 object-cover rounded-lg"
                            />
                        }
                        {loading && <p>Uploading...</p>}
                    </div>

                    {/* Quantity */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Medicine Quantity
                        </label>
                        <input
                            type="number"
                            {...register("quantity", { valueAsNumber: true }, { required: true })}
                            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-primary"
                            required
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded-lg border text-accent cursor-pointer hover:bg-gray-100"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded-lg bg-primary cursor-pointer text-white hover:bg-emerald-700"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateCategoryModal;
