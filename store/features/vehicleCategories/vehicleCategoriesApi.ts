import { apiRequest, ApiResponse } from "@/lib/apiClient";
import {
  UpdateVehicleCategoryPayload,
  VehicleCategoriesQuery,
  VehicleCategoriesResponse,
  VehicleCategory,
  VehicleCategoryPayload,
  VehicleCategoryResponse,
} from "./vehicleCategoriesModels";

function buildVehicleCategoriesQuery(query: VehicleCategoriesQuery) {
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

export function getVehicleCategoriesRequest(
  query: VehicleCategoriesQuery,
  token: string | null
) {
  const queryString = buildVehicleCategoriesQuery(query);
  return apiRequest<VehicleCategoriesResponse>(`/VehicleCategories?${queryString}`, {
    token,
  });
}

export function getVehicleCategoryRequest(id: number, token: string | null) {
  return apiRequest<VehicleCategoryResponse>(`/VehicleCategories/${id}`, { token });
}

export function createVehicleCategoryRequest(
  payload: VehicleCategoryPayload,
  token: string | null
) {
  return apiRequest<ApiResponse<VehicleCategory>>("/VehicleCategories", {
    method: "POST",
    body: payload,
    token,
  });
}

export function updateVehicleCategoryRequest(
  payload: UpdateVehicleCategoryPayload,
  token: string | null
) {
  return apiRequest<ApiResponse<VehicleCategory>>("/VehicleCategories", {
    method: "PUT",
    body: payload,
    token,
  });
}

export function deleteVehicleCategoryRequest(id: number, token: string | null) {
  return apiRequest<ApiResponse<string | null>>(`/VehicleCategories/${id}`, {
    method: "DELETE",
    token,
  });
}
