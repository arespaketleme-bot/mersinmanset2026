export interface Comment {
  id: string;
  author: string;
  email: string;
  content: string;
  createdAt: string;
  likes: number;
}

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string; // HTML or structured text
  category: string;
  imageUrl: string;
  author: string;
  createdAt: string;
  tags: string[];
  metaDescription: string;
  jsonLdSchema: string; // Stringified JSON-LD for Search Console
  views: number;
  readTime: string;
}

export interface NewsletterSubscriber {
  email: string;
  subscribedAt: string;
}

export interface SEOStatus {
  score: number;
  checks: {
    id: string;
    title: string;
    passed: boolean;
    description: string;
    impact: 'critical' | 'warning' | 'good';
  }[];
}
