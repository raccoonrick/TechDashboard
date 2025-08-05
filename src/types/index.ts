export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  url: string;
  source: string;
  author?: string;
  publishedAt: string;
  urlToImage?: string;
  category: string;
}

export interface NewsResponse {
  articles: NewsArticle[];
  totalResults: number;
  status: string;
}

export interface HackerNewsItem {
  id: number;
  title: string;
  url?: string;
  score: number;
  by: string;
  time: number;
  descendants?: number;
}

export interface DevToArticle {
  id: number;
  title: string;
  description: string;
  url: string;
  user: {
    name: string;
    username: string;
  };
  published_at: string;
  cover_image?: string;
  tags: string[];
}

export interface DashboardData {
  newsApiArticles: NewsArticle[];
  hackerNewsTop: NewsArticle[];
  devToArticles: NewsArticle[];
  lastUpdated: string;
}

export interface ApiError {
  message: string;
  status: number;
}