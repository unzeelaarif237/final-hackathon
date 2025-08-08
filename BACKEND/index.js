import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import hijabRoutes from './routes/hijabRoutes.js';
import authRoutes from './routes/authRoutes.js';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/hijab', hijabRoutes);

console.log(">>>>>> Starting server..." ,process.env.MONGO_URI);

// Database connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(5000, () => console.log('Server running on port 5000'));
  })
  .catch(err => console.log(err));
