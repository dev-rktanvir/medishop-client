import { useState } from "react";
import { Link, NavLink } from "react-router";
import { FaShoppingCart, FaBars, FaTimes, FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import Logo from "../../Logo/Logo";
import useAuth from "../../../hooks/useAuth";

const MobileNavbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    const {user, logoutUser} = useAuth();

    const handleLogout = () => {
        logoutUser()
        setUserMenuOpen(false);
    };

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50 lg:hidden">
            <div className="flex flex-col items-center py-3">
                {/* Logo */}
                <Logo />

                {/* Icons Row */}
                <div className="flex items-center justify-center space-x-4 mt-3">
                    {/* User/Profile */}
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

                        {/* Dropdown with Transition */}
                        <div
                            className={`absolute top-12 left-1/2 -translate-x-1/2 w-40 bg-white shadow-lg rounded-lg py-2 transform transition-all duration-200 ease-in-out ${userMenuOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                                }`}
                        >
                            {!user ? (
                                <>
                                    <Link
                                        to="/signin"
                                        className="block px-4 py-2 text-secondary hover:bg-primary hover:text-white"
                                        onClick={() => setUserMenuOpen(false)}
                                    >
                                        Sign In
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="block px-4 py-2 text-secondary hover:bg-primary hover:text-white"
                                        onClick={() => setUserMenuOpen(false)}
                                    >
                                        Register
                                    </Link>
                                    <Link
                                        to="/account"
                                        className="block px-4 py-2 text-secondary hover:bg-primary hover:text-white"
                                        onClick={() => setUserMenuOpen(false)}
                                    >
                                        My Account
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to="/update-profile"
                                        className="block px-4 py-2 text-secondary hover:bg-primary hover:text-white"
                                        onClick={() => setUserMenuOpen(false)}
                                    >
                                        Update Profile
                                    </Link>
                                    <Link
                                        to="/dashboard"
                                        className="block px-4 py-2 text-secondary hover:bg-primary hover:text-white"
                                        onClick={() => setUserMenuOpen(false)}
                                    >
                                        Dashboard
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full text-left px-4 py-2 text-secondary hover:bg-primary hover:text-white"
                                    >
                                        Logout
                                    </button>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Cart */}
                    <button
                        onClick={() => setCartOpen(true)}
                        className="w-10 h-10 flex items-center justify-center border rounded-lg"
                    >
                        <FaShoppingCart size={18} />
                    </button>

                    {/* Hamburger */}
                    <button
                        onClick={() => setMenuOpen(true)}
                        className="w-10 h-10 flex items-center justify-center border rounded-lg"
                    >
                        <FaBars size={18} />
                    </button>
                </div>
            </div>

            {/* Cart Popup (Right Side) */}
            <div
                className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${cartOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="flex items-center justify-between p-4 border-b">
                    <h3 className="text-lg font-semibold">Your Cart</h3>
                    <button onClick={() => setCartOpen(false)}>
                        <FaTimes size={20} />
                    </button>
                </div>
                <div className="p-4">
                    <p className="text-sm text-gray-500">Cart items will appear here...</p>
                </div>
            </div>

            {/* Menu Popup (Left Side) */}
            <div
                className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${menuOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="flex items-center justify-between p-4 border-b">
                    <Logo />
                    <button onClick={() => setMenuOpen(false)}>
                        <FaTimes size={20} />
                    </button>
                </div>
                <div className="flex flex-col space-y-4 p-4">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? "text-primary font-semibold" : "text-secondary"
                        }
                        onClick={() => setMenuOpen(false)}
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/shop"
                        className={({ isActive }) =>
                            isActive ? "text-primary font-semibold" : "text-secondary"
                        }
                        onClick={() => setMenuOpen(false)}
                    >
                        Shop
                    </NavLink>
                </div>

                {/* Social Icons */}
                <div className="flex justify-center space-x-3 mt-6">
                    <a href="#" className="w-8 h-8 flex items-center justify-center border rounded-lg">
                        <FaFacebook />
                    </a>
                    <a href="#" className="w-8 h-8 flex items-center justify-center border rounded-lg">
                        <FaTwitter />
                    </a>
                    <a href="#" className="w-8 h-8 flex items-center justify-center border rounded-lg">
                        <FaLinkedin />
                    </a>
                    <a href="#" className="w-8 h-8 flex items-center justify-center border rounded-lg">
                        <FaInstagram />
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default MobileNavbar;
