import { useState } from "react";
import { Link, NavLink } from "react-router";
import { FaShoppingCart } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import Logo from "../../Logo/Logo";
import CartIcon from "../../CartIcon/CartIcon";

const DesktopNavbar = () => {
    const { user, logoutUser } = useAuth();
    const [openProfileMenu, setOpenProfileMenu] = useState(false);

    const handleLogout = () => {
        logoutUser();
        setOpenProfileMenu(false);
    };

    // Common navlinks For All visitors
    const commonLinks = [
        { name: "Home", path: "/" },
        { name: "Shop", path: "/shop" },
        { name: "Contact", path: "/contact" },
    ];

    // Logged-in user extra navlinks
    const userLinks = [
        { name: "Request Order", path: "/req-order" },
        { name: "Upload Prescription", path: "/upload-prescription" },
    ];

    // Dropdown Option Links
    const profileMenuItems = [
        { name: "Update Profile", path: "/update-profile" },
        { name: "Dashboard", path: "/dashboard" },
        { name: "Logout", action: "logout" },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                {/* Logo */}
                <Logo />

                {/* Navigation Links */}
                <div className="flex items-center space-x-6">
                    {/* Common + User navlinks */}
                    {[...commonLinks, ...(user ? userLinks : [])].map((link) => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            className={({ isActive }) =>
                                isActive ? "text-primary font-semibold" : "text-secondary"
                            }
                        >
                            {link.name}
                        </NavLink>
                    ))}

                    {/* Cart */}
                    <Link to="/cart" className="relative">
                        <CartIcon />
                    </Link>

                    {/* Language Selector */}
                    <select className="border rounded-md border-primary text-secondary px-2 py-1 text-sm">
                        <option>EN</option>
                        <option>BN</option>
                        <option>AR</option>
                    </select>

                    {/* Authentication / Profile */}
                    {!user ? (
                        <Link
                            to="/login"
                            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary"
                        >
                            Join Us
                        </Link>
                    ) : (
                        <div className="relative">
                            {/* Profile Picture */}
                            <img
                                src={user.photoURL}
                                alt="profile"
                                className="w-12 h-12 rounded-full cursor-pointer"
                                onClick={() => setOpenProfileMenu(!openProfileMenu)}
                            />

                            {/* Profile Dropdown Menu */}
                            {openProfileMenu && (
                                <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg py-2 z-50">
                                    {profileMenuItems.map((item) =>
                                        item.action === "logout" ? (
                                            <button
                                                key={item.name}
                                                onClick={handleLogout}
                                                className="block w-full text-left px-4 py-2 text-secondary hover:bg-primary hover:text-white"
                                            >
                                                {item.name}
                                            </button>
                                        ) : (
                                            <Link
                                                key={item.path}
                                                to={item.path}
                                                className="block px-4 py-2 text-secondary hover:bg-primary hover:text-white"
                                                onClick={() => setOpenProfileMenu(false)}
                                            >
                                                {item.name}
                                            </Link>
                                        )
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default DesktopNavbar;
