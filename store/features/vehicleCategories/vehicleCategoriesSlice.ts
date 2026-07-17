import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/store";
import {
  createVehicleCategoryRequest,
  deleteVehicleCategoryRequest,
  getVehicleCategoriesRequest,
  getVehicleCategoryRequest,
  updateVehicleCategoryRequest,
} from "./vehicleCategoriesApi";
import {
  UpdateVehicleCategoryPayload,
  VehicleCategoriesQuery,
  VehicleCategoriesResponse,
  VehicleCategoriesState,
  VehicleCategory,
  VehicleCategoryPayload,
} from "./vehicleCategoriesModels";

const initialQuery: VehicleCategoriesQuery = {
  pageNumber: 1,
  pageSize: 10,
  search: "",
  sortBy: "name",
  isDescending: false,
};

const initialState: VehicleCategoriesState = {
  ...initialQuery,
  items: [],
  selectedCategory: null,
  categoryPendingDelete: null,
  totalPages: 1,
  totalRecords: 0,
  listStatus: "idle",
  detailStatus: "idle",
  createStatus: "idle",
  updateStatus: "idle",
  deleteStatus: "idle",
  isFormModalOpen: false,
  formMode: "create",
  isDeleteConfirmOpen: false,
  error: null,
  notice: null,
};

function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

function getQueryFromState(state: RootState, overrides: Partial<VehicleCategoriesQuery> = {}) {
  const current = state.vehicleCategories;

  return {
    pageNumber: current.pageNumber,
    pageSize: current.pageSize,
    search: current.search,
    sortBy: current.sortBy,
    isDescending: current.isDescending,
    ...overrides,
  };
}

export const fetchVehicleCategories = createAsyncThunk<
  VehicleCategoriesResponse,
  Partial<VehicleCategoriesQuery> | undefined,
  { state: RootState }
>("vehicleCategories/fetchVehicleCategories", async (overrides, { getState }) => {
  const state = getState();
  const query = getQueryFromState(state, overrides);
  return getVehicleCategoriesRequest(query, state.auth.accessToken);
});

export const fetchVehicleCategory = createAsyncThunk<
  VehicleCategory,
  number,
  { state: RootState }
>("vehicleCategories/fetchVehicleCategory", async (id, { getState }) => {
  const response = await getVehicleCategoryRequest(id, getState().auth.accessToken);
  return response.data;
});

export const createVehicleCategory = createAsyncThunk<
  string,
  VehicleCategoryPayload,
  { state: RootState }
>("vehicleCategories/createVehicleCategory", async (payload, { getState }) => {
  const response = await createVehicleCategoryRequest(payload, getState().auth.accessToken);
  return response.message || "Vehicle category added successfully";
});

export const updateVehicleCategory = createAsyncThunk<
  string,
  UpdateVehicleCategoryPayload,
  { state: RootState }
>("vehicleCategories/updateVehicleCategory", async (payload, { getState }) => {
  const response = await updateVehicleCategoryRequest(payload, getState().auth.accessToken);
  return response.message || "Vehicle category updated successfully";
});

export const removeVehicleCategory = createAsyncThunk<
  string,
  number,
  { state: RootState }
>("vehicleCategories/removeVehicleCategory", async (id, { getState }) => {
  const response = await deleteVehicleCategoryRequest(id, getState().auth.accessToken);
  return response.message || "Vehicle category deleted successfully";
});

const vehicleCategoriesSlice = createSlice({
  name: "vehicleCategories",
  initialState,
  reducers: {
    openCreateVehicleCategoryModal(state) {
      state.formMode = "create";
      state.selectedCategory = null;
      state.isFormModalOpen = true;
    },
    openEditVehicleCategoryModal(state, action: PayloadAction<VehicleCategory>) {
      state.formMode = "edit";
      state.selectedCategory = action.payload;
      state.isFormModalOpen = true;
    },
    closeVehicleCategoryModal(state) {
      state.isFormModalOpen = false;
      state.selectedCategory = null;
      state.formMode = "create";
    },
    openDeleteVehicleCategoryConfirm(state, action: PayloadAction<VehicleCategory>) {
      state.categoryPendingDelete = action.payload;
      state.isDeleteConfirmOpen = true;
    },
    closeDeleteVehicleCategoryConfirm(state) {
      state.categoryPendingDelete = null;
      state.isDeleteConfirmOpen = false;
    },
    setVehicleCategoriesSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
      state.pageNumber = 1;
    },
    setVehicleCategoriesSort(state, action: PayloadAction<{ sortBy: string; isDescending: boolean }>) {
      state.sortBy = action.payload.sortBy;
      state.isDescending = action.payload.isDescending;
      state.pageNumber = 1;
    },
    clearVehicleCategoriesNotice(state) {
      state.notice = null;
    },
    clearVehicleCategoriesError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVehicleCategories.pending, (state) => {
        state.listStatus = "loading";
        state.error = null;
      })
      .addCase(fetchVehicleCategories.fulfilled, (state, action) => {
        state.listStatus = "succeeded";
        state.items = action.payload.data ?? [];
        state.pageNumber = action.payload.pageNumber || state.pageNumber;
        state.pageSize = action.payload.pageSize || state.pageSize;
        state.totalPages = action.payload.totalPages || 1;
        state.totalRecords = action.payload.totalRecords || action.payload.data?.length || 0;
      })
      .addCase(fetchVehicleCategories.rejected, (state, action) => {
        state.listStatus = "failed";
        state.error = getErrorMessage(action.error, "Unable to load vehicle categories");
      })
      .addCase(fetchVehicleCategory.pending, (state) => {
        state.detailStatus = "loading";
        state.error = null;
      })
      .addCase(fetchVehicleCategory.fulfilled, (state, action) => {
        state.detailStatus = "succeeded";
        state.selectedCategory = action.payload;
      })
      .addCase(fetchVehicleCategory.rejected, (state, action) => {
        state.detailStatus = "failed";
        state.error = getErrorMessage(action.error, "Unable to load vehicle category");
      })
      .addCase(createVehicleCategory.pending, (state) => {
        state.createStatus = "loading";
        state.error = null;
        state.notice = null;
      })
      .addCase(createVehicleCategory.fulfilled, (state, action) => {
        state.createStatus = "succeeded";
        state.isFormModalOpen = false;
        state.notice = action.payload;
      })
      .addCase(createVehicleCategory.rejected, (state, action) => {
        state.createStatus = "failed";
        state.error = getErrorMessage(action.error, "Unable to add vehicle category");
      })
      .addCase(updateVehicleCategory.pending, (state) => {
        state.updateStatus = "loading";
        state.error = null;
        state.notice = null;
      })
      .addCase(updateVehicleCategory.fulfilled, (state, action) => {
        state.updateStatus = "succeeded";
        state.isFormModalOpen = false;
        state.selectedCategory = null;
        state.notice = action.payload;
      })
      .addCase(updateVehicleCategory.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.error = getErrorMessage(action.error, "Unable to update vehicle category");
      })
      .addCase(removeVehicleCategory.pending, (state) => {
        state.deleteStatus = "loading";
        state.error = null;
        state.notice = null;
      })
      .addCase(removeVehicleCategory.fulfilled, (state, action) => {
        state.deleteStatus = "succeeded";
        state.categoryPendingDelete = null;
        state.isDeleteConfirmOpen = false;
        state.notice = action.payload;
      })
      .addCase(removeVehicleCategory.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.error = getErrorMessage(action.error, "Unable to delete vehicle category");
      });
  },
});

export const {
  clearVehicleCategoriesError,
  clearVehicleCategoriesNotice,
  closeDeleteVehicleCategoryConfirm,
  closeVehicleCategoryModal,
  openCreateVehicleCategoryModal,
  openDeleteVehicleCategoryConfirm,
  openEditVehicleCategoryModal,
  setVehicleCategoriesSearch,
  setVehicleCategoriesSort,
} = vehicleCategoriesSlice.actions;

export const vehicleCategoriesReducer = vehicleCategoriesSlice.reducer;
