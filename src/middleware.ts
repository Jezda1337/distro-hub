import { type NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "./lib/auth";

export async function middleware(req: NextRequest) {
  const { nextUrl, cookies, url } = req;

  const jwt = cookies.get("DistroHub-token")?.value;

  const verifiedToken =
    jwt && (await verifyAuth(jwt).catch((err) => console.error(err)));

  if (nextUrl.pathname.startsWith("/auth/login") && !verifiedToken) return;

  if (url.includes("/auth/login") && verifiedToken)
    return NextResponse.redirect(new URL("/dashboard/admin", url));

  if (url.includes("/dashboard") && !verifiedToken) {
    return NextResponse.redirect(new URL("/auth/login", url));
  }

  if (nextUrl.pathname.startsWith("/dashborad") && !verifiedToken)
    return NextResponse.redirect(new URL("/auth/login", url));
}

export const config = {
  matcher: ["/auth/login", "/dashboard/:path*"],
};
