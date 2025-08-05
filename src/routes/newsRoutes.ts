import { Router, Request, Response } from 'express';
import { newsService } from '../services/newsService';

const router = Router();

// Get all dashboard data
router.get('/dashboard', async (req: Request, res: Response) => {
  try {
    const data = await newsService.getDashboardData();
    res.json({
      success: true,
      data,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Dashboard route error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch dashboard data',
      timestamp: new Date().toISOString()
    });
  }
});

// Get only NewsAPI articles
router.get('/newsapi', async (req: Request, res: Response) => {
  try {
    const data = await newsService.getDashboardData();
    res.json({
      success: true,
      data: data.newsApiArticles,
      count: data.newsApiArticles.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('NewsAPI route error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch NewsAPI articles',
      timestamp: new Date().toISOString()
    });
  }
});

// Get only Hacker News articles
router.get('/hackernews', async (req: Request, res: Response) => {
  try {
    const data = await newsService.getDashboardData();
    res.json({
      success: true,
      data: data.hackerNewsTop,
      count: data.hackerNewsTop.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Hacker News route error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch Hacker News articles',
      timestamp: new Date().toISOString()
    });
  }
});

// Get only DEV.to articles
router.get('/devto', async (req: Request, res: Response) => {
  try {
    const data = await newsService.getDashboardData();
    res.json({
      success: true,
      data: data.devToArticles,
      count: data.devToArticles.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('DEV.to route error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch DEV.to articles',
      timestamp: new Date().toISOString()
    });
  }
});

// Force refresh cache
router.post('/refresh', async (req: Request, res: Response) => {
  try {
    newsService.clearCache();
    const data = await newsService.getDashboardData();
    res.json({
      success: true,
      message: 'Cache refreshed successfully',
      data,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Refresh route error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to refresh cache',
      timestamp: new Date().toISOString()
    });
  }
});

// Health check
router.get('/health', (req: Request, res: Response) => {
  res.json({
    success: true,
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

export default router;