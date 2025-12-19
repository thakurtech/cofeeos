// WhatsApp Receipt Utility
// Generates a WhatsApp-friendly receipt message and opens WhatsApp

interface ReceiptData {
    shopName: string;
    orderId: string;
    items: Array<{ name: string; quantity: number; price: number }>;
    totalAmount: number;
    discountAmount?: number;
    paymentMethod: string;
    tableNumber?: string;
}

export function generateWhatsAppReceipt(data: ReceiptData): string {
    const lines: string[] = [];

    // Header
    lines.push(`🏪 *${data.shopName}*`);
    lines.push(`📋 Order: *${data.orderId}*`);
    lines.push(`📅 ${new Date().toLocaleDateString('en-IN')} ${new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}`);
    if (data.tableNumber) {
        lines.push(`🪑 Table: ${data.tableNumber}`);
    }
    lines.push('');
    lines.push('━'.repeat(20));
    lines.push('');

    // Items
    data.items.forEach(item => {
        const itemTotal = item.price * item.quantity;
        lines.push(`${item.quantity}x ${item.name}`);
        lines.push(`   ₹${itemTotal.toFixed(2)}`);
    });

    lines.push('');
    lines.push('━'.repeat(20));
    lines.push('');

    // Totals
    if (data.discountAmount && data.discountAmount > 0) {
        const subtotal = data.totalAmount + data.discountAmount;
        lines.push(`Subtotal: ₹${subtotal.toFixed(2)}`);
        lines.push(`✨ Discount: -₹${data.discountAmount.toFixed(2)}`);
    }

    lines.push(`*💰 Total: ₹${data.totalAmount.toFixed(2)}*`);
    lines.push(`💳 Paid via: ${data.paymentMethod}`);
    lines.push('');
    lines.push('━'.repeat(20));
    lines.push('');
    lines.push('✅ Thank you for your order!');
    lines.push('🔗 Powered by CaféOS');

    return lines.join('\n');
}

export function sendWhatsAppReceipt(phoneNumber: string, receiptData: ReceiptData): void {
    const message = generateWhatsAppReceipt(receiptData);
    const encodedMessage = encodeURIComponent(message);

    // Clean phone number (remove spaces, dashes, etc.)
    const cleanPhone = phoneNumber.replace(/[^0-9]/g, '');

    // Add country code if not present (assume India)
    const fullPhone = cleanPhone.startsWith('91') ? cleanPhone : `91${cleanPhone}`;

    // Open WhatsApp
    const whatsappUrl = `https://wa.me/${fullPhone}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
}

// For sharing without a specific number (uses WhatsApp share)
export function shareWhatsAppReceipt(receiptData: ReceiptData): void {
    const message = generateWhatsAppReceipt(receiptData);
    const encodedMessage = encodeURIComponent(message);

    // Try the universal share API first
    if (navigator.share) {
        navigator.share({
            title: `Receipt - ${receiptData.orderId}`,
            text: message,
        }).catch(() => {
            // Fallback to WhatsApp URL
            window.open(`https://wa.me/?text=${encodedMessage}`, '_blank');
        });
    } else {
        // Fallback to WhatsApp URL
        window.open(`https://wa.me/?text=${encodedMessage}`, '_blank');
    }
}
