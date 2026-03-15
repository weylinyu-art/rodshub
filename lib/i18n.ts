/** Supported languages: UN languages + German, Japanese, Korean, Portuguese */
export const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "es", name: "Español" },
  { code: "fr", name: "Français" },
  { code: "de", name: "Deutsch" },
  { code: "ar", name: "العربية" },
  { code: "ru", name: "Русский" },
  { code: "ja", name: "日本語" },
  { code: "ko", name: "한국어" },
  { code: "pt", name: "Português" },
] as const;

export type LangCode = (typeof LANGUAGES)[number]["code"];

const STORAGE_KEY = "rodshub-lang";
const COOKIE_NAME = "rodshub-lang";

export function getStoredLang(): LangCode {
  if (typeof window === "undefined") return "en";
  const stored = localStorage.getItem(STORAGE_KEY) as LangCode | null;
  if (stored && LANGUAGES.some((l) => l.code === stored)) return stored;
  const browser = navigator.language?.toLowerCase().slice(0, 2);
  const match = LANGUAGES.find((l) => browser?.startsWith(l.code));
  return match?.code ?? "en";
}

export function setStoredLang(code: LangCode): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, code);
  document.cookie = `${COOKIE_NAME}=${code}; path=/; max-age=31536000; SameSite=Lax`;
}

export { COOKIE_NAME };

/** Server: read lang from cookie value (e.g. cookies().get(COOKIE_NAME)?.value) */
export function getLangFromCookieValue(value: string | null | undefined): LangCode {
  if (!value) return "en";
  const val = value.trim();
  if (LANGUAGES.some((l) => l.code === val)) return val as LangCode;
  return "en";
}

type Translations = Record<string, Record<LangCode, string>>;

export const T: Translations = {
  home: { en: "Home", es: "Inicio", fr: "Accueil", de: "Startseite", ar: "الرئيسية", ru: "Главная", ja: "ホーム", ko: "홈", pt: "Início" },
  categories: { en: "Categories", es: "Categorías", fr: "Catégories", de: "Kategorien", ar: "الفئات", ru: "Категории", ja: "カテゴリー", ko: "카테고리", pt: "Categorias" },
  scenarios: { en: "Scenarios", es: "Escenarios", fr: "Scénarios", de: "Szenarien", ar: "السيناريوهات", ru: "Сценарии", ja: "シナリオ", ko: "시나리오", pt: "Cenários" },
  trending: { en: "Trending", es: "Tendencias", fr: "Tendances", de: "Trends", ar: "رائج", ru: "Популярное", ja: "トレンド", ko: "인기", pt: "Tendências" },
  wholesale: { en: "Wholesale", es: "Mayorista", fr: "Gros", de: "Großhandel", ar: "الجملة", ru: "Оптом", ja: "卸売", ko: "도매", pt: "Atacado" },
  insights: { en: "Insights", es: "Información", fr: "Actualités", de: "Insights", ar: "رؤى", ru: "Статьи", ja: "インサイト", ko: "인사이트", pt: "Insights" },
  inquiry: { en: "Inquiry", es: "Consulta", fr: "Demande", de: "Anfrage", ar: "استفسار", ru: "Запрос", ja: "お問い合わせ", ko: "문의", pt: "Consulta" },
  sendInquiry: { en: "Send Inquiry", es: "Enviar consulta", fr: "Envoyer demande", de: "Anfrage senden", ar: "إرسال استفسار", ru: "Отправить запрос", ja: "お問い合わせ", ko: "문의 보내기", pt: "Enviar consulta" },
  browse: { en: "Browse", es: "Ver", fr: "Parcourir", de: "Durchsuchen", ar: "تصفح", ru: "Каталог", ja: "閲覧", ko: "둘러보기", pt: "Navegar" },
  browseRods: { en: "Browse Rods", es: "Ver cañas", fr: "Parcourir", de: "Ruten durchsuchen", ar: "تصفح القضبان", ru: "Смотреть удилища", ja: "ロッドを閲覧", ko: "로드 둘러보기", pt: "Ver varas" },
  all: { en: "All", es: "Todo", fr: "Tous", de: "Alle", ar: "الكل", ru: "Все", ja: "すべて", ko: "전체", pt: "Todos" },
  searchPlaceholder: { en: "Search rods...", es: "Buscar cañas...", fr: "Rechercher...", de: "Ruten suchen...", ar: "بحث القضبان...", ru: "Поиск удилищ...", ja: "ロッドを検索...", ko: "로드 검색...", pt: "Buscar varas..." },
  search: { en: "Search", es: "Buscar", fr: "Rechercher", de: "Suchen", ar: "بحث", ru: "Поиск", ja: "検索", ko: "검색", pt: "Buscar" },
  language: { en: "Language", es: "Idioma", fr: "Langue", de: "Sprache", ar: "اللغة", ru: "Язык", ja: "言語", ko: "언어", pt: "Idioma" },
  sections: { en: "Sections", es: "Secciones", fr: "Sections", de: "Bereiche", ar: "الأقسام", ru: "Разделы", ja: "セクション", ko: "섹션", pt: "Seções" },
  rods: { en: "Rods", es: "cañas", fr: "cannes", de: "Ruten", ar: "قضبان", ru: "удилища", ja: "ロッド", ko: "로드", pt: "varas" },
  catSpinning: { en: "Spinning", es: "Spinning", fr: "Spinning", de: "Spinnrute", ar: "سبينينغ", ru: "Спиннинг", ja: "スピニング", ko: "스피닝", pt: "Spinning" },
  catCasting: { en: "Casting", es: "Casting", fr: "Casting", de: "Wurfrute", ar: "كاستينغ", ru: "Кастинг", ja: "キャスティング", ko: "캐스팅", pt: "Casting" },
  catTelescopic: { en: "Telescopic", es: "Telescópica", fr: "Télescopique", de: "Teleskoprute", ar: "قابلة للتمديد", ru: "Телескопическая", ja: "テレスコピック", ko: "텔레스코픽", pt: "Telescópica" },
  catSurf: { en: "Surf", es: "Surf", fr: "Surf", de: "Surf", ar: "سيرف", ru: "Серф", ja: "サーフ", ko: "서프", pt: "Surf" },
  catIceFishing: { en: "Ice Fishing", es: "Pesca en hielo", fr: "Pêche sur glace", de: "Eisangeln", ar: "صيد الجليد", ru: "Зимняя рыбалка", ja: "アイスフィッシング", ko: "빙어낚시", pt: "Pesca no gelo" },
  catTravel: { en: "Travel", es: "Viaje", fr: "Voyage", de: "Reiserute", ar: "السفر", ru: "Путешествие", ja: "トラベル", ko: "트래블", pt: "Viagem" },
  scenFreshwater: { en: "Freshwater", es: "Agua dulce", fr: "Eau douce", de: "Süßwasser", ar: "المياه العذبة", ru: "Пресная вода", ja: "淡水", ko: "민물", pt: "Água doce" },
  scenSaltwater: { en: "Saltwater", es: "Agua salada", fr: "Eau salée", de: "Salzwasser", ar: "المياه المالحة", ru: "Морская вода", ja: "海水", ko: "바닷물", pt: "Água salgada" },
  scenSurf: { en: "Surf", es: "Surf", fr: "Surf", de: "Surf", ar: "سيرف", ru: "Серф", ja: "サーフ", ko: "서프", pt: "Surf" },
  scenBoat: { en: "Boat", es: "Bote", fr: "Bateau", de: "Boot", ar: "القارب", ru: "Лодка", ja: "ボート", ko: "보트", pt: "Barco" },
  scenIce: { en: "Ice", es: "Hielo", fr: "Glace", de: "Eis", ar: "الجليد", ru: "Лёд", ja: "氷", ko: "얼음", pt: "Gelo" },
  footerTagline: { en: "The global B2B marketplace for fishing rod sourcing.", es: "El marketplace B2B global de cañas de pesca.", fr: "La place de marché B2B mondiale pour les cannes à pêche.", de: "Der globale B2B-Marktplatz für Angelruten-Beschaffung.", ar: "سوق B2B العالمي لمصادر قضبان الصيد.", ru: "Глобальная B2B площадка по закупке рыболовных удилищ.", ja: "釣り竿調達のグローバルB2Bマーケットプレイス。", ko: "낚싯대 조달 글로벌 B2B 마켓플레이스.", pt: "O mercado B2B global para aquisição de varas de pesca." },
  contactUs: { en: "Contact Us", es: "Contáctenos", fr: "Contactez-nous", de: "Kontakt", ar: "اتصل بنا", ru: "Связаться с нами", ja: "お問い合わせ", ko: "문의하기", pt: "Fale conosco" },
  company: { en: "Company", es: "Empresa", fr: "Entreprise", de: "Unternehmen", ar: "الشركة", ru: "О компании", ja: "会社情報", ko: "회사", pt: "Empresa" },
  aboutUs: { en: "About Us", es: "Sobre nosotros", fr: "À propos", de: "Über uns", ar: "من نحن", ru: "О нас", ja: "私たちについて", ko: "회사 소개", pt: "Sobre nós" },
  contact: { en: "Contact", es: "Contacto", fr: "Contact", de: "Kontakt", ar: "اتصال", ru: "Контакты", ja: "連絡先", ko: "연락처", pt: "Contato" },
  legal: { en: "Legal", es: "Legal", fr: "Mentions légales", de: "Rechtliches", ar: "قانوني", ru: "Правовая информация", ja: "法的情報", ko: "법적 정보", pt: "Legal" },
  privacyPolicy: { en: "Privacy Policy", es: "Política de privacidad", fr: "Politique de confidentialité", de: "Datenschutz", ar: "سياسة الخصوصية", ru: "Политика конфиденциальности", ja: "プライバシーポリシー", ko: "개인정보처리방침", pt: "Política de privacidade" },
  faq: { en: "FAQ", es: "FAQ", fr: "FAQ", de: "FAQ", ar: "الأسئلة الشائعة", ru: "Часто задаваемые вопросы", ja: "よくある質問", ko: "자주 묻는 질문", pt: "FAQ" },
  allRightsReserved: { en: "All rights reserved.", es: "Todos los derechos reservados.", fr: "Tous droits réservés.", de: "Alle Rechte vorbehalten.", ar: "جميع الحقوق محفوظة.", ru: "Все права защищены.", ja: "All rights reserved.", ko: "All rights reserved.", pt: "Todos os direitos reservados." },
  copy: { en: "Copy", es: "Copiar", fr: "Copier", de: "Kopieren", ar: "نسخ", ru: "Копировать", ja: "コピー", ko: "복사", pt: "Copiar" },
  share: { en: "Share", es: "Compartir", fr: "Partager", de: "Teilen", ar: "مشاركة", ru: "Поделиться", ja: "シェア", ko: "공유", pt: "Compartilhar" },
  copied: { en: "Copied!", es: "¡Copiado!", fr: "Copié !", de: "Kopiert!", ar: "تم النسخ!", ru: "Скопировано!", ja: "コピーしました！", ko: "복사됨!", pt: "Copiado!" },
  shareRodsHub: { en: "Share RodsHub", es: "Compartir RodsHub", fr: "Partager RodsHub", de: "RodsHub teilen", ar: "مشاركة RodsHub", ru: "Поделиться RodsHub", ja: "RodsHubをシェア", ko: "RodsHub 공유", pt: "Compartilhar RodsHub" },
  shareThisPage: { en: "Share this page", es: "Compartir esta página", fr: "Partager cette page", de: "Seite teilen", ar: "مشاركة هذه الصفحة", ru: "Поделиться страницей", ja: "このページをシェア", ko: "이 페이지 공유", pt: "Compartilhar esta página" },
  shareWithNetwork: { en: "Share with your network", es: "Compartir con tu red", fr: "Partager avec votre réseau", de: "Mit Ihrem Netzwerk teilen", ar: "مشاركة مع شبكتك", ru: "Поделиться в соцсетях", ja: "ネットワークでシェア", ko: "네트워크와 공유", pt: "Compartilhar com sua rede" },
  shareRecommendedCopy: { en: "I found a professional B2B fishing rod marketplace – 2000+ SKUs, wholesale $8-18, 24h reply, OEM available. Tackle businesses, don't miss this! 👉", es: "Encontré un marketplace B2B de cañas de pesca – 2000+ SKUs, mayorista $8-18, respuesta 24h, OEM. ¡No te lo pierdas! 👉", fr: "J'ai trouvé un marketplace B2B de cannes à pêche – 2000+ SKU, gros $8-18, réponse 24h, OEM. À ne pas manquer ! 👉", de: "Ich habe einen professionellen B2B-Marktplatz für Angelruten gefunden – 2000+ Artikel, Großhandel $8-18, 24h Antwort, OEM. Nicht verpassen! 👉", ar: "وجدت سوق B2B احترافي لقضبان الصيد – 2000+ وحدة، جملة $8-18، رد خلال 24 ساعة، OEM. لا تفوت الفرصة! 👉", ru: "Нашёл профессиональный B2B-маркетплейс удилищ – 2000+ SKU, оптом $8-18, ответ за 24ч, OEM. Не пропустите! 👉", ja: "プロのB2B釣り竿マーケットを見つけました – 2000+SKU、卸売$8-18、24時間返信、OEM対応。必見です！👉", ko: "전문 B2B 낚싯대 마켓플레이스를 찾았어요 – 2000+ SKU, 도매 $8-18, 24시간 답변, OEM 가능. 꼭 확인해보세요! 👉", pt: "Encontrei um marketplace B2B de varas de pesca – 2000+ SKUs, atacado $8-18, resposta 24h, OEM. Não perca! 👉" },
  instagramCopied: { en: "Copied! Paste in Instagram DM or story", es: "¡Copiado! Pegar en DM o story de Instagram", fr: "Copié ! Coller dans le DM ou story Instagram", de: "Kopiert! In Instagram DM oder Story einfügen", ar: "تم النسخ! الصق في رسالة أو ستوري إنستغرام", ru: "Скопировано! Вставьте в DM или сторис Instagram", ja: "コピーしました！InstagramのDMやストーリーに貼り付けて", ko: "복사됨! Instagram DM이나 스토리에 붙여넣기", pt: "Copiado! Cole na DM ou story do Instagram" },
  // Page content keys
  featuredRods: { en: "Featured Rods", es: "Cañas destacadas", fr: "Roden mis en avant", de: "Ausgewählte Ruten", ar: "قضبان مميزة", ru: "Популярные удилища", ja: "注目のロッド", ko: "추천 로드", pt: "Varas em destaque" },
  topPicksWholesale: { en: "Top picks & wholesale deals", es: "Mejores selecciones y ofertas mayoristas", fr: "Meilleures sélections et offres gros", de: "Top-Angebote und Großhandelsdeals", ar: "أفضل الاختيارات وعروض الجملة", ru: "Лучшие предложения и оптовые цены", ja: "厳選アイテムと卸売特価", ko: "추천 상품 및 도매 특가", pt: "Melhores escolhas e ofertas atacado" },
  viewTrending: { en: "View Trending →", es: "Ver tendencias →", fr: "Voir les tendances →", de: "Trends anzeigen →", ar: "عرض الرائج →", ru: "Смотреть тренды →", ja: "トレンドを見る →", ko: "트렌드 보기 →", pt: "Ver tendências →" },
  viewWholesale: { en: "View Wholesale →", es: "Ver mayorista →", fr: "Voir gros →", de: "Großhandel anzeigen →", ar: "عرض الجملة →", ru: "Смотреть оптом →", ja: "卸売を見る →", ko: "도매 보기 →", pt: "Ver atacado →" },
  newArrivals: { en: "New Arrivals", es: "Novedades", fr: "Nouveautés", de: "Neuerscheinungen", ar: "الوافدون الجدد", ru: "Новинки", ja: "新着", ko: "신규 상품", pt: "Novidades" },
  browseAll: { en: "Browse all →", es: "Ver todo →", fr: "Voir tout →", de: "Alle anzeigen →", ar: "تصفح الكل →", ru: "Смотреть все →", ja: "すべて見る →", ko: "전체 보기 →", pt: "Ver tudo →" },
  viewAll: { en: "View all →", es: "Ver todo →", fr: "Voir tout →", de: "Alle anzeigen →", ar: "عرض الكل →", ru: "Смотреть все →", ja: "すべて見る →", ko: "전체 보기 →", pt: "Ver tudo →" },
  fishingInsightsTitle: { en: "Fishing Insights", es: "Información de pesca", fr: "Actualités pêche", de: "Fishing Insights", ar: "رؤى الصيد", ru: "Статьи о рыбалке", ja: "フィッシングインサイト", ko: "낚시 인사이트", pt: "Fishing Insights" },
  industryKnowledge: { en: "Industry knowledge for smarter sourcing", es: "Conocimiento del sector para una compra más inteligente", fr: "Connaissances du secteur pour des achats plus intelligents", de: "Branchenwissen für smartes Einkaufen", ar: "معرفة القطاع للشراء الأذكى", ru: "Отраслевые знания для умных закупок", ja: "スマートな調達のための業界知識", ko: "스마트한 조달을 위한 업계 지식", pt: "Conhecimento do setor para aquisição inteligente" },
  readAllArticles: { en: "Read all articles →", es: "Leer todos los artículos →", fr: "Lire tous les articles →", de: "Alle Artikel lesen →", ar: "قراءة جميع المقالات →", ru: "Читать все статьи →", ja: "すべての記事を読む →", ko: "모든 기사 읽기 →", pt: "Ler todos os artigos →" },
  readyToSource: { en: "Ready to source?", es: "¿Listo para comprar?", fr: "Prêt à acheter ?", de: "Bereit zum Einkauf?", ar: "هل أنت جاهز للشراء؟", ru: "Готовы к закупке?", ja: "調達の準備はできましたか？", ko: "조달 준비되셨나요?", pt: "Pronto para comprar?" },
  sendInquiryPrompt: { en: "Send us your requirements. We reply within 24 hours.", es: "Envíenos sus requisitos. Respondemos en 24 horas.", fr: "Envoyez-nous vos besoins. Réponse sous 24 h.", de: "Senden Sie uns Ihre Anforderungen. Wir antworten innerhalb von 24 Stunden.", ar: "أرسل متطلباتك. نرد خلال 24 ساعة.", ru: "Отправьте нам ваши требования. Ответим в течение 24 часов.", ja: "ご要望をお送りください。24時間以内に返信します。", ko: "요구사항을 보내주세요. 24시간 내에 답변드립니다.", pt: "Envie seus requisitos. Respondemos em 24 horas." },
  learnMore: { en: "Learn more →", es: "Más información →", fr: "En savoir plus →", de: "Mehr erfahren →", ar: "المزيد →", ru: "Подробнее →", ja: "詳しく見る →", ko: "자세히 보기 →", pt: "Saiba mais →" },
  yourTrustedPartner: { en: "Your Trusted Rod Sourcing Partner", es: "Su socio de confianza en cañas", fr: "Votre partenaire de confiance", de: "Ihr vertrauenswürdiger Ruten-Lieferant", ar: "شريكك الموثوق لتوريد القضبان", ru: "Надежный поставщик удилищ", ja: "信頼のロッド調達パートナー", ko: "신뢰할 수 있는 로드 조달 파트너", pt: "Seu parceiro confiável em varas" },
  bestPricesSupport: { en: "Best prices, global logistics, and personalized support for B2B buyers", es: "Mejores precios, logística global y soporte personalizado para compradores B2B", fr: "Meilleurs prix, logistique mondiale et support personnalisé pour acheteurs B2B", de: "Beste Preise, globale Logistik und persönliche Betreuung für B2B-Käufer", ar: "أفضل الأسعار والشحن العالمي والدعم الشخصي للمشترين B2B", ru: "Лучшие цены, глобальная логистика и персональная поддержка для B2B", ja: "B2Bバイヤー向け最安価格、グローバル物流、個別サポート", ko: "B2B 구매자 위한 최고 가격, 글로벌 물류, 맞춤 지원", pt: "Melhores preços, logística global e suporte personalizado para compradores B2B" },
  bulkOrders: { en: "Bulk Orders", es: "Pedidos al por mayor", fr: "Commandes en gros", de: "Großbestellungen", ar: "طلبات الجملة", ru: "Оптовые заказы", ja: "大口注文", ko: "대량 주문", pt: "Pedidos em atacado" },
  oemCustomization: { en: "OEM Customization", es: "Personalización OEM", fr: "Personnalisation OEM", de: "OEM-Anpassung", ar: "تخصيص OEM", ru: "OEM-кастомизация", ja: "OEMカスタマイズ", ko: "OEM 맞춤 제작", pt: "Personalização OEM" },
  globalShipping: { en: "Global Shipping", es: "Envío mundial", fr: "Expédition mondiale", de: "Weltweiter Versand", ar: "الشحن العالمي", ru: "Доставка по миру", ja: "全世界配送", ko: "전 세계 배송", pt: "Envio global" },
  heroTitle: { en: "One Hub. Endless Rods.", es: "Un hub. Infinitas cañas.", fr: "Un hub. Des milliers de cannes.", de: "Ein Hub. Endlose Ruten.", ar: "مركز واحد. قضبان لا تنتهي.", ru: "Один хаб. Бесконечные удилища.", ja: "ワンハブ。無限のロッド。", ko: "원 허브. 무한한 로드.", pt: "Um hub. Varas infinitas." },
  heroSubtitle: { en: "The global marketplace for fishing rod sourcing", es: "El marketplace global de cañas de pesca", fr: "La place de marché mondiale pour les cannes à pêche", de: "Der globale Marktplatz für Angelruten-Beschaffung", ar: "سوق عالمي لتوريد قضبان الصيد", ru: "Глобальный маркетплейс для закупки удилищ", ja: "釣り竿調達のグローバルマーケットプレイス", ko: "낚싯대 조달 글로벌 마켓플레이스", pt: "O mercado global para aquisição de varas de pesca" },
  skusWholesaleMoq: { en: "{count}+ SKUs · Wholesale prices", es: "{count}+ SKU · Precios mayoristas", fr: "{count}+ SKU · Prix gros", de: "{count}+ SKUs · Großhandelspreise", ar: "{count}+ وحدة · أسعار جملة", ru: "{count}+ SKU · Оптовые цены", ja: "{count}+ SKU · 卸売価格", ko: "{count}+ SKU · 도매 가격", pt: "{count}+ SKUs · Preços atacado" },
  articlesCount: { en: "{n} articles", es: "{n} artículos", fr: "{n} articles", de: "{n} Artikel", ar: "{n} مقال", ru: "{n} статей", ja: "{n}件の記事", ko: "기사 {n}개", pt: "{n} artigos" },
  popularReads: { en: "Popular reads", es: "Lecturas populares", fr: "Lectures populaires", de: "Beliebte Artikel", ar: "قراءات شائعة", ru: "Популярные статьи", ja: "人気記事", ko: "인기 글", pt: "Leituras populares" },
  readArticle: { en: "Read article", es: "Leer artículo", fr: "Lire l'article", de: "Artikel lesen", ar: "قراءة المقال", ru: "Читать статью", ja: "記事を読む", ko: "기사 읽기", pt: "Ler artigo" },
  viewMore: { en: "More", es: "Más", fr: "Plus", de: "Mehr", ar: "المزيد", ru: "Ещё", ja: "もっと見る", ko: "더보기", pt: "Mais" },
  // Product detail & Search
  description: { en: "Description", es: "Descripción", fr: "Description", de: "Beschreibung", ar: "الوصف", ru: "Описание", ja: "説明", ko: "설명", pt: "Descrição" },
  specifications: { en: "Specifications", es: "Especificaciones", fr: "Spécifications", de: "Spezifikationen", ar: "المواصفات", ru: "Характеристики", ja: "仕様", ko: "사양", pt: "Especificações" },
  keyFeatures: { en: "Key Features", es: "Características", fr: "Caractéristiques", de: "Hauptmerkmale", ar: "الميزات الرئيسية", ru: "Ключевые особенности", ja: "主な特徴", ko: "주요 특징", pt: "Características principais" },
  material: { en: "Material", es: "Material", fr: "Matériau", de: "Material", ar: "المادة", ru: "Материал", ja: "材質", ko: "재질", pt: "Material" },
  length: { en: "Length", es: "Longitud", fr: "Longueur", de: "Länge", ar: "الطول", ru: "Длина", ja: "長さ", ko: "길이", pt: "Comprimento" },
  power: { en: "Power", es: "Potencia", fr: "Puissance", de: "Power", ar: "القوة", ru: "Мощность", ja: "パワー", ko: "파워", pt: "Potência" },
  searchRods: { en: "Search Rods", es: "Buscar cañas", fr: "Rechercher cannes", de: "Ruten suchen", ar: "بحث القضبان", ru: "Поиск удилищ", ja: "ロッドを検索", ko: "로드 검색", pt: "Buscar varas" },
  searchHint: { en: "Enter a keyword in the header search box", es: "Escriba una palabra en el cuadro de búsqueda", fr: "Entrez un mot-clé dans la barre de recherche", de: "Geben Sie ein Stichwort in die Suchleiste ein", ar: "أدخل كلمة في مربع البحث", ru: "Введите слово в поиск", ja: "ヘッダーの検索ボックスにキーワードを入力", ko: "헤더 검색창에 키워드 입력", pt: "Digite uma palavra na caixa de pesquisa" },
  resultsFound: { en: "{n} result", es: "{n} resultado", fr: "{n} résultat", de: "{n} Ergebnis", ar: "{n} نتيجة", ru: "{n} результат", ja: "{n}件", ko: "{n}개 결과", pt: "{n} resultado" },
  resultsFoundPlural: { en: "{n} results", es: "{n} resultados", fr: "{n} résultats", de: "{n} Ergebnisse", ar: "{n} نتائج", ru: "{n} результатов", ja: "{n}件", ko: "{n}개 결과", pt: "{n} resultados" },
  noProductsMatch: { en: "No products match your search. Try \"spinning\", \"carbon\", or \"travel\".", es: "No hay productos. Pruebe \"spinning\", \"carbon\" o \"travel\".", fr: "Aucun produit. Essayez \"spinning\", \"carbon\" ou \"travel\".", de: "Keine Produkte. Versuchen Sie \"Spinning\", \"Carbon\" oder \"Travel\".", ar: "لا توجد منتجات. جرب \"spinning\" أو \"carbon\" أو \"travel\".", ru: "Нет результатов. Попробуйте «spinning», «carbon» или «travel».", ja: "該当なし。「spinning」「carbon」「travel」をお試しください。", ko: "검색 결과 없음. \"spinning\", \"carbon\", \"travel\"로 검색해 보세요.", pt: "Nenhum produto. Tente \"spinning\", \"carbon\" ou \"travel\"." },
  insightsSubtitle: { en: "Practical guides and sourcing insights for fishing rod buyers and tackle businesses.", es: "Guías prácticas e información para compradores y negocios de cañas.", fr: "Guides pratiques et insights pour acheteurs et entreprises.", de: "Praktische Leitfäden und Insights für Einkäufer und Unternehmen.", ar: "أدلة عملية ورؤى للشراء للأعمال التجارية.", ru: "Практические руководства и обзоры для покупателей и бизнеса.", ja: "ロッドバイヤーやタックル事業者向けの実践ガイド。", ko: "로드 구매자 및 사업자를 위한 실용 가이드.", pt: "Guias práticos e insights para compradores e negócios." },
  inquiryNow: { en: "Inquiry Now", es: "Consultar ahora", fr: "Demander maintenant", de: "Jetzt anfragen", ar: "استفسار الآن", ru: "Запросить", ja: "今すぐお問い合わせ", ko: "지금 문의하기", pt: "Consultar agora" },
  packagingDelivery: { en: "Packaging & Delivery", es: "Embalaje y envío", fr: "Emballage et livraison", de: "Verpackung & Versand", ar: "التعبئة والتوصيل", ru: "Упаковка и доставка", ja: "梱包と配送", ko: "포장 및 배송", pt: "Embalagem e entrega" },
  logistics: { en: "Logistics", es: "Logística", fr: "Logistique", de: "Logistik", ar: "اللوجستيات", ru: "Логистика", ja: "物流", ko: "물류", pt: "Logística" },
  logisticsDesc: { en: "Supporting air freight and sea shipping, with delivery within 6–9 business days at the fastest.", es: "Transporte aéreo y marítimo, entrega en 6–9 días laborables.", fr: "Transport aérien et maritime, livraison en 6–9 jours ouvrés.", de: "Luft- und Seefracht, Lieferung in 6–9 Werktagen.", ar: "الشحن الجوي والبحري، التوصيل خلال 6–9 أيام عمل.", ru: "Авиа и морские перевозки, доставка за 6–9 рабочих дней.", ja: "航空・海上輸送、最短6〜9営業日で配送。", ko: "항공 및 해상 운송, 최대 6–9 영업일 내 배송.", pt: "Transporte aéreo e marítimo, entrega em 6–9 dias úteis." },
  service24h: { en: "24-Hour Service", es: "Servicio 24 horas", fr: "Service 24 h", de: "24-Stunden-Service", ar: "خدمة 24 ساعة", ru: "Служба 24 часа", ja: "24時間対応", ko: "24시간 서비스", pt: "Serviço 24h" },
  service24hDesc: { en: "If you have any problems, please contact customer service. We reply within 24 hours.", es: "Problemas: contacte servicio al cliente. Respondemos en 24 horas.", fr: "Problèmes: contactez le service client. Réponse sous 24 h.", de: "Bei Fragen kontaktieren Sie den Kundendienst. Antwort innerhalb 24 Stunden.", ar: "للأسئلة تواصل خدمة العملاء. الرد خلال 24 ساعة.", ru: "Вопросы: свяжитесь с нами. Ответим в течение 24 часов.", ja: "ご不明点はお問い合わせください。24時間以内に返信します。", ko: "문의사항은 고객센터로 연락 주세요. 24시간 내 답변.", pt: "Dúvidas: entre em contato. Respondemos em 24 horas." },
  qualityGuaranteed: { en: "High Quality Guaranteed", es: "Alta calidad garantizada", fr: "Qualité garantie", de: "Höchste Qualität garantiert", ar: "جودة عالية مضمونة", ru: "Гарантия высшего качества", ja: "高品質保証", ko: "고품질 보증", pt: "Alta qualidade garantida" },
  qualityGuaranteedDesc: { en: "All products manufactured by RodsHub meet the highest quality standards. Please read the specifications before ordering.", es: "Todos los productos cumplen los más altos estándares. Lea las especificaciones.", fr: "Tous nos produits répondent aux normes les plus strictes. Consultez les spécifications.", de: "Alle Produkte erfüllen höchste Qualitätsstandards. Bitte Spezifikationen lesen.", ar: "جميع المنتجات تلبي أعلى المعايير. راجع المواصفات قبل الطلب.", ru: "Вся продукция соответствует высшим стандартам. Ознакомьтесь со спецификациями.", ja: "全製品が最高基準を満たします。注文前に仕様をご確認ください。", ko: "모든 제품이 최고 품질 기준을 충족합니다. 주문 전 사양을 확인하세요.", pt: "Todos os produtos atendem aos mais altos padrões. Leia as especificações." },
  packagingDesc: { en: "Each rod is carefully packaged in individual protective sleeves and sturdy tubes to prevent damage during transit. Bulk orders are palletized and wrapped for sea freight compatibility.", es: "Cada caña se embala en fundas protectoras y tubos resistentes. Pedidos grandes paletizados para transporte marítimo.", fr: "Chaque canne est emballée dans des manchons et tubes robustes. Gros volumes palettisés pour fret maritime.", de: "Jede Rute wird einzeln in Schutzfolien und stabile Röhren verpackt. Großbestellungen palettiert.", ar: "كل قضيب مغلف بغلاف واقي وأنابيب متينة. الطلبات الكبيرة منصّة للنقل البحري.", ru: "Каждая удочка упакована в защитную пленку и трубки. Крупные заказы палетируются.", ja: "各ロッドは個別保護スリーブと丈夫なチューブで梱包。大口はパレット対応。", ko: "각 로드는 개별 보호 슬리브와 튜브로 포장. 대량 주문은 파레트 화.", pt: "Cada vara em embalagem individual e tubos resistentes. Pedidos grandes paletizados." },
  moq: { en: "MOQ", es: "MOQ", fr: "MOQ", de: "MOQ", ar: "الحد الأدنى", ru: "MOQ", ja: "MOQ", ko: "MOQ", pt: "MOQ" },
  packagingItem1: { en: "Standard export carton packaging; OEM branding available", es: "Embalaje cartón estándar; marca OEM disponible", fr: "Emballage carton standard; marquage OEM disponible", de: "Standard-Exportkarton; OEM-Branding verfügbar", ar: "تعبئة كرتون قياسية؛ العلامة التجارية OEM متاحة", ru: "Стандартная экспортная упаковка; OEM-брендинг", ja: "標準輸出段ボール梱包; OEMブランディング対応", ko: "표준 수출용 골판지 포장; OEM 브랜딩 가능", pt: "Embalagem cartão padrão; marca OEM disponível" },
  packagingItem2: { en: "Air freight: 6–9 business days; Sea freight: 20–35 days", es: "Aéreo: 6–9 días; Marítimo: 20–35 días", fr: "Aérien: 6–9 jours; Maritime: 20–35 jours", de: "Luftfracht: 6–9 Werktage; Seefracht: 20–35 Tage", ar: "الجوي: 6–9 أيام عمل؛ البحري: 20–35 يوماً", ru: "Авиа: 6–9 раб. дней; Море: 20–35 дней", ja: "航空: 6–9営業日; 海上: 20–35日", ko: "항공: 6–9 영업일; 해상: 20–35일", pt: "Aéreo: 6–9 dias; Marítimo: 20–35 dias" },
  packagingItem3: { en: "FOB/CIF available; documentation included", es: "FOB/CIF disponible; documentación incluida", fr: "FOB/CIF disponibles; documentation incluse", de: "FOB/CIF verfügbar; Dokumentation inklusive", ar: "FOB/CIF متاح؛ الوثائق مشمولة", ru: "FOB/CIF; документация включена", ja: "FOB/CIF対応; 書類一式含む", ko: "FOB/CIF 가능; 서류 포함", pt: "FOB/CIF disponível; documentação incluída" },
  action: { en: "Action", es: "Acción", fr: "Action", de: "Aktion", ar: "الحركة", ru: "Строй", ja: "アクション", ko: "액션", pt: "Ação" },
  lineWeight: { en: "Line Weight", es: "Peso línea", fr: "Poids ligne", de: "Schnurgewicht", ar: "وزن الخيط", ru: "Вес лески", ja: "ラインウェイト", ko: "라인 중량", pt: "Peso linha" },
  lureWeight: { en: "Lure Weight", es: "Peso señuelo", fr: "Poids leurre", de: "Ködergewicht", ar: "وزن الطعم", ru: "Вес приманки", ja: "ルアーウェイト", ko: "루어 중량", pt: "Peso isca" },
  handle: { en: "Handle", es: "Empuñadura", fr: "Poignée", de: "Griff", ar: "المقبض", ru: "Ручка", ja: "グリップ", ko: "핸들", pt: "Cabo" },
  rodSections: { en: "Sections", es: "Secciones", fr: "Sections", de: "Sektionen", ar: "القطاعات", ru: "Секции", ja: "セク션", ko: "섹션", pt: "Seções" },
  selectModel: { en: "Select Model", es: "Seleccionar modelo", fr: "Choisir le modèle", de: "Modell wählen", ar: "اختر الموديل", ru: "Выберите модель", ja: "モデルを選択", ko: "모델 선택", pt: "Selecionar modelo" },
  sku: { en: "SKU", es: "SKU", fr: "SKU", de: "SKU", ar: "الرمز", ru: "SKU", ja: "SKU", ko: "SKU", pt: "SKU" },
  dimensions: { en: "Dimensions", es: "Dimensiones", fr: "Dimensions", de: "Abmessungen", ar: "الأبعاد", ru: "Размеры", ja: "寸法", ko: "치수", pt: "Dimensões" },
  weight: { en: "Weight", es: "Peso", fr: "Poids", de: "Gewicht", ar: "الوزن", ru: "Вес", ja: "重量", ko: "무게", pt: "Peso" },
  detailDimensions: { en: "Detail Dimensions", es: "Dimensiones detalladas", fr: "Dimensions détaillées", de: "Detaillierte Abmessungen", ar: "أبعاد مفصلة", ru: "Детальные размеры", ja: "詳細寸法", ko: "세부 치수", pt: "Dimensões detalhadas" },
  packageDimensions: { en: "Package Dimensions", es: "Dimensiones del paquete", fr: "Dimensions du colis", de: "Verpackungsabmessungen", ar: "أبعاد التعبئة", ru: "Размеры упаковки", ja: "梱包寸法", ko: "포장 치수", pt: "Dimensões da embalagem" },
  type: { en: "Type", es: "Tipo", fr: "Type", de: "Typ", ar: "النوع", ru: "Тип", ja: "タイプ", ko: "타입", pt: "Tipo" },
  trendingRodsNav: { en: "Trending Rods", es: "Cañas en tendencia", fr: "Cannes tendance", de: "Trend-Ruten", ar: "القضبان الرائجة", ru: "Популярные удилища", ja: "トレンドロッド", ko: "트렌드 로드", pt: "Varas em tendência" },
  trendingRodsDesc: { en: "Top picks from our B2B marketplace · Best sellers & hot deals", es: "Mejores del marketplace B2B · Más vendidos", fr: "Meilleures sélections · Best sellers", de: "Top-Angebote · Bestseller", ar: "أفضل المنتجات · الأكثر مبيعاً", ru: "Лучшие предложения · Бестселлеры", ja: "B2Bマーケットの人気商品", ko: "B2B 마켓 인기 상품", pt: "Melhores do marketplace B2B" },
  viewWholesalePicks: { en: "View Wholesale Picks →", es: "Ver mayorista →", fr: "Voir gros →", de: "Großhandel anzeigen →", ar: "عرض الجملة →", ru: "Смотреть оптом →", ja: "卸売を見る →", ko: "도매 보기 →", pt: "Ver atacado →" },
  bulkSavings: { en: "Bulk Savings", es: "Ahorro mayorista", fr: "Économies en gros", de: "Mengenrabatt", ar: "توفير الجملة", ru: "Оптовые скидки", ja: "大口割引", ko: "대량 할인", pt: "Economia no atacado" },
  wholesalePicksTitle: { en: "Wholesale Picks", es: "Selección mayorista", fr: "Choix gros", de: "Großhandelsauswahl", ar: "اختيارات الجملة", ru: "Оптовый выбор", ja: "卸売セレクト", ko: "도매 추천", pt: "Escolhas atacado" },
  wholesalePicksDesc: { en: "Best-value rods for bulk orders & competitive pricing", es: "Mejor relación calidad-precio", fr: "Meilleur rapport qualité-prix", de: "Bestes Preis-Leistungs-Verhältnis", ar: "أفضل قيمة", ru: "Лучшая цена", ja: "コストパフォーマンス最強", ko: "최고 가성비", pt: "Melhor custo-benefício" },
  needCustomBranding: { en: "Need custom branding? We support OEM.", es: "¿Marca personalizada? Soporte OEM.", fr: "Marquage personnalisé ? Nous supportons l'OEM.", de: "Individuelles Branding? OEM-Support.", ar: "علامة مخصصة؟ ندعم OEM.", ru: "Индивидуальный брендинг? OEM-поддержка.", ja: "ブランディング対応？OEMサポート。", ko: "맞춤 브랜딩? OEM 지원.", pt: "Marca personalizada? Suporte OEM." },
  youMayAlsoLike: { en: "You May Also Like", es: "También le puede gustar", fr: "Vous aimerez aussi", de: "Das könnte Sie auch interessieren", ar: "قد يعجبك أيضاً", ru: "Вам также понравится", ja: "おすすめ商品", ko: "관련 상품", pt: "Você também pode gostar" },
  page: { en: "Page", es: "Página", fr: "Page", de: "Seite", ar: "صفحة", ru: "Страница", ja: "ページ", ko: "페이지", pt: "Página" },
  previous: { en: "Previous", es: "Anterior", fr: "Précédent", de: "Zurück", ar: "السابق", ru: "Назад", ja: "前へ", ko: "이전", pt: "Anterior" },
  next: { en: "Next", es: "Siguiente", fr: "Suivant", de: "Weiter", ar: "التالي", ru: "Далее", ja: "次へ", ko: "다음", pt: "Próximo" },
};

export function t(key: keyof typeof T, lang: LangCode): string {
  return T[key]?.[lang] ?? T[key]?.en ?? key;
}

/** Interpolate {placeholder} in translation string */
export function tFormat(key: keyof typeof T, lang: LangCode, vars: Record<string, string | number>): string {
  let str = t(key, lang);
  for (const [k, v] of Object.entries(vars)) {
    str = str.replace(new RegExp(`\\{${k}\\}`, "g"), String(v));
  }
  return str;
}
