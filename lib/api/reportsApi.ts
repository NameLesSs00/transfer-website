import { apiRequest, ApiResponse } from "@/lib/apiClient";

export type PaginatedResponse<T> = {
  success: boolean;
  message: string;
  data: T[];
  errors: string[] | null;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalRecords: number;
};

export type ReportBooking = {
  id: number;
  customerName: string;
  customerEmail: string;
  customerPhoneNumber: string;
  bookingDate: string;
  departureDate: string;
  departureTime: string | null;
  returnDate: string | null;
  returnTime: string | null;
  passengerCount: number;
  status: string;
  bookingType: string;
  tripType: string;
  originalPrice: number;
  discountPercentage: number;
  discountAmount: number;
  finalPrice: number;
  transferFrom: string | null;
  transferTo: string | null;
  vehicleCategoryName: string | null;
  perJourneyFrom: string | null;
  perJourneyTo: string | null;
  vehicleName: string | null;
  vehicleLicensePlate: string | null;
};

export type ReportPayment = {
  id: number;
  transactionId: string;
  paymentReference: string;
  status: string;
  amount: number;
  paidAt: string | null;
  bookingId: number;
  bookingDate: string;
  bookingType: string;
  finalPrice: number;
  customerName: string;
  customerEmail: string;
  customerPhoneNumber: string;
};

export type RevenueByBookingType = {
  bookingType: string;
  totalRevenue: number;
  totalBookings: number;
};

export type RevenueByVehicleCategory = {
  vehicleCategoryId: number;
  vehicleCategoryName: string;
  totalRevenue: number;
  totalBookings: number;
};

export type ReportRevenue = {
  revenueToday: number;
  revenueThisWeek: number;
  revenueThisMonth: number;
  revenueThisYear: number;
  revenueByBookingType: RevenueByBookingType[];
  revenueByVehicleCategory: RevenueByVehicleCategory[];
};

export type VehicleStat = {
  vehicleId: number;
  vehicleName: string;
  model: string;
  licensePlate: string;
  vehicleCategoryName: string;
  vehicleFactoryName: string;
  bookingCount: number;
  totalRevenue: number;
};

export type ReportVehicles = {
  mostBooked: VehicleStat[];
  leastBooked: VehicleStat[];
};



export function getReportsBookings(params: Record<string, string | number | undefined>) {
  const urlParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== "") {
      urlParams.append(key, String(value));
    }
  }
  return apiRequest<PaginatedResponse<ReportBooking>>(`/Reports/bookings?${urlParams.toString()}`);
}

export function getReportsPayments(params: Record<string, string | number | undefined>) {
  const urlParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== "") {
      urlParams.append(key, String(value));
    }
  }
  return apiRequest<PaginatedResponse<ReportPayment>>(`/Reports/payments?${urlParams.toString()}`);
}

export function getReportsRevenue() {
  return apiRequest<ApiResponse<ReportRevenue>>(`/Reports/revenue`);
}

export function getReportsVehicles(topN: number = 10) {
  return apiRequest<ApiResponse<ReportVehicles>>(`/Reports/vehicles?topN=${topN}`);
}

