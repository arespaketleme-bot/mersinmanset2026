import React from 'react';
import { Eye, Clock, ArrowRight, Calendar } from 'lucide-react';
import { NewsArticle } from '../types';
import { CATEGORIES } from '../data/mockNews';
import { formatFriendlyDate } from '../utils/date';

interface ArticleCardProps {
  key?: string;
  article: NewsArticle;
  onSelect: () => void;
}

export default function ArticleCard({ article, onSelect }: ArticleCardProps) {
  // Find category display name
  const catObj = CATEGORIES.find(c => c.id === article.category);
  const formattedDate = formatFriendlyDate(article.createdAt);

  return (
    <article 
      className="bg-white rounded-xl border border-slate-200 hover:border-red-500 shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col h-full overflow-hidden cursor-pointer"
      onClick={onSelect}
      id={`news-card-${article.id}`}
    >
      {/* Article Cover Image with Hover Zoom effect */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
        <img 
          src={article.imageUrl} 
          alt={article.title}
          referrerPolicy="no-referrer"
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=1200';
          }}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-103"
        />
        <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
          <span className="bg-red-600 text-white font-bold text-[9px] tracking-wider uppercase px-2 py-0.5 rounded shadow-sm">
            {catObj ? catObj.name : article.category}
          </span>
        </div>
      </div>

      {/* Card Content body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div className="space-y-1.5">
          {/* Metadata indicators */}
          <div className="flex items-center gap-3 font-mono text-[10px] text-slate-400">
            <span className="flex items-center gap-1 font-semibold">
              <Calendar className="w-3.2 h-3.2 text-red-500" />
              {formattedDate}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.2 h-3.2" />
              {article.readTime}
            </span>
          </div>

          {/* Headline in premium serif */}
          <h3 className="font-serif font-black text-slate-900 group-hover:text-red-600 text-base leading-snug tracking-tight line-clamp-2 transition-colors">
            {article.title}
          </h3>

          {/* Snippet summary */}
          <p className="text-slate-500 text-xs sm:text-sm line-clamp-3 leading-relaxed">
            {article.summary}
          </p>
        </div>

        {/* Action triggers */}
        <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-600 group-hover:text-red-600 transition-colors">
          <span className="flex items-center gap-1 font-mono text-[11px] text-slate-400 font-medium">
            <Eye className="w-3.5 h-3.5" />
            {article.views} Okunma
          </span>
          <span className="flex items-center gap-1 transition-all group-hover:gap-2">
            Haberin Devamı <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </article>
  );
}
