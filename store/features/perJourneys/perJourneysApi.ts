import { apiRequest, ApiResponse } from "@/lib/apiClient";
import { LocationJourneysResponse } from "../locationJourneys/locationJourneysModels";
import { VehiclesResponse } from "../vehicles/vehiclesModels";
import {
  PerJourney,
  PerJourneyPayload,
  PerJourneyResponse,
  PerJourneysQuery,
  PerJourneysResponse,
  UpdatePerJourneyPayload,
} from "./perJourneysModels";

function buildPerJourneysQuery(query: PerJourneysQuery) {
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

export function getPerJourneysRequest(query: PerJourneysQuery, token: string | null) {
  const queryString = buildPerJourneysQuery(query);
  return apiRequest<PerJourneysResponse>(`/PerJourneys?${queryString}`, { token });
}

export function getPerJourneyRequest(id: number, token: string | null) {
  return apiRequest<PerJourneyResponse>(`/PerJourneys/${id}`, { token });
}

export function createPerJourneyRequest(payload: PerJourneyPayload, token: string | null) {
  return apiRequest<ApiResponse<PerJourney>>("/PerJourneys", {
    method: "POST",
    body: payload,
    token,
  });
}

export function updatePerJourneyRequest(payload: UpdatePerJourneyPayload, token: string | null) {
  return apiRequest<ApiResponse<PerJourney>>(`/PerJourneys/${payload.id}`, {
    method: "PUT",
    body: payload,
    token,
  });
}

export function deletePerJourneyRequest(id: number, token: string | null) {
  return apiRequest<ApiResponse<string | null>>(`/PerJourneys/${id}`, {
    method: "DELETE",
    token,
  });
}

export function getPerJourneyLocationJourneyOptionsRequest(token: string | null) {
  const params = new URLSearchParams({
    PageNumber: "1",
    PageSize: "1000",
    SortBy: "name",
    IsDescending: "false",
  });

  return apiRequest<LocationJourneysResponse>(`/LocationJourneys?${params.toString()}`, {
    token,
  });
}

export function getPerJourneyVehicleOptionsRequest(token: string | null) {
  const params = new URLSearchParams({
    PageNumber: "1",
    PageSize: "1000",
    SortBy: "name",
    IsDescending: "false",
  });

  return apiRequest<VehiclesResponse>(`/Vehicles?${params.toString()}`, { token });
}
