import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    customerName: { type: String, required: true, trim: true },
    items: { 
        type: [String], 
        required: true,
        validate: [array => array.length > 0, 'Orders must contain at least one item.']
    },
    total: { type: Number, required: true, min: [0.50, 'Total must be at least $0.50'] },
    status: { type: String, enum: ['pending', 'preparing', 'completed', 'cancelled'], default: 'pending' },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Order', orderSchema);