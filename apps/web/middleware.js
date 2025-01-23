import { NextResponse } from "next/server";
import cacheHandler from "./cache-handler";

// This function can be marked `async` if using `await` inside
export async function middleware() {
  const cache = new cacheHandler();

  const cacheSubdomain = await cache.get("subdomain");
  if (!cacheSubdomain) {
    const data = await fetch(
      "https://release.katana-api.1m.app/subdomain/user",
      {
        headers: {
          from: "szy-server",
        },
      }
    );
    const dataJson = await data.json();
    await cache.set("subdomain", JSON.stringify(dataJson.data.items), {
      tags: ["tag1", "tag2"],
    });
  }

  return NextResponse.next();
}
