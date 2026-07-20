import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  calculatePerJourneyPriceRequest,
  createPerJourneyBookingRequest,
  initializePaymentRequest,
} from "./bookingsApi";
import {
  BookingState,
  CalculatePricePayload,
  CreateBookingPayload,
} from "./bookingsModels";

/* ────────────────────────────────────────────────────────────
   Initial state
──────────────────────────────────────────────────────────── */
const initialState: BookingState = {
  perJourneyId: null,
  journeySnapshot: null,
  tripType: 1,
  basePrice: null,
  priceStatus: "idle",
  bookingId: null,
  bookingStatus: "idle",
  paymentStatus: "idle",
  error: null,
};

/* ────────────────────────────────────────────────────────────
   Thunks
──────────────────────────────────────────────────────────── */

/** Fetch the base (one-way) EUR price for a journey. */
export const calculatePrice = createAsyncThunk(
  "booking/calculatePrice",
  async (payload: CalculatePricePayload, { rejectWithValue }) => {
    try {
      // Always request tripType:1; we multiply ×2 client-side for round-trips
      const res = await calculatePerJourneyPriceRequest({
        perJourneyId: payload.perJourneyId,
        tripType: 1,
      });
      if (!res.success) {
        return rejectWithValue(res.message || "Failed to calculate price");
      }
      return res.data; // number in EUR
    } catch (err: unknown) {
      return rejectWithValue(
        err instanceof Error ? err.message : "Failed to calculate price"
      );
    }
  }
);

/** Create a booking and store the returned bookingId. */
export const createBooking = createAsyncThunk(
  "booking/createBooking",
  async (payload: CreateBookingPayload, { rejectWithValue }) => {
    try {
      const res = await createPerJourneyBookingRequest(payload);
      if (!res.success) {
        return rejectWithValue(res.message || "Failed to create booking");
      }
      return res.data; // bookingId
    } catch (err: unknown) {
      return rejectWithValue(
        err instanceof Error ? err.message : "Failed to create booking"
      );
    }
  }
);

/** Initialise payment and redirect to the Paymob URL. */
export const initializePayment = createAsyncThunk(
  "booking/initializePayment",
  async (bookingId: number, { rejectWithValue }) => {
    try {
      const res = await initializePaymentRequest({ bookingId });
      if (!res.success) {
        return rejectWithValue(res.message || "Failed to initialize payment");
      }
      return res.data.paymentUrl;
    } catch (err: unknown) {
      return rejectWithValue(
        err instanceof Error ? err.message : "Failed to initialize payment"
      );
    }
  }
);

/* ────────────────────────────────────────────────────────────
   Slice
──────────────────────────────────────────────────────────── */
const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    /** Called from the Cities page when the user clicks "Book Now" on a card. */
    setSelectedJourney(
      state,
      action: PayloadAction<{
        perJourneyId: number;
        journeySnapshot: BookingState["journeySnapshot"];
      }>
    ) {
      state.perJourneyId = action.payload.perJourneyId;
      state.journeySnapshot = action.payload.journeySnapshot;
      // Reset any previous booking data
      state.bookingId = null;
      state.bookingStatus = "idle";
      state.paymentStatus = "idle";
      state.error = null;
    },
    setTripType(state, action: PayloadAction<1 | 2>) {
      state.tripType = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
    resetBooking() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    /* ── calculatePrice ── */
    builder
      .addCase(calculatePrice.pending, (state) => {
        state.priceStatus = "loading";
        state.error = null;
      })
      .addCase(calculatePrice.fulfilled, (state, action) => {
        state.priceStatus = "succeeded";
        state.basePrice = action.payload;
      })
      .addCase(calculatePrice.rejected, (state, action) => {
        state.priceStatus = "failed";
        state.error = action.payload as string;
      });

    /* ── createBooking ── */
    builder
      .addCase(createBooking.pending, (state) => {
        state.bookingStatus = "loading";
        state.error = null;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.bookingStatus = "succeeded";
        state.bookingId = action.payload;
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.bookingStatus = "failed";
        state.error = action.payload as string;
      });

    /* ── initializePayment ── */
    builder
      .addCase(initializePayment.pending, (state) => {
        state.paymentStatus = "loading";
        state.error = null;
      })
      .addCase(initializePayment.fulfilled, (state) => {
        state.paymentStatus = "succeeded";
        // Actual redirect happens in the component after this action settles
      })
      .addCase(initializePayment.rejected, (state, action) => {
        state.paymentStatus = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { setSelectedJourney, setTripType, clearError, resetBooking } =
  bookingSlice.actions;

export const bookingReducer = bookingSlice.reducer;
