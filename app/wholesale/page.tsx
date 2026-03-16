import { redirect } from "next/navigation";

export const dynamic = "force-static";

/** /wholesale → 服务端重定向到 /trending，搜索引擎可正确跟随 */
export default function WholesalePage() {
  redirect("/trending");
}
