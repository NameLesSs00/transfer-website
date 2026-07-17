import {
  VehicleCategoryPricingType,
  VehicleCategoryPricingTypeValue,
} from "@/store/features/vehicleCategories/vehicleCategoriesModels";

export function getPricingTypeLabel(pricingType: VehicleCategoryPricingType) {
  return pricingType === "FixedTrip" ? "Fixed Trip" : "Per Person";
}

export function getPricingTypeDescription(pricingType: VehicleCategoryPricingTypeValue) {
  return pricingType === 0
    ? "One fixed price for the full trip."
    : "Price is calculated per passenger.";
}

export function pricingTypeToValue(
  pricingType: VehicleCategoryPricingType
): VehicleCategoryPricingTypeValue {
  return pricingType === "FixedTrip" ? 0 : 1;
}
