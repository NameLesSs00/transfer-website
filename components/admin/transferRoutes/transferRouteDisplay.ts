import { Location } from "@/store/features/locations/locationsModels";
import { TransferRoute } from "@/store/features/transferRoutes/transferRoutesModels";

export function buildGoogleMapsUrl(latitude: number, longitude: number) {
  return `https://www.google.com/maps?q=${encodeURIComponent(`${latitude},${longitude}`)}`;
}

export function formatCoordinate(value: number) {
  return Number.isFinite(value) ? value.toFixed(6) : "0.000000";
}

export function findRouteLocation(
  route: TransferRoute,
  options: Location[],
  side: "origin" | "destination"
) {
  const locationId =
    side === "origin" ? route.originLocationId : route.destinationLocationId;

  return options.find((location) => location.id === locationId) ?? null;
}

export function getRouteLocationName(
  route: TransferRoute,
  location: Location | null,
  side: "origin" | "destination"
) {
  if (location?.name) return location.name;

  return side === "origin" ? route.originLocationName : route.destinationLocationName;
}
