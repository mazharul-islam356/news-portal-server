import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const ID_RE = /^[a-f0-9]{24}$/i;

export async function proxy(request) {
  const { pathname } = request.nextUrl;

  // Only the single news detail segment is handled here.
  const match = pathname.match(/^\/news\/([^/]+)$/);
  if (!match) return NextResponse.next();

  const [, segment] = match;

  // Slug-based URLs pass straight through. Only legacy /news/{id} links redirect.
  if (!ID_RE.test(segment)) return NextResponse.next();

  try {
    const res = await fetch(`${API_URL}/news/${segment}`, {
      cache: "no-store",
    });

    if (res.ok) {
      const data = await res.json();
      if (data?.slug && data.slug !== segment) {
        // Permanent redirect so search engines move to the canonical slug URL.
        return NextResponse.redirect(
          new URL(`/news/${data.slug}`, request.url),
          308,
        );
      }
    }
  } catch (err) {
    console.error("News slug redirect lookup failed:", err);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/news/:path*",
};