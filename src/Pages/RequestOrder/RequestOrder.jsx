import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const RequestOrder = () => {
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [regionsData, setRegionsData] = useState({});
    const [cities, setCities] = useState([]);
    const [areas, setAreas] = useState([]);

    useEffect(() => {
        fetch("/bangladesh.json")
            .then((res) => res.json())
            .then(setRegionsData)
            .catch(console.error);
    }, []);

    const {
        register,
        control,
        watch,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            medicines: [{ name: "", strength: "", quantity: "" }],
            receiverName: "",
            receiverPhone: "",
            receiverEmail: "",
            region: "",
            city: "",
            area: "",
            address: "",
            note: "",
        },
    });

    const { fields, append } = useFieldArray({
        control,
        name: "medicines",
    });

    const watchRegion = watch("region");
    const watchCity = watch("city");

    useEffect(() => {
        if (watchRegion && regionsData[watchRegion]) {
            setCities(Object.keys(regionsData[watchRegion]));
            setAreas([]);
        } else {
            setCities([]);
            setAreas([]);
        }
    }, [watchRegion, regionsData]);

    useEffect(() => {
        if (watchRegion && watchCity && regionsData[watchRegion]?.[watchCity]) {
            setAreas(regionsData[watchRegion][watchCity]);
        } else {
            setAreas([]);
        }
    }, [watchCity, watchRegion, regionsData]);

    const onSubmit = async (data) => {
        const orderData = data;
        const res = await axiosSecure.post('/order-req', orderData)
        if (res.data.insertedId) {
            Swal.fire({
                title: 'Request Submitted!',
                text: 'Your Order Placed successfully.',
                icon: 'success',
                confirmButtonText: 'Proceed',
                background: '#f2f6f7',
                color: '#071c1f',
                confirmButtonColor: '#0a9a73',
                timer: 1500,
            });
        }
        navigate('/');
        reset();
    };

    return (
        <div className="max-w-7xl mx-auto py-10 px-4 sm:py-20 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                {/* Left: Medicines Table */}
                <div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-secondary mt-10 md:mt-0 mb-6">Order Medicines</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <table className="w-full border-collapse border border-gray-300 mb-4">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border border-gray-300 px-3 py-2 text-left">Medicine Name</th>
                                    <th className="border border-gray-300 px-3 py-2 text-left">Strength</th>
                                    <th className="border border-gray-300 px-3 py-2 text-left">Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {fields.map((field, index) => (
                                    <tr key={field.id}>
                                        <td className="border border-gray-300 px-3 py-2">
                                            <input
                                                type="text"
                                                placeholder="Napa Extra"
                                                className="w-full border px-2 py-1 rounded-md focus:ring focus:ring-blue-300"
                                                {...register(`medicines.${index}.name`, {
                                                    required: "Name required",
                                                    minLength: { value: 3, message: "Min 3 characters" },
                                                })}
                                            />
                                            {errors.medicines?.[index]?.name && (
                                                <p className="text-red-500 text-xs mt-1">{errors.medicines[index].name.message}</p>
                                            )}
                                        </td>
                                        <td className="border border-gray-300 px-3 py-2">
                                            <input
                                                type="text"
                                                placeholder="5ml"
                                                className="w-full border px-2 py-1 rounded-md focus:ring focus:ring-blue-300"
                                                {...register(`medicines.${index}.strength`, {
                                                    required: "Strength required",
                                                })}
                                            />
                                            {errors.medicines?.[index]?.strength && (
                                                <p className="text-red-500 text-xs mt-1">{errors.medicines[index].strength.message}</p>
                                            )}
                                        </td>
                                        <td className="border border-gray-300 px-3 py-2">
                                            <input
                                                type="number"
                                                placeholder="20 pieces"
                                                min={1}
                                                className="w-full border px-2 py-1 rounded-md focus:ring focus:ring-blue-300"
                                                {...register(`medicines.${index}.quantity`, {
                                                    required: "Quantity required",
                                                    min: { value: 1, message: "Min 1 required" },
                                                })}
                                            />
                                            {errors.medicines?.[index]?.quantity && (
                                                <p className="text-red-500 text-xs mt-1">{errors.medicines[index].quantity.message}</p>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <button
                            type="button"
                            onClick={() => append({ name: "", strength: "", quantity: "" })}
                            className="mb-4 bg-secondary text-white px-4 py-2 rounded-md hover:bg-secondary/80 transition"
                        >
                            Add Medicine
                        </button>

                        <button
                            type="submit"
                            className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary/80 cursor-pointer transition"
                        >
                            Submit Order
                        </button>
                    </form>
                </div>

                {/* Right: Receiver Info */}
                <div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-secondary mb-6">Receiver Information</h2>
                    <form className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Receiver Name */}
                            <div>
                                <label className="block mb-1 font-medium">Receiver Name</label>
                                <input
                                    type="text"
                                    placeholder="Receiver's name"
                                    className="w-full border px-3 py-2 rounded-md focus:ring focus:ring-blue-300"
                                    {...register("receiverName", {
                                        required: "Name required",
                                        minLength: { value: 3, message: "Min 3 characters" },
                                    })}
                                />
                                {errors.receiverName && <p className="text-red-500 text-sm">{errors.receiverName.message}</p>}
                            </div>

                            {/* Receiver Phone */}
                            <div>
                                <label className="block mb-1 font-medium">Receiver Phone</label>
                                <input
                                    type="tel"
                                    placeholder="+880 1234 567 890"
                                    className="w-full border px-3 py-2 rounded-md focus:ring focus:ring-blue-300"
                                    {...register("receiverPhone", {
                                        required: "Phone number required",
                                        pattern: {
                                            value: /^\+?880\d{9,10}$/,
                                            message: "Invalid Bangladeshi number",
                                        },
                                    })}
                                />
                                {errors.receiverPhone && <p className="text-red-500 text-sm">{errors.receiverPhone.message}</p>}
                            </div>

                            {/* Receiver Email */}
                            <div>
                                <label className="block mb-1 font-medium">Receiver Email</label>
                                <input
                                    type="email"
                                    placeholder="receiver@email.com"
                                    className="w-full border px-3 py-2 rounded-md focus:ring focus:ring-blue-300"
                                    {...register("receiverEmail", {
                                        required: "Email required",
                                        pattern: {
                                            value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                            message: "Invalid email",
                                        },
                                    })}
                                />
                                {errors.receiverEmail && <p className="text-red-500 text-sm">{errors.receiverEmail.message}</p>}
                            </div>

                            {/* Region */}
                            <div>
                                <label className="block mb-1 font-medium">Region</label>
                                <select
                                    className="w-full border px-3 py-2 rounded-md focus:ring focus:ring-blue-300"
                                    {...register("region", { required: "Region required" })}
                                >
                                    <option value="">Select Region</option>
                                    {Object.keys(regionsData).map((region) => (
                                        <option key={region} value={region}>
                                            {region}
                                        </option>
                                    ))}
                                </select>
                                {errors.region && <p className="text-red-500 text-sm">{errors.region.message}</p>}
                            </div>

                            {/* City */}
                            <div>
                                <label className="block mb-1 font-medium">City</label>
                                <select
                                    className="w-full border px-3 py-2 rounded-md focus:ring focus:ring-blue-300"
                                    {...register("city", { required: "City required" })}
                                    disabled={!cities.length}
                                >
                                    <option value="">Select City</option>
                                    {cities.map((city) => (
                                        <option key={city} value={city}>
                                            {city}
                                        </option>
                                    ))}
                                </select>
                                {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
                            </div>

                            {/* Area */}
                            <div>
                                <label className="block mb-1 font-medium">Area</label>
                                <select
                                    className="w-full border px-3 py-2 rounded-md focus:ring focus:ring-blue-300"
                                    {...register("area", { required: "Area required" })}
                                    disabled={!areas.length}
                                >
                                    <option value="">Select Area</option>
                                    {areas.map((area) => (
                                        <option key={area} value={area}>
                                            {area}
                                        </option>
                                    ))}
                                </select>
                                {errors.area && <p className="text-red-500 text-sm">{errors.area.message}</p>}
                            </div>
                        </div>

                        {/* Address */}
                        <div>
                            <label className="block mb-1 font-medium">Address</label>
                            <textarea
                                rows={3}
                                placeholder="Full delivery address..."
                                className="w-full border px-3 py-2 rounded-md focus:ring focus:ring-blue-300"
                                {...register("address", { required: "Address is required" })}
                            ></textarea>
                            {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
                        </div>


                        {/* Add Note */}
                        <div>
                            <label className="block mb-1 font-medium">Add Note</label>
                            <textarea
                                rows={3}
                                placeholder="Write any extra note..."
                                className="w-full border px-3 py-2 rounded-md focus:ring focus:ring-blue-300"
                                {...register("note")}
                            ></textarea>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RequestOrder;
