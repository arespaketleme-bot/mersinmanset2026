import React, { useState, useEffect } from 'react';
import { Search, Sun, Bell, Calendar, Menu, X, Check } from 'lucide-react';
import { CATEGORIES } from '../data/mockNews';

interface HeaderProps {
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onOpenPolicy: () => void;
  onOpenAdmin: () => void;
  currentDateStr: string;
}

export default function Header({
  activeCategory,
  setActiveCategory,
  searchQuery,
  setSearchQuery,
  onOpenPolicy,
  onOpenAdmin,
  currentDateStr
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationActive, setNotificationActive] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [districts, setDistricts] = useState<string[]>(['Yenişehir', 'Mezitli', 'Tarsus', 'Akdeniz', 'Toroslar', 'Erdemli', 'Silifke']);
  const [weatherCelsius, setWeatherCelsius] = useState(28);

  // Simulate notification registration
  const handleToggleNotifications = () => {
    setNotificationActive(prev => {
      const newVal = !prev;
      if (newVal) {
        // Mock notification alert
        alert('Mersin Manşet Bildirim Sistemi Aktifleştirildi! Son dakika Mersin haberleri tarayıcınıza anında düşecektir.');
      }
      return newVal;
    });
  };

  return (
    <header className="bg-white border-b border-slate-100 sticky top-0 z-30 shadow-sm" id="main-site-header">
      {/* Top Utility Bar */}
      <div className="bg-slate-900 text-white px-4 py-2 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-4 text-slate-300">
            <span className="flex items-center gap-1 font-mono text-[11px]">
              <Calendar className="w-3.5 h-3.5 text-sky-400" />
              {currentDateStr}
            </span>
            <span className="hidden md:flex items-center gap-1">
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              Mersin: <strong className="text-white">{weatherCelsius}°C Güneşli</strong>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
               onClick={onOpenPolicy}
               className="hover:text-sky-300 font-semibold transition-colors cursor-pointer"
             >
              Basın Künyesi &amp; İlkeler
            </button>
            <span className="text-slate-600">|</span>
            <button
               onClick={onOpenAdmin}
               className="hover:text-red-400 font-bold text-rose-400 transition-colors cursor-pointer flex items-center gap-1.5"
             >
               <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
               Yönetim Paneli
            </button>
          </div>
        </div>
      </div>

      {/* Main Branding Bar */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
        {/* Burger Button (mobile) */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-slate-700 hover:text-slate-950 md:hidden border border-slate-200 rounded-lg cursor-pointer bg-slate-50"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Brand Logo in refined serif - High Density Premium Style */}
        <div 
          className="flex items-center gap-3 cursor-pointer group" 
          onClick={() => { setActiveCategory(''); setSearchQuery(''); }}
        >
          <div className="bg-red-600 text-white px-3 py-1.5 font-sans font-black text-2xl leading-none italic select-none rounded shadow-sm hover:bg-red-700 transition-colors">
            M
          </div>
          <div className="flex flex-col text-left">
            <h1 className="text-2xl sm:text-3xl font-serif font-black tracking-tighter text-slate-900 uppercase leading-none">
              MERSİN<span className="text-red-600 group-hover:text-red-700 transition-colors">MANŞET</span>
            </h1>
            <p className="text-[9px] text-slate-400 tracking-wider font-semibold font-mono uppercase mt-1">
              ÖZGÜN HABER &amp; YEREL ARŞİV PORTALI
            </p>
          </div>
        </div>

        {/* Quick Districts Ticker (Only visible on wide screen) */}
        <div className="hidden lg:flex flex-wrap items-center gap-1 bg-white border border-slate-200 px-3 py-1.5 rounded-lg max-w-sm">
          <span className="text-[9px] font-bold text-slate-400 uppercase mr-1">Bölgeler:</span>
          {districts.map((dist, idx) => (
            <span key={idx} className="text-[11px] font-semibold text-slate-600 hover:text-red-600 transition-colors cursor-pointer flex items-center">
              {dist} {idx < districts.length - 1 && <span className="text-slate-300 text-[9px] mx-1">•</span>}
            </span>
          ))}
        </div>

        {/* Social / Push Notifications & Admin Controls */}
        <div className="flex items-center gap-3">
          {/* Quick Search Input */}
          <div className={`relative hidden sm:flex items-center rounded-lg border transition-all ${searchFocused ? 'border-red-500 ring-2 ring-red-100 bg-white w-48 lg:w-56' : 'border-slate-200 bg-slate-50 w-36 lg:w-44'}`}>
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3" />
            <input
              type="text"
              placeholder="Haber ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className="pl-8 pr-3 py-1.5 font-sans text-xs text-slate-800 bg-transparent outline-none w-full"
            />
          </div>

          {/* Bell Subscription */}
          <button
            onClick={handleToggleNotifications}
            className={`p-2.5 rounded-xl border transition-all cursor-pointer relative ${notificationActive ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-slate-50 text-slate-600 border-slate-200 hover:text-slate-900 hover:bg-slate-100'}`}
            title="Anlık bildirim alıcısı"
          >
            <Bell className="w-4 h-4" />
            {notificationActive && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
            )}
          </button>

        </div>
      </div>

      {/* Categories Navigation Bar */}
      <nav className="border-t border-slate-200 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between overflow-x-auto scrollbar-hide">
          <div className="flex items-center py-2 shrink-0">
            {/* Tümü (All) Button */}
            <button
              onClick={() => { setActiveCategory(''); setSearchQuery(''); }}
              className={`cursor-pointer px-4 py-2 text-xs font-bold uppercase tracking-wide rounded-md shrink-0 transition-all mr-2 ${activeCategory === '' ? 'bg-red-650 bg-red-600 text-white shadow-sm' : 'text-slate-600 hover:text-red-600 hover:bg-slate-200/50'}`}
            >
              Manşetler
            </button>

            {/* Structured Categories list */}
            {CATEGORIES.map((catStringObj) => (
              <button
                key={catStringObj.id}
                onClick={() => { setActiveCategory(catStringObj.id); setSearchQuery(''); }}
                className={`cursor-pointer px-4 py-2 text-xs font-bold uppercase tracking-wide rounded-md shrink-0 transition-all mr-2 ${activeCategory === catStringObj.id ? 'bg-red-600 text-white shadow-sm' : 'text-slate-600 hover:text-red-600 hover:bg-slate-200/50'}`}
              >
                {catStringObj.name}
              </button>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-2 pr-4 text-slate-400 font-mono text-[10px]">
            <span>Hızlı Yüklenen Tasarım</span>
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white p-4 space-y-4 animate-fade-in" id="mobile-navigation-drawer">
          <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 p-2">
            <Search className="w-4 h-4 text-slate-400 ml-1 mr-2" />
            <input
              type="text"
              placeholder="Mobil haber araması..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="text-xs text-slate-800 bg-transparent outline-none w-full"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => { setActiveCategory(''); setSearchQuery(''); setMobileMenuOpen(false); }}
              className={`px-3 py-2 text-left text-xs font-bold rounded-lg block ${activeCategory === '' ? 'bg-red-50 text-red-900 border-l-4 border-red-600' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              Tüm Manşetler
            </button>
            {CATEGORIES.map((catStringObj) => (
              <button
                key={catStringObj.id}
                onClick={() => { setActiveCategory(catStringObj.id); setSearchQuery(''); setMobileMenuOpen(false); }}
                className={`px-3 py-2 text-left text-xs font-bold rounded-lg block ${activeCategory === catStringObj.id ? 'bg-red-50 text-red-900 border-l-4 border-red-600' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                {catStringObj.name}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t flex flex-col gap-2">
            <button
              onClick={() => { onOpenPolicy(); setMobileMenuOpen(false); }}
              className="w-full text-center py-2 border border-slate-200 text-slate-600 rounded-lg text-xs font-semibold hover:bg-slate-50"
            >
              Resmi Künye &amp; Şartlar
            </button>
            <button
              onClick={() => { onOpenAdmin(); setMobileMenuOpen(false); }}
              className="w-full text-center py-2 bg-red-600 text-white rounded-lg text-xs font-bold hover:bg-red-700"
            >
              Yönetici Paneli Girişi
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
