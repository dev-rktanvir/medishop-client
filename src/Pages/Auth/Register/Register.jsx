import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaUserCircle } from "react-icons/fa";
import SocialLogin from "../../../Components/SocialLogin/SocialLogin";
import uploadImg from "../../../assets/image-upload-icon.png";

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [preview, setPreview] = useState(null);

    const onSubmit = (data) => {
        console.log("Form Data:", data);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    return (
        <div className="w-full max-w-md mx-auto">
            {/* Title & Subtitle */}
            <h2 className="text-4xl font-bold text-secondary">
                Create an Account
            </h2>
            <p className="text-secondary mb-6">
                Register with MediShop
            </p>

            {/* Image Upload */}
            <div className="flex mb-6">
                <label className="cursor-pointer">
                    {preview ? (
                        <img
                            src={preview}
                            alt="Profile Preview"
                            className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
                        />
                    ) : (
                        <img src={uploadImg} alt="" className="w-12 h-12" />
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        {...register("photo")}
                        onChange={handleImageChange}
                    />
                </label>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Name */}
                <div>
                    <label className="block mb-1 font-medium">Name</label>
                    <input
                        type="text"
                        placeholder="Enter your name"
                        className="w-full border px-3 py-2 rounded-md focus:ring focus:ring-blue-300"
                        {...register("name", { required: "Name is required" })}
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                </div>

                {/* Email */}
                <div>
                    <label className="block mb-1 font-medium">Email</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full border px-3 py-2 rounded-md focus:ring focus:ring-blue-300"
                        {...register("email", { required: "Email is required" })}
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>

                {/* Password */}
                <div>
                    <label className="block mb-1 font-medium">Password</label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        className="w-full border px-3 py-2 rounded-md focus:ring focus:ring-blue-300"
                        {...register("password", { required: "Password is required" })}
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                </div>

                {/* Role */}
                <div>
                    <label className="block mb-1 font-medium">Role</label>
                    <select
                        className="w-full border px-3 py-2 rounded-md focus:ring focus:ring-blue-300"
                        {...register("role", { required: "Role is required" })}
                    >
                        <option value="">Select role</option>
                        <option value="user">User</option>
                        <option value="seller">Seller</option>
                    </select>
                    {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
                </div>

                {/* Register Button */}
                <button
                    type="submit"
                    className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary/80 cursor-pointer transition"
                >
                    Register
                </button>
            </form>

            {/* Already Have Account */}
            <p className="mt-4 text-sm">
                Already have an account?{" "}
                <a href="/login" className="text-primary hover:underline">
                    Login
                </a>
            </p>

            {/* Social Login */}
            <div className="mt-6">
                <SocialLogin />
            </div>
        </div>
    );
};

export default Register;
