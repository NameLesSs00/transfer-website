import { apiRequest, ApiResponse } from "@/lib/apiClient";
import { AuthSession, LoginRequest, UpdatePasswordPayload } from "./authModels";

const ACCESS_TOKEN_KEY = "transfer_admin_access_token";
const REFRESH_TOKEN_KEY = "transfer_admin_refresh_token";
const ADMIN_PROFILE_KEY = "transfer_admin_profile";
const AUTH_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

function isBrowser() {
  return typeof window !== "undefined";
}

export function getStoredAuthSession(): AuthSession | null {
  if (!isBrowser()) return null;

  const accessToken = window.localStorage.getItem(ACCESS_TOKEN_KEY);
  const refreshToken = window.localStorage.getItem(REFRESH_TOKEN_KEY);
  const rawProfile = window.localStorage.getItem(ADMIN_PROFILE_KEY);

  if (!accessToken || !refreshToken || !rawProfile) return null;

  try {
    const profile = JSON.parse(rawProfile) as Pick<AuthSession, "email" | "fullName">;
    syncAccessTokenCookie(accessToken);

    return {
      accessToken,
      refreshToken,
      email: profile.email,
      fullName: profile.fullName,
    };
  } catch {
    return null;
  }
}

export function storeAuthSession(session: AuthSession) {
  if (!isBrowser()) return;

  window.localStorage.setItem(ACCESS_TOKEN_KEY, session.accessToken);
  window.localStorage.setItem(REFRESH_TOKEN_KEY, session.refreshToken);
  window.localStorage.setItem(
    ADMIN_PROFILE_KEY,
    JSON.stringify({ email: session.email, fullName: session.fullName })
  );
  syncAccessTokenCookie(session.accessToken);
}

export function clearStoredAuthSession() {
  if (!isBrowser()) return;

  window.localStorage.removeItem(ACCESS_TOKEN_KEY);
  window.localStorage.removeItem(REFRESH_TOKEN_KEY);
  window.localStorage.removeItem(ADMIN_PROFILE_KEY);
  clearAccessTokenCookie();
}

function syncAccessTokenCookie(accessToken: string) {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";

  document.cookie = `${ACCESS_TOKEN_KEY}=${encodeURIComponent(
    accessToken
  )}; Path=/; Max-Age=${AUTH_COOKIE_MAX_AGE_SECONDS}; SameSite=Lax${secure}`;
}

function clearAccessTokenCookie() {
  document.cookie = `${ACCESS_TOKEN_KEY}=; Path=/; Max-Age=0; SameSite=Lax`;
}

export async function loginRequest(payload: LoginRequest) {
  const response = await apiRequest<ApiResponse<AuthSession>>("/Auth/login", {
    method: "POST",
    body: payload,
  });

  if (!response.success || !response.data?.accessToken) {
    throw new Error(response.message || "Login failed");
  }

  return response.data;
}

export async function logoutRequest(refreshToken: string, token: string | null) {
  return apiRequest<ApiResponse<null>>("/Auth/logout", {
    method: "POST",
    body: refreshToken,
    token,
  });
}

export async function refreshTokenRequest(refreshToken: string, token: string | null) {
  const response = await apiRequest<ApiResponse<AuthSession>>("/Auth/refresh-token", {
    method: "POST",
    body: { refreshToken },
    token,
  });

  if (!response.success || !response.data?.accessToken) {
    throw new Error(response.message || "Unable to refresh session");
  }

  return response.data;
}

export async function updatePasswordRequest(
  payload: UpdatePasswordPayload,
  token: string | null
) {
  return apiRequest<ApiResponse<null>>("/Auth/update-password", {
    method: "PUT",
    body: payload,
    token,
  });
}
