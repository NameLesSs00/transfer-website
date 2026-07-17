import { API_BASE_URL, apiRequest, ApiResponse } from "@/lib/apiClient";
import {
  CreateVehiclePayload,
  UpdateVehiclePayload,
  Vehicle,
  VehicleResponse,
  VehiclesQuery,
  VehiclesResponse,
} from "./vehiclesModels";

function buildVehiclesQuery(query: VehiclesQuery) {
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

function buildVehicleFormData(payload: CreateVehiclePayload) {
  const formData = new FormData();

  formData.set("Name", payload.name);
  formData.set("Model", payload.model);
  formData.set("Year", String(payload.year));
  formData.set("LicensePlate", payload.licensePlate);
  formData.set("Capacity", String(payload.capacity));
  formData.set("ImageUrl", payload.imageFile);
  formData.set("IsActive", String(payload.isActive));
  formData.set("VehicleCategoryId", String(payload.vehicleCategoryId));
  formData.set("VehicleFactoryId", String(payload.vehicleFactoryId));

  return formData;
}

export function getVehiclesRequest(query: VehiclesQuery, token: string | null) {
  const queryString = buildVehiclesQuery(query);
  return apiRequest<VehiclesResponse>(`/Vehicles?${queryString}`, { token });
}

export function getVehicleRequest(id: number, token: string | null) {
  return apiRequest<VehicleResponse>(`/Vehicles/${id}`, { token });
}

export async function createVehicleRequest(payload: CreateVehiclePayload, token: string | null) {
  const headers = new Headers();

  headers.set("accept", "*/*");

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(buildUrl("/Vehicles"), {
    method: "POST",
    headers,
    body: buildVehicleFormData(payload),
  });

  return parseJson<ApiResponse<Vehicle>>(response);
}

export function updateVehicleRequest(payload: UpdateVehiclePayload, token: string | null) {
  return apiRequest<ApiResponse<Vehicle>>(`/Vehicles/${payload.id}`, {
    method: "PUT",
    body: payload,
    token,
  });
}

export function deleteVehicleRequest(id: number, token: string | null) {
  return apiRequest<ApiResponse<string | null>>(`/Vehicles/${id}`, {
    method: "DELETE",
    token,
  });
}
