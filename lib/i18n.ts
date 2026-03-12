/** UN official working languages */
export const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "zh", name: "简体中文" },
  { code: "es", name: "Español" },
  { code: "fr", name: "Français" },
  { code: "ar", name: "العربية" },
  { code: "ru", name: "Русский" },
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
  home: { en: "Home", zh: "首页", es: "Inicio", fr: "Accueil", ar: "الرئيسية", ru: "Главная" },
  categories: { en: "Categories", zh: "分类", es: "Categorías", fr: "Catégories", ar: "الفئات", ru: "Категории" },
  scenarios: { en: "Scenarios", zh: "场景", es: "Escenarios", fr: "Scénarios", ar: "السيناريوهات", ru: "Сценарии" },
  trending: { en: "Trending", zh: "热卖", es: "Tendencias", fr: "Tendances", ar: "رائج", ru: "Популярное" },
  wholesale: { en: "Wholesale", zh: "批发", es: "Mayorista", fr: "Gros", ar: "الجملة", ru: "Оптом" },
  insights: { en: "Insights", zh: "资讯", es: "Información", fr: "Actualités", ar: "رؤى", ru: "Статьи" },
  inquiry: { en: "Inquiry", zh: "询价", es: "Consulta", fr: "Demande", ar: "استفسار", ru: "Запрос" },
  sendInquiry: { en: "Send Inquiry", zh: "发送询价", es: "Enviar consulta", fr: "Envoyer demande", ar: "إرسال استفسار", ru: "Отправить запрос" },
  browseRods: { en: "Browse Rods", zh: "浏览渔竿", es: "Ver cañas", fr: "Parcourir", ar: "تصفح القضبان", ru: "Смотреть удилища" },
  all: { en: "All", zh: "全部", es: "Todo", fr: "Tous", ar: "الكل", ru: "Все" },
  searchPlaceholder: { en: "Search rods...", zh: "搜索渔竿...", es: "Buscar cañas...", fr: "Rechercher...", ar: "بحث القضبان...", ru: "Поиск удилищ..." },
  search: { en: "Search", zh: "搜索", es: "Buscar", fr: "Rechercher", ar: "بحث", ru: "Поиск" },
  sections: { en: "Sections", zh: "板块", es: "Secciones", fr: "Sections", ar: "الأقسام", ru: "Разделы" },
  rods: { en: "Rods", zh: "渔竿", es: "cañas", fr: "cannes", ar: "قضبان", ru: "удилища" },
  // Category names
  catSpinning: { en: "Spinning", zh: "纺车", es: "Spinning", fr: "Spinning", ar: "سبينينغ", ru: "Спиннинг" },
  catCasting: { en: "Casting", zh: "抛竿", es: "Casting", fr: "Casting", ar: "كاستينغ", ru: "Кастинг" },
  catTelescopic: { en: "Telescopic", zh: "伸缩", es: "Telescópica", fr: "Télescopique", ar: "قابلة للتمديد", ru: "Телескопическая" },
  catSurf: { en: "Surf", zh: "滩钓", es: "Surf", fr: "Surf", ar: "سيرف", ru: "Серф" },
  catIceFishing: { en: "Ice Fishing", zh: "冰钓", es: "Pesca en hielo", fr: "Pêche sur glace", ar: "صيد الجليد", ru: "Зимняя рыбалка" },
  catTravel: { en: "Travel", zh: "旅行", es: "Viaje", fr: "Voyage", ar: "السفر", ru: "Путешествие" },
  // Scenario names
  scenFreshwater: { en: "Freshwater", zh: "淡水", es: "Agua dulce", fr: "Eau douce", ar: "المياه العذبة", ru: "Пресная вода" },
  scenSaltwater: { en: "Saltwater", zh: "海水", es: "Agua salada", fr: "Eau salée", ar: "المياه المالحة", ru: "Морская вода" },
  scenSurf: { en: "Surf", zh: "滩钓", es: "Surf", fr: "Surf", ar: "سيرف", ru: "Серф" },
  scenBoat: { en: "Boat", zh: "船钓", es: "Bote", fr: "Bateau", ar: "القارب", ru: "Лодка" },
  scenIce: { en: "Ice", zh: "冰钓", es: "Hielo", fr: "Glace", ar: "الجليد", ru: "Лёд" },
  // Footer
  footerTagline: { en: "The global B2B marketplace for fishing rod sourcing.", zh: "全球渔竿B2B采购平台。", es: "El marketplace B2B global de cañas de pesca.", fr: "La place de marché B2B mondiale pour les cannes à pêche.", ar: "سوق B2B العالمي لمصادر قضبان الصيد.", ru: "Глобальная B2B площадка по закупке рыболовных удилищ." },
  contactUs: { en: "Contact Us", zh: "联系我们", es: "Contáctenos", fr: "Contactez-nous", ar: "اتصل بنا", ru: "Связаться с нами" },
  company: { en: "Company", zh: "公司", es: "Empresa", fr: "Entreprise", ar: "الشركة", ru: "О компании" },
  aboutUs: { en: "About Us", zh: "关于我们", es: "Sobre nosotros", fr: "À propos", ar: "من نحن", ru: "О нас" },
  contact: { en: "Contact", zh: "联系", es: "Contacto", fr: "Contact", ar: "اتصال", ru: "Контакты" },
  legal: { en: "Legal", zh: "法律", es: "Legal", fr: "Mentions légales", ar: "قانوني", ru: "Правовая информация" },
  privacyPolicy: { en: "Privacy Policy", zh: "隐私政策", es: "Política de privacidad", fr: "Politique de confidentialité", ar: "سياسة الخصوصية", ru: "Политика конфиденциальности" },
  faq: { en: "FAQ", zh: "常见问题", es: "FAQ", fr: "FAQ", ar: "الأسئلة الشائعة", ru: "Часто задаваемые вопросы" },
  allRightsReserved: { en: "All rights reserved.", zh: "版权所有。", es: "Todos los derechos reservados.", fr: "Tous droits réservés.", ar: "جميع الحقوق محفوظة.", ru: "Все права защищены." },
};

export function t(key: keyof typeof T, lang: LangCode): string {
  return T[key]?.[lang] ?? T[key]?.en ?? key;
}
