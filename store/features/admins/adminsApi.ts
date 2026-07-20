import { apiRequest, ApiResponse } from "@/lib/apiClient";
import { AddAdminPayload, AdminsResponse } from "./adminsModels";

export function getAdminsRequest(pageNumber: number, pageSize: number, token: string | null) {
  return apiRequest<AdminsResponse>(
    `/Auth/admins?pageNumber=${pageNumber}&pageSize=${pageSize}`,
    { token }
  );
}

export function addAdminRequest(payload: AddAdminPayload, token: string | null) {
  return apiRequest<ApiResponse<null>>("/Auth/add-admin", {
    method: "POST",
    body: payload,
    token,
  });
}

export function deleteAdminRequest(id: string, token: string | null) {
  return apiRequest<ApiResponse<boolean>>(`/Auth/delete-admin/${id}`, {
    method: "DELETE",
    token,
  });
}
