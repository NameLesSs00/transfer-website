import { LocationJourney } from "../locationJourneys/locationJourneysModels";
import { Vehicle } from "../vehicles/vehiclesModels";

export type PerJourneyLocation = Pick<LocationJourney, "id" | "name">;

export type PerJourney = {
  id: number;
  fromLocationId: number;
  fromLocation: PerJourneyLocation | null;
  toLocationId: number;
  toLocation: PerJourneyLocation | null;
  vehicleId: number;
  vehicle: Vehicle | null;
  price: number;
};

export type PerJourneysQuery = {
  pageNumber: number;
  pageSize: number;
  search: string;
  sortBy: string;
  isDescending: boolean;
};

export type PerJourneysResponse = {
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalRecords: number;
  success: boolean;
  message: string;
  data: PerJourney[];
  errors: unknown;
};

export type PerJourneyResponse = {
  success: boolean;
  message: string;
  data: PerJourney;
  errors: unknown;
};

export type PerJourneyPayload = {
  fromLocationId: number;
  toLocationId: number;
  vehicleId: number;
  price: number;
};

export type UpdatePerJourneyPayload = PerJourneyPayload & {
  id: number;
};

export type PerJourneysState = PerJourneysQuery & {
  items: PerJourney[];
  locationJourneyOptions: LocationJourney[];
  vehicleOptions: Vehicle[];
  selectedPerJourney: PerJourney | null;
  perJourneyPendingDelete: PerJourney | null;
  totalPages: number;
  totalRecords: number;
  listStatus: "idle" | "loading" | "succeeded" | "failed";
  detailStatus: "idle" | "loading" | "succeeded" | "failed";
  createStatus: "idle" | "loading" | "succeeded" | "failed";
  updateStatus: "idle" | "loading" | "succeeded" | "failed";
  deleteStatus: "idle" | "loading" | "succeeded" | "failed";
  locationJourneyOptionsStatus: "idle" | "loading" | "succeeded" | "failed";
  vehicleOptionsStatus: "idle" | "loading" | "succeeded" | "failed";
  isFormModalOpen: boolean;
  formMode: "create" | "edit";
  isDeleteConfirmOpen: boolean;
  error: string | null;
  notice: string | null;
};
