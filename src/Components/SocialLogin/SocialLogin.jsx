import { FaGoogle, FaGithub } from "react-icons/fa";

const SocialLogin = () => {
    const handleGoogle = () => {
        console.log("Google login clicked");
    };

    const handleGithub = () => {
        console.log("GitHub login clicked");
    };

    return (
        <div>
            <p className="text-center text-gray-500 mb-3">Or continue with</p>
            <div className="flex justify-center gap-4">
                <button
                    onClick={handleGoogle}
                    className="flex items-center gap-2 border px-4 py-2 rounded-md hover:bg-gray-100 transition cursor-pointer"
                >
                    <FaGoogle className="text-primary" /> Google
                </button>
                <button
                    onClick={handleGithub}
                    className="flex items-center gap-2 border px-4 py-2 rounded-md hover:bg-gray-100 transition cursor-pointer"
                >
                    <FaGithub className="text-primary" /> GitHub
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;
