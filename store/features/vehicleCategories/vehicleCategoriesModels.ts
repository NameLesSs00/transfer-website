export type VehicleCategoryPricingType = "FixedTrip" | "PerPerson";

export type VehicleCategoryPricingTypeValue = 0 | 1;

export type VehicleCategory = {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
  pricingType: VehicleCategoryPricingType;
};

export type VehicleCategoriesQuery = {
  pageNumber: number;
  pageSize: number;
  search: string;
  sortBy: string;
  isDescending: boolean;
};

export type VehicleCategoriesResponse = {
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalRecords: number;
  success: boolean;
  message: string;
  data: VehicleCategory[];
  errors: unknown;
};

export type VehicleCategoryResponse = {
  success: boolean;
  message: string;
  data: VehicleCategory;
  errors: unknown;
};

export type VehicleCategoryPayload = {
  name: string;
  description: string;
  pricingType: VehicleCategoryPricingTypeValue;
};

export type UpdateVehicleCategoryPayload = VehicleCategoryPayload & {
  id: number;
};

export type VehicleCategoriesState = VehicleCategoriesQuery & {
  items: VehicleCategory[];
  selectedCategory: VehicleCategory | null;
  categoryPendingDelete: VehicleCategory | null;
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
