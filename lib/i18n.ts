/** UN official working languages (excl. Chinese) */
export const LANGUAGES = [
  { code: "en", name: "English" },
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
  home: { en: "Home", es: "Inicio", fr: "Accueil", ar: "الرئيسية", ru: "Главная" },
  categories: { en: "Categories", es: "Categorías", fr: "Catégories", ar: "الفئات", ru: "Категории" },
  scenarios: { en: "Scenarios", es: "Escenarios", fr: "Scénarios", ar: "السيناريوهات", ru: "Сценарии" },
  trending: { en: "Trending", es: "Tendencias", fr: "Tendances", ar: "رائج", ru: "Популярное" },
  wholesale: { en: "Wholesale", es: "Mayorista", fr: "Gros", ar: "الجملة", ru: "Оптом" },
  insights: { en: "Insights", es: "Información", fr: "Actualités", ar: "رؤى", ru: "Статьи" },
  inquiry: { en: "Inquiry", es: "Consulta", fr: "Demande", ar: "استفسار", ru: "Запрос" },
  sendInquiry: { en: "Send Inquiry", es: "Enviar consulta", fr: "Envoyer demande", ar: "إرسال استفسار", ru: "Отправить запрос" },
  browseRods: { en: "Browse Rods", es: "Ver cañas", fr: "Parcourir", ar: "تصفح القضبان", ru: "Смотреть удилища" },
  all: { en: "All", es: "Todo", fr: "Tous", ar: "الكل", ru: "Все" },
  searchPlaceholder: { en: "Search rods...", es: "Buscar cañas...", fr: "Rechercher...", ar: "بحث القضبان...", ru: "Поиск удилищ..." },
  search: { en: "Search", es: "Buscar", fr: "Rechercher", ar: "بحث", ru: "Поиск" },
  sections: { en: "Sections", es: "Secciones", fr: "Sections", ar: "الأقسام", ru: "Разделы" },
  rods: { en: "Rods", es: "cañas", fr: "cannes", ar: "قضبان", ru: "удилища" },
  catSpinning: { en: "Spinning", es: "Spinning", fr: "Spinning", ar: "سبينينغ", ru: "Спиннинг" },
  catCasting: { en: "Casting", es: "Casting", fr: "Casting", ar: "كاستينغ", ru: "Кастинг" },
  catTelescopic: { en: "Telescopic", es: "Telescópica", fr: "Télescopique", ar: "قابلة للتمديد", ru: "Телескопическая" },
  catSurf: { en: "Surf", es: "Surf", fr: "Surf", ar: "سيرف", ru: "Серф" },
  catIceFishing: { en: "Ice Fishing", es: "Pesca en hielo", fr: "Pêche sur glace", ar: "صيد الجليد", ru: "Зимняя рыбалка" },
  catTravel: { en: "Travel", es: "Viaje", fr: "Voyage", ar: "السفر", ru: "Путешествие" },
  scenFreshwater: { en: "Freshwater", es: "Agua dulce", fr: "Eau douce", ar: "المياه العذبة", ru: "Пресная вода" },
  scenSaltwater: { en: "Saltwater", es: "Agua salada", fr: "Eau salée", ar: "المياه المالحة", ru: "Морская вода" },
  scenSurf: { en: "Surf", es: "Surf", fr: "Surf", ar: "سيرف", ru: "Серф" },
  scenBoat: { en: "Boat", es: "Bote", fr: "Bateau", ar: "القارب", ru: "Лодка" },
  scenIce: { en: "Ice", es: "Hielo", fr: "Glace", ar: "الجليد", ru: "Лёд" },
  footerTagline: { en: "The global B2B marketplace for fishing rod sourcing.", es: "El marketplace B2B global de cañas de pesca.", fr: "La place de marché B2B mondiale pour les cannes à pêche.", ar: "سوق B2B العالمي لمصادر قضبان الصيد.", ru: "Глобальная B2B площадка по закупке рыболовных удилищ." },
  contactUs: { en: "Contact Us", es: "Contáctenos", fr: "Contactez-nous", ar: "اتصل بنا", ru: "Связаться с нами" },
  company: { en: "Company", es: "Empresa", fr: "Entreprise", ar: "الشركة", ru: "О компании" },
  aboutUs: { en: "About Us", es: "Sobre nosotros", fr: "À propos", ar: "من نحن", ru: "О нас" },
  contact: { en: "Contact", es: "Contacto", fr: "Contact", ar: "اتصال", ru: "Контакты" },
  legal: { en: "Legal", es: "Legal", fr: "Mentions légales", ar: "قانوني", ru: "Правовая информация" },
  privacyPolicy: { en: "Privacy Policy", es: "Política de privacidad", fr: "Politique de confidentialité", ar: "سياسة الخصوصية", ru: "Политика конфиденциальности" },
  faq: { en: "FAQ", es: "FAQ", fr: "FAQ", ar: "الأسئلة الشائعة", ru: "Часто задаваемые вопросы" },
  allRightsReserved: { en: "All rights reserved.", es: "Todos los derechos reservados.", fr: "Tous droits réservés.", ar: "جميع الحقوق محفوظة.", ru: "Все права защищены." },
};

export function t(key: keyof typeof T, lang: LangCode): string {
  return T[key]?.[lang] ?? T[key]?.en ?? key;
}
