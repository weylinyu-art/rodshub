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
  // Page content keys
  featuredRods: { en: "Featured Rods", es: "Cañas destacadas", fr: "Roden mis en avant", de: "Ausgewählte Ruten", ar: "قضبان مميزة", ru: "Популярные удилища", ja: "注目のロッド", ko: "추천 로드", pt: "Varas em destaque" },
  topPicksWholesale: { en: "Top picks & wholesale deals", es: "Mejores selecciones y ofertas mayoristas", fr: "Meilleures sélections et offres gros", de: "Top-Angebote und Großhandelsdeals", ar: "أفضل الاختيارات وعروض الجملة", ru: "Лучшие предложения и оптовые цены", ja: "厳選アイテムと卸売特価", ko: "추천 상품 및 도매 특가", pt: "Melhores escolhas e ofertas atacado" },
  viewTrending: { en: "View Trending →", es: "Ver tendencias →", fr: "Voir les tendances →", de: "Trends anzeigen →", ar: "عرض الرائج →", ru: "Смотреть тренды →", ja: "トレンドを見る →", ko: "트렌드 보기 →", pt: "Ver tendências →" },
  viewWholesale: { en: "View Wholesale →", es: "Ver mayorista →", fr: "Voir gros →", de: "Großhandel anzeigen →", ar: "عرض الجملة →", ru: "Смотреть оптом →", ja: "卸売を見る →", ko: "도매 보기 →", pt: "Ver atacado →" },
  newArrivals: { en: "New Arrivals", es: "Novedades", fr: "Nouveautés", de: "Neuerscheinungen", ar: "الوافدون الجدد", ru: "Новинки", ja: "新着", ko: "신규 상품", pt: "Novidades" },
  browseAll: { en: "Browse all →", es: "Ver todo →", fr: "Voir tout →", de: "Alle anzeigen →", ar: "تصفح الكل →", ru: "Смотреть все →", ja: "すべて見る →", ko: "전체 보기 →", pt: "Ver tudo →" },
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
  skusWholesaleMoq: { en: "{count}+ SKUs · Wholesale prices · MOQ from 30 pcs", es: "{count}+ SKU · Precios mayoristas · MOQ desde 30 uds", fr: "{count}+ SKU · Prix gros · MOQ dès 30 pcs", de: "{count}+ SKUs · Großhandelspreise · MOQ ab 30 Stk", ar: "{count}+ وحدة · أسعار جملة · حد أدنى 30 قطعة", ru: "{count}+ SKU · Оптовые цены · MOQ от 30 шт", ja: "{count}+ SKU · 卸売価格 · MOQ 30本から", ko: "{count}+ SKU · 도매 가격 · MOQ 30개부터", pt: "{count}+ SKUs · Preços atacado · MOQ a partir de 30 un" },
  articlesCount: { en: "{n} articles", es: "{n} artículos", fr: "{n} articles", de: "{n} Artikel", ar: "{n} مقال", ru: "{n} статей", ja: "{n}件の記事", ko: "기사 {n}개", pt: "{n} artigos" },
  popularReads: { en: "Popular reads", es: "Lecturas populares", fr: "Lectures populaires", de: "Beliebte Artikel", ar: "قراءات شائعة", ru: "Популярные статьи", ja: "人気記事", ko: "인기 글", pt: "Leituras populares" },
  readArticle: { en: "Read article", es: "Leer artículo", fr: "Lire l'article", de: "Artikel lesen", ar: "قراءة المقال", ru: "Читать статью", ja: "記事を読む", ko: "기사 읽기", pt: "Ler artigo" },
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
