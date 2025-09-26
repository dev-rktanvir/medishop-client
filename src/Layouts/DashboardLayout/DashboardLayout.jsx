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
    FaCreditCard,
    FaMoneyCheckAlt,
    FaHistory,
    FaFileAlt,
} from "react-icons/fa";
import Logo from "../../Components/Logo/Logo";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useUserRole from "../../hooks/useUserRole";
import Loading from "../../Components/Loading/Loading";

const DashboardLayout = () => {
    const { isAdmin, isSeller, isUser, isLoading } = useUserRole();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { user, logoutUser } = useAuth();

    const handleLogout = () => {
        logoutUser().then(() => {
            Swal.fire({
                title: "Logged Out Successfully!",
                text: "You have been logged out of your account.",
                icon: "success",
                confirmButtonText: "OK",
                background: "#f2f6f7",
                color: "#071c1f",
                confirmButtonColor: "#0a9a73",
                timer: 1500,
                showConfirmButton: false,
            });
        });
    };

    const navLinkClass = ({ isActive }) =>
        `flex items-center gap-3 px-4 py-2 rounded-lg transition ${isActive ? "bg-primary" : "hover:bg-accent"}`;

    if (isLoading) {
        return <div className="text-center py-10"><Loading></Loading></div>;
    }

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
                        {/* Shared */}
                        <NavLink
                            to="/dashboard"
                            end
                            className={navLinkClass}
                            onClick={() => setIsSidebarOpen(false)}
                        >
                            <FaChartBar /> Dashboard
                        </NavLink>

                        {/* Admin Only */}
                        {isAdmin && (
                            <>
                                <NavLink to="manage-user" className={navLinkClass} onClick={() => setIsSidebarOpen(false)}>
                                    <FaUsers /> Manage User
                                </NavLink>
                                <NavLink to="manage-cat" className={navLinkClass} onClick={() => setIsSidebarOpen(false)}>
                                    <FaTags /> Manage Category
                                </NavLink>
                                <NavLink to="manage-pay" className={navLinkClass} onClick={() => setIsSidebarOpen(false)}>
                                    <FaCreditCard /> Payment Management
                                </NavLink>
                                <NavLink to="sales-report" className={navLinkClass} onClick={() => setIsSidebarOpen(false)}>
                                    <FaFileAlt /> Sales Report
                                </NavLink>
                                <NavLink to="manage-ads" className={navLinkClass} onClick={() => setIsSidebarOpen(false)}>
                                    <FaEdit /> Manage Banner Advertise
                                </NavLink>
                            </>
                        )}

                        {/* Seller Only */}
                        {isSeller && (
                            <>
                                <NavLink to="medicine" className={navLinkClass} onClick={() => setIsSidebarOpen(false)}>
                                    <FaPills /> Manage Medicines
                                </NavLink>
                                <NavLink to="seller-pay" className={navLinkClass} onClick={() => setIsSidebarOpen(false)}>
                                    <FaMoneyCheckAlt /> Payment History
                                </NavLink>
                                <NavLink to="advertisement" className={navLinkClass} onClick={() => setIsSidebarOpen(false)}>
                                    <FaBullhorn /> Ask For Advertisement
                                </NavLink>
                            </>
                        )}

                        {/* User Only */}
                        {isUser && (
                            <NavLink to="payment-history" className={navLinkClass} onClick={() => setIsSidebarOpen(false)}>
                                <FaHistory /> Payment History
                            </NavLink>
                        )}
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
                        className="flex items-center gap-3 w-full px-4 py-2 rounded-lg transition hover:bg-accent text-left cursor-pointer"
                    >
                        <FaSignOutAlt /> Logout
                    </button>

                    <p className="text-xs text-center text-accent mt-4">© 2025 MediShop</p>
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
                        <h1 className="text-lg font-semibold text-secondary">Dashboard</h1>
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
