import { RoutePricing } from "@/store/features/routePricings/routePricingsModels";
import { TransferRoute } from "@/store/features/transferRoutes/transferRoutesModels";
import { VehicleCategory } from "@/store/features/vehicleCategories/vehicleCategoriesModels";

export function formatPrice(value: number) {
  return new Intl.NumberFormat("en-US", {
    currency: "USD",
    maximumFractionDigits: 2,
    style: "currency",
  }).format(value);
}

export function getTransferRouteLabel(route: TransferRoute) {
  return `${route.originLocationName} to ${route.destinationLocationName}`;
}

export function getRoutePricingRouteLabel(pricing: RoutePricing) {
  if (pricing.locationFrom && pricing.locationTo) {
    return `${pricing.locationFrom} to ${pricing.locationTo}`;
  }

  return "Route details pending";
}

export function findMatchingTransferRoute(
  pricing: RoutePricing,
  options: TransferRoute[]
) {
  if (!pricing.locationFrom || !pricing.locationTo) return null;

  return (
    options.find(
      (route) =>
        route.originLocationName === pricing.locationFrom &&
        route.destinationLocationName === pricing.locationTo
    ) ?? null
  );
}

export function findMatchingVehicleCategory(
  pricing: RoutePricing,
  options: VehicleCategory[]
) {
  if (!pricing.vehicleCategoryName) return null;

  return (
    options.find((category) => category.name === pricing.vehicleCategoryName) ?? null
  );
}
