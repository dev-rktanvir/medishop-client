import { useForm } from "react-hook-form";
import SocialLogin from "../../../Components/SocialLogin/SocialLogin";
import { Link } from "react-router";

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log("Login Data:", data);
        // Add login logic here
    };

    return (
        <div className="w-full max-w-md mx-auto">
            {/* Title & Subtitle */}
            <h2 className="text-4xl font-bold text-secondary">Welcome Back</h2>
            <p className="text-secondary mb-6">Login with MediShop</p>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Email */}
                <div>
                    <label className="block mb-1 font-medium">Email</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full border px-3 py-2 rounded-md focus:ring focus:ring-blue-300"
                        {...register("email", {
                            required: "Email is required",
                        })}
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                {/* Password */}
                <div>
                    <label className="block mb-1 font-medium">Password</label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        className="w-full border px-3 py-2 rounded-md focus:ring focus:ring-blue-300"
                        {...register("password", {
                            required: "Password is required",
                        })}
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                {/* Login Button */}
                <button
                    type="submit"
                    className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary/80 cursor-pointer transition"
                >
                    Login
                </button>
            </form>

            {/* No Account Yet */}
            <p className="mt-4 text-sm">
                Don’t have an account?{" "}
                <Link to="/register" className="text-primary hover:underline">Register</Link>
            </p>

            {/* Social Login */}
            <div className="mt-6">
                <SocialLogin />
            </div>
        </div>
    );
};

export default Login;
