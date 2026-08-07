import express from 'express';
import messageRoutes from './routes/messageRoutes.js';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';

import { connectDB } from './config/db.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';

import authRoutes from './routes/authRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import skillRoutes from './routes/skillRoutes.js';
import experienceRoutes from './routes/experienceRoutes.js';
import achievementRoutes from './routes/achievementRoutes.js';
import certificateRoutes from './routes/certificateRoutes.js';

import resumeRoutes from './routes/resumeRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import githubRoutes from './routes/githubRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';


// Load environment variables
dotenv.config({ path: './.env' });

console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "FOUND" : "MISSING");


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();


// Database connection
connectDB();


// Middlewares
app.use(
  helmet({
    crossOriginResourcePolicy: false
  })
);


app.use(
  cors({
    origin: process.env.CLIENT_URL || '*',
    credentials: true
  })
);


app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));


app.use(
  morgan(
    process.env.NODE_ENV === 'production'
      ? 'combined'
      : 'dev'
  )
);


// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 150,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: 'Too many requests, please try again later.'
  }
});


app.use('/api/', limiter);


const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    message: 'Too many login attempts, please try again later.'
  }
});


// Static files
app.use(
  '/uploads',
  express.static(path.join(__dirname, 'uploads'))
);


// Health check
app.get(
  '/api/health',
  (req, res) =>
    res.json({
      status: 'ok',
      time: new Date().toISOString()
    })
);


// Routes
app.use('/api/auth', authLimiter, authRoutes);

app.use('/api/projects', projectRoutes);

app.use('/api/skills', skillRoutes);

app.use('/api/experience', experienceRoutes);

app.use('/api/achievements', achievementRoutes);

app.use('/api/certificates', certificateRoutes);

app.use('/api/messages', messageRoutes);

app.use('/api/resume', resumeRoutes);

app.use('/api/profile', profileRoutes);

app.use('/api/github', githubRoutes);

app.use('/api/upload', uploadRoutes);


// Error handlers
app.use(notFound);

app.use(errorHandler);


// Server start
const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});