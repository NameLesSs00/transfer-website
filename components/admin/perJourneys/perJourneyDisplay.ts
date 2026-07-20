import { LocationJourney } from "@/store/features/locationJourneys/locationJourneysModels";
import { PerJourney } from "@/store/features/perJourneys/perJourneysModels";
import { Vehicle } from "@/store/features/vehicles/vehiclesModels";

export function formatPerJourneyPrice(value: number) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
    style: "currency",
    currency: "USD",
  }).format(value);
}

function getNonEmptyText(value: string | null | undefined) {
  const trimmedValue = value?.trim();
  return trimmedValue || null;
}

export function getLocationJourneyName(
  id: number,
  location: { name: string } | null | undefined,
  options: LocationJourney[]
) {
  return (
    getNonEmptyText(location?.name) ??
    getNonEmptyText(options.find((option) => option.id === id)?.name) ??
    `Journey #${id}`
  );
}

export function getPerJourneyFromName(perJourney: PerJourney, options: LocationJourney[]) {
  return getLocationJourneyName(
    perJourney.fromLocationId,
    perJourney.fromLocation,
    options
  );
}

export function getPerJourneyToName(perJourney: PerJourney, options: LocationJourney[]) {
  return getLocationJourneyName(perJourney.toLocationId, perJourney.toLocation, options);
}

export function getVehicleLabel(vehicle: Vehicle) {
  const name = getNonEmptyText(vehicle.name) ?? `Vehicle #${vehicle.id}`;
  const model = getNonEmptyText(vehicle.model);
  const year = Number.isFinite(vehicle.year) && vehicle.year > 0 ? vehicle.year : null;

  if (model && year) return `${name} - ${model} (${year})`;
  if (model) return `${name} - ${model}`;
  if (year) return `${name} (${year})`;

  return name;
}

export function getPerJourneyVehicleLabel(perJourney: PerJourney, options: Vehicle[]) {
  if (perJourney.vehicle) {
    return getVehicleLabel(perJourney.vehicle);
  }

  const matchingVehicle = options.find((vehicle) => vehicle.id === perJourney.vehicleId);
  return matchingVehicle ? getVehicleLabel(matchingVehicle) : `Vehicle #${perJourney.vehicleId}`;
}

export function getPerJourneyVehicleCategoryLabel(perJourney: PerJourney) {
  return (
    getNonEmptyText(perJourney.vehicle?.vehicleCategoryName) ??
    getNonEmptyText(perJourney.vehicle?.vehicleCategory?.name)
  );
}
