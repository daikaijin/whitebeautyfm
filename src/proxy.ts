import { auth, isAllowedAdminEmail } from "@/auth";
import {
  NextResponse,
  type NextFetchEvent,
  type NextRequest,
} from "next/server";
import type { NextAuthRequest } from "next-auth";

const PRIVATE_CACHE = "private, no-store, max-age=0, must-revalidate";

function privateHeaders(response: NextResponse) {
  response.headers.set("Cache-Control", PRIVATE_CACHE);
  response.headers.set("CDN-Cache-Control", "no-store");
  response.headers.set("Vercel-CDN-Cache-Control", "no-store");
  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  return response;
}

const handle = auth((req: NextAuthRequest, event: NextFetchEvent) => {
  void event;
  const { pathname } = req.nextUrl;
  if (pathname === "/admin/login") {
    return privateHeaders(NextResponse.next());
  }

  if (!isAllowedAdminEmail(req.auth?.user?.email)) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    url.search = "";
    return privateHeaders(NextResponse.redirect(url));
  }

  return privateHeaders(NextResponse.next());
});

export default async function proxy(request: NextRequest, event: NextFetchEvent) {
  try {
    return await handle(request, event);
  } catch {
    console.error("admin proxy failed");
    if (request.nextUrl.pathname === "/admin/login") {
      return privateHeaders(NextResponse.next());
    }
    return privateHeaders(
      NextResponse.redirect(new URL("/admin/login", request.url)),
    );
  }
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
