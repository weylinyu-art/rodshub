import type { ReactNode } from "react";
import type { InsightContentItem } from "@/lib/insights";

interface InsightContentRendererProps {
  content: InsightContentItem[];
  /** 在正文第 N 个内容块后嵌入的组件（如产品推荐），避免文尾广告感 */
  embeddedAfter?: { index: number; component: ReactNode };
}

export default function InsightContentRenderer({
  content,
  embeddedAfter,
}: InsightContentRendererProps) {
  const embedIndex = embeddedAfter?.index ?? -1;

  return (
    <div className="space-y-4 text-gray-600 leading-relaxed">
      {content.map((item, i) => (
        <div key={i} className="space-y-4">
          <ContentBlock item={item} />
          {embeddedAfter && i === embedIndex && (
            <div className="my-8">
              {embeddedAfter.component}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function ContentBlock({ item }: { item: InsightContentItem }) {
  if (typeof item === "string") {
    return <p>{item}</p>;
  }
  switch (item.type) {
    case "h2":
      return (
        <h2
          id={item.text.toLowerCase().replace(/\s+/g, "-")}
          className="mt-8 mb-3 text-xl font-bold text-gray-900 border-b border-gray-200 pb-2"
        >
          {item.text}
        </h2>
      );
    case "h3":
      return (
        <h3 className="mt-6 mb-2 text-lg font-semibold text-gray-900">
          {item.text}
        </h3>
      );
    case "ul":
      return (
        <ul className="list-disc list-inside space-y-2 pl-2">
          {item.items.map((li, j) => (
            <li key={j}>{li}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="list-decimal list-inside space-y-2 pl-2">
          {item.items.map((li, j) => (
            <li key={j}>{li}</li>
          ))}
        </ol>
      );
    case "tip":
      return (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50/50 p-4">
          <p className="font-semibold text-emerald-800 mb-2">💡 {item.title}</p>
          <p className="text-gray-700">{item.text}</p>
        </div>
      );
    case "mistake":
      return (
        <div className="rounded-lg border border-amber-200 bg-amber-50/50 p-4">
          <p className="font-semibold text-amber-800 mb-2">⚠️ {item.title}</p>
          <p className="text-gray-700">{item.text}</p>
        </div>
      );
    case "summary":
      return (
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
          {item.title && (
            <p className="font-semibold text-gray-900 mb-2">{item.title}</p>
          )}
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            {item.items.map((s, j) => (
              <li key={j}>{s}</li>
            ))}
          </ul>
        </div>
      );
    default:
      return null;
  }
}
