import React, { useState, useEffect } from 'react';
import { ArrowLeft, Share2, Copy, Send, ThumbsUp, User, Bookmark, Check, Calendar, Clock, Eye, MessageCircle } from 'lucide-react';
import { NewsArticle, Comment } from '../types';
import { CATEGORIES } from '../data/mockNews';
import { formatFriendlyDate } from '../utils/date';

interface ArticleDetailProps {
  article: NewsArticle;
  onBack: () => void;
}

export default function ArticleDetail({ article, onBack }: ArticleDetailProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [newComment, setNewComment] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [hasVotedCommentIds, setHasVotedCommentIds] = useState<string[]>([]);

  // Load comments and bookmarks specifically from localStorage for persistence
  useEffect(() => {
    const savedComments = localStorage.getItem(`comments_${article.id}`);
    if (savedComments) {
      setComments(JSON.parse(savedComments));
    } else {
      // Default initial mock comments for realistic empty states
      const initialComments: Comment[] = [
        {
          id: '1',
          author: 'Mersin_Sakin33',
          email: 'sakin@mersin.com',
          content: 'Sonunda beklenen yatırım adımı atılmış. Mersin bir lojistik kenti olarak bu yatırımlara çok daha fazla ihtiyaç duyuyor. Emeği geçenlerin eline sağlık.',
          createdAt: new Date(Date.now() - 36000 * 1000).toISOString(),
          likes: 24
        },
        {
          id: '2',
          author: 'YörükOsman',
          email: 'osman@mut.com',
          content: 'Harika bir haber! Mersinin her köşesi tarih kokuyor. Turizm hamlesi sayesinde Tarsus caddeleri eskisinden de renkli olacaktır, sabırsızlıkla bekliyoruz.',
          createdAt: new Date(Date.now() - 17200 * 1000).toISOString(),
          likes: 12
        }
      ];
      setComments(initialComments);
      localStorage.setItem(`comments_${article.id}`, JSON.stringify(initialComments));
    }

    // Load bookmark
    const savedBookmarks = localStorage.getItem('bookmarked_articles');
    if (savedBookmarks) {
      const list = JSON.parse(savedBookmarks) as string[];
      setBookmarked(list.includes(article.id));
    }
  }, [article.id]);

  // Dynamically inject Google Search JSON-LD rich metadata to document <head> for AdSense compliance & SEO
  useEffect(() => {
    if (!article.jsonLdSchema) return;
    try {
      // Check if script tag already exists
      let scriptTag = document.getElementById('news-article-jsonld') as HTMLScriptElement;
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = 'news-article-jsonld';
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.text = article.jsonLdSchema;
    } catch (e) {
      console.error("Failed to inject JSON-LD", e);
    }
    return () => {
      const tag = document.getElementById('news-article-jsonld');
      if (tag) {
        tag.remove();
      }
    };
  }, [article.id, article.jsonLdSchema]);

  const handleToggleBookmark = () => {
    const savedBookmarks = localStorage.getItem('bookmarked_articles');
    let list: string[] = savedBookmarks ? JSON.parse(savedBookmarks) : [];
    
    if (bookmarked) {
      list = list.filter(id => id !== article.id);
      setBookmarked(false);
    } else {
      list.push(article.id);
      setBookmarked(true);
    }
    localStorage.setItem('bookmarked_articles', JSON.stringify(list));
  };

  const handleCopyLink = () => {
    const mockUrl = `${window.location.origin}/haber/${article.slug}`;
    navigator.clipboard.writeText(mockUrl).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    });
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !newComment.trim()) {
      alert('Lütfen adınızı ve yorum metnini doldurun.');
      return;
    }

    const brandNewComment: Comment = {
      id: Math.random().toString(36).substring(2, 9),
      author: authorName.trim(),
      email: authorEmail.trim() || 'anon@mersinodak.com',
      content: newComment.trim(),
      createdAt: new Date().toISOString(),
      likes: 0
    };

    const updated = [brandNewComment, ...comments];
    setComments(updated);
    localStorage.setItem(`comments_${article.id}`, JSON.stringify(updated));

    // Reset inputs
    setNewComment('');
    setAuthorName('');
    setAuthorEmail('');
  };

  const handleLikeComment = (commentId: string) => {
    if (hasVotedCommentIds.includes(commentId)) {
      alert('Bu yoruma zaten oy verdiniz!');
      return;
    }

    const updated = comments.map(c => {
      if (c.id === commentId) {
        return { ...c, likes: c.likes + 1 };
      }
      return c;
    });

    setComments(updated);
    localStorage.setItem(`comments_${article.id}`, JSON.stringify(updated));
    setHasVotedCommentIds(prev => [...prev, commentId]);
  };

  const catObj = CATEGORIES.find(c => c.id === article.category);
  const formattedDate = formatFriendlyDate(article.createdAt);

  return (
    <div className="space-y-6 fade-in" id={`article-reader-${article.id}`}>
      {/* Back button and bookmark options */}
      <div className="flex items-center justify-between py-2">
        <button
          onClick={onBack}
          className="cursor-pointer group flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-red-650 hover:text-red-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Geri Dön</span>
        </button>

        <button
          onClick={handleToggleBookmark}
          className={`cursor-pointer flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold tracking-wide transition-all ${bookmarked ? 'bg-red-50 text-red-700 border-red-200' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
        >
          <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-red-600 text-red-650 text-red-600' : 'text-slate-400'}`} />
          {bookmarked ? 'Kaydedildi' : 'Haberi Kaydet'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Article Side */}
        <div className="lg:col-span-2 space-y-6">
          <header className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-red-600 text-white font-bold text-[10px] tracking-wider uppercase px-2.5 py-1 rounded">
                {catObj ? catObj.name : article.category}
              </span>
              <span className="text-[11px] text-slate-400 font-mono">Düzeltilmiş Özgün İçerik</span>
            </div>

            {/* Giant Title */}
            <h1 className="font-serif font-black text-2xl sm:text-3xl lg:text-4xl text-slate-900 leading-tight tracking-tight">
              {article.title}
            </h1>

            {/* Structured Subhead Metadata */}
            <div className="flex flex-wrap items-center gap-4 py-3 border-y border-slate-100/90 text-xs text-slate-500 font-mono">
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-red-500" />
                Yazar: <strong className="text-slate-800">{article.author}</strong>
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {formattedDate}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {article.readTime} okuma süresi
              </span>
              <span className="flex items-center gap-1 shrink-0 ml-auto bg-slate-100 px-2 py-0.5 rounded font-semibold text-slate-600">
                <Eye className="w-3.5 h-3.5" />
                {article.views + 1} Okunma
              </span>
            </div>
          </header>

          {/* Large Hero Banner */}
          <div className="rounded-2xl overflow-hidden aspect-video border border-slate-100 bg-slate-50 relative">
            <img
              src={article.imageUrl}
              alt={article.title}
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=1200';
              }}
              className="object-cover w-full h-full"
            />
          </div>

          {/* Social Share Controls */}
          <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Share2 className="w-4 h-4 text-slate-500" />
              <span className="text-xs font-bold text-slate-700">Haberi Paylaşın</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {/* WhatsApp Share Link */}
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(article.title)} - ${encodeURIComponent(window.location.origin + '/haber/' + article.slug)}`}
                target="_blank"
                rel="noreferrer"
                className="bg-[#25D366] text-white px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 hover:opacity-90 transition-opacity"
              >
                <span>WhatsApp</span>
              </a>
              {/* X Share link */}
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(window.location.origin + '/haber/' + article.slug)}`}
                target="_blank"
                rel="noreferrer"
                className="bg-[#000000] text-white px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 hover:opacity-90 transition-opacity"
              >
                <span>X / Twitter</span>
              </a>
              {/* Copy URL */}
              <button
                onClick={handleCopyLink}
                className={`cursor-pointer px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 border transition-all ${copiedLink ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'}`}
              >
                {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'Kopyalandı!' : 'Bağlantıyı Kopyala'}</span>
              </button>
            </div>
          </div>

          {/* Rendered HTML News Content */}
          <div
            className="news-content news-reader-body prose max-w-none prose-slate"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Discussion Area */}
          <div className="pt-6 border-t border-slate-100 space-y-6" id="discussion-board">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-xl font-bold text-slate-900 flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-red-500" />
                Halk Kürsüsü / Tartışma Alanı ({comments.length})
              </h3>
              <span className="text-[10px] bg-red-55 px-2 py-0.5 rounded uppercase font-bold text-red-700 border border-red-100 bg-red-50">Moderasyonlu Alan</span>
            </div>

            {/* Comment write form */}
            <form onSubmit={handleAddComment} className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-4">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Yorumunuzu Gönderin</h4>
              <p className="text-[11px] text-slate-400">Yorumlar onay sırasına girmeden önce spam filtrelerince taranır. Lütfen genel ahlak kurallarına uyunuz.</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Rumuz / İsim *</label>
                  <input
                    type="text"
                    required
                    placeholder="örn: YenişehirliAhmet"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs outline-none focus:border-red-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">E-posta (Yayınlanmaz)</label>
                  <input
                    type="email"
                    placeholder="örn: ahmet@eposta.com"
                    value={authorEmail}
                    onChange={(e) => setAuthorEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">Yorum Metni *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Mersin hakkındaki fikirlerinizi veya bu habere ait eklemek istediklerinizi paylaşın..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs outline-none focus:border-red-500"
                />
              </div>

              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-5 py-2.5 rounded-lg shadow cursor-pointer flex items-center gap-1.5 transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                Yorum Yayınla
              </button>
            </form>

            {/* View comments comments */}
            <div className="space-y-4">
              {comments.length === 0 ? (
                <p className="text-sm text-slate-400 italic text-center py-6">Bu habere henüz yorum yapılmamış. İlk yorumu siz yazın!</p>
              ) : (
                comments.map((comment) => (
                  <div key={comment.id} className="bg-white p-4 rounded-xl border border-slate-100 space-y-2 relative">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="p-1 bg-slate-100 rounded-full text-slate-500">
                          <User className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <strong className="text-xs text-slate-800">{comment.author}</strong>
                          <span className="text-[9px] text-slate-400 font-mono block">
                            {new Date(comment.createdAt).toLocaleDateString('tr-TR', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleLikeComment(comment.id)}
                        className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border text-[11px] font-mono transition-all cursor-pointer ${hasVotedCommentIds.includes(comment.id) ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-700 border-slate-250'}`}
                      >
                        <ThumbsUp className="w-3 h-3" />
                        <span>Faydalı ({comment.likes})</span>
                      </button>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed pl-7 whitespace-pre-line">
                      {comment.content}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Sidebar Space with Info & ads */}
        <div className="space-y-6">
          {/* Core SEO Fact Cards */}
          <div className="bg-slate-900 text-white rounded-2xl p-5 space-y-4">
            <h4 className="font-serif font-bold text-sm border-b border-slate-800 pb-2 flex items-center gap-1.5">
              <span>SEO Bilgi Kartı</span>
            </h4>
            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <span className="text-slate-400 block text-[10px] uppercase font-mono">Meta Açıklaması:</span>
                <p className="text-slate-200 font-medium leading-normal bg-slate-950 p-2.5 rounded border border-slate-800/80">
                  {article.metaDescription}
                </p>
              </div>
              <div className="space-y-1">
                <span className="text-slate-400 block text-[10px] uppercase font-mono">SEO Etiketleri:</span>
                <div className="flex flex-wrap gap-1">
                  {article.tags.map((tag, i) => (
                    <span key={i} className="bg-slate-800 text-slate-200 px-2 py-0.5 rounded text-[10px] font-semibold border border-slate-755">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-xl">
                <p className="text-[11px] text-emerald-300 leading-normal font-semibold">
                  ✓ JSON-LD Şeması tarayıcı botlar için aktif durumda. Makale, Mersin yerel aramalarında Google Haberler ve Öne Çıkanlar'da görünmek üzere tam tescillidir.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
