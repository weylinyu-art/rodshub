/**
 * 点击追踪 Worker - POST /track 上报点击，GET /counts 获取全站点击数
 * 部署: cd worker && npx wrangler deploy
 */

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function jsonResponse(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...CORS_HEADERS },
  });
}

function corsPreflight() {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}

export default {
  async fetch(request: Request, env: { COUNTS: KVNamespace }): Promise<Response> {
    if (request.method === "OPTIONS") return corsPreflight();

    const url = new URL(request.url);
    const path = url.pathname.replace(/\/$/, "") || "/";

    if (path === "/track" && request.method === "POST") {
      try {
        const body = (await request.json()) as { key?: string };
        const key = String(body?.key ?? "").trim().slice(0, 100);
        if (!key) return jsonResponse({ ok: false, error: "Missing key" }, 400);

        const current = await env.COUNTS.get(key);
        const next = (parseInt(current ?? "0", 10) + 1).toString();
        await env.COUNTS.put(key, next);
        return jsonResponse({ ok: true });
      } catch (e) {
        return jsonResponse({ ok: false, error: String(e) }, 500);
      }
    }

    if (path === "/counts" && request.method === "GET") {
      try {
        const counts: Record<string, number> = {};
        let cursor: string | undefined;
        do {
          const list = await env.COUNTS.list({ limit: 1000, cursor });
          for (const k of list.keys) {
            const v = await env.COUNTS.get(k.name);
            counts[k.name] = parseInt(v ?? "0", 10);
          }
          cursor = list.list_complete ? undefined : list.cursor;
        } while (cursor);
        return jsonResponse(counts);
      } catch (e) {
        return jsonResponse({ error: String(e) }, 500);
      }
    }

    return jsonResponse({ error: "Not found" }, 404);
  },
};
