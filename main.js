// main.js
import 'dotenv/config'; // 1. Must be at the very top to load .env variables
import express from 'express';
import mongoose from 'mongoose';
import productManager from './product-manager.js';
import router from './routes/orders.js'; 
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

// 2. Register JSON parsing middleware
app.use(express.json());
app.use(cors());

// 3. Connect to MongoDB with error handling
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('✅ Connected to MongoDB successfully');
    })
    .catch((err) => {
        console.error('❌ Database connection failed:', err);
    });

// GET /products - Returns the product list as JSON
app.get('/products', (req, res) => {
    res.status(200).json(productManager.getAllProducts());
});

// Mount the orders router
app.use('/orders', router);

// Handle undefined routes (404 Error)
app.use((req, res, next) => {
    res.status(404).json({ error: "Route not found. The requested endpoint does not exist." });
});

// Centralized error-handling middleware
app.use((err, req, res, next) => {
    const status = err.status || 500;
    res.status(status).json({
        error: {
            status: status,
            message: err.message || "Internal Server Error"
        }
    });
});

app.get('/health', (req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});