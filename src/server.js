import express from 'express';
import cors from 'cors';
import campaignsRouter from './routes/campaigns.js';

const app = express();
const PORT = 4000;

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'https://friendly-mermaid-486d21.netlify.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/campaigns', campaignsRouter);

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Campaign Management API',
    version: '1.0.0',
    endpoints: {
      campaigns: {
        getAll: 'GET /campaigns - Get all campaigns',
        create: 'POST /campaigns - Create a new campaign'
      }
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message || err);
  res.status(err.status || 500).json({
    success: false,
    statusCode: err.status || 500,
    message: err.message || 'Internal server error',
    errors: err.errors || undefined
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    statusCode: 404,
    message: 'Route not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend API is running on: http://localhost:${PORT}`);
  console.log(`📋 GET  http://localhost:${PORT}/campaigns`);
  console.log(`📝 POST http://localhost:${PORT}/campaigns`);
});

export default app;

