'use client';

import { forwardRef, useRef } from 'react';
import { format } from 'date-fns';

interface GSTInvoiceProps {
    order: {
        id: string;
        shortId: string;
        createdAt: string;
        items: Array<{
            name: string;
            quantity: number;
            price: number;
            modifiers?: string[];
        }>;
        totalAmount: number;
        discountAmount?: number;
        paymentMethod: string;
        notes?: string;
        tableNumber?: string;
    };
    shop: {
        name: string;
        address?: string;
        phone?: string;
        email?: string;
        gstNumber?: string;
        logo?: string;
    };
    customerName?: string;
    customerPhone?: string;
}

// GST rates for India
const CGST_RATE = 2.5;
const SGST_RATE = 2.5;

export const GSTInvoice = forwardRef<HTMLDivElement, GSTInvoiceProps>(
    ({ order, shop, customerName, customerPhone }, ref) => {
        const subtotal = order.totalAmount / (1 + (CGST_RATE + SGST_RATE) / 100);
        const cgst = subtotal * (CGST_RATE / 100);
        const sgst = subtotal * (SGST_RATE / 100);

        return (
            <div ref={ref} className="bg-white p-8 max-w-2xl mx-auto font-mono text-sm">
                {/* Header */}
                <div className="text-center border-b-2 border-black pb-4 mb-4">
                    {shop.logo && (
                        <img src={shop.logo} alt={shop.name} className="w-16 h-16 mx-auto mb-2 object-contain" />
                    )}
                    <h1 className="text-2xl font-bold">{shop.name}</h1>
                    {shop.address && <p className="text-xs">{shop.address}</p>}
                    {shop.phone && <p className="text-xs">Tel: {shop.phone}</p>}
                    {shop.gstNumber && (
                        <p className="text-xs font-bold mt-2">GSTIN: {shop.gstNumber}</p>
                    )}
                </div>

                {/* Invoice Details */}
                <div className="flex justify-between mb-4 text-xs">
                    <div>
                        <p><strong>Invoice No:</strong> {order.shortId}</p>
                        <p><strong>Date:</strong> {format(new Date(order.createdAt), 'dd/MM/yyyy')}</p>
                        <p><strong>Time:</strong> {format(new Date(order.createdAt), 'HH:mm:ss')}</p>
                    </div>
                    <div className="text-right">
                        {customerName && <p><strong>Customer:</strong> {customerName}</p>}
                        {customerPhone && <p><strong>Phone:</strong> {customerPhone}</p>}
                        {order.tableNumber && <p><strong>Table:</strong> {order.tableNumber}</p>}
                    </div>
                </div>

                <div className="text-center mb-4">
                    <p className="text-lg font-bold border-y border-black py-2">TAX INVOICE</p>
                </div>

                {/* Items Table */}
                <table className="w-full mb-4 text-xs">
                    <thead>
                        <tr className="border-b border-black">
                            <th className="text-left py-2">Item</th>
                            <th className="text-center">Qty</th>
                            <th className="text-right">Rate</th>
                            <th className="text-right">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order.items.map((item, idx) => (
                            <tr key={idx} className="border-b border-dashed">
                                <td className="py-2">
                                    {item.name}
                                    {item.modifiers && item.modifiers.length > 0 && (
                                        <div className="text-[10px] text-gray-500">
                                            + {item.modifiers.join(', ')}
                                        </div>
                                    )}
                                </td>
                                <td className="text-center">{item.quantity}</td>
                                <td className="text-right">₹{item.price.toFixed(2)}</td>
                                <td className="text-right">₹{(item.price * item.quantity).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Tax Breakdown */}
                <div className="border-t border-black pt-2 space-y-1 text-xs">
                    <div className="flex justify-between">
                        <span>Subtotal (excl. tax)</span>
                        <span>₹{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>CGST @ {CGST_RATE}%</span>
                        <span>₹{cgst.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>SGST @ {SGST_RATE}%</span>
                        <span>₹{sgst.toFixed(2)}</span>
                    </div>
                    {order.discountAmount && order.discountAmount > 0 && (
                        <div className="flex justify-between text-green-600">
                            <span>Discount</span>
                            <span>-₹{order.discountAmount.toFixed(2)}</span>
                        </div>
                    )}
                    <div className="flex justify-between font-bold text-lg border-t border-black pt-2 mt-2">
                        <span>TOTAL</span>
                        <span>₹{order.totalAmount.toFixed(2)}</span>
                    </div>
                </div>

                {/* Payment Info */}
                <div className="mt-4 p-2 bg-gray-100 text-xs">
                    <div className="flex justify-between">
                        <span>Payment Method:</span>
                        <span className="font-bold">{order.paymentMethod}</span>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-6 text-center text-xs border-t pt-4">
                    <p className="font-bold">Thank you for your visit!</p>
                    <p className="text-[10px] mt-2 text-gray-500">
                        This is a computer-generated invoice. No signature required.
                    </p>
                    {shop.email && <p className="text-[10px] text-gray-500">{shop.email}</p>}
                </div>

                {/* QR Code placeholder for digital verification */}
                <div className="mt-4 flex justify-center">
                    <div className="w-20 h-20 border-2 border-dashed border-gray-300 flex items-center justify-center text-[8px] text-gray-400">
                        QR Code
                    </div>
                </div>
            </div>
        );
    }
);

GSTInvoice.displayName = 'GSTInvoice';

// Print function
export function printGSTInvoice(elementId: string) {
    const element = document.getElementById(elementId);
    if (!element) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>GST Invoice</title>
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body { font-family: 'Courier New', monospace; font-size: 12px; }
                @media print {
                    @page { size: 80mm auto; margin: 5mm; }
                }
            </style>
        </head>
        <body>
            ${element.innerHTML}
            <script>window.print(); window.close();</script>
        </body>
        </html>
    `);
    printWindow.document.close();
}

// Export to PDF (uses browser print to PDF)
export function exportGSTInvoicePDF(elementId: string) {
    printGSTInvoice(elementId);
}
