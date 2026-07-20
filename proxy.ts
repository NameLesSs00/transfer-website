import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  ACCESS_TOKEN_COOKIE,
  ACCESS_TOKEN_REFRESH_BUFFER_SECONDS,
  getJwtExpiresAt,
  REFRESH_TOKEN_COOKIE,
} from "@/lib/authTokens";

const ADMIN_LOGIN_PATH = "/admin/login";
const ADMIN_DASHBOARD_PATH = "/admin/dashboard";

function hasUsableAccessToken(accessToken: string | undefined) {
  if (!accessToken) return false;

  const expiresAt = getJwtExpiresAt(accessToken);
  if (!expiresAt) return true;

  return expiresAt - Date.now() > ACCESS_TOKEN_REFRESH_BUFFER_SECONDS * 1000;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get(ACCESS_TOKEN_COOKIE)?.value;
  const hasRefreshToken = Boolean(request.cookies.get(REFRESH_TOKEN_COOKIE)?.value);
  const hasSession = hasUsableAccessToken(accessToken) || hasRefreshToken;

  if (pathname === ADMIN_LOGIN_PATH && hasSession) {
    return NextResponse.redirect(new URL(ADMIN_DASHBOARD_PATH, request.url));
  }

  if (pathname.startsWith("/admin") && pathname !== ADMIN_LOGIN_PATH && !hasSession) {
    return NextResponse.redirect(new URL(ADMIN_LOGIN_PATH, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
