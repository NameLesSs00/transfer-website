export const ACCESS_TOKEN_COOKIE = "transfer_admin_access_token";
export const REFRESH_TOKEN_COOKIE = "transfer_admin_refresh_token";
export const ADMIN_PROFILE_KEY = "transfer_admin_profile";

export const ACCESS_TOKEN_FALLBACK_MAX_AGE_SECONDS = 60 * 60;
export const REFRESH_TOKEN_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;
export const ACCESS_TOKEN_REFRESH_BUFFER_SECONDS = 2 * 60;

type JwtPayload = {
  exp?: number;
};

function decodeBase64Url(value: string) {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");

  if (typeof atob !== "function") {
    throw new Error("Base64 decoding is not available");
  }

  return atob(padded);
}

export function getJwtExpiresAt(accessToken: string): number | null {
  try {
    const payload = accessToken.split(".")[1];
    if (!payload) return null;

    const parsed = JSON.parse(decodeBase64Url(payload)) as JwtPayload;
    return typeof parsed.exp === "number" ? parsed.exp * 1000 : null;
  } catch {
    return null;
  }
}

export function shouldRefreshAccessToken(accessToken: string) {
  const expiresAt = getJwtExpiresAt(accessToken);
  if (!expiresAt) return false;

  return expiresAt - Date.now() <= ACCESS_TOKEN_REFRESH_BUFFER_SECONDS * 1000;
}

export function getAccessTokenMaxAgeSeconds(accessToken: string) {
  const expiresAt = getJwtExpiresAt(accessToken);
  if (!expiresAt) return ACCESS_TOKEN_FALLBACK_MAX_AGE_SECONDS;

  const secondsUntilExpiry = Math.floor((expiresAt - Date.now()) / 1000);
  return Math.max(secondsUntilExpiry, 0);
}
