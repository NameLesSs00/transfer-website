import { apiRequest } from "@/lib/apiClient";
import {
  CalculatePricePayload,
  CalculatePriceResponse,
  CalculateTransferPricePayload,
  CreateBookingPayload,
  CreateTransferBookingPayload,
  CreateBookingResponse,
  InitializePaymentPayload,
  InitializePaymentResponse,
} from "./bookingsModels";

/**
 * Returns the EUR price for a per-journey booking.
 * Always called with tripType:1; the caller doubles the result for round-trips.
 */
export function calculatePerJourneyPriceRequest(
  payload: CalculatePricePayload
) {
  return apiRequest<CalculatePriceResponse>(
    "/Bookings/calculate-per-journey-price",
    {
      method: "POST",
      body: payload,
    }
  );
}

/**
 * Returns the EUR price for a transfer route booking.
 */
export function calculateTransferPriceRequest(
  payload: CalculateTransferPricePayload
) {
  return apiRequest<CalculatePriceResponse>(
    "/Bookings/calculate-transfer-price",
    {
      method: "POST",
      body: payload,
    }
  );
}

/**
 * Creates a per-journey booking and returns the new bookingId.
 */
export function createPerJourneyBookingRequest(payload: CreateBookingPayload) {
  return apiRequest<CreateBookingResponse>("/Bookings/per-journey", {
    method: "POST",
    body: payload,
  });
}

/**
 * Initialises a Paymob payment session for the given bookingId.
 * Returns a paymentUrl to redirect the user to.
 */
export function initializePaymentRequest(payload: InitializePaymentPayload) {
  return apiRequest<InitializePaymentResponse>("/Payments/initialize", {
    method: "POST",
    body: payload,
  });
}

/**
 * Creates a transfer route booking and returns the new bookingId.
 */
export function createTransferBookingRequest(payload: CreateTransferBookingPayload) {
  return apiRequest<CreateBookingResponse>("/Bookings/transfer", {
    method: "POST",
    body: payload,
  });
}
