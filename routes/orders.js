import express from 'express';
import Order from '../models/Order.js';

const router = express.Router();

// CREATE: Save a new order
router.post('/', async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// READ (All & Filtered): Retrieve all orders or filter by query parameters (e.g., ?status=pending)
router.get('/', async (req, res) => {
    try {
        const filter = {};
        if (req.query.status) {
            filter.status = req.query.status;
        }
        const orders = await Order.find(filter);
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// READ (By ID): Retrieve a single order by ID
router.get('/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(400).json({ error: 'Invalid Order ID format' });
    }
});

// UPDATE: Modify an existing order by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedOrder) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// DELETE: Remove an order by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        if (!deletedOrder) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.status(200).json({ message: 'Order successfully deleted', deletedOrder });
    } catch (error) {
        res.status(400).json({ error: 'Invalid Order ID format' });
    }
});

export default router;