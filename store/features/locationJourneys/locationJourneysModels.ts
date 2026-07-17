export type LocationJourney = {
  id: number;
  name: string;
};

export type LocationJourneysQuery = {
  pageNumber: number;
  pageSize: number;
  search: string;
  sortBy: string;
  isDescending: boolean;
};

export type LocationJourneysResponse = {
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalRecords: number;
  success: boolean;
  message: string;
  data: LocationJourney[];
  errors: unknown;
};

export type LocationJourneyResponse = {
  success: boolean;
  message: string;
  data: LocationJourney;
  errors: unknown;
};

export type LocationJourneyPayload = {
  name: string;
};

export type UpdateLocationJourneyPayload = {
  id: number;
  name: string;
};

export type LocationJourneysState = LocationJourneysQuery & {
  items: LocationJourney[];
  selectedJourney: LocationJourney | null;
  journeyPendingDelete: LocationJourney | null;
  totalPages: number;
  totalRecords: number;
  listStatus: "idle" | "loading" | "succeeded" | "failed";
  detailStatus: "idle" | "loading" | "succeeded" | "failed";
  createStatus: "idle" | "loading" | "succeeded" | "failed";
  updateStatus: "idle" | "loading" | "succeeded" | "failed";
  deleteStatus: "idle" | "loading" | "succeeded" | "failed";
  isFormModalOpen: boolean;
  formMode: "create" | "edit";
  isDeleteConfirmOpen: boolean;
  error: string | null;
  notice: string | null;
};
