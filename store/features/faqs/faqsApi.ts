import { apiRequest, ApiResponse } from "@/lib/apiClient";
import {
  Faq,
  FaqPayload,
  FaqResponse,
  FaqsQuery,
  FaqsResponse,
  UpdateFaqPayload,
} from "./faqsModels";

function buildFaqsQuery(query: FaqsQuery) {
  const params = new URLSearchParams();

  params.set("PageNumber", String(query.pageNumber));
  params.set("PageSize", String(query.pageSize));

  if (query.search.trim()) {
    params.set("Search", query.search.trim());
  }

  if (query.sortBy.trim()) {
    params.set("SortBy", query.sortBy.trim());
  }

  params.set("IsDescending", String(query.isDescending));

  return params.toString();
}

export function getFaqsRequest(query: FaqsQuery, token: string | null) {
  const queryString = buildFaqsQuery(query);
  return apiRequest<FaqsResponse>(`/Faqs?${queryString}`, { token });
}

export function getFaqRequest(id: number, token: string | null) {
  return apiRequest<FaqResponse>(`/Faqs/${id}`, { token });
}

export function createFaqRequest(payload: FaqPayload, token: string | null) {
  return apiRequest<ApiResponse<Faq>>("/Faqs", {
    method: "POST",
    body: payload,
    token,
  });
}

export function updateFaqRequest(payload: UpdateFaqPayload, token: string | null) {
  return apiRequest<ApiResponse<Faq>>(`/Faqs/${payload.id}`, {
    method: "PUT",
    body: payload,
    token,
  });
}

export function deleteFaqRequest(id: number, token: string | null) {
  return apiRequest<ApiResponse<string | null>>(`/Faqs/${id}`, {
    method: "DELETE",
    token,
  });
}
