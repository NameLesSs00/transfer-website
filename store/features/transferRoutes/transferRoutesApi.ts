import { apiRequest, ApiResponse } from "@/lib/apiClient";
import { LocationsResponse } from "../locations/locationsModels";
import {
  TransferRoute,
  TransferRoutePayload,
  TransferRouteResponse,
  TransferRoutesQuery,
  TransferRoutesResponse,
  UpdateTransferRoutePayload,
} from "./transferRoutesModels";

function buildTransferRoutesQuery(query: TransferRoutesQuery) {
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

export function getTransferRoutesRequest(query: TransferRoutesQuery, token: string | null) {
  const queryString = buildTransferRoutesQuery(query);
  return apiRequest<TransferRoutesResponse>(`/TransferRoutes?${queryString}`, { token });
}

export function getTransferRouteRequest(id: number, token: string | null) {
  return apiRequest<TransferRouteResponse>(`/TransferRoutes/${id}`, { token });
}

export function createTransferRouteRequest(payload: TransferRoutePayload, token: string | null) {
  return apiRequest<ApiResponse<TransferRoute>>("/TransferRoutes", {
    method: "POST",
    body: payload,
    token,
  });
}

export function updateTransferRouteRequest(
  payload: UpdateTransferRoutePayload,
  token: string | null
) {
  return apiRequest<ApiResponse<TransferRoute>>(`/TransferRoutes/${payload.id}`, {
    method: "PUT",
    body: payload,
    token,
  });
}

export function deleteTransferRouteRequest(id: number, token: string | null) {
  return apiRequest<ApiResponse<string | null>>(`/TransferRoutes/${id}`, {
    method: "DELETE",
    token,
  });
}

export function getTransferRouteLocationOptionsRequest(token: string | null) {
  const params = new URLSearchParams({
    PageNumber: "1",
    PageSize: "1000",
    SortBy: "name",
    IsDescending: "false",
  });

  return apiRequest<LocationsResponse>(`/Locations?${params.toString()}`, { token });
}
