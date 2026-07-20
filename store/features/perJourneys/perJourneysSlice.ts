import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/store";
import { LocationJourney } from "../locationJourneys/locationJourneysModels";
import { Vehicle } from "../vehicles/vehiclesModels";
import {
  createPerJourneyRequest,
  deletePerJourneyRequest,
  getPerJourneyLocationJourneyOptionsRequest,
  getPerJourneyRequest,
  getPerJourneysRequest,
  getPerJourneyVehicleOptionsRequest,
  updatePerJourneyRequest,
} from "./perJourneysApi";
import {
  PerJourney,
  PerJourneyPayload,
  PerJourneysQuery,
  PerJourneysResponse,
  PerJourneysState,
  UpdatePerJourneyPayload,
} from "./perJourneysModels";

const initialQuery: PerJourneysQuery = {
  pageNumber: 1,
  pageSize: 10,
  search: "",
  sortBy: "fromLocationId",
  isDescending: false,
};

const initialState: PerJourneysState = {
  ...initialQuery,
  items: [],
  locationJourneyOptions: [],
  vehicleOptions: [],
  selectedPerJourney: null,
  perJourneyPendingDelete: null,
  totalPages: 1,
  totalRecords: 0,
  listStatus: "idle",
  detailStatus: "idle",
  createStatus: "idle",
  updateStatus: "idle",
  deleteStatus: "idle",
  locationJourneyOptionsStatus: "idle",
  vehicleOptionsStatus: "idle",
  isFormModalOpen: false,
  formMode: "create",
  isDeleteConfirmOpen: false,
  error: null,
  notice: null,
};

function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

function getPositiveNumber(value: unknown, fallback: number) {
  return typeof value === "number" && Number.isFinite(value) && value > 0
    ? value
    : fallback;
}

function getQueryFromState(state: RootState, overrides: Partial<PerJourneysQuery> = {}) {
  const current = state.perJourneys;

  return {
    pageNumber: current.pageNumber,
    pageSize: current.pageSize,
    search: current.search,
    sortBy: current.sortBy,
    isDescending: current.isDescending,
    ...overrides,
  };
}

export const fetchPerJourneys = createAsyncThunk<
  PerJourneysResponse,
  Partial<PerJourneysQuery> | undefined,
  { state: RootState }
>("perJourneys/fetchPerJourneys", async (overrides, { getState }) => {
  const state = getState();
  const query = getQueryFromState(state, overrides);
  return getPerJourneysRequest(query, state.auth.accessToken);
});

export const fetchPerJourney = createAsyncThunk<PerJourney, number, { state: RootState }>(
  "perJourneys/fetchPerJourney",
  async (id, { getState }) => {
    const response = await getPerJourneyRequest(id, getState().auth.accessToken);
    return response.data;
  }
);

export const fetchPerJourneyLocationJourneyOptions = createAsyncThunk<
  LocationJourney[],
  void,
  { state: RootState }
>("perJourneys/fetchPerJourneyLocationJourneyOptions", async (_, { getState }) => {
  const response = await getPerJourneyLocationJourneyOptionsRequest(getState().auth.accessToken);
  return response.data ?? [];
});

export const fetchPerJourneyVehicleOptions = createAsyncThunk<
  Vehicle[],
  void,
  { state: RootState }
>("perJourneys/fetchPerJourneyVehicleOptions", async (_, { getState }) => {
  const response = await getPerJourneyVehicleOptionsRequest(getState().auth.accessToken);
  return response.data ?? [];
});

export const createPerJourney = createAsyncThunk<
  string,
  PerJourneyPayload,
  { state: RootState }
>("perJourneys/createPerJourney", async (payload, { getState }) => {
  const response = await createPerJourneyRequest(payload, getState().auth.accessToken);
  return response.message || "Per journey created successfully";
});

export const updatePerJourney = createAsyncThunk<
  string,
  UpdatePerJourneyPayload,
  { state: RootState }
>("perJourneys/updatePerJourney", async (payload, { getState }) => {
  const response = await updatePerJourneyRequest(payload, getState().auth.accessToken);
  return response.message || "Per journey updated successfully";
});

export const removePerJourney = createAsyncThunk<string, number, { state: RootState }>(
  "perJourneys/removePerJourney",
  async (id, { getState }) => {
    const response = await deletePerJourneyRequest(id, getState().auth.accessToken);
    return response.message || "Per journey deleted successfully";
  }
);

const perJourneysSlice = createSlice({
  name: "perJourneys",
  initialState,
  reducers: {
    openCreatePerJourneyModal(state) {
      state.formMode = "create";
      state.selectedPerJourney = null;
      state.isFormModalOpen = true;
    },
    openEditPerJourneyModal(state, action: PayloadAction<PerJourney>) {
      state.formMode = "edit";
      state.selectedPerJourney = action.payload;
      state.isFormModalOpen = true;
    },
    closePerJourneyModal(state) {
      state.isFormModalOpen = false;
      state.selectedPerJourney = null;
      state.formMode = "create";
    },
    openDeletePerJourneyConfirm(state, action: PayloadAction<PerJourney>) {
      state.perJourneyPendingDelete = action.payload;
      state.isDeleteConfirmOpen = true;
    },
    closeDeletePerJourneyConfirm(state) {
      state.perJourneyPendingDelete = null;
      state.isDeleteConfirmOpen = false;
    },
    setPerJourneysSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
      state.pageNumber = 1;
    },
    setPerJourneysSort(state, action: PayloadAction<{ sortBy: string; isDescending: boolean }>) {
      state.sortBy = action.payload.sortBy;
      state.isDescending = action.payload.isDescending;
      state.pageNumber = 1;
    },
    clearPerJourneysNotice(state) {
      state.notice = null;
    },
    clearPerJourneysError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPerJourneys.pending, (state) => {
        state.listStatus = "loading";
        state.error = null;
      })
      .addCase(fetchPerJourneys.fulfilled, (state, action) => {
        const requestedQuery = action.meta.arg;
        const pageNumber = getPositiveNumber(requestedQuery?.pageNumber, state.pageNumber);
        const pageSize = getPositiveNumber(requestedQuery?.pageSize, state.pageSize);
        const totalRecords = getPositiveNumber(
          action.payload.totalRecords,
          action.payload.data?.length ?? 0
        );

        state.listStatus = "succeeded";
        state.items = action.payload.data ?? [];
        state.pageNumber = pageNumber;
        state.pageSize = pageSize;
        state.totalPages = Math.max(1, Math.ceil(totalRecords / pageSize));
        state.totalRecords = totalRecords;
      })
      .addCase(fetchPerJourneys.rejected, (state, action) => {
        state.listStatus = "failed";
        state.error = getErrorMessage(action.error, "Unable to load per journeys");
      })
      .addCase(fetchPerJourney.pending, (state) => {
        state.detailStatus = "loading";
        state.error = null;
      })
      .addCase(fetchPerJourney.fulfilled, (state, action) => {
        state.detailStatus = "succeeded";
        state.selectedPerJourney = action.payload;
      })
      .addCase(fetchPerJourney.rejected, (state, action) => {
        state.detailStatus = "failed";
        state.error = getErrorMessage(action.error, "Unable to load per journey");
      })
      .addCase(fetchPerJourneyLocationJourneyOptions.pending, (state) => {
        state.locationJourneyOptionsStatus = "loading";
      })
      .addCase(fetchPerJourneyLocationJourneyOptions.fulfilled, (state, action) => {
        state.locationJourneyOptionsStatus = "succeeded";
        state.locationJourneyOptions = action.payload;
      })
      .addCase(fetchPerJourneyLocationJourneyOptions.rejected, (state, action) => {
        state.locationJourneyOptionsStatus = "failed";
        state.error = getErrorMessage(action.error, "Unable to load location journey options");
      })
      .addCase(fetchPerJourneyVehicleOptions.pending, (state) => {
        state.vehicleOptionsStatus = "loading";
      })
      .addCase(fetchPerJourneyVehicleOptions.fulfilled, (state, action) => {
        state.vehicleOptionsStatus = "succeeded";
        state.vehicleOptions = action.payload;
      })
      .addCase(fetchPerJourneyVehicleOptions.rejected, (state, action) => {
        state.vehicleOptionsStatus = "failed";
        state.error = getErrorMessage(action.error, "Unable to load vehicle options");
      })
      .addCase(createPerJourney.pending, (state) => {
        state.createStatus = "loading";
        state.error = null;
        state.notice = null;
      })
      .addCase(createPerJourney.fulfilled, (state, action) => {
        state.createStatus = "succeeded";
        state.isFormModalOpen = false;
        state.notice = action.payload;
      })
      .addCase(createPerJourney.rejected, (state, action) => {
        state.createStatus = "failed";
        state.error = getErrorMessage(action.error, "Unable to create per journey");
      })
      .addCase(updatePerJourney.pending, (state) => {
        state.updateStatus = "loading";
        state.error = null;
        state.notice = null;
      })
      .addCase(updatePerJourney.fulfilled, (state, action) => {
        state.updateStatus = "succeeded";
        state.isFormModalOpen = false;
        state.selectedPerJourney = null;
        state.notice = action.payload;
      })
      .addCase(updatePerJourney.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.error = getErrorMessage(action.error, "Unable to update per journey");
      })
      .addCase(removePerJourney.pending, (state) => {
        state.deleteStatus = "loading";
        state.error = null;
        state.notice = null;
      })
      .addCase(removePerJourney.fulfilled, (state, action) => {
        state.deleteStatus = "succeeded";
        state.perJourneyPendingDelete = null;
        state.isDeleteConfirmOpen = false;
        state.notice = action.payload;
      })
      .addCase(removePerJourney.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.error = getErrorMessage(action.error, "Unable to delete per journey");
      });
  },
});

export const {
  clearPerJourneysError,
  clearPerJourneysNotice,
  closeDeletePerJourneyConfirm,
  closePerJourneyModal,
  openCreatePerJourneyModal,
  openDeletePerJourneyConfirm,
  openEditPerJourneyModal,
  setPerJourneysSearch,
  setPerJourneysSort,
} = perJourneysSlice.actions;

export const perJourneysReducer = perJourneysSlice.reducer;
