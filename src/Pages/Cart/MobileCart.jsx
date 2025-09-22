import { AiOutlineClose } from 'react-icons/ai';

const MobileCart = ({ cartItems, increaseQty, decreaseQty, removeItem }) => {
    return (
        <div className="flex flex-col gap-5">
            {cartItems.map((item) => (
                <div
                    key={item._id}
                    className="border rounded-xl p-4 shadow-md bg-gradient-to-br from-white to-gray-50 relative overflow-hidden"
                >
                    {/* Remove Button */}
                    <button
                        onClick={() => removeItem(item._id)}
                        className="absolute top-3 right-3 text-red-500 hover:text-red-700"
                    >
                        <AiOutlineClose className="w-5 h-5" />
                    </button>

                    <div className="flex gap-4">
                        {/* Image */}
                        <div className="w-24 h-24 flex-shrink-0">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-contain rounded-lg border"
                            />
                        </div>

                        {/* Info Section */}
                        <div className="flex-1 flex flex-col justify-between">
                            {/* Name & Company */}
                            <div className="mb-2">
                                <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                                <p className="text-sm text-gray-500">{item.company}</p>
                            </div>

                            {/* Price & Quantity */}
                            <div className="flex justify-between items-center mt-auto">
                                <div className="text-sm text-gray-600">
                                    <p>Price: <span className="font-medium text-gray-800">৳ {item.price}</span></p>
                                    <p>Total: <span className="font-semibold text-primary">৳ {item.price * item.quantity}</span></p>
                                </div>

                                {/* Quantity Controls */}
                                <div className="flex items-center gap-2 bg-gray-100 px-2 py-1 rounded-full">
                                    <button
                                        onClick={() => decreaseQty(item._id)}
                                        className="w-7 h-7 text-lg bg-gray-200 rounded-full hover:bg-gray-300"
                                    >
                                        -
                                    </button>
                                    <span className="font-semibold text-gray-700">{item.quantity}</span>
                                    <button
                                        onClick={() => increaseQty(item._id)}
                                        className="w-7 h-7 text-lg bg-gray-200 rounded-full hover:bg-gray-300"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MobileCart;
