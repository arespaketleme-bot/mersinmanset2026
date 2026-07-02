import React, { useState, useEffect } from 'react';
import { Newspaper, Bell, Sparkles, Code, CheckCircle, Flame, Award, ChevronRight, BookmarkCheck, Layout, Info, Clock, RefreshCw } from 'lucide-react';
import { INITIAL_NEWS, CATEGORIES } from './data/mockNews';
import { NewsArticle } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import ArticleCard from './components/ArticleCard';
import ArticleDetail from './components/ArticleDetail';
import LegalPages from './components/LegalPages';
import AdminPanel from './components/AdminPanel';
import WeatherWidget from './components/WeatherWidget';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [allArticles, setAllArticles] = useState<NewsArticle[]>(() => {
    // Load dynamically added news if any exist in storage
    const stored = localStorage.getItem('mersin_news_articles');
    if (stored) {
      return JSON.parse(stored);
    }
    return INITIAL_NEWS;
  });
  const [policyOpen, setPolicyOpen] = useState<boolean>(false);
  const [adminViewOpen, setAdminViewOpen] = useState<boolean>(false);
  const [cookieConsentAccepted, setCookieConsentAccepted] = useState<boolean>(() => {
    return localStorage.getItem('accepted_cookies') === 'true';
  });

  const [subscriberList, setSubscriberList] = useState<string[]>(() => {
    const list = localStorage.getItem('newsletter_emails');
    return list ? JSON.parse(list) : [];
  });

  // Track comments aggregate count for SEO analytical metrics
  const [totalCommentsCount, setTotalCommentsCount] = useState(0);

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const fetchLatestNews = async (showLoadingIndicator = false) => {
    if (showLoadingIndicator) setIsRefreshing(true);
    try {
      const res = await fetch('/api/news');
      if (!res.ok) throw new Error("Mersin Manşet Canlı Haber Akışı yüklenemedi.");
      const data: NewsArticle[] = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        setAllArticles(data);
        setLastUpdated(new Date());
      }
    } catch (err) {
      console.warn("Mersin Manşet: Canlı saat başı bültenleri çekilemedi, statik verilerle devam ediliyor.", err);
    } finally {
      if (showLoadingIndicator) {
        setTimeout(() => setIsRefreshing(false), 600);
      }
    }
  };

  // Sync articles, subscriber lists, and stats
  useEffect(() => {
    // Initial fetch
    fetchLatestNews();

    // Automatic polling interval to fetch the latest news every 30 seconds
    const intervalId = setInterval(() => {
      fetchLatestNews(false);
    }, 30000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    localStorage.setItem('mersin_news_articles', JSON.stringify(allArticles));
  }, [allArticles]);

  useEffect(() => {
    localStorage.setItem('newsletter_emails', JSON.stringify(subscriberList));
  }, [subscriberList]);

  // Date stimulation in Turkish
  const getTurkishDateString = () => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date().toLocaleDateString('tr-TR', options);
  };

  const handleAcceptCookies = () => {
    localStorage.setItem('accepted_cookies', 'true');
    setCookieConsentAccepted(true);
  };

  // Filter logic
  const filteredArticles = allArticles.filter(art => {
    const matchesCategory = activeCategory === '' || art.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Hot/featured news selection (highest views or latest)
  const featuredArticle = allArticles.find(a => a.id === 'mersin-limani-yatirim') || allArticles[0];
  const sideFeaturedArticles = allArticles.filter(a => a.id !== featuredArticle.id).slice(0, 3);

  if (adminViewOpen) {
    return (
      <div className="min-h-screen bg-slate-100 text-slate-800 font-sans flex flex-col justify-between" id="mersin-admin-root">
        {/* Dynamic AdSense Defense Style Tag - Suppress all ads on administrative workspace */}
        <style dangerouslySetInnerHTML={{ __html: `
          .adsbygoogle,
          ins.adsbygoogle,
          .google-auto-placed,
          [id^="google_ads_iframe"],
          iframe[name^="google_ads_iframe"],
          #google_image_div,
          .google-ad-slot,
          .ad-container,
          .ads-container {
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
            height: 0 !important;
            width: 0 !important;
            pointer-events: none !important;
          }
        `}} />
        <main className="max-w-7xl mx-auto px-4 py-8 flex-1 w-full space-y-6">
          <button
            onClick={() => setAdminViewOpen(false)}
            className="cursor-pointer text-xs font-bold text-slate-700 hover:text-red-650 flex items-center gap-1.5 transition-all bg-white hover:bg-slate-50 px-4 py-2 rounded-xl border border-slate-200 shadow-sm w-fit select-none font-sans"
          >
            ← Ana Sayfaya Dön
          </button>
          <AdminPanel 
            onClose={() => setAdminViewOpen(false)} 
            onNewsPublished={() => {
              fetchLatestNews(false);
            }} 
          />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/70 text-slate-800 font-sans flex flex-col justify-between" id="mersin-app-root">
      {/* Dynamic AdSense Defense Style Tag - Suppress ads on Legal Pages, Empty Search Results, or Custom states */}
      {(policyOpen || filteredArticles.length === 0) && (
        <style dangerouslySetInnerHTML={{ __html: `
          .adsbygoogle,
          ins.adsbygoogle,
          .google-auto-placed,
          [id^="google_ads_iframe"],
          iframe[name^="google_ads_iframe"],
          #google_image_div,
          .google-ad-slot,
          .ad-container,
          .ads-container {
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
            height: 0 !important;
            width: 0 !important;
            pointer-events: none !important;
          }
        `}} />
      )}
      
      {/* Dynamic Header Component */}
      <Header
        activeCategory={activeCategory}
        setActiveCategory={(cat) => {
          setActiveCategory(cat);
          setPolicyOpen(false);
          setAdminViewOpen(false);
          setSelectedArticle(null);
        }}
        searchQuery={searchQuery}
        setSearchQuery={(q) => {
          setSearchQuery(q);
          setPolicyOpen(false);
          setAdminViewOpen(false);
          setSelectedArticle(null);
        }}
        onOpenPolicy={() => {
          setPolicyOpen(true);
          setAdminViewOpen(false);
          setSelectedArticle(null);
        }}
        onOpenAdmin={() => {
          setAdminViewOpen(true);
          setPolicyOpen(false);
          setSelectedArticle(null);
        }}
        currentDateStr={getTurkishDateString()}
      />

      {/* Breaking News Ticker Row */}
      <div className="bg-slate-100 border-b border-slate-200/50 py-2">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-3">
          <span className="flex items-center gap-1 bg-red-600 text-white rounded px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider animate-pulse font-mono select-none shrink-0">
            <Flame className="w-3.5 h-3.5" /> SON DAKİKA
          </span>
          <div className="overflow-hidden relative w-full h-5 text-xs text-slate-700 font-semibold font-mono flex items-center">
            <div className="absolute whitespace-nowrap animate-[marquee_25s_linear_infinite] hover:pause">
              Mersin Limanı rıhtım genişleme fazı bitti • Tarihi Tarsus evlerinde yeni zeytinyağı işlikleri keşfedildi • Mezitli akıllı tarım uygulamaları narenciyede ihracat rekoru kırdırdı • Yeni Mersin İdman Yurdu spor kulübünden 1. lig hazırlık transferleri • Mersin Metrosu Yenişehir istasyonu tünelleri birleştirildi...
            </div>
          </div>
        </div>
      </div>

      {/* main content layout */}
      <main className="max-w-7xl mx-auto px-4 py-6 md:py-8 flex-1 w-full space-y-8">
        
        {/* Dynamic Inner views routing dispatcher */}
        {policyOpen ? (
          <div className="space-y-6">
            <button
              onClick={() => setPolicyOpen(false)}
              className="cursor-pointer text-xs font-bold text-slate-750 hover:text-red-600 flex items-center gap-1"
            >
              ← Ana Sayfaya Dön
            </button>
            <LegalPages />
          </div>
        ) : selectedArticle ? (
          <ArticleDetail
            article={selectedArticle}
            onBack={() => setSelectedArticle(null)}
          />
        ) : (
          <div className="space-y-8 animate-fade-in">
            
            {/* 1. HERO FEATURED NEWS ROW (Only on main highlights page) */}
            {activeCategory === '' && searchQuery === '' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" id="hero-headlines-grid">
                
                {/* Primary Hero Feature Card */}
                <div 
                  className="lg:col-span-2 bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col justify-between group"
                  onClick={() => setSelectedArticle(featuredArticle)}
                >
                  <div className="aspect-video w-full overflow-hidden bg-slate-100 relative">
                    <img
                      src={featuredArticle.imageUrl}
                      alt={featuredArticle.title}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=1200';
                      }}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                      <span className="bg-red-600 text-white font-bold text-[9px] uppercase px-2 py-0.5 tracking-wider rounded w-fit inline-block">
                        FIRSAT HABERİ
                      </span>
                      <h2 className="font-serif font-black text-xl sm:text-2xl lg:text-3xl text-white leading-tight tracking-tight hover:underline">
                        {featuredArticle.title}
                      </h2>
                      <p className="text-slate-200 text-xs sm:text-sm line-clamp-2 leading-relaxed">
                        {featuredArticle.summary}
                      </p>
                    </div>
                  </div>
                  <div className="p-5 flex items-center justify-between bg-slate-50/50 text-slate-500 text-xs font-mono">
                    <span>Yazar: {featuredArticle.author}</span>
                    <span className="flex items-center gap-1">Okuma: {featuredArticle.readTime}</span>
                  </div>
                </div>

                {/* Side highlight stack (Mersin Right Pane) */}
                <div className="space-y-4 flex flex-col justify-between">
                  <div className="bg-slate-900 text-white p-5 rounded-3xl">
                    <span className="text-[10px] bg-red-500/10 text-red-400 font-mono tracking-wider font-bold uppercase px-2 py-0.5 rounded border border-red-500/20 inline-block mb-3 animate-pulse">
                      Editörün Seçimleri
                    </span>
                    <div className="space-y-4 split-line-holder">
                      {sideFeaturedArticles.map((art) => (
                        <div 
                          key={art.id} 
                          className="group border-b border-slate-800 pb-3 last:border-0 last:pb-0 cursor-pointer space-y-1"
                          onClick={() => setSelectedArticle(art)}
                        >
                          <span className="text-[10px] text-amber-400 font-mono font-bold tracking-wide">#{art.category.toUpperCase()}</span>
                          <h4 className="font-serif font-bold text-sm text-slate-100 group-hover:text-red-400 transition-colors leading-snug line-clamp-2">
                            {art.title}
                          </h4>
                          <p className="text-[11px] text-slate-400 font-mono flex items-center gap-1.5 pt-1">
                            <span>Okuma: {art.readTime}</span>
                            <span>•</span>
                            <span>{art.views} Okunma</span>
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 2. CATEGORY ARCHIVE FEED FILTER */}
            <div className="space-y-6" id="news-grid-section">
              <WeatherWidget />

              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 border-b border-slate-200 pb-3">
                <div className="space-y-1">
                  <h2 className="font-serif font-black text-2xl text-slate-900">
                    {activeCategory !== '' 
                      ? `${CATEGORIES.find(c => c.id === activeCategory)?.name} Haberleri`
                      : searchQuery !== ''
                      ? `"${searchQuery}" İçin Arama Sonuçları`
                      : 'Mersin Yerel Gelişmeler'
                    }
                  </h2>
                  <p className="text-xs text-slate-500">
                    {filteredArticles.length} makale listelendi • En hızlı ve yalın yerel haber akışı
                  </p>
                </div>

                {/* Local indices info */}
                <div className="flex items-center gap-2 font-mono text-[11px] text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg border">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                  <span>Google botları son indeksleme: <strong className="text-slate-800 font-bold">Şimdi aktif</strong></span>
                </div>
              </div>

              {/* Hourly Automation Badge Banner */}
              <div className="bg-gradient-to-r from-red-500/5 via-slate-900/5 to-transparent border border-red-500/10 rounded-2xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="bg-red-600/10 text-red-600 p-2.5 rounded-xl border border-red-500/20 shrink-0">
                    <Sparkles className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-950 flex flex-wrap items-center gap-1.5 leading-snug">
                       Mersin Manşet Canlı Yapay Zeka Haber Yayını Aktif
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-emerald-500/10 text-emerald-600 text-[10px] uppercase font-mono tracking-wider font-extrabold rounded-full border border-emerald-500/20">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
                        Saatlik Canlı Akış
                      </span>
                    </h4>
                    <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
                      Merkezi haber sistemimiz her saat başı Mersin'in farklı bir bölgesinden, tarım, kültür, turizm ve ekonomi bültenlerini toplayarak %100 bağımsız ve özgün bir dille kaleme alır.
                    </p>
                    <div className="text-[10px] text-slate-500 font-mono mt-1.5 flex flex-wrap items-center gap-2">
                      <span className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">Autosync: Aktif (30s)</span>
                      <span>•</span>
                      <span>Son Güncelleme: <strong className="text-slate-800">{lastUpdated.toLocaleTimeString('tr-TR')}</strong></span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2 shrink-0 w-full md:w-auto">
                  <button 
                    onClick={() => fetchLatestNews(true)}
                    disabled={isRefreshing}
                    className="flex items-center justify-center gap-1.5 bg-white hover:bg-slate-50 text-slate-700 disabled:text-slate-400 px-3.5 py-2 rounded-xl border border-slate-200 shadow-sm transition-all duration-200 font-bold text-xs cursor-pointer select-none grow md:grow-0"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 text-red-500 ${isRefreshing ? 'animate-spin' : ''}`} />
                    <span>{isRefreshing ? 'Yenileniyor...' : 'Haberleri Yenile'}</span>
                  </button>
                  <div className="flex items-center justify-center gap-2 bg-slate-900 text-white px-3.5 py-2 rounded-xl border border-slate-800 shadow-sm font-mono text-[11px] grow md:grow-0">
                    <Clock className="w-4 h-4 text-red-400 animate-pulse" />
                    <span>Sıradaki bülten: </span>
                    <span className="font-bold text-red-400">Her saat başında</span>
                  </div>
                </div>
              </div>

              {/* Feed Grid cards */}
              {filteredArticles.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-200" id="empty-search-state">
                  <Newspaper className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <h4 className="font-serif font-bold text-slate-800">Aradığınız Haber Bulunamadı</h4>
                  <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">
                    Mersin ili için girdiğiniz kelimeyle eşleşen bir özgün içeriğe ulaşamadık. Lütfen farklı anahtar kelimelerle arama yapın.
                  </p>
                  <button
                    onClick={() => { setSearchQuery(''); setActiveCategory(''); }}
                    className="mt-4 px-4 py-2 bg-slate-900 hover:bg-slate-850 text-white rounded-xl text-xs font-semibold cursor-pointer"
                  >
                    Tüm Haberleri Göster
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredArticles.map((art) => (
                    <ArticleCard
                      key={art.id}
                      article={art}
                      onSelect={() => {
                        setSelectedArticle(art);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

          </div>
        )}
      </main>

      {/* Dynamic persistent Cookie Consent banner for AdSense requirement */}
      {!cookieConsentAccepted && (
        <div className="fixed bottom-0 left-0 right-0 bg-slate-950/95 backdrop-blur-md text-white border-t border-slate-800 p-4 sm:p-5 z-55 animate-fade-in" id="cookie-compliance-block">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2.5 bg-red-55 px-2.5 py-2.5 bg-red-500/10 text-red-400 border border-red-500/20 rounded-xl shrink-0">
                <Info className="w-5 h-5" />
              </div>
              <p className="text-xs text-slate-300 leading-normal max-w-3xl">
                <strong>Çerezlerle Güvenli Deneyim:</strong> Mersin Manşet Yerel Haber Portalı, Google AdSense kişiselleştirilmiş reklam hedeflemeleri, ziyaretçi tarama analitikleri ve tartışma alanı rumuz hatırlatıcılarının düzgün çalışması için tarayıcı çerezleri kullanmaktadır. Sitemizi kullanmaya devam ederek bu çerez şartını kabul etmiş sayılırsınız.
              </p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button
                onClick={() => setPolicyOpen(true)}
                className="px-4 py-2 border border-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-semibold cursor-pointer"
              >
                Bilgileri İncele
              </button>
              <button
                onClick={handleAcceptCookies}
                className="px-5 py-2 bg-red-650 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer transition-colors"
              >
                Kabul Et ve Anladım
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer component */}
      <Footer
        onOpenPolicy={() => {
          setPolicyOpen(true);
          setSelectedArticle(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        subscriberList={subscriberList}
        setSubscriberList={setSubscriberList}
      />
    </div>
  );
}
