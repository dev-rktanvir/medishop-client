import React from 'react';

const OrderSummary = ({ order }) => {
    if (!order) {
        return <p>Loading order summary...</p>;
    }

    const { items, totalAmount, deliveryCharge, shipping } = order;
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="p-4 space-y-10">
            <h2 className="text-xl font-semibold">Order Summary</h2>

            <div className='space-y-2'>
                <h3 className="inline-block font-bold text-primary">Items:</h3>
                <ul className="list-disc ml-5">
                    {items.map(item => (
                        <li key={item._id} className="mb-2">
                            {item.name}
                        </li>
                    ))}
                </ul>
            </div>

            <div className='space-y-2 border-2 border-primary p-4 rounded-lg'>
                <h3 className="inline-block font-bold text-primary">Cost:</h3>
                <div className="flex justify-between">
                    <span>Items Total:</span>
                    <span>${subtotal}</span>
                </div>
                <div className="flex justify-between">
                    <span>Delivery Charge:</span>
                    <span>${deliveryCharge}</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                    <span>Total Order:</span>
                    <span>${totalAmount}</span>
                </div>
            </div>

            <div className='space-y-2'>
                <h3 className="inline-block font-bold text-primary">Shipping To:</h3>
                <p><span className='font-bold'>Customer Name</span>: {shipping.name}</p>
                <p><span className='font-bold'>Address:</span> {shipping.address}</p>
                <p><span className='font-bold'>Mobile No:</span> {shipping.phone}</p>
            </div>
        </div>
    );
};

export default OrderSummary;
