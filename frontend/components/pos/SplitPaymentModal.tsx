'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, Banknote, QrCode, Calculator, Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface SplitPaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    totalAmount: number;
    onConfirm: (payments: { method: 'UPI' | 'CASH'; amount: number }[]) => void;
}

export function SplitPaymentModal({ isOpen, onClose, totalAmount, onConfirm }: SplitPaymentModalProps) {
    const [payments, setPayments] = useState<{ method: 'UPI' | 'CASH'; amount: number }[]>([
        { method: 'CASH', amount: 0 },
        { method: 'UPI', amount: 0 },
    ]);
    const [cashReceived, setCashReceived] = useState('');

    const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0);
    const remaining = totalAmount - totalPaid;
    const isComplete = Math.abs(remaining) < 0.01;

    const updatePayment = (index: number, amount: number) => {
        setPayments(prev => prev.map((p, i) => i === index ? { ...p, amount } : p));
    };

    const handleQuickSplit = (cashPercent: number) => {
        const cashAmount = Math.round((totalAmount * cashPercent / 100) * 100) / 100;
        const upiAmount = totalAmount - cashAmount;
        setPayments([
            { method: 'CASH', amount: cashAmount },
            { method: 'UPI', amount: upiAmount },
        ]);
    };

    const cashPayment = payments.find(p => p.method === 'CASH');
    const cashChange = cashReceived ? parseFloat(cashReceived) - (cashPayment?.amount || 0) : 0;

    const handleConfirm = () => {
        if (isComplete) {
            onConfirm(payments.filter(p => p.amount > 0));
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl"
                    onClick={e => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-[#BF5700] to-[#8B4513] p-4 text-white">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Calculator className="w-6 h-6" />
                                <h2 className="text-xl font-bold">Split Payment</h2>
                            </div>
                            <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-lg">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="mt-3 text-3xl font-bold">₹{totalAmount.toFixed(2)}</div>
                    </div>

                    <div className="p-6 space-y-6">
                        {/* Quick Split Buttons */}
                        <div>
                            <Label className="text-sm text-gray-500 mb-2 block">Quick Split</Label>
                            <div className="flex gap-2">
                                {[50, 60, 70, 80].map(percent => (
                                    <button
                                        key={percent}
                                        onClick={() => handleQuickSplit(percent)}
                                        className="flex-1 py-2 px-3 text-sm font-medium bg-[#fef9f3] border-2 border-[#e8dfd6] rounded-lg hover:border-[#BF5700] transition-colors"
                                    >
                                        {percent}% Cash
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Payment Methods */}
                        <div className="space-y-4">
                            {/* Cash */}
                            <div className="p-4 bg-green-50 border-2 border-green-200 rounded-xl">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                                        <Banknote className="w-5 h-5 text-white" />
                                    </div>
                                    <span className="font-bold text-green-800">Cash</span>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <Label className="text-xs text-green-700">Amount</Label>
                                        <Input
                                            type="number"
                                            value={payments[0].amount || ''}
                                            onChange={e => updatePayment(0, parseFloat(e.target.value) || 0)}
                                            className="mt-1 border-green-300 focus:border-green-500"
                                            placeholder="0.00"
                                        />
                                    </div>
                                    <div>
                                        <Label className="text-xs text-green-700">Received</Label>
                                        <Input
                                            type="number"
                                            value={cashReceived}
                                            onChange={e => setCashReceived(e.target.value)}
                                            className="mt-1 border-green-300 focus:border-green-500"
                                            placeholder="0.00"
                                        />
                                    </div>
                                </div>
                                {cashChange > 0 && (
                                    <div className="mt-2 text-sm font-bold text-green-700">
                                        Change: ₹{cashChange.toFixed(2)}
                                    </div>
                                )}
                            </div>

                            {/* UPI */}
                            <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-xl">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                                        <QrCode className="w-5 h-5 text-white" />
                                    </div>
                                    <span className="font-bold text-blue-800">UPI</span>
                                </div>
                                <div>
                                    <Label className="text-xs text-blue-700">Amount</Label>
                                    <Input
                                        type="number"
                                        value={payments[1].amount || ''}
                                        onChange={e => updatePayment(1, parseFloat(e.target.value) || 0)}
                                        className="mt-1 border-blue-300 focus:border-blue-500"
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Summary */}
                        <div className="p-4 bg-gray-50 rounded-xl">
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-gray-600">Total Paid</span>
                                <span className="font-bold">₹{totalPaid.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Remaining</span>
                                <span className={`font-bold ${remaining > 0 ? 'text-red-600' : 'text-green-600'}`}>
                                    ₹{remaining.toFixed(2)}
                                </span>
                            </div>
                        </div>

                        {/* Confirm Button */}
                        <Button
                            onClick={handleConfirm}
                            disabled={!isComplete}
                            className={`w-full h-14 text-lg font-bold rounded-xl ${isComplete
                                    ? 'bg-gradient-to-r from-[#BF5700] to-[#8B4513]'
                                    : 'bg-gray-300'
                                }`}
                        >
                            {isComplete ? (
                                <>
                                    <Check className="w-5 h-5 mr-2" />
                                    Confirm Split Payment
                                </>
                            ) : (
                                `₹${Math.abs(remaining).toFixed(2)} ${remaining > 0 ? 'remaining' : 'overpaid'}`
                            )}
                        </Button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
