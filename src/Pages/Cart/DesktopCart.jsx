import { AiOutlineClose } from 'react-icons/ai';

const DesktopCart = ({ cartItems, increaseQty, decreaseQty, removeItem }) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full border rounded-lg">
                <thead className="bg-gray-100 text-left">
                    <tr>
                        <th className="p-3">Name</th>
                        <th className="p-3">Company</th>
                        <th className="p-3 text-center">Price</th>
                        <th className="p-3 text-center">Quantity</th>
                        <th className="p-3 text-center">Total</th>
                        <th className="p-3 text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map((item) => (
                        <tr key={item._id} className="border-t">
                            <td className="p-3">{item.name}</td>
                            <td className="p-3">{item.company}</td>
                            <td className="p-3 text-center">৳ {item.price}</td>
                            <td className="p-3 text-center">
                                <div className="flex items-center justify-center gap-2">
                                    <button
                                        onClick={() => decreaseQty(item._id)}
                                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                                    >
                                        -
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button
                                        onClick={() => increaseQty(item._id)}
                                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                                    >
                                        +
                                    </button>
                                </div>
                            </td>
                            <td className="p-3 text-center">
                                ৳ {item.price * item.quantity}
                            </td>
                            <td className="p-3 text-center">
                                <button
                                    onClick={() => removeItem(item._id)}
                                    className="text-red-500 hover:text-red-700 cursor-pointer"
                                >
                                    <AiOutlineClose className="w-5 h-5 inline" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DesktopCart;
