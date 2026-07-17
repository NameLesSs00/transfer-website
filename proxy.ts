import { NextResponse } from "next/server";

export function proxy() {
  // TODO: Re-enable this guard when the backend auth flow is ready.
  // const ACCESS_TOKEN_COOKIE = "transfer_admin_access_token";
  // const ADMIN_LOGIN_PATH = "/admin/login";
  // const ADMIN_DASHBOARD_PATH = "/admin/dashboard";
  //
  // const { pathname } = request.nextUrl;
  // const hasAccessToken = Boolean(request.cookies.get(ACCESS_TOKEN_COOKIE)?.value);
  //
  // if (pathname === ADMIN_LOGIN_PATH && hasAccessToken) {
  //   return NextResponse.redirect(new URL(ADMIN_DASHBOARD_PATH, request.url));
  // }
  //
  // if (pathname.startsWith("/admin") && pathname !== ADMIN_LOGIN_PATH && !hasAccessToken) {
  //   return NextResponse.redirect(new URL(ADMIN_LOGIN_PATH, request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
