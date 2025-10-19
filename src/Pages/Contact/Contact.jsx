import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const Contact = () => {
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = async (data) => {
        const messageData = data;
        const res = await axiosSecure.post('/message', messageData)
        if (res.data.insertedId) {
            Swal.fire({
                title: 'Message Sent!',
                text: 'Your Message Sent successfully.',
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
                {/* Left Column */}
                <div className="flex flex-col justify-center">
                    <h2 className="text-3xl sm:text-4xl font-bold text-secondary mt-14 md:mt-0 mb-2">Get in Touch</h2>
                    <p className="text-secondary mb-6">
                        Have questions? We’re here to help! Reach out to us via phone, email, or visit our office.
                    </p>

                    <div className="space-y-4 text-secondary">
                        <div>
                            <h3 className="font-semibold text-lg">Phone</h3>
                            <p>+880 1234 567 890</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg">Email</h3>
                            <p>support@medishop.com</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg">Address</h3>
                            <p>123 Health Street, Dhaka, Bangladesh</p>
                        </div>
                    </div>
                </div>

                {/* Right Column (Form) */}
                <div className="w-full max-w-md mx-auto">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* Name */}
                        <div>
                            <label className="block mb-1 font-medium">Name</label>
                            <input
                                type="text"
                                placeholder="Enter your name"
                                className="w-full border px-3 py-2 rounded-md focus:ring focus:ring-blue-300"
                                {...register("name", {
                                    required: "Name is required",
                                    minLength: { value: 3, message: "Name should be at least 3 characters" },
                                })}
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm">{errors.name.message}</p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block mb-1 font-medium">Email</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full border px-3 py-2 rounded-md focus:ring focus:ring-blue-300"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^\S+@\S+$/i,
                                        message: "Invalid email address",
                                    },
                                })}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm">{errors.email.message}</p>
                            )}
                        </div>

                        {/* Message */}
                        <div>
                            <label className="block mb-1 font-medium">Message</label>
                            <textarea
                                placeholder="Write your message"
                                className="w-full border px-3 py-2 rounded-md focus:ring focus:ring-blue-300"
                                rows={4}
                                {...register("message", {
                                    required: "Message is required",
                                    minLength: { value: 10, message: "Message should be at least 10 characters" },
                                })}
                            ></textarea>
                            {errors.message && (
                                <p className="text-red-500 text-sm">{errors.message.message}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary/80 cursor-pointer transition"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
