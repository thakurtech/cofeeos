import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    items: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, default: 1 },
        name: String, // Snapshot of name
        price: Number // Snapshot of price
    }],
    total: { type: Number, required: true },
    status: {
        type: String,
        enum: ['pending', 'preparing', 'ready', 'completed', 'cancelled'],
        default: 'pending'
    },
    paymentIntentId: { type: String },
    paymentStatus: { type: String, enum: ['pending', 'succeeded', 'failed'], default: 'pending' }
}, { timestamps: true });

export default mongoose.model('Order', OrderSchema);
