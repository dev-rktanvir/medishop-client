import React from 'react';

const CartItem = ({ item }) => {
    return (
        <div className="flex items-center border-b py-4">
            {/* Image on the left */}
            <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded mr-4"
            />

            {/* Details on the right */}
            <div className="flex justify-between w-full">
                <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                </div>
                <p className="font-semibold">${item.price * item.quantity}</p>
            </div>
        </div>
    );
};

export default CartItem;
