import express from 'express';
import cors from 'cors';
import cron from 'node-cron';
import { config } from './config';
import newsRoutes from './routes/newsRoutes';
import { newsService } from './services/newsService';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from public directory
app.use(express.static('public'));

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/news', newsRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Tech News Dashboard API',
    version: '1.0.0',
    endpoints: {
      dashboard: '/api/news/dashboard',
      newsapi: '/api/news/newsapi',
      hackerNews: '/api/news/hackernews',
      devTo: '/api/news/devto',
      refresh: 'POST /api/news/refresh',
      health: '/api/news/health'
    },
    documentation: {
      description: 'This API aggregates tech news from multiple sources',
      sources: ['NewsAPI', 'Hacker News', 'DEV.to'],
      caching: `Data is cached for ${config.cacheDurationMinutes} minutes`
    }
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    availableEndpoints: [
      'GET /',
      'GET /api/news/dashboard',
      'GET /api/news/newsapi', 
      'GET /api/news/hackernews',
      'GET /api/news/devto',
      'POST /api/news/refresh',
      'GET /api/news/health'
    ]
  });
});

// Error handler
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    timestamp: new Date().toISOString()
  });
});

// Schedule cache refresh every 30 minutes
cron.schedule('*/30 * * * *', () => {
  console.log('Scheduled cache refresh...');
  newsService.clearCache();
}, {
  scheduled: true,
  timezone: "UTC"
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  process.exit(0);
});

// Start server
app.listen(config.port, () => {
  console.log(`🚀 Tech News Dashboard API running on port ${config.port}`);
  console.log(`📊 Environment: ${config.nodeEnv}`);
  console.log(`⏰ Cache duration: ${config.cacheDurationMinutes} minutes`);
  console.log(`🔑 NewsAPI key configured: ${config.newsApiKey ? 'Yes' : 'No'}`);
  console.log(`\n📡 Available endpoints:`);
  console.log(`   GET  http://localhost:${config.port}/`);
  console.log(`   GET  http://localhost:${config.port}/api/news/dashboard`);
  console.log(`   GET  http://localhost:${config.port}/api/news/health`);
  console.log(`   POST http://localhost:${config.port}/api/news/refresh`);
});

export default app;