import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/store";
import { TransferRoute } from "../transferRoutes/transferRoutesModels";
import { VehicleCategory } from "../vehicleCategories/vehicleCategoriesModels";
import {
  createRoutePricingRequest,
  deleteRoutePricingRequest,
  getRoutePricingRequest,
  getRoutePricingsRequest,
  getRoutePricingTransferRouteOptionsRequest,
  getRoutePricingVehicleCategoryOptionsRequest,
  updateRoutePricingRequest,
} from "./routePricingsApi";
import {
  RoutePricing,
  RoutePricingPayload,
  RoutePricingsQuery,
  RoutePricingsResponse,
  RoutePricingsState,
  UpdateRoutePricingPayload,
} from "./routePricingsModels";

const initialQuery: RoutePricingsQuery = {
  pageNumber: 1,
  pageSize: 10,
  search: "",
  sortBy: "vehicleCategoryName",
  isDescending: false,
};

const initialState: RoutePricingsState = {
  ...initialQuery,
  items: [],
  transferRouteOptions: [],
  vehicleCategoryOptions: [],
  selectedPricing: null,
  pricingPendingDelete: null,
  totalPages: 1,
  totalRecords: 0,
  listStatus: "idle",
  detailStatus: "idle",
  createStatus: "idle",
  updateStatus: "idle",
  deleteStatus: "idle",
  transferRouteOptionsStatus: "idle",
  vehicleCategoryOptionsStatus: "idle",
  isFormModalOpen: false,
  formMode: "create",
  isDeleteConfirmOpen: false,
  error: null,
  notice: null,
};

function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

function getQueryFromState(state: RootState, overrides: Partial<RoutePricingsQuery> = {}) {
  const current = state.routePricings;

  return {
    pageNumber: current.pageNumber,
    pageSize: current.pageSize,
    search: current.search,
    sortBy: current.sortBy,
    isDescending: current.isDescending,
    ...overrides,
  };
}

export const fetchRoutePricings = createAsyncThunk<
  RoutePricingsResponse,
  Partial<RoutePricingsQuery> | undefined,
  { state: RootState }
>("routePricings/fetchRoutePricings", async (overrides, { getState }) => {
  const state = getState();
  const query = getQueryFromState(state, overrides);
  return getRoutePricingsRequest(query, state.auth.accessToken);
});

export const fetchRoutePricing = createAsyncThunk<RoutePricing, number, { state: RootState }>(
  "routePricings/fetchRoutePricing",
  async (id, { getState }) => {
    const response = await getRoutePricingRequest(id, getState().auth.accessToken);
    return response.data;
  }
);

export const fetchRoutePricingTransferRouteOptions = createAsyncThunk<
  TransferRoute[],
  void,
  { state: RootState }
>("routePricings/fetchRoutePricingTransferRouteOptions", async (_, { getState }) => {
  const response = await getRoutePricingTransferRouteOptionsRequest(
    getState().auth.accessToken
  );
  return response.data ?? [];
});

export const fetchRoutePricingVehicleCategoryOptions = createAsyncThunk<
  VehicleCategory[],
  void,
  { state: RootState }
>("routePricings/fetchRoutePricingVehicleCategoryOptions", async (_, { getState }) => {
  const response = await getRoutePricingVehicleCategoryOptionsRequest(
    getState().auth.accessToken
  );
  return response.data ?? [];
});

export const createRoutePricing = createAsyncThunk<
  string,
  RoutePricingPayload,
  { state: RootState }
>("routePricings/createRoutePricing", async (payload, { getState }) => {
  const response = await createRoutePricingRequest(payload, getState().auth.accessToken);
  return response.message || "Route pricing created successfully";
});

export const updateRoutePricing = createAsyncThunk<
  string,
  UpdateRoutePricingPayload,
  { state: RootState }
>("routePricings/updateRoutePricing", async (payload, { getState }) => {
  const response = await updateRoutePricingRequest(payload, getState().auth.accessToken);
  return response.message || "Route pricing updated successfully";
});

export const removeRoutePricing = createAsyncThunk<string, number, { state: RootState }>(
  "routePricings/removeRoutePricing",
  async (id, { getState }) => {
    const response = await deleteRoutePricingRequest(id, getState().auth.accessToken);
    return response.message || "Route pricing deleted successfully";
  }
);

const routePricingsSlice = createSlice({
  name: "routePricings",
  initialState,
  reducers: {
    openCreateRoutePricingModal(state) {
      state.formMode = "create";
      state.selectedPricing = null;
      state.isFormModalOpen = true;
    },
    openEditRoutePricingModal(state, action: PayloadAction<RoutePricing>) {
      state.formMode = "edit";
      state.selectedPricing = action.payload;
      state.isFormModalOpen = true;
    },
    closeRoutePricingModal(state) {
      state.isFormModalOpen = false;
      state.selectedPricing = null;
      state.formMode = "create";
    },
    openDeleteRoutePricingConfirm(state, action: PayloadAction<RoutePricing>) {
      state.pricingPendingDelete = action.payload;
      state.isDeleteConfirmOpen = true;
    },
    closeDeleteRoutePricingConfirm(state) {
      state.pricingPendingDelete = null;
      state.isDeleteConfirmOpen = false;
    },
    setRoutePricingsSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
      state.pageNumber = 1;
    },
    setRoutePricingsSort(
      state,
      action: PayloadAction<{ sortBy: string; isDescending: boolean }>
    ) {
      state.sortBy = action.payload.sortBy;
      state.isDescending = action.payload.isDescending;
      state.pageNumber = 1;
    },
    clearRoutePricingsNotice(state) {
      state.notice = null;
    },
    clearRoutePricingsError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoutePricings.pending, (state) => {
        state.listStatus = "loading";
        state.error = null;
      })
      .addCase(fetchRoutePricings.fulfilled, (state, action) => {
        state.listStatus = "succeeded";
        state.items = action.payload.data ?? [];
        state.pageNumber = action.payload.pageNumber || state.pageNumber;
        state.pageSize = action.payload.pageSize || state.pageSize;
        state.totalPages = action.payload.totalPages || 1;
        state.totalRecords = action.payload.totalRecords || action.payload.data?.length || 0;
      })
      .addCase(fetchRoutePricings.rejected, (state, action) => {
        state.listStatus = "failed";
        state.error = getErrorMessage(action.error, "Unable to load route pricings");
      })
      .addCase(fetchRoutePricing.pending, (state) => {
        state.detailStatus = "loading";
        state.error = null;
      })
      .addCase(fetchRoutePricing.fulfilled, (state, action) => {
        state.detailStatus = "succeeded";
        state.selectedPricing = action.payload;
      })
      .addCase(fetchRoutePricing.rejected, (state, action) => {
        state.detailStatus = "failed";
        state.error = getErrorMessage(action.error, "Unable to load route pricing");
      })
      .addCase(fetchRoutePricingTransferRouteOptions.pending, (state) => {
        state.transferRouteOptionsStatus = "loading";
      })
      .addCase(fetchRoutePricingTransferRouteOptions.fulfilled, (state, action) => {
        state.transferRouteOptionsStatus = "succeeded";
        state.transferRouteOptions = action.payload;
      })
      .addCase(fetchRoutePricingTransferRouteOptions.rejected, (state, action) => {
        state.transferRouteOptionsStatus = "failed";
        state.error = getErrorMessage(action.error, "Unable to load transfer route options");
      })
      .addCase(fetchRoutePricingVehicleCategoryOptions.pending, (state) => {
        state.vehicleCategoryOptionsStatus = "loading";
      })
      .addCase(fetchRoutePricingVehicleCategoryOptions.fulfilled, (state, action) => {
        state.vehicleCategoryOptionsStatus = "succeeded";
        state.vehicleCategoryOptions = action.payload;
      })
      .addCase(fetchRoutePricingVehicleCategoryOptions.rejected, (state, action) => {
        state.vehicleCategoryOptionsStatus = "failed";
        state.error = getErrorMessage(action.error, "Unable to load vehicle category options");
      })
      .addCase(createRoutePricing.pending, (state) => {
        state.createStatus = "loading";
        state.error = null;
        state.notice = null;
      })
      .addCase(createRoutePricing.fulfilled, (state, action) => {
        state.createStatus = "succeeded";
        state.isFormModalOpen = false;
        state.notice = action.payload;
      })
      .addCase(createRoutePricing.rejected, (state, action) => {
        state.createStatus = "failed";
        state.error = getErrorMessage(action.error, "Unable to add route pricing");
      })
      .addCase(updateRoutePricing.pending, (state) => {
        state.updateStatus = "loading";
        state.error = null;
        state.notice = null;
      })
      .addCase(updateRoutePricing.fulfilled, (state, action) => {
        state.updateStatus = "succeeded";
        state.isFormModalOpen = false;
        state.selectedPricing = null;
        state.notice = action.payload;
      })
      .addCase(updateRoutePricing.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.error = getErrorMessage(action.error, "Unable to update route pricing");
      })
      .addCase(removeRoutePricing.pending, (state) => {
        state.deleteStatus = "loading";
        state.error = null;
        state.notice = null;
      })
      .addCase(removeRoutePricing.fulfilled, (state, action) => {
        state.deleteStatus = "succeeded";
        state.pricingPendingDelete = null;
        state.isDeleteConfirmOpen = false;
        state.notice = action.payload;
      })
      .addCase(removeRoutePricing.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.error = getErrorMessage(action.error, "Unable to delete route pricing");
      });
  },
});

export const {
  clearRoutePricingsError,
  clearRoutePricingsNotice,
  closeDeleteRoutePricingConfirm,
  closeRoutePricingModal,
  openCreateRoutePricingModal,
  openDeleteRoutePricingConfirm,
  openEditRoutePricingModal,
  setRoutePricingsSearch,
  setRoutePricingsSort,
} = routePricingsSlice.actions;

export const routePricingsReducer = routePricingsSlice.reducer;
