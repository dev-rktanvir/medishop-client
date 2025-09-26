import { Link } from "react-router";
import { FaLock } from "react-icons/fa";

const Forbidden = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 text-center px-6">
            <div className="bg-white p-10 rounded-2xl shadow-xl flex flex-col items-center">
                <FaLock className="text-red-500 text-6xl mb-4" />
                <h1 className="text-5xl font-bold text-secondary mb-4">403</h1>
                <h2 className="text-2xl font-semibold text-accent mb-2">
                    Access Forbidden
                </h2>
                <p className="text-gray-600 mb-6 max-w-md">
                    Sorry, you don’t have permission to access this page.
                    Please check your account role or go back to the homepage.
                </p>

                <Link
                    to="/"
                    className="bg-primary text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-secondary transition"
                >
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default Forbidden;
