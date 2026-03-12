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
};

export function t(key: keyof typeof T, lang: LangCode): string {
  return T[key]?.[lang] ?? T[key]?.en ?? key;
}
