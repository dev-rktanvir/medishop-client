import { useRef } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";
import Logo from "../../Components/Logo/Logo";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const InvoicePage = () => {
    const { id } = useParams();
    const componentRef = useRef();
    const axiosSecure = useAxiosSecure();

    const {
        data: order,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["order", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/orders/${id}`);
            return res.data;
        },
        enabled: !!id,
    });

    const handleDownload = async () => {
        const element = componentRef.current;

        // Capture DOM as canvas
        const canvas = await html2canvas(element, {
            scale: 2,
            useCORS: true, // external images
        });

        const imgData = canvas.toDataURL("image/png");

        // Generate PDF
        const pdf = new jsPDF("p", "mm", "a4");
        const pageWidth = pdf.internal.pageSize.getWidth();
        const margin = 10;
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pageWidth - margin * 2;
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, "PNG", margin, margin, pdfWidth, pdfHeight);
        pdf.save(`invoice-${id}.pdf`);
    };

    if (isLoading) return <p className="text-center mt-10">Loading......</p>;
    if (isError) return <p className="text-center text-red-500 mt-10">{error.message}</p>;
    if (!order) return <p className="text-center text-red-500 mt-10">No order found</p>;

    const {
        buyerName,
        buyerMobile,
        totalAmount,
        deliveryCharge,
        items = [],
    } = order;

    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8">
                {/* Printable content */}
                <div
                    ref={componentRef}
                    className="space-y-6"
                    style={{ backgroundColor: "white", color: "black" }} // fallback colors
                >
                    <div className="flex items-center justify-between border-b pb-4">
                        <Logo />
                        <div>
                            <h2 className="text-xl font-bold text-gray-700">Invoice</h2>
                            <p className="text-sm text-gray-500">Invoice ID: {id}</p>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-700 mb-2">Billed To:</h3>
                        <p className="text-gray-600">{buyerName}</p>
                        <p className="text-gray-600">{buyerMobile}</p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-700 mb-2">Purchase Details</h3>
                        <table className="w-full border-collapse border">
                            <thead>
                                <tr className="bg-gray-200 text-left">
                                    <th className="border p-2">Item</th>
                                    <th className="border p-2">Company</th>
                                    <th className="border p-2">Qty</th>
                                    <th className="border p-2">Price</th>
                                    <th className="border p-2">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item) => (
                                    <tr key={item._id}>
                                        <td className="border p-2">{item.name}</td>
                                        <td className="border p-2">{item.company}</td>
                                        <td className="border p-2">{item.quantity}</td>
                                        <td className="border p-2">${item.price}</td>
                                        <td className="border p-2">${item.quantity * item.price}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex justify-end">
                        <div className="text-right">
                            <p className="font-semibold text-gray-700">Sub Total: ${subtotal}</p>
                            <p className="font-semibold text-gray-700">Delivery Charge: ${deliveryCharge}</p>
                            <p className="font-bold text-lg text-gray-900">Grand Total: ${totalAmount}</p>
                        </div>
                    </div>
                </div>

                {/* Download PDF Button */}
                <div className="mt-6 text-right">
                    <button
                        onClick={handleDownload}
                        className="bg-primary text-white px-6 py-2 cursor-pointer rounded-md hover:bg-secondary"
                    >
                        Download PDF
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InvoicePage;
