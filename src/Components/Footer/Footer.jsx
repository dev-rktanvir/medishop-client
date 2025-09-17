import { Link } from "react-router";
import {
    FaFacebook,
    FaTwitter,
    FaLinkedin,
    FaInstagram,
    FaMapMarkerAlt,
    FaEnvelope,
    FaPhone,
} from "react-icons/fa";
import Logo from "../Logo/Logo";

const Footer = () => {
    return (
        <footer className="bg-gray-100 text-secondary pt-10">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Logo + Mission */}
                <div>
                    <Logo />
                    <p className="mt-4 text-sm leading-6">
                        We aim to provide safe, affordable, and authentic medicines to our
                        customers with fast delivery and reliable service.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <Link to="/" className="hover:text-primary">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/shop" className="hover:text-primary">
                                Shop
                            </Link>
                        </li>
                        <li>
                            <Link to="/cart" className="hover:text-primary">
                                Cart
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard" className="hover:text-primary">
                                Dashboard
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Customer Service */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <Link to="/shipping" className="hover:text-primary">
                                Shipping Policy
                            </Link>
                        </li>
                        <li>
                            <Link to="/returns" className="hover:text-primary">
                                Returns & Refunds
                            </Link>
                        </li>
                        <li>
                            <Link to="/faq" className="hover:text-primary">
                                FAQs
                            </Link>
                        </li>
                        <li>
                            <Link to="/contact" className="hover:text-primary">
                                Contact Us
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Get in Touch</h3>
                    <p className="flex items-center text-sm mb-2">
                        <FaMapMarkerAlt className="mr-2 text-primary" />
                        123 Health Street, Dhaka, Bangladesh
                    </p>
                    <p className="flex items-center text-sm mb-2">
                        <FaEnvelope className="mr-2 text-primary" />
                        support@medishop.com
                    </p>
                    <p className="flex items-center text-sm mb-2">
                        <FaPhone className="mr-2 text-primary" />
                        +880 1234 567890
                    </p>

                    {/* Social Icons */}
                    <div className="flex space-x-3 mt-4">
                        <a
                            href="#"
                            className="w-8 h-8 flex items-center justify-center border rounded-lg hover:bg-primary hover:text-white transition"
                        >
                            <FaFacebook />
                        </a>
                        <a
                            href="#"
                            className="w-8 h-8 flex items-center justify-center border rounded-lg hover:bg-primary hover:text-white transition"
                        >
                            <FaTwitter />
                        </a>
                        <a
                            href="#"
                            className="w-8 h-8 flex items-center justify-center border rounded-lg hover:bg-primary hover:text-white transition"
                        >
                            <FaLinkedin />
                        </a>
                        <a
                            href="#"
                            className="w-8 h-8 flex items-center justify-center border rounded-lg hover:bg-primary hover:text-white transition"
                        >
                            <FaInstagram />
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t mt-8 py-4">
                <p className="text-center text-xs text-gray-500">
                    © {new Date().getFullYear()} MediShop. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
