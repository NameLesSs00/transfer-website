import { API_BASE_URL } from "@/lib/apiClient";
import { Vehicle } from "@/store/features/vehicles/vehiclesModels";

export function buildVehicleImageUrl(imageUrl: string | null | undefined) {
  if (!imageUrl) return "";

  if (/^https?:\/\//i.test(imageUrl)) {
    return imageUrl;
  }

  const apiOrigin = API_BASE_URL.replace(/\/api\/?$/i, "");
  const normalizedPath = imageUrl.startsWith("/") ? imageUrl : `/${imageUrl}`;

  return `${apiOrigin}${normalizedPath}`;
}

export function getVehicleCategoryLabel(vehicle: Vehicle) {
  return vehicle.vehicleCategoryName || vehicle.vehicleCategory?.name || "Unassigned";
}

export function getVehicleFactoryLabel(vehicle: Vehicle) {
  return vehicle.vehicleFactoryName || vehicle.vehicleFactory?.name || "Unassigned";
}
