import { Location } from "../locations/locationsModels";

export type TransferRoute = {
  id: number;
  originLocationId: number;
  originLocationName: string;
  destinationLocationId: number;
  destinationLocationName: string;
  isActive: boolean;
};

export type TransferRoutesQuery = {
  pageNumber: number;
  pageSize: number;
  search: string;
  sortBy: string;
  isDescending: boolean;
};

export type TransferRoutesResponse = {
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalRecords: number;
  success: boolean;
  message: string;
  data: TransferRoute[];
  errors: unknown;
};

export type TransferRouteResponse = {
  success: boolean;
  message: string;
  data: TransferRoute;
  errors: unknown;
};

export type TransferRoutePayload = {
  originLocationId: number;
  destinationLocationId: number;
  isActive: boolean;
};

export type UpdateTransferRoutePayload = TransferRoutePayload & {
  id: number;
};

export type TransferRoutesState = TransferRoutesQuery & {
  items: TransferRoute[];
  locationOptions: Location[];
  selectedRoute: TransferRoute | null;
  routePendingDelete: TransferRoute | null;
  totalPages: number;
  totalRecords: number;
  listStatus: "idle" | "loading" | "succeeded" | "failed";
  detailStatus: "idle" | "loading" | "succeeded" | "failed";
  createStatus: "idle" | "loading" | "succeeded" | "failed";
  updateStatus: "idle" | "loading" | "succeeded" | "failed";
  deleteStatus: "idle" | "loading" | "succeeded" | "failed";
  locationOptionsStatus: "idle" | "loading" | "succeeded" | "failed";
  isFormModalOpen: boolean;
  formMode: "create" | "edit";
  isDeleteConfirmOpen: boolean;
  error: string | null;
  notice: string | null;
};
