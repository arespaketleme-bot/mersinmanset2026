import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";
import { INITIAL_NEWS } from "./src/data/mockNews";
import { NewsArticle } from "./src/types";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/ads.txt", (req, res) => {
  res.type("text/plain");
  try {
    const adsPath = path.join(process.cwd(), "public", "ads.txt");
    if (fs.existsSync(adsPath)) {
      res.send(fs.readFileSync(adsPath, "utf8"));
      return;
    }
    const distAdsPath = path.join(process.cwd(), "dist", "ads.txt");
    if (fs.existsSync(distAdsPath)) {
      res.send(fs.readFileSync(distAdsPath, "utf8"));
      return;
    }
  } catch (err) {
    console.error("ads.txt read error:", err);
  }
  res.send("# Google AdSense ads.txt\n# Lutfen pub-0000000000000000 kismini kendi yayinci kimliginizle degistirin.\ngoogle.com, pub-0000000000000000, DIRECT, f08c47fec0942fa0\n");
});

// Content pools for hourly Mersin news
const MERSIN_TOPICS = [
  { topic: "Tarsus Eshab-ı Kehf Mağarası İnanç Turizmi Gelişmeleri", category: "kultur-sanat" },
  { topic: "Silifke Keçiboynuzu Hasadı ve Coğrafi İşaretli Pekmez Üretimi", category: "ekonomi" },
  { topic: "Mersin Limanı Genişleme Projesi ve Yeni Rıhtım Deniz Ticareti Yatırımı", category: "ekonomi" },
  { topic: "Kızkalesi (Corycus) Tarihi Surları Restorasyonu ve Mavi Bayraklı Plaj Durumu", category: "turizm-yasam" },
  { topic: "Anamur Mamure Kalesi Arkeolojik Koruma ve Restorasyon Çalışmaları", category: "kultur-sanat" },
  { topic: "Mersin İdman Yurdu Sezon Gelişmeleri ve 1. Lig Maç Analizleri", category: "spor" },
  { topic: "Yenişehir Atatürk Kültür Merkezi Yeni Tiyatro ve Sanat Festivali", category: "kultur-sanat" },
  { topic: "Erdemli Limon Üreticilerinin İhracat Destekleri ve Rekor Rekolte", category: "ekonomi" },
  { topic: "Mut Kayısı Hasadı ve Coğrafi Tescil Yolculuğu", category: "lezzetler" },
  { topic: "Mersin Gastronomi Rotaları: Meşhur Tantunici ve Kerebiç Kültürü", category: "lezzetler" },
  { topic: "Soli Pompeipolis Antik Liman Sütunları Kazı Alanı Bulguları", category: "kultur-sanat" },
  { topic: "Çamlıyayla Köşekbükü Mağarası ve Astım Hastaları İçin Doğa Turizmi", category: "turizm-yasam" },
  { topic: "Mezitli Belediyesi Kadın Üretici Pazarları Ekonomik Kalkınma Modeli", category: "gundem" },
  { topic: "Mersin Akdeniz Sahil Şeridi Bisiklet ve Yürüyüş Yolu Peyzajı", category: "spor" },
  { topic: "Toroslar Kar Festivali ve Çamlıyayla Kış Turizmi Tanıtımları", category: "turizm-yasam" },
];

function getDiverseImageForTopic(topic: string, category: string): string {
  const t = topic.toLowerCase();
  
  // 1. Food / Lezzetler
  if (t.includes("tantuni") || t.includes("yemek") || t.includes("lezzet") || t.includes("gurme") || t.includes("kebap") || t.includes("suc")) {
    return "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=1200"; // Tantuni/Meat on metal plate
  }
  if (t.includes("cezerye") || t.includes("tatlı") || t.includes("kerebiç") || t.includes("fıstık") || t.includes("şeker")) {
    return "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1200"; // Sweets/Platter
  }
  if (t.includes("yoğurt") || t.includes("süt") || t.includes("mayalama") || t.includes("çömlek")) {
    return "https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&q=80&w=1200"; // Olive/Greek/Yogurt/Local craft
  }
  if (t.includes("bal") || t.includes("arı") || t.includes("çiçek") || t.includes("eğriçayır")) {
    return "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1200"; // Sweet/Honey
  }
  
  // 2. Ports / Logistics / Economy
  if (t.includes("liman") || t.includes("rıhtım") || t.includes("gemi") || t.includes("elleçleme") || t.includes("konteyner")) {
    return "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=1200"; // Cargo Ship
  }
  if (t.includes("tır") || t.includes("kamyon") || t.includes("depolama") || t.includes("kargo")) {
    return "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200"; // Warehouse/Logistics
  }
  if (t.includes("ticaret") || t.includes("ihracat") || t.includes("yatırım") || t.includes("ekonomi") || t.includes("zirve") || t.includes("bütçe")) {
    return "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1200"; // Office/Commerce
  }
  
  // 3. Tourism / Life / Beaches / Coast
  if (t.includes("kızkalesi") || t.includes("kale") || t.includes("sur") || t.includes("mamure") || t.includes("korsan")) {
    return "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?auto=format&fit=crop&q=80&w=1200"; // Castle/Plaj
  }
  if (t.includes("deniz") || t.includes("plaj") || t.includes("sahil") || t.includes("kumsal") || t.includes("körfez") || t.includes("mavi bayrak")) {
    return "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1200"; // Beach
  }
  if (t.includes("kaplumbağa") || t.includes("caretta") || t.includes("doğa") || t.includes("hayvan") || t.includes("alata")) {
    return "https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?auto=format&fit=crop&q=80&w=1200"; // Caretta turtle
  }
  if (t.includes("mağara") || t.includes("obruk") || t.includes("cennet") || t.includes("cehennem") || t.includes("astım") || t.includes("köşekbükü")) {
    return "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=1200"; // Cave/Waterfall
  }
  if (t.includes("park") || t.includes("bahçe") || t.includes("botanik") || t.includes("peyzaj") || t.includes("kültür park")) {
    return "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=1200"; // National Park/Green Trees
  }
  
  // 4. History / Archeology / Art / Culture
  if (t.includes("restorasyon") || t.includes("tarih") || t.includes("antik") || t.includes("kazı") || t.includes("arkeoloji") || t.includes("soli") || t.includes("pompeipolis") || t.includes("lahit") || t.includes("eshab")) {
    return "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=80&w=1200"; // Archeological ruin/sculpture
  }
  if (t.includes("festival") || t.includes("konser") || t.includes("müzik") || t.includes("sanat") || t.includes("tiyatro") || t.includes("karnaval") || t.includes("kortej")) {
    return "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=1200"; // Concert light
  }
  if (t.includes("müze") || t.includes("sergi") || t.includes("kültür merkezi")) {
    return "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&q=80&w=1200"; // Museum interior
  }
  if (t.includes("yörük") || t.includes("sarıkeçili") || t.includes("dokuma") || t.includes("çadır")) {
    return "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=1200"; // Traditional woven texture
  }

  // 5. Sports
  if (t.includes("idman yurdu") || t.includes("futbol") || t.includes("transfer") || t.includes("stadyum") || t.includes("maç") || t.includes("lig")) {
    return "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=1200"; // Football pitch
  }
  if (t.includes("yelken") || t.includes("tekne") || t.includes("marina") || t.includes("kupa") || t.includes("yarış")) {
    return "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&q=80&w=1200"; // Sailing yachts
  }
  if (t.includes("olimpik") || t.includes("koşu") || t.includes("havuz") || t.includes("atletizm") || t.includes("spor")) {
    return "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&q=80&w=1200"; // Running track / active sports
  }

  // 6. Agriculture / Hasat
  if (t.includes("limon") || t.includes("narenciye") || t.includes("portakal") || t.includes("kayısı") || t.includes("hasat") || t.includes("çilek") || t.includes("keçiboynuzu")) {
    return "https://images.unsplash.com/photo-1590502593747-42a996133562?auto=format&fit=crop&q=80&w=1200"; // Yellow Citrus/Lemon Orchard
  }

  // 7. Technology / Infrastructure
  if (t.includes("metro") || t.includes("tren") || t.includes("havalimanı") || t.includes("yol") || t.includes("ulaşım") || t.includes("altyapı") || t.includes("tünel")) {
    return "https://images.unsplash.com/photo-1542640244-7e672d6cef21?auto=format&fit=crop&q=80&w=1200"; // Transit/Metro/Railways
  }
  if (t.includes("teknopark") || t.includes("yazılım") || t.includes("yapay zeka") || t.includes("akıllı") || t.includes("üniversite")) {
    return "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1200"; // Computer/Technology
  }

  // Fallback by category
  const CATEGORY_IMAGES: Record<string, string> = {
    "gundem": "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=1200",
    "ekonomi": "https://images.unsplash.com/photo-1542640244-7e672d6cef21?auto=format&fit=crop&q=80&w=1200",
    "turizm-yasam": "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=1200",
    "kultur-sanat": "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=1200",
    "lezzetler": "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=1200",
    "spor": "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=1200"
  };

  return CATEGORY_IMAGES[category] || CATEGORY_IMAGES["gundem"];
}

const hourlyArticles: NewsArticle[] = [];

// Lazy-initialized Gemini client
let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey.trim() === "") {
    return null;
  }
  
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

async function generateHourlyArticle(offsetHours: number = 0): Promise<NewsArticle> {
  const baseTime = Date.now() - (offsetHours * 60 * 60 * 1000);
  const dateObj = new Date(baseTime);
  
  // Select a sequential topic to cover various areas over time
  const hourIndex = Math.abs(dateObj.getHours() + dateObj.getDate() + dateObj.getMonth() + offsetHours) % MERSIN_TOPICS.length;
  const item = MERSIN_TOPICS[hourIndex];
  
  const id = `hourly-${baseTime}-${Math.round(Math.random() * 1000)}`;
  const slug = `manset-saatlik-${offsetHours}-${Math.round(baseTime / 1000)}`;
  const title = `Mersin'de Saatlik Gelişme: ${item.topic}`;
  
  const ai = getAiClient();
  if (ai) {
    try {
      const prompt = `Mersin ili için tamamen özgün, kopya içermeyen, yüksek SEO uyumlu, tarafsız bir yerel haber yaz.
      Haber Konusu: "${item.topic}"
      Kategori: "${item.category}"
      
      Yazacağın haber kesinlikle kopya, çalıntı veya tekrara düşmüş hissi vermemeli. Google AdSense politikalarına uygun, bilgilendirici, kurallı Türkçe ile yazılmış, zengin paragraflardan oluşmalı.
      Makale metninde h3 alt başlıklar, paragraflar (<p>), kalın kelimeler (<strong>), ve tırnak içinde anlamlı vurgular (<blockquote>) gibi HTML etiketleri kullanarak biçimlendirilmiş bir içerik oluştur.
      En az 250-350 kelimeden oluşan derinlemesine bir anlatım olsun.
      
      Lütfen sonucu tam olarak aşağıdaki JSON şemasına göre döndür:
      {
        "title": "Haber Başlığı (SEO dostu, çarpıcı, 55-65 karakter)",
        "summary": "Haberin 1-2 cümlelik spotu / özeti (120-150 karakter arasında, merak uyandırıcı)",
        "content": "Habere ait detaylı HTML gövdesi (h3 başlıkları, p paragrafları, strong elementleri, ve blockquote barındırsın, sığ olmasın, en az 300 kelime süren derin ve kaliteli özgün anlatım)",
        "tags": ["Haberle ilgili 3-5 adet kelime öbeği etiket dizisi, ilk etiket Mersin ile başlamalı"],
        "metaDescription": "Google arama listelemesi için SEO Uyumlu Meta Açıklaması (max 160 karakter)",
        "readTime": "Öngörülen okuma süresi (örn: '3 dk')"
      }`;
      
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            required: ["title", "summary", "content", "tags", "metaDescription", "readTime"],
            properties: {
              title: { type: Type.STRING },
              summary: { type: Type.STRING },
              content: { type: Type.STRING },
              tags: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              metaDescription: { type: Type.STRING },
              readTime: { type: Type.STRING }
            }
          }
        }
      });
      
      const parsed = JSON.parse(response.text || "{}");
      
      const jsonLd = {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        "headline": parsed.title || title,
        "datePublished": dateObj.toISOString(),
        "dateModified": dateObj.toISOString(),
        "description": parsed.summary || `${item.topic} hakkında en güncel saatlik özel haber bülteni.`,
        "author": {
          "@type": "Person",
          "name": "Mersin Manşet Yapay Zeka Yazarı"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Mersin Manşet Haber Portalı",
          "logo": {
            "@type": "ImageObject",
            "url": "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=1200"
          }
        }
      };

      return {
        id,
        slug,
        title: parsed.title || title,
        summary: parsed.summary || `${item.topic} hakkında en güncel saatlik özel haber bülteni.`,
        content: parsed.content || `<p>${item.topic} konusuna yönelik detaylı incelemeler sürdürülmektedir.</p>`,
        category: item.category,
        imageUrl: getDiverseImageForTopic(item.topic, item.category),
        author: "Mersin Manşet Canlı Haber Editörü",
        createdAt: dateObj.toISOString(),
        tags: parsed.tags || ["Mersin", item.topic],
        metaDescription: parsed.metaDescription || "Mersin özgün son dakika haber gelişmesi.",
        jsonLdSchema: JSON.stringify(jsonLd, null, 2),
        views: Math.floor(Math.random() * 200) + 50,
        readTime: parsed.readTime || "3 dk"
      };
    } catch (e) {
      console.error("Hourly Gemini Generation Error, falling back to local news originalizer:", e);
    }
  }

  const templates = [
    {
      intro: `<p>Mersin'in parlayan yıldızı olan kentimiz, tarımdan sanayiye, kültürden gastronomiye kadar geniş alanlardaki faaliyetleriyle bilinir. Bugün planlanan bu stratejik hamle, kentin sürdürülebilir kalkınma hedefleri çerçevesinde bir diğer kilometre taşı olmaya adaydır. Özellikle ilçeler arasındaki koordinasyonu destekleyici yönleriyle ön plana çıkan gelişmenin, önümüzdeki günlerde daha geniş bir kamuoyu bilgilendirme toplantısıyla detaylandırılması kararlaştırılmıştır.</p>`,
      middle: `<h3>Sürdürülebilir Kalkınma Yolunda Kararlı Adımlar</h3>
      <p>Son yıllarda özellikle <strong>${item.topic}</strong> hususu Mersin genelinde en çok konuşulan konulardan biri haline geldi. Yapılan akademik etütler ve sivil toplum kuruluşu görüşleri doğrultusunda, bölgenin sosyo-kültürel altyapısını zenginleştirecek adımların atılması planlanıyor. Tarsus'tan Anamur'a kadar uzanan bu geniş coğrafyada, her bir ilçenin kendine özgü zenginlikleri bu projeyle birlikte daha koordineli şekilde ekonomiye kazandırılacaktır.</p>
      <blockquote>Mersin için her saat başı güncellenen, tamamen tarafsız, bağımsız ve yerel uzmanlar tarafından analiz edilmiş haber akışımız devam ediyor.</blockquote>`
    },
    {
      intro: `<p>Akdeniz bölgesinin dinamik ticaret ve kültür kenti Mersin, yeni yatırımlar ve sivil inisiyatiflerle vizyonunu tazelemeye devam ediyor. Güncel verilere göre, <strong>${item.topic}</strong> çalışmaları yerel yönetim ve kamu iş birliğiyle üst seviyede destek görüyor. Bu saatin en önemli gelişmesini yerinde inceledik.</p>`,
      middle: `<h3>Yeni Gelişmeler ve İlçelere Etkisi</h3>
      <p>Özellikle Mezitli, Yenişehir ve Akdeniz ekseninde büyük yankı bulan bu proje, kentin lojistik gücünü de arkasına alıyor. Mersin Üniversitesi uzmanları projenin doğaya saygılı akıllı teknolojilerle donatılacağını ve böylece bölgesel istihdama doğrudan %15 katkı sağlayacağını vurguladı.</p>
      <blockquote>Kent sakinlerine yeni istihdam kapıları ve sosyal aktivite alanları açmak Mersin'in modern şehircilik kimliğine yakışan en büyük kazanımdır.</blockquote>`
    }
  ];

  const selectedTemplate = templates[offsetHours % templates.length];
  const content = `<h3>${item.topic} Konusunda Önemli Saatlik İnceleme</h3>
  ${selectedTemplate.intro}
  ${selectedTemplate.middle}
  <h3>Tüm Gelişmeler Yakından Takip Ediliyor</h3>
  <p>Yerel yetkililerin yaptığı açıklamalara göre, saha etütleri ve bütçelendirme çalışmaları tamamlandığında yeni turizm, tarım veya ticari hareketliliğin oluşması bekleniyor. Mersin Manşet haber merkezi olarak gelişmeleri saatlik periyotlarla takip etmeye devam edeceğiz.</p>`;

  const summary = `Mersin'de bu saat başı ${item.topic} başlığı altında önemli adımlar atılıyor. Gelişmelerin kent hayatına etkileri ve analizleri.`;

  const jsonLdFallback = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": title,
    "datePublished": dateObj.toISOString(),
    "description": summary,
    "author": {
      "@type": "Person",
      "name": "Mersin Manşet Haber Botu"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Mersin Manşet Yerel Haber Portalı"
    }
  };

  return {
    id,
    slug,
    title,
    summary,
    content,
    category: item.category,
    imageUrl: getDiverseImageForTopic(item.topic, item.category),
    author: "Mersin Manşet Canlı Haber",
    createdAt: dateObj.toISOString(),
    tags: ["Mersin", item.topic, "Özgün Haberler", "Saatlik Bülten"],
    metaDescription: `${title} - Mersin Manşet Saatlik Özgün Gelişmeler.`,
    jsonLdSchema: JSON.stringify(jsonLdFallback, null, 2),
    views: Math.floor(Math.random() * 100) + 15,
    readTime: "3 dk"
  };
}


// Fallback high-quality news content generation for Mersin focus when API key is missing
const MERCIN_FALLBACKS = [
  {
    topic: "Marina Geceleri",
    title: "Mersin Marina Yaz Konserleri Başladı: Kent Körfezi Yıldızlarla Işıldıyor",
    summary: "Mersin'in en gözde sosyal yaşam merkezlerinden Marina, bu yaz da açık hava konser serileriyle yerli halkı ve turistleri bir araya getiriyor. Etkinliklerde cazdan Akdeniz melodilerine geniş repertuvar sunuluyor.",
    category: "turizm-yasam",
    tags: ["Mersin Marina", "Konser", "Yaz Akşamları", "Marina Yaşamı"],
    metaDescription: "Mersin Marina Açık Hava Yaz Konserleri kapsamında sevilen sanatçılar sahne alıyor. Etkinlik takvimi ve tüm detaylar.",
    content: `<h3>Marina Amfi Tiyatroda Müzik Ziyafeti Başladı</h3>
    <p>Mersin'in sosyal nabzını tutan prestij mekanlarından <strong>Mersin Marina</strong>, sıcak yaz akşamlarında serinletici Akdeniz rüzgarı eşliğinde unutulmaz melodilere ev sahipliği yapıyor. Bu sene sekizincisi düzenlenen 'Marina Akustik Geceleri', ilk gün konserinde biletleri saatler öncesinden tüketen rekor bir katılımla kapılarını araladı.</p>
    
    <h3>Gastronomi ve Sosyal Yaşam Bir Arada</h3>
    <p>Konserlerin yanı sıra Marina'daki şık restoranlar, cafeler ve açık hava etkinlik alanları ziyaretçilere geniş olanaklar sunuyor. Mersin dışından, özellikle Adana, Hatay ve Niğde gibi çevre illerden hafta sonu kaçamağı için Marina'ya akın eden binlerce insan hem Akdeniz'in taze deniz ürünlerini tadıyor hem de açık havada kaliteli müziğin tadını çıkartıyor.</p>
    
    <blockquote>Marina Konserleri, Mersin'in turizm kimliğini ve dinamik gece hayatını taçlandıran en önemli marka değerlerimizden biridir.</blockquote>

    <h3>Rezervasyonlar Haftalar Öncesinden Doluyor</h3>
    <p>Etkinlik komitesinden edinilen bilgilere göre, temmuz ve ağustos ayları boyunca sürecek olan akustik sahnelere katılım ücretsiz iken, VIP localar ve çevre işletmelerin rezervasyon oranları şimdiden %95'i aşmış durumda. Kültürel canlanmanın yerel esnafın ticaret hacmine doğrudan %30 oranında katkı sağladığı vurgulandı.</p>`
  },
  {
    topic: "Kanlıdivane",
    title: "Kanlıdivane Antik Kenti Arkeolojik Restorasyonunda Yeni Keşifler",
    summary: "Mersin Erdemli sınırları içerisindeki asırlık obruk şehri Kanlıdivane'de yürütülen kazı çalışmalarında, Geç Roma dönemine ait yeni bir zeytinyağı işliği ve şapel gün yüzüne çıkarıldı.",
    category: "kultur-sanat",
    tags: ["Kanlıdivane", "Erdemli Tarih", "Mersin Arkeoloji", "Zeytinyağı Tarihi"],
    metaDescription: "Mersin Erdemli Kanlıdivane antik yerleşim alanındaki arkeolojik kazı çalışmalarında yeni bulgular elde edildi. Restorasyon detayları.",
    content: `<h3>Mersin'in Saklı Tarihi Obruk Çevresinde Yükseliyor</h3>
    <p>Mersin'in en gizemli ve etkileyici arkeolojik duraklarından olan, dev kaya obruğu çevresine kurulmuş antik yerleşim alanı <strong>Kanlıdivane (Kanytelis)</strong>, Kültür Bakanlığı'nın özel destek bütçesiyle titizlikle yürütülen koruma ve gün yüzüne çıkarma çalışmalarında yeni sırlara kapı açtı. Kazı ekiplerinin son raporuna göre, obruğun güney şeridinde devasa ölçüye sahip antik zeytinyağı pres sistemleri saptandı.</p>
    
    <h3>Akdeniz'in Antik Tarım İmparatorluğu Mersin</h3>
    <p>Bulunan zeytinyağı işlikleri, Mersin'in M.S. 4. ve 5. yüzyıllarda tüm Akdeniz havzasına zeytin ve zeytinyağı ihraç eden dev bir tarımsal ticaret merkezi olduğunu somut şekilde kanıtlıyor. Restorasyon çalışmalarında ayrıca obruğun kenarına adeta asılıymış gibi duran bazilikal planlı şapellerin duvar freskleri özel kimyasal solüsyonlarla korumaya alındı.</p>
    
    <blockquote>Kanlıdivane, hem doğanın muazzam gücünü (obruk) hem de antik dönem insanının mühendislik zekasını bir arada görebileceğiniz dünyadaki nadir yerlerdendir.</blockquote>

    <h3>Gece Işıklandırması Turizme Açılıyor</h3>
    <p>Kazı ve koruma başkanı, restorasyon bittikten sonra Kanlıdivane'nin özel bir **gece aydınlatma sistemiyle** donatılarak gece müzeciliğine kazandırılacağını açıkladı. Bu sayede, yaz sıcaklarında gündüz gezilmesi meşakkatli olan antik kentin mistik atmosferi, gece serinliğinde mistik bir ışık şovuna dönüştürülerek turlarla buluşturulacak.</p>`
  },
  {
    topic: "Cezerye",
    title: "Mersin Cezeryesi İhracat Rekoruna Koşuyor: Sağlıklı Enerji Deposu",
    summary: "Havuç, şeker, fıstık ve özel baharatların karışımıyla üretilen Mersin'in geleneksel cezerye tatlısı, katkısız içeriği ve doğal enerji deposu özelliğiyle Avrupa ve Ortadoğu pazarında büyük talep görüyor.",
    category: "lezzetler",
    tags: ["Mersin Cezeryesi", "Geleneksel Tatlı", "Mersin İhracat", "Sağlıklı Gıda"],
    metaDescription: "Mersin'in geleneksel coğrafi tescilli cezerye tatlısı uluslararası sağlıklı atıştırmalık pazarlarında yoğun talep görüyor.",
    content: `<h3>Havuçtan Gelen Doğal Şifa ve Enerji Mucizesi</h3>
    <p>Mersin'e ayak basan herkesin ilk karşılaştığı ve mutlaka hediye olarak götürdüğü <strong>Mersin Cezeryesi</strong>, günümüzün 'sağlıklı atıştırmalık ve doğal enerji' trendleriyle birlikte dünyada yepyeni bir pazar edindi. Katkı maddesi içermeyen, tamamen havuç püresinin kuruyemişlerle ağır ateşte yoğrulmasıyla elde edilen bu geleneksel lezzet, uluslararası gıda fuarlarında en gözde vegan atıştırmalıklar arasına girdi.</p>
    
    <h3>Geleneksel Üretimden Endüstriyel İhracata</h3>
    <p>Mersin'de dededen toruna kalan kadim cezerye imalathaneleri, son yıllarda kurdukları modern tesisler ve aldıkları uluslararası sertifikalar sayesinde başta **Almanya, Körfez Ülkeleri, Katar ve ABD** olmak üzere 42 ülkeye doğrudan ihracat gerçekleştiriyor. İhracat hacminde geçen yıla oranla %45'lik bir sıçrama kaydedildi.</p>
    
    <h3>Sporcu Menülerinin Yeni Gözdesi</h3>
    <p>Diyetisyenler ve spor uzmanları, cezeryenin yoğun lif yapısı, vitamin deposu havuç özü ve fındık/fıstıktan gelen faydalı yağlar sayesinde ideal bir enerji barı olduğunu savunuyor. Mersinli üreticiler, yakında 'Cezerye Sporcu Barı' markası altında glutensiz ve şekersiz yeni versiyonları da piyasaya süreceklerini ekledi.</p>`
  }
];

// Endpoint to retrieve all articles, combining static initial news with live hourly ones
app.get("/api/news", (req, res) => {
  const combined = [...hourlyArticles, ...INITIAL_NEWS];
  combined.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  res.json(combined);
});

// Admin panel endpoints
app.post("/api/admin/fetch-draft", async (req, res) => {
  const { password } = req.body;
  if (password !== "admin123") {
    return res.status(401).json({ error: "Yetkisiz erişim. Geçersiz şifre." });
  }

  try {
    const randomOffset = Math.floor(Math.random() * 100);
    const draft = await generateHourlyArticle(randomOffset);
    draft.id = `draft-${Date.now()}`;
    res.json(draft);
  } catch (error: any) {
    console.error("Fetch draft error:", error);
    res.status(500).json({ error: "Haber taslağı üretilemedi: " + error.message });
  }
});

app.post("/api/admin/publish", async (req, res) => {
  const { password, article } = req.body;
  if (password !== "admin123") {
    return res.status(401).json({ error: "Yetkisiz erişim. Geçersiz şifre." });
  }

  if (!article) {
    return res.status(400).json({ error: "Yayınlanacak haber bulunamadı." });
  }

  try {
    const publishedArticle: NewsArticle = {
      ...article,
      id: `hourly-${Date.now()}`,
      createdAt: new Date().toISOString()
    };

    hourlyArticles.unshift(publishedArticle);
    res.json({ success: true, article: publishedArticle });
  } catch (error: any) {
    console.error("Publish draft error:", error);
    res.status(500).json({ error: "Haber yayınlanırken bir hata oluştu: " + error.message });
  }
});

// Content Generator API API
app.post("/api/generate-news", async (req, res) => {
  const { topic, keywords } = req.body;
  
  if (!topic) {
    return res.status(400).json({ error: "Lütfen bir haber konusu girin." });
  }

  const ai = getAiClient();

  if (!ai) {
    // Return a beautifully dynamic mock fallback based on user prompt matched to keywords
    console.log("Using dynamic Mersin news generator fallback...");
    // Artificial 1.5s delay to simulate cloud computation
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    const lowerTopic = topic.toLowerCase();
    let selected = MERCIN_FALLBACKS[0];
    
    if (lowerTopic.includes("antik") || lowerTopic.includes("tarih") || lowerTopic.includes("kanl") || lowerTopic.includes("restorasyon")) {
      selected = MERCIN_FALLBACKS[1];
    } else if (lowerTopic.includes("cezerye") || lowerTopic.includes("tatlı") || lowerTopic.includes("yemek") || lowerTopic.includes("gurme") || lowerTopic.includes("lezzet")) {
      selected = MERCIN_FALLBACKS[2];
    } else {
      // Generate dynamically tailored mock item using topic text
      selected = {
        topic: topic,
        title: `Mersin'de Yeni Gelişme: ${topic} Projesi Mercek Altında`,
        summary: `Mersin genelinde büyük heyecan uyandıran ${topic} projesine dair detaylar netleşmeye başladı. Kent sakinleri gelişmeleri yakından takip ediyor.`,
        category: "gundem",
        tags: [topic.slice(0, 15), "Mersin Gündem", "Özgün İçerik", "Mersin Gelişmeleri"],
        metaDescription: `Mersin'deki ${topic} konusuna dair güncel ve özgün son haberler, analizler ve halkın yorumları haber portalımızda.`,
        content: `<h3>Mersin İçin Heyecan Verici Bir Dönem</h3>
        <p>Mersin kenti, yerel kalkınma politikaları ve vizyoner sivil girişimlerin katkısıyla büyümeye devam ediyor. Tartışılan <strong>${topic}</strong> konusu, kent dinamiklerinin gündem sıralamasında üst basamaklara tırmanmayı başardı. Uzmanlar projenin bölgenin sosyal yaşantısına doğrudan katkı sunacağını öngörüyor.</p>
        
        <h3>Projenin Detayları ve Katkıları Neler Olacak?</h3>
        <p>Bölgedeki yerel idari birimlerden ve kent konseylerinden elde edilen görüşlere göre, Mersin'in sosyo-kültürel altyapısını zenginleştirecek adımlar planlanıyor. Projeyle birlikte çevre kirliliği asgari düzeye indirilerek akıllı kent teknolojileri entegrasyonu hız kazanacak. Özellikle Yenişehir, Mezitli ve Akdeniz ilçelerinde yaşayan vatandaşlar için yeşil koridorların oluşturulması önceliklendirilecek.</p>
        
        <blockquote>Mersin, sanayi, turizm ve tarımın bir arada yaşadığı mükemmel bir Akdeniz mozaiğidir. Bu kent için üretilen her fikir değerlidir.</blockquote>

        <h3>Süreç Nasıl İlerleyecek?</h3>
        <p>Projenin fizibilite onayının ardından 6 ay içerisinde temel atma töreninin gerçekleştirileceği açıklandı. Sivil toplum temsilcileri, yapılan her türlü yatırımın çevre mevzuatına uygun, şeffaf ve kamuoyunu bilgilendirerek yapılması gerektiğinin altını yeniden çizdi. Gelişmeleri anbean aktarmaya devam edeceğiz.</p>`
      };
    }

    const compiledJsonLd = {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      "headline": selected.title,
      "datePublished": new Date().toISOString(),
      "description": selected.summary,
      "author": {
        "@type": "Person",
        "name": "Mersin Odak Yapay Zeka Yazarı"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Mersin Odak Yerel Haber Portalı",
        "logo": {
          "@type": "ImageObject",
          "url": "/logo.png"
        }
      }
    };

    return res.json({
      title: selected.title,
      summary: selected.summary,
      content: selected.content,
      category: selected.category,
      tags: selected.tags,
      metaDescription: selected.metaDescription,
      readTime: "3 dk",
      jsonLdSchema: JSON.stringify(compiledJsonLd, null, 2)
    });
  }

  try {
    const prompt = `Lütfen Mersin ili ile ilgili, tamamen özgün, yerel aramalarda yüksek sıralama elde edecek SEO odaklı bir haber makalesi yaz.
    Konu başlığı: "${topic}"
    Opsiyonel odak anahtar kelimeler: "${keywords || 'Mersin haberleri, Mersin gelişmeleri'}"
    
    Yazacağın haber kesinlikle kopya, çalıntı veya tekrara düşmüş hissi vermemeli. Google AdSense politikalarına uygun, bilgilendirici, kurallı Türkçe ile yazılmış, zengin paragraflardan oluşmalı.
    Makale metninde h3 alt başlıklar, paragraflar (<p>), kalın kelimeler (<strong>), ve tırnak içinde anlamlı vurgular (<blockquote>) gibi HTML etiketleri kullanarak biçimlendirilmiş bir içerik oluştur.

    Mersin'in yerel dokusuna temas etsin (Gerekirse Yenişehir, Toroslar, Mezitli, Tarsus, Akdeniz, Erdemli, Silifke gibi ilçelerden, tantuni, liman gibi yerel sembollerden bahset).

    Lütfen sonucu tam olarak aşağıdaki JSON şemasına göre döndür:
    {
      "title": "Haber Başlığı (SEO dostu, çarpıcı, 55-65 karakter)",
      "summary": "Haberin 1-2 cümlelik spotu / özeti (120-150 karakter arasında, merak uyandırıcı)",
      "content": "Habere ait detaylı HTML gövdesi (h3 başlıkları, p paragrafları, strong elementleri, ve blockquote barındırsın, sığ olmasın, en az 300-400 kelime süren derin ve kaliteli özgün anlatım)",
      "category": "Makaleye en uygun kategori ID'si (Şunlardan biri olmalı: 'gundem', 'ekonomi', 'turizm-yasam', 'kultur-sanat', 'lezzetler', 'spor')",
      "tags": ["Haberle ilgili 3-5 adet kelime öbeği etiket dizisi, ilk etiket Mersin ile başlamalı"],
      "metaDescription": "Google arama listelemesi için SEO Uyumlu Meta Açıklaması (max 160 karakter)",
      "readTime": "Öngörülen okuma süresi (örn: '3 dk')",
      "jsonLdSchema": "Arama motoru botlarının (Googlebot) tarayıp indexleyebileceği, makaleyi tanımlayan mükemmel bir NewsArticle JSON-LD meta betik dizisi (stringified JSON-LD string)"
    }`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["title", "summary", "content", "category", "tags", "metaDescription", "readTime", "jsonLdSchema"],
          properties: {
            title: { type: Type.STRING },
            summary: { type: Type.STRING },
            content: { type: Type.STRING },
            category: { type: Type.STRING },
            tags: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            metaDescription: { type: Type.STRING },
            readTime: { type: Type.STRING },
            jsonLdSchema: { type: Type.STRING }
          }
        }
      }
    });

    const parsedData = JSON.parse(response.text || "{}");
    return res.json(parsedData);
  } catch (error: any) {
    console.error("Gemini News Generation Error: ", error);
    return res.status(500).json({ error: "Haber üretilirken teknik bir hata oluştu: " + error.message });
  }
});

async function bootstrap() {
  // Configure Vite integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);

    // Run pre-population and hourly intervals asynchronously (non-blocking to prevent startup probe failures)
    (async () => {
      console.log("Pre-generating 5 hourly original Mersin news articles in the background...");
      for (let i = 5; i >= 1; i--) {
        try {
          const art = await generateHourlyArticle(i);
          hourlyArticles.push(art);
        } catch (e) {
          console.error("Error pre-populating hourly news:", e);
        }
      }
      console.log(`Mersin Manşet background pre-generation complete. Loaded ${hourlyArticles.length} hourly articles.`);
    })();

    // Active hourly background generator to append a brand new 100% original article every hour
    setInterval(async () => {
      try {
        console.log("Mersin Manşet: Running automated hourly news worker...");
        const newArt = await generateHourlyArticle(0);
        hourlyArticles.unshift(newArt);
      } catch (err) {
        console.error("Error in automated hourly news loop:", err);
      }
    }, 1 * 60 * 60 * 1000); // 1 Hour
  });
}

bootstrap();
