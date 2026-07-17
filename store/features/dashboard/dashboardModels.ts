export type DashboardGeneral = {
  totalVehicles: number;
  totalVehicleCategories: number;
  totalVehicleFactories: number;
  totalLocations: number;
  totalTransferRoutes: number;
  totalPerJourneys: number;
  totalServices: number;
  totalBookings: number;
  totalReviews: number;
};

export type DashboardBookings = {
  pending: number;
  confirmed: number;
  completed: number;
  cancelled: number;
};

export type DashboardBookingTypes = {
  totalTransferBookings: number;
  totalPerJourneyBookings: number;
};

export type DashboardTripTypes = {
  oneWayBookings: number;
  roundTripBookings: number;
};

export type DashboardPayments = {
  totalPayments: number;
  successfulPayments: number;
  failedPayments: number;
  pendingPayments: number;
};

export type DashboardRevenue = {
  totalRevenue: number;
  revenueToday: number;
  revenueThisWeek: number;
  revenueThisMonth: number;
};

export type DashboardReviews = {
  averageRating: number;
  totalReviews: number;
};

export type DashboardData = {
  general: DashboardGeneral;
  bookings: DashboardBookings;
  bookingTypes: DashboardBookingTypes;
  tripTypes: DashboardTripTypes;
  payments: DashboardPayments;
  revenue: DashboardRevenue;
  reviews: DashboardReviews;
};

export type DashboardResponse = {
  success: boolean;
  message: string;
  data: DashboardData;
  errors: unknown;
};

export type DashboardState = {
  data: DashboardData | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  notice: string | null;
};
