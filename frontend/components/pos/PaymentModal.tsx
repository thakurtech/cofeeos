'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Smartphone, Banknote, CheckCircle2, Printer, QrCode, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useShop } from '@/lib/auth-context';

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    totalAmount: number;
    onPaymentComplete: (paymentMethod: 'UPI' | 'CASH', amountReceived?: number) => void;
}

export function PaymentModal({ isOpen, onClose, totalAmount, onPaymentComplete }: PaymentModalProps) {
    const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'CASH' | null>(null);
    const [cashReceived, setCashReceived] = useState('');
    const [upiConfirmed, setUpiConfirmed] = useState(false);
    const [processing, setProcessing] = useState(false);
    const shop = useShop();

    const cashAmount = parseFloat(cashReceived) || 0;
    const change = cashAmount - totalAmount;

    const handleConfirmPayment = async () => {
        if (!paymentMethod) return;

        setProcessing(true);

        // Simulate brief delay for UX
        await new Promise(r => setTimeout(r, 500));

        if (paymentMethod === 'CASH') {
            onPaymentComplete('CASH', cashAmount);
        } else {
            onPaymentComplete('UPI');
        }

        setProcessing(false);
        resetState();
    };

    const resetState = () => {
        setPaymentMethod(null);
        setCashReceived('');
        setUpiConfirmed(false);
    };

    const handleClose = () => {
        resetState();
        onClose();
    };

    // Generate UPI QR URL (using UPI deep link format)
    const upiId = shop?.upiId || 'demo@upi';
    const shopName = shop?.name || 'CaféOS';
    const upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(shopName)}&am=${totalAmount}&cu=INR`;

    // Use a QR code API to generate the QR image
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiUrl)}`;

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={handleClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
                    onClick={e => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-[#BF5700] to-[#8B4513] p-6 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-bold">Complete Payment</h2>
                                <p className="text-white/80 text-sm mt-1">Order Total</p>
                            </div>
                            <button onClick={handleClose} className="p-2 hover:bg-white/20 rounded-full transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="text-4xl font-bold mt-4">₹{totalAmount.toFixed(2)}</div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        {!paymentMethod ? (
                            // Payment Method Selection
                            <div className="space-y-4">
                                <p className="text-sm text-[#5C4033] text-center mb-6">Select payment method</p>

                                <button
                                    onClick={() => setPaymentMethod('UPI')}
                                    className="w-full p-4 rounded-2xl border-2 border-[#e8dfd6] hover:border-[#BF5700] hover:bg-[#fef9f3] transition-all flex items-center gap-4 group"
                                >
                                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white shadow-lg">
                                        <QrCode className="w-7 h-7" />
                                    </div>
                                    <div className="text-left flex-1">
                                        <div className="font-bold text-[#2B1A12] text-lg">UPI Payment</div>
                                        <div className="text-sm text-[#5C4033]">Scan QR code to pay</div>
                                    </div>
                                    <Smartphone className="w-5 h-5 text-[#BF5700] opacity-0 group-hover:opacity-100 transition-opacity" />
                                </button>

                                <button
                                    onClick={() => setPaymentMethod('CASH')}
                                    className="w-full p-4 rounded-2xl border-2 border-[#e8dfd6] hover:border-[#BF5700] hover:bg-[#fef9f3] transition-all flex items-center gap-4 group"
                                >
                                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white shadow-lg">
                                        <Banknote className="w-7 h-7" />
                                    </div>
                                    <div className="text-left flex-1">
                                        <div className="font-bold text-[#2B1A12] text-lg">Cash Payment</div>
                                        <div className="text-sm text-[#5C4033]">Calculate change</div>
                                    </div>
                                </button>
                            </div>
                        ) : paymentMethod === 'UPI' ? (
                            // UPI Payment Flow
                            <div className="text-center space-y-6">
                                <div className="relative inline-block">
                                    <div className="bg-white p-4 rounded-2xl border-2 border-[#e8dfd6] shadow-lg">
                                        <img
                                            src={qrCodeUrl}
                                            alt="UPI QR Code"
                                            className="w-48 h-48 mx-auto"
                                        />
                                    </div>
                                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#BF5700] text-white text-xs px-3 py-1 rounded-full font-medium">
                                        Scan to Pay
                                    </div>
                                </div>

                                <div className="text-sm text-[#5C4033]">
                                    <p className="font-medium">UPI ID: <span className="text-[#2B1A12]">{upiId}</span></p>
                                    <p className="mt-1">Scan with any UPI app: GPay, PhonePe, Paytm</p>
                                </div>

                                <div className="pt-4 border-t border-[#e8dfd6]">
                                    <label className="flex items-center gap-3 justify-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={upiConfirmed}
                                            onChange={(e) => setUpiConfirmed(e.target.checked)}
                                            className="w-5 h-5 rounded border-[#BF5700] text-[#BF5700] focus:ring-[#BF5700]"
                                        />
                                        <span className="text-[#2B1A12] font-medium">Payment received</span>
                                    </label>
                                </div>

                                <div className="flex gap-3">
                                    <Button
                                        variant="outline"
                                        className="flex-1 h-12 rounded-xl"
                                        onClick={() => setPaymentMethod(null)}
                                    >
                                        Back
                                    </Button>
                                    <Button
                                        className="flex-1 h-12 rounded-xl bg-[#BF5700] hover:bg-[#A04000]"
                                        disabled={!upiConfirmed || processing}
                                        onClick={handleConfirmPayment}
                                    >
                                        {processing ? (
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                        ) : (
                                            <>
                                                <CheckCircle2 className="w-5 h-5 mr-2" />
                                                Confirm
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            // Cash Payment Flow
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-[#5C4033] mb-2">
                                        Amount Received
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5C4033] text-xl">₹</span>
                                        <Input
                                            type="number"
                                            value={cashReceived}
                                            onChange={(e) => setCashReceived(e.target.value)}
                                            placeholder="0"
                                            className="pl-10 text-2xl h-16 rounded-xl border-2 border-[#e8dfd6] focus:border-[#BF5700] text-center font-bold"
                                            autoFocus
                                        />
                                    </div>
                                </div>

                                {/* Quick amount buttons */}
                                <div className="grid grid-cols-4 gap-2">
                                    {[totalAmount, Math.ceil(totalAmount / 10) * 10, Math.ceil(totalAmount / 50) * 50, Math.ceil(totalAmount / 100) * 100].map((amount, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setCashReceived(amount.toString())}
                                            className={`p-3 rounded-xl border-2 font-medium transition-all ${cashReceived === amount.toString()
                                                    ? 'border-[#BF5700] bg-[#BF5700] text-white'
                                                    : 'border-[#e8dfd6] hover:border-[#BF5700]'
                                                }`}
                                        >
                                            ₹{amount}
                                        </button>
                                    ))}
                                </div>

                                {/* Change calculation */}
                                {cashAmount > 0 && (
                                    <div className={`p-4 rounded-xl ${change >= 0 ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                                        <div className="flex justify-between items-center">
                                            <span className={`font-medium ${change >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                                                {change >= 0 ? 'Change to Return' : 'Amount Short'}
                                            </span>
                                            <span className={`text-2xl font-bold ${change >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                                                ₹{Math.abs(change).toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                )}

                                <div className="flex gap-3">
                                    <Button
                                        variant="outline"
                                        className="flex-1 h-12 rounded-xl"
                                        onClick={() => {
                                            setPaymentMethod(null);
                                            setCashReceived('');
                                        }}
                                    >
                                        Back
                                    </Button>
                                    <Button
                                        className="flex-1 h-12 rounded-xl bg-[#BF5700] hover:bg-[#A04000]"
                                        disabled={change < 0 || cashAmount === 0 || processing}
                                        onClick={handleConfirmPayment}
                                    >
                                        {processing ? (
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                        ) : (
                                            <>
                                                <CheckCircle2 className="w-5 h-5 mr-2" />
                                                Complete
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
