import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import { errorHandler } from './middleware/errorHandler.js';

import authRoutes from './routes/authRoutes.js';
import triageRoutes from './routes/triageRoutes.js';
import hospitalRoutes from './routes/hospitalRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import activityRoutes from './routes/activityRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:4173'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/auth', authRoutes);
app.use('/api/triage', triageRoutes);
app.use('/api/hospitals', hospitalRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/activity', activityRoutes);

app.use(errorHandler);

const start = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`RescueAI server running on port ${PORT}`);
  });
};

start();
