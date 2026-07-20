import { apiRequest } from "@/lib/apiClient";
import {
  AdminBookingsQuery,
  AdminBookingsResponse,
  AdminBookingResponse,
} from "./adminBookingsModels";

export function getAdminBookingsRequest(
  query: Partial<AdminBookingsQuery>,
  token: string | null
) {
  const params = new URLSearchParams();
  params.append("PageNumber", (query.pageNumber ?? 1).toString());
  params.append("PageSize", "10");
  if (query.search) params.append("Search", query.search);

  return apiRequest<AdminBookingsResponse>(`/Bookings?${params.toString()}`, {
    token,
  });
}

export function getAdminBookingRequest(id: number, token: string | null) {
  return apiRequest<AdminBookingResponse>(`/Bookings/${id}`, {
    token,
  });
}

export function deleteAdminBookingRequest(id: number, token: string | null) {
  return apiRequest<{ success: boolean; message: string; data: any; errors: any }>(
    `/Bookings/${id}`,
    {
      method: "DELETE",
      token,
    }
  );
}
