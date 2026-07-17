import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/store";
import {
  createVehicleRequest,
  deleteVehicleRequest,
  getVehicleRequest,
  getVehiclesRequest,
  updateVehicleRequest,
} from "./vehiclesApi";
import {
  CreateVehiclePayload,
  UpdateVehiclePayload,
  Vehicle,
  VehiclesQuery,
  VehiclesResponse,
  VehiclesState,
} from "./vehiclesModels";

const initialQuery: VehiclesQuery = {
  pageNumber: 1,
  pageSize: 10,
  search: "",
  sortBy: "name",
  isDescending: false,
};

const initialState: VehiclesState = {
  ...initialQuery,
  items: [],
  selectedVehicle: null,
  vehiclePendingDelete: null,
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

function getQueryFromState(state: RootState, overrides: Partial<VehiclesQuery> = {}) {
  const current = state.vehicles;

  return {
    pageNumber: current.pageNumber,
    pageSize: current.pageSize,
    search: current.search,
    sortBy: current.sortBy,
    isDescending: current.isDescending,
    ...overrides,
  };
}

export const fetchVehicles = createAsyncThunk<
  VehiclesResponse,
  Partial<VehiclesQuery> | undefined,
  { state: RootState }
>("vehicles/fetchVehicles", async (overrides, { getState }) => {
  const state = getState();
  const query = getQueryFromState(state, overrides);
  return getVehiclesRequest(query, state.auth.accessToken);
});

export const fetchVehicle = createAsyncThunk<Vehicle, number, { state: RootState }>(
  "vehicles/fetchVehicle",
  async (id, { getState }) => {
    const response = await getVehicleRequest(id, getState().auth.accessToken);
    return response.data;
  }
);

export const createVehicle = createAsyncThunk<string, CreateVehiclePayload, { state: RootState }>(
  "vehicles/createVehicle",
  async (payload, { getState }) => {
    const response = await createVehicleRequest(payload, getState().auth.accessToken);
    return response.message || "Vehicle created successfully";
  }
);

export const updateVehicle = createAsyncThunk<string, UpdateVehiclePayload, { state: RootState }>(
  "vehicles/updateVehicle",
  async (payload, { getState }) => {
    const response = await updateVehicleRequest(payload, getState().auth.accessToken);
    return response.message || "Vehicle updated successfully";
  }
);

export const removeVehicle = createAsyncThunk<string, number, { state: RootState }>(
  "vehicles/removeVehicle",
  async (id, { getState }) => {
    const response = await deleteVehicleRequest(id, getState().auth.accessToken);
    return response.message || "Vehicle deleted successfully";
  }
);

const vehiclesSlice = createSlice({
  name: "vehicles",
  initialState,
  reducers: {
    openCreateVehicleModal(state) {
      state.formMode = "create";
      state.selectedVehicle = null;
      state.isFormModalOpen = true;
    },
    openEditVehicleModal(state, action: PayloadAction<Vehicle>) {
      state.formMode = "edit";
      state.selectedVehicle = action.payload;
      state.isFormModalOpen = true;
    },
    closeVehicleModal(state) {
      state.isFormModalOpen = false;
      state.selectedVehicle = null;
      state.formMode = "create";
    },
    openDeleteVehicleConfirm(state, action: PayloadAction<Vehicle>) {
      state.vehiclePendingDelete = action.payload;
      state.isDeleteConfirmOpen = true;
    },
    closeDeleteVehicleConfirm(state) {
      state.vehiclePendingDelete = null;
      state.isDeleteConfirmOpen = false;
    },
    setVehiclesSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
      state.pageNumber = 1;
    },
    setVehiclesSort(state, action: PayloadAction<{ sortBy: string; isDescending: boolean }>) {
      state.sortBy = action.payload.sortBy;
      state.isDescending = action.payload.isDescending;
      state.pageNumber = 1;
    },
    clearVehiclesNotice(state) {
      state.notice = null;
    },
    clearVehiclesError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVehicles.pending, (state) => {
        state.listStatus = "loading";
        state.error = null;
      })
      .addCase(fetchVehicles.fulfilled, (state, action) => {
        state.listStatus = "succeeded";
        state.items = action.payload.data ?? [];
        state.pageNumber = action.payload.pageNumber || state.pageNumber;
        state.pageSize = action.payload.pageSize || state.pageSize;
        state.totalPages = action.payload.totalPages || 1;
        state.totalRecords = action.payload.totalRecords || action.payload.data?.length || 0;
      })
      .addCase(fetchVehicles.rejected, (state, action) => {
        state.listStatus = "failed";
        state.error = getErrorMessage(action.error, "Unable to load vehicles");
      })
      .addCase(fetchVehicle.pending, (state) => {
        state.detailStatus = "loading";
        state.error = null;
      })
      .addCase(fetchVehicle.fulfilled, (state, action) => {
        state.detailStatus = "succeeded";
        state.selectedVehicle = action.payload;
      })
      .addCase(fetchVehicle.rejected, (state, action) => {
        state.detailStatus = "failed";
        state.error = getErrorMessage(action.error, "Unable to load vehicle");
      })
      .addCase(createVehicle.pending, (state) => {
        state.createStatus = "loading";
        state.error = null;
        state.notice = null;
      })
      .addCase(createVehicle.fulfilled, (state, action) => {
        state.createStatus = "succeeded";
        state.isFormModalOpen = false;
        state.notice = action.payload;
      })
      .addCase(createVehicle.rejected, (state, action) => {
        state.createStatus = "failed";
        state.error = getErrorMessage(action.error, "Unable to create vehicle");
      })
      .addCase(updateVehicle.pending, (state) => {
        state.updateStatus = "loading";
        state.error = null;
        state.notice = null;
      })
      .addCase(updateVehicle.fulfilled, (state, action) => {
        state.updateStatus = "succeeded";
        state.isFormModalOpen = false;
        state.selectedVehicle = null;
        state.notice = action.payload;
      })
      .addCase(updateVehicle.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.error = getErrorMessage(action.error, "Unable to update vehicle");
      })
      .addCase(removeVehicle.pending, (state) => {
        state.deleteStatus = "loading";
        state.error = null;
        state.notice = null;
      })
      .addCase(removeVehicle.fulfilled, (state, action) => {
        state.deleteStatus = "succeeded";
        state.vehiclePendingDelete = null;
        state.isDeleteConfirmOpen = false;
        state.notice = action.payload;
      })
      .addCase(removeVehicle.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.error = getErrorMessage(action.error, "Unable to delete vehicle");
      });
  },
});

export const {
  clearVehiclesError,
  clearVehiclesNotice,
  closeDeleteVehicleConfirm,
  closeVehicleModal,
  openCreateVehicleModal,
  openDeleteVehicleConfirm,
  openEditVehicleModal,
  setVehiclesSearch,
  setVehiclesSort,
} = vehiclesSlice.actions;

export const vehiclesReducer = vehiclesSlice.reducer;
