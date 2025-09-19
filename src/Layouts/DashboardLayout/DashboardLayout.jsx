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
} from "react-icons/fa";
import Logo from "../../Components/Logo/Logo";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const DashboardLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { user, logoutUser } = useAuth();

    // Logout function
    const handleLogout = () => {
        logoutUser()
            .then(() => {
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

            })
    };

    return (
        <div className="min-h-screen flex bg-base-200">
            {/* Sidebar (Mobile: Slide-in) */}
            <aside
                className={`fixed md:static inset-y-0 left-0 w-64 bg-secondary text-white flex flex-col justify-between transform transition-transform duration-300 z-50 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
                    }`}
            >
                <div>
                    {/* Close Button for Mobile */}
                    <div className="md:hidden flex justify-end p-4">
                        <button
                            onClick={() => setIsSidebarOpen(false)}
                            className="text-white text-2xl"
                        >
                            <FaTimes />
                        </button>
                    </div>

                    {/* Logo */}
                    <div className="p-6 text-2xl font-bold text-center border-b border-accent">
                        <Logo></Logo>
                    </div>

                    {/* Navigation */}
                    <nav className="p-4 space-y-2">
                        <NavLink
                            to="/dashboard"
                            end
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-2 rounded-lg transition ${isActive
                                    ? "bg-primary"
                                    : "hover:bg-accent"
                                }`
                            }
                        >
                            <FaChartBar /> Dashboard
                        </NavLink>

                        <NavLink
                            to="/dashboard/products"
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-2 rounded-lg transition ${isActive
                                    ? "bg-primary"
                                    : "hover:bg-accent"
                                }`
                            }
                        >
                            <FaBox /> Products
                        </NavLink>

                        <NavLink
                            to="/dashboard/orders"
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-2 rounded-lg transition ${isActive
                                    ? "bg-primary"
                                    : "hover:bg-accent"
                                }`
                            }
                        >
                            <FaShoppingCart /> Orders
                        </NavLink>

                        <NavLink
                            to="/dashboard/users"
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-2 rounded-lg transition ${isActive
                                    ? "bg-primary"
                                    : "hover:bg-accent"
                                }`
                            }
                        >
                            <FaUsers /> Users
                        </NavLink>
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
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-2 rounded-lg transition hover:bg-accent text-left"
                    >
                        <FaSignOutAlt /> Logout
                    </button>

                    <p className="text-xs text-center text-accent mt-4">
                        © 2025 MediShop
                    </p>
                </div>
            </aside>

            {/* Overlay for mobile */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Topbar */}
                <header className="h-20 bg-white shadow flex items-center justify-between px-6">
                    <div className="flex items-center gap-4">
                        {/* Hamburger for mobile */}
                        <button
                            className="md:hidden text-secondary text-xl"
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
                        {
                            user.photoURL ? (
                            <img
                                src={user.photoURL}
                                alt="profile"
                                className="w-12 h-12 rounded-full"
                            />
                        ) :
                                <FaUserCircle size={24} className="text-2xl text-secondary cursor-pointer" />
                        }

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
