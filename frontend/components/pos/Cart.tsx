'use client';

import { useCart } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Trash2, Minus, Plus, CreditCard, Banknote, ShoppingBag } from 'lucide-react';
import { createOrder } from '@/lib/api';
import { useState } from 'react';

export function Cart() {
    const { items, removeItem, updateQuantity, total, clearCart } = useCart();
    const [processing, setProcessing] = useState(false);

    const handleCheckout = async () => {
        if (items.length === 0) return;
        setProcessing(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            alert('Order Placed Successfully! (API integration pending shop ID retrieval)');
            clearCart();
        } catch (error) {
            alert('Failed to place order');
        } finally {
            setProcessing(false);
        }
    };

    const subtotal = total();
    const tax = subtotal * 0.05;
    const totalAmount = subtotal + tax;

    return (
        <div className="flex flex-col h-full bg-white border-l-2 border-[#e8dfd6]">
            <div className="p-6 border-b border-[#e8dfd6] bg-gradient-to-r from-[#fef9f3] to-white">
                <h2 className="font-bold text-2xl text-[#2B1A12]">Current Order</h2>
                <p className="text-sm text-[#5C4033] mt-1">Order #1023 • Walk-in</p>
            </div>

            <ScrollArea className="flex-1 p-6">
                {items.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-[#5C4033]/40 space-y-4 py-12">
                        <div className="w-20 h-20 rounded-full bg-[#fef9f3] flex items-center justify-center">
                            <ShoppingBag className="h-10 w-10" />
                        </div>
                        <p className="text-lg font-medium">Cart is empty</p>
                        <p className="text-sm text-center">Add items from the menu<br />to get started</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {items.map((item) => (
                            <div key={item.cartId} className="flex gap-4 p-3 rounded-2xl hover:bg-[#fef9f3] transition-colors">
                                <div className="w-20 h-20 rounded-xl bg-[#fef9f3] overflow-hidden shrink-0 border border-[#e8dfd6]">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start mb-1">
                                        <h4 className="font-semibold text-[#2B1A12] truncate pr-2">{item.name}</h4>
                                        <span className="font-bold text-[#BF5700]">₹{item.price * item.quantity}</span>
                                    </div>
                                    {item.selectedModifiers.length > 0 && (
                                        <p className="text-xs text-[#5C4033] truncate mb-2">
                                            {item.selectedModifiers.map(m => m.name).join(', ')}
                                        </p>
                                    )}

                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center gap-2 bg-[#fef9f3] rounded-lg p-1 border border-[#e8dfd6]">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-7 w-7 rounded-md hover:bg-white"
                                                onClick={() => updateQuantity(item.cartId, Math.max(0, item.quantity - 1))}
                                                disabled={item.quantity <= 1}
                                            >
                                                <Minus className="h-3 w-3 text-[#5C4033]" />
                                            </Button>
                                            <span className="text-sm font-bold w-6 text-center text-[#2B1A12]">{item.quantity}</span>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-7 w-7 rounded-md hover:bg-white"
                                                onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                                            >
                                                <Plus className="h-3 w-3 text-[#5C4033]" />
                                            </Button>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50 ml-auto rounded-lg"
                                            onClick={() => removeItem(item.cartId)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </ScrollArea>

            <div className="p-6 bg-gradient-to-t from-[#fef9f3] to-white border-t-2 border-[#e8dfd6] space-y-6">
                <div className="space-y-3 text-sm">
                    <div className="flex justify-between text-[#5C4033]">
                        <span>Subtotal</span>
                        <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-[#5C4033]">
                        <span>Tax (5%)</span>
                        <span className="font-medium">₹{tax.toFixed(2)}</span>
                    </div>
                    <Separator className="bg-[#e8dfd6]" />
                    <div className="flex justify-between font-bold text-xl text-[#2B1A12]">
                        <span>Total</span>
                        <span className="text-[#BF5700]">₹{totalAmount.toFixed(2)}</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <Button
                        variant="outline"
                        className="h-14 text-base font-semibold border-2 border-[#2B1A12] text-[#2B1A12] hover:bg-[#2B1A12] hover:text-white rounded-xl"
                        disabled={items.length === 0}
                    >
                        <Banknote className="mr-2 h-5 w-5" /> Cash
                    </Button>
                    <Button
                        className="h-14 text-base font-semibold bg-gradient-to-r from-[#BF5700] to-[#8B4513] hover:from-[#A04000] hover:to-[#703810] text-white rounded-xl shadow-lg"
                        disabled={items.length === 0 || processing}
                        onClick={handleCheckout}
                    >
                        <CreditCard className="mr-2 h-5 w-5" />
                        {processing ? 'Processing...' : 'Pay Now'}
                    </Button>
                </div>
            </div>
        </div>
    );
}
