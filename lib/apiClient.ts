import { clearStoredAuthSession, getStoredAccessToken, storeAuthSession } from "./authStorage";
import { shouldRefreshAccessToken } from "./authTokens";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_TRANSFER_API_URL ?? "https://transfer.tryasp.net/api";

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
  errors: unknown;
};

type ApiRequestOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
  token?: string | null;
};

type RefreshSession = {
  accessToken: string;
  email: string;
  fullName: string;
};

function buildUrl(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
}

async function parseJson<T>(response: Response): Promise<T> {
  const text = await response.text();
  const payload = text ? (JSON.parse(text) as T) : (null as T);

  if (!response.ok) {
    const message =
      payload &&
      typeof payload === "object" &&
      "message" in payload &&
      typeof payload.message === "string"
        ? payload.message
        : "Request failed";

    throw new Error(message);
  }

  return payload;
}

let refreshPromise: Promise<RefreshSession> | null = null;

function isBrowser() {
  return typeof window !== "undefined";
}

function notifyLoggedOut() {
  if (!isBrowser()) return;

  clearStoredAuthSession();
  window.dispatchEvent(new CustomEvent("transfer:auth:logout"));
}

async function refreshAccessToken(currentAccessToken?: string | null) {
  const headers = new Headers();

  if (currentAccessToken) {
    headers.set("Authorization", `Bearer ${currentAccessToken}`);
  }

  const response = await fetch("/api/auth/refresh-token", {
    method: "POST",
    headers,
    credentials: "same-origin",
  });
  const data = await response.json();

  if (!response.ok || !data.success || !data.data?.accessToken) {
    throw new Error(data.message || "Token refresh failed");
  }

  const session = data.data as RefreshSession;
  storeAuthSession(session);
  window.dispatchEvent(new CustomEvent("transfer:auth:refresh", { detail: session }));

  return session;
}

function getRefreshPromise(currentAccessToken?: string | null) {
  if (!refreshPromise) {
    refreshPromise = refreshAccessToken(currentAccessToken).finally(() => {
      refreshPromise = null;
    });
  }

  return refreshPromise;
}

async function resolveAccessToken(token?: string | null) {
  if (!isBrowser()) return token ?? null;

  const currentToken = token ?? getStoredAccessToken();

  if (!currentToken) {
    return null;
  }

  if (currentToken && !shouldRefreshAccessToken(currentToken)) {
    return currentToken;
  }

  try {
    const session = await getRefreshPromise(currentToken);
    return session.accessToken;
  } catch (error) {
    notifyLoggedOut();
    throw error;
  }
}

export async function apiRequest<T>(path: string, options: ApiRequestOptions = {}): Promise<T> {
  const { body, token, headers: initialHeaders, ...init } = options;
  const headers = new Headers(initialHeaders);
  const accessToken = await resolveAccessToken(token);

  headers.set("accept", "*/*");

  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  if (body !== undefined && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(buildUrl(path), {
    ...init,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  if (response.status === 401 && isBrowser()) {
    try {
      const session = await getRefreshPromise(accessToken);
      headers.set("Authorization", `Bearer ${session.accessToken}`);

      const retryResponse = await fetch(buildUrl(path), {
        ...init,
        headers,
        body: body === undefined ? undefined : JSON.stringify(body),
      });
      return parseJson<T>(retryResponse);
    } catch (error) {
      notifyLoggedOut();
      throw error;
    }
  }

  return parseJson<T>(response);
}
