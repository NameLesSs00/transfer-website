import { apiRequest, ApiResponse } from "@/lib/apiClient";
import {
  UpdateVehicleFactoryPayload,
  VehicleFactoriesQuery,
  VehicleFactoriesResponse,
  VehicleFactory,
  VehicleFactoryPayload,
  VehicleFactoryResponse,
} from "./vehicleFactoriesModels";

function buildVehicleFactoriesQuery(query: VehicleFactoriesQuery) {
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

export function getVehicleFactoriesRequest(
  query: VehicleFactoriesQuery,
  token: string | null
) {
  const queryString = buildVehicleFactoriesQuery(query);
  return apiRequest<VehicleFactoriesResponse>(`/VehicleFactories?${queryString}`, {
    token,
  });
}

export function getVehicleFactoryRequest(id: number, token: string | null) {
  return apiRequest<VehicleFactoryResponse>(`/VehicleFactories/${id}`, { token });
}

export function createVehicleFactoryRequest(
  payload: VehicleFactoryPayload,
  token: string | null
) {
  return apiRequest<ApiResponse<VehicleFactory>>("/VehicleFactories", {
    method: "POST",
    body: payload,
    token,
  });
}

export function updateVehicleFactoryRequest(
  payload: UpdateVehicleFactoryPayload,
  token: string | null
) {
  return apiRequest<ApiResponse<VehicleFactory>>(`/VehicleFactories/${payload.id}`, {
    method: "PUT",
    body: payload,
    token,
  });
}

export function deleteVehicleFactoryRequest(id: number, token: string | null) {
  return apiRequest<ApiResponse<null>>(`/VehicleFactories/${id}`, {
    method: "DELETE",
    token,
  });
}
