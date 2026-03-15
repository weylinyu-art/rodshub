/**
 * 从构建时生成的 data/products.generated.ts 加载产品数据
 * 数据由 scripts/csv-to-products.mjs 从 data/products.csv 生成
 * 支持批量上新：编辑 CSV 后运行 npm run build 或 npm run dev
 */

export interface CsvSkuRow {
  parentSku: string;
  subSku: string;
  type: string;
  lengthInch: number;
  collapsedDimensions: string;
  weightG: number;
  title: string;
}

export interface CsvProductData {
  rows: CsvSkuRow[];
  shortTitles: Record<string, string>;
  displayPrices: Record<string, string>;
}

function tryLoadGenerated(): CsvProductData | null {
  try {
    const gen = require("../data/products.generated") as {
      ROWS?: CsvSkuRow[];
      SHORT_TITLES?: Record<string, string>;
      DISPLAY_PRICES?: Record<string, string>;
    };
    if (gen?.ROWS?.length) {
      return {
        rows: gen.ROWS,
        shortTitles: gen.SHORT_TITLES ?? {},
        displayPrices: gen.DISPLAY_PRICES ?? {},
      };
    }
  } catch {
    /* generated file may not exist */
  }
  return null;
}

let cached: CsvProductData | null | undefined;

export function loadProductsCsv(): CsvProductData | null {
  if (cached !== undefined) return cached;
  cached = tryLoadGenerated();
  return cached;
}
