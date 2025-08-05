import axios from 'axios';
import { config } from '../config';
import { 
  NewsArticle, 
  HackerNewsItem, 
  DevToArticle, 
  DashboardData,
  ApiError 
} from '../types';

class NewsService {
  private cache: DashboardData | null = null;
  private lastCacheUpdate: Date | null = null;

  private isCacheValid(): boolean {
    if (!this.cache || !this.lastCacheUpdate) return false;
    
    const cacheAgeMinutes = (Date.now() - this.lastCacheUpdate.getTime()) / (1000 * 60);
    return cacheAgeMinutes < config.cacheDurationMinutes;
  }

  async getDashboardData(): Promise<DashboardData> {
    if (this.isCacheValid() && this.cache) {
      console.log('Returning cached data');
      return this.cache;
    }

    console.log('Fetching fresh data...');
    
    try {
      const [newsApiArticles, hackerNewsTop, devToArticles] = await Promise.allSettled([
        this.getNewsApiArticles(),
        this.getHackerNewsTop(),
        this.getDevToArticles()
      ]);

      const dashboardData: DashboardData = {
        newsApiArticles: newsApiArticles.status === 'fulfilled' ? newsApiArticles.value : [],
        hackerNewsTop: hackerNewsTop.status === 'fulfilled' ? hackerNewsTop.value : [],
        devToArticles: devToArticles.status === 'fulfilled' ? devToArticles.value : [],
        lastUpdated: new Date().toISOString()
      };

      this.cache = dashboardData;
      this.lastCacheUpdate = new Date();

      return dashboardData;
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      throw new Error('Failed to fetch news data');
    }
  }

  private async getNewsApiArticles(): Promise<NewsArticle[]> {
    if (!config.newsApiKey) {
      console.warn('NewsAPI key not configured, skipping NewsAPI articles');
      return [];
    }

    try {
      const response = await axios.get(`${config.newsApiUrl}/everything`, {
        params: {
          sources: config.techSources,
          sortBy: 'publishedAt',
          pageSize: 20,
          language: 'en'
        },
        headers: {
          'X-API-Key': config.newsApiKey
        },
        timeout: 10000
      });

      return response.data.articles.map((article: any, index: number): NewsArticle => ({
        id: `newsapi-${index}`,
        title: article.title,
        description: article.description || '',
        url: article.url,
        source: article.source.name,
        author: article.author,
        publishedAt: article.publishedAt,
        urlToImage: article.urlToImage,
        category: 'tech-news'
      }));
    } catch (error) {
      console.error('Error fetching NewsAPI articles:', error);
      return [];
    }
  }

  private async getHackerNewsTop(): Promise<NewsArticle[]> {
    try {
      // Get top story IDs
      const topStoriesResponse = await axios.get(
        `${config.hackerNewsApiUrl}/topstories.json`,
        { timeout: 10000 }
      );
      
      const topStoryIds = topStoriesResponse.data.slice(0, 15);
      
      // Fetch individual stories
      const storyPromises = topStoryIds.map((id: number) =>
        axios.get(`${config.hackerNewsApiUrl}/item/${id}.json`, { timeout: 5000 })
      );
      
      const stories = await Promise.allSettled(storyPromises);
      
      return stories
        .filter((result): result is PromiseFulfilledResult<any> => 
          result.status === 'fulfilled' && result.value.data.url
        )
        .map((result, index): NewsArticle => {
          const story: HackerNewsItem = result.value.data;
          return {
            id: `hn-${story.id}`,
            title: story.title,
            description: `Score: ${story.score} | Comments: ${story.descendants || 0}`,
            url: story.url!,
            source: 'Hacker News',
            author: story.by,
            publishedAt: new Date(story.time * 1000).toISOString(),
            category: 'hacker-news'
          };
        });
    } catch (error) {
      console.error('Error fetching Hacker News articles:', error);
      return [];
    }
  }

  private async getDevToArticles(): Promise<NewsArticle[]> {
    try {
      const response = await axios.get(`${config.devToApiUrl}/articles`, {
        params: {
          top: 7,
          per_page: 15,
          tag: 'javascript,typescript,nodejs,react,programming'
        },
        timeout: 10000
      });

      return response.data.map((article: DevToArticle): NewsArticle => ({
        id: `devto-${article.id}`,
        title: article.title,
        description: article.description,
        url: article.url,
        source: 'DEV.to',
        author: article.user.name,
        publishedAt: article.published_at,
        urlToImage: article.cover_image,
        category: 'dev-community'
      }));
    } catch (error) {
      console.error('Error fetching DEV.to articles:', error);
      return [];
    }
  }

  clearCache(): void {
    this.cache = null;
    this.lastCacheUpdate = null;
    console.log('Cache cleared');
  }
}

export const newsService = new NewsService();