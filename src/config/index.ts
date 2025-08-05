import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || '3000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  newsApiKey: process.env.NEWS_API_KEY,
  hackerNewsApiUrl: process.env.HACKERNEWS_API_URL || 'https://hacker-news.firebaseio.com/v0',
  devToApiUrl: process.env.DEV_TO_API_URL || 'https://dev.to/api',
  cacheDurationMinutes: parseInt(process.env.CACHE_DURATION_MINUTES || '30', 10),
  newsApiUrl: 'https://newsapi.org/v2',
  
  // Tech-focused news sources and keywords
  techSources: [
    'techcrunch',
    'the-verge',
    'wired',
    'ars-technica',
    'engadget',
    'mashable',
    'recode',
    'next-web'
  ].join(','),
  
  techKeywords: [
    'technology',
    'software',
    'programming',
    'AI',
    'machine learning',
    'blockchain',
    'cryptocurrency',
    'startup',
    'tech',
    'javascript',
    'python',
    'react',
    'nodejs'
  ]
};