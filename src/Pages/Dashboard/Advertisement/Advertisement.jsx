import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiPlus, FiX } from "react-icons/fi";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from '@tanstack/react-query';
import Swal from "sweetalert2";

const Advertisement = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: ads = [], refetch } = useQuery({
        queryKey: ['ads', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/ads?email=${user.email}`)
            return res.data;
        }
    })

    const [MedicinePic, setMedicinePic] = useState('');
    const [preview, setPreview] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { register, handleSubmit, reset } = useForm();

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
        const newAd = {
            medicine_name: data.name,
            seller_email: user.email,
            medicine_description: data.description,
            image: MedicinePic,
            status: "Pending",
            created_at: new Date().toISOString()
        };
        // Save data in server
        const res = await axiosSecure.post('/ads', newAd)
        if (res.data.insertedId) {
            Swal.fire({
                title: 'Request Submitted!',
                text: 'Your ad/banner request has been successfully received.',
                icon: 'success',
                confirmButtonText: 'OK',
                background: '#f2f6f7',
                color: '#071c1f',
                confirmButtonColor: '#0a9a73',
                timer: 1500
            });
            refetch();
            reset();
            setIsModalOpen(false);
        }
    };

    return (
        <div className="p-6 bg-white rounded-xl shadow-md">
            {/* Header */}
            <div className="flex flex-col lg:flex-row justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-secondary">
                    Advertisement Management
                </h2>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center mt-4 gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-opacity-90 cursor-pointer"
                >
                    <FiPlus /> Add Advertisement
                </button>
            </div>

            {/* Table for large screens */}
            <div className="hidden lg:block overflow-x-auto">
                <table className="w-full border border-gray-200 text-left">
                    <thead className="bg-base-200">
                        <tr>
                            <th className="p-3">Image</th>
                            <th className="p-3">Medicine Name</th>
                            <th className="p-3">Description</th>
                            <th className="p-3">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ads.map((ad) => (
                            <tr key={ad._id} className="border-t">
                                <td className="p-3">
                                    <img
                                        src={ad.image}
                                        alt={ad.medicine_name}
                                        className="w-12 h-12 rounded-md object-cover"
                                    />
                                </td>
                                <td className="p-3 font-medium">{ad.medicine_name}</td>
                                <td className="p-3 text-sm text-gray-600">{ad.medicine_description}</td>
                                <td className="p-3">
                                    <span
                                        className={`px-3 py-1 rounded-full text-sm ${ad.status === "active"
                                            ? "bg-green-100 text-green-600"
                                            : ad.status === "rejected"
                                                ? "bg-red-100 text-red-600"
                                                : "bg-yellow-100 text-yellow-600"
                                            }`}
                                    >
                                        {ad.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Card layout for mobile */}
            <div className="grid gap-4 lg:hidden">
                {ads.map((ad) => (
                    <div
                        key={ad._id}
                        className="border rounded-xl p-4 shadow-sm bg-base-200"
                    >
                        <div className="flex items-center gap-4 mb-3">
                            <img
                                src={ad.image}
                                alt={ad.medicine_name}
                                className="w-16 h-16 rounded-lg object-cover"
                            />
                            <div>
                                <h3 className="font-semibold text-secondary">
                                    {ad.medicine_name}
                                </h3>
                                <p className="text-sm text-accent">
                                    {ad.medicine_description}
                                </p>
                            </div>
                        </div>
                        <div>
                            <span
                                className={`px-3 py-1 rounded-full text-sm ${ad.status === "active"
                                    ? "bg-green-100 text-green-600"
                                    : ad.status === "rejected"
                                        ? "bg-red-100 text-red-600"
                                        : "bg-yellow-100 text-yellow-600"
                                    }`}
                            >
                                {ad.status}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
                        {/* Close button */}
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
                        >
                            <FiX size={22} />
                        </button>

                        <h3 className="text-lg font-semibold mb-4 text-secondary">
                            Add Advertisement
                        </h3>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            {/* Image Upload */}
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Medicine Image
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="w-full border border-gray-300 rounded-lg p-2"
                                    onChange={handleImageChange}
                                />
                                {preview &&
                                    <img
                                        src={preview}
                                        alt="Medicine Preview"
                                        className="w-20 h-20 mt-2 object-cover rounded-lg"
                                    />
                                }
                            </div>

                            {/* Medicine Name */}
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Medicine Name
                                </label>
                                <input
                                    type="text"
                                    {...register("name", { required: true })}
                                    placeholder="Enter medicine name"
                                    className="w-full border border-gray-300 rounded-lg p-2"
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Description
                                </label>
                                <textarea
                                    {...register("description", { required: true })}
                                    placeholder="Short description"
                                    className="w-full border border-gray-300 rounded-lg p-2"
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full bg-primary text-white py-2 rounded-lg hover:bg-opacity-90"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Advertisement;
