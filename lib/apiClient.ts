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

export async function apiRequest<T>(path: string, options: ApiRequestOptions = {}) {
  const { body, token, headers: initialHeaders, ...init } = options;
  const headers = new Headers(initialHeaders);

  headers.set("accept", "*/*");

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  if (body !== undefined && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(buildUrl(path), {
    ...init,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  return parseJson<T>(response);
}
