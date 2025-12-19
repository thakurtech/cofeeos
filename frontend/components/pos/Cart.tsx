'use client';

import { useCart } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Trash2, Minus, Plus, ShoppingBag, Ticket, CheckCircle } from 'lucide-react';
import { createOrder, CreateOrderPayload } from '@/lib/api';
import { useState } from 'react';
import { PaymentModal } from './PaymentModal';
import { useAuth, useShop } from '@/lib/auth-context';
import { toast } from 'sonner';

interface CompletedOrder {
    id: string;
    shortId: string;
    totalAmount: number;
    paymentMethod: 'UPI' | 'CASH';
    items: Array<{ name: string; quantity: number; price: number }>;
}

export function Cart() {
    const { items, removeItem, updateQuantity, total, clearCart } = useCart();
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [discountCode, setDiscountCode] = useState('');
    const [discountAmount, setDiscountAmount] = useState(0);
    const [orderNotes, setOrderNotes] = useState('');
    const [completedOrder, setCompletedOrder] = useState<CompletedOrder | null>(null);
    const [processing, setProcessing] = useState(false);

    const { user } = useAuth();
    const shop = useShop();

    const subtotal = total();
    const tax = subtotal * 0.05; // 5% GST
    const totalBeforeDiscount = subtotal + tax;
    const totalAmount = Math.max(0, totalBeforeDiscount - discountAmount);

    const handleApplyDiscount = async () => {
        if (!discountCode.trim()) return;

        // TODO: Validate discount code with backend
        // For now, simulate a 10% discount for code "WELCOME10"
        if (discountCode.toUpperCase() === 'WELCOME10') {
            const discount = subtotal * 0.1;
            setDiscountAmount(discount);
            toast.success('Discount applied: 10% off!');
        } else {
            toast.error('Invalid discount code');
            setDiscountAmount(0);
        }
    };

    const handlePaymentComplete = async (paymentMethod: 'UPI' | 'CASH', amountReceived?: number) => {
        if (!shop?.id) {
            toast.error('Shop not configured. Please contact support.');
            return;
        }

        setProcessing(true);
        setShowPaymentModal(false);

        try {
            const orderPayload: CreateOrderPayload = {
                shopId: shop.id,
                items: items.map(item => ({
                    menuItemId: item.id,
                    quantity: item.quantity,
                    modifiers: item.selectedModifiers.map(m => m.id),
                })),
                source: 'POS',
                paymentMethod,
                discountCode: discountAmount > 0 ? discountCode : undefined,
                notes: orderNotes || undefined,
            };

            const order = await createOrder(orderPayload);

            setCompletedOrder({
                id: order.id,
                shortId: order.shortId,
                totalAmount,
                paymentMethod,
                items: items.map(item => ({
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price * item.quantity,
                })),
            });

            toast.success(`Order ${order.shortId} created successfully!`);
            clearCart();
            setDiscountCode('');
            setDiscountAmount(0);
            setOrderNotes('');
        } catch (error) {
            console.error('Order creation failed:', error);
            toast.error('Failed to create order. Please try again.');
        } finally {
            setProcessing(false);
        }
    };

    const handlePrintReceipt = () => {
        if (!completedOrder || !shop) return;

        const receiptContent = `
<!DOCTYPE html>
<html>
<head>
    <title>Receipt - ${completedOrder.shortId}</title>
    <style>
        @page { margin: 0; size: 80mm auto; }
        body { 
            font-family: 'Courier New', monospace; 
            font-size: 12px; 
            padding: 10px;
            max-width: 80mm;
            margin: 0 auto;
        }
        .center { text-align: center; }
        .bold { font-weight: bold; }
        .line { border-bottom: 1px dashed #000; margin: 8px 0; }
        .row { display: flex; justify-content: space-between; margin: 4px 0; }
        .header { font-size: 16px; font-weight: bold; margin-bottom: 4px; }
        .small { font-size: 10px; color: #666; }
    </style>
</head>
<body>
    <div class="center">
        <div class="header">${shop.name || 'CaféOS'}</div>
        <div class="small">${shop.address || ''}</div>
        ${shop.gstNumber ? `<div class="small">GST: ${shop.gstNumber}</div>` : ''}
    </div>
    <div class="line"></div>
    <div class="row"><span>Order:</span><span class="bold">${completedOrder.shortId}</span></div>
    <div class="row"><span>Date:</span><span>${new Date().toLocaleString('en-IN')}</span></div>
    <div class="row"><span>Payment:</span><span>${completedOrder.paymentMethod}</span></div>
    <div class="line"></div>
    ${completedOrder.items.map(item => `
        <div class="row">
            <span>${item.quantity}x ${item.name}</span>
            <span>₹${item.price.toFixed(2)}</span>
        </div>
    `).join('')}
    <div class="line"></div>
    <div class="row bold"><span>TOTAL</span><span>₹${completedOrder.totalAmount.toFixed(2)}</span></div>
    <div class="line"></div>
    <div class="center small" style="margin-top: 16px;">
        Thank you for your visit!<br/>
        Powered by CaféOS
    </div>
</body>
</html>`;

        const printWindow = window.open('', '_blank');
        if (printWindow) {
            printWindow.document.write(receiptContent);
            printWindow.document.close();
            printWindow.print();
        }
    };

    const handleNewOrder = () => {
        setCompletedOrder(null);
    };

    // Show order completion screen
    if (completedOrder) {
        return (
            <div className="flex flex-col h-full bg-white border-l-2 border-[#e8dfd6]">
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                    <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mb-6">
                        <CheckCircle className="w-12 h-12 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-[#2B1A12] mb-2">Order Complete!</h2>
                    <p className="text-4xl font-bold text-[#BF5700] mb-2">{completedOrder.shortId}</p>
                    <p className="text-[#5C4033] mb-8">₹{completedOrder.totalAmount.toFixed(2)} • {completedOrder.paymentMethod}</p>

                    <div className="w-full space-y-3">
                        <Button
                            onClick={handlePrintReceipt}
                            variant="outline"
                            className="w-full h-12 rounded-xl border-2 border-[#2B1A12]"
                        >
                            Print Receipt
                        </Button>
                        <Button
                            onClick={handleNewOrder}
                            className="w-full h-12 rounded-xl bg-[#BF5700] hover:bg-[#A04000]"
                        >
                            New Order
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="flex flex-col h-full bg-white border-l-2 border-[#e8dfd6]">
                <div className="p-6 border-b border-[#e8dfd6] bg-gradient-to-r from-[#fef9f3] to-white">
                    <h2 className="font-bold text-2xl text-[#2B1A12]">Current Order</h2>
                    <p className="text-sm text-[#5C4033] mt-1">
                        {items.length} item{items.length !== 1 ? 's' : ''} • Walk-in
                    </p>
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

                <div className="p-6 bg-gradient-to-t from-[#fef9f3] to-white border-t-2 border-[#e8dfd6] space-y-4">
                    {/* Discount Code */}
                    <div className="flex gap-2">
                        <div className="flex-1 relative">
                            <Ticket className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5C4033]" />
                            <Input
                                placeholder="Discount code"
                                value={discountCode}
                                onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
                                className="pl-10 h-10 rounded-xl border-[#e8dfd6]"
                            />
                        </div>
                        <Button
                            variant="outline"
                            onClick={handleApplyDiscount}
                            className="h-10 px-4 rounded-xl border-[#BF5700] text-[#BF5700] hover:bg-[#BF5700] hover:text-white"
                            disabled={!discountCode.trim()}
                        >
                            Apply
                        </Button>
                    </div>

                    {/* Totals */}
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between text-[#5C4033]">
                            <span>Subtotal</span>
                            <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-[#5C4033]">
                            <span>Tax (5% GST)</span>
                            <span className="font-medium">₹{tax.toFixed(2)}</span>
                        </div>
                        {discountAmount > 0 && (
                            <div className="flex justify-between text-green-600">
                                <span>Discount</span>
                                <span className="font-medium">-₹{discountAmount.toFixed(2)}</span>
                            </div>
                        )}
                        <Separator className="bg-[#e8dfd6]" />
                        <div className="flex justify-between font-bold text-xl text-[#2B1A12]">
                            <span>Total</span>
                            <span className="text-[#BF5700]">₹{totalAmount.toFixed(2)}</span>
                        </div>
                    </div>

                    {/* Checkout Button */}
                    <Button
                        className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-[#BF5700] to-[#8B4513] hover:from-[#A04000] hover:to-[#703810] text-white rounded-xl shadow-lg"
                        disabled={items.length === 0 || processing}
                        onClick={() => setShowPaymentModal(true)}
                    >
                        {processing ? 'Processing...' : `Charge ₹${totalAmount.toFixed(2)}`}
                    </Button>
                </div>
            </div>

            <PaymentModal
                isOpen={showPaymentModal}
                onClose={() => setShowPaymentModal(false)}
                totalAmount={totalAmount}
                onPaymentComplete={handlePaymentComplete}
            />
        </>
    );
}
