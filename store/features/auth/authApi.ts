import { apiRequest, ApiResponse } from "@/lib/apiClient";
import {
  clearStoredAuthSession,
  getStoredAuthSession,
  storeAuthSession,
} from "@/lib/authStorage";
import { AuthSession, LoginRequest, UpdatePasswordPayload } from "./authModels";

export { clearStoredAuthSession, getStoredAuthSession, storeAuthSession };

export async function loginRequest(payload: LoginRequest) {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok || !data.success || !data.data?.accessToken) {
    throw new Error(data.message || "Login failed");
  }

  return data.data as AuthSession;
}

export async function logoutRequest(token?: string | null) {
  await fetch("/api/auth/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
    body: JSON.stringify({ token }),
  });
}

export async function refreshTokenRequest(token?: string | null) {
  const headers = new Headers();
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch("/api/auth/refresh-token", {
    method: "POST",
    headers,
    credentials: "same-origin",
  });

  const data = await response.json();

  if (!response.ok || !data.success || !data.data?.accessToken) {
    throw new Error(data.message || "Unable to refresh session");
  }

  return data.data as AuthSession;
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
