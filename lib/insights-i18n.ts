/**
 * Insights multi-language support.
 * Section/block titles & descriptions for all 9 langs; block content for de/ja/ko/pt.
 * Falls back to English when translation unavailable.
 */
import type { LangCode } from "./i18n";
import type { InsightBlock, InsightContentItem, InsightSection } from "./insights";
import { INSIGHT_SECTIONS, INSIGHT_BLOCKS, getInsightBySlug } from "./insights";

/** Section meta (title, description) by lang */
const SECTION_META: Record<string, Record<LangCode, { title: string; description: string }>> = {
  "rod-guides": {
    en: { title: "Fishing Rod Guides", description: "Essential knowledge about rod types, materials, power & action." },
    es: { title: "Guías de cañas", description: "Conocimientos esenciales sobre tipos, materiales, potencia y acción." },
    fr: { title: "Guides de cannes", description: "Connaissances essentielles sur les types, matériaux, puissance et action." },
    de: { title: "Angelruten-Ratgeber", description: "Grundwissen zu Rutenarten, Materialien, Power und Action." },
    ar: { title: "دلائل قضبان الصيد", description: "معرفة أساسية عن الأنواع والمواد والقوة والحركة." },
    ru: { title: "Руководства по удилищам", description: "Основы о типах, материалах, мощности и строе." },
    ja: { title: "ロッドガイド", description: "ロッドタイプ、材質、パワー、アクションの基本知識。" },
    ko: { title: "로드 가이드", description: "로드 타입, 재질, 파워, 액션에 대한 필수 지식." },
    pt: { title: "Guias de varas", description: "Conhecimento essencial sobre tipos, materiais, potência e ação." },
  },
  techniques: {
    en: { title: "Techniques", description: "Rod selection for specific fishing techniques and species." },
    es: { title: "Técnicas", description: "Selección de cañas para técnicas y especies específicas." },
    fr: { title: "Techniques", description: "Choix de cannes pour techniques et espèces spécifiques." },
    de: { title: "Techniken", description: "Rutenauswahl für Angeltechniken und Zielfischarten." },
    ar: { title: "التقنيات", description: "اختيار القضبان للتقنيات والأنواع المحددة." },
    ru: { title: "Техники", description: "Выбор удилищ для техник и видов рыб." },
    ja: { title: "テクニック", description: "テクニックと魚種に合わせたロッド選び。" },
    ko: { title: "테크닉", description: "특정 낚시 기술과 대상에 맞는 로드 선택." },
    pt: { title: "Técnicas", description: "Seleção de varas para técnicas e espécies específicas." },
  },
  "product-knowledge": {
    en: { title: "Product Knowledge", description: "Construction, components, maintenance, and buying tips." },
    es: { title: "Conocimiento del producto", description: "Construcción, componentes, mantenimiento y consejos." },
    fr: { title: "Connaissance produit", description: "Construction, composants, entretien et conseils." },
    de: { title: "Produktwissen", description: "Konstruktion, Komponenten, Pflege und Kaufberatung." },
    ar: { title: "معرفة المنتج", description: "البناء والمكونات والصيانة ونصائح الشراء." },
    ru: { title: "Знание продукта", description: "Конструкция, компоненты, уход и советы." },
    ja: { title: "製品知識", description: "構造、構成部品、メンテナンス、購入のヒント。" },
    ko: { title: "제품 지식", description: "구조, 부품, 관리 및 구매 팁." },
    pt: { title: "Conhecimento do produto", description: "Construção, componentes, manutenção e dicas." },
  },
  "community-favorites": {
    en: { title: "Community Favorites", description: "Popular topics and discussions from angling communities." },
    es: { title: "Favoritos de la comunidad", description: "Temas populares y debates de la comunidad." },
    fr: { title: "Favoris communauté", description: "Sujets populaires et discussions." },
    de: { title: "Community-Favoriten", description: "Beliebte Themen aus Anglergemeinschaften." },
    ar: { title: "مفضلات المجتمع", description: "مواضيع ومناقشات شائعة من مجتمعات الصيد." },
    ru: { title: "Избранное сообщества", description: "Популярные темы и обсуждения." },
    ja: { title: "コミュニティおすすめ", description: "アングラーコミュニティの人気トピック。" },
    ko: { title: "커뮤니티 인기", description: "낚시 커뮤니티 인기 주제와 논의." },
    pt: { title: "Favoritos da comunidade", description: "Tópicos e discussões populares." },
  },
  "sourcing-industry": {
    en: { title: "Sourcing & Industry", description: "B2B sourcing, manufacturing, MOQ, and market insights." },
    es: { title: "Proveedores e industria", description: "Abastecimiento B2B, fabricación, MOQ e información." },
    fr: { title: "Approvisionnement et industrie", description: "Sourcing B2B, fabrication, MOQ et insights." },
    de: { title: "Beschaffung & Branche", description: "B2B-Beschaffung, Fertigung, MOQ und Marktinsights." },
    ar: { title: "التوريد والصناعة", description: "التوريد B2B والتصنيع وMOQ ورؤى السوق." },
    ru: { title: "Закупки и отрасль", description: "B2B закупки, производство, MOQ и обзоры." },
    ja: { title: "調達と業界", description: "B2B調達、製造、MOQ、市場インサイト。" },
    ko: { title: "조달과 산업", description: "B2B 조달, 제조, MOQ, 시장 인사이트." },
    pt: { title: "Fornecimento e indústria", description: "Sourcing B2B, fabricação, MOQ e insights." },
  },
};

/** Block title translations - used for listing & article header. Fallback: English */
const BLOCK_TITLES: Partial<Record<string, Record<LangCode, string>>> = {};
// Populate from INSIGHT_BLOCKS for en; add de/ja/ko/pt for key articles
const BLOCK_IDS = INSIGHT_BLOCKS.map((b) => b.id);
BLOCK_IDS.forEach((id) => {
  const block = getInsightBySlug(id);
  if (block) BLOCK_TITLES[id] = { en: block.title } as Record<LangCode, string>;
});

// Add de/ja/ko/pt titles for ARTICLES (homepage & popular)
const ARTICLES_TITLES: Record<string, Record<"de" | "ja" | "ko" | "pt", string>> = {
  "rod-types": { de: "Rutenarten: Spinning vs Casting vs Surf", ja: "ロッドタイプ：スピニングvsキャスティングvsサーフ", ko: "로드 타입: 스피닝 vs 캐스팅 vs 서프", pt: "Tipos de varas: Spinning vs Casting vs Surf" },
  "rod-power-action": { de: "Power & Action erklärt", ja: "パワーとアクションの説明", ko: "파워와 액션 설명", pt: "Potência e ação explicados" },
  "telescopic-vs-multipiece": { de: "Reiseruten: Teleskop vs Mehrteilig", ja: "トラベルロッド：テレスコピック vs 多節", ko: "트래블 로드: 텔레스코픽 vs 다절", pt: "Varas de viagem: Telescópica vs multipartida" },
  "one-lure-hypothetical": { de: "Wenn Sie nur einen Köder nutzen könnten", ja: "もし1つのルアーしか使えなかったら", ko: "한 가지 루어만 쓸 수 있다면", pt: "Se você pudesse usar apenas um lure" },
  "bass-rod-selection": { de: "Barsch-Rutenauswahl", ja: "バスロッド選び", ko: "배스 로드 선택", pt: "Seleção de varas para bass" },
  "guide-types": { de: "Führungsring-Arten: Fuji und Alternativen", ja: "ガイドタイプ：Fujiと代替品", ko: "가이드 타입: Fuji와 대안", pt: "Tipos de guias: Fuji e alternativas" },
  "supplier-selection": { de: "Fischruten-Lieferant wählen", ja: "サプライヤー選定", ko: "공급업체 선택", pt: "Como escolher fornecedor de varas" },
  "moq-guide": { de: "MOQ-Leitfaden für Angelruten-Großhandel", ja: "卸売MOQガイド", ko: "도매 MOQ 가이드", pt: "Guia de MOQ para varas" },
};
for (const [id, titles] of Object.entries(ARTICLES_TITLES)) {
  if (BLOCK_TITLES[id]) {
    BLOCK_TITLES[id] = { ...BLOCK_TITLES[id]!, ...titles };
  }
}

/** Full block content translations (de/ja/ko/pt only for subset). Key: blockId -> lang -> { title, content } */
type BlockTranslation = { title: string; content: InsightContentItem[] };
const BLOCK_CONTENT: Partial<Record<string, Record<"de" | "ja" | "ko" | "pt", BlockTranslation>>> = {};

// Sample: rod-types in German (abbreviated for file size - full translations can be added)
const rodTypesDe: BlockTranslation = {
  title: "Rutenarten: Spinning vs Casting vs Surf",
  content: [
    "Das Verständnis der Unterschiede zwischen Rutenarten hilft Anglern und Händlern, die richtige Ausrüstung zu wählen. Jeder Typ ist für spezifische Rollen, Techniken und Umgebungen ausgelegt.",
    { type: "h2", text: "Spinnruten" },
    "Spinnruten nutzen Spinnrollen, die unter der Rute montiert sind. Sie eignen sich ideal für leichtere Köder, Finesse-Techniken und Einsteiger aufgrund ihrer verzeihenden Natur.",
    { type: "h2", text: "Wurfruten" },
    "Wurfruten arbeiten mit Baitcast-Rollen oben auf der Rute. Sie bieten bessere Genauigkeit und Kontrolle für schwerere Köder. Ideal für erfahrene Angler.",
    { type: "h2", text: "Surfruten" },
    "Surfruten sind lang (3–4 m) und kräftig, für weite Würfe vom Ufer. Typisch für Surf-, Pier- und Mole-Angeln.",
    { type: "h3", text: "Schnellvergleich" },
    { type: "ul", items: [
      "Spinning: Rolle unten, leichtere Köder, einsteigerfreundlich.",
      "Casting: Rolle oben, schwerere Köder, höhere Genauigkeit.",
      "Surf: Lang & kräftig, Ufer/Pier, Salzwasser.",
    ]},
    { type: "tip", title: "Nach Anwendung wählen", text: "Passen Sie den Rutentyp an Zielart und Umgebung an." },
    { type: "summary", title: "Kernpunkte", items: [
      "Spinnruten für Spinnrollen; Casting für Baitcast.",
      "Surfruten für Uferangeln.",
      "Nach Art, Technik und Transportbedarf wählen.",
    ]},
  ],
};

// rod-types in Japanese (abbreviated)
const rodTypesJa: BlockTranslation = {
  title: "ロッドタイプ：スピニングvsキャスティングvsサーフ",
  content: [
    "ロッドタイプの違いを理解することで、アングラーや小売業者は適切な装備を選べます。各タイプは特定のリール、テクニック、環境向けに設計されています。",
    { type: "h2", text: "スピニングロッド" },
    "スピニングロッドは rod の下に取り付けられたスピニングリールを使用。軽いルアー、フィネステクニック、初心者向け。",
    { type: "h2", text: "キャスティングロッド" },
    "キャスティングロッドは rod の上にベイトキャストリール。重いルアーで精度とパワーを発揮。",
    { type: "h2", text: "サーフロッド" },
    "サーフロッドは長く(3–4m)、強力。浜からの投げ釣り用。",
    { type: "h3", text: "クイック比較" },
    { type: "ul", items: [
      "スピニング：リール下、軽ルアー、初心者向け。",
      "キャスティング：リール上、重ルアー、高精度。",
      "サーフ：長く強力、浜・埠頭用。",
    ]},
    { type: "tip", title: "用途で選ぶ", text: "ターゲット魚種と環境に合わせてロッドタイプを選んでください。" },
    { type: "summary", title: "ポイント", items: [
      "スピニングはスピニングリール用、キャスティングはベイトキャスト用。",
      "サーフは浜釣り用。",
    ]},
  ],
};

// rod-types in Korean (abbreviated)
const rodTypesKo: BlockTranslation = {
  title: "로드 타입: 스피닝 vs 캐스팅 vs 서프",
  content: [
    "로드 타입의 차이를 이해하면 낚시꾼과 소매업자가 필요한 장비를 올바르게 선택할 수 있습니다. 각 타입은 특정 릴, 기술, 환경에 맞게 설계되었습니다.",
    { type: "h2", text: "스피닝 로드" },
    "스피닝 로드는 rod 하단에 장착되는 스피닝 릴을 사용합니다. 가벼운 루어, 파인스 테크닉, 초보자에게 적합합니다.",
    { type: "h2", text: "캐스팅 로드" },
    "캐스팅 로드는 rod 상단의 베이트캐스트 릴과 함께 작동합니다. 무거운 루어에서 정확도와 파워를 제공합니다.",
    { type: "h2", text: "서프 로드" },
    "서프 로드는 길고(3–4m) 강력하며, 해변에서 무거운 무게를 멀리 던지도록 설계되었습니다.",
    { type: "h3", text: "간단 비교" },
    { type: "ul", items: [
      "스피닝: 릴 아래, 가벼운 루어, 초보자 친화적.",
      "캐스팅: 릴 위, 무거운 루어, 높은 정확도.",
      "서프: 길고 강력, 해변/부두용.",
    ]},
    { type: "tip", title: "용도별 선택", text: "대상 어종과 환경에 맞춰 로드 타입을 선택하세요." },
    { type: "summary", title: "핵심 정리", items: [
      "스피닝 로드는 스피닝 릴용, 캐스팅 로드는 베이트캐스트용.",
      "서프 로드는 해변 낚시용.",
    ]},
  ],
};

// rod-types in Portuguese (abbreviated)
const rodTypesPt: BlockTranslation = {
  title: "Tipos de varas: Spinning vs Casting vs Surf",
  content: [
    "Entender as diferenças entre tipos de varas ajuda pescadores e varejistas a escolher o equipamento certo. Cada tipo é projetado para molinetes, técnicas e ambientes específicos.",
    { type: "h2", text: "Varas Spinning" },
    "Varas spinning usam molinetes fixos montados abaixo da vara. Ideais para iscas leves, técnicas finesse e iniciantes.",
    { type: "h2", text: "Varas Casting" },
    "Varas casting funcionam com molinetes baitcast no topo. Oferecem melhor precisão e potência para iscas pesadas.",
    { type: "h2", text: "Varas Surf" },
    "Varas surf são longas (3–4 m) e potentes, para lançamento de pesos da praia.",
    { type: "h3", text: "Comparação rápida" },
    { type: "ul", items: [
      "Spinning: molinete embaixo, iscas leves, para iniciantes.",
      "Casting: molinete em cima, iscas pesadas, maior precisão.",
      "Surf: longo e potente, praia/pier.",
    ]},
    { type: "tip", title: "Escolha por uso", text: "Combine o tipo de vara com a espécie alvo e o ambiente." },
    { type: "summary", title: "Pontos-chave", items: [
      "Spinning para molinetes spinning; casting para baitcast.",
      "Surf para pesca na praia.",
    ]},
  ],
};

BLOCK_CONTENT["rod-types"] = { de: rodTypesDe, ja: rodTypesJa, ko: rodTypesKo, pt: rodTypesPt };

/** Get section with translated title/description */
export function getInsightSections(lang: LangCode): InsightSection[] {
  return INSIGHT_SECTIONS.map((section) => {
    const meta = SECTION_META[section.id]?.[lang] ?? SECTION_META[section.id]?.en;
    return {
      ...section,
      title: meta?.title ?? section.title,
      description: meta?.description ?? section.description,
      blocks: section.blocks.map((block) => {
        const titles = BLOCK_TITLES[block.id];
        const t = titles?.[lang] ?? titles?.en ?? block.title;
        return { ...block, title: t };
      }),
    };
  });
}

/** Get block title for given lang */
export function getBlockTitle(blockId: string, lang: LangCode): string {
  const titles = BLOCK_TITLES[blockId];
  if (titles?.[lang]) return titles[lang];
  const block = getInsightBySlug(blockId);
  return block?.title ?? blockId;
}

/** Get full block (title + content) for given lang. Falls back to English when content not translated. */
export function getInsightByLang(slug: string, lang: LangCode): InsightBlock | undefined {
  const block = getInsightBySlug(slug);
  if (!block) return undefined;

  const translated = BLOCK_CONTENT[slug]?.[lang as "de" | "ja" | "ko" | "pt"];
  if (translated) {
    return { id: block.id, title: translated.title, content: translated.content };
  }

  const titles = BLOCK_TITLES[slug];
  const title = titles?.[lang] ?? titles?.en ?? block.title;
  return { ...block, title };
}

/** Article list for homepage - with translated titles */
export const ARTICLES = [
  { slug: "rod-types" },
  { slug: "rod-power-action" },
  { slug: "telescopic-vs-multipiece" },
  { slug: "one-lure-hypothetical" },
  { slug: "bass-rod-selection" },
  { slug: "guide-types" },
  { slug: "supplier-selection" },
  { slug: "moq-guide" },
] as const;

export function getArticleTitle(slug: string, lang: LangCode): string {
  return getBlockTitle(slug, lang);
}
