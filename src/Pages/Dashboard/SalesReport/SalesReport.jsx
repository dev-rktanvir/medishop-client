import { useRef, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Logo from "../../../Components/Logo/Logo";

const SalesReport = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [error, setError] = useState("");

    const {
        data: sales = [],
        isFetching,
        refetch,
        error: queryError,
    } = useQuery({
        queryKey: ["sales", { start: startDate, end: endDate }],
        enabled: false,
        queryFn: async ({ queryKey }) => {
            const [, { start, end }] = queryKey;
            if (!start || !end) return [];

            const res = await axiosSecure.get("/orders", {
                params: { start, end },
            });
            return res.data;
        },
    });

    const tableRef = useRef(null);

    const handleSearch = async () => {
        setError("");
        if (!startDate || !endDate) {
            setError("Please select both start and end date.");
            return;
        }
        if (startDate > endDate) {
            setError("Start date cannot be later than end date.");
            return;
        }
        await refetch();
    };

    const handleDownloadPDF = async () => {
        if (!tableRef.current) return;
        try {
            const canvas = await html2canvas(tableRef.current, {
                scale: 2,
                useCORS: true,
            });

            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "mm", "a4");

            const pageWidth = pdf.internal.pageSize.getWidth();
            const margin = 10;
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pageWidth - margin * 2;
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            pdf.addImage(imgData, "PNG", margin, margin, pdfWidth, pdfHeight);
            pdf.save(`sales-report-${startDate}-to-${endDate}.pdf`);
        } catch (err) {
            console.error("PDF generation failed", err);
            setError("PDF generation failed. Try again.");
        }
    };

    const grandTotal = sales.reduce((acc, order) => {
        const orderTotal = order.items.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );
        return acc + orderTotal;
    }, 0);

    return (
        <div className="p-6 bg-white rounded-xl shadow-md">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end gap-4 mb-6">
                <div className="flex flex-col">
                    <label className="text-sm mb-1">Start Date</label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="border px-3 py-2 rounded-md"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm mb-1">End Date</label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="border px-3 py-2 rounded-md"
                    />
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={handleSearch}
                        className="bg-primary cursor-pointer font-bold text-white px-4 py-2 rounded-md hover:opacity-95"
                    >
                        Search
                    </button>

                    <button
                        onClick={() => {
                            setStartDate("");
                            setEndDate("");
                            setError("");
                            queryClient.invalidateQueries(["sales"]);
                        }}
                        className="bg-gray-200 cursor-pointer px-4 py-2 rounded-md"
                    >
                        Reset
                    </button>
                </div>
            </div>

            {error && <p className="text-red-600 mb-4">{error}</p>}
            {queryError && <p className="text-red-600 mb-4">Error fetching data</p>}

            <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-gray-600">
                    Showing {sales.length} order(s) — Grand Total: ${grandTotal.toFixed(2)}
                </p>

                <button
                    onClick={handleDownloadPDF}
                    disabled={sales.length === 0}
                    className={`px-4 py-2 rounded-md text-white cursor-pointer font-bold ${sales.length === 0
                            ? "bg-gray-300 cursor-not-allowed"
                            : "bg-primary hover:bg-secondary"
                        }`}
                >
                    Download PDF
                </button>
            </div>

            {/* Sales Report with Logo */}
            {/* Add w-full and block for responsiveness */}
            <div
                ref={tableRef}
                className="overflow-x-auto w-full block bg-white p-6 rounded-lg border border-gray-200"
            >
                {/* Logo added here */}
                <div className="mb-6 flex items-center justify-between border-b pb-4">
                    <Logo />
                    <div>
                        <h2 className="text-xl font-bold text-gray-700">Sales Report</h2>
                        {startDate && endDate && (
                            <p className="text-sm text-gray-500">
                                {startDate} to {endDate}
                            </p>
                        )}
                    </div>
                </div>

                {/* Add whitespace-nowrap to table for preventing cell wrapping */}
                <table className="min-w-full whitespace-nowrap text-left border border-gray-200 rounded-lg">
                    <thead className="bg-base-200 text-secondary">
                        <tr>
                            <th className="px-4 py-3">#</th>
                            <th className="px-4 py-3">Medicine</th>
                            <th className="px-4 py-3">Company</th>
                            <th className="px-4 py-3">Seller</th>
                            <th className="px-4 py-3">Buyer</th>
                            <th className="px-4 py-3 text-center">Qty</th>
                            <th className="px-4 py-3 text-right">Price</th>
                            <th className="px-4 py-3 text-right">Total</th>
                            <th className="px-4 py-3">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isFetching ? (
                            <tr>
                                <td colSpan="9" className="p-6 text-center text-primary">
                                    Loading...
                                </td>
                            </tr>
                        ) : sales.length === 0 ? (
                            <tr>
                                <td colSpan="9" className="p-6 text-center text-primary">
                                    No records found for the selected date range.
                                </td>
                            </tr>
                        ) : (
                            sales.map((order, orderIdx) =>
                                order.items.map((item, itemIdx) => (
                                    <tr key={item._id || `${orderIdx}-${itemIdx}`} className="border-t">
                                        <td className="px-4 py-3">{orderIdx + 1}</td>
                                        <td className="px-4 py-3">{item.name}</td>
                                        <td className="px-4 py-3">{item.company}</td>
                                        <td className="px-4 py-3">{item.seller}</td>
                                        <td className="px-4 py-3">{order.buyerEmail}</td>
                                        <td className="px-4 py-3 text-center">{item.quantity}</td>
                                        <td className="px-4 py-3 text-right">${item.price.toFixed(2)}</td>
                                        <td className="px-4 py-3 text-right">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </td>
                                        <td className="px-4 py-3">
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))
                            )
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SalesReport;
