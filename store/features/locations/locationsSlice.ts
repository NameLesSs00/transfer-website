import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/store";
import {
  createLocationRequest,
  deleteLocationRequest,
  getLocationRequest,
  getLocationsRequest,
  updateLocationRequest,
} from "./locationsApi";
import {
  Location,
  LocationPayload,
  LocationsQuery,
  LocationsResponse,
  LocationsState,
  UpdateLocationPayload,
} from "./locationsModels";

const initialQuery: LocationsQuery = {
  pageNumber: 1,
  pageSize: 10,
  search: "",
  sortBy: "name",
  isDescending: false,
};

const initialState: LocationsState = {
  ...initialQuery,
  items: [],
  selectedLocation: null,
  locationPendingDelete: null,
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

function getQueryFromState(state: RootState, overrides: Partial<LocationsQuery> = {}) {
  const current = state.locations;

  return {
    pageNumber: current.pageNumber,
    pageSize: current.pageSize,
    search: current.search,
    sortBy: current.sortBy,
    isDescending: current.isDescending,
    ...overrides,
  };
}

export const fetchLocations = createAsyncThunk<
  LocationsResponse,
  Partial<LocationsQuery> | undefined,
  { state: RootState }
>("locations/fetchLocations", async (overrides, { getState }) => {
  const state = getState();
  const query = getQueryFromState(state, overrides);
  return getLocationsRequest(query, state.auth.accessToken);
});

export const fetchLocation = createAsyncThunk<Location, number, { state: RootState }>(
  "locations/fetchLocation",
  async (id, { getState }) => {
    const response = await getLocationRequest(id, getState().auth.accessToken);
    return response.data;
  }
);

export const createLocation = createAsyncThunk<string, LocationPayload, { state: RootState }>(
  "locations/createLocation",
  async (payload, { getState }) => {
    const response = await createLocationRequest(payload, getState().auth.accessToken);
    return response.message || "Location created successfully";
  }
);

export const updateLocation = createAsyncThunk<string, UpdateLocationPayload, { state: RootState }>(
  "locations/updateLocation",
  async (payload, { getState }) => {
    const response = await updateLocationRequest(payload, getState().auth.accessToken);
    return response.message || "Location updated successfully";
  }
);

export const removeLocation = createAsyncThunk<string, number, { state: RootState }>(
  "locations/removeLocation",
  async (id, { getState }) => {
    const response = await deleteLocationRequest(id, getState().auth.accessToken);
    return response.message || "Location deleted successfully";
  }
);

const locationsSlice = createSlice({
  name: "locations",
  initialState,
  reducers: {
    openCreateLocationModal(state) {
      state.formMode = "create";
      state.selectedLocation = null;
      state.isFormModalOpen = true;
    },
    openEditLocationModal(state, action: PayloadAction<Location>) {
      state.formMode = "edit";
      state.selectedLocation = action.payload;
      state.isFormModalOpen = true;
    },
    closeLocationModal(state) {
      state.isFormModalOpen = false;
      state.selectedLocation = null;
      state.formMode = "create";
    },
    openDeleteLocationConfirm(state, action: PayloadAction<Location>) {
      state.locationPendingDelete = action.payload;
      state.isDeleteConfirmOpen = true;
    },
    closeDeleteLocationConfirm(state) {
      state.locationPendingDelete = null;
      state.isDeleteConfirmOpen = false;
    },
    setLocationsSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
      state.pageNumber = 1;
    },
    setLocationsSort(state, action: PayloadAction<{ sortBy: string; isDescending: boolean }>) {
      state.sortBy = action.payload.sortBy;
      state.isDescending = action.payload.isDescending;
      state.pageNumber = 1;
    },
    clearLocationsNotice(state) {
      state.notice = null;
    },
    clearLocationsError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocations.pending, (state) => {
        state.listStatus = "loading";
        state.error = null;
      })
      .addCase(fetchLocations.fulfilled, (state, action) => {
        state.listStatus = "succeeded";
        state.items = action.payload.data ?? [];
        state.pageNumber = action.payload.pageNumber || state.pageNumber;
        state.pageSize = action.payload.pageSize || state.pageSize;
        state.totalPages = action.payload.totalPages || 1;
        state.totalRecords = action.payload.totalRecords || action.payload.data?.length || 0;
      })
      .addCase(fetchLocations.rejected, (state, action) => {
        state.listStatus = "failed";
        state.error = getErrorMessage(action.error, "Unable to load locations");
      })
      .addCase(fetchLocation.pending, (state) => {
        state.detailStatus = "loading";
        state.error = null;
      })
      .addCase(fetchLocation.fulfilled, (state, action) => {
        state.detailStatus = "succeeded";
        state.selectedLocation = action.payload;
      })
      .addCase(fetchLocation.rejected, (state, action) => {
        state.detailStatus = "failed";
        state.error = getErrorMessage(action.error, "Unable to load location");
      })
      .addCase(createLocation.pending, (state) => {
        state.createStatus = "loading";
        state.error = null;
        state.notice = null;
      })
      .addCase(createLocation.fulfilled, (state, action) => {
        state.createStatus = "succeeded";
        state.isFormModalOpen = false;
        state.notice = action.payload;
      })
      .addCase(createLocation.rejected, (state, action) => {
        state.createStatus = "failed";
        state.error = getErrorMessage(action.error, "Unable to add location");
      })
      .addCase(updateLocation.pending, (state) => {
        state.updateStatus = "loading";
        state.error = null;
        state.notice = null;
      })
      .addCase(updateLocation.fulfilled, (state, action) => {
        state.updateStatus = "succeeded";
        state.isFormModalOpen = false;
        state.selectedLocation = null;
        state.notice = action.payload;
      })
      .addCase(updateLocation.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.error = getErrorMessage(action.error, "Unable to update location");
      })
      .addCase(removeLocation.pending, (state) => {
        state.deleteStatus = "loading";
        state.error = null;
        state.notice = null;
      })
      .addCase(removeLocation.fulfilled, (state, action) => {
        state.deleteStatus = "succeeded";
        state.locationPendingDelete = null;
        state.isDeleteConfirmOpen = false;
        state.notice = action.payload;
      })
      .addCase(removeLocation.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.error = getErrorMessage(action.error, "Unable to delete location");
      });
  },
});

export const {
  clearLocationsError,
  clearLocationsNotice,
  closeDeleteLocationConfirm,
  closeLocationModal,
  openCreateLocationModal,
  openDeleteLocationConfirm,
  openEditLocationModal,
  setLocationsSearch,
  setLocationsSort,
} = locationsSlice.actions;

export const locationsReducer = locationsSlice.reducer;
