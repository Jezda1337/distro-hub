import { type NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "./lib/auth";

export async function middleware(req: NextRequest) {
  const { nextUrl, cookies, url } = req;

  const jwt = cookies.get("DistroHub-token")?.value;

  const verifiedToken =
    jwt && (await verifyAuth(jwt).catch((err) => console.error(err)));

  if (nextUrl.pathname.startsWith("/auth/login") && !verifiedToken) return;

  if (url.includes("/auth/login") && verifiedToken)
    return NextResponse.redirect(new URL("/waiting-list", url));

  if (url.includes("/waiting-list") && !verifiedToken) {
    console.log("test");
    return NextResponse.redirect(new URL("/auth/login", url));
  }

  if (nextUrl.pathname.startsWith("/waitingList") && !verifiedToken)
    return NextResponse.redirect(new URL("/auth/login", url));
}

export const config = {
  matcher: ["/auth/login", "/waiting-list"],
};
