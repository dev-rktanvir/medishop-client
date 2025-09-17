import { useState } from "react";
import { Link, NavLink } from "react-router";
import { FaShoppingCart } from "react-icons/fa";
import Logo from "../../Logo/Logo";

const DesktopNavbar = () => {
    // dummy auth state
    const [user, setUser] = useState({ name: "Tanvir", photoURL: "https://i.pravatar.cc/40" });
    // user = { name: "Tanvir", photoURL: "https://i.pravatar.cc/40" }

    const [openProfileMenu, setOpenProfileMenu] = useState(false);

    const handleLogout = () => {
        setUser(null);
        setOpenProfileMenu(false);
    };

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                {/* Logo + Website Name */}
                <Logo></Logo>

                {/* Menu Items */}
                <div className="flex items-center space-x-6">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? "text-primary font-semibold" : "text-secondary"
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/shop"
                        className={({ isActive }) =>
                            isActive ? "text-primary font-semibold" : "text-secondary"
                        }
                    >
                        Shop
                    </NavLink>

                    {/* Cart Icon */}
                    <Link to="/cart" className="relative">
                        <FaShoppingCart size={20} />
                        <span className="absolute -top-2 -right-2 bg-primary text-white text-xs px-1 rounded-full">
                            2
                        </span>
                    </Link>

                    {/* Language Dropdown */}
                    <select className="border rounded-md border-primary text-secondary px-2 py-1 text-sm">
                        <option>EN</option>
                        <option>BN</option>
                        <option>AR</option>
                    </select>

                    {/* Auth Buttons */}
                    {!user ? (
                        <Link
                            to="/join"
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
                                className="w-8 h-8 rounded-full cursor-pointer"
                                onClick={() => setOpenProfileMenu(!openProfileMenu)}
                            />

                            {/* Dropdown Menu */}
                            {openProfileMenu && (
                                <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg py-2">
                                    <Link
                                        to="/update-profile"
                                        className="block px-4 py-2 text-secondary hover:bg-primary hover:text-white"
                                        onClick={() => setOpenProfileMenu(false)}
                                    >
                                        Update Profile
                                    </Link>
                                    <Link
                                        to="/dashboard"
                                        className="block px-4 py-2 text-secondary hover:bg-primary hover:text-white"
                                        onClick={() => setOpenProfileMenu(false)}
                                    >
                                        Dashboard
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full text-left px-4 py-2 text-secondary hover:bg-primary hover:text-white"
                                    >
                                        Logout
                                    </button>
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
