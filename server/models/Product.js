import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: String, default: 'Coffee' },
    image: { type: String },
    available: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model('Product', ProductSchema);
