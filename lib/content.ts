/**
 * Page body content translations for home, category, inquiry, etc.
 * Used by client components that consume useLanguage().
 */
import type { LangCode } from "./i18n";

type ContentByLang = Record<LangCode, string>;

export const valueCards: { title: ContentByLang; desc: ContentByLang }[] = [
  {
    title: {
      en: "Ready-to-Ship Stock",
      es: "Stock listo para envío",
      fr: "Stock prêt à expédier",
      de: "Sofort lieferbar",
      ar: "مخزون جاهز للشحن",
      ru: "Готовый к отгрузке",
      ja: "即納在庫",
      ko: "즉시 배송 가능",
      pt: "Estoque pronto para envio",
    },
    desc: {
      en: "Immediate shipping available with our ready-to-ship inventory across spinning, casting, surf, and more.",
      es: "Envío inmediato con inventario listo en spinning, casting, surf y más.",
      fr: "Expédition immédiate avec notre inventaire prêt à expédier.",
      de: "Sofortversand mit lagerfähigem Bestand in Spinning, Casting, Surf und mehr.",
      ar: "شحن فوري مع مخزون جاهز في سبينينغ وكاستينغ وسيرف والمزيد.",
      ru: "Немедленная отгрузка со складского наличия.",
      ja: "スピニング、キャスティング、サーフなど即納可能な在庫。",
      ko: "스피닝, 캐스팅, 서프 등 즉시 배송 가능한 재고.",
      pt: "Envio imediato com estoque pronto em spinning, casting, surf e mais.",
    },
  },
  {
    title: {
      en: "OEM / ODM",
      es: "OEM / ODM",
      fr: "OEM / ODM",
      de: "OEM / ODM",
      ar: "OEM / ODM",
      ru: "OEM / ODM",
      ja: "OEM / ODM",
      ko: "OEM / ODM",
      pt: "OEM / ODM",
    },
    desc: {
      en: "Offering tailored OEM/ODM services—custom specs, branding, and packaging to meet your needs.",
      es: "Servicios OEM/ODM a medida: especificaciones, marca y embalaje.",
      fr: "Services OEM/ODM personnalisés—spécifications, marque et emballage.",
      de: "Maßgeschneiderte OEM/ODM-Dienstleistungen—spezifikationen, Marke und Verpackung.",
      ar: "خدمات OEM/ODM مخصصة—مواصفات وعلامة تجارية وتغليف.",
      ru: "Индивидуальные OEM/ODM услуги—спецификации, брендинг, упаковка.",
      ja: "カスタムOEM/ODMサービス—仕様、ブランディング、パッケージング。",
      ko: "맞춤형 OEM/ODM 서비스—사양, 브랜딩, 패키징.",
      pt: "Serviços OEM/ODM personalizados—especificações, marca e embalagem.",
    },
  },
  {
    title: {
      en: "Vast Rod Selections",
      es: "Amplia selección de cañas",
      fr: "Vaste sélection de cannes",
      de: "Große Rutenauswahl",
      ar: "تشكيلة واسعة من القضبان",
      ru: "Широкий выбор удилищ",
      ja: "豊富なロッド品揃え",
      ko: "다양한 로드 선택",
      pt: "Ampla seleção de varas",
    },
    desc: {
      en: "2000+ SKUs across 6 categories. Broaden your catalog with spinning, casting, surf, telescopic, ice, and travel rods.",
      es: "2000+ SKU en 6 categorías. Spinning, casting, surf, telescópica, hielo y viaje.",
      fr: "2000+ SKU dans 6 catégories. Spinning, casting, surf, télescopique, glace et voyage.",
      de: "2000+ SKUs in 6 Kategorien. Spinning, Casting, Surf, Teleskop, Eis und Reise.",
      ar: "2000+ وحدة في 6 فئات. سبينينغ، كاستينغ، سيرف، تلسكوبية، جليد وسفر.",
      ru: "2000+ SKU в 6 категориях. Спиннинг, кастинг, серф, телескоп, лед, путешествия.",
      ja: "6カテゴリー2000+SKU。スピニング、キャスティング、サーフ、テレスコピック、アイス、トラベル。",
      ko: "6개 카테고리 2000+ SKU. 스피닝, 캐스팅, 서프, 텔레스코픽, 아이스, 트래블.",
      pt: "2000+ SKUs em 6 categorias. Spinning, casting, surf, telescópica, gelo e viagem.",
    },
  },
  {
    title: {
      en: "Tailored Service",
      es: "Servicio personalizado",
      fr: "Service personnalisé",
      de: "Individueller Service",
      ar: "خدمة مخصصة",
      ru: "Индивидуальный сервис",
      ja: "個別対応",
      ko: "맞춤 서비스",
      pt: "Serviço personalizado",
    },
    desc: {
      en: "Enjoy personalized support with dedicated one-on-one assistance. We reply within 24 hours.",
      es: "Soporte personalizado y asistencia individual. Respuesta en 24 horas.",
      fr: "Support personnalisé et assistance dédiée. Réponse sous 24 h.",
      de: "Persönliche Betreuung und individuelle Unterstützung. Antwort innerhalb von 24 Stunden.",
      ar: "دعم شخصي ومساعدة مخصصة. نرد خلال 24 ساعة.",
      ru: "Персональная поддержка. Ответ в течение 24 часов.",
      ja: "個別サポート。24時間以内に返信。",
      ko: "맞춤 지원. 24시간 내 답변.",
      pt: "Suporte personalizado. Resposta em 24 horas.",
    },
  },
];

export const shopByCategory: Record<LangCode, { title: string; subtitle: string; products: string }> = {
  en: { title: "Shop by Category", subtitle: "Browse our catalog by rod type", products: "products" },
  es: { title: "Comprar por categoría", subtitle: "Navegue por tipo de caña", products: "productos" },
  fr: { title: "Acheter par catégorie", subtitle: "Parcourez par type de canne", products: "produits" },
  de: { title: "Nach Kategorie", subtitle: "Durchsuchen Sie unseren Katalog nach Rutentyp", products: "Produkte" },
  ar: { title: "تسوق حسب الفئة", subtitle: "تصفح حسب نوع القضيب", products: "منتجات" },
  ru: { title: "Покупки по категории", subtitle: "Просмотр по типу удилища", products: "товаров" },
  ja: { title: "カテゴリで選ぶ", subtitle: "ロッドタイプでカタログを閲覧", products: "商品" },
  ko: { title: "카테고리별 쇼핑", subtitle: "로드 타입별 카탈로그 둘러보기", products: "제품" },
  pt: { title: "Comprar por categoria", subtitle: "Navegar por tipo de vara", products: "produtos" },
};

export const shopByFishingStyle: Record<LangCode, { title: string; subtitle: string; rods: string }> = {
  en: { title: "Shop by Fishing Style", subtitle: "Find the perfect rod for your fishing environment", rods: "rods" },
  es: { title: "Comprar por estilo", subtitle: "Encuentre la caña perfecta para su entorno", rods: "cañas" },
  fr: { title: "Acheter par style", subtitle: "Trouvez la canne parfaite pour votre environnement", rods: "cannes" },
  de: { title: "Nach Angelstil", subtitle: "Finden Sie die perfekte Rute für Ihr Gewässer", rods: "Ruten" },
  ar: { title: "تسوق حسب أسلوب الصيد", subtitle: "اعثر على القضيب المثالي لبيئتك", rods: "قضبان" },
  ru: { title: "По стилю рыбалки", subtitle: "Подберите идеальное удилище", rods: "удилищ" },
  ja: { title: "スタイルで選ぶ", subtitle: "環境に合ったロッドを見つける", rods: "本" },
  ko: { title: "낚시 스타일별 쇼핑", subtitle: "환경에 맞는 완벽한 로드 찾기", rods: "개" },
  pt: { title: "Comprar por estilo", subtitle: "Encontre a vara perfeita para seu ambiente", rods: "varas" },
};

export const companyIntro: Record<LangCode, { title: string; desc: string; aboutLink: string; stats: { title: string; subtitle: string }[] }> = {
  en: {
    title: "RodsHub",
    desc: "Dedicated to fishing rod sourcing, we provide ample stock for fast fulfillment and efficient logistics. From spinning to surf rods, our catalog meets global market demands with competitive B2B pricing and OEM support.",
    aboutLink: "About Us →",
    stats: [
      { title: "2000+ SKUs", subtitle: "Across 6 Categories" },
      { title: "6 Rod Categories", subtitle: "Spinning · Casting · Surf · Ice · Travel" },
      { title: "24h Response", subtitle: "Inquiry Reply Guarantee" },
    ],
  },
  es: {
    title: "RodsHub",
    desc: "Dedicados a la obtención de cañas de pesca, stock amplio, logística eficiente. De spinning a surf, nuestro catálogo satisface la demanda global con precios B2B competitivos y soporte OEM.",
    aboutLink: "Sobre nosotros →",
    stats: [
      { title: "2000+ SKU", subtitle: "En 6 categorías" },
      { title: "6 categorías", subtitle: "Spinning · Casting · Surf · Ice · Travel" },
      { title: "Respuesta 24h", subtitle: "Garantía de respuesta" },
    ],
  },
  fr: {
    title: "RodsHub",
    desc: "Dédié au sourcing de cannes à pêche, stock important, logistique efficace. Du spinning au surf, notre catalogue répond à la demande mondiale avec des prix B2B compétitifs et support OEM.",
    aboutLink: "À propos →",
    stats: [
      { title: "2000+ SKU", subtitle: "Dans 6 catégories" },
      { title: "6 catégories", subtitle: "Spinning · Casting · Surf · Ice · Travel" },
      { title: "Réponse 24h", subtitle: "Garantie de réponse" },
    ],
  },
  de: {
    title: "RodsHub",
    desc: "Spezialisiert auf Angelruten-Beschaffung. Großer Lagerbestand, effiziente Logistik. Von Spinning bis Surf—unser Katalog erfüllt globale Nachfrage mit wettbewerbsfähigen B2B-Preisen und OEM-Support.",
    aboutLink: "Über uns →",
    stats: [
      { title: "2000+ SKUs", subtitle: "In 6 Kategorien" },
      { title: "6 Rutentypen", subtitle: "Spinning · Casting · Surf · Ice · Travel" },
      { title: "24h Antwort", subtitle: "Anfrage-Garantie" },
    ],
  },
  ar: {
    title: "RodsHub",
    desc: "متخصصون في توريد قضبان الصيد. مخزون كبير، لوجستيات فعالة. من سبينينغ إلى سيرف، كتالوجنا يلبي الطلب العالمي مع أسعار B2B تنافسية ودعم OEM.",
    aboutLink: "من نحن →",
    stats: [
      { title: "2000+ وحدة", subtitle: "في 6 فئات" },
      { title: "6 فئات", subtitle: "سبينينغ · كاستينغ · سيرف · جليد · سفر" },
      { title: "رد 24 ساعة", subtitle: "ضمان الرد" },
    ],
  },
  ru: {
    title: "RodsHub",
    desc: "Специализация на закупке удилищ. Большие складские запасы, эффективная логистика. Каталог от спиннинга до серфа с конкурентными B2B ценами и OEM поддержкой.",
    aboutLink: "О нас →",
    stats: [
      { title: "2000+ SKU", subtitle: "В 6 категориях" },
      { title: "6 категорий", subtitle: "Спиннинг · Кастинг · Серф · Лед · Путешествия" },
      { title: "Ответ 24ч", subtitle: "Гарантия ответа" },
    ],
  },
  ja: {
    title: "RodsHub",
    desc: "釣り竿調達に特化。豊富な在庫、効率的な物流。スピニングからサーフまで、競争力あるB2B価格とOEMサポートでグローバル需要に対応。",
    aboutLink: "会社情報 →",
    stats: [
      { title: "2000+ SKU", subtitle: "6カテゴリー" },
      { title: "6カテゴリー", subtitle: "スピニング · キャスティング · サーフ · アイス · トラベル" },
      { title: "24時間返信", subtitle: "返信保証" },
    ],
  },
  ko: {
    title: "RodsHub",
    desc: "낚싯대 조달 전문. 풍부한 재고, 효율적인 물류. 스피닝부터 서프까지 경쟁력 있는 B2B 가격과 OEM 지원으로 글로벌 수요 충족.",
    aboutLink: "회사 소개 →",
    stats: [
      { title: "2000+ SKU", subtitle: "6개 카테고리" },
      { title: "6개 카테고리", subtitle: "스피닝 · 캐스팅 · 서프 · 아이스 · 트래블" },
      { title: "24시간 답변", subtitle: "답변 보장" },
    ],
  },
  pt: {
    title: "RodsHub",
    desc: "Dedicados ao fornecimento de varas de pesca. Estoque amplo, logística eficiente. Do spinning ao surf, nosso catálogo atende demanda global com preços B2B competitivos e suporte OEM.",
    aboutLink: "Sobre nós →",
    stats: [
      { title: "2000+ SKUs", subtitle: "Em 6 categorias" },
      { title: "6 categorias", subtitle: "Spinning · Casting · Surf · Ice · Travel" },
      { title: "Resposta 24h", subtitle: "Garantia de resposta" },
    ],
  },
};

export const oemCustomization: Record<
  LangCode,
  { title: string; subtitle: string; cta: string; steps: { title: string; desc: string }[] }
> = {
  en: {
    title: "OEM Fishing Rod Customization",
    subtitle: "Create your own fishing rod brand in 4 simple steps",
    cta: "Start OEM Inquiry",
    steps: [
      { title: "Submit Your Brief", desc: "Share your specs, target market & quantity" },
      { title: "Design & Sample", desc: "We create prototypes for your approval" },
      { title: "Production", desc: "Bulk manufacturing with QC at each stage" },
      { title: "Shipping", desc: "Global logistics with branded packaging" },
    ],
  },
  es: {
    title: "Personalización OEM de cañas",
    subtitle: "Cree su propia marca en 4 pasos",
    cta: "Iniciar consulta OEM",
    steps: [
      { title: "Envíe su brief", desc: "Comparta especificaciones, mercado y cantidad" },
      { title: "Diseño y muestra", desc: "Creamos prototipos para su aprobación" },
      { title: "Producción", desc: "Fabricación con control de calidad" },
      { title: "Envío", desc: "Logística global con packaging de marca" },
    ],
  },
  fr: {
    title: "Personnalisation OEM cannes",
    subtitle: "Créez votre marque en 4 étapes",
    cta: "Demande OEM",
    steps: [
      { title: "Envoyez votre brief", desc: "Spécifications, marché et quantité" },
      { title: "Design et échantillon", desc: "Prototypes pour votre approbation" },
      { title: "Production", desc: "Fabrication en série avec QC" },
      { title: "Expédition", desc: "Logistique mondiale, packaging de marque" },
    ],
  },
  de: {
    title: "OEM Angelruten-Anpassung",
    subtitle: "Eigene Angelruten-Marke in 4 Schritten",
    cta: "OEM-Anfrage starten",
    steps: [
      { title: "Brief einreichen", desc: "Spezifikationen, Zielmarkt und Menge" },
      { title: "Design & Muster", desc: "Prototypen für Ihre Freigabe" },
      { title: "Produktion", desc: "Serienfertigung mit QC" },
      { title: "Versand", desc: "Globale Logistik mit Markenverpackung" },
    ],
  },
  ar: {
    title: "تخصيص OEM للقضبان",
    subtitle: "أنشئ علامتك التجارية في 4 خطوات",
    cta: "بدء استفسار OEM",
    steps: [
      { title: "إرسال الملخص", desc: "المساحة والأسواق والكمية" },
      { title: "التصميم والعينة", desc: "نماذج لموافقتك" },
      { title: "الإنتاج", desc: "تصنيع بالجملة مع مراقبة الجودة" },
      { title: "الشحن", desc: "لوجستيات عالمية مع تغليف العلامة" },
    ],
  },
  ru: {
    title: "OEM кастомизация удилищ",
    subtitle: "Создайте свой бренд за 4 шага",
    cta: "OEM запрос",
    steps: [
      { title: "Отправьте brief", desc: "Спецификации, рынок и количество" },
      { title: "Дизайн и образец", desc: "Прототипы для утверждения" },
      { title: "Производство", desc: "Серийное производство с QC" },
      { title: "Доставка", desc: "Глобальная логистика с упаковкой" },
    ],
  },
  ja: {
    title: "OEMロッドカスタマイズ",
    subtitle: "4ステップで独自ブランドを",
    cta: "OEMお問い合わせ",
    steps: [
      { title: "ブリーフを提出", desc: "仕様、ターゲット市場、数量" },
      { title: "デザインとサンプル", desc: "承認用プロトタイプ作成" },
      { title: "生産", desc: "各段階でQC実施" },
      { title: "出荷", desc: "ブランドパッケージでグローバル物流" },
    ],
  },
  ko: {
    title: "OEM 로드 맞춤 제작",
    subtitle: "4단계로 자체 브랜드 만들기",
    cta: "OEM 문의하기",
    steps: [
      { title: "브리프 제출", desc: "사양, 타겟 시장, 수량" },
      { title: "디자인 및 샘플", desc: "승인용 프로토타입 제작" },
      { title: "생산", desc: "각 단계 QC 적용" },
      { title: "배송", desc: "브랜드 패키징으로 글로벌 물류" },
    ],
  },
  pt: {
    title: "Personalização OEM de varas",
    subtitle: "Crie sua marca em 4 passos",
    cta: "Iniciar consulta OEM",
    steps: [
      { title: "Envie seu brief", desc: "Especificações, mercado e quantidade" },
      { title: "Design e amostra", desc: "Protótipos para aprovação" },
      { title: "Produção", desc: "Fabricação em série com QC" },
      { title: "Envio", desc: "Logística global com embalagem de marca" },
    ],
  },
};

export const whyRodsHub: Record<
  LangCode,
  { title: string; block1Title: string; block1Desc: string; regions: string[]; block2Title: string; block2Desc: string; block3Title: string; block3Desc: string; cta: string }
> = {
  en: {
    title: "Why Choose RodsHub?",
    block1Title: "Global Logistics Integration",
    block1Desc: "Our supply chain spans key manufacturing regions. We offer strategic warehousing, rapid production cycles, and reliable shipping to North America, Europe, Asia, and Oceania. Export-ready packaging and documentation included.",
    regions: ["China", "USA", "EU", "Middle East", "Southeast Asia"],
    block2Title: "Precision Manufacturing",
    block2Desc: "Carbon, graphite & fiberglass blanks. Stringent QC. Spinning, casting, surf, telescopic & travel rods at scale.",
    block3Title: "OEM & Custom Design",
    block3Desc: "Custom specs, branding, packaging. Prototype in days. High standards for performance and aesthetics.",
    cta: "Start OEM Inquiry",
  },
  es: {
    title: "¿Por qué RodsHub?",
    block1Title: "Logística global",
    block1Desc: "Cadena de suministro en regiones clave. Almacenamiento estratégico, ciclos rápidos, envíos fiables a América del Norte, Europa, Asia y Oceanía.",
    regions: ["China", "USA", "UE", "Oriente Medio", "Sudeste Asiático"],
    block2Title: "Fabricación de precisión",
    block2Desc: "Blanks de carbono, grafito y fibra de vidrio. QC estricto. Spinning, casting, surf, telescópica y viaje a escala.",
    block3Title: "OEM y diseño personalizado",
    block3Desc: "Especificaciones, marca y packaging personalizados. Prototipos en días. Altos estándares de rendimiento y estética.",
    cta: "Iniciar consulta OEM",
  },
  fr: {
    title: "Pourquoi RodsHub ?",
    block1Title: "Logistique mondiale",
    block1Desc: "Chaîne d'approvisionnement dans les régions clés. Entrepôts stratégiques, cycles rapides, expédition fiable vers l'Amérique du Nord, l'Europe, l'Asie et l'Océanie.",
    regions: ["Chine", "USA", "UE", "Moyen-Orient", "Asie du Sud-Est"],
    block2Title: "Fabrication de précision",
    block2Desc: "Blanks carbone, graphite et fibre de verre. QC strict. Cannes spinning, casting, surf, télescopique et voyage à grande échelle.",
    block3Title: "OEM et design personnalisé",
    block3Desc: "Spécifications, marque et emballage sur mesure. Prototypes en quelques jours. Normes élevées de performance et d'esthétique.",
    cta: "Demande OEM",
  },
  de: {
    title: "Warum RodsHub?",
    block1Title: "Globale Logistik-Integration",
    block1Desc: "Lieferkette in Schlüsselregionen. Strategische Lagerhaltung, schnelle Produktionszyklen, zuverlässiger Versand nach Nordamerika, Europa, Asien und Ozeanien.",
    regions: ["China", "USA", "EU", "Naher Osten", "Südostasien"],
    block2Title: "Präzisionsfertigung",
    block2Desc: "Carbon-, Graphit- und Glasfaserblanks. Strenge QC. Spinning-, Casting-, Surf-, Teleskop- und Reiseruten in Serie.",
    block3Title: "OEM & Custom Design",
    block3Desc: "Individuelle Spezifikationen, Branding, Verpackung. Prototypen in Tagen. Hohe Standards für Leistung und Ästhetik.",
    cta: "OEM-Anfrage starten",
  },
  ar: {
    title: "لماذا RodsHub؟",
    block1Title: "تكامل لوجستي عالمي",
    block1Desc: "سلسلة إمداد في مناطق التصنيع الرئيسية. مستودعات استراتيجية، دورات إنتاج سريعة، شحن موثوق لأمريكا الشمالية وأوروبا وآسيا وأوقيانوسيا.",
    regions: ["الصين", "الولايات المتحدة", "الاتحاد الأوروبي", "الشرق الأوسط", "جنوب شرق آسيا"],
    block2Title: "تصنيع دقيق",
    block2Desc: "بلانكات كربون وجرافيت وألياف زجاجية. مراقبة جودة صارمة. سبينينغ، كاستينغ، سيرف، تلسكوبي وسفر على نطاق واسع.",
    block3Title: "OEM وتصميم مخصص",
    block3Desc: "مواصفات وعلامة تجارية وتغليف مخصص. نموذج أولي في أيام. معايير عالية للأداء والجمالية.",
    cta: "بدء استفسار OEM",
  },
  ru: {
    title: "Почему RodsHub?",
    block1Title: "Глобальная логистика",
    block1Desc: "Цепочка поставок в ключевых регионах. Стратегические склады, быстрые производственные циклы, надежная доставка в Северную Америку, Европу, Азию и Океанию.",
    regions: ["Китай", "США", "ЕС", "Ближний Восток", "Юго-Восточная Азия"],
    block2Title: "Точное производство",
    block2Desc: "Заготовки из углерода, графита и стекловолокна. Строгий QC. Спиннинг, кастинг, серф, телескоп и путешествия в масштабе.",
    block3Title: "OEM и кастомный дизайн",
    block3Desc: "Индивидуальные спецификации, брендинг, упаковка. Прототипы за дни. Высокие стандарты производительности и эстетики.",
    cta: "OEM запрос",
  },
  ja: {
    title: "なぜRodsHub？",
    block1Title: "グローバル物流",
    block1Desc: "主要製造地域にサプライチェーン。戦略的倉庫、迅速な生産サイクル、北米・欧州・アジア・オセアニアへの確実な配送。輸出対応パッケージと書類.",
    regions: ["中国", "米国", "EU", "中東", "東南アジア"],
    block2Title: "精密製造",
    block2Desc: "カーボン、グラファイト、グラスファイバーブランク。厳格なQC。スピニング、キャスティング、サーフ、テレスコピック、トラベルを量産.",
    block3Title: "OEM・カスタムデザイン",
    block3Desc: "カスタム仕様、ブランディング、パッケージング。数日でプロトタイプ。性能と美学の高基準.",
    cta: "OEMお問い合わせ",
  },
  ko: {
    title: "왜 RodsHub인가?",
    block1Title: "글로벌 물류 통합",
    block1Desc: "주요 제조 지역 공급망. 전략적 창고, 빠른 생산 주기, 북미·유럽·아시아·오세아니아로 안정적 배송. 수출용 패키징과 서류 포함.",
    regions: ["중국", "미국", "EU", "중동", "동남아시아"],
    block2Title: "정밀 제조",
    block2Desc: "카본, 그래파이트, 글라스파이버 블랭크. 엄격한 QC. 스피닝, 캐스팅, 서프, 텔레스코픽, 트래블 대량 생산.",
    block3Title: "OEM 및 커스텀 디자인",
    block3Desc: "맞춤 사양, 브랜딩, 패키징. 며칠 내 프로토타입. 성능과 미학의 높은 기준.",
    cta: "OEM 문의하기",
  },
  pt: {
    title: "Por que RodsHub?",
    block1Title: "Integração logística global",
    block1Desc: "Cadeia de suprimentos em regiões-chave. Armazenamento estratégico, ciclos rápidos, envio confiável para América do Norte, Europa, Ásia e Oceania.",
    regions: ["China", "EUA", "UE", "Oriente Médio", "Sudeste Asiático"],
    block2Title: "Fabricação de precisão",
    block2Desc: "Blanks de carbono, grafite e fibra de vidro. QC rigoroso. Spinning, casting, surf, telescópica e viagem em escala.",
    block3Title: "OEM e design personalizado",
    block3Desc: "Especificações, marca e embalagem personalizadas. Protótipos em dias. Altos padrões de desempenho e estética.",
    cta: "Iniciar consulta OEM",
  },
};

export const testimonials: Record<
  LangCode,
  { title: string; subtitle: string; shareLink: string; items: { quote: string; author: string; tags: string[] }[] }
> = {
  en: {
    title: "What Our Buyers Say",
    subtitle: "Thousands of wholesalers have grown their rod business with RodsHub",
    shareLink: "Start your success story →",
    items: [
      {
        quote: "First year partnering with RodsHub. Their catalog and OEM support helped us launch a private-label line. Reply within 24 hours every time. Highly recommend for B2B rod sourcing.",
        author: "Retail Partner, North America",
        tags: ["Sales +180%", "Margin +215%"],
      },
      {
        quote: "We needed a reliable supplier for surf and casting rods. RodsHub delivered on quality and lead time. Their packaging is export-ready, which saved us a lot of hassle.",
        author: "Wholesale Buyer, Europe",
        tags: ["Quality", "On-time"],
      },
      {
        quote: "OEM customization was smooth from prototype to production. Custom branding and specs handled professionally. Will definitely reorder.",
        author: "Brand Owner, Southeast Asia",
        tags: ["OEM", "Flexible"],
      },
      {
        quote: "Competitive prices and a wide range of rod types. We now source spinning, telescopic, and ice rods from one place. Logistics support is solid.",
        author: "Distributor, Middle East",
        tags: ["Value", "Variety"],
      },
      {
        quote: "The 2000+ SKU catalog and category filters made it easy to find exactly what we needed. Customer service is responsive and helpful.",
        author: "Retail Chain, Australia",
        tags: ["Catalog", "Service"],
      },
      {
        quote: "Travel rod section was exactly what we needed for our outdoor retailer chain. MOQ was reasonable and samples arrived quickly. Now we're expanding to more categories.",
        author: "Outdoor Retailer, UK",
        tags: ["Travel", "MOQ"],
      },
    ],
  },
  es: {
    title: "Lo que dicen nuestros compradores",
    subtitle: "Miles de mayoristas han crecido con RodsHub",
    shareLink: "Comience su historia de éxito →",
    items: [
      { quote: "Primer año con RodsHub. Catálogo y soporte OEM nos ayudaron a lanzar línea propia. Respuesta en 24h siempre. Muy recomendable.", author: "Socio minorista, Norteamérica", tags: ["Ventas +180%", "Margen +215%"] },
      { quote: "Proveedor fiable para surf y casting. Calidad y plazos cumplidos. Embalaje listo para exportar.", author: "Comprador mayorista, Europa", tags: ["Calidad", "A tiempo"] },
      { quote: "OEM fluido de prototipo a producción. Marca y especificaciones manejadas con profesionalidad. Reordenaremos.", author: "Propietario de marca, Sudeste Asiático", tags: ["OEM", "Flexible"] },
      { quote: "Precios competitivos y amplia variedad. Ahora surtimos spinning, telescópica e hielo de un solo lugar.", author: "Distribuidor, Oriente Medio", tags: ["Valor", "Variedad"] },
      { quote: "Catálogo 2000+ SKU y filtros facilitaron encontrar lo necesario. Atención al cliente ágil.", author: "Cadena minorista, Australia", tags: ["Catálogo", "Servicio"] },
      { quote: "La sección de cañas viaje fue justo lo que necesitábamos. MOQ razonable y muestras llegaron rápido. Ahora ampliamos a más categorías.", author: "Minorista outdoor, Reino Unido", tags: ["Viaje", "MOQ"] },
    ],
  },
  fr: {
    title: "Ce que disent nos acheteurs",
    subtitle: "Des milliers de grossistes ont grandi avec RodsHub",
    shareLink: "Commencez votre histoire de succès →",
    items: [
      { quote: "Première année avec RodsHub. Catalogue et support OEM pour lancer une ligne private label. Réponse 24h. Très recommandé.", author: "Partenaire détaillant, Amérique du Nord", tags: ["Ventes +180%", "Marge +215%"] },
      { quote: "Fournisseur fiable pour surf et casting. Qualité et délais tenus. Emballage export prêt.", author: "Acheteur gros, Europe", tags: ["Qualité", "À temps"] },
      { quote: "OEM fluide du prototype à la production. Marque et specs gérées professionnellement.", author: "Propriétaire de marque, Asie du Sud-Est", tags: ["OEM", "Flexible"] },
      { quote: "Prix compétitifs, large gamme. Nous sourçons spinning, télescopique et glace d'un seul endroit.", author: "Distributeur, Moyen-Orient", tags: ["Valeur", "Variété"] },
      { quote: "Catalogue 2000+ SKU et filtres ont facilité la recherche. Service client réactif.", author: "Chaîne détaillante, Australie", tags: ["Catalogue", "Service"] },
      { quote: "Section cannes voyage parfaite pour notre chaîne outdoor. MOQ raisonnable, échantillons rapides. On étend à d'autres catégories.", author: "Détaillant outdoor, Royaume-Uni", tags: ["Voyage", "MOQ"] },
    ],
  },
  de: {
    title: "Was unsere Käufer sagen",
    subtitle: "Tausende Großhändler sind mit RodsHub gewachsen",
    shareLink: "Starten Sie Ihre Erfolgsgeschichte →",
    items: [
      { quote: "Erstes Jahr mit RodsHub. Katalog und OEM-Support halfen uns, eine Eigenmarke zu starten. Antwort in 24h. Sehr empfehlenswert.", author: "Einzelhandelspartner, Nordamerika", tags: ["Umsatz +180%", "Marge +215%"] },
      { quote: "Zuverlässiger Lieferant für Surf- und Castingruten. Qualität und Lieferzeit erfüllt. Exportfertige Verpackung.", author: "Großhändler, Europa", tags: ["Qualität", "Pünktlich"] },
      { quote: "OEM-Anpassung reibungslos von Prototyp bis Produktion. Professionell umgesetzt.", author: "Markeninhaber, Südostasien", tags: ["OEM", "Flexibel"] },
      { quote: "Wettbewerbsfähige Preise, große Auswahl. Wir beziehen Spinning, Teleskop und Eis von einem Ort.", author: "Großhändler, Naher Osten", tags: ["Wert", "Vielfalt"] },
      { quote: "2000+ SKU-Katalog und Filter machten die Suche einfach. Kundenservice reaktiv.", author: "Einzelhandelskette, Australien", tags: ["Katalog", "Service"] },
      { quote: "Reiseruten-Sektion war genau was wir brauchten. MOQ vernünftig, Muster schnell da. Jetzt erweitern wir auf weitere Kategorien.", author: "Outdoor-Händler, UK", tags: ["Reise", "MOQ"] },
    ],
  },
  ar: {
    title: "ماذا يقول مشترونا",
    subtitle: "آلاف الجملة نموا مع RodsHub",
    shareLink: "ابدأ قصتك الناجحة →",
    items: [
      { quote: "السنة الأولى مع RodsHub. الكتالوج ودعم OEM ساعدانا على إطلاق خط خاص. رد في 24 ساعة. موصى به بشدة.", author: "شريك تجزئة، أمريكا الشمالية", tags: ["مبيعات +180%", "هامش +215%"] },
      { quote: "مورد موثوق لسيرف وكاستينغ. الجودة والمواعيد محققة. التغليف جاهز للتصدير.", author: "مشتري جملة، أوروبا", tags: ["جودة", "في الوقت"] },
      { quote: "تخصيص OEM سلس من النموذج إلى الإنتاج. العلامة والمواصفات معالجة باحترافية.", author: "مالك علامة، جنوب شرق آسيا", tags: ["OEM", "مرن"] },
      { quote: "أسعار تنافسية ومجموعة واسعة. نورد سبينينغ وتلسكوبي وجليد من مكان واحد.", author: "موزع، الشرق الأوسط", tags: ["قيمة", "تنوع"] },
      { quote: "كتالوج 2000+ وحدة والفلاتر سهّلت العثور على ما نحتاج. خدمة عملاء مستجيبة.", author: "سلسلة تجزئة، أستراليا", tags: ["كتالوج", "خدمة"] },
      { quote: "قسم القضبان السفرية كان ما نحتاجه بالضبط. MOQ معقول والعينات وصلت سريعاً. نوسع الآن لفئات أخرى.", author: "تاجر تجزئة للهواء الطلق، المملكة المتحدة", tags: ["سفر", "MOQ"] },
    ],
  },
  ru: {
    title: "Отзывы наших покупателей",
    subtitle: "Тысячи оптовиков выросли с RodsHub",
    shareLink: "Начните вашу историю успеха →",
    items: [
      { quote: "Первый год с RodsHub. Каталог и OEM-поддержка помогли запустить private-label. Ответ за 24ч. Рекомендую.", author: "Розничный партнер, Северная Америка", tags: ["Продажи +180%", "Маржа +215%"] },
      { quote: "Надежный поставщик серфовых и кастинговых удилищ. Качество и сроки соблюдены. Упаковка готова к экспорту.", author: "Оптовый покупатель, Европа", tags: ["Качество", "В срок"] },
      { quote: "OEM от прототипа до производства прошло гладко. Брендинг и спецификации на высоком уровне.", author: "Владелец бренда, Юго-Восточная Азия", tags: ["OEM", "Гибкость"] },
      { quote: "Конкурентные цены, широкий ассортимент. Закупаем спиннинг, телескоп и лед в одном месте.", author: "Дистрибьютор, Ближний Восток", tags: ["Ценность", "Разнообразие"] },
      { quote: "Каталог 2000+ SKU и фильтры упростили поиск. Служба поддержки отзывчива.", author: "Розничная сеть, Австралия", tags: ["Каталог", "Сервис"] },
      { quote: "トラベルロッド部門が私たちのアウトドア小売チェーンにぴったり。MOQ妥当、サンプル迅速到着。他カテゴリへ拡大中。", author: "アウトドア小売、英国", tags: ["トラベル", "MOQ"] },
    ],
  },
  ja: {
    title: "バイヤーの声",
    subtitle: "多くの卸業者がRodsHubと成長",
    shareLink: "成功の物語を始めましょう →",
    items: [
      { quote: "RodsHubと1年目。カタログとOEMサポートでプライベートブランドを立ち上げ。24時間以内返信。強く推奨。", author: "小売パートナー、北米", tags: ["売上+180%", "利益率+215%"] },
      { quote: "サーフ・キャスティングの信頼できるサプライヤー。品質と納期を達成。輸出対応パッケージ。", author: "卸買い手、欧州", tags: ["品質", "納期遵守"] },
      { quote: "OEMはプロトタイプから生産までスムーズ。ブランディングと仕様をプロ仕様で。再注文予定。", author: "ブランドオーナー、東南アジア", tags: ["OEM", "柔軟"] },
      { quote: "競争力ある価格、幅広いロッド種。スピニング、テレスコピック、アイスを一括調達。", author: "卸販社、中東", tags: ["価値", "品揃え"] },
      { quote: "2000+SKUカタログとフィルターで必要なものがすぐ見つかる。カスタマーサービスは迅速。", author: "小売チェーン、オーストラリア", tags: ["カタログ", "サービス"] },
      { quote: "トラベルロッド部門が私たちのアウトドア小売チェーンにぴったり。MOQ妥当、サンプル迅速到着。他カテゴリへ拡大中。", author: "アウトドア小売、英国", tags: ["トラベル", "MOQ"] },
    ],
  },
  ko: {
    title: "바이어들의 후기",
    subtitle: "수천 명의 도매상이 RodsHub와 함께 성장",
    shareLink: "성공 스토리 시작하기 →",
    items: [
      { quote: "RodsHub와 첫 해. 카탈로그와 OEM 지원으로 프라이빗 라벨 런칭. 24시간 내 답변. 강력 추천.", author: "소매 파트너, 북미", tags: ["매출 +180%", "마진 +215%"] },
      { quote: "서프·캐스팅 신뢰할 수 있는 공급업체. 품질과 납기 준수. 수출용 패키징.", author: "도매 구매자, 유럽", tags: ["품질", "정시"] },
      { quote: "OEM 프로토타입부터 생산까지 원활. 브랜딩과 사양 전문 처리. 재주문 예정.", author: "브랜드 오너, 동남아", tags: ["OEM", "유연"] },
      { quote: "경쟁력 있는 가격, 다양한 로드 타입. 스피닝, 텔레스코픽, 아이스를 한 곳에서.", author: "유통사, 중동", tags: ["가치", "다양성"] },
      { quote: "2000+ SKU 카탈로그와 필터로 필요 제품 쉽게 발견. 고객 서비스 반응 좋음.", author: "소매 체인, 호주", tags: ["카탈로그", "서비스"] },
      { quote: "트래블 로드 섹션이 아웃도어 소매 체인에 딱 맞았습니다. MOQ 합리적, 샘플 빠르게 도착. 이제 더 많은 카테고리로 확장 중.", author: "아웃도어 소매, 영국", tags: ["트래블", "MOQ"] },
    ],
  },
  pt: {
    title: "O que nossos compradores dizem",
    subtitle: "Milhares de atacadistas cresceram com RodsHub",
    shareLink: "Comece sua história de sucesso →",
    items: [
      { quote: "Primeiro ano com RodsHub. Catálogo e suporte OEM ajudaram a lançar linha própria. Resposta em 24h. Muito recomendado.", author: "Parceiro varejista, América do Norte", tags: ["Vendas +180%", "Margem +215%"] },
      { quote: "Fornecedor confiável para surf e casting. Qualidade e prazo cumpridos. Embalagem pronta para exportação.", author: "Comprador atacado, Europa", tags: ["Qualidade", "No prazo"] },
      { quote: "OEM fluido do protótipo à produção. Marca e especificações tratadas com profissionalismo.", author: "Proprietário de marca, Sudeste Asiático", tags: ["OEM", "Flexível"] },
      { quote: "Preços competitivos, ampla variedade. Agora adquirimos spinning, telescópica e gelo de um só lugar.", author: "Distribuidor, Oriente Médio", tags: ["Valor", "Variedade"] },
      { quote: "Catálogo 2000+ SKU e filtros facilitaram encontrar o necessário. Atendimento ágil.", author: "Rede varejista, Austrália", tags: ["Catálogo", "Serviço"] },
      { quote: "Seção de varas de viagem foi exatamente o que precisávamos. MOQ razoável, amostras chegaram rápido. Agora expandindo para mais categorias.", author: "Varejista outdoor, Reino Unido", tags: ["Viagem", "MOQ"] },
    ],
  },
};

export const inquiryForm: Record<
  LangCode,
  {
    title: string;
    subtitle: string;
    replyNote: string;
    successTitle: string;
    successDesc: string;
    chooseMethod: string;
    openEmailBtn: string;
    copyContent: string;
    copied: string;
    emailDirectlyTo: string;
    labels: { name: string; email: string; company: string; country: string; product: string; message: string };
    placeholders: { name: string; email: string; company: string; country: string; product: string; message: string };
    submitBtn: string;
  }
> = {
  en: {
    title: "Quick Inquiry",
    subtitle: "Tell us what you need.",
    replyNote: "We will reply within 24 hours.",
    successTitle: "Ready to Send",
    successDesc: "Choose one option below to send your inquiry.",
    chooseMethod: "Choose one option to send:",
    openEmailBtn: "Open Email Client",
    copyContent: "Copy Content",
    copied: "Copied!",
    emailDirectlyTo: "Or email directly to",
    labels: { name: "Your Name", email: "Email", company: "Company", country: "Country", product: "Product Interested", message: "Your Message" },
    placeholders: { name: "John Smith", email: "john@company.com", company: "Your Company", country: "e.g. United States", product: "e.g. Spinning Rods, OEM Customization", message: "Product models, quantity, customization needs..." },
    submitBtn: "Send Inquiry",
  },
  es: {
    title: "Consulta rápida",
    subtitle: "Díganos qué necesita.",
    replyNote: "Respondemos en 24 horas.",
    successTitle: "Listo para enviar",
    successDesc: "Elija una opción para enviar su consulta.",
    chooseMethod: "Elija una opción para enviar:",
    openEmailBtn: "Abrir cliente de correo",
    copyContent: "Copiar contenido",
    copied: "¡Copiado!",
    emailDirectlyTo: "O envíe directamente a",
    labels: { name: "Nombre", email: "Email", company: "Empresa", country: "País", product: "Producto de interés", message: "Mensaje" },
    placeholders: { name: "Juan García", email: "juan@empresa.com", company: "Su empresa", country: "ej. España", product: "ej. Cañas spinning, OEM", message: "Modelos, cantidad, necesidades..." },
    submitBtn: "Enviar consulta",
  },
  fr: {
    title: "Demande rapide",
    subtitle: "Dites-nous ce dont vous avez besoin.",
    replyNote: "Réponse sous 24 h.",
    successTitle: "Prêt à envoyer",
    successDesc: "Choisissez une option pour envoyer votre demande.",
    chooseMethod: "Choisissez une option pour envoyer :",
    openEmailBtn: "Ouvrir le client mail",
    copyContent: "Copier le contenu",
    copied: "Copié !",
    emailDirectlyTo: "Ou envoyez directement à",
    labels: { name: "Nom", email: "Email", company: "Entreprise", country: "Pays", product: "Produit concerné", message: "Message" },
    placeholders: { name: "Jean Dupont", email: "jean@entreprise.com", company: "Votre entreprise", country: "ex. France", product: "ex. Cannes spinning, OEM", message: "Modèles, quantité, besoins..." },
    submitBtn: "Envoyer demande",
  },
  de: {
    title: "Schnellanfrage",
    subtitle: "Teilen Sie uns mit, was Sie brauchen.",
    replyNote: "Wir antworten innerhalb von 24 Stunden.",
    successTitle: "Bereit zum Senden",
    successDesc: "Wählen Sie eine Option zum Senden Ihrer Anfrage.",
    chooseMethod: "Wählen Sie eine Option zum Senden:",
    openEmailBtn: "E-Mail-Programm öffnen",
    copyContent: "Inhalt kopieren",
    copied: "Kopiert!",
    emailDirectlyTo: "Oder direkt an",
    labels: { name: "Name", email: "E-Mail", company: "Unternehmen", country: "Land", product: "Interessiertes Produkt", message: "Nachricht" },
    placeholders: { name: "Max Mustermann", email: "max@firma.de", company: "Ihr Unternehmen", country: "z.B. Deutschland", product: "z.B. Spinnruten, OEM", message: "Modelle, Menge, Anforderungen..." },
    submitBtn: "Anfrage senden",
  },
  ar: {
    title: "استفسار سريع",
    subtitle: "أخبرنا بما تحتاج.",
    replyNote: "نرد خلال 24 ساعة.",
    successTitle: "جاهز للإرسال",
    successDesc: "اختر خياراً لإرسال استفسارك.",
    chooseMethod: "اختر خياراً للإرسال:",
    openEmailBtn: "فتح بريد الإلكتروني",
    copyContent: "نسخ المحتوى",
    copied: "تم النسخ!",
    emailDirectlyTo: "أو أرسل مباشرة إلى",
    labels: { name: "الاسم", email: "البريد", company: "الشركة", country: "البلد", product: "المنتج المهتم", message: "الرسالة" },
    placeholders: { name: "أحمد", email: "ahmad@company.com", company: "شركتك", country: "مثلاً الولايات المتحدة", product: "مثلاً قضبان سبينينغ، OEM", message: "الموديلات والكمية والاحتياجات..." },
    submitBtn: "إرسال الاستفسار",
  },
  ru: {
    title: "Быстрый запрос",
    subtitle: "Расскажите, что вам нужно.",
    replyNote: "Ответим в течение 24 часов.",
    successTitle: "Готово к отправке",
    successDesc: "Выберите способ отправки запроса.",
    chooseMethod: "Выберите способ отправки:",
    openEmailBtn: "Открыть почту",
    copyContent: "Копировать",
    copied: "Скопировано!",
    emailDirectlyTo: "Или отправьте на",
    labels: { name: "Имя", email: "Email", company: "Компания", country: "Страна", product: "Интересующий товар", message: "Сообщение" },
    placeholders: { name: "Иван Иванов", email: "ivan@company.com", company: "Ваша компания", country: "напр. Россия", product: "напр. Спиннинги, OEM", message: "Модели, количество, потребности..." },
    submitBtn: "Отправить запрос",
  },
  ja: {
    title: "お問い合わせ",
    subtitle: "ご要望をお聞かせください。",
    replyNote: "24時間以内に返信します。",
    successTitle: "送信の準備ができました",
    successDesc: "以下のいずれかを選択してお送りください。",
    chooseMethod: "送信方法を選択：",
    openEmailBtn: "メールを開く",
    copyContent: "内容をコピー",
    copied: "コピーしました！",
    emailDirectlyTo: "または直接送信:",
    labels: { name: "お名前", email: "メール", company: "会社名", country: "国", product: "ご興味のある製品", message: "メッセージ" },
    placeholders: { name: "山田 太郎", email: "yamada@company.jp", company: "会社名", country: "例：日本", product: "例：スピニングロッド、OEM", message: "モデル、数量、カスタマイズのご要望..." },
    submitBtn: "送信",
  },
  ko: {
    title: "빠른 문의",
    subtitle: "필요하신 내용을 알려주세요.",
    replyNote: "24시간 내에 답변드립니다.",
    successTitle: "전송 준비 완료",
    successDesc: "아래 옵션 중 하나를 선택해 문의를 보내세요.",
    chooseMethod: "전송 방법 선택:",
    openEmailBtn: "이메일 열기",
    copyContent: "내용 복사",
    copied: "복사됨!",
    emailDirectlyTo: "또는 직접 이메일:",
    labels: { name: "이름", email: "이메일", company: "회사명", country: "국가", product: "관심 제품", message: "메시지" },
    placeholders: { name: "홍길동", email: "hong@company.com", company: "회사명", country: "예: 대한민국", product: "예: 스피닝로드, OEM", message: "모델, 수량, 맞춤 요구사항..." },
    submitBtn: "문의 보내기",
  },
  pt: {
    title: "Consulta rápida",
    subtitle: "Diga-nos o que precisa.",
    replyNote: "Respondemos em 24 horas.",
    successTitle: "Pronto para enviar",
    successDesc: "Escolha uma opção para enviar sua consulta.",
    chooseMethod: "Escolha uma opção para enviar:",
    openEmailBtn: "Abrir cliente de e-mail",
    copyContent: "Copiar conteúdo",
    copied: "Copiado!",
    emailDirectlyTo: "Ou envie diretamente para",
    labels: { name: "Nome", email: "Email", company: "Empresa", country: "País", product: "Produto de interesse", message: "Mensagem" },
    placeholders: { name: "João Silva", email: "joao@empresa.com", company: "Sua empresa", country: "ex. Brasil", product: "ex. Varas spinning, OEM", message: "Modelos, quantidade, necessidades..." },
    submitBtn: "Enviar consulta",
  },
};

/** Category display names by slug - used on category page header */
export const categoryNames: Record<string, Record<LangCode, string>> = {
  spinning: {
    en: "Spinning Rods", es: "Cañas Spinning", fr: "Cannes Spinning", de: "Spinnruten", ar: "قضبان السبينينغ", ru: "Спиннинговые удилища", ja: "スピニングロッド", ko: "스피닝 로드", pt: "Varas Spinning",
  },
  casting: {
    en: "Casting Rods", es: "Cañas Casting", fr: "Cannes Casting", de: "Wurfruten", ar: "قضبان الكاستينغ", ru: "Кастинговые удилища", ja: "キャスティングロッド", ko: "캐스팅 로드", pt: "Varas Casting",
  },
  telescopic: {
    en: "Telescopic Rods", es: "Cañas telescópicas", fr: "Cannes télescopiques", de: "Teleskopruten", ar: "قضبان تلسكوبية", ru: "Телескопические удилища", ja: "テレスコピックロッド", ko: "텔레스코픽 로드", pt: "Varas telescópicas",
  },
  surf: {
    en: "Surf Rods", es: "Cañas Surf", fr: "Cannes Surf", de: "Surfruten", ar: "قضبان السيرف", ru: "Серфовые удилища", ja: "サーフロッド", ko: "서프 로드", pt: "Varas Surf",
  },
  ice: {
    en: "Ice Fishing Rods", es: "Cañas pesca en hielo", fr: "Cannes pêche sur glace", de: "Eisangelruten", ar: "قضبان صيد الجليد", ru: "Удилища для зимней рыбалки", ja: "アイスフィッシングロッド", ko: "빙어낚시 로드", pt: "Varas pesca no gelo",
  },
  travel: {
    en: "Travel Rods", es: "Cañas viaje", fr: "Cannes voyage", de: "Reiseruten", ar: "قضبان السفر", ru: "Путешественные удилища", ja: "トラベルロッド", ko: "트래블 로드", pt: "Varas viagem",
  },
};
