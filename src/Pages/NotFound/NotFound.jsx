import { Link } from "react-router";
import { FaExclamationTriangle } from "react-icons/fa";

const NotFound = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 text-center px-6">
            <div className="bg-white p-10 rounded-2xl shadow-xl flex flex-col items-center">
                <FaExclamationTriangle className="text-yellow-500 text-6xl mb-4" />
                <h1 className="text-6xl font-bold text-secondary mb-4">404</h1>
                <h2 className="text-2xl font-semibold text-accent mb-2">
                    Page Not Found
                </h2>
                <p className="text-gray-600 mb-6 max-w-md">
                    Sorry, the page you are looking for doesn’t exist or has been moved.
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

export default NotFound;
