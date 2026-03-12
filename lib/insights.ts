/** 首页预览用 - 标题 + 链接到 /insights#slug */
export const ARTICLES = [
  { title: "Fishing Rod Types: Spinning vs Casting vs Surf", slug: "rod-types" },
  { title: "Carbon Fiber: Materials & Grades", slug: "carbon-fiber" },
  { title: "Rod Power & Action Explained", slug: "rod-power-action" },
  { title: "How to Choose a Supplier", slug: "supplier-selection" },
  { title: "Manufacturing Process", slug: "manufacturing" },
  { title: "Line & Lure Weight Guide", slug: "line-lure" },
] as const;

/** 钓鱼知识区块 - 无图片，分块展示便于 SEO */
export const INSIGHT_BLOCKS = [
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
    id: "line-lure",
    title: "Line Weight & Lure Weight Guide",
    content: [
      "Line weight (e.g. 6–14 lb) should match rod power. Heavier line needs heavier power. Lure weight (e.g. 1/8–5/8 oz) indicates the optimal lure range; too light or too heavy affects casting and action.",
      "Rod specs usually list both. For sourcing, ensure your target market’s common setups (e.g. bass, trout, saltwater) align with the rod’s rated range. Our catalog specifies line and lure weight for each model.",
    ],
  },
] as const;
