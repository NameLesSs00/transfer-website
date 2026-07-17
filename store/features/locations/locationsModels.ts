export type Location = {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  isActive: boolean;
};

export type LocationsQuery = {
  pageNumber: number;
  pageSize: number;
  search: string;
  sortBy: string;
  isDescending: boolean;
};

export type LocationsResponse = {
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalRecords: number;
  success: boolean;
  message: string;
  data: Location[];
  errors: unknown;
};

export type LocationResponse = {
  success: boolean;
  message: string;
  data: Location;
  errors: unknown;
};

export type LocationPayload = {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  isActive: boolean;
};

export type UpdateLocationPayload = LocationPayload & {
  id: number;
};

export type LocationsState = LocationsQuery & {
  items: Location[];
  selectedLocation: Location | null;
  locationPendingDelete: Location | null;
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
