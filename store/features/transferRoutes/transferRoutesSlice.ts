import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/store";
import { Location } from "../locations/locationsModels";
import {
  createTransferRouteRequest,
  deleteTransferRouteRequest,
  getTransferRouteLocationOptionsRequest,
  getTransferRouteRequest,
  getTransferRoutesRequest,
  updateTransferRouteRequest,
} from "./transferRoutesApi";
import {
  TransferRoute,
  TransferRoutePayload,
  TransferRoutesQuery,
  TransferRoutesResponse,
  TransferRoutesState,
  UpdateTransferRoutePayload,
} from "./transferRoutesModels";

const initialQuery: TransferRoutesQuery = {
  pageNumber: 1,
  pageSize: 10,
  search: "",
  sortBy: "originLocationName",
  isDescending: false,
};

const initialState: TransferRoutesState = {
  ...initialQuery,
  items: [],
  locationOptions: [],
  selectedRoute: null,
  routePendingDelete: null,
  totalPages: 1,
  totalRecords: 0,
  listStatus: "idle",
  detailStatus: "idle",
  createStatus: "idle",
  updateStatus: "idle",
  deleteStatus: "idle",
  locationOptionsStatus: "idle",
  isFormModalOpen: false,
  formMode: "create",
  isDeleteConfirmOpen: false,
  error: null,
  notice: null,
};

function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

function getQueryFromState(state: RootState, overrides: Partial<TransferRoutesQuery> = {}) {
  const current = state.transferRoutes;

  return {
    pageNumber: current.pageNumber,
    pageSize: current.pageSize,
    search: current.search,
    sortBy: current.sortBy,
    isDescending: current.isDescending,
    ...overrides,
  };
}

export const fetchTransferRoutes = createAsyncThunk<
  TransferRoutesResponse,
  Partial<TransferRoutesQuery> | undefined,
  { state: RootState }
>("transferRoutes/fetchTransferRoutes", async (overrides, { getState }) => {
  const state = getState();
  const query = getQueryFromState(state, overrides);
  return getTransferRoutesRequest(query, state.auth.accessToken);
});

export const fetchTransferRoute = createAsyncThunk<TransferRoute, number, { state: RootState }>(
  "transferRoutes/fetchTransferRoute",
  async (id, { getState }) => {
    const response = await getTransferRouteRequest(id, getState().auth.accessToken);
    return response.data;
  }
);

export const fetchTransferRouteLocationOptions = createAsyncThunk<
  Location[],
  void,
  { state: RootState }
>("transferRoutes/fetchTransferRouteLocationOptions", async (_, { getState }) => {
  const response = await getTransferRouteLocationOptionsRequest(getState().auth.accessToken);
  return response.data ?? [];
});

export const createTransferRoute = createAsyncThunk<
  string,
  TransferRoutePayload,
  { state: RootState }
>("transferRoutes/createTransferRoute", async (payload, { getState }) => {
  const response = await createTransferRouteRequest(payload, getState().auth.accessToken);
  return response.message || "Transfer route created successfully";
});

export const updateTransferRoute = createAsyncThunk<
  string,
  UpdateTransferRoutePayload,
  { state: RootState }
>("transferRoutes/updateTransferRoute", async (payload, { getState }) => {
  const response = await updateTransferRouteRequest(payload, getState().auth.accessToken);
  return response.message || "Transfer route updated successfully";
});

export const removeTransferRoute = createAsyncThunk<string, number, { state: RootState }>(
  "transferRoutes/removeTransferRoute",
  async (id, { getState }) => {
    const response = await deleteTransferRouteRequest(id, getState().auth.accessToken);
    return response.message || "Transfer route deleted successfully";
  }
);

const transferRoutesSlice = createSlice({
  name: "transferRoutes",
  initialState,
  reducers: {
    openCreateTransferRouteModal(state) {
      state.formMode = "create";
      state.selectedRoute = null;
      state.isFormModalOpen = true;
    },
    openEditTransferRouteModal(state, action: PayloadAction<TransferRoute>) {
      state.formMode = "edit";
      state.selectedRoute = action.payload;
      state.isFormModalOpen = true;
    },
    closeTransferRouteModal(state) {
      state.isFormModalOpen = false;
      state.selectedRoute = null;
      state.formMode = "create";
    },
    openDeleteTransferRouteConfirm(state, action: PayloadAction<TransferRoute>) {
      state.routePendingDelete = action.payload;
      state.isDeleteConfirmOpen = true;
    },
    closeDeleteTransferRouteConfirm(state) {
      state.routePendingDelete = null;
      state.isDeleteConfirmOpen = false;
    },
    setTransferRoutesSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
      state.pageNumber = 1;
    },
    setTransferRoutesSort(
      state,
      action: PayloadAction<{ sortBy: string; isDescending: boolean }>
    ) {
      state.sortBy = action.payload.sortBy;
      state.isDescending = action.payload.isDescending;
      state.pageNumber = 1;
    },
    clearTransferRoutesNotice(state) {
      state.notice = null;
    },
    clearTransferRoutesError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransferRoutes.pending, (state) => {
        state.listStatus = "loading";
        state.error = null;
      })
      .addCase(fetchTransferRoutes.fulfilled, (state, action) => {
        state.listStatus = "succeeded";
        state.items = action.payload.data ?? [];
        state.pageNumber = action.payload.pageNumber || state.pageNumber;
        state.pageSize = action.payload.pageSize || state.pageSize;
        state.totalPages = action.payload.totalPages || 1;
        state.totalRecords = action.payload.totalRecords || action.payload.data?.length || 0;
      })
      .addCase(fetchTransferRoutes.rejected, (state, action) => {
        state.listStatus = "failed";
        state.error = getErrorMessage(action.error, "Unable to load transfer routes");
      })
      .addCase(fetchTransferRoute.pending, (state) => {
        state.detailStatus = "loading";
        state.error = null;
      })
      .addCase(fetchTransferRoute.fulfilled, (state, action) => {
        state.detailStatus = "succeeded";
        state.selectedRoute = action.payload;
      })
      .addCase(fetchTransferRoute.rejected, (state, action) => {
        state.detailStatus = "failed";
        state.error = getErrorMessage(action.error, "Unable to load transfer route");
      })
      .addCase(fetchTransferRouteLocationOptions.pending, (state) => {
        state.locationOptionsStatus = "loading";
      })
      .addCase(fetchTransferRouteLocationOptions.fulfilled, (state, action) => {
        state.locationOptionsStatus = "succeeded";
        state.locationOptions = action.payload;
      })
      .addCase(fetchTransferRouteLocationOptions.rejected, (state, action) => {
        state.locationOptionsStatus = "failed";
        state.error = getErrorMessage(action.error, "Unable to load route location options");
      })
      .addCase(createTransferRoute.pending, (state) => {
        state.createStatus = "loading";
        state.error = null;
        state.notice = null;
      })
      .addCase(createTransferRoute.fulfilled, (state, action) => {
        state.createStatus = "succeeded";
        state.isFormModalOpen = false;
        state.notice = action.payload;
      })
      .addCase(createTransferRoute.rejected, (state, action) => {
        state.createStatus = "failed";
        state.error = getErrorMessage(action.error, "Unable to add transfer route");
      })
      .addCase(updateTransferRoute.pending, (state) => {
        state.updateStatus = "loading";
        state.error = null;
        state.notice = null;
      })
      .addCase(updateTransferRoute.fulfilled, (state, action) => {
        state.updateStatus = "succeeded";
        state.isFormModalOpen = false;
        state.selectedRoute = null;
        state.notice = action.payload;
      })
      .addCase(updateTransferRoute.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.error = getErrorMessage(action.error, "Unable to update transfer route");
      })
      .addCase(removeTransferRoute.pending, (state) => {
        state.deleteStatus = "loading";
        state.error = null;
        state.notice = null;
      })
      .addCase(removeTransferRoute.fulfilled, (state, action) => {
        state.deleteStatus = "succeeded";
        state.routePendingDelete = null;
        state.isDeleteConfirmOpen = false;
        state.notice = action.payload;
      })
      .addCase(removeTransferRoute.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.error = getErrorMessage(action.error, "Unable to delete transfer route");
      });
  },
});

export const {
  clearTransferRoutesError,
  clearTransferRoutesNotice,
  closeDeleteTransferRouteConfirm,
  closeTransferRouteModal,
  openCreateTransferRouteModal,
  openDeleteTransferRouteConfirm,
  openEditTransferRouteModal,
  setTransferRoutesSearch,
  setTransferRoutesSort,
} = transferRoutesSlice.actions;

export const transferRoutesReducer = transferRoutesSlice.reducer;
