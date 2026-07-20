import type { AuthSession } from "@/store/features/auth/authModels";
import {
  ACCESS_TOKEN_COOKIE,
  ADMIN_PROFILE_KEY,
  getAccessTokenMaxAgeSeconds,
} from "./authTokens";

function isBrowser() {
  return typeof window !== "undefined";
}

function getSecureCookieAttribute() {
  return window.location.protocol === "https:" ? "; Secure" : "";
}

export function getStoredAccessToken() {
  if (!isBrowser()) return null;

  return window.localStorage.getItem(ACCESS_TOKEN_COOKIE);
}

export function getStoredAuthSession(): AuthSession | null {
  if (!isBrowser()) return null;

  const accessToken = getStoredAccessToken();
  const rawProfile = window.localStorage.getItem(ADMIN_PROFILE_KEY);

  if (!accessToken || !rawProfile) return null;

  try {
    const profile = JSON.parse(rawProfile) as Pick<AuthSession, "email" | "fullName">;
    syncAccessTokenCookie(accessToken);

    return {
      accessToken,
      email: profile.email,
      fullName: profile.fullName,
    };
  } catch {
    return null;
  }
}

export function storeAuthSession(session: AuthSession) {
  if (!isBrowser()) return;

  window.localStorage.setItem(ACCESS_TOKEN_COOKIE, session.accessToken);
  window.localStorage.setItem(
    ADMIN_PROFILE_KEY,
    JSON.stringify({ email: session.email, fullName: session.fullName })
  );
  syncAccessTokenCookie(session.accessToken);
}

export function clearStoredAuthSession() {
  if (!isBrowser()) return;

  window.localStorage.removeItem(ACCESS_TOKEN_COOKIE);
  window.localStorage.removeItem(ADMIN_PROFILE_KEY);
  clearAccessTokenCookie();
}

export function syncAccessTokenCookie(accessToken: string) {
  if (!isBrowser()) return;

  const maxAge = getAccessTokenMaxAgeSeconds(accessToken);
  const secure = getSecureCookieAttribute();

  document.cookie = `${ACCESS_TOKEN_COOKIE}=${encodeURIComponent(
    accessToken
  )}; Path=/; Max-Age=${maxAge}; SameSite=Lax${secure}`;
}

function clearAccessTokenCookie() {
  document.cookie = `${ACCESS_TOKEN_COOKIE}=; Path=/; Max-Age=0; SameSite=Lax`;
}
