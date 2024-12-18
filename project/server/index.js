import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/errorHandler.js';
import employeesRouter from './routes/employees.js';
import dealsRouter from './routes/deals.js';
import rateLimit from 'express-rate-limit';
import compression from 'compression';
import messagesRouter from './routes/messages.js';
import specialDaysRouter from './routes/specialDays.js';
import testRoute from './test-route.js';
import emailRoute from './email-route.js';
import remindersRouter from './routes/reminders.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// CORS configuration
const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:5174'], // Allow both Vite dev server ports
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(compression());

// Basic health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Routes
app.use('/api/special-days', specialDaysRouter);
app.use('/api/messages', messagesRouter);
app.use('/api/employees', employeesRouter);
app.use('/api/deals', dealsRouter);
app.use('/api/test', testRoute);
app.use('/api/email', emailRoute);
app.use('/api/reminders', remindersRouter);

// Error handling
app.use(errorHandler);

// Start server with error handling
const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('Available endpoints:');
    console.log(`- Health check: http://localhost:${PORT}/health`);
    console.log(`- Test SMS: http://localhost:${PORT}/api/test/send-test-sms`);
}).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Please try these solutions:`);
        console.error('1. Stop any other servers running on this port');
        console.error('2. Choose a different port by setting PORT in .env');
        console.error('3. Run: taskkill /F /IM node.exe to stop all Node processes');
    } else {
        console.error('Failed to start server:', err);
    }
    process.exit(1);
});