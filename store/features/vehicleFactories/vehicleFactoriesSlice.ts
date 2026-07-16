import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/store";
import {
  createVehicleFactoryRequest,
  deleteVehicleFactoryRequest,
  getVehicleFactoriesRequest,
  getVehicleFactoryRequest,
  updateVehicleFactoryRequest,
} from "./vehicleFactoriesApi";
import {
  UpdateVehicleFactoryPayload,
  VehicleFactoriesQuery,
  VehicleFactoriesResponse,
  VehicleFactoriesState,
  VehicleFactory,
  VehicleFactoryPayload,
} from "./vehicleFactoriesModels";

const initialQuery: VehicleFactoriesQuery = {
  pageNumber: 1,
  pageSize: 10,
  search: "",
  sortBy: "name",
  isDescending: false,
};

const initialState: VehicleFactoriesState = {
  ...initialQuery,
  items: [],
  selectedFactory: null,
  factoryPendingDelete: null,
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

function getQueryFromState(state: RootState, overrides: Partial<VehicleFactoriesQuery> = {}) {
  const current = state.vehicleFactories;

  return {
    pageNumber: current.pageNumber,
    pageSize: current.pageSize,
    search: current.search,
    sortBy: current.sortBy,
    isDescending: current.isDescending,
    ...overrides,
  };
}

export const fetchVehicleFactories = createAsyncThunk<
  VehicleFactoriesResponse,
  Partial<VehicleFactoriesQuery> | undefined,
  { state: RootState }
>("vehicleFactories/fetchVehicleFactories", async (overrides, { getState }) => {
  const state = getState();
  const query = getQueryFromState(state, overrides);
  return getVehicleFactoriesRequest(query, state.auth.accessToken);
});

export const fetchVehicleFactory = createAsyncThunk<
  VehicleFactory,
  number,
  { state: RootState }
>("vehicleFactories/fetchVehicleFactory", async (id, { getState }) => {
  const response = await getVehicleFactoryRequest(id, getState().auth.accessToken);
  return response.data;
});

export const createVehicleFactory = createAsyncThunk<
  string,
  VehicleFactoryPayload,
  { state: RootState }
>("vehicleFactories/createVehicleFactory", async (payload, { getState }) => {
  const response = await createVehicleFactoryRequest(payload, getState().auth.accessToken);
  return response.message || "Vehicle factory added successfully";
});

export const updateVehicleFactory = createAsyncThunk<
  string,
  UpdateVehicleFactoryPayload,
  { state: RootState }
>("vehicleFactories/updateVehicleFactory", async (payload, { getState }) => {
  const response = await updateVehicleFactoryRequest(payload, getState().auth.accessToken);
  return response.message || "Vehicle factory updated successfully";
});

export const removeVehicleFactory = createAsyncThunk<
  string,
  number,
  { state: RootState }
>("vehicleFactories/removeVehicleFactory", async (id, { getState }) => {
  const response = await deleteVehicleFactoryRequest(id, getState().auth.accessToken);
  return response.message || "Vehicle factory deleted successfully";
});

const vehicleFactoriesSlice = createSlice({
  name: "vehicleFactories",
  initialState,
  reducers: {
    openCreateVehicleFactoryModal(state) {
      state.formMode = "create";
      state.selectedFactory = null;
      state.isFormModalOpen = true;
    },
    openEditVehicleFactoryModal(state, action: PayloadAction<VehicleFactory>) {
      state.formMode = "edit";
      state.selectedFactory = action.payload;
      state.isFormModalOpen = true;
    },
    closeVehicleFactoryModal(state) {
      state.isFormModalOpen = false;
      state.selectedFactory = null;
      state.formMode = "create";
    },
    openDeleteVehicleFactoryConfirm(state, action: PayloadAction<VehicleFactory>) {
      state.factoryPendingDelete = action.payload;
      state.isDeleteConfirmOpen = true;
    },
    closeDeleteVehicleFactoryConfirm(state) {
      state.factoryPendingDelete = null;
      state.isDeleteConfirmOpen = false;
    },
    setVehicleFactoriesSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
      state.pageNumber = 1;
    },
    setVehicleFactoriesSort(state, action: PayloadAction<{ sortBy: string; isDescending: boolean }>) {
      state.sortBy = action.payload.sortBy;
      state.isDescending = action.payload.isDescending;
      state.pageNumber = 1;
    },
    clearVehicleFactoriesNotice(state) {
      state.notice = null;
    },
    clearVehicleFactoriesError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVehicleFactories.pending, (state) => {
        state.listStatus = "loading";
        state.error = null;
      })
      .addCase(fetchVehicleFactories.fulfilled, (state, action) => {
        state.listStatus = "succeeded";
        state.items = action.payload.data ?? [];
        state.pageNumber = action.payload.pageNumber || state.pageNumber;
        state.pageSize = action.payload.pageSize || state.pageSize;
        state.totalPages = action.payload.totalPages || 1;
        state.totalRecords = action.payload.totalRecords || action.payload.data?.length || 0;
      })
      .addCase(fetchVehicleFactories.rejected, (state, action) => {
        state.listStatus = "failed";
        state.error = getErrorMessage(action.error, "Unable to load vehicle factories");
      })
      .addCase(fetchVehicleFactory.pending, (state) => {
        state.detailStatus = "loading";
        state.error = null;
      })
      .addCase(fetchVehicleFactory.fulfilled, (state, action) => {
        state.detailStatus = "succeeded";
        state.selectedFactory = action.payload;
      })
      .addCase(fetchVehicleFactory.rejected, (state, action) => {
        state.detailStatus = "failed";
        state.error = getErrorMessage(action.error, "Unable to load vehicle factory");
      })
      .addCase(createVehicleFactory.pending, (state) => {
        state.createStatus = "loading";
        state.error = null;
        state.notice = null;
      })
      .addCase(createVehicleFactory.fulfilled, (state, action) => {
        state.createStatus = "succeeded";
        state.isFormModalOpen = false;
        state.notice = action.payload;
      })
      .addCase(createVehicleFactory.rejected, (state, action) => {
        state.createStatus = "failed";
        state.error = getErrorMessage(action.error, "Unable to add vehicle factory");
      })
      .addCase(updateVehicleFactory.pending, (state) => {
        state.updateStatus = "loading";
        state.error = null;
        state.notice = null;
      })
      .addCase(updateVehicleFactory.fulfilled, (state, action) => {
        state.updateStatus = "succeeded";
        state.isFormModalOpen = false;
        state.selectedFactory = null;
        state.notice = action.payload;
      })
      .addCase(updateVehicleFactory.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.error = getErrorMessage(action.error, "Unable to update vehicle factory");
      })
      .addCase(removeVehicleFactory.pending, (state) => {
        state.deleteStatus = "loading";
        state.error = null;
        state.notice = null;
      })
      .addCase(removeVehicleFactory.fulfilled, (state, action) => {
        state.deleteStatus = "succeeded";
        state.factoryPendingDelete = null;
        state.isDeleteConfirmOpen = false;
        state.notice = action.payload;
      })
      .addCase(removeVehicleFactory.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.error = getErrorMessage(action.error, "Unable to delete vehicle factory");
      });
  },
});

export const {
  clearVehicleFactoriesError,
  clearVehicleFactoriesNotice,
  closeDeleteVehicleFactoryConfirm,
  closeVehicleFactoryModal,
  openCreateVehicleFactoryModal,
  openDeleteVehicleFactoryConfirm,
  openEditVehicleFactoryModal,
  setVehicleFactoriesSearch,
  setVehicleFactoriesSort,
} = vehicleFactoriesSlice.actions;

export const vehicleFactoriesReducer = vehicleFactoriesSlice.reducer;
