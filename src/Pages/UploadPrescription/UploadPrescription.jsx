import React from "react";
import useHandleImg from "../../hooks/useHandleImg";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const UploadPrescription = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const {
        handleImageChange,
        preview,
        uploadedUrl,
        loading,
        resetImage,
    } = useHandleImg();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!uploadedUrl) {
            Swal.fire({
                title: 'Missing Prescription',
                text: 'Please upload a prescription image before submitting.',
                icon: 'warning',
                confirmButtonText: 'Proceed',
                background: '#f2f6f7',
                color: '#071c1f',
                confirmButtonColor: '#0a9a73',
                timer: 1500,
            });
            return;
        }
        const prescriptionData = {
            userEmail: user.email,
            userName: user.displayName,
            prescription: uploadedUrl
        }

        const res = await axiosSecure.post('/prescription', prescriptionData)
        if (res.data.insertedId) {
            Swal.fire({
                title: 'Prescription submitted!',
                text: 'Our Team Will Contact Soon.',
                icon: 'success',
                confirmButtonText: 'Proceed',
                background: '#f2f6f7',
                color: '#071c1f',
                confirmButtonColor: '#0a9a73',
                timer: 1500,
            });
        }
        navigate('/');
        resetImage();
    };

    return (
        <div className="max-w-7xl mx-auto py-20 md:py-40 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start bg-white p-6 rounded-lg shadow-md border">
                {/* Left Column: Info */}
                <div className="flex flex-col justify-center">
                    <h2 className="text-3xl sm:text-4xl font-bold text-secondary mb-4">
                        Upload Your Prescription
                    </h2>
                    <p className="text-secondary mb-4">
                        If you have a doctor’s prescription, you can upload it here. Our
                        team will review and prepare your order based on your uploaded
                        image.
                    </p>
                    <ul className="list-disc pl-5 text-secondary space-y-1 text-sm">
                        <li>Ensure the image is clear and readable</li>
                        <li>Accepted formats: JPG, PNG</li>
                        <li>Only one prescription per upload</li>
                        <li>We value your privacy and handle documents securely</li>
                    </ul>
                </div>

                {/* Right Column: Upload Form */}
                <div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* File Input */}
                        <div>
                            <label className="block mb-1 font-medium text-secondary">
                                Choose Image
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="w-full border px-3 py-2 rounded-md focus:ring focus:ring-blue-300"
                            />
                        </div>

                        {/* Uploading status */}
                        {loading && (
                            <p className="text-blue-500">Uploading prescription...</p>
                        )}

                        {/* Preview */}
                        {preview && (
                            <div>
                                <p className="text-secondary text-sm mb-1">Preview:</p>
                                <img
                                    src={preview}
                                    alt="Prescription Preview"
                                    className="w-full max-w-xs rounded border shadow-md"
                                />
                            </div>
                        )}

                        {/* Success message */}
                        {uploadedUrl && (
                            <div className="mt-2 text-green-600">
                                <p className="text-sm font-medium">
                                    Prescription uploaded successfully!
                                </p>
                                <a
                                    href={uploadedUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 underline text-sm"
                                >
                                    View Uploaded Prescription
                                </a>
                            </div>
                        )}

                        {/* Buttons */}
                        <div className="flex space-x-3">
                            {(preview || uploadedUrl) && (
                                <button
                                    type="button"
                                    onClick={resetImage}
                                    className="bg-red-500 text-white cursor-pointer px-4 py-2 rounded-md hover:bg-red-600 transition"
                                >
                                    Remove Prescription
                                </button>
                            )}
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-primary text-white px-4 py-2 cursor-pointer rounded-md hover:bg-primary-dark transition disabled:opacity-50"
                            >
                                {loading ? "Uploading..." : "Submit"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UploadPrescription;
