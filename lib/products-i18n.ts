/**
 * Product name translations for fixed products (trending, wholesale, newArrivals).
 * Category products (generated) fall back to English name.
 */
import type { LangCode } from "./i18n";
import type { Product } from "./products";

type ProductNameMap = Partial<Record<LangCode, string>>;

const PRODUCT_NAMES: Record<string, ProductNameMap> = {
  "1": { en: "Carbon Fiber Spinning Rod", es: "Caña spinning fibra de carbono", fr: "Canne spinning carbone", de: "Kohlefaser-Spinnrute", ja: "カーボンファイバースピニングロッド", ko: "카본 파이버 스피닝 로드", pt: "Vara spinning fibra de carbono" },
  "2": { en: "Heavy Duty Casting Rod", es: "Caña casting resistencia", fr: "Canne casting robuste", de: "Schwere Wurfrute", ja: "ヘビーデューティーキャスティングロッド", ko: "헤비 듀티 캐스팅 로드", pt: "Vara casting pesada" },
  "3": { en: "Portable Telescopic Rod Set", es: "Set telescópico portátil", fr: "Set canne télescopique portable", de: "Tragbares Teleskop-Set", ja: "携帯テレスコピックロッドセット", ko: "휴대용 텔레스코픽 로드 세트", pt: "Conjunto telescópico portátil" },
  "4": { en: "Saltwater Surf Rod", es: "Caña surf agua salada", fr: "Canne surf eau salée", de: "Salzwasser-Surfrute", ja: "海水サーフロッド", ko: "바닷물 서프 로드", pt: "Vara surf água salgada" },
  "5": { en: "Ultralight Freshwater Rod", es: "Caña agua dulce ultraligera", fr: "Canne eau douce ultralégère", de: "Ultraleichte Süßwasser-Rute", ja: "ウルトラライト淡水ロッド", ko: "울트라라이트 민물 로드", pt: "Vara água doce ultraleve" },
  "6": { en: "Ice Fishing Combo Rod", es: "Combo pesca en hielo", fr: "Combo pêche sur glace", de: "Eisangel-Combo", ja: "アイスフィッシングコンボロッド", ko: "빙어낚시 콤보 로드", pt: "Combo pesca no gelo" },
  "7": { en: "Boat Fishing Graphite Rod", es: "Caña grafito pesca en bote", fr: "Canne graphite bateau", de: "Boot-Angel-Graphitrute", ja: "ボートフィッシンググラファイトロッド", ko: "보트 낚시 그래파이트 로드", pt: "Vara grafite pesca em barco" },
  "8": { en: "Travel 4-Piece Spinning Rod", es: "Caña spinning 4 piezas viaje", fr: "Canne spinning 4 pièces voyage", de: "Reise-Spinnrute 4-tlg", ja: "トラベル4ピーススピニングロッド", ko: "트래블 4피스 스피닝 로드", pt: "Vara spinning 4 peças viagem" },
  "9": { en: "Premium IM8 Carbon Rod", es: "Caña carbono IM8 premium", fr: "Canne carbone IM8 premium", de: "Premium IM8-Kohlefaser-Rute", ja: "プレミアムIM8カーロッド", ko: "프리미엄 IM8 카본 로드", pt: "Vara carbono IM8 premium" },
  "10": { en: "Compact Travel 5-Piece Set", es: "Set viaje 5 piezas compacto", fr: "Set voyage 5 pièces compact", de: "Kompaktes Reise-Set 5-tlg", ja: "コンパクトトラベル5ピースセット", ko: "컴팩트 트래블 5피스 세트", pt: "Conjunto compacto 5 peças viagem" },
  "11": { en: "Pro Surf Casting Rod 4.2m", es: "Caña surf casting pro 4.2m", fr: "Canne surf casting pro 4.2m", de: "Pro-Surf-Wurfrute 4,2m", ja: "プロサーフキャスティングロッド4.2m", ko: "프로 서프 캐스팅 로드 4.2m", pt: "Vara surf casting pro 4.2m" },
  "12": { en: "Budget Spinning Rod 2.1m", es: "Caña spinning económica 2.1m", fr: "Canne spinning budget 2.1m", de: "Budget-Spinnrute 2,1m", ja: "低価格スピニングロッド2.1m", ko: "저예산 스피닝 로드 2.1m", pt: "Vara spinning econômica 2.1m" },
  "13": { en: "Multi-Tip Casting Rod Combo", es: "Combo caña casting multi-punta", fr: "Combo canne casting multi-embouts", de: "Multi-Tipp-Wurfruten-Combo", ja: "マルチチップキャスティングロッドコンボ", ko: "멀티 팁 캐스팅 로드 콤보", pt: "Combo vara casting multi-ponta" },
  "14": { en: "Ultra-Compact 6-Piece Travel", es: "Viaje ultracompacto 6 piezas", fr: "Voyage ultra-compact 6 pièces", de: "Ultrakompakt Reise 6-tlg", ja: "ウルトラコンパクト6ピーストラベル", ko: "울트라 컴팩트 6피스 트래블", pt: "Viagem ultracompacta 6 peças" },
  "15": { en: "Pro Ice Fishing Rod", es: "Caña pesca hielo pro", fr: "Canne pêche glace pro", de: "Pro-Eisangelrute", ja: "プロアイスフィッシングロッド", ko: "프로 빙어낚시 로드", pt: "Vara pesca gelo pro" },
  "16": { en: "Telescopic Surf Rod 3.9m", es: "Caña surf telescópica 3.9m", fr: "Canne surf télescopique 3.9m", de: "Teleskop-Surfrute 3,9m", ja: "テレスコピックサーフロッド3.9m", ko: "텔레스코픽 서프 로드 3.9m", pt: "Vara surf telescópica 3.9m" },
  "17": { en: "Spinning Rod Bulk Pack", es: "Pack mayorista caña spinning", fr: "Lot cannes spinning", de: "Spinnruten-Großpackung", ja: "スピニングロッドバルクパック", ko: "스피닝 로드 벌크 팩", pt: "Pacote bulk varas spinning" },
  "18": { en: "Telescopic Rod Wholesale Set", es: "Set mayorista cañas telescópicas", fr: "Lot cannes télescopiques", de: "Teleskopruten-Großhandelsset", ja: "テレスコピックロッド卸売セット", ko: "텔레스코픽 로드 도매 세트", pt: "Conjunto atacado varas telescópicas" },
  "19": { en: "Surf Rod Bulk Order", es: "Pedido mayorista caña surf", fr: "Commande en gros cannes surf", de: "Surfruten-Großbestellung", ja: "サーフロッド大口注文", ko: "서프 로드 대량 주문", pt: "Pedido bulk varas surf" },
  "20": { en: "Casting Rod 100-Pack", es: "Pack 100 cañas casting", fr: "Lot 100 cannes casting", de: "Wurfruten-100er-Pack", ja: "キャスティングロッド100パック", ko: "캐스팅 로드 100팩", pt: "Pacote 100 varas casting" },
  "21": { en: "Travel Rod Bulk Deal", es: "Oferta mayorista cañas viaje", fr: "Offre gros cannes voyage", de: "Reiseruten-Großdeal", ja: "トラベルロッド bulk deal", ko: "트래블 로드 벌크 딜", pt: "Oferta bulk varas viagem" },
  "22": { en: "Ice Rod Wholesale Lot", es: "Lote mayorista cañas hielo", fr: "Lot cannes glace", de: "Eisruten-Großhandelslos", ja: "アイスロッド卸売ロット", ko: "빙어낚시 로드 도매 묶음", pt: "Lote atacado varas gelo" },
};

/** Get translated product name; fallback to product.name */
export function getProductName(product: { id?: string; name: string }, lang: LangCode): string {
  if (product.id && PRODUCT_NAMES[product.id]) {
    return PRODUCT_NAMES[product.id][lang] ?? PRODUCT_NAMES[product.id].en ?? product.name;
  }
  return product.name;
}

/** 列表页展示名：去冗余、扩写短标题、不强制分行，由 line-clamp-2 自然换行 */
const LIST_DISPLAY_NAMES: Record<string, string> = {
  TSG01: "Silvery Carbon Fiber Travel Lure",
  TSG02: "Travel Carbon Spinning Lure",
  TSG03: "Carbon Fiber Casting",
  TSG04: "Carbon Lure Wood Handle",
  TSG05: "White Fiberglass Casting",
  TSG06: "Travel Lure M Action",
  TSG07: "Six-Layer Fiberglass Spinning",
  TSG08: "Six-Layer Fiberglass Casting",
  TSG09: "Green Carbon Casting EVA Grip",
  TSG10: "Black & Gold Carbon Fiber",
  TSG11: "Carbon Rod & Reel Wood Handle",
  TSG12: "Durable Spinning Medium Power",
  TSG13: "Telescopic Fiberglass",
  TSG14: "Carbon Fiber Lure",
  TSG15: "Travel Carbon Spinning Lure",
  TSG16: "Colored Carbon Fiber",
  TSG17: "High-Carbon Lure Two-Section",
  TSG18: "Red ML Tone Lure",
  TSG19: "UL Tone Carbon Casting",
  TSG20: "Camo Casting Ceramic Guides",
  TSG21: "Camo Casting Ceramic Guides",
  TSG22: "Green Carbon Fiber Lightweight",
  TSG23: "Black M-Tone Casting",
  TSG24: "White Carbon C&S",
  TSG25: "M Tone Carbon Lure",
  TSG26: "Long Casting Carbon",
  TSG27: "Silver-Black Carbon",
  TSG28: "Ultra-Light Carbon Lure",
  TSG29: "Blue/Orange Carbon Lure",
  SSG01: "Telescopic Surf Casting",
  DJG01: "4-Section Mini Lure",
  DGL: "Sea Rod & Reel Set",
  YGT01: "55-Pc Telescopic Lure Set",
};

/** 去除 rod/rods 等冗余词（列表页上下文已明确是渔竿） */
function stripRedundantRod(text: string): string {
  return text
    .replace(/\s+(rod|rods|竿|渔竿|釣竿)(\s|$)/gi, "$2")
    .replace(/\s+(caña|canne|vara|rute|ロッド|로드)(\s|$)/gi, "$2")
    .replace(/\s{2,}/g, " ")
    .trim();
}

/** 列表页卡片用展示名：有 LIST_DISPLAY_NAMES 用映射，否则去除 rod 等冗余词 */
export function getListDisplayName(product: { id?: string; name: string }, lang: LangCode): string {
  if (product.id && LIST_DISPLAY_NAMES[product.id]) {
    return LIST_DISPLAY_NAMES[product.id];
  }
  const full = getProductName(product, lang);
  return stripRedundantRod(full);
}

/** 详情页标题：更详实，严格 2 行。仅按 " - "（空格包围的横线）拆分，避免误拆 Six-Layer 等 */
export function getDetailDisplayName(
  product: { id?: string; name: string },
  lang: LangCode,
  originalTitle?: string
): string {
  const base = getProductName(product, lang);
  const raw = (originalTitle || base).trim();
  if (!raw) return base;
  const parts = raw.split(/\s+-\s+/).map((s) => s.trim()).filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0]}\n${parts.slice(1).join(", ")}`;
  }
  return raw;
}
