import { apiRequest, ApiResponse } from "@/lib/apiClient";
import {
  Location,
  LocationPayload,
  LocationResponse,
  LocationsQuery,
  LocationsResponse,
  UpdateLocationPayload,
} from "./locationsModels";

function buildLocationsQuery(query: LocationsQuery) {
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

export function getLocationsRequest(query: LocationsQuery, token: string | null) {
  const queryString = buildLocationsQuery(query);
  return apiRequest<LocationsResponse>(`/Locations?${queryString}`, { token });
}

export function getLocationRequest(id: number, token: string | null) {
  return apiRequest<LocationResponse>(`/Locations/${id}`, { token });
}

export function createLocationRequest(payload: LocationPayload, token: string | null) {
  return apiRequest<ApiResponse<Location>>("/Locations", {
    method: "POST",
    body: payload,
    token,
  });
}

export function updateLocationRequest(payload: UpdateLocationPayload, token: string | null) {
  return apiRequest<ApiResponse<Location>>(`/Locations/${payload.id}`, {
    method: "PUT",
    body: payload,
    token,
  });
}

export function deleteLocationRequest(id: number, token: string | null) {
  return apiRequest<ApiResponse<string | null>>(`/Locations/${id}`, {
    method: "DELETE",
    token,
  });
}
