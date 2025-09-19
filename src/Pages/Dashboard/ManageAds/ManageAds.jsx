import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageAds = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: manageAds = [], refetch } = useQuery({
        queryKey: ['manageAds', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get('/all-ads')
            return res.data;
        }
    })

    const handleAddSlide = async (id) => {
        const updateData = {
            id: id,
            status: "active"
        }
        await axiosSecure.patch('/ads/status', updateData)
        refetch();
    }
    const handleRemoveSlide = async (id) => {
        const updateData = {
            id: id,
            status: "pending"
        }
        await axiosSecure.patch('/ads/status', updateData)
        refetch();
    }
    const handleReject = async (id) => {
        const updateData = {
            id: id,
            status: "rejected"
        }
        await axiosSecure.patch('/ads/status', updateData)
        refetch();
    }

    return (
        <div className="p-6 bg-white rounded-xl shadow-md">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-color-secondary">
                    Manage Advertisements
                </h2>
            </div>

            {/* Table for large screens */}
            <div className="hidden md:block overflow-x-auto">
                <table className="w-full border border-gray-200 text-left">
                    <thead className="bg-color-base-200 text-center">
                        <tr>
                            <th className="p-3">Image</th>
                            <th className="p-3">Medicine Name</th>
                            <th className="p-3">Description</th>
                            <th className="p-3">Seller Email</th>
                            <th className="p-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {manageAds.map((ad) => (
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
                                <td className="p-3 text-sm">{ad.seller_email}</td>
                                <td className="p-3">
                                    <div className="flex gap-4 items-center justify-center">
                                        {
                                            ad.status === "pending" ?
                                                <button
                                                    onClick={() => handleAddSlide(ad._id)}
                                                    className="px-4 py-2 rounded-lg transition bg-primary text-white font-medium cursor-pointer"
                                                >Add To Slide
                                                </button> :
                                                <button
                                                    onClick={() => handleRemoveSlide(ad._id)}
                                                    className="px-4 py-2 rounded-lg transition bg-primary text-white font-medium cursor-pointer"
                                                >Remove from slide
                                                </button>
                                        }
                                        <button onClick={() => handleReject(ad._id)} className="px-4 py-2 rounded-lg transition bg-secondary text-white font-medium cursor-pointer">Reject</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Card layout for mobile */}
            <div className="grid gap-4 md:hidden">
                {manageAds.map((ad) => (
                    <div
                        key={ad._id}
                        className="border rounded-xl p-4 shadow-sm bg-color-base-200"
                    >
                        <div className="flex items-center gap-4 mb-3">
                            <img
                                src={ad.image}
                                alt={ad.name}
                                className="w-16 h-16 rounded-lg object-cover"
                            />
                            <div>
                                <h3 className="font-semibold text-color-secondary">
                                    {ad.medicine_name}
                                </h3>
                                <p className="text-sm text-color-accent">
                                    {ad.medicine_description}
                                </p>
                                <p className="text-xs text-gray-500">{ad.seller_email}</p>
                            </div>
                        </div>
                        <div>
                            <div className="flex gap-4 items-center justify-center">
                                {
                                    ad.status === "pending" ?
                                        <button
                                            onClick={() => handleAddSlide(ad._id)}
                                            className="px-4 py-2 rounded-lg transition bg-primary text-white font-medium cursor-pointer"
                                        >Add To Slide
                                        </button> :
                                        <button
                                            onClick={() => handleRemoveSlide(ad._id)}
                                            className="px-4 py-2 rounded-lg transition bg-primary text-white font-medium cursor-pointer"
                                        >Remove from slide
                                        </button>
                                }
                                <button onClick={() => handleReject()} className="px-4 py-2 rounded-lg transition bg-secondary text-white font-medium cursor-pointer">Reject</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageAds;
