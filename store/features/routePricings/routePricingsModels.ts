import { TransferRoute } from "../transferRoutes/transferRoutesModels";
import { VehicleCategory } from "../vehicleCategories/vehicleCategoriesModels";

export type RoutePricing = {
  id: number;
  vehicleCategoryName: string | null;
  locationFrom: string | null;
  locationTo: string | null;
  price: number;
  isActive: boolean;
};

export type RoutePricingsQuery = {
  pageNumber: number;
  pageSize: number;
  search: string;
  sortBy: string;
  isDescending: boolean;
};

export type RoutePricingsResponse = {
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalRecords: number;
  success: boolean;
  message: string;
  data: RoutePricing[];
  errors: unknown;
};

export type RoutePricingResponse = {
  success: boolean;
  message: string;
  data: RoutePricing;
  errors: unknown;
};

export type RoutePricingPayload = {
  transferRouteId: number;
  vehicleCategoryId: number;
  price: number;
  isActive: boolean;
};

export type UpdateRoutePricingPayload = RoutePricingPayload & {
  id: number;
};

export type RoutePricingsState = RoutePricingsQuery & {
  items: RoutePricing[];
  transferRouteOptions: TransferRoute[];
  vehicleCategoryOptions: VehicleCategory[];
  selectedPricing: RoutePricing | null;
  pricingPendingDelete: RoutePricing | null;
  totalPages: number;
  totalRecords: number;
  listStatus: "idle" | "loading" | "succeeded" | "failed";
  detailStatus: "idle" | "loading" | "succeeded" | "failed";
  createStatus: "idle" | "loading" | "succeeded" | "failed";
  updateStatus: "idle" | "loading" | "succeeded" | "failed";
  deleteStatus: "idle" | "loading" | "succeeded" | "failed";
  transferRouteOptionsStatus: "idle" | "loading" | "succeeded" | "failed";
  vehicleCategoryOptionsStatus: "idle" | "loading" | "succeeded" | "failed";
  isFormModalOpen: boolean;
  formMode: "create" | "edit";
  isDeleteConfirmOpen: boolean;
  error: string | null;
  notice: string | null;
};
