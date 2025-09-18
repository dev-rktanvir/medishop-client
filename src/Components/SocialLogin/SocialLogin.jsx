import { FaGoogle, FaGithub } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useLocation, useNavigate } from "react-router";

const SocialLogin = () => {
    const { googleLogin, profileUpdate } = useAuth();
    const axiosPublic = useAxiosPublic();
    const location = useLocation();
    const navigate = useNavigate();
    const handleGoogle = () => {
        googleLogin()
            .then(async (result) => {
                Swal.fire({
                    title: 'Login Successful!',
                    text: 'You have successfully logged in.',
                    icon: 'success',
                    confirmButtonText: 'Proceed',
                    background: '#f2f6f7',
                    color: '#071c1f',
                    confirmButtonColor: '#0a9a73',
                    timer: 1500,
                });
                // Update profile
                const profileInfo = {
                    photoURL: result.user.photoURL
                }
                profileUpdate(profileInfo)
                    .then(() => { })
                    .catch(error => { })

                // new user data
                const newUser = {
                    name: result.user.displayName,
                    email: result.user.email,
                    role: "user",
                    created_at: new Date().toISOString()
                }
                // Save User data in DB
                await axiosPublic.post('/users', newUser)
                navigate( location?.state || '/' );

            })
            .catch(error => {
                Swal.fire({
                    title: 'Login Failed',
                    text: 'Invalid username or password. Please try again.',
                    icon: 'error',
                    confirmButtonText: 'Retry',
                    background: '#fef2f2',
                    color: '#7f1d1d',
                    confirmButtonColor: '#dc2626',
                    timer: 1500
                });

            })
    };

    return (
        <div>
            <p className="text-center text-gray-500 mb-3">Or</p>
            <div className="flex justify-center gap-4">
                <button
                    onClick={handleGoogle}
                    className="flex w-full justify-center items-center gap-2 border px-4 py-2 rounded-md hover:bg-gray-100 transition cursor-pointer"
                >
                    <FaGoogle className="text-primary" /> Continue with Google
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;
