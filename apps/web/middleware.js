import { NextResponse } from "next/server";
import cacheHandler from "./cache-handler";
import {getData} from './utils'

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
  const { nextUrl } = request;
  const { pathname } = nextUrl;
  console.log("🚀 ~ middleware ~ pathname:", pathname)
  const cache = new cacheHandler();

  const cacheSubdomain = await cache.get("subdomain");
  console.log("🚀 ~ middleware ~ cacheSubdomain:", cacheSubdomain)
  if (!cacheSubdomain) {
   await getData()
  }

  if (pathname !== '/home') {
    return NextResponse.redirect(new URL('/home', request.url));
  }
  return NextResponse.next();
}
