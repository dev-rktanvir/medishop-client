import { Outlet } from "react-router";
import Logo from "../../Components/Logo/Logo";
import authImg from "../../assets/medi.png";

const AuthLayout = () => {
    return (
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
            {/* Left Column */}
            <div className="flex flex-col px-6 md:px-12 lg:px-20">
                {/* Logo top-left */}
                <div className="pt-6 pb-8">
                    <Logo />
                </div>
                {/* Auth Form (Outlet) */}
                <div className="flex-1 flex items-center justify-center">
                    <Outlet />
                </div>
            </div>

            {/* Right Column (Image) */}
            <div className="hidden md:flex items-center justify-center bg-base-200">
                <img
                    src={authImg}
                    alt="auth visual"
                    className="max-w-full h-auto object-contain"
                />
            </div>
        </div>
    );
};

export default AuthLayout;
