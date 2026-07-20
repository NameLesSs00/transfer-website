import { VehicleCategory } from "@/store/features/vehicleCategories/vehicleCategoriesModels";
import { VehicleFactory } from "@/store/features/vehicleFactories/vehicleFactoriesModels";

export type Vehicle = {
  id: number;
  name: string;
  model: string;
  year: number;
  licensePlate: string;
  capacity: number;
  imageUrl: string;
  isActive: boolean;
  vehicleCategoryId: number;
  vehicleCategoryName: string;
  vehicleCategory: VehicleCategory | null;
  vehicleFactoryId: number;
  vehicleFactoryName: string;
  vehicleFactory: VehicleFactory | null;
};

export type VehiclesQuery = {
  pageNumber: number;
  pageSize: number;
  search: string;
  sortBy: string;
  isDescending: boolean;
};

export type VehiclesResponse = {
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalRecords: number;
  success: boolean;
  message: string;
  data: Vehicle[];
  errors: unknown;
};

export type VehicleResponse = {
  success: boolean;
  message: string;
  data: Vehicle;
  errors: unknown;
};

export type CreateVehiclePayload = {
  name: string;
  model: string;
  year: number;
  licensePlate: string;
  capacity: number;
  imageFile: File;
  isActive: boolean;
  vehicleCategoryId: number;
  vehicleFactoryId: number;
};

export type UpdateVehiclePayload = {
  id: number;
  name: string;
  model: string;
  year: number;
  licensePlate: string;
  capacity: number;
  imageFile?: File | null;
  isActive: boolean;
  vehicleCategoryId: number;
  vehicleFactoryId: number;
};

export type VehiclesState = VehiclesQuery & {
  items: Vehicle[];
  selectedVehicle: Vehicle | null;
  vehiclePendingDelete: Vehicle | null;
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
