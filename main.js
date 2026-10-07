// main.js
import 'dotenv/config'; 
import express from 'express';
import mongoose from 'mongoose';
import productManager from './product-manager.js';
import router from './routes/orders.js'; 
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('✅ Connected to MongoDB successfully');
    })
    .catch((err) => {
        console.error('❌ Database connection failed:', err);
    });

app.get('/products', (req, res) => {
    res.status(200).json(productManager.getAllProducts());
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/orders', router);

app.use((req, res, next) => {
    res.status(404).json({ error: "Route not found. The requested endpoint does not exist." });
});

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