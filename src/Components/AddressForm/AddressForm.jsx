import React, { forwardRef, useEffect, useImperativeHandle } from 'react';
import { useForm } from 'react-hook-form';

const AddressForm = forwardRef(({ onSubmit, onDeliveryCostChange }, ref) => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const deliveryLocation = watch('location');
    const deliveryCost = deliveryLocation === 'inside' ? 60 : deliveryLocation === 'outside' ? 100 : 0;

    useEffect(() => {
        if (onDeliveryCostChange) {
            onDeliveryCostChange(deliveryCost);
        }
    }, [deliveryCost, onDeliveryCostChange]);

    const handleFormSubmit = (data) => {
        const finalData = {
            ...data,
            deliveryCost,
        };
        onSubmit(finalData);
    };

    useImperativeHandle(ref, () => ({
        submit: () => {
            document.getElementById('address-hidden-submit')?.click();
        },
    }));

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            {/* Name and Phone */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                    <input
                        type="text"
                        placeholder="Full Name"
                        className="w-full p-3 border rounded"
                        {...register('name', { required: 'Name is required' })}
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                </div>

                <div className="flex-1">
                    <input
                        type="tel"
                        placeholder="Phone Number"
                        className="w-full p-3 border rounded"
                        {...register('phone', { required: 'Phone number is required' })}
                    />
                    {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                </div>
            </div>

            {/* Address */}
            <div>
                <textarea
                    placeholder="Address and Delivery Instructions"
                    rows={4}
                    className="w-full p-3 border rounded resize-none"
                    {...register('address', { required: 'Address and instructions are required' })}
                ></textarea>
                {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
            </div>

            {/* Delivery Location */}
            <div className="space-y-2">
                <p className="font-medium">Delivery Location:</p>
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
                    <label className="flex items-center gap-2">
                        <input
                            type="radio"
                            value="inside"
                            {...register('location', { required: 'Please select a delivery location' })}
                        />
                        Inside Dhaka
                    </label>
                    <label className="flex items-center gap-2">
                        <input
                            type="radio"
                            value="outside"
                            {...register('location', { required: 'Please select a delivery location' })}
                        />
                        Outside Dhaka
                    </label>
                </div>
                {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
            </div>

            {/* Delivery Cost Display */}
            {deliveryLocation && (
                <div className="text-sm text-gray-700">
                    Delivery Cost: <span className="font-semibold">৳{deliveryCost}</span>
                </div>
            )}

            {/* Hidden submit button for parent trigger */}
            <button type="submit" id="address-hidden-submit" className="hidden"></button>
        </form>
    );
});

export default AddressForm;
