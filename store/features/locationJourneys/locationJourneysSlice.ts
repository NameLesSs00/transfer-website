import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/store";
import {
  createLocationJourneyRequest,
  deleteLocationJourneyRequest,
  getLocationJourneyRequest,
  getLocationJourneysRequest,
  updateLocationJourneyRequest,
} from "./locationJourneysApi";
import {
  LocationJourney,
  LocationJourneyPayload,
  LocationJourneysQuery,
  LocationJourneysResponse,
  LocationJourneysState,
  UpdateLocationJourneyPayload,
} from "./locationJourneysModels";

const initialQuery: LocationJourneysQuery = {
  pageNumber: 1,
  pageSize: 10,
  search: "",
  sortBy: "name",
  isDescending: false,
};

const initialState: LocationJourneysState = {
  ...initialQuery,
  items: [],
  selectedJourney: null,
  journeyPendingDelete: null,
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

function getQueryFromState(state: RootState, overrides: Partial<LocationJourneysQuery> = {}) {
  const current = state.locationJourneys;

  return {
    pageNumber: current.pageNumber,
    pageSize: current.pageSize,
    search: current.search,
    sortBy: current.sortBy,
    isDescending: current.isDescending,
    ...overrides,
  };
}

export const fetchLocationJourneys = createAsyncThunk<
  LocationJourneysResponse,
  Partial<LocationJourneysQuery> | undefined,
  { state: RootState }
>("locationJourneys/fetchLocationJourneys", async (overrides, { getState }) => {
  const state = getState();
  const query = getQueryFromState(state, overrides);
  return getLocationJourneysRequest(query, state.auth.accessToken);
});

export const fetchLocationJourney = createAsyncThunk<
  LocationJourney,
  number,
  { state: RootState }
>("locationJourneys/fetchLocationJourney", async (id, { getState }) => {
  const response = await getLocationJourneyRequest(id, getState().auth.accessToken);
  return response.data;
});

export const createLocationJourney = createAsyncThunk<
  string,
  LocationJourneyPayload,
  { state: RootState }
>("locationJourneys/createLocationJourney", async (payload, { getState }) => {
  const response = await createLocationJourneyRequest(payload, getState().auth.accessToken);
  return response.message || "Location journey added successfully";
});

export const updateLocationJourney = createAsyncThunk<
  string,
  UpdateLocationJourneyPayload,
  { state: RootState }
>("locationJourneys/updateLocationJourney", async (payload, { getState }) => {
  const response = await updateLocationJourneyRequest(payload, getState().auth.accessToken);
  return response.message || "Location journey updated successfully";
});

export const removeLocationJourney = createAsyncThunk<
  string,
  number,
  { state: RootState }
>("locationJourneys/removeLocationJourney", async (id, { getState }) => {
  const response = await deleteLocationJourneyRequest(id, getState().auth.accessToken);
  return response.message || "Location journey deleted successfully";
});

const locationJourneysSlice = createSlice({
  name: "locationJourneys",
  initialState,
  reducers: {
    openCreateLocationJourneyModal(state) {
      state.formMode = "create";
      state.selectedJourney = null;
      state.isFormModalOpen = true;
    },
    openEditLocationJourneyModal(state, action: PayloadAction<LocationJourney>) {
      state.formMode = "edit";
      state.selectedJourney = action.payload;
      state.isFormModalOpen = true;
    },
    closeLocationJourneyModal(state) {
      state.isFormModalOpen = false;
      state.selectedJourney = null;
      state.formMode = "create";
    },
    openDeleteLocationJourneyConfirm(state, action: PayloadAction<LocationJourney>) {
      state.journeyPendingDelete = action.payload;
      state.isDeleteConfirmOpen = true;
    },
    closeDeleteLocationJourneyConfirm(state) {
      state.journeyPendingDelete = null;
      state.isDeleteConfirmOpen = false;
    },
    setLocationJourneysSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
      state.pageNumber = 1;
    },
    setLocationJourneysSort(state, action: PayloadAction<{ sortBy: string; isDescending: boolean }>) {
      state.sortBy = action.payload.sortBy;
      state.isDescending = action.payload.isDescending;
      state.pageNumber = 1;
    },
    clearLocationJourneysNotice(state) {
      state.notice = null;
    },
    clearLocationJourneysError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocationJourneys.pending, (state) => {
        state.listStatus = "loading";
        state.error = null;
      })
      .addCase(fetchLocationJourneys.fulfilled, (state, action) => {
        state.listStatus = "succeeded";
        state.items = action.payload.data ?? [];
        state.pageNumber = action.payload.pageNumber || state.pageNumber;
        state.pageSize = action.payload.pageSize || state.pageSize;
        state.totalPages = action.payload.totalPages || 1;
        state.totalRecords = action.payload.totalRecords || action.payload.data?.length || 0;
      })
      .addCase(fetchLocationJourneys.rejected, (state, action) => {
        state.listStatus = "failed";
        state.error = getErrorMessage(action.error, "Unable to load location journeys");
      })
      .addCase(fetchLocationJourney.pending, (state) => {
        state.detailStatus = "loading";
        state.error = null;
      })
      .addCase(fetchLocationJourney.fulfilled, (state, action) => {
        state.detailStatus = "succeeded";
        state.selectedJourney = action.payload;
      })
      .addCase(fetchLocationJourney.rejected, (state, action) => {
        state.detailStatus = "failed";
        state.error = getErrorMessage(action.error, "Unable to load location journey");
      })
      .addCase(createLocationJourney.pending, (state) => {
        state.createStatus = "loading";
        state.error = null;
        state.notice = null;
      })
      .addCase(createLocationJourney.fulfilled, (state, action) => {
        state.createStatus = "succeeded";
        state.isFormModalOpen = false;
        state.notice = action.payload;
      })
      .addCase(createLocationJourney.rejected, (state, action) => {
        state.createStatus = "failed";
        state.error = getErrorMessage(action.error, "Unable to add location journey");
      })
      .addCase(updateLocationJourney.pending, (state) => {
        state.updateStatus = "loading";
        state.error = null;
        state.notice = null;
      })
      .addCase(updateLocationJourney.fulfilled, (state, action) => {
        state.updateStatus = "succeeded";
        state.isFormModalOpen = false;
        state.selectedJourney = null;
        state.notice = action.payload;
      })
      .addCase(updateLocationJourney.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.error = getErrorMessage(action.error, "Unable to update location journey");
      })
      .addCase(removeLocationJourney.pending, (state) => {
        state.deleteStatus = "loading";
        state.error = null;
        state.notice = null;
      })
      .addCase(removeLocationJourney.fulfilled, (state, action) => {
        state.deleteStatus = "succeeded";
        state.journeyPendingDelete = null;
        state.isDeleteConfirmOpen = false;
        state.notice = action.payload;
      })
      .addCase(removeLocationJourney.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.error = getErrorMessage(action.error, "Unable to delete location journey");
      });
  },
});

export const {
  clearLocationJourneysError,
  clearLocationJourneysNotice,
  closeDeleteLocationJourneyConfirm,
  closeLocationJourneyModal,
  openCreateLocationJourneyModal,
  openDeleteLocationJourneyConfirm,
  openEditLocationJourneyModal,
  setLocationJourneysSearch,
  setLocationJourneysSort,
} = locationJourneysSlice.actions;

export const locationJourneysReducer = locationJourneysSlice.reducer;
