import React from 'react';
import { Link } from 'react-router';

const Logo = () => {
    return (
        <Link to="/" className="flex items-center space-x-2">
            <img
                src="favicon.png"
                alt="MediShop logo"
                className="w-8 h-8"
            />
            <span className="text-xl font-bold text-primary">MediShop</span>
        </Link>
    );
};

export default Logo;