import React, { useState } from 'react';
import { Shield, FileText, Landmark, Mail, BookOpen, Clock, Heart } from 'lucide-react';

export default function LegalPages() {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms' | 'cookies' | 'imprint'>('privacy');

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden" id="legal-and-policy-center">
      <div className="bg-slate-900 px-6 py-8 text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs bg-sky-500/20 text-sky-300 font-mono tracking-widest uppercase px-2.5 py-1 rounded-full border border-sky-500/30">
            AdSense Uyum Şartı
          </span>
          <h2 className="font-serif text-2xl font-bold mt-2">Hukuki Belgeler &amp; Künye</h2>
          <p className="text-slate-400 text-sm mt-1">
            Google AdSense ve Çerez Politikaları ile tam uyumlu resmi yayın belgelerimiz.
          </p>
        </div>
        <div className="flex bg-slate-800 p-1 rounded-xl border border-slate-700">
          <button 
            onClick={() => setActiveTab('privacy')}
            className={`cursor-pointer px-4 py-2 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all ${activeTab === 'privacy' ? 'bg-sky-700 text-white shadow' : 'text-slate-400 hover:text-white'}`}
          >
            <Shield className="w-3.5 h-3.5" /> Gizlilik
          </button>
          <button 
            onClick={() => setActiveTab('terms')}
            className={`cursor-pointer px-4 py-2 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all ${activeTab === 'terms' ? 'bg-sky-700 text-white shadow' : 'text-slate-400 hover:text-white'}`}
          >
            <FileText className="w-3.5 h-3.5" /> Şartlar
          </button>
          <button 
            onClick={() => setActiveTab('cookies')}
            className={`cursor-pointer px-4 py-2 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all ${activeTab === 'cookies' ? 'bg-sky-700 text-white shadow' : 'text-slate-400 hover:text-white'}`}
          >
            <BookOpen className="w-3.5 h-3.5" /> Çerezler
          </button>
          <button 
            onClick={() => setActiveTab('imprint')}
            className={`cursor-pointer px-4 py-2 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all ${activeTab === 'imprint' ? 'bg-sky-700 text-white shadow' : 'text-slate-400 hover:text-white'}`}
          >
            <Landmark className="w-3.5 h-3.5" /> Künye
          </button>
        </div>
      </div>

      <div className="p-6 md:p-8">
        {activeTab === 'privacy' && (
          <div className="space-y-6 animate-fade-in text-slate-600 text-sm leading-relaxed" id="policy-privacy">
            <h3 className="text-lg font-serif font-bold text-slate-800 border-b pb-2 flex items-center gap-2">
              <Shield className="w-5 h-5 text-sky-600" /> Gizlilik Politikası (Privacy Policy)
            </h3>
            <p><strong>Mersin Yerel Haber Portalı</strong> ("web sitemiz") olarak, ziyaretçilerimizin gizlilik haklarına sonsuz saygı duyuyor ve sitelerimizde geçirdikleri süreyi en güvenli şekilde deneyimlemeleri için çalışıyoruz.</p>
            
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2">
              <h4 className="font-semibold text-slate-800 text-xs tracking-wider uppercase">Google AdSense ve Çift Tıklama (DoubleClick) DART Çerezi</h4>
              <p className="text-xs">Üçüncü taraf satıcı olarak Google, sitemizde reklam yayınlamak için çerezlerden yararlanır. Google'ın DART çerezlerini kullanması, kullanıcılarımıza, sitemize ve internetteki diğer sitelere yaptıkları ziyaretlere dayalı reklamlar sunmasına olanak tanır. Kullanıcılar, Google reklam ve içerik ağı gizlilik politikasını ziyaret ederek DART çerezinin kullanılmasını engelleyebilir.</p>
            </div>

            <h4 className="font-semibold text-slate-800 mt-4 mb-1">Toplanan Veriler ve Günlük Dosyaları (Log Files)</h4>
            <p>Birçok standart web sunucusunda olduğu gibi sitemizde de istatistiksel amaçlı log dosyaları tutulmaktadır. Bu dosyalar; IP adresiniz, internet servis sağlayıcınız, tarayıcınızın özellikleri, işletim sisteminiz ve siteye giriş-çıkış sayfalarınız gibi standart tanımlamaları içerir. Günlük dosyaları kesinlikle kişisel kimlik bilgilerinizle ilişkilendirilmez ve gizliliğinizi ihlal etmez.</p>

            <h4 className="font-semibold text-slate-800 mt-4 mb-1">Haklarınız ve İletişim</h4>
            <p>Gizlilik politikamız hakkında her türlü dilek, şikayet veya verinizin silinmesi talebi için lütfen <strong>iletisim@mersinmansethaber.com</strong> adresi üzerinden bizimle irtibata geçiniz.</p>
          </div>
        )}

        {activeTab === 'terms' && (
          <div className="space-y-6 animate-fade-in text-slate-600 text-sm leading-relaxed" id="policy-terms">
            <h3 className="text-lg font-serif font-bold text-slate-800 border-b pb-2 flex items-center gap-2">
              <FileText className="w-5 h-5 text-sky-600" /> Kullanım Şartları (Terms of Service)
            </h3>
            <p>Sitemizin hizmetlerini kullanarak aşağıdaki genel koşulları peşinen kabul etmiş sayılırsınız:</p>
            
            <ul className="list-disc list-inside space-y-3 pl-2">
              <li><strong>Telif Hakkı:</strong> Sitemizde yer alan tüm özgün Mersin yerel haberleri, fotoğraflar ve özel grafik tasarımlar telif yasaları ile korunmaktadır. Kaynak gösterilmeden ve aktif link verilmeden kopyalanamaz.</li>
              <li><strong>İçerik Sorumluluğu:</strong> Yayınlanan haberler ve köşe yazıları bilgi amaçlıdır. Kullanıcıların haberlerdeki bilgilere dayanarak aldıkları kararlardan sitemiz sorumlu tutulamaz.</li>
              <li><strong>Yorum Kuralları:</strong> Tartışma ve yorum alanına yazılan tüm görüşler yazanın sorumluluğundadır. Hakaret, şiddet çağrısı ya da reklam barındıran yorumlar moderasyon ekibimiz tarafından derhal silinir.</li>
            </ul>

            <div className="p-4 bg-sky-50 text-sky-800 rounded-xl border border-sky-100 flex items-start gap-2.5">
              <Clock className="w-5 h-5 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-xs uppercase tracking-wide">Son Güncelleme Tarihi</p>
                <p className="text-xs mt-0.5">Bu kullanım sözleşmesi en son 17 Haziran 2026 tarihinde güncellenmiştir.</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'cookies' && (
          <div className="space-y-6 animate-fade-in text-slate-600 text-sm leading-relaxed" id="policy-cookies">
            <h3 className="text-lg font-serif font-bold text-slate-800 border-b pb-2 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-sky-600" /> Çerez Politikası (Cookie Policy)
            </h3>
            <p>Bu metin, Çerezlere (Cookies) yönelik kullanım esaslarını açıklamaktadır. Sitemizi ziyaret ettiğinizde verimli ve kişiselleştirilmiş bir deneyim yaşamanız için tarayıcınıza küçük metin dosyaları kaydedilir.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div className="p-4 border rounded-xl">
                <h4 className="font-bold text-slate-800 text-xs mb-1">Zorunlu Çerezler</h4>
                <p className="text-xs text-slate-500">Sitenin temel işlevlerini yürütebilmesi, giriş yapılarak yorum alanına katkıda bulunulması ve dil tercihlerinizin saklanması için kesinlikle gereklidir.</p>
              </div>
              <div className="p-4 border rounded-xl">
                <h4 className="font-bold text-slate-800 text-xs mb-1">Reklam ve Analitik Çerezleri</h4>
                <p className="text-xs text-slate-500">Google AdSense ve Google Analytics gibi altyapıların, ilgi alanlarınıza özel reklamlar ve web kullanım analizleri sunabilmek için tercih ettiği takip çerezleridir.</p>
              </div>
            </div>

            <h4 className="font-semibold text-slate-800">Çerezleri Nasıl Kontrol Edebilirsiniz?</h4>
            <p>Tarayıcınızın ayarlar kısmına girerek sistem çerezlerini tamamen devre dışı bırakabilir ya da yeni çerez eklenirken uyarı verilmesini sağlayabilirsiniz. Ancak bu kapatma işlemi sitemizdeki bazı etkileşimsel alanların (yorum yazma vb.) çalışmasını engelleyebilir.</p>
          </div>
        )}

        {activeTab === 'imprint' && (
          <div className="space-y-6 animate-fade-in text-slate-600 text-sm leading-relaxed" id="policy-imprint">
            <h3 className="text-lg font-serif font-bold text-slate-800 border-b pb-2 flex items-center gap-2">
              <Landmark className="w-5 h-5 text-sky-600" /> Yayıncı Künyesi (Publisher Imprint)
            </h3>
            <p>Basın ve İnternet Kanunları uyarınca, <strong>Mersin Yerel Haber Portalı</strong> yayın organına ait kurumsal, yönetim ve editoryal künye bilgileri aşağıdadır:</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-5 rounded-2xl border border-slate-100">
              <div className="space-y-3">
                <div>
                  <span className="text-xs font-semibold text-slate-400 block uppercase tracking-wider">İmtiyaz Sahibi / Publisher</span>
                  <span className="text-sm font-bold text-slate-900">Mersin Manşet Medya Ltd. Şti.</span>
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-400 block uppercase tracking-wider">Genel Yayın Yönetmeni / Editor-in-Chief</span>
                  <span className="text-sm font-semibold text-slate-900">Dr. Hakan Kurtuluş</span>
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-400 block uppercase tracking-wider">Sorumlu Yazı İşleri Müdürü / Editorial Manager</span>
                  <span className="text-sm font-semibold text-slate-900">M. Cem Özdemir</span>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <span className="text-xs font-semibold text-slate-400 block uppercase tracking-wider">Adres / Address</span>
                  <span className="text-sm text-slate-700 block">Kültür Mahallesi, Atatürk Caddesi Marina İşhanı Kat: 3, Yenişehir / Mersin</span>
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-400 block uppercase tracking-wider">İletişim / Mail</span>
                  <span className="text-sm font-bold text-sky-700 flex items-center gap-1">
                    <Mail className="w-4 h-4" /> iletisim@mersinmansethaber.com
                  </span>
                </div>
                <div className="pt-2">
                  <span className="text-[11px] text-emerald-600 bg-emerald-50 border border-emerald-100 rounded px-2.5 py-1 inline-flex items-center gap-1 font-semibold">
                    <Heart className="w-3 h-3 text-emerald-500 fill-emerald-500" /> 5651 Sayılı Kanuna Tam Uyumlu
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
