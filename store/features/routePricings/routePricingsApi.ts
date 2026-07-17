import { apiRequest, ApiResponse } from "@/lib/apiClient";
import { TransferRoutesResponse } from "../transferRoutes/transferRoutesModels";
import { VehicleCategoriesResponse } from "../vehicleCategories/vehicleCategoriesModels";
import {
  RoutePricing,
  RoutePricingPayload,
  RoutePricingResponse,
  RoutePricingsQuery,
  RoutePricingsResponse,
  UpdateRoutePricingPayload,
} from "./routePricingsModels";

function buildRoutePricingsQuery(query: RoutePricingsQuery) {
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

export function getRoutePricingsRequest(query: RoutePricingsQuery, token: string | null) {
  const queryString = buildRoutePricingsQuery(query);
  return apiRequest<RoutePricingsResponse>(`/RoutePricings?${queryString}`, { token });
}

export function getRoutePricingRequest(id: number, token: string | null) {
  return apiRequest<RoutePricingResponse>(`/RoutePricings/${id}`, { token });
}

export function createRoutePricingRequest(payload: RoutePricingPayload, token: string | null) {
  return apiRequest<ApiResponse<RoutePricing>>("/RoutePricings", {
    method: "POST",
    body: payload,
    token,
  });
}

export function updateRoutePricingRequest(payload: UpdateRoutePricingPayload, token: string | null) {
  return apiRequest<ApiResponse<RoutePricing>>(`/RoutePricings/${payload.id}`, {
    method: "PUT",
    body: payload,
    token,
  });
}

export function deleteRoutePricingRequest(id: number, token: string | null) {
  return apiRequest<ApiResponse<string | null>>(`/RoutePricings/${id}`, {
    method: "DELETE",
    token,
  });
}

export function getRoutePricingTransferRouteOptionsRequest(token: string | null) {
  const params = new URLSearchParams({
    PageNumber: "1",
    PageSize: "1000",
    SortBy: "originLocationName",
    IsDescending: "false",
  });

  return apiRequest<TransferRoutesResponse>(`/TransferRoutes?${params.toString()}`, { token });
}

export function getRoutePricingVehicleCategoryOptionsRequest(token: string | null) {
  const params = new URLSearchParams({
    PageNumber: "1",
    PageSize: "1000",
    SortBy: "name",
    IsDescending: "false",
  });

  return apiRequest<VehicleCategoriesResponse>(`/VehicleCategories?${params.toString()}`, {
    token,
  });
}
