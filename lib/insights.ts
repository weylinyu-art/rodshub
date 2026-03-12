export interface InsightBlock {
  id: string;
  title: string;
  content: string[];
}

export interface InsightSection {
  id: string;
  title: string;
  description: string;
  blocks: InsightBlock[];
}

/**
 * Practical guides and sourcing insights for fishing rod buyers and tackle businesses.
 * Four sections: Rod Guides, Techniques, Product Knowledge, Sourcing & Industry.
 */
export const INSIGHT_SECTIONS: InsightSection[] = [
  {
    id: "rod-guides",
    title: "Fishing Rod Guides",
    description: "Essential knowledge about rod types, materials, power & action.",
    blocks: [
      {
        id: "rod-types",
        title: "Fishing Rod Types: Spinning vs Casting vs Surf",
        content: [
          "Spinning rods use fixed-spool reels mounted below the rod; the line comes off the spool in a fixed direction. Ideal for lighter lures, finesse fishing, and beginners. Casting rods work with baitcast reels on top; the spool rotates during the cast. Better for heavier lures, accuracy, and experienced anglers.",
          "Surf rods are long (3–4 m) and powerful, designed for casting from shore into waves. Telescopic and travel rods break down into compact sections for portability. Ice rods are short (0.6–1 m) for fishing through holes. Choose by target species, environment, and casting distance needed.",
        ],
      },
      {
        id: "carbon-fiber",
        title: "Carbon Fiber Fishing Rods: Materials & Grades",
        content: [
          "Carbon fiber (graphite) rods offer high strength-to-weight ratio and sensitivity. IM6 (modulus ~33) is durable and affordable; IM7–IM8 are stiffer and more responsive. Higher modulus means lighter and more sensitive but also more brittle if mishandled.",
          "Fiberglass rods are tougher and cheaper, better for heavy-duty or budget use. Composite rods blend both. For B2B sourcing, specify modulus, length, and power when ordering. OEM can match your branding and packaging.",
        ],
      },
      {
        id: "rod-power-action",
        title: "Rod Power & Action Explained",
        content: [
          "Power describes how much force the rod can handle: Ultralight, Light, Medium, Medium-Heavy, Heavy, Extra Heavy. Matches line weight and lure size. Action describes where the rod bends: Fast (tip), Medium (mid), Slow (full). Fast action gives quicker hook sets; slow action loads more for casting distance.",
          "Pair power with your target species: light for panfish, heavy for big game. Action affects sensitivity and casting. Many B2B catalogs list both; our suppliers provide full specs for each SKU.",
        ],
      },
      {
        id: "line-lure",
        title: "Line Weight & Lure Weight Guide",
        content: [
          "Line weight (e.g. 6–14 lb) should match rod power. Heavier line needs heavier power. Lure weight (e.g. 1/8–5/8 oz) indicates the optimal lure range; too light or too heavy affects casting and action.",
          "Rod specs usually list both. For sourcing, ensure your target market's common setups (e.g. bass, trout, saltwater) align with the rod's rated range. Our catalog specifies line and lure weight for each model.",
        ],
      },
    ],
  },
  {
    id: "techniques",
    title: "Fishing Techniques",
    description: "Tips and techniques for choosing and using rods effectively.",
    blocks: [
      {
        id: "casting-techniques",
        title: "Casting Techniques by Rod Type",
        content: [
          "Spinning rods: Use an open-face reel; thumb or finger controls line during cast. Overhead and side casts work well for medium distances. Let the rod load—don't overpower the blank.",
          "Casting rods: Thumb controls spool to prevent backlash. Start with lighter lures until you master the motion. Use smooth acceleration, not a jerk. Surf rods: Two-handed overhead cast or pendulum cast for maximum distance.",
        ],
      },
      {
        id: "bass-rod-selection",
        title: "Bass Fishing Rod Selection",
        content: [
          "For largemouth bass: 6'6\"–7' medium-heavy fast action spinning or casting works for most techniques. Use spinning for finesse (drop shot, wacky, light jigs); casting for heavier lures and punching.",
          "Smallmouth: Lighter power, often medium. Consider longer rods (7'+) for smallmouth in open water. Match rod to technique—cranking, flipping, topwater each have optimal specs.",
        ],
      },
      {
        id: "saltwater-vs-freshwater",
        title: "Saltwater vs Freshwater Rod Setup",
        content: [
          "Saltwater rods need corrosion-resistant guides and reel seats. Heavier power ratings for larger fish. Often longer for surf or pier; shorter for boat. Check if blanks and hardware are salt-rated.",
          "Freshwater rods can use lighter components. More focus on sensitivity. Travel-friendly options popular. When sourcing for retail, stock both lines—saltwater buyers expect durability; freshwater buyers value feel.",
        ],
      },
      {
        id: "ice-fishing-basics",
        title: "Ice Fishing Rod Basics",
        content: [
          "Ice rods are short (24\"–36\") and light. Ultralight to light power for panfish; medium for walleye and pike. In-line or spinning reels. Stiff tips for jigging; softer for deadstick.",
          "Two-piece or telescopic for storage. Handle length matters in cold—exposed blanks conduct cold. Retailers: ice rods sell seasonally; order early for winter demand.",
        ],
      },
    ],
  },
  {
    id: "product-knowledge",
    title: "Product Knowledge",
    description: "Components, construction, and care for rod buyers and retailers.",
    blocks: [
      {
        id: "blank-construction",
        title: "Fishing Rod Blank Construction",
        content: [
          "Blanks are the core—carbon or fiberglass wrapped on a mandrel, then cured. Modulus, layers, and taper determine action and strength. One-piece offers best performance; multi-piece trades some feel for portability.",
          "Quality blanks have consistent wall thickness and straight spine. Defects show as wobble or weak spots. When evaluating suppliers, ask about blank source and QC.",
        ],
      },
      {
        id: "guide-types",
        title: "Guide Types: Fuji and Alternatives",
        content: [
          "Guides (eyes) route line along the rod. Fuji is the gold standard; Alconite and Sic inserts reduce friction. Ceramic or oxide rings for braid. Fewer guides = lighter but less line control.",
          "Budget rods use aluminum oxide or stainless. Premium use SiC. For OEM, specify guide brand and type—retailers and anglers recognize Fuji. Count and spacing affect action.",
        ],
      },
      {
        id: "handle-materials",
        title: "Handle Materials: Cork vs EVA",
        content: [
          "Cork: Classic feel, light, absorbs sweat. Softer, can compress over time. Preferred for spinning and finesse. EVA: Durable, grippy when wet, easier to clean. Common on casting and saltwater rods.",
          "Hypalon is another option. Split vs full grip affects balance. Length and diameter matter for hand size. OEM can customize handle style and length.",
        ],
      },
      {
        id: "rod-storage-care",
        title: "Rod Storage and Care",
        content: [
          "Store rods vertically or horizontally with supports—avoid leaning tips. Use rod sleeves or tubes for travel. Rinse saltwater rods after use. Don't store under tension or in hot environments.",
          "Retailers: educate customers on care to reduce returns. Include a care card with OEM orders. Damaged guides or worn inserts hurt performance; suggest periodic inspection.",
        ],
      },
    ],
  },
  {
    id: "sourcing-industry",
    title: "Sourcing & Industry",
    description: "B2B guides for wholesalers, retailers, and private label.",
    blocks: [
      {
        id: "supplier-selection",
        title: "How to Choose a Fishing Rod Supplier",
        content: [
          "Key factors: product quality (blanks, guides, handles), MOQ flexibility, lead time, certifications (CE, etc.), and OEM capability. Request samples before large orders. Check if they support air and sea freight, FOB/CIF terms, and export documentation.",
          "RodsHub aggregates vetted manufacturers. We handle quality control, logistics, and customization. Reply within 24 hours to all inquiries. Browse our 200+ SKUs across spinning, casting, surf, telescopic, ice, and travel rods.",
        ],
      },
      {
        id: "manufacturing",
        title: "Fishing Rod Manufacturing Process",
        content: [
          "Blanks are made by wrapping carbon/graphite sheets around a mandrel, then curing in an oven. Guides (Fuji or equivalent) are wrapped and epoxied. Handles use cork or EVA. Reel seats are fitted. Final QC checks length, straightness, and action.",
          "OEM options include custom length, power, branding, and packaging. Prototypes typically take 7–14 days. Production runs depend on order size; express air freight available for urgent orders.",
        ],
      },
      {
        id: "private-label-guide",
        title: "Private Label Fishing Rod Guide",
        content: [
          "Private label (OEM) lets you sell rods under your brand. Steps: define specs (length, power, action, materials), choose blank and components, add logo/packaging, set MOQ and price targets.",
          "Min order usually 100–500 pcs per SKU. Lead time 4–8 weeks. Packaging and carton design often included. RodsHub handles design coordination and samples. Ideal for tackle shops, online retailers, and regional brands.",
        ],
      },
      {
        id: "moq-guide",
        title: "MOQ Guide for Fishing Rod Wholesale",
        content: [
          "Minimum order quantity (MOQ) varies by product type and factory. Spinning and telescopic rods: often 50–200 pcs. Casting and surf: 30–100. Custom OEM: 100–500. Higher volume = lower unit cost.",
          "Split orders across SKUs to meet MOQ. Some suppliers allow mixed cartons. Ask about payment terms—T/T common; L/C for larger orders. RodsHub MOQ from 30 pcs on selected lines.",
        ],
      },
      {
        id: "market-trends",
        title: "Fishing Rod Market Trends",
        content: [
          "Telescopic and travel rods growing—urban anglers, fly-in trips, compact storage. Carbon modulus creep: more IM8+ at mid-price. Sustainability: recyclable packaging, reduced plastic. E-commerce drives DTC and private label.",
          "Regional trends: North America strong in bass and ice; Europe in carp and match; Asia in lure and boat. Retailers should stock versatile rods plus niche lines. RodsHub tracks trends and can advise on catalog mix.",
        ],
      },
    ],
  },
];

/** Flatten all blocks for JSON-LD, sitemap, and anchor links */
export const INSIGHT_BLOCKS: InsightBlock[] = INSIGHT_SECTIONS.flatMap((s) => s.blocks);

/** Get article by slug for detail page */
export function getInsightBySlug(slug: string): InsightBlock | undefined {
  return INSIGHT_BLOCKS.find((b) => b.id === slug);
}

/** All slugs for generateStaticParams */
export function getAllInsightSlugs(): string[] {
  return INSIGHT_BLOCKS.map((b) => b.id);
}

/** Homepage preview - representative articles from each section */
export const ARTICLES = [
  { title: "Fishing Rod Types: Spinning vs Casting vs Surf", slug: "rod-types" },
  { title: "Rod Power & Action Explained", slug: "rod-power-action" },
  { title: "Bass Fishing Rod Selection", slug: "bass-rod-selection" },
  { title: "Guide Types: Fuji and Alternatives", slug: "guide-types" },
  { title: "How to Choose a Fishing Rod Supplier", slug: "supplier-selection" },
  { title: "MOQ Guide for Fishing Rod Wholesale", slug: "moq-guide" },
] as const;
