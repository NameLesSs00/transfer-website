import { apiRequest, ApiResponse } from "@/lib/apiClient";
import {
  LocationJourney,
  LocationJourneyPayload,
  LocationJourneyResponse,
  LocationJourneysQuery,
  LocationJourneysResponse,
  UpdateLocationJourneyPayload,
} from "./locationJourneysModels";

function buildLocationJourneysQuery(query: LocationJourneysQuery) {
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

export function getLocationJourneysRequest(
  query: LocationJourneysQuery,
  token: string | null
) {
  const queryString = buildLocationJourneysQuery(query);
  return apiRequest<LocationJourneysResponse>(`/LocationJourneys?${queryString}`, {
    token,
  });
}

export function getLocationJourneyRequest(id: number, token: string | null) {
  return apiRequest<LocationJourneyResponse>(`/LocationJourneys/${id}`, { token });
}

export function createLocationJourneyRequest(
  payload: LocationJourneyPayload,
  token: string | null
) {
  return apiRequest<ApiResponse<LocationJourney>>("/LocationJourneys", {
    method: "POST",
    body: payload,
    token,
  });
}

export function updateLocationJourneyRequest(
  payload: UpdateLocationJourneyPayload,
  token: string | null
) {
  return apiRequest<ApiResponse<LocationJourney>>(`/LocationJourneys/${payload.id}`, {
    method: "PUT",
    body: payload,
    token,
  });
}

export function deleteLocationJourneyRequest(id: number, token: string | null) {
  return apiRequest<ApiResponse<null>>(`/LocationJourneys/${id}`, {
    method: "DELETE",
    token,
  });
}
