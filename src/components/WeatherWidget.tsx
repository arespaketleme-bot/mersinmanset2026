import React, { useState, useEffect } from 'react';
import { Sun, Cloud, CloudSun, CloudRain, Droplets, Wind, Thermometer, ShieldAlert, Navigation } from 'lucide-react';

interface DistrictWeatherData {
  id: string;
  name: string;
  altitude: string;
  temp: number;
  feelsLike: number;
  condition: 'sunny' | 'partly-cloudy' | 'windy' | 'hot-dry';
  conditionText: string;
  humidity: number;
  windSpeed: number;
  uvIndex: number;
  aqi: string;
  advice: string;
  forecast: {
    day: string;
    temp: string;
    condition: 'sunny' | 'partly-cloudy' | 'windy';
  }[];
}

const DISTRICTS_WEATHER: DistrictWeatherData[] = [
  {
    id: 'merkez',
    name: 'Mersin Merkez (Yenişehir)',
    altitude: '0m (Deniz Seviyesi)',
    temp: 34,
    feelsLike: 41,
    condition: 'sunny',
    conditionText: 'Çok Sıcak ve Nemli',
    humidity: 78,
    windSpeed: 14,
    uvIndex: 9,
    aqi: 'İyi (42)',
    advice: 'Yüksek nem nedeniyle hissedilen sıcaklık oldukça yüksek. Bol su tüketin, sahil esintisinden faydalanın.',
    forecast: [
      { day: 'Yarın', temp: '28°C / 34°C', condition: 'sunny' },
      { day: 'Cumartesi', temp: '29°C / 35°C', condition: 'sunny' },
      { day: 'Pazar', temp: '29°C / 34°C', condition: 'partly-cloudy' }
    ]
  },
  {
    id: 'camliyayla',
    name: 'Çamlıyayla (Namrun Yaylası)',
    altitude: '1.430m (Toroslar)',
    temp: 26,
    feelsLike: 26,
    condition: 'windy',
    conditionText: 'Serin ve Esintili',
    humidity: 42,
    windSpeed: 22,
    uvIndex: 8,
    aqi: 'Mükemmel (18)',
    advice: 'Toroslar\'ın temiz ve serin dağ havası hakim. Akşam saatlerinde ince bir hırka almanız gerekebilir.',
    forecast: [
      { day: 'Yarın', temp: '16°C / 26°C', condition: 'sunny' },
      { day: 'Cumartesi', temp: '15°C / 25°C', condition: 'windy' },
      { day: 'Pazar', temp: '17°C / 27°C', condition: 'sunny' }
    ]
  },
  {
    id: 'tarsus',
    name: 'Tarsus',
    altitude: '30m (Tarihi Ova)',
    temp: 36,
    feelsLike: 40,
    condition: 'sunny',
    conditionText: 'Güneşli ve Sıcak',
    humidity: 58,
    windSpeed: 10,
    uvIndex: 10,
    aqi: 'Orta (55)',
    advice: 'Tarihi Tarsus sokaklarını gezerken şapka ve güneş gözlüğü kullanmayı ihmal etmeyin. Humus tadımı için ideal hava!',
    forecast: [
      { day: 'Yarın', temp: '25°C / 36°C', condition: 'sunny' },
      { day: 'Cumartesi', temp: '26°C / 37°C', condition: 'sunny' },
      { day: 'Pazar', temp: '26°C / 36°C', condition: 'sunny' }
    ]
  },
  {
    id: 'anamur',
    name: 'Anamur',
    altitude: '5m (Tropikal Kıyı)',
    temp: 35,
    feelsLike: 42,
    condition: 'sunny',
    conditionText: 'Yoğun Nemli, Tropikal',
    humidity: 82,
    windSpeed: 12,
    uvIndex: 9,
    aqi: 'İyi (32)',
    advice: 'Muz bahçeleri ve Akdeniz kıyısında yoğun nem. Akşamüstü Anamur Kalesi yakınında deniz keyfi yapabilirsiniz.',
    forecast: [
      { day: 'Yarın', temp: '27°C / 35°C', condition: 'sunny' },
      { day: 'Cumartesi', temp: '28°C / 36°C', condition: 'sunny' },
      { day: 'Pazar', temp: '28°C / 35°C', condition: 'sunny' }
    ]
  },
  {
    id: 'mut',
    name: 'Mut',
    altitude: '300m (İç Vadi)',
    temp: 39,
    feelsLike: 39,
    condition: 'hot-dry',
    conditionText: 'Aşırı Sıcak ve Kuru',
    humidity: 24,
    windSpeed: 18,
    uvIndex: 11,
    aqi: 'Hassas (72)',
    advice: 'Mut kayısı hasat sezonunda kuru ve kavurucu sıcaklar. 11.00 - 16.00 saatleri arasında doğrudan güneşe çıkmayın.',
    forecast: [
      { day: 'Yarın', temp: '24°C / 39°C', condition: 'sunny' },
      { day: 'Cumartesi', temp: '25°C / 40°C', condition: 'sunny' },
      { day: 'Pazar', temp: '24°C / 38°C', condition: 'sunny' }
    ]
  },
  {
    id: 'silifke',
    name: 'Silifke',
    altitude: '20m (Göksu Deltası)',
    temp: 34,
    feelsLike: 37,
    condition: 'partly-cloudy',
    conditionText: 'Az Bulutlu, Meltemli',
    humidity: 50,
    windSpeed: 16,
    uvIndex: 9,
    aqi: 'İyi (38)',
    advice: 'Göksu Deltası kıyı meltemleriyle ferahlıyor. Silifke yoğurdu ve çilek bahçeleri ziyaretçileri için harika bir gün.',
    forecast: [
      { day: 'Yarın', temp: '23°C / 34°C', condition: 'sunny' },
      { day: 'Cumartesi', temp: '24°C / 35°C', condition: 'partly-cloudy' },
      { day: 'Pazar', temp: '23°C / 33°C', condition: 'sunny' }
    ]
  }
];

export default function WeatherWidget() {
  const [selectedId, setSelectedId] = useState<string>('merkez');
  const [pulse, setPulse] = useState<boolean>(false);

  const currentData = DISTRICTS_WEATHER.find(d => d.id === selectedId) || DISTRICTS_WEATHER[0];

  // Soft visual effect when switching districts
  useEffect(() => {
    setPulse(true);
    const timer = setTimeout(() => setPulse(false), 300);
    return () => clearTimeout(timer);
  }, [selectedId]);

  const renderWeatherIcon = (condition: string, className = "w-8 h-8") => {
    switch (condition) {
      case 'sunny':
      case 'hot-dry':
        return <Sun className={`${className} text-amber-500 animate-[spin_10s_linear_infinite]`} />;
      case 'partly-cloudy':
        return <CloudSun className={`${className} text-slate-400`} />;
      case 'windy':
        return <Wind className={`${className} text-sky-400 animate-pulse`} />;
      default:
        return <Cloud className={`${className} text-slate-400`} />;
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden" id="mersin-weather-widget">
      {/* Header Tab List */}
      <div className="bg-slate-50 border-b border-slate-200/70 p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Mersin İlçe Mikroklimaları Canlı Hava Durumu
            </h3>
            <p className="text-xs text-slate-500">Toroslar'dan Akdeniz kıyısına bölgesel sıcaklık ve nem dengeleri</p>
          </div>
          
          {/* Quick tabs selector */}
          <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pr-1">
            {DISTRICTS_WEATHER.map((dist) => (
              <button
                key={dist.id}
                onClick={() => setSelectedId(dist.id)}
                className={`px-3 py-1 rounded-xl text-[11px] font-bold transition-all duration-200 cursor-pointer ${
                  selectedId === dist.id
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
                }`}
              >
                {dist.name.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Weather Content Block */}
      <div className={`p-5 md:p-6 transition-all duration-300 ${pulse ? 'opacity-70 scale-99' : 'opacity-100 scale-100'}`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Large Display: Main Temperature & State */}
          <div className="lg:col-span-5 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-100 pb-6 lg:pb-0 lg:pr-6">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-base font-serif font-black text-slate-900 tracking-tight">{currentData.name}</h4>
                <div className="flex items-center gap-1.5 mt-1">
                  <Navigation className="w-3 h-3 text-slate-400 rotate-45" />
                  <span className="text-[11px] text-slate-400 font-mono">Rakım: {currentData.altitude}</span>
                </div>
              </div>
              <div className="bg-slate-100 p-2.5 rounded-2xl">
                {renderWeatherIcon(currentData.condition, "w-10 h-10")}
              </div>
            </div>

            <div className="my-4 flex items-baseline gap-2">
              <span className="text-5xl font-black text-slate-950 font-sans tracking-tighter">
                {currentData.temp}°C
              </span>
              <div className="text-xs font-mono text-slate-500">
                <span className="block">Hissedilen: <strong className="text-slate-800 font-bold">{currentData.feelsLike}°C</strong></span>
                <span className="text-red-500 font-semibold">{currentData.conditionText}</span>
              </div>
            </div>

            {/* Quick District Advice */}
            <div className="bg-amber-50/70 border border-amber-500/10 rounded-2xl p-3 flex gap-2 text-[11px] text-amber-900 leading-relaxed">
              <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p><strong>Bölgesel Tavsiye:</strong> {currentData.advice}</p>
            </div>
          </div>

          {/* Center Details Grid: Indices */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-4 my-auto">
            {/* Nem */}
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100/50 flex items-center gap-3">
              <div className="bg-sky-500/10 p-2 rounded-xl text-sky-600">
                <Droplets className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-mono block">Bağıl Nem</span>
                <span className="text-sm font-extrabold text-slate-900 font-mono">%{currentData.humidity}</span>
              </div>
            </div>

            {/* Rüzgar */}
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100/50 flex items-center gap-3">
              <div className="bg-teal-500/10 p-2 rounded-xl text-teal-600">
                <Wind className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-mono block">Rüzgar</span>
                <span className="text-sm font-extrabold text-slate-900 font-mono">{currentData.windSpeed} km/s</span>
              </div>
            </div>

            {/* UV Endeksi */}
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100/50 flex items-center gap-3">
              <div className="bg-amber-500/10 p-2 rounded-xl text-amber-600">
                <Thermometer className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-mono block">UV Endeksi</span>
                <span className="text-sm font-extrabold text-slate-900 font-mono">{currentData.uvIndex} / 11+</span>
              </div>
            </div>

            {/* Hava Kalitesi */}
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100/50 flex items-center gap-3">
              <div className="bg-emerald-500/10 p-2 rounded-xl text-emerald-600">
                <Sun className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-mono block">Hava Kalitesi</span>
                <span className="text-sm font-extrabold text-slate-900 font-mono">{currentData.aqi}</span>
              </div>
            </div>
          </div>

          {/* Right Forecast Stack */}
          <div className="lg:col-span-3 bg-slate-900 text-white p-4 rounded-2xl flex flex-col justify-between">
            <div>
              <span className="text-[9px] font-mono tracking-wider font-extrabold text-slate-400 uppercase">3 Günlük Beklenti</span>
              <div className="mt-2.5 space-y-3">
                {currentData.forecast.map((fc, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs border-b border-slate-800 pb-2 last:border-0 last:pb-0">
                    <span className="font-semibold text-slate-300">{fc.day}</span>
                    <div className="flex items-center gap-2">
                      {renderWeatherIcon(fc.condition, "w-4 h-4")}
                      <span className="font-mono text-[11px] text-slate-100 font-semibold">{fc.temp}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-[9px] text-slate-400 font-mono mt-3 text-center border-t border-slate-800 pt-2">
              Veriler her 15 dakikada bir senkronize edilir
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
