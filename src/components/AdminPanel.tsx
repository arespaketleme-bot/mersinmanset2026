import React, { useState } from 'react';
import { Lock, Sparkles, Check, X, RefreshCw, Eye, ArrowLeft, LogOut, FileText, Calendar, Tag, Clock, ChevronRight } from 'lucide-react';
import { NewsArticle } from '../types';

interface AdminPanelProps {
  onClose: () => void;
  onNewsPublished: () => void;
}

export default function AdminPanel({ onClose, onNewsPublished }: AdminPanelProps) {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isFetchingDraft, setIsFetchingDraft] = useState(false);
  const [draftArticle, setDraftArticle] = useState<NewsArticle | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
      setErrorMsg('');
    } else {
      setErrorMsg('Hatalı şifre! Lütfen şifrenizi kontrol edin.');
    }
  };

  const fetchDraftNews = async () => {
    setIsFetchingDraft(true);
    setErrorMsg('');
    setPublishSuccess(false);
    setDraftArticle(null);

    try {
      const res = await fetch('/api/admin/fetch-draft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: 'admin123' })
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Taslak haber üretilirken bir hata oluştu.');
      }

      const data: NewsArticle = await res.json();
      setDraftArticle(data);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Mersin haber taslağı çekilemedi.');
    } finally {
      setIsFetchingDraft(false);
    }
  };

  const publishDraftNews = async () => {
    if (!draftArticle) return;
    setIsPublishing(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/admin/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: 'admin123', article: draftArticle })
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Haber yayınlanırken bir hata oluştu.');
      }

      setPublishSuccess(true);
      setDraftArticle(null);
      // Let parent component know a news item has been published so it can refresh the list
      onNewsPublished();
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Haber yayınlanamadı.');
    } finally {
      setIsPublishing(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto my-12 bg-white border border-slate-200 rounded-3xl p-8 shadow-xl animate-fade-in" id="admin-login-card">
        <div className="text-center space-y-3 mb-6">
          <div className="bg-red-50 text-red-600 p-4 rounded-2xl border border-red-100 w-fit mx-auto">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-serif font-black tracking-tight text-slate-900 uppercase">
            MERSİN MANŞET YÖNETİCİ GİRİŞİ
          </h2>
          <p className="text-xs text-slate-500">
            Yapay zeka bülteni çekmek ve onay mekanizmasını yönetmek için şifrenizi giriniz.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block" htmlFor="admin-password-input">
              Yönetici Şifresi
            </label>
            <input
              id="admin-password-input"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-mono text-sm outline-none focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all"
              autoFocus
            />
          </div>

          {errorMsg && (
            <div className="bg-red-50 border border-red-150 rounded-xl p-3 text-xs text-red-600 flex items-center gap-2 font-semibold">
              <span className="w-1.5 h-1.5 bg-red-600 rounded-full shrink-0"></span>
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="pt-2 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 py-3 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer select-none"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Ana Sayfa</span>
            </button>
            <button
              type="submit"
              className="w-1/2 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-md shadow-red-500/10 transition-all flex items-center justify-center gap-2 cursor-pointer select-none"
            >
              <span>Giriş Yap</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white border border-slate-150 rounded-3xl p-6 md:p-8 shadow-md space-y-8 animate-fade-in" id="admin-dashboard">
      {/* Top action bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div className="flex items-center gap-3">
          <div className="bg-red-600 text-white p-2.5 rounded-xl font-bold font-sans italic select-none">
            M
          </div>
          <div>
            <h2 className="text-xl font-serif font-black tracking-tight text-slate-900 uppercase">
              Mersin Manşet Yönetim Paneli
            </h2>
            <p className="text-xs text-slate-500">
              Yapay Zeka (Gemini 3.5 Flash) ile anlık canlı haber üretimi ve yayın kontrol masası.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setIsAuthenticated(false);
              setPassword('');
              setDraftArticle(null);
              setPublishSuccess(false);
              setErrorMsg('');
            }}
            className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer select-none border border-slate-200"
          >
            <LogOut className="w-4 h-4" />
            <span>Çıkış Yap</span>
          </button>
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-850 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer select-none"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Siteye Dön</span>
          </button>
        </div>
      </div>

      {/* Control Station Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 bg-slate-50 border border-slate-200/60 rounded-2xl p-5 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-red-500" />
            Otomasyon Kumandası
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Mersin'in tescilli konularından (Eshab-ı Kehf Mağarası, Silifke Keçiboynuzu, Mersin Limanı, Kızkalesi, Tantuni ve daha fazlası) rastgele birini seçerek, Gemini modeli vasıtasıyla SEO uyumlu, AdSense politikalarına uygun ve kurallı Türkçe ile 100% özgün bir haber hazırlar.
          </p>

          <button
            onClick={fetchDraftNews}
            disabled={isFetchingDraft}
            className="w-full py-3.5 bg-gradient-to-r from-red-600 to-rose-550 hover:from-red-700 hover:to-rose-650 text-white disabled:from-slate-300 disabled:to-slate-300 disabled:text-slate-500 font-bold text-xs rounded-xl shadow-lg shadow-red-500/10 transition-all flex items-center justify-center gap-2 cursor-pointer select-none"
          >
            {isFetchingDraft ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Yapay Zeka Yazıyor...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Yeni Haber Çek</span>
              </>
            )}
          </button>

          {errorMsg && (
            <div className="bg-red-50 border border-red-150 rounded-xl p-3.5 text-xs text-red-600 space-y-1">
              <p className="font-bold">Hata Meydana Geldi:</p>
              <p className="font-mono text-[11px] leading-relaxed break-words">{errorMsg}</p>
            </div>
          )}

          {publishSuccess && (
            <div className="bg-emerald-50 border border-emerald-150 text-emerald-800 rounded-xl p-4 space-y-1.5 animate-fade-in">
              <div className="flex items-center gap-2 font-bold text-xs">
                <Check className="w-4 h-4 text-emerald-600 bg-emerald-100 rounded-full p-0.5" />
                <span>Haber Başarıyla Yayınlandı!</span>
              </div>
              <p className="text-[11px] leading-relaxed text-emerald-700">
                Haber onaylanarak en güncel haber listesinin en başına yerleştirilmiştir. Ana sayfayı ziyaret ederek canlı olarak görüntüleyebilirsiniz.
              </p>
            </div>
          )}
        </div>

        {/* Live Draft Preview & Publishing Section */}
        <div className="md:col-span-2 border border-slate-150 rounded-2xl overflow-hidden bg-white flex flex-col justify-between">
          <div className="bg-slate-900 text-white px-5 py-3.5 flex items-center justify-between">
            <span className="text-xs font-mono font-bold tracking-wider flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-red-400" />
              TASLAK ÖNİZLEME MASASI
            </span>
            {draftArticle && (
              <span className="bg-amber-500/10 text-amber-400 text-[10px] uppercase font-bold tracking-wide px-2 py-0.5 rounded border border-amber-500/20">
                YAYIN ONAYI BEKLİYOR
              </span>
            )}
          </div>

          {draftArticle ? (
            <div className="p-6 space-y-6 overflow-y-auto max-h-[460px] scrollbar-thin">
              {/* Draft Header Card */}
              <div className="space-y-3 border-b border-slate-100 pb-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="bg-red-50 text-red-600 text-[10px] font-extrabold uppercase tracking-wide px-2 py-0.5 rounded border border-red-100">
                    {draftArticle.category.toUpperCase()}
                  </span>
                  <span className="text-slate-400 text-xs">•</span>
                  <span className="text-slate-500 text-xs font-mono flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> Okuma: {draftArticle.readTime}
                  </span>
                </div>

                <h1 className="text-xl sm:text-2xl font-serif font-black tracking-tight text-slate-950 leading-tight">
                  {draftArticle.title}
                </h1>

                <p className="text-xs sm:text-sm text-slate-600 font-semibold leading-relaxed border-l-2 border-red-600 pl-3 italic bg-slate-50 py-2.5 pr-2 rounded-r-xl">
                  {draftArticle.summary}
                </p>
              </div>

              {/* Cover Image Simulation */}
              <div className="rounded-xl overflow-hidden aspect-video max-h-56 relative bg-slate-100">
                <img 
                  src={draftArticle.imageUrl} 
                  alt="Önizleme" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-slate-900/80 text-white text-[9px] font-mono px-2 py-1 rounded">
                  Uyumlu Görsel
                </div>
              </div>

              {/* Draft HTML Content */}
              <div className="prose prose-sm text-slate-800 space-y-4 max-w-none text-xs sm:text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: draftArticle.content }} />

              {/* Metadata details */}
              <div className="bg-slate-50 border border-slate-150 rounded-xl p-4 space-y-2 text-xs font-mono text-slate-600">
                <div className="flex items-center gap-2">
                  <Tag className="w-3.5 h-3.5 text-slate-400" />
                  <span><strong>Etiketler:</strong> {draftArticle.tags.join(', ')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5 text-slate-400" />
                  <span><strong>SEO Meta Açıklaması:</strong> {draftArticle.metaDescription}</span>
                </div>
              </div>

              {/* Confirmation Prompt Block */}
              <div className="bg-red-50/50 border border-red-100 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center sm:text-left">
                  <h4 className="text-sm font-bold text-slate-900">
                    Haber Haber Akışında Yayınlansın mı?
                  </h4>
                  <p className="text-xs text-slate-500">
                    "Evet, Yayınla" butonuna bastığınızda, bu haber hemen tüm okuyucuların ana ekranına düşecektir.
                  </p>
                </div>
                <div className="flex items-center gap-2.5 shrink-0 w-full sm:w-auto">
                  <button
                    onClick={() => setDraftArticle(null)}
                    className="w-1/2 sm:w-auto px-4 py-2.5 bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-xl border border-slate-200 transition-all cursor-pointer select-none"
                  >
                    Reddet / İptal Et
                  </button>
                  <button
                    onClick={publishDraftNews}
                    disabled={isPublishing}
                    className="w-1/2 sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white disabled:bg-slate-300 font-bold text-xs rounded-xl shadow-md shadow-emerald-500/10 transition-all flex items-center justify-center gap-1.5 cursor-pointer select-none"
                  >
                    {isPublishing ? (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Check className="w-4 h-4" />
                    )}
                    <span>Evet, Yayınla</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center flex flex-col items-center justify-center space-y-4 flex-1">
              <div className="bg-slate-50 text-slate-300 p-5 rounded-2xl border border-dashed border-slate-200">
                <FileText className="w-10 h-10" />
              </div>
              <div className="space-y-1 max-w-xs">
                <h4 className="text-sm font-bold text-slate-700">Hazırda Taslak Yok</h4>
                <p className="text-xs text-slate-400">
                  Yeni bir yapay zeka haberi oluşturmak ve kontrol panelini başlatmak için soldaki <strong>"Yeni Haber Çek"</strong> butonuna basın.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
