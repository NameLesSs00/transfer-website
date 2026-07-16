export type VehicleFactory = {
  id: number;
  name: string;
};

export type VehicleFactoriesQuery = {
  pageNumber: number;
  pageSize: number;
  search: string;
  sortBy: string;
  isDescending: boolean;
};

export type VehicleFactoriesResponse = {
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalRecords: number;
  success: boolean;
  message: string;
  data: VehicleFactory[];
  errors: unknown;
};

export type VehicleFactoryResponse = {
  success: boolean;
  message: string;
  data: VehicleFactory;
  errors: unknown;
};

export type VehicleFactoryPayload = {
  name: string;
};

export type UpdateVehicleFactoryPayload = {
  id: number;
  name: string;
};

export type VehicleFactoriesState = VehicleFactoriesQuery & {
  items: VehicleFactory[];
  selectedFactory: VehicleFactory | null;
  factoryPendingDelete: VehicleFactory | null;
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
