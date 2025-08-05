# Tech News Dashboard

A **TypeScript Node.js API and Web App** that aggregates tech news from multiple sources including NewsAPI, Hacker News, and DEV.to — with a **modern frontend dashboard** to browse articles easily.

---

## 🚀 Features

- **Multiple News Sources**: Aggregates from NewsAPI, Hacker News, and DEV.to  
- **Frontend Dashboard**: A clean and responsive webpage to view aggregated news  
- **Smart Caching**: Configurable cache duration to optimize API calls  
- **RESTful API**: Clean, well-documented endpoints  
- **Scheduled Updates**: Automatic cache refresh every 30 minutes  
- **Error Handling**: Robust error handling and logging  

---

## 📁 Project Overview

This project includes:

- 📡 **Backend API**: Built with Node.js + Express, serving RESTful endpoints  
- 🖥️ **Frontend Webpage**: A modern, TypeScript-based dashboard to explore tech news in real-time  

---

## ⚡ Quick Start

### 1. Installation

```bash
# Clone or create the project directory
mkdir tech-news-dashboard
cd tech-news-dashboard

# Initialize and install backend dependencies
npm install
```

### 2. Environment Setup

```bash
# Copy the example environment file
cp .env.example .env

# Edit .env with your configuration
```

Required environment variables:

- `NEWS_API_KEY`: Get a free API key from [NewsAPI.org](https://newsapi.org/)
- `PORT`: Server port (default: 3000)

### 3. Development

```bash
# Start the backend API
npm run dev
```

```bash
# Start the frontend (in a separate terminal)
cd frontend
npm install
npm run dev
```

### 4. Production

```bash
# Build the backend
npm run build
npm start
```

```bash
# Build the frontend
cd frontend
npm run build
```

---

## 🌐 Frontend Web Dashboard

The frontend provides a live, user-friendly interface to browse the latest tech news in categories like:

- 📰 General Tech (from NewsAPI)
- 🧑‍💻 Developer Posts (from DEV.to)
- 🚀 Startup & Hacker News (from Hacker News)

**Tech Stack:**

- React + TypeScript  
- TailwindCSS  
- Axios for API calls  
- Built-in caching and loading states for smooth UX  

### 📂 Project Structure

```
tech-news-dashboard/
├── src/             # Backend API
├── frontend/        # Frontend web dashboard
```

---

## 📡 API Endpoints

### Core Endpoints

- **GET** `/api/news/dashboard` – Get all news from all sources  
- **GET** `/api/news/newsapi` – Get only NewsAPI articles  
- **GET** `/api/news/hackernews` – Get only Hacker News articles  
- **GET** `/api/news/devto` – Get only DEV.to articles  
- **POST** `/api/news/refresh` – Force refresh cache  
- **GET** `/api/news/health` – Health check endpoint  
- **GET** `/` – API documentation and info  

### 🧾 Response Format

```json
{
  "success": true,
  "data": {
    "newsApiArticles": [...],
    "hackerNewsTop": [...],
    "devToArticles": [...],
    "lastUpdated": "2024-01-15T10:30:00.000Z"
  },
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### 📘 Article Structure

```json
{
  "id": "unique-article-id",
  "title": "Article Title",
  "description": "Article description or summary",
  "url": "https://example.com/article",
  "source": "Source Name",
  "author": "Author Name",
  "publishedAt": "2024-01-15T10:00:00.000Z",
  "urlToImage": "https://example.com/image.jpg",
  "category": "tech-news|hacker-news|dev-community"
}
```

---

## ⚙️ Configuration

### Environment Variables

| Variable               | Description                       | Default   |
|------------------------|-----------------------------------|-----------|
| `PORT`                 | Server port                       | 3000      |
| `NODE_ENV`             | Environment                       | development |
| `NEWS_API_KEY`         | NewsAPI.org API key               | Required  |
| `CACHE_DURATION_MINUTES` | Cache duration in minutes       | 30        |

### News Sources

- **NewsAPI**: TechCrunch, The Verge, Wired, Ars Technica, Engadget  
- **Hacker News**: Top stories with tech relevance  
- **DEV.to**: Programming and development articles 
