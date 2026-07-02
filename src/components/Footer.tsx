import React, { useState } from 'react';
import { Mail, Send, Check, MapPin, ShieldAlert, Award, ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenPolicy: () => void;
  subscriberList: string[];
  setSubscriberList: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function Footer({ onOpenPolicy, subscriberList, setSubscriberList }: FooterProps) {
  const [emailInput, setEmailInput] = useState('');
  const [subscribedMessage, setSubscribedMessage] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes('@')) {
      alert('Lütfen geçerli bir e-posta adresi girin.');
      return;
    }

    if (subscriberList.includes(emailInput)) {
      alert('Bu e-posta adresi zaten bültenimize kayıtlı!');
      return;
    }

    setSubscriberList(prev => [...prev, emailInput]);
    setSubscribedMessage(true);
    setEmailInput('');
    setTimeout(() => {
      setSubscribedMessage(false);
    }, 4000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800" id="main-site-footer">
      {/* Newsletter Block */}
      <div className="border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <span className="text-xs bg-red-500/10 text-red-400 font-mono tracking-widest uppercase px-3 py-1 rounded border border-red-500/20 inline-block mb-3">
              Mersin Bülten Aboneliği
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white leading-tight">
              Kentin Gelişmelerini Kaçırmayın
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1.5 max-w-lg leading-relaxed">
              Mersin Limanı kapasite durumları, turizm festivalleri, güncel belediye projeleri ve yerel lezzet tescil duyuruları haftalık özetle e-postanıza düşsün.
            </p>
          </div>

          <div>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md lg:ml-auto">
              <div className="relative flex-1">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  placeholder="E-posta adresinizi girin..."
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                />
              </div>
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-705 bg-red-600 hover:bg-red-700 text-white font-semibold text-xs px-6 py-3 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer transition-colors shrink-0"
              >
                {subscribedMessage ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-300" />
                    <span>Kaydedildi!</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Bültene Katıl</span>
                  </>
                )}
              </button>
            </form>
            {subscribedMessage && (
              <p className="text-[11px] text-emerald-400 mt-2 font-mono text-left sm:text-right">
                ✓ Teşekkürler! Mersin Manşet haber bülteni kaydınız başarıyla oluşturuldu.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Sitemap Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* About column */}
        <div className="space-y-4">
          <div className="flex items-baseline gap-1">
            <span className="font-serif text-2xl font-black text-white tracking-tight">MERSİN</span>
            <span className="font-serif text-2xl font-light text-red-500 tracking-tight">MANŞET</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Mersin iline ait tüm ilçelerin, tescilli lezzet duraklarının ve sivil projelerin nabzını tutan, Google AdSense uyum yönergelerine uygun olarak hazırlanmış özgün yerel haber organıdır.
          </p>
          <div className="text-[11px] text-slate-500 flex items-start gap-1 pb-2">
            <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
            <span>Kültür Mh. Atatürk Cd. Marina İşhanı Kat: 3, Yenişehir / Mersin</span>
          </div>
        </div>

        {/* Categories Fast Link */}
        <div>
          <h4 className="font-sans font-bold text-xs tracking-wider text-white uppercase mb-4">Mersin Kategorileri</h4>
          <ul className="space-y-2 text-xs">
            <li><a href="#tantuni" className="text-slate-400 hover:text-white transition-colors">Gündem Haberleri</a></li>
            <li><a href="#tantuni" className="text-slate-400 hover:text-white transition-colors">Ekonomi &amp; Liman Lojistiği</a></li>
            <li><a href="#tantuni" className="text-slate-400 hover:text-white transition-colors">Tarih, Kültür &amp; Tarsus Arşivi</a></li>
            <li><a href="#tantuni" className="text-slate-400 hover:text-white transition-colors">Yöresel Mersin Lezzet Noktaları</a></li>
            <li><a href="#tantuni" className="text-slate-400 hover:text-white transition-colors">Yeni Mersin İdman Yurdu Gazetesi</a></li>
          </ul>
        </div>

        {/* AdSense Integrity and principles */}
        <div>
          <h4 className="font-sans font-bold text-xs tracking-wider text-white uppercase mb-4 font-mono select-none">AdSense Uyumluluk</h4>
          <div className="space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 text-xs">
            <div className="flex items-start gap-2">
              <Award className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <p className="text-slate-300 font-semibold leading-snug">Özgünlük Garantisi</p>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Tüm haber içerikleri, tekrara düşmeyen anlatımlarla SEO ve Google Yayıncı Şartlarına tam uyumlu hazırlanır.
            </p>
            <button
              onClick={onOpenPolicy}
              className="text-red-400 hover:text-red-300 font-semibold text-[11px] block transition-colors cursor-pointer"
            >
              Hukuki İlkelerimizi İncele &gt;
            </button>
          </div>
        </div>

        {/* Official publisher indicators */}
        <div className="space-y-4">
          <h4 className="font-sans font-bold text-xs tracking-wider text-white uppercase">Yasal Standartlar</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Sitemizdeki tüm içerikler <strong>5651 Sayılı Yer Sağlayıcı Kanunu</strong> hükümleri ve 2026 yılı internet haberciliği resmi yönergelerine uyum çerçevesinde lisanslıdır.
          </p>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5 text-emerald-500" /> Güvenli SSL Aktif
            </span>
            <span className="text-slate-500 font-mono">v1.2.4</span>
          </div>
        </div>
      </div>

      {/* Copywriter Bar */}
      <div className="bg-slate-950 py-6 text-slate-500 text-xs text-center border-t border-slate-800/40">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <p>&copy; {new Date().getFullYear()} Mersin Manşet Haber Portalı. Tüm hakları saklıdır. Mersin Lojistik ve Kültür Yayını.</p>
          <div className="flex items-center gap-4">
            <button onClick={onOpenPolicy} className="hover:text-slate-300 cursor-pointer text-xs">Gizlilik Sözleşmesi</button>
            <span>•</span>
            <button onClick={onOpenPolicy} className="hover:text-slate-300 cursor-pointer text-xs">Yıkım &amp; Künye</button>
            <span>•</span>
            {/* Scroll back to top */}
            <button onClick={scrollToTop} className="bg-slate-800 hover:bg-slate-700 hover:text-white p-2 rounded-lg cursor-pointer transition-colors" title="Tepeye çık">
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
