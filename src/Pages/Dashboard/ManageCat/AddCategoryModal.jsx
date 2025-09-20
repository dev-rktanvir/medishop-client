import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useHandleImg from "../../../hooks/useHandleImg";

const AddCategoryModal = ({ onClose }) => {
    const axiosSecure = useAxiosSecure();
    const { handleImageChange, preview, uploadedUrl, loading, resetImage } = useHandleImg();
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = async (data) => {
        const newCategory = {
            category_name: data.name,
            category_image: uploadedUrl,
            medicine_Qty: data.quantity,
            created_at: new Date().toISOString()
        };

        const res = await axiosSecure.post('/cats', newCategory);
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
            resetImage();
        }
        reset();
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 px-4">
            <div className="bg-white rounded-xl p-4 sm:p-6 w-full max-w-lg sm:max-w-md">
                <h3 className="text-xl font-bold mb-4 text-secondary">
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
                            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-primary"
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

                    {/* Quantity */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Medicine Quantity
                        </label>
                        <input
                            type="number"
                            {...register("quantity", { valueAsNumber: true }, { required: true })}
                            placeholder="Enter quantity / 0"
                            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-primary"
                            required
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="w-full sm:w-auto px-4 py-2 rounded-lg border text-accent cursor-pointer hover:bg-gray-100"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="w-full sm:w-auto px-4 py-2 rounded-lg bg-primary cursor-pointer text-white hover:bg-emerald-700"
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
