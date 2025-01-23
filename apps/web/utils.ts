
import cacheHandler from './cache-handler'

export async function  getData (){

  const cache = new cacheHandler();
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