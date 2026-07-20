export interface AdminBookingTransferDetails {
  id: string;
  vehicleCategoryName: string;
  from: string;
  to: string;
}

export interface AdminBookingPerJourneyLocation {
  id: number;
  name: string;
}

export interface AdminBookingVehicleCategory {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
  pricingType: string;
}

export interface AdminBookingVehicleFactory {
  id: number;
  name: string;
}

export interface AdminBookingVehicle {
  id: number;
  name: string;
  model: string;
  year: number;
  licensePlate: string;
  capacity: number;
  imageUrl: string;
  isActive: boolean;
  vehicleCategoryId: number;
  vehicleCategoryName: string;
  vehicleCategory: AdminBookingVehicleCategory | null;
  vehicleFactoryId: number;
  vehicleFactoryName: string;
  vehicleFactory: AdminBookingVehicleFactory | null;
}

export interface AdminBookingPerJourneyDetails {
  id: number;
  fromLocationId: number;
  fromLocation: AdminBookingPerJourneyLocation;
  toLocationId: number;
  toLocation: AdminBookingPerJourneyLocation;
  vehicleId: number;
  vehicle: AdminBookingVehicle;
  price: number;
}

export interface AdminBooking {
  id: number;
  customerName: string;
  customerEmail: string;
  code: string;
  customerPhoneNumber: string;
  bookingDate: string;
  departureDate: string;
  departureTime: string;
  returnDate: string | null;
  returnTime: string | null;
  passengarCount: number;
  status: string;
  type: string;
  tripType: string;
  transferBookingDetailsId: number | string | null;
  transferBookingDetails: AdminBookingTransferDetails | null;
  perJourneyId: number | null;
  perJourney: AdminBookingPerJourneyDetails | null;
  originalPrice: number;
  discountPercentage: number;
  discountAmount: number;
  finalPrice: number;
}

export interface AdminBookingsQuery {
  pageNumber: number;
  pageSize: number;
  search?: string;
  sortBy?: string;
  isDescending?: boolean;
}

export interface AdminBookingsResponse {
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalRecords: number;
  success: boolean;
  message: string;
  data: AdminBooking[];
  errors: string[] | null;
}

export interface AdminBookingResponse {
  success: boolean;
  message: string;
  data: AdminBooking;
  errors: string[] | null;
}

export interface AdminBookingsState extends AdminBookingsQuery {
  items: AdminBooking[];
  selectedBooking: AdminBooking | null;
  bookingPendingDelete: AdminBooking | null;
  totalPages: number;
  totalRecords: number;
  listStatus: "idle" | "loading" | "succeeded" | "failed";
  detailStatus: "idle" | "loading" | "succeeded" | "failed";
  deleteStatus: "idle" | "loading" | "succeeded" | "failed";
  isViewModalOpen: boolean;
  isDeleteConfirmOpen: boolean;
  error: string | null;
  notice: string | null;
}
