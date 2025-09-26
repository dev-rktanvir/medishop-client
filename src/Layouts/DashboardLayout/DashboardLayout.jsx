import { useState } from "react";
import { Outlet, NavLink } from "react-router";
import {
    FaBox,
    FaShoppingCart,
    FaUsers,
    FaChartBar,
    FaUserCircle,
    FaSignOutAlt,
    FaUserEdit,
    FaBars,
    FaTimes,
    FaBullhorn,
    FaEdit,
    FaTags,
    FaPills,
} from "react-icons/fa";
import Logo from "../../Components/Logo/Logo";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const DashboardLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { user, logoutUser } = useAuth();

    const handleLogout = () => {
        logoutUser().then(() => {
            Swal.fire({
                title: 'Logged Out Successfully!',
                text: 'You have been logged out of your account.',
                icon: 'success',
                confirmButtonText: 'OK',
                background: '#f2f6f7',
                color: '#071c1f',
                confirmButtonColor: '#0a9a73',
                timer: 1500,
                showConfirmButton: false,
            });
        });
    };

    return (
        <div className="min-h-screen flex bg-base-200">
            {/* Sidebar */}
            <aside
                className={`
                    fixed lg:static inset-y-0 left-0 w-64 bg-secondary text-white flex flex-col justify-between
                    transform transition-transform duration-300 z-50
                    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
                    lg:translate-x-0
                `}
            >
                <div>
                    {/* Close button - only visible on < lg */}
                    <div className="lg:hidden flex justify-end p-4">
                        <button
                            onClick={() => setIsSidebarOpen(false)}
                            className="text-white text-2xl cursor-pointer"
                        >
                            <FaTimes />
                        </button>
                    </div>

                    {/* Logo */}
                    <div className="p-6 text-2xl font-bold text-center border-b border-accent">
                        <Logo />
                    </div>

                    {/* Navigation */}
                    <nav className="p-4 space-y-2">
                        {[
                            { to: "/dashboard", icon: <FaChartBar />, label: "Dashboard" },
                            { to: "advertisement", icon: <FaBullhorn />, label: "Advertisement" },       
                            { to: "manage-ads", icon: <FaEdit />, label: "Manage Ads" },                 
                            { to: "manage-cat", icon: <FaTags />, label: "Manage Category" },           
                            { to: "medicine", icon: <FaPills />, label: "Medicine" },
                            { to: "manage-pay", icon: <FaPills />, label: "Payment Management" },
                            { to: "seller-pay", icon: <FaPills />, label: "Payment" },
                            { to: "payment-history", icon: <FaPills />, label: "Payment History" },
                            { to: "sales-report", icon: <FaPills />, label: "Sales Report" },
                        ].map((item) => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                end
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-4 py-2 rounded-lg transition ${isActive ? "bg-primary" : "hover:bg-accent"
                                    }`
                                }
                                onClick={() => setIsSidebarOpen(false)}
                            >
                                {item.icon} {item.label}
                            </NavLink>
                        ))}
                    </nav>
                </div>

                {/* Bottom Section */}
                <div className="p-4 border-t border-accent space-y-2">
                    <NavLink
                        to="/update-profile"
                        className="flex items-center gap-3 px-4 py-2 rounded-lg transition hover:bg-accent"
                        onClick={() => setIsSidebarOpen(false)}
                    >
                        <FaUserEdit /> Update Profile
                    </NavLink>

                    <button
                        onClick={() => {
                            handleLogout();
                            setIsSidebarOpen(false);
                        }}
                        className="flex items-center gap-3 w-full px-4 py-2 rounded-lg transition hover:bg-accent text-left"
                    >
                        <FaSignOutAlt /> Logout
                    </button>

                    <p className="text-xs text-center text-accent mt-4">
                        © 2025 MediShop
                    </p>
                </div>
            </aside>

            {/* Overlay - only on small screens */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-40 z-40 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Topbar */}
                <header className="h-20 bg-white shadow flex items-center justify-between px-6">
                    <div className="flex items-center gap-4">
                        {/* Hamburger - visible on < lg only */}
                        <button
                            className="text-secondary text-xl lg:hidden"
                            onClick={() => setIsSidebarOpen(true)}
                        >
                            <FaBars />
                        </button>
                        <h1 className="text-lg font-semibold text-secondary">
                            Dashboard
                        </h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="relative">
                            <FaShoppingCart className="text-xl text-secondary" />
                            <span className="absolute -top-2 -right-2 bg-primary text-white text-xs px-1 rounded-full">
                                3
                            </span>
                        </button>

                        {user?.photoURL ? (
                            <img
                                src={user.photoURL}
                                alt="profile"
                                className="w-12 h-12 rounded-full"
                            />
                        ) : (
                            <FaUserCircle
                                size={24}
                                className="text-2xl text-secondary cursor-pointer"
                            />
                        )}
                    </div>
                </header>

                {/* Content */}
                <main className="flex-1 p-6 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
