import { apiRequest } from "@/lib/apiClient";
import { DashboardResponse } from "./dashboardModels";

export function getDashboardRequest(token: string | null) {
  return apiRequest<DashboardResponse>("/Dashboard", { token });
}
