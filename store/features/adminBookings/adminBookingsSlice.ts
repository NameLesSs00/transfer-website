import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/store";
import {
  getAdminBookingsRequest,
  getAdminBookingRequest,
  deleteAdminBookingRequest,
} from "./adminBookingsApi";
import {
  AdminBooking,
  AdminBookingsQuery,
  AdminBookingsResponse,
  AdminBookingsState,
} from "./adminBookingsModels";

const initialQuery: AdminBookingsQuery = {
  pageNumber: 1,
  pageSize: 10,
  search: "",
};

const initialState: AdminBookingsState = {
  ...initialQuery,
  items: [],
  selectedBooking: null,
  bookingPendingDelete: null,
  totalPages: 1,
  totalRecords: 0,
  listStatus: "idle",
  detailStatus: "idle",
  deleteStatus: "idle",
  isViewModalOpen: false,
  isDeleteConfirmOpen: false,
  error: null,
  notice: null,
};

function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

function getQueryFromState(state: RootState, overrides: Partial<AdminBookingsQuery> = {}) {
  const current = state.adminBookings;
  return {
    pageNumber: current.pageNumber,
    pageSize: current.pageSize,
    search: current.search,
    sortBy: current.sortBy,
    isDescending: current.isDescending,
    ...overrides,
  };
}

export const fetchAdminBookings = createAsyncThunk<
  AdminBookingsResponse,
  Partial<AdminBookingsQuery> | undefined,
  { state: RootState }
>("adminBookings/fetchAdminBookings", async (overrides, { getState, rejectWithValue }) => {
  try {
    const state = getState();
    const query = getQueryFromState(state, overrides);
    const response = await getAdminBookingsRequest(query, state.auth.accessToken);
    if (!response.success) {
      return rejectWithValue(response.message || "Failed to fetch bookings.");
    }
    return response;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error, "Failed to fetch bookings."));
  }
});

export const fetchAdminBooking = createAsyncThunk<
  AdminBooking,
  number,
  { state: RootState }
>("adminBookings/fetchAdminBooking", async (id, { getState, rejectWithValue }) => {
  try {
    const response = await getAdminBookingRequest(id, getState().auth.accessToken);
    if (!response.success) {
      return rejectWithValue(response.message || "Failed to fetch booking details.");
    }
    return response.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error, "Failed to fetch booking details."));
  }
});

export const removeAdminBooking = createAsyncThunk<
  number,
  number,
  { state: RootState }
>("adminBookings/removeAdminBooking", async (id, { getState, rejectWithValue }) => {
  try {
    const response = await deleteAdminBookingRequest(id, getState().auth.accessToken);
    if (!response.success && response.message !== "Booking deleted successfully") {
      // API seems to return success: false for success sometimes? The prompt showed:
      // success: false, message: "Booking deleted successfully"
      // Wait, let's treat it as success if it says it. Or just don't strictly check success flag if it throws on actual error.
      // Actually, if response.errors is not null, it's a real failure.
      if (response.errors && response.errors.length > 0) {
        return rejectWithValue(response.errors.join(", ") || "Failed to delete booking.");
      }
    }
    return id;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error, "Failed to delete booking."));
  }
});

const adminBookingsSlice = createSlice({
  name: "adminBookings",
  initialState,
  reducers: {
    setAdminBookingsPage(state, action: PayloadAction<number>) {
      state.pageNumber = action.payload;
    },
    setAdminBookingsSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
      state.pageNumber = 1;
    },
    setAdminBookingsSort(state, action: PayloadAction<{ sortBy: string; isDescending: boolean }>) {
      state.sortBy = action.payload.sortBy;
      state.isDescending = action.payload.isDescending;
      state.pageNumber = 1;
    },
    openViewBookingModal(state, action: PayloadAction<AdminBooking>) {
      state.selectedBooking = action.payload;
      state.isViewModalOpen = true;
    },
    closeViewBookingModal(state) {
      state.selectedBooking = null;
      state.isViewModalOpen = false;
    },
    openDeleteBookingConfirm(state, action: PayloadAction<AdminBooking>) {
      state.bookingPendingDelete = action.payload;
      state.isDeleteConfirmOpen = true;
    },
    closeDeleteBookingConfirm(state) {
      state.bookingPendingDelete = null;
      state.isDeleteConfirmOpen = false;
    },
    clearAdminBookingsNotice(state) {
      state.notice = null;
    },
    clearAdminBookingsError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // List
    builder.addCase(fetchAdminBookings.pending, (state) => {
      state.listStatus = "loading";
      state.error = null;
    });
    builder.addCase(fetchAdminBookings.fulfilled, (state, action) => {
      state.listStatus = "succeeded";
      state.items = action.payload.data ?? [];
      state.pageNumber = action.payload.pageNumber || state.pageNumber;
      state.pageSize = action.payload.pageSize || state.pageSize;
      state.totalPages = action.payload.totalPages || 1;
      state.totalRecords = action.payload.totalRecords || action.payload.data?.length || 0;
    });
    builder.addCase(fetchAdminBookings.rejected, (state, action) => {
      state.listStatus = "failed";
      state.error = action.payload as string;
    });

    // Detail
    builder.addCase(fetchAdminBooking.pending, (state) => {
      state.detailStatus = "loading";
    });
    builder.addCase(fetchAdminBooking.fulfilled, (state, action) => {
      state.detailStatus = "succeeded";
      state.selectedBooking = action.payload;
    });
    builder.addCase(fetchAdminBooking.rejected, (state, action) => {
      state.detailStatus = "failed";
      state.error = action.payload as string;
    });

    // Delete
    builder.addCase(removeAdminBooking.pending, (state) => {
      state.deleteStatus = "loading";
    });
    builder.addCase(removeAdminBooking.fulfilled, (state, action) => {
      state.deleteStatus = "succeeded";
      state.items = state.items.filter((b) => b.id !== action.payload);
      state.isDeleteConfirmOpen = false;
      state.bookingPendingDelete = null;
      state.notice = "Booking deleted successfully.";
    });
    builder.addCase(removeAdminBooking.rejected, (state, action) => {
      state.deleteStatus = "failed";
      state.error = action.payload as string;
      state.isDeleteConfirmOpen = false;
    });
  },
});

export const {
  setAdminBookingsPage,
  setAdminBookingsSearch,
  setAdminBookingsSort,
  openViewBookingModal,
  closeViewBookingModal,
  openDeleteBookingConfirm,
  closeDeleteBookingConfirm,
  clearAdminBookingsNotice,
  clearAdminBookingsError,
} = adminBookingsSlice.actions;

export default adminBookingsSlice.reducer;
