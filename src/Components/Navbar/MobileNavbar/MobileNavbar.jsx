import { useState } from "react";
import { Link, NavLink } from "react-router";
import {
    FaBars,
    FaTimes,
    FaFacebook,
    FaTwitter,
    FaLinkedin,
    FaInstagram,
} from "react-icons/fa";
import Logo from "../../Logo/Logo";
import useAuth from "../../../hooks/useAuth";
import CartIcon from "../../CartIcon/CartIcon";

const commonLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Contact", path: "/contact" },
];

const userLinks = [
    { name: "Request Order", path: "/req-order" },
    { name: "Upload Prescription", path: "/upload-prescription" },
];

const MobileNavbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    const { user, logoutUser } = useAuth();

    const handleLogout = () => {
        logoutUser();
        setUserMenuOpen(false);
        setMenuOpen(false);
    };

    // Profile menu item conditionally
    const profileMenuItems = !user
        ? [
            { name: "Sign In", path: "/login" },
            { name: "Register", path: "/register" },
            { name: "My Account", path: "/dashboard" },
        ]
        : [
            { name: "Update Profile", path: "/update-profile" },
            { name: "Dashboard", path: "/dashboard" },
            { name: "Logout", action: "logout" },
        ];

    const socialLinks = [
        { icon: <FaFacebook />, href: "#" },
        { icon: <FaTwitter />, href: "#" },
        { icon: <FaLinkedin />, href: "#" },
        { icon: <FaInstagram />, href: "#" },
    ];

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50 lg:hidden">
            <div className="flex flex-col items-center py-3">
                <Logo />

                <div className="flex items-center justify-center space-x-4 mt-3">
                    {/* Profile/User Icon */}
                    <div className="relative">
                        {user ? (
                            <img
                                src={user.photoURL}
                                alt="profile"
                                className="w-10 h-10 rounded-full border cursor-pointer"
                                onClick={() => setUserMenuOpen(!userMenuOpen)}
                            />
                        ) : (
                            <button
                                onClick={() => setUserMenuOpen(!userMenuOpen)}
                                className="w-10 h-10 flex items-center justify-center border rounded-lg"
                            >
                                <span className="text-lg">👤</span>
                            </button>
                        )}

                        {/* Dropdown Menu */}
                        <div
                            className={`absolute top-12 left-1/2 -translate-x-1/2 w-40 bg-white shadow-lg rounded-lg py-2 transform transition-all duration-200 ease-in-out ${userMenuOpen
                                    ? "opacity-100 scale-100"
                                    : "opacity-0 scale-95 pointer-events-none"
                                }`}
                        >
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
                                        onClick={() => setUserMenuOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                )
                            )}
                        </div>
                    </div>

                    {/* Cart Icon */}
                    <Link
                        to="/cart"
                        className="w-10 h-10 flex items-center justify-center border rounded-lg"
                    >
                        <CartIcon />
                    </Link>

                    {/* Hamburger Icon */}
                    <button
                        onClick={() => setMenuOpen(true)}
                        className="w-10 h-10 flex items-center justify-center border rounded-lg"
                    >
                        <FaBars size={18} />
                    </button>
                </div>
            </div>

            {/* Side Menu */}
            <div
                className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${menuOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="flex items-center justify-between p-4 border-b">
                    <Logo />
                    <button className="cursor-pointer" onClick={() => setMenuOpen(false)}>
                        <FaTimes size={20} />
                    </button>
                </div>

                {/* Common + user links */}
                <div className="flex flex-col space-y-4 p-4">
                    {[...commonLinks, ...(user ? userLinks : [])].map((link) => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            className={({ isActive }) =>
                                isActive ? "text-primary font-semibold" : "text-secondary"
                            }
                            onClick={() => setMenuOpen(false)}
                        >
                            {link.name}
                        </NavLink>
                    ))}
                </div>

                {/* Social Icons */}
                <div className="flex justify-center space-x-3 mt-6">
                    {socialLinks.map((social, idx) => (
                        <a
                            key={idx}
                            href={social.href}
                            className="w-8 h-8 flex items-center justify-center border rounded-lg"
                        >
                            {social.icon}
                        </a>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default MobileNavbar;
