/** Rich content block types for structured articles */
export type InsightContentItem =
  | string
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "tip"; title: string; text: string }
  | { type: "mistake"; title: string; text: string }
  | { type: "summary"; title?: string; items: string[] };

export interface InsightBlock {
  id: string;
  title: string;
  content: InsightContentItem[];
}

/** Extract plain text from content for JSON-LD and metadata */
export function getArticleBodyText(content: InsightContentItem[]): string {
  return content
    .map((item) => {
      if (typeof item === "string") return item;
      if (item.type === "tip" || item.type === "mistake") return `${item.title}: ${item.text}`;
      if (item.type === "ul" || item.type === "ol" || item.type === "summary") return item.items.join(". ");
      return item.text;
    })
    .join(" ");
}

/** Get first paragraph for meta description */
export function getFirstParagraphText(content: InsightContentItem[]): string {
  for (const item of content) {
    if (typeof item === "string") return item;
    if (item.type === "tip" || item.type === "mistake") return `${item.title}: ${item.text}`;
  }
  return "";
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
          "Understanding the differences between rod types helps anglers and retailers choose the right equipment for their needs. Each type is designed for specific reels, techniques, and environments.",
          { type: "h2", text: "Spinning Rods" },
          "Spinning rods use fixed-spool (spinning) reels mounted below the rod; the line comes off the spool in a fixed direction during the cast. The guides are larger and placed on the underside of the rod to accommodate the line flow. Spinning setups are ideal for lighter lures (1/32–3/4 oz), finesse techniques like drop shot and wacky rig, and for beginners due to their forgiving nature and reduced backlash risk.",
          { type: "h2", text: "Casting Rods" },
          "Casting rods work with baitcast reels mounted on top of the rod. The spool rotates during the cast, requiring thumb control to prevent overrun (backlash). They offer better accuracy, power, and control for heavier lures (1/4–2+ oz). Best suited for experienced anglers and techniques like flipping, punching, crankbaiting, and topwater. The smaller guides and different blank design optimize line flow for overhead casting.",
          { type: "h2", text: "Surf Rods" },
          "Surf rods are long (3–4 m) and powerful, designed for casting heavy weights and large baits from shore into waves. They handle the stress of long-distance two-handed casts and big saltwater species. Common in surf fishing, pier fishing, and jetty setups.",
          { type: "h2", text: "Other Rod Types" },
          "Telescopic and travel rods break down into compact sections for portability—ideal for fly-in trips, urban angling, and storage. Ice rods are short (0.6–1 m) for fishing vertically through ice holes, typically ultralight to medium power.",
          { type: "h3", text: "Quick Comparison" },
          { type: "ul", items: [
            "Spinning: Reel below, lighter lures, beginner-friendly, less backlash.",
            "Casting: Reel on top, heavier lures, higher accuracy, requires technique.",
            "Surf: Long & powerful, shore/pier, two-handed cast, saltwater.",
            "Telescopic/Travel: Collapsible, portable, compact storage.",
            "Ice: Short, vertical jigging, cold-weather use.",
          ]},
          { type: "tip", title: "Choosing by Use Case", text: "Match the rod type to your target species and environment. For bass in open water, spinning or casting both work; for finesse and light line, choose spinning. For saltwater surf or pier, use surf rods. For traveling or limited storage, telescopic and travel rods are essential." },
          { type: "mistake", title: "Using the Wrong Reel Type", text: "Never pair a spinning reel with a casting rod or vice versa. The guides, reel seat, and blank design are built for one system. Mismatching causes poor line flow, tangles, and reduced performance." },
          { type: "summary", title: "Key Takeaways", items: [
            "Spinning rods pair with spinning reels; best for light lures and beginners.",
            "Casting rods pair with baitcast reels; best for heavy lures and precision.",
            "Surf rods are long and powerful for shore fishing.",
            "Choose by species, technique, casting distance, and portability needs.",
          ]},
        ],
      },
      {
        id: "carbon-fiber",
        title: "Carbon Fiber Fishing Rods: Materials & Grades",
        content: [
          "The material and modulus grade of a fishing rod blank directly affect sensitivity, weight, durability, and price. Understanding carbon fiber grades helps anglers and buyers choose the right rod for their budget and performance needs.",
          { type: "h2", text: "Carbon Fiber (Graphite) Modulus Grades" },
          "Carbon fiber rods offer an excellent strength-to-weight ratio and high sensitivity. Modulus refers to the stiffness of the carbon: higher modulus means stiffer, lighter, and more responsive—but also more brittle if mishandled.",
          { type: "ul", items: [
            "IM6 (modulus ~33): Durable, affordable, forgiving. Ideal for entry-level and heavy-use rods.",
            "IM7 (modulus ~36–40): Stiffer, lighter, good sensitivity. Mid-range performance.",
            "IM8 (modulus ~40+): Premium sensitivity and responsiveness. Best for finesse and tournament use.",
            "IM9/IM10: Top-tier, very light and sensitive. Requires careful handling.",
          ]},
          { type: "h2", text: "Fiberglass vs Composite" },
          "Fiberglass rods are tougher and more forgiving than carbon. They resist impacts better and are often cheaper. Best for heavy-duty use, children's rods, and budget lines. Composite rods blend carbon and fiberglass—offering a balance of sensitivity and durability.",
          { type: "h3", text: "B2B Sourcing Considerations" },
          "When ordering wholesale, specify modulus grade, length, power, and action. Higher modulus typically increases unit cost. OEM suppliers can match your branding, handle materials, and packaging. Request samples to verify blank quality before large orders.",
          { type: "tip", title: "Match Modulus to Use", text: "For finesse bass or trout, IM7–IM8 delivers the sensitivity you need. For heavy surf or trolling, IM6 or fiberglass provides durability at a lower cost. Composite works well for all-around rods." },
          { type: "mistake", title: "Chasing the Highest Modulus", text: "IM9 and IM10 rods are not always better for every application. They are more fragile—car doors, rod racks, and rough handling can cause cracks. For most anglers, IM7–IM8 offers the best balance of performance and durability." },
          { type: "summary", title: "Key Takeaways", items: [
            "IM6: durable and affordable; IM7–IM8: best performance/dollar balance.",
            "Fiberglass: tougher, cheaper; composite: balanced sensitivity and durability.",
            "Higher modulus = lighter, more sensitive, but more brittle.",
            "Specify modulus, length, power when sourcing; request samples.",
          ]},
        ],
      },
      {
        id: "rod-power-action",
        title: "Rod Power & Action Explained",
        content: [
          "Power and action are two of the most important specifications on a fishing rod. They determine how the rod casts, fishes, and handles different lures and line weights.",
          { type: "h2", text: "Understanding Power" },
          "Power describes how much force the rod can handle—essentially its \"backbone.\" It is typically rated as Ultralight, Light, Medium, Medium-Heavy, Heavy, or Extra Heavy. Power should match your line weight and lure size. Heavier line and larger lures require heavier power; lighter setups need lighter power.",
          { type: "ul", items: [
            "Ultralight–Light: 2–8 lb line, small lures, panfish, trout, finesse.",
            "Medium: 8–12 lb line, general bass, walleye, inshore.",
            "Medium-Heavy–Heavy: 12–25 lb line, flipping, punching, heavier bass, inshore saltwater.",
            "Extra Heavy: 25+ lb line, heavy cover, big game, surf.",
          ]},
          { type: "h2", text: "Understanding Action" },
          "Action describes where the rod bends when loaded. Fast action bends primarily in the upper third (tip); medium action bends through the middle; slow action bends through most of the blank. Fast action gives quicker hook sets and more sensitivity; slow action loads more for casting distance and is more forgiving on light line.",
          { type: "h3", text: "Power + Action Pairing" },
          "Pair power with your target species: light for panfish, heavy for big game. Fast action suits techniques that need quick hook sets (jigging, Texas rig); slow or moderate action suits crankbaits and treble hooks, where a softer tip helps prevent throwing hooks.",
          { type: "tip", title: "Read the Specs", text: "B2B catalogs and product pages list both power and action. For example, \"Medium-Heavy, Fast\" means a rod with backbone for 12–17 lb line and a stiff tip for sensitivity. Match these to your target technique." },
          { type: "mistake", title: "Ignoring Action for Technique", text: "Using a fast-action rod for crankbaits can lead to lost fish—the stiff tip can pull trebles free. Using a slow rod for heavy jigs reduces sensitivity and hook-setting power. Match action to technique, not just power to species." },
          { type: "summary", title: "Key Takeaways", items: [
            "Power = backbone; matches line weight and lure size.",
            "Action = where it bends; fast = tip, slow = full.",
            "Fast action: quick hook sets, sensitivity; slow: casting distance, forgiveness.",
            "Match power to species/line; match action to technique.",
          ]},
        ],
      },
      {
        id: "line-lure",
        title: "Line Weight & Lure Weight Guide",
        content: [
          "Rod specifications include line weight and lure weight ratings. These numbers tell you the optimal range for safe, effective use. Using line or lures outside the rated range can reduce performance or risk damage.",
          { type: "h2", text: "Line Weight Ratings" },
          "Line weight (e.g., 6–14 lb, 12–25 lb) indicates the recommended monofilament or fluorocarbon test strength. Heavier line needs a heavier power rod to load properly and avoid overload. Lighter line on a heavy rod reduces sensitivity; heavier line on a light rod can overload the blank.",
          { type: "h2", text: "Lure Weight Ratings" },
          "Lure weight (e.g., 1/8–5/8 oz, 1/4–1 oz) shows the optimal lure range. Casting lures that are too light reduces distance and feel; casting lures that are too heavy can overload the tip, damage the rod, or cause poor casting. Stay within or close to the stated range.",
          { type: "h3", text: "Braid Considerations" },
          "Braid has a thinner diameter for the same test rating. Many anglers use higher braid strength (e.g., 30 lb braid) on rods rated for 10–17 lb mono—the thin diameter reduces load. If in doubt, stay within the line rating to protect the rod.",
          { type: "ul", items: [
            "Match line weight to rod power; heavier power = heavier line rating.",
            "Lure weight must fall within or near the stated range.",
            "Braid: same or slightly higher test okay due to thin diameter.",
            "For sourcing: ensure rod ratings fit your market's common setups.",
          ]},
          { type: "tip", title: "Check Before You Buy", text: "When sourcing for retail, verify that line and lure ratings align with regional preferences. Bass rods in North America typically rate 10–17 lb and 1/4–1 oz; trout rods may rate 4–8 lb and 1/16–1/2 oz. Our catalog lists these specs for every SKU." },
          { type: "mistake", title: "Exceeding Lure Weight", text: "Casting lures far above the rated weight (e.g., 2 oz on a 1/4–3/4 oz rod) can snap the tip or weaken the blank over time. The rod is not designed for that load. If you need heavier lures, use a heavier power rod." },
          { type: "summary", title: "Key Takeaways", items: [
            "Line weight matches rod power; stay within rating for safety.",
            "Lure weight must be in the stated range for best performance.",
            "Braid can often be used at slightly higher test due to thin diameter.",
            "For B2B: align specs with target market (bass, trout, saltwater).",
          ]},
        ],
      },
      {
        id: "telescopic-vs-multipiece",
        title: "Travel Rods: Telescopic vs Multi-Piece—What Anglers Prefer",
        content: [
          "Portable fishing rods are essential for travel, urban angling, and fly-in trips. Two main designs dominate: telescopic (collapsing sections) and multi-piece pack rods (2–6 pieces). Forums and outdoor communities frequently debate which offers better performance and durability.",
          { type: "h2", text: "Telescopic Rods: Pros and Cons" },
          "Telescopic rods collapse into a compact tube—often 12–24 inches when stored. They are convenient for backpacking, car travel, and impromptu fishing. Downsides: sections can stick, warp, or develop play over time. Casting distance and sensitivity often trail multi-piece rods due to ferrule design. Premium telescopics (24-ton carbon, quality ferrules) narrow the gap.",
          { type: "h2", text: "Multi-Piece Pack Rods: Community Favorite" },
          "Outdoor and canoe forums consistently prefer quality 4-piece pack rods over telescopics. Multi-piece rods maintain better blank integrity—no collapsing sections that can bind. They cast farther, feel more sensitive, and tend to last longer. The trade-off is slightly longer packed length (usually 18–30 inches) and assembly time. For serious travel anglers, 4-piece spinning or fly rods are the default choice.",
          { type: "h3", text: "When to Choose Each" },
          { type: "ul", items: [
            "Telescopic: Maximum portability, quick deploy, budget options widely available.",
            "Multi-piece: Best performance and durability; preferred for frequent travelers.",
            "4-piece: Sweet spot—compact enough, better feel than telescopic.",
            "Quality matters: A good telescopic can outperform a cheap 4-piece.",
          ]},
          { type: "tip", title: "Sourcing for Retail", text: "Stock both types. Entry-level telescopics sell on price and convenience. Mid-tier 4-piece travel rods appeal to serious anglers. RodsHub offers spinning and casting travel rods in both telescopic and multi-piece designs; MOQ from 30 pcs on selected lines." },
          { type: "mistake", title: "Assuming Telescopic Means Inferior", text: "Budget telescopics can be sticky and weak. But premium telescopics with quality ferrules and carbon blanks are viable for light tackle. Don't dismiss the category—many urban and casual anglers prefer the compact form factor." },
          { type: "summary", title: "Key Takeaways", items: [
            "Telescopic: compact, quick; can stick or lose feel over time.",
            "Multi-piece (4-piece): preferred for performance and durability.",
            "Forums favor pack rods; telescopics still popular for convenience.",
            "Stock both for different buyer segments.",
          ]},
        ],
      },
      {
        id: "graphite-vs-fiberglass-first-rod",
        title: "Graphite vs Fiberglass: Choosing Your First Rod",
        content: [
          "New anglers often ask whether to start with graphite (carbon) or fiberglass. The answer depends on budget, target species, and how much abuse the rod will take. Forums and beginner guides frequently compare these materials.",
          { type: "h2", text: "Graphite (Carbon) Rods" },
          "Graphite offers high sensitivity—you feel light bites and bottom contact. It's lightweight and reduces fatigue. The downside: more brittle. Car doors, rod racks, and rough handling can crack or snap graphite. Fast-action graphite excels at hook sets and finesse but demands care. Best for anglers who value feel and are willing to handle rods gently.",
          { type: "h2", text: "Fiberglass Rods" },
          "Fiberglass is tougher and more forgiving. It bends through more of the blank (slower action) and absorbs shock—ideal for soft-mouthed fish and treble hooks. It's budget-friendly and withstands beginner treatment. The trade-off: heavier, less sensitive. Many experienced anglers recommend fiberglass for a first rod—especially for kids or heavy-use situations.",
          { type: "h2", text: "Composite: The Middle Ground" },
          "Composite rods blend graphite and fiberglass. You get better sensitivity than pure fiberglass and more durability than pure graphite. For all-around first rods, composite is a strong choice.",
          { type: "h3", text: "Recommendation by Scenario" },
          { type: "ul", items: [
            "Kids / rough treatment: Fiberglass—durable, forgiving, low cost.",
            "Finesse / sensitivity focus: Graphite—feel every bite.",
            "All-around first rod: Composite or IM6 graphite.",
            "Crankbaits / treble hooks: Fiberglass or moderate graphite.",
          ]},
          { type: "tip", title: "Start Forgiving, Upgrade Later", text: "Begin with fiberglass or composite. Once you develop technique and handling habits, upgrade to graphite for sensitivity. This reduces frustration from snapped tips and builds confidence." },
          { type: "mistake", title: "Buying Top-Tier Graphite as a First Rod", text: "IM8 and IM9 rods are fragile. Beginners often lean rods against cars, step on them, or store them improperly. Start with durable gear; save high-modulus graphite for when you can care for it." },
          { type: "summary", title: "Key Takeaways", items: [
            "Graphite: sensitive, light; brittle—needs careful handling.",
            "Fiberglass: tough, forgiving; heavier, less sensitive.",
            "Composite: balance of both; good first-rod choice.",
            "Match material to user: kids/rough use = fiberglass; finesse = graphite.",
          ]},
        ],
      },
      {
        id: "medium-vs-medium-heavy",
        title: "Medium vs Medium-Heavy: Choosing Baitcaster Rod Power",
        content: [
          "One of the most common forum questions is: \"Medium or medium-heavy for my first baitcaster?\" Both work for bass fishing, but the choice affects lure range, hook-setting power, and versatility. Here is a practical breakdown based on community discussion.",
          { type: "h2", text: "Medium Power (M)" },
          "Medium power handles 8–14 lb line and lures from 1/4 to 5/8 oz. It's more versatile for lighter techniques—spinnerbaits, smaller crankbaits, topwater, and light Texas rigs. The softer tip loads better for casting distance and is forgiving on treble hooks. Some anglers find it slightly underpowered for heavy cover and big jigs.",
          { type: "h2", text: "Medium-Heavy Power (MH)" },
          "Medium-heavy suits 12–20 lb line and 1/4–1 oz lures. It has more backbone for pulling fish from cover, setting hooks on Texas rigs and jigs, and flipping. It's the workhorse for most bass techniques. The stiffer blank may feel less ideal for small crankbaits and light lures—you can overpower the rod on the cast.",
          { type: "h3", text: "Community Consensus" },
          "For a single all-purpose baitcaster rod, medium-heavy gets the nod. It handles the widest range of bass techniques. If you already have a medium-heavy and want a second rod, medium is a great complement for crankbaits, topwater, and finesse. Fast action pairs well with both powers for sensitivity.",
          { type: "ul", items: [
            "One-rod setup: Medium-heavy fast—most versatile.",
            "Crankbait/topwater focus: Medium moderate or fast.",
            "Heavy cover/jigs: Medium-heavy or heavy.",
            "Finesse: Consider spinning with medium or medium-light.",
          ]},
          { type: "tip", title: "Check the Lure Rating", text: "Rod specs list lure weight range. A rod rated 1/4–3/4 oz will cast those weights best. If you fish mainly 3/8–1/2 oz, both M and MH can work—choose MH for more hook-setting power, M for lighter feel." },
          { type: "mistake", title: "Using Heavy Power for Everything", text: "Heavy and extra-heavy rods are for flipping, punching, and heavy cover. Using them for crankbaits and topwater reduces casting distance, sensitivity, and can pull trebles on the hook set. Match power to technique." },
          { type: "summary", title: "Key Takeaways", items: [
            "Medium: lighter lures, versatile; good for crankbaits and topwater.",
            "Medium-heavy: workhorse; best single-rod choice for bass.",
            "MH fast = most common all-around baitcaster setup.",
            "Pair power with lure weight and technique.",
          ]},
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
          "Proper casting technique improves accuracy, distance, and reduces wear on your rod and line. Each rod type has a unique casting motion optimized for its reel and guide design.",
          { type: "h2", text: "Spinning Rod Casting" },
          "Spinning rods use an open-face (spinning) reel with the bail open during the cast. Use your finger or thumb to control line release—lightly hold the line against the rod for accuracy. Overhead and sidearm casts both work well; let the rod load smoothly and release at the 10–11 o'clock position. Don't overpower the blank—a smooth, gradual acceleration produces better distance than a hard snap.",
          { type: "h3", text: "Spinning Tips" },
          { type: "ul", items: [
            "Use your index finger to feather the line for accuracy.",
            "Let the rod load; don't force it with a sudden jerk.",
            "Overhead cast: release at 10–11 o'clock for best arc.",
            "Sidearm cast: useful in wind or under overhanging branches.",
          ]},
          { type: "h2", text: "Casting Rod (Baitcast) Technique" },
          "Baitcast reels require thumb control on the spool to prevent backlash (overrun). Start with lighter lures and a looser spool tension until you master the motion. Use smooth, controlled acceleration—a jerk or sudden stop causes backlashes. The thumb feathers the spool as the lure slows; practice in an open area before fishing.",
          { type: "h3", text: "Baitcast Tips" },
          { type: "ul", items: [
            "Set spool tension so the lure drops slowly when released.",
            "Thumb pressure on spool controls line speed during cast.",
            "Smooth acceleration and deceleration reduce backlashes.",
            "Practice with 1/4–3/8 oz lures before going heavier.",
          ]},
          { type: "h2", text: "Surf Rod Casting" },
          "Surf rods demand two-handed techniques for maximum distance. The overhead cast uses both hands to load the rod and drive the weight forward. The pendulum cast (swinging the weight behind, then forward) generates more distance but requires practice. Match your casting weight to the rod rating.",
          { type: "tip", title: "Let the Rod Do the Work", text: "All rod types perform best when you let the blank load and unload naturally. Overpowering causes poor casts, stressed blanks, and reduced distance. Think smooth acceleration rather than a sudden snap." },
          { type: "mistake", title: "Overpowering the Cast", text: "Pushing or snapping the rod too hard doesn't increase distance—it stresses the blank, causes tailing loops, and can damage the rod. A smooth, controlled stroke that loads the rod fully produces the best results." },
          { type: "summary", title: "Key Takeaways", items: [
            "Spinning: smooth load and release; finger control for accuracy.",
            "Baitcast: thumb controls spool; smooth acceleration prevents backlash.",
            "Surf: two-handed overhead or pendulum cast for distance.",
            "Let the rod load naturally; avoid overpowering.",
          ]},
        ],
      },
      {
        id: "bass-rod-selection",
        title: "Bass Fishing Rod Selection",
        content: [
          "Choosing the right bass rod depends on technique, lure weight, and target species. A well-matched rod improves hook sets, sensitivity, and casting performance.",
          { type: "h2", text: "Largemouth Bass" },
          "For largemouth bass, a 6'6\"–7' medium-heavy fast action rod suits most techniques: Texas rig, jigs, and spinnerbaits. Use spinning gear for finesse (drop shot, wacky rig, light jigs, small soft plastics) due to lighter line and smaller lures. Use casting gear for heavier lures, flipping, punching, and crankbaits.",
          { type: "h2", text: "Smallmouth Bass" },
          "Smallmouth often prefer lighter power—medium or medium-light—and longer rods (7'–7'6\") for open-water casting and better line control. Fast action remains popular for jigs and soft plastics; moderate action can help with crankbaits and treble hooks.",
          { type: "h3", text: "Technique-Specific Recommendations" },
          { type: "ul", items: [
            "Flipping/Punching: 7'–7'6\" heavy or extra-heavy, fast; casting.",
            "Crankbait: 7'–7'6\" medium or medium-heavy, moderate action; casting.",
            "Topwater: 6'6\"–7' medium or medium-heavy, fast; casting or spinning.",
            "Drop shot/Wacky: 7' medium-light or medium, fast; spinning.",
            "Spinnerbait: 6'6\"–7' medium-heavy, fast; casting.",
          ]},
          { type: "tip", title: "Build a Technique Quiver", text: "Serious bass anglers often carry multiple rods for different techniques. A versatile starter setup: 7' medium-heavy fast casting rod for jigs and Texas rig, plus a 7' medium-light fast spinning rod for finesse. Add crankbait and topwater rods as you expand." },
          { type: "mistake", title: "One-Rod-Fits-All", text: "Using a single heavy, fast-action rod for everything—including finesse and crankbaits—reduces effectiveness. Finesse needs lighter power and spinning for light line; crankbaits benefit from moderate action to avoid pulling trebles. Match the rod to the technique." },
          { type: "summary", title: "Key Takeaways", items: [
            "Largemouth: 6'6\"–7' medium-heavy fast for most techniques.",
            "Smallmouth: lighter power, longer length, open-water use.",
            "Spinning for finesse; casting for heavy lures and power techniques.",
            "Match rod to technique—cranking, flipping, topwater each differ.",
          ]},
        ],
      },
      {
        id: "saltwater-vs-freshwater",
        title: "Saltwater vs Freshwater Rod Setup",
        content: [
          "Saltwater and freshwater rods differ in materials, power ratings, and design. Using the wrong type can lead to corrosion, poor performance, or rod failure.",
          { type: "h2", text: "Saltwater Rod Requirements" },
          "Saltwater rods need corrosion-resistant components. Guides and reel seats should use stainless steel, aluminum oxide, or coated materials that withstand salt. Blanks and hardware must be salt-rated—unprotected metals corrode quickly. Power ratings tend to be heavier for larger species (redfish, snook, tarpon, offshore). Length varies: 7'–8' for inshore boat; 9'–12'+ for surf and pier.",
          { type: "h2", text: "Freshwater Rod Characteristics" },
          "Freshwater rods can use lighter, less corrosion-resistant components. Focus is often on sensitivity for bottom contact and finesse. Travel-friendly telescopic and multi-piece rods are popular. Power ranges from ultralight (panfish) to heavy (catfish, pike).",
          { type: "h3", text: "Key Differences" },
          { type: "ul", items: [
            "Saltwater: corrosion-resistant guides/seats; heavier power; longer for surf.",
            "Freshwater: lighter components; more sensitivity; travel options common.",
            "Saltwater: rinse after use; freshwater: less maintenance.",
            "Never use freshwater-only rods in salt—corrosion risk.",
          ]},
          { type: "tip", title: "Rinse Saltwater Gear", text: "After every saltwater trip, rinse the rod (especially guides and reel seat) with fresh water. Salt accelerates corrosion on guides, reel seats, and reel internals. A quick rinse significantly extends equipment life." },
          { type: "mistake", title: "Using Freshwater Rods in Salt", text: "Freshwater rods with non-corrosion-resistant guides and seats will rust and degrade in saltwater. Even occasional use can cause pitting and line damage. If you fish both, use saltwater-rated gear or dedicated saltwater rods." },
          { type: "summary", title: "Key Takeaways", items: [
            "Saltwater: corrosion-resistant; heavier power; surf rods are long.",
            "Freshwater: sensitivity-focused; travel rods popular.",
            "Rinse saltwater gear after each use.",
            "Stock both lines for retail—different buyer expectations.",
          ]},
        ],
      },
      {
        id: "ice-fishing-basics",
        title: "Ice Fishing Rod Basics",
        content: [
          "Ice fishing rods are specialized for vertical jigging through holes in the ice. Short length, light power, and appropriate tip action are key for detecting bites and fighting fish in confined spaces.",
          { type: "h2", text: "Length and Power" },
          "Ice rods are typically 24\"–36\" long. Ultralight to light power suits panfish (bluegill, crappie, perch); medium power suits walleye and pike. Shorter rods give more direct control when jigging; longer rods can help in deeper holes or when fish run.",
          { type: "h2", text: "Tip Action and Reel Types" },
          "Stiff tips improve sensitivity for jigging—you feel subtle bites and transmit rod movement to the lure. Softer tips suit deadstick rigs and tip-ups where the rod is stationary. In-line reels (no bail) reduce line twist and tangle in cold; small spinning reels also work.",
          { type: "h3", text: "Construction and Storage" },
          "Two-piece or telescopic designs allow compact storage in tackle bags or sleds. Handle length matters: shorter handles or exposed blanks conduct less cold to your hands. EVA or foam handles insulate better than cork in freezing temps.",
          { type: "ul", items: [
            "Panfish: 24\"–28\" ultralight or light; stiff tip for jigging.",
            "Walleye: 28\"–32\" light or medium; sensitive tip.",
            "Pike: 32\"–36\" medium or medium-heavy; more backbone.",
            "Deadstick: longer, softer tip; rod rests in holder.",
          ]},
          { type: "tip", title: "Order Early for Winter", text: "Retailers: ice rods sell seasonally. Order in late summer or early fall to ensure stock before the ice season. Demand peaks in December–February in northern markets. RodsHub can advise on MOQ and lead times for seasonal inventory." },
          { type: "mistake", title: "Using Standard Rods for Ice", text: "A 6' spinning rod is unwieldy for ice fishing—too long for the hole, hard to jig precisely, and awkward in shelters. Ice rods are purpose-built for the vertical, close-quarters environment. Use dedicated ice gear." },
          { type: "summary", title: "Key Takeaways", items: [
            "24\"–36\" length; ultralight to medium power by species.",
            "Stiff tip for jigging; softer for deadstick.",
            "In-line or spinning reels; compact storage (two-piece/telescopic).",
            "Retailers: order early for seasonal demand.",
          ]},
        ],
      },
      {
        id: "beginner-tackle-essentials",
        title: "Beginner Tackle Box: Essential Lures and Rod Pairings",
        content: [
          "Forum discussions from BassResource and similar communities consistently recommend a focused starter kit rather than overwhelming new anglers. A small set of proven lures, paired with the right rods, covers most bass and panfish situations. Here is a condensed guide based on popular consensus.",
          { type: "h2", text: "Essential Lures for Beginners" },
          "Soft plastics: 5\" Senko-style worms (stickbaits) are the most recommended single lure. Rig Texas style with 3/16 oz weight for versatility. Add topwater poppers for summer mornings and spinnerbaits for covering water. With a baitcaster, stickworms (Yamamoto Senko, Yum Dinger), crankbaits, jerkbaits, and casting jigs with craw trailers round out a solid starter set.",
          { type: "h2", text: "Rod Pairings" },
          "For spinning: A 6'6\"–7' medium or medium-light fast action rod handles Senkos, light jigs, drop shot, and wacky rig. For baitcasting: 6'6\"–7' medium-heavy fast covers Texas rig, jigs, spinnerbaits, and crankbaits. Match line weight to rod rating—8–12 lb for spinning finesse, 12–17 lb for casting.",
          { type: "h3", text: "Starter Combo Suggestion" },
          { type: "ul", items: [
            "Spinning: 7' medium-light fast + 2500 reel + 8 lb fluoro—finesse.",
            "Casting: 7' medium-heavy fast + baitcaster + 12–15 lb fluoro—all-around.",
            "Lures: Senkos, spinnerbait, crankbait, topwater popper.",
            "Keep it simple; add technique-specific rods as skills grow.",
          ]},
          { type: "tip", title: "One Bait, Many Presentations", text: "A 5\" worm can be fished Texas rig, wacky rig, weightless, or on a drop shot. Master one lure and a few rigs before expanding. This approach is echoed across beginner forums." },
          { type: "mistake", title: "Buying Too Much Too Soon", text: "A tackle box full of lures you don't know how to use leads to confusion. Start with 3–5 lures and two rod setups. Learn them well; add variety once you understand when and why to switch." },
          { type: "summary", title: "Key Takeaways", items: [
            "Senkos, spinnerbait, crankbait, topwater = solid starter set.",
            "Spinning: medium-light fast for finesse; casting: medium-heavy fast for power.",
            "Keep setups simple; add rods and lures as skills grow.",
            "Forum consensus: less is more for beginners.",
          ]},
        ],
      },
      {
        id: "texas-rig-setup",
        title: "Texas Rig Setup: Sinker Weight, Line, and Rod Selection",
        content: [
          "The Texas rig is one of the most discussed setups on bass forums. Sinker weight, line choice, and rod pairing directly affect presentation and bite detection. Community threads frequently debate weight size, peg vs free-sliding, and rod specs.",
          { type: "h2", text: "Sinker Weight by Scenario" },
          "Use the lightest weight that accomplishes your goal. Shallow water (under 5 ft): 1/8 oz or weightless. Moderate depth (10–20 ft): 1/4–3/8 oz. Deep or heavy cover: 1/2 oz or more—up to 1–2 oz for punching matted grass. Cold water: start with 1/32–1/16 oz; summer: 3/16 oz common. Wind and current may require going heavier.",
          { type: "h2", text: "Line and Rod Pairing" },
          "8–12 lb fluorocarbon for finesse; 12–17 lb for standard Texas rig and heavier cover. Rod: 6'6\"–7' medium-heavy fast for most situations. Lighter power (medium) for finesse T-rig; heavy for punching. Fast action improves sensitivity and hook sets. Tungsten weights offer better feel and less bulk than lead.",
          { type: "h3", text: "Community Tips" },
          { type: "ul", items: [
            "Pegging the weight increases sensitivity and keeps it from sliding.",
            "3/16 oz is a popular all-around starting weight.",
            "Match weight to depth, cover density, and fall rate desired.",
            "Heavy mat punching: 7' heavy or extra-heavy, 1–2 oz weight.",
          ]},
          { type: "tip", title: "Vary Fall Rate", text: "Lighter weights create a slower, more horizontal fall—effective for finicky bass. Heavier weights punch through grass and get to depth faster. Have a range (1/8, 3/16, 1/4, 3/8 oz) and switch based on conditions." },
          { type: "mistake", title: "Always Using the Same Weight", text: "Fishing 3/8 oz in 5 feet of water or 1/8 oz in heavy grass reduces effectiveness. Adjust weight to depth, cover, and desired presentation speed." },
          { type: "summary", title: "Key Takeaways", items: [
            "Lightest weight that works; 3/16 oz common all-around.",
            "Shallow = 1/8 or weightless; deep/heavy cover = 1/2 oz+.",
            "Rod: medium-heavy fast; heavy for punching.",
            "Peg weight for sensitivity; tungsten for better feel.",
          ]},
        ],
      },
      {
        id: "beginner-mistakes",
        title: "Common Beginner Fishing Mistakes and How to Fix Them",
        content: [
          "Fishing forums and beginner guides repeatedly highlight the same errors. Addressing these early improves success and reduces frustration. Content draws from BassResource, NPFL, and popular tackle guides.",
          { type: "h2", text: "Rod and Reel Mistakes" },
          "Choosing rods that are too heavy or too specialized for a first setup. Start with light to medium power, fast-action spinning—6–7 feet. Avoid baitcasters initially; they have a learning curve. Wrong reel size (too big or too small for the rod) affects balance and casting. Prioritize a smooth drag system.",
          { type: "h2", text: "Line, Knots, and Tackle" },
          "Poor knots cause lost fish. Learn the Uni Knot—it covers nearly every situation. Check line tension and drag before fishing. Using wrong bait or one lure for everything reduces bites. Match bait to conditions and species. Carry a small versatile set: topwater, soft plastics, spinnerbait, crankbait. Avoid oversized tackle that hurts casting accuracy.",
          { type: "h2", text: "Technique Mistakes" },
          "Fishing too fast—bass respond to varied retrieve speeds and pauses. Don't point the rod directly at the lure; keep an angle for bite detection and shock absorption. Skipping research on location, species, and conditions leads to poor results. Fish behavior changes with weather, water temp, and time of day.",
          { type: "ul", items: [
            "Rod: light–medium, fast, spinning for first setup.",
            "Knots: master Uni Knot.",
            "Bait: match to conditions; carry variety.",
            "Technique: slow down, vary speed, keep rod at angle.",
          ]},
          { type: "tip", title: "Do Basic Research", text: "Before heading out, check target species, best times, and local conditions. A few minutes of research improves catch rates more than random trial and error." },
          { type: "mistake", title: "Ignoring Drag and Line", text: "Too-tight drag or old, nicked line causes break-offs. Set drag to about 25–30% of line strength; replace line when it shows wear." },
          { type: "summary", title: "Key Takeaways", items: [
            "Start with spinning; medium/medium-light fast rod.",
            "Learn Uni Knot; check drag and line before fishing.",
            "Match bait to conditions; don't fish too fast.",
            "Research location and species; vary retrieve.",
          ]},
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
          "The blank is the heart of a fishing rod—the tapered tube that gives the rod its action, power, and feel. Understanding how blanks are built helps buyers evaluate quality and choose the right rod for their needs.",
          { type: "h2", text: "How Blanks Are Made" },
          "Blanks are typically made by wrapping carbon fiber or fiberglass sheets around a tapered mandrel. The layers are impregnated with resin and then cured in an oven. Modulus, number of layers, and taper (how the diameter changes from butt to tip) determine the rod's action, strength, and sensitivity. Higher-quality blanks use consistent wall thickness and precise taper design.",
          { type: "h2", text: "One-Piece vs Multi-Piece" },
          "One-piece blanks offer the best performance—no ferrules, no dead spots, maximum sensitivity. Multi-piece (2–6 pieces) and telescopic rods trade some feel for portability. Each ferrule or joint can slightly reduce sensitivity and add a potential failure point. For travel and storage, multi-piece is practical; for maximum performance, one-piece is preferred.",
          { type: "h3", text: "Quality Indicators" },
          { type: "ul", items: [
            "Straight spine: the blank should be straight with no visible wobble.",
            "Consistent walls: no thin spots, bubbles, or rough areas.",
            "Clean ferrules: on multi-piece, joints should fit snugly with no play.",
            "Straight alignment: guides should line up when assembled.",
          ]},
          { type: "h3", text: "Defects to Watch For" },
          "Defects can show as wobble when the rod is flexed, weak or soft spots, cracks near ferrules, or misaligned sections. When evaluating suppliers, ask about blank source, QC process, and warranty. Reputable manufacturers test blanks before finishing.",
          { type: "tip", title: "Evaluating Suppliers", text: "Request samples before large orders. Flex the rod and check for straightness. Look at the ferrule fit on multi-piece rods. Ask where blanks are sourced—some factories make their own; others buy from specialized blank manufacturers." },
          { type: "mistake", title: "Assuming Multi-Piece Equals Lower Quality", text: "While one-piece is optimal for feel, modern multi-piece and telescopic rods can perform very well. Quality depends on blank grade, ferrule design, and assembly. Many travel rods use high-modulus blanks and precision ferrules—don't dismiss them for performance alone." },
          { type: "summary", title: "Key Takeaways", items: [
            "Blanks: carbon/fiberglass wrapped on mandrel, cured; taper determines action.",
            "One-piece: best feel; multi-piece: portable, slight trade-off in sensitivity.",
            "Quality: straight spine, consistent walls, clean ferrules.",
            "Ask suppliers about blank source, QC, and defects handling.",
          ]},
        ],
      },
      {
        id: "guide-types",
        title: "Guide Types: Fuji and Alternatives",
        content: [
          "Guides (also called eyes or line guides) route the fishing line along the rod blank from reel to tip. They affect casting distance, line wear, sensitivity, and durability. Choosing the right guides matters for both performance and cost.",
          { type: "h2", text: "Fuji Guides: The Industry Standard" },
          "Fuji is widely considered the gold standard for fishing rod guides. Their Alconite inserts offer excellent durability and smooth line flow at a mid-range price. Sic (Silicon Carbide) inserts are harder, reduce friction further, and resist grooving from braid—ideal for premium rods. Fuji guides are recognized by retailers and anglers, adding value to OEM builds.",
          { type: "h2", text: "Insert Materials Compared" },
          { type: "ul", items: [
            "Aluminum oxide: Budget-friendly, durable, adequate for mono and fluorocarbon.",
            "Alconite (Fuji): Mid-tier, excellent value, good for braid with care.",
            "SiC (Silicon Carbide): Premium, lowest friction, best for braid, most durable.",
            "Stainless steel: No insert; cheap but can groove and damage braid.",
          ]},
          { type: "h3", text: "Guide Count and Spacing" },
          "Fewer guides reduce weight but can allow line to slap the blank, especially under load. More guides distribute stress and improve line control. Spacing affects action—too many guides can stiffen the tip; too few can create dead spots. Quality rods balance count for the blank's length and action.",
          { type: "h3", text: "Braid Considerations" },
          "Braid is abrasive and can groove ceramic and aluminum oxide inserts over time. SiC and hardened ceramic (e.g., Fuji K-series) resist grooving. If your customers use braid, specify braid-rated guides to reduce returns and complaints.",
          { type: "tip", title: "OEM Specification", text: "When ordering custom rods, specify guide brand and type. \"Fuji Alconite\" or \"Fuji Sic\" is a strong selling point. Budget lines can use Fuji aluminum oxide or equivalent—still recognizable and reliable." },
          { type: "mistake", title: "Using Cheap Guides for Braid", text: "Budget stainless or low-grade ceramic guides will groove quickly with braid, creating friction and eventually cutting the line. For braid users, invest in Alconite or SiC—the cost difference is small compared to customer satisfaction." },
          { type: "summary", title: "Key Takeaways", items: [
            "Fuji Alconite and SiC are industry standards; specify for OEM.",
            "SiC best for braid; Alconite good value; aluminum oxide for budget.",
            "Guide count and spacing affect weight and line control.",
            "Braid requires harder inserts to resist grooving.",
          ]},
        ],
      },
      {
        id: "handle-materials",
        title: "Handle Materials: Cork vs EVA",
        content: [
          "The handle affects comfort, grip, balance, and aesthetics. Cork and EVA are the two most common materials; each has distinct advantages. Choosing the right handle improves the fishing experience and meets customer expectations.",
          { type: "h2", text: "Cork Handles" },
          "Cork is lightweight, has a classic look, and absorbs sweat—helping grip in warm conditions. It feels natural and is preferred for spinning and finesse rods where sensitivity and comfort matter. Cork can compress over time, especially in high-wear areas. It requires more care to keep clean. Premium rods often use high-grade cork with minimal filler.",
          { type: "h2", text: "EVA Handles" },
          "EVA (ethylene-vinyl acetate) is durable, grippy when wet, and easier to clean. It doesn't absorb water or sweat, so it stays consistent in all conditions. EVA is common on casting rods, saltwater rods, and heavy-duty applications. It's less prone to damage from hooks and fish. Some anglers find it slightly less \"warm\" than cork, but it's the practical choice for wet, muddy, or saltwater use.",
          { type: "h3", text: "Other Options" },
          "Hypalon is another synthetic option, similar to EVA in durability. Winn grip and similar materials offer a tacky feel for those who prefer it. Split grip (exposed blank between grip sections) reduces weight and shifts balance; full grip gives more hand positions and traditional feel.",
          { type: "h3", text: "OEM Customization" },
          "Handle length and diameter can be customized for hand size and technique. Longer handles suit two-handed casting (surf, flipping); shorter handles suit one-handed casting. OEM suppliers can match handle style, length, and material to your target market.",
          { type: "tip", title: "Match Handle to Application", text: "Spinning and finesse: cork for feel. Casting and heavy use: EVA for durability. Saltwater: EVA or Hypalon for corrosion and wet grip. Cold-weather (ice): shorter handles reduce heat loss from exposed blank." },
          { type: "mistake", title: "Ignoring Handle Length", text: "A handle that's too short can make two-handed casts awkward; too long can affect balance and one-handed control. Match handle length to the rod's intended use—surf rods need long handles; ice rods need short ones." },
          { type: "summary", title: "Key Takeaways", items: [
            "Cork: light, classic feel, absorbs sweat; preferred for finesse.",
            "EVA: durable, grippy when wet, easy to clean; preferred for saltwater.",
            "Split grip: lighter, different balance; full grip: more hand positions.",
            "OEM can customize length, diameter, and material.",
          ]},
        ],
      },
      {
        id: "rod-storage-care",
        title: "Rod Storage and Care",
        content: [
          "Proper storage and care extend rod life and maintain performance. Anglers and retailers both benefit from good practices—fewer returns, happier customers, and rods that perform as designed for years.",
          { type: "h2", text: "Storage Best Practices" },
          "Store rods vertically (tip up) or horizontally with supports along the length. Avoid leaning rod tips against walls or storing under tension (e.g., bent in a car). Use rod sleeves, tubes, or racks to protect guides and blanks. Don't store in hot environments (attics, car trunks in summer)—heat can weaken resin and affect action.",
          { type: "h2", text: "Travel and Transport" },
          "Use rod tubes or protective cases for travel. Hard tubes protect against impacts; soft sleeves are lighter but offer less protection. When flying, rod tubes can be checked or carried on depending on airline policy. For multi-piece rods, ensure sections are fully seated and secure before transport.",
          { type: "h3", text: "Saltwater Care" },
          "Rinse saltwater rods with fresh water after each use. Salt accelerates corrosion on guides, reel seats, and ferrules. Wipe down handles and let rods dry before storage. Pay extra attention to reel seats and guide frames.",
          { type: "h3", text: "Maintenance Checklist" },
          { type: "ul", items: [
            "Inspect guides periodically for chips, grooves, or loose frames.",
            "Check ferrules on multi-piece rods for fit and wear.",
            "Clean handles with mild soap and water; avoid harsh chemicals.",
            "Store with reel removed to reduce stress on reel seat.",
          ]},
          { type: "tip", title: "Retailer Tip", text: "Include a care card with OEM orders. Educating customers reduces returns from \"defective\" rods that were actually damaged by improper storage or transport. Simple instructions—rinse after saltwater, store with support, avoid heat—go a long way." },
          { type: "mistake", title: "Storing Rods Under Tension", text: "Leaving rods bent in rod holders, car racks, or storage systems for long periods can cause permanent set (the rod won't return to straight). Store rods straight and supported. The same applies when transporting—don't cram rods into tight spaces where they're flexed." },
          { type: "summary", title: "Key Takeaways", items: [
            "Store vertically or horizontally with supports; avoid leaning tips.",
            "Rinse saltwater rods after use; wipe and dry before storage.",
            "Use rod sleeves or tubes for travel; avoid heat and tension.",
            "Inspect guides and ferrules periodically; include care card with OEM.",
          ]},
        ],
      },
      {
        id: "carbon-rod-durability",
        title: "Why High-Modulus Carbon Rods Can Snap: Care and Handling",
        content: [
          "Forum threads on World Sea Fishing, BassResource, and Reddit periodically report carbon rods snapping during normal casting—sometimes on first use. Understanding why high-modulus blanks fail helps anglers and retailers set proper expectations and reduce warranty disputes.",
          { type: "h2", text: "Carbon Fiber and Brittleness" },
          "High-modulus graphite (IM7, IM8, IM9) is stiff and sensitive but less forgiving than fiberglass or IM6. Impact, stress concentrations, and manufacturing defects can cause catastrophic failure. A rod that snaps \"during normal cast\" may have been damaged earlier—car door, rod holder, storage—without visible signs. Micro-cracks propagate under load.",
          { type: "h2", text: "Common Causes of Failure" },
          { type: "ul", items: [
            "Impact: Car doors, ceiling fans, rod racks, stepping on the rod.",
            "Overload: Casting lures above rated weight; high-sticking (rod tip too high when fighting fish).",
            "Improper storage: Bent or tensioned for long periods; heat exposure.",
            "Defects: Rare but possible—thin wall, bad ferrule, manufacturing flaw.",
          ]},
          { type: "h2", text: "Prevention and Handling" },
          "Use rod sleeves and tubes for transport. Don't high-stick—keep rod angle below 90° when fighting fish. Stay within lure and line ratings. Store rods straight, avoid heat. Inspect blanks for nicks or soft spots. When evaluating suppliers, ask about QC and warranty policy for impact vs defect claims.",
          { type: "tip", title: "Educate Customers", text: "Retailers can reduce returns by explaining that carbon rods are performance tools requiring care. A simple care card—avoid impact, don't high-stick, use rod sleeve—helps set expectations. RodsHub OEM orders can include custom care inserts." },
          { type: "mistake", title: "Blaming the Rod Without Investigating", text: "Many \"defective\" snaps stem from prior impact. Ask the customer about storage, transport, and recent use. Manufacturing defects are rare; most failures have an identifiable cause. Document this for supplier warranty claims." },
          { type: "summary", title: "Key Takeaways", items: [
            "High-modulus carbon is sensitive but brittle; handle with care.",
            "Impact and overload cause most failures; defects are rare.",
            "Avoid car doors, high-sticking, heat; use rod sleeves.",
            "Educate customers; document failure context for warranty.",
          ]},
        ],
      },
      {
        id: "travel-rod-tradeoffs",
        title: "Travel Rod Durability: Telescopic vs Pack Rod Trade-offs",
        content: [
          "Anglers and retailers often ask which travel rod type lasts longer. Forums and outdoor communities report different experiences. Understanding the trade-offs helps buyers choose and retailers stock wisely.",
          { type: "h2", text: "Telescopic Durability Concerns" },
          "Telescopic rods have more moving parts—each ferrule can wear, stick, or develop play. Lower-end models may bind in cold or after sand/mud exposure. Sections can misalign if not extended/retracted carefully. However, quality telescopics with stainless ferrules and sealed joints hold up well. The key is buying from reputable brands and avoiding the cheapest options.",
          { type: "h2", text: "Multi-Piece Pack Rod Durability" },
          "4-piece and 6-piece pack rods have fewer failure points—just the ferrules. No collapsing mechanism to bind. Ferrules can wear over time but are generally robust if kept clean. Pack rods tend to last longer in harsh conditions (salt, sand, cold) because there's less to go wrong. Forum consensus: pack rods win on longevity for frequent travelers.",
          { type: "h3", text: "Practical Recommendations" },
          { type: "ul", items: [
            "Occasional travel, convenience priority: Quality telescopic.",
            "Frequent travel, performance priority: 4-piece pack rod.",
            "Saltwater/sand: Pack rod preferred—fewer parts to corrode or bind.",
            "Budget: Either can work; avoid bottom-tier telescopics.",
          ]},
          { type: "tip", title: "Retailer Stocking", text: "Carry both. Budget telescopics for impulse and gift buyers. Mid-tier 4-piece travel rods for serious anglers. RodsHub offers both designs; contact for MOQ and lead times by category." },
          { type: "mistake", title: "Treating Telescopics Like One-Piece Rods", text: "Telescopics need occasional maintenance—wipe ferrules, don't force stuck sections, extend fully before casting. Mishandling (yanking sections, storing dirty) shortens life. Pack rods are more forgiving but still benefit from clean ferrules." },
          { type: "summary", title: "Key Takeaways", items: [
            "Telescopic: more parts, can stick or wear; quality matters.",
            "Pack rod: fewer parts, generally more durable long-term.",
            "Salt/sand: pack rod preferred.",
            "Maintain ferrules; avoid forcing stuck telescopic sections.",
          ]},
        ],
      },
    ],
  },
  {
    id: "community-favorites",
    title: "Community Favorites",
    description: "Popular topics from fishing forums and angler discussions.",
    blocks: [
      {
        id: "one-lure-hypothetical",
        title: "If You Could Only Use One Lure: What Experienced Anglers Say",
        content: [
          "The \"if you had to pick one bait\" question generates hundreds of replies on BassResource and similar forums. While answers vary by region and technique, a few options consistently rise to the top. Retailers can use this to prioritize stock and guide beginners.",
          { type: "h2", text: "Most Common Answers" },
          "Soft plastic worms (5\"–6\" stickbaits, Texas rig) are the runaway favorite. Senko-style baits, rigged weightless or with 3/16 oz, work in almost every condition. They catch bass in grass, wood, open water, and pressured fisheries. Second place often goes to spinnerbaits—versatile, cover water fast, work in stained water. Jigs and crankbaits also get votes for specific scenarios.",
          { type: "h2", text: "Rod Pairing for the \"One Lure\" Setup" },
          "For a worm-only or worm-primary setup: 6'6\"–7' medium-heavy fast casting rod, or 7' medium-light fast spinning for finesse worms. This covers Texas rig, weightless, and light Carolina rig. Match line to conditions—10–17 lb fluoro typical. One rod, one reel, one or two lure types—many forum members fish this minimal setup with great success.",
          { type: "h3", text: "Why It Matters for Retail" },
          "Beginners and minimalists want a simple recommendation. Stocking 5\" Senkos and a matched rod/reel combo addresses the most common \"one lure\" answer. Highlight versatility—Texas rig, wacky, weightless—to maximize perceived value.",
          { type: "tip", title: "Bundle for Beginners", text: "Create a \"one lure starter kit\": 7' medium-heavy fast rod, 2500–3000 reel, 12 lb fluoro, and a pack of 5\" worms. Market it as \"everything you need to catch bass.\" RodsHub can supply rods for such bundles; MOQ from 30 pcs." },
          { type: "mistake", title: "Ignoring Regional Preferences", text: "In some regions, jigs or crankbaits win the \"one lure\" vote. Match your catalog to local forums and fisheries. A Northern pike angler's pick differs from a Florida bass angler's." },
          { type: "summary", title: "Key Takeaways", items: [
            "Soft plastic worms (Senko-style) most common \"one lure\" choice.",
            "Spinnerbait, jig, crankbait also popular; varies by region.",
            "Rod: medium-heavy fast casting or medium-light fast spinning.",
            "Bundle worm + rod for beginner/minimalist market.",
          ]},
        ],
      },
      {
        id: "targeting-big-bass",
        title: "How to Target Bigger Bass: Rod and Technique Upgrades",
        content: [
          "\"How do you catch really big bass?\" is a perennial forum topic. Answers cover location, timing, bait size, and—importantly—rod and line upgrades. Bigger bass demand heavier tackle and different presentations than typical 2–3 lb fish.",
          { type: "h2", text: "Rod Upgrades for Big Bass" },
          "Move up in power: medium-heavy to heavy for main setups. Longer rods (7'–7'6\") help with casting distance and leverage when fighting. Fast or extra-fast action for solid hook sets with large single-hook baits (jigs, Texas rig, creature baits). Consider dedicated big-bait rods for swimbaits and glide baits—these run 7'6\"+ and heavy or extra-heavy power.",
          { type: "h2", text: "Line and Technique Shifts" },
          "Heavier line (15–25 lb fluoro, or 30–50 lb braid with leader) handles big fish in cover. Larger baits—6\"+ worms, bigger jigs, swimbaits—select for bigger bass. Slower presentations often outperform—big bass are less chase-oriented. Night and low-light fishing increase big-fish activity in many fisheries.",
          { type: "h3", text: "Forum Consensus" },
          { type: "ul", items: [
            "Rod: 7'+ heavy or medium-heavy fast; dedicated swimbait rod for big baits.",
            "Line: 15–25 lb; braid + leader for heavy cover.",
            "Bait: upsize—6\" worms, 3/4 oz+ jigs, swimbaits.",
            "Presentation: slow down; focus on structure and prime times.",
          ]},
          { type: "tip", title: "Stock Big-Bass Gear", text: "Carry heavy and extra-heavy rods for anglers targeting trophies. Swimbaits and big jigs drive rod sales in bass-heavy regions. RodsHub has heavy-power casting and surf rods suitable for big-bass applications." },
          { type: "mistake", title: "Using Finesse Gear for Big-Bass Hunting", text: "Light line and medium-power rods work for numbers but risk losing trophies in cover. Upsize rod, line, and bait when specifically targeting big bass. Match the tool to the goal." },
          { type: "summary", title: "Key Takeaways", items: [
            "Heavier power (MH–H), longer length for big bass.",
            "Larger baits and heavier line (15–25 lb).",
            "Slow presentations; focus on structure and timing.",
            "Dedicated swimbait rods for large soft baits.",
          ]},
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
          "Selecting the right fishing rod supplier is critical for retailers and wholesalers. Quality, flexibility, and reliability directly affect your inventory, margins, and customer satisfaction. Here is a structured approach to supplier evaluation.",
          { type: "h2", text: "Quality Factors" },
          "Assess product quality across blanks, guides, handles, and reel seats. Request samples before committing to large orders. Inspect blank straightness, guide alignment, and handle finish. Check if components (e.g., Fuji guides, quality cork) meet your standards. Ask about blank source and manufacturing QC.",
          { type: "h2", text: "MOQ and Flexibility" },
          "Minimum order quantity (MOQ) varies by factory and product type. Spinning and telescopic rods often have MOQs of 50–200 pcs; casting and surf may start at 30–100. Custom OEM typically requires 100–500 pcs per SKU. Ask if mixed cartons across SKUs are allowed to meet MOQ.",
          { type: "h2", text: "Logistics and Terms" },
          "Verify lead times for production and shipping. Check support for air and sea freight, FOB/CIF terms, and export documentation. Express air freight may be available for urgent orders. Clarify payment terms—T/T is common; L/C for larger orders.",
          { type: "h3", text: "OEM and Certifications" },
          "If you need private label, confirm OEM capability: custom length, power, action, branding, and packaging. Request prototype timelines (typically 7–14 days). For EU and other markets, ask about CE and other certifications.",
          { type: "ul", items: [
            "Product quality: blanks, guides, handles; request samples.",
            "MOQ flexibility: 30–500 pcs depending on type; mixed cartons?",
            "Lead time: production + shipping; air vs sea.",
            "OEM: branding, packaging, custom specs.",
            "Certifications: CE, export documentation.",
          ]},
          { type: "tip", title: "Start with Samples", text: "Order samples before placing large orders. Test rods in real conditions if possible. Compare blank sensitivity, guide quality, and handle comfort. RodsHub provides samples and handles quality control for all listed suppliers." },
          { type: "mistake", title: "Choosing on Price Alone", text: "The cheapest supplier may use inferior blanks, budget guides, or inconsistent QC. Returns and customer complaints cost more than paying a bit extra for verified quality. Balance price with quality and reliability." },
          { type: "summary", title: "Key Takeaways", items: [
            "Evaluate quality (blanks, guides, handles); request samples.",
            "Check MOQ, lead time, and OEM capability.",
            "Verify logistics, payment terms, and certifications.",
            "RodsHub aggregates vetted manufacturers; 24h reply on all inquiries.",
          ]},
        ],
      },
      {
        id: "manufacturing",
        title: "Fishing Rod Manufacturing Process",
        content: [
          "Understanding how fishing rods are made helps buyers evaluate quality and communicate effectively with suppliers. The process combines material science, precision wrapping, and hand finishing.",
          { type: "h2", text: "Blank Production" },
          "Blanks are the core of the rod. Carbon or graphite sheets are wrapped around a mandrel (rod-shaped form) in layers. Modulus, layup pattern, and taper determine action and strength. The wrapped blank is cured in an oven. Higher-quality blanks use consistent wall thickness and straight spine; defects show as wobble or weak spots.",
          { type: "h2", text: "Guide and Handle Assembly" },
          "Guides (Fuji Alconite, SiC, or equivalents) are positioned along the blank and secured with thread wraps and epoxy. Handle materials—cork, EVA, or Hypalon—are fitted over the butt section. Reel seats are aligned and glued. Each step affects balance, action, and durability.",
          { type: "h2", text: "Quality Control" },
          "Final QC checks length, straightness, guide alignment, and action. Rods may be flex-tested to verify power and action match specs. Defects (cracks, misaligned guides, rough finish) are rejected.",
          { type: "h3", text: "OEM and Customization" },
          "OEM options include custom length, power, action, materials, branding, and packaging. Prototypes typically take 7–14 days. Production lead time depends on order size—small batches may be 2–4 weeks; large runs 4–8 weeks. Express air freight is available for urgent orders.",
          { type: "ul", items: [
            "Blanks: carbon/fiberglass wrapped on mandrel, cured.",
            "Guides: wrapped and epoxied; Fuji or equivalent.",
            "Handles: cork or EVA; reel seat fitted.",
            "QC: length, straightness, action verified.",
            "OEM: custom specs, branding, packaging.",
          ]},
          { type: "tip", title: "Ask About Blank Source", text: "When evaluating suppliers, ask where blanks are sourced. In-house blank production indicates higher control; outsourced blanks can be good but require verification. Consistent quality across batches is a sign of solid manufacturing." },
          { type: "mistake", title: "Assuming All Factories Are Equal", text: "Quality varies widely. Some factories cut corners on epoxy, guide placement, or blank selection. Request samples and inspect them. Poorly wrapped guides or uneven epoxy indicate weak QC." },
          { type: "summary", title: "Key Takeaways", items: [
            "Blanks: wrapped on mandrel, cured; modulus and taper set action.",
            "Guides and handles assembled; QC checks length, straightness.",
            "OEM: custom specs, branding; prototypes 7–14 days.",
            "Verify blank source and QC when evaluating suppliers.",
          ]},
        ],
      },
      {
        id: "private-label-guide",
        title: "Private Label Fishing Rod Guide",
        content: [
          "Private label (OEM) fishing rods let you sell products under your own brand. Tackle shops, online retailers, and regional brands use OEM to differentiate their catalog and build brand loyalty. Here is a practical guide to getting started.",
          { type: "h2", text: "Define Your Specs" },
          "Start with target species and techniques. Define length, power, action, and materials (modulus, blank type). Choose blank and components (guides, handle, reel seat). Specify line and lure weight ratings. Clear specs reduce back-and-forth and ensure the finished rod matches your vision.",
          { type: "h2", text: "Branding and Packaging" },
          "Add your logo to the rod (shrink sleeve, butt cap, or blank print). Design rod sock, tube, and carton packaging. Many OEM suppliers include packaging design in the service. Ensure packaging meets your market's expectations for retail display.",
          { type: "h2", text: "MOQ and Lead Time" },
          "Minimum order is typically 100–500 pcs per SKU. Higher volume lowers unit cost. Lead time is usually 4–8 weeks from confirmed order to shipment. Prototypes take 7–14 days. Plan inventory and cash flow accordingly.",
          { type: "h3", text: "Ideal Use Cases" },
          "Private label works well for tackle shops wanting house brands, online retailers building DTC lines, and regional brands expanding catalog. RodsHub handles design coordination, samples, and quality control for OEM projects.",
          { type: "ul", items: [
            "Define specs: length, power, action, materials, components.",
            "Add logo and packaging; design rod sock and carton.",
            "MOQ: 100–500 pcs per SKU; lead time 4–8 weeks.",
            "Prototypes: 7–14 days; plan inventory in advance.",
          ]},
          { type: "tip", title: "Start with One or Two SKUs", text: "Launch with a versatile all-around rod (e.g., 7' medium-fast spinning) and one niche option (e.g., travel or ice). Test market response before expanding. This limits upfront investment and inventory risk." },
          { type: "mistake", title: "Skipping the Prototype", text: "Never approve production without a prototype. Specs on paper can differ from the finished product. Check action, balance, and finish in person. Adjust before locking the order." },
          { type: "summary", title: "Key Takeaways", items: [
            "Define specs clearly: length, power, action, materials.",
            "Add branding and packaging; MOQ 100–500 pcs.",
            "Lead time 4–8 weeks; prototypes 7–14 days.",
            "RodsHub handles OEM coordination and samples.",
          ]},
        ],
      },
      {
        id: "moq-guide",
        title: "MOQ Guide for Fishing Rod Wholesale",
        content: [
          "Minimum order quantity (MOQ) is the smallest number of units a supplier will produce or ship per order. Understanding MOQ helps retailers and wholesalers plan inventory, meet budget constraints, and negotiate effectively.",
          { type: "h2", text: "Typical MOQs by Product Type" },
          "MOQ varies by product type and factory. Spinning and telescopic rods often have MOQs of 50–200 pcs. Casting and surf rods may start at 30–100 pcs. Custom OEM typically requires 100–500 pcs per SKU. Higher volume generally means lower unit cost.",
          { type: "h2", text: "Strategies to Meet MOQ" },
          "Split orders across multiple SKUs to reach the minimum. For example, order 50 of one spinning rod and 50 of another to meet a 100-pc total. Ask if suppliers allow mixed cartons (different models in one shipment). Some factories offer lower MOQ on catalog items versus custom.",
          { type: "h2", text: "Payment and Terms" },
          "Payment terms affect cash flow. T/T (wire transfer) is common—often 30% deposit, 70% before shipment. L/C (letter of credit) is used for larger orders. Confirm terms before placing orders.",
          { type: "h3", text: "RodsHub MOQ" },
          "RodsHub offers MOQ from 30 pcs on selected lines. We aggregate multiple manufacturers, so MOQ flexibility varies by product. Contact us for current MOQ by category and SKU.",
          { type: "ul", items: [
            "Spinning/telescopic: 50–200 pcs; casting/surf: 30–100.",
            "Custom OEM: 100–500 pcs per SKU.",
            "Split across SKUs or mixed cartons to meet minimum.",
            "T/T common; L/C for larger orders.",
          ]},
          { type: "tip", title: "Negotiate Mixed Cartons", text: "If MOQ is 100 pcs per model but you want variety, ask if you can order 25 each of four models in one mixed carton. Not all suppliers allow this, but it is common for catalog items." },
          { type: "mistake", title: "Ordering at MOQ Without a Plan", text: "Meeting MOQ just to get the lowest price can lead to excess inventory if you overestimate demand. Start with quantities you can sell within a season. Reorder when stock runs low." },
          { type: "summary", title: "Key Takeaways", items: [
            "MOQ varies: 30–500 pcs depending on type and factory.",
            "Split orders or mixed cartons to meet minimum.",
            "Higher volume = lower unit cost; balance with inventory risk.",
            "RodsHub MOQ from 30 pcs on selected lines.",
          ]},
        ],
      },
      {
        id: "market-trends",
        title: "Fishing Rod Market Trends",
        content: [
          "The fishing rod market is evolving. Retailers and wholesalers who understand current trends can stock the right mix of products and position themselves for growth. Here are the key trends shaping the industry.",
          { type: "h2", text: "Telescopic and Travel Rods" },
          "Demand for collapsible and multi-piece travel rods is rising. Urban anglers, fly-in trips, and compact storage drive this segment. Quality has improved—good travel rods now rival one-piece performance. Stock a range of lengths and powers for different species.",
          { type: "h2", text: "Carbon Modulus and Mid-Price Premium" },
          "IM8 and higher modulus blanks are increasingly available at mid-price points. Anglers expect better sensitivity without paying top-tier prices. Retailers should offer a mix of IM6 (entry), IM7 (mid), and IM8 (premium) to cover all segments.",
          { type: "h2", text: "Sustainability and E-Commerce" },
          "Recyclable packaging, reduced plastic, and eco-conscious materials are becoming selling points. E-commerce drives direct-to-consumer (DTC) and private label growth. Online retailers need strong product content, images, and specs.",
          { type: "h3", text: "Regional Preferences" },
          "North America: bass and ice fishing strong; medium-heavy fast action and ice rods in demand. Europe: carp and match fishing; longer rods, delicate tips. Asia: lure and boat fishing; compact and telescopic popular. Stock versatile rods plus niche lines for your region.",
          { type: "ul", items: [
            "Travel/telescopic: growing; urban, fly-in, storage.",
            "IM8+ at mid-price: sensitivity expectations rising.",
            "Sustainability: packaging, materials.",
            "E-commerce: DTC, private label, strong content.",
          ]},
          { type: "tip", title: "Stock Versatile Plus Niche", text: "Carry all-around rods (e.g., 6'6\"–7' medium-fast) for general use, plus niche lines (travel, ice, surf) for specialized buyers. This balances inventory turnover with margin on specialty items." },
          { type: "mistake", title: "Ignoring Regional Differences", text: "A catalog that works in North America may not fit European or Asian preferences. Carp rods, match rods, and boat rods vary by region. Adapt your mix to local demand." },
          { type: "summary", title: "Key Takeaways", items: [
            "Travel/telescopic rods growing; quality improving.",
            "IM8+ at mid-price; sustainability and e-commerce rising.",
            "Regional trends: bass/ice (NA), carp/match (EU), lure (Asia).",
            "RodsHub tracks trends and advises on catalog mix.",
          ]},
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
  { title: "Travel Rods: Telescopic vs Multi-Piece", slug: "telescopic-vs-multipiece" },
  { title: "If You Could Only Use One Lure", slug: "one-lure-hypothetical" },
  { title: "Bass Fishing Rod Selection", slug: "bass-rod-selection" },
  { title: "Guide Types: Fuji and Alternatives", slug: "guide-types" },
  { title: "How to Choose a Fishing Rod Supplier", slug: "supplier-selection" },
  { title: "MOQ Guide for Fishing Rod Wholesale", slug: "moq-guide" },
] as const;
