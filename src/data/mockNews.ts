import { NewsArticle } from '../types';
import { EXTENDED_NEWS } from './extendedNews';

export const CATEGORIES = [
  { id: 'gundem', name: 'Gündem', icon: 'Globe' },
  { id: 'ekonomi', name: 'Ekonomi / Lojistik', icon: 'TrendingUp' },
  { id: 'turizm-yasam', name: 'Turizm & Yaşam', icon: 'Palmtree' },
  { id: 'kultur-sanat', name: 'Kültür & Sanat', icon: 'Music' },
  { id: 'lezzetler', name: 'Mersin Lezzetleri', icon: 'Utensils' },
  { id: 'spor', name: 'Spor', icon: 'Trophy' }
];

const BASIC_NEWS: NewsArticle[] = [
  {
    id: 'mersin-limani-yatirim',
    title: 'Mersin Limanı\'nda Kapasite Artışı: Doğu Akdeniz Lojistik Üssü Güçleniyor',
    slug: 'mersin-limani-kapasite-artisi-dogu-akdeniz-lojistik-ussu',
    summary: 'Mersin Uluslararası Limanı (MIP), rıhtım genişleme çalışmaları kapsamındaki son fazı tamamlayarak yıllık elleçleme kapasitesini rekor düzeye ulaştırdı. Yatırım, yerel sanayiye ve istihdama doğrudan katkı sağlayacak.',
    category: 'ekonomi',
    imageUrl: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=1200',
    author: 'Kaan Polat',
    createdAt: '2026-06-16T10:30:00Z',
    tags: ['Mersin Limanı', 'MIP', 'Lojistik', 'Mersin Ekonomi', 'Dış Ticaret'],
    metaDescription: 'Mersin Uluslararası Limanı (MIP) rıhtım genişletme yatırımıyla yıllık kapasitesini artırdı. Detaylar ve yerel ekonomiye etkileri haberimizde.',
    jsonLdSchema: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      "headline": "Mersin Limanı'nda Kapasite Artışı: Doğu Akdeniz Lojistik Üssü Güçleniyor",
      "datePublished": "2026-06-16T10:30:00Z",
      "description": "Mersin Uluslararası Limanı kapasite genişleme çalışmalarını tamamlayarak Akdeniz'in en büyük konteyner limanlarından biri haline geldi.",
      "author": {
        "@type": "Person",
        "name": "Kaan Polat"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Mersin Odak",
        "logo": {
          "@type": "ImageObject",
          "url": "/logo.png"
        }
      }
    }, null, 2),
    views: 1420,
    readTime: '4 dk',
    content: `<h3>Mersin Limanı Akdeniz'in Lideri Olma Yolunda Dev Adımlar Atıyor</h3>
    <p>Akdeniz'in en stratejik lojistik kesişim noktalarından biri olan <strong>Mersin Uluslararası Limanı (MIP)</strong>, Doğu Akdeniz'in lider limanı olma unvanını pekiştirecek büyük rıhtım genişletme ve teknoloji entegrasyonu yatırım projelerini başarıyla tamamladığını duyurdu. Bu hamleyle limanın konteyner elleçleme kapasitesi yıllık bazda yaklaşık %25 artış gösterdi.</p>
    
    <h3>Yerel Ekonomiye Binlerce Yeni İstihdam Sağlanacak</h3>
    <p>Genişleme projesinin tamamlanması vesilesiyle düzenlenen basın toplantısında konuşan yetkililer, yatırımın bölgedeki ekosisteme olan olumlu etkilerine değindi. Sadece liman sahasında çalışan sayısı artmakla kalmayacak; aynı zamanda gümrükleme, nakliye, depolama ve paketleme sektörlerinde de yaklaşık <strong>3.500 yeni yan istihdam</strong> imkanı doğacak.</p>
    
    <blockquote>Mersin, jeostratejik konumu sayesinde yalnızca Türkiye'nin değil, Ortadoğu ve Orta Asya pazarlarının da denize açılan en kritik kapısıdır. Yatırımlarımız bu vizyonu desteklemektedir.</blockquote>

    <h3>Gelişmiş Yeşil Liman Teknolojileri Kullanılıyor</h3>
    <p>Yeni yatırımlarla birlikte limanda sıfır karbon emisyonunu hedefleyen elektrikli rıhtım vinçleri (e-RTG) ve tam otomatik kapı geçiş sistemleri devreye alındı. Bu sayede tır kuyruklarının ve liman içi yakıt tüketimlerinin önüne geçilerek, karbon ayak izinde önemli bir düşüş sağlandı. Mersin'in sanayi odasından yapılan açıklamada ise liman kapasite artışının, gıda ve tekstil ihracatçılarının bekleme sürelerini %40 oranında düşüreceği vurgulandı.</p>`
  },
  {
    id: 'tarihi-tarsus-evleri-koruma',
    title: 'Tarihi Tarsus Evleri Restore Ediliyor: Turizm Baharı Kapıda',
    slug: 'tarihi-tarsus-evleri-restorasyon-ve-kulturel-turizm-hamlesi',
    summary: 'Mersin\'in tarihi ve kültürel miras hazinesi Tarsus\'ta, geleneksel taş ve ahşap mimariye sahip tescilli konaklar aslına uygun olarak restore ediliyor. Kültür rotası canlanıyor.',
    category: 'turizm-yasam',
    imageUrl: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=1200',
    author: 'Zeynep Kaya',
    createdAt: '2026-06-15T08:15:00Z',
    tags: ['Tarsus Konakları', 'Restorasyon', 'Turizm', 'Mersin Tarihi', 'Kültür Mirası'],
    metaDescription: 'Mersin Tarsus ilçesindeki geleneksel taş ve ahşap evlerin restorasyon çalışmaları başladı. Gelişmeler ve turizm projeleri detayları.',
    jsonLdSchema: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      "headline": "Tarihi Tarsus Evleri Restore Ediliyor: Turizm Baharı Kapıda",
      "datePublished": "2026-06-15T08:15:00Z",
      "description": "Tarihi Tarsus evlerinde aslına uygun restorasyon çalışmaları tamamlanarak butik otel ve sanat galerisi olarak turlara açılıyor.",
      "author": {
        "@type": "Person",
        "name": "Zeynep Kaya"
      }
    }, null, 2),
    views: 980,
    readTime: '3 dk',
    content: `<h3>Binlerce Yıllık Geçmiş, Tarihi Sokaklarda Yeniden Hayat Buluyor</h3>
    <p>Roma İmparatorluğu'ndan Osmanlı Dönemi'ne uzanan katmanlı tarihiyle Akdeniz'in en kadim yerleşimlerinden biri olan <strong>Tarsus</strong>, geleneksel sokak mimarisini canlandırmak amacıyla büyük bir dönüşüm yaşıyor. Mersin Büyükşehir Belediyesi koordinasyonunda başlatılan projeyle, sivil mimari örneği 40 tescilli konakta cephe iyileştirme ve strüktürel güçlendirme adımları hızla sürüyor.</p>
    
    <h3>Butik Oteller, Kafeler ve El Sanatları Atölyeleri Geliyor</h3>
    <p>Proje yöneticilerinin yaptığı açıklamaya göre, restorasyonu biten binalar yalnızca görsel estetik katmakla kalmayacak, aktif yaşama dahil edilecek. Tarsus Evleri bölgesinin bir kısmı <strong>butik oteller sokağı</strong>, bir bölümü ise geleneksel el sanatları atölyeleri ile Mersin'in meşhur gastronomik lezzetlerinin sunulduğu kafelere dönüştürülecek. Böylece yerli ve yabancı turistlerin bölgede konaklama yapması özendirilecek.</p>
    
    <h3>St. Paul Kuyusu ve Kleopatra Kapısı ile Entegre Dönüşüm</h3>
    <p>Kültürel koridoru genişletmek amacıyla Tarsus Evleri restorasyonları, inanç turizminin önemli merkezlerinden olan <strong>St. Paul Kuyusu</strong>, St. Paul Kilisesi ve ünlü <strong>Kleopatra Kapısı</strong> ile bütünleşik yaya yolları tasarımlarıyla birleştiriliyor. Çevre düzenleme çalışmalarının tamamlanmasıyla Tarsus'un yıllık kültür turisti ağırlama kapasitesinin iki katına çıkması hedefleniyor.</p>`
  },
  {
    id: 'mersin-tantunisi',
    title: 'Mersin Tantunisi Coğrafi İşaretiyle Küresel Arenada Yarışıyor',
    slug: 'mersin-tantunisi-cografi-isaret-ve-gastronomi-turizmi',
    summary: 'Mersin\'in dünya çapında bilinen lezzeti tantuni, tescilli coğrafi işareti standartlarıyla korunurken, uluslararası gastronomi festivallerinde kentin markası olarak ön plana çıkıyor.',
    category: 'lezzetler',
    imageUrl: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=1200',
    author: 'Hasan Yılmaz',
    createdAt: '2026-06-14T14:20:00Z',
    tags: ['Mersin Tantunisi', 'Coğrafi İşaret', 'Gastronomi', 'Tantuni Tarifi', 'Yöresel Lezzetler'],
    metaDescription: 'Coğrafi tescilli geleneksel Mersin Tantunisi\'nin standartları korunuyor ve dünya gastronomi fuarlarında Mersin\'i temsil ediyor.',
    jsonLdSchema: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      "headline": "Mersin Tantunisi Coğrafi İşaretiyle Küresel Arenada Yarışıyor",
      "datePublished": "2026-06-14T14:20:00Z",
      "description": "Geleneksel lezzetimiz Mersin Tantunisi, coğrafi işaret tescili ve gastronomi turizmine katkıları ile gündemde.",
      "author": {
        "@type": "Person",
        "name": "Hasan Yılmaz"
      }
    }, null, 2),
    views: 2150,
    readTime: '3 dk',
    content: `<h3>Sacın Ateşle Buluştuğu Eşsiz Mersin Lezzeti</h3>
    <p>Dana veya kuzu etinin pamuk yağı, pul biber ve sumakla dev bir sac üstünde muazzam bir uyumla pişirilmesiyle yapılan, Türk mutfağının baş yapıtlarından <strong>Mersin Tantunisi</strong>, lezzet tescilini küresel standartlara taşımayı sürdürüyor. Mersin Esnaf ve Sanatkarlar Odası\'nın denetimleriyle, coğrafi işaret kriterleri tüm kent genelinde sıkı takip ediliyor.</p>
    
    <h3>Geleneksel Pişirme Yöntemi Korunuyor</h3>
    <p>Gerçek bir Mersin Tantunisi\'nin sırrı, etin ön haşlama aşamasından sonra saçta pişirilirken eklenen suyun ve yağın oranında saklıdır. Usta eller, sacın ortasında sürekli çevrilen etlerin sıcaklığını korumak için sık sık özel bir su serpme tekniği kullanarak dumanı ve lezzeti buluşturuyor. Yanında sunulan yeşillikler, turplar, taze sıkılmış limon ve tabi ki acı süs biberi de bu eşsiz deneyimin ayrılmaz parçalarıdır.</p>
    
    <h3>Gastronomi Turizminde Büyük Artış</h3>
    <p>Mersin\'e sadece hafta sonu meşhur tantuniyi yerinde yemek, üzerine kerebiç ve cezerye tatlılarını test etmek için gelen <strong>"Gastronomi Turistleri"</strong> kent esnafının yüzünü güldürüyor. Adana Havalimanı ve yeni açılan Çukurova Havalimanı üzerinden kente gelen gurmeler, tantuniciler sokağında uzun kuyruklar oluşturuyor. Esnaf odası temsilcileri, coğrafi işaretli tantuniyi korumanın Mersin markasını korumak olduğunu vurguluyor.</p>`
  },
  {
    id: 'yenisehir-kultur-festivali',
    title: 'Yenişehir Kültür ve Sanat Festivali İçin Geri Sayım Başladı',
    slug: 'yenisehir-kultur-ve-sanat-festivali-etkinlik-takvimi',
    summary: 'Mersin Yenişehir ilçesinde düzenlenecek olan yıllık Kültür ve Sanat Festivali, bu yıl da onlarca tiyatro grubuna, müzisyene ve yerel ressama ev sahipliği yapıyor.',
    category: 'kultur-sanat',
    imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=1200',
    author: 'Melis Aksoy',
    createdAt: '2026-06-12T11:00:00Z',
    tags: ['Yenişehir Festivali', 'Mersin Etkinlik', 'Konserler', 'Mersin Tiyatro', 'Kültür Sanat'],
    metaDescription: 'Geleneksel Mersin Yenişehir Kültür ve Sanat Festivali kapılarını açıyor. Festival konserleri, sergiler ve detaylı etkinlik programı.',
    jsonLdSchema: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      "headline": "Yenişehir Kültür ve Sanat Festivali İçin Geri Sayım Başladı",
      "datePublished": "2026-06-12T11:00:00Z",
      "author": {
        "@type": "Person",
        "name": "Melis Aksoy"
      }
    }, null, 2),
    views: 755,
    readTime: '2 dk',
    content: `<h3>Sanatın Ritmi Akdeniz Esintisiyle Buluşuyor</h3>
    <p>Mersin'in modern yüzü <strong>Yenişehir</strong> ilçesi, bölgenin en prestijli kültür ve sanat şölenine hazırlanıyor. Bu yıl 8.'si düzenlenecek olan Kültür ve Sanat Festivali kapsamında Atatürk Kültür Merkezi ve Marina amfi tiyatro sahnelerinde 12 gün boyunca kesintisiz etkinlikler sanatseverlerin beğenisine sunulacak.</p>
    
    <h3>Açık Hava Sinemaları ve Sokak Tiyatroları Ücretsiz Olacak</h3>
    <p>Yenişehir Belediyesi'nden yapılan bilgilendirmeye göre, festivalin bu seneki mottosu 'Akdeniz'in Sanat Kesişimi' olarak belirlendi. Katılımı artırmak amacıyla mahalle parklarında kurulacak olan **açık hava sinema alanları**, sokak tiyatrosu gösterimleri ve workshoplar tüm halka ücretsiz olarak açılacak. Konser takviminde ise ulusal düzeyde sevilen sanatçıların yanı sıra Mersin Konservatuvarı öğrencilerinin oluşturduğu klasik orkestralar sahne alacak.</p>
    
    <h3>Mersinli Sanatçılara Özel Sergi Alanı</h3>
    <p>Mersin doğumlu veya Mersin'de yaşayan genç ressam, heykeltıraş ve fotoğraf sanatçılarının eserlerinden derlenen 'Mersin Belleği' temalı karma sergi, festival boyunca Kültür Park içinde ziyaret edilebilecek. Sanat otoriteleri, bu festivalin Mersin'in yerel entelektüel sermayesine eşsiz bir değer kattığını söylüyor.</p>`
  },
  {
    id: 'mersin-idman-yurdu-transfer',
    title: 'Yeni Mersin İdman Yurdu\'ndan 1. Lig Yolunda Gövde Gösterisi',
    slug: 'yeni-mersin-idman-yurdu-transfer-haberleri-ve-mac-kazanimi',
    summary: 'Kırmızı-lacivertliler, şampiyonluk yolunda kritik bir virajı geçerken kadrosuna kattığı tecrübeli forvet ve orta saha oyuncularıyla rakiplerine gözdağı verdi. Taraftarlar heyecanlı.',
    category: 'spor',
    imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=1200',
    author: 'Cem Özdemir',
    createdAt: '2026-06-10T17:40:00Z',
    tags: ['Mersin İdman Yurdu', 'Mersin Spor', 'Kırmızı Lacivert', 'Futbol Transferleri'],
    metaDescription: 'Yeni Mersin İdman Yurdu futbol takımından kritik transfer bombası. Kulüp başkanından açıklamalar ve yeni kadro planı.',
    jsonLdSchema: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      "headline": "Yeni Mersin İdman Yurdu'ndan 1. Lig Yolunda Gövde Gösterisi",
      "datePublished": "2026-06-10T17:40:00Z",
      "author": {
        "@type": "Person",
        "name": "Cem Özdemir"
      }
    }, null, 2),
    views: 1840,
    readTime: '3 dk',
    content: `<h3>Şampiyonluk İnancı Kentin Sokaklarına Yansıyor</h3>
    <p>Mersin spor tarihinin köklü çınarı <strong>Yeni Mersin İdman Yurdu</strong>, TFF 2. Lig kırmızı gruptaki şampiyonluk yarışında ipi göğüslemek ve adını yeniden üst liglere yazdırmak için kadro mühendisliğini tamamladı. Kulüp binasında düzenlenen imza töreninde, Süper Lig tecrübesi bulunan iki kilit isim kırmızı-lacivertli renklere bağlandı.</p>
    
    <h3>Mersin Stadyumu Kapalı Gişe Olacak</h3>
    <p>Teknik heyet yaptıkları transferlerden duydukları memnuniyeti dile getirirken, pazar günü oynanacak kritik derbi maç öncesinde taraftarlara tribünleri doldurma çağrısı yaptı. Mersin İdman Yurdu taraftar grupları olan **Şeytanlar**, kentin dört bir yanını bayraklarla donatarak dev bir koreografi hazırlığı başlattı.</p>
    
    <h3>"Mersin Hak Ettiği Liglere Geri Dönecek"</h3>
    <p>Yönetim kurulu başkanının yaptığı konuşmada: "Mersin gibi büyük ve sanayi-lojistik devasa gücüne sahip bir Akdeniz metropolünün spor takımı kesinlikle buralarda kalmamalıdır. Bizim asıl vizyonumuz Mersin İdman Yurdu'nu yeniden hak ettiği devler ligine, yani Süper Lig'e taşımaktır. Bu transferler bu büyük vizyonun sadece ilk basamakları" dedi.</p>`
  },
  {
    id: 'mersin-metrosu-projesi',
    title: 'Mersin Metrosu Projesinde Son Durum: Yenişehir-Mezitli Güzergahı',
    slug: 'mersin-metrosu-yenisehir-mezitli-hizli-ulasim-projesi',
    summary: 'Kentin en büyük ulaşım altyapı projesi olan Mersin Metrosu inşaatında tünel kazma çalışmalarının ikinci etabı başladı. Metro hattı Mezitli ve Yenişehir ilçelerini birbirine bağlayacak.',
    category: 'gundem',
    imageUrl: 'https://images.unsplash.com/photo-1542640244-7e672d6cef21?auto=format&fit=crop&q=80&w=1200',
    author: 'Elif Şen',
    createdAt: '2026-06-08T09:00:00Z',
    tags: ['Mersin Metrosu', 'Ulaşım Altyapısı', 'Mezitli Metro', 'Mersin Belediye'],
    metaDescription: 'Mersin kentsel ulaşımını rahatlatacak elektrikli metro projesinde son çalışmalar. Güzergahlar, istasyon sayıları ve açılış tarihi.',
    jsonLdSchema: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      "headline": "Mersin Metrosu Projesinde Son Durum: Yenişehir-Mezitli Güzergahı",
      "datePublished": "2026-06-08T09:00:00Z",
      "author": {
        "@type": "Person",
        "name": "Elif Şen"
      }
    }, null, 2),
    views: 1290,
    readTime: '4 dk',
    content: `<h3>Mersin'de Trafik Düğümü Raylı Sistemle Çözülüyor</h3>
    <p>Nüfusu son yıllarda lojistik hareketlilik ve göçlerle birlikte hızla artış gösteren <strong>Mersin</strong>'de, şehir içi trafiği köklü olarak rahatlatacak olan raylı sistem metrosunda çalışmalar tam gaz devam ediyor. Mezitli'den başlayıp Yenişehir boyunca devam ederek İstasyon (Gar) bölgesinde sonlanacak 13.4 kilometrelik ilk etap tünellerinin açımında TBM (Tünel Açma Makinesi) makinelerinin hızı iki katına çıkarıldı.</p>
    
    <h3>11 Farklı Yer altı İstasyonu Planlandı</h3>
    <p>Proje detaylarına göre hat boyunca 11 adet akıllı istasyon bulunacak. Bu istasyonlar otopark alanları, bisiklet transfer noktaları ve elektrikli araç şarj istasyonlarıyla entegrasyonu barındıracak. Böylece Mersinliler araçlarını metro istasyonlarına bırakarak kentin işlek caddelerine hiç yorulmadan toplu taşıma ile ulaşabilecekler.</p>
    
    <h3>Günde 250 Bin Yolcu Kapasitesi</h3>
    <p>Metro hattı tam kapasite hizmete girdiğinde, günlük ortalama 250 bin yolcuya konforlu, klimalı ve sıfır emisyonlu seyahat imkanı vadedecek. Mersin Büyükşehir Belediyesi Ulaşım Daire Başkanlığı yetkilileri, projenin planlanan süreden 3 ay önce tamamlanarak önümüzdeki yıl sonuna doğru test sürüşlerinin başlatılacağını müjdelediler.</p>`
  }
];

export const INITIAL_NEWS: NewsArticle[] = [...BASIC_NEWS, ...EXTENDED_NEWS];
