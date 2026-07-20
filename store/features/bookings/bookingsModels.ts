/* ────────────────────────────────────────────────────────────
   Calculate price
──────────────────────────────────────────────────────────── */
export type CalculatePricePayload = {
  perJourneyId: number;
  tripType: 1 | 2;
};

export type CalculateTransferPricePayload = {
  transferRouteId: number;
  vehicleCategoryId: number;
  passengarCount: number;
  tripType: 1 | 2;
};

export type CalculatePriceResponse = {
  success: boolean;
  message: string;
  data: number; // EUR value
  errors: unknown;
};

/* ────────────────────────────────────────────────────────────
   Create per-journey booking
──────────────────────────────────────────────────────────── */
export type CreateBookingPayload = {
  customerName: string;
  customerEmail: string;
  customerPhoneNumber: string;
  bookingDate: string; // ISO UTC timestamp
  departureDate: string; // ISO UTC
  departureTime: string; // HH:mm:ss
  returnDate?: string; // ISO UTC – only when tripType === 2
  returnTime?: string; // HH:mm:ss – only when tripType === 2
  tripType: 1 | 2;
  passengarCount: number;
  perJourneyId: number;
};

export type CreateTransferBookingPayload = {
  customerName: string;
  customerEmail: string;
  customerPhoneNumber: string;
  bookingDate: string;
  departureDate: string;
  departureTime: string;
  returnDate?: string;
  returnTime?: string;
  tripType: 1 | 2;
  transferRouteId: number;
  vehicleCategoryId: number;
  passengarCount: number;
  flightNumber?: string;
};

export type CreateBookingResponse = {
  success: boolean;
  message: string;
  data: number; // bookingId
  errors: unknown;
};

/* ────────────────────────────────────────────────────────────
   Initialize payment
──────────────────────────────────────────────────────────── */
export type InitializePaymentPayload = {
  bookingId: number;
};

export type InitializePaymentResponse = {
  success: boolean;
  message: string;
  data: {
    paymentUrl: string;
    bookingId: number;
  };
  errors: unknown;
};

/* ────────────────────────────────────────────────────────────
   Redux state shape
──────────────────────────────────────────────────────────── */
export type BookingState = {
  bookingMode: "PerJourney" | "TransferRoute" | null;
  /** The id of the vehicle journey card the user clicked */
  perJourneyId: number | null;
  /** IDs for Transfer Route bookings */
  transferRouteId: number | null;
  vehicleCategoryId: number | null;
  
  /** Snapshot of the journey/route card details for the summary sidebar */
  journeySnapshot: {
    vehicleName: string;
    vehicleCapacity: number;
    vehicleCategoryName: string;
    imageUrl: string | null;
    fromLocation: string;
    toLocation: string;
  } | null;
  tripType: 1 | 2;
  /** Base price (tripType:1) returned from calculate-per-journey-price, in EUR */
  basePrice: number | null;
  priceStatus: "idle" | "loading" | "succeeded" | "failed";
  bookingId: number | null;
  bookingStatus: "idle" | "loading" | "succeeded" | "failed";
  paymentStatus: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};
