import { combineReducers } from "@reduxjs/toolkit";
import { bookingReducer } from "./features/bookings/bookingSlice";
import adminBookingsReducer from "./features/adminBookings/adminBookingsSlice";
import { adminsReducer } from "./features/admins/adminsSlice";
import { authReducer } from "./features/auth/authSlice";
import { dashboardReducer } from "./features/dashboard/dashboardSlice";
import { faqsReducer } from "./features/faqs/faqsSlice";
import { locationJourneysReducer } from "./features/locationJourneys/locationJourneysSlice";
import { locationsReducer } from "./features/locations/locationsSlice";
import { perJourneysReducer } from "./features/perJourneys/perJourneysSlice";
import { routePricingsReducer } from "./features/routePricings/routePricingsSlice";
import { transferRoutesReducer } from "./features/transferRoutes/transferRoutesSlice";
import { uiReducer } from "./features/ui/uiSlice";
import { vehicleCategoriesReducer } from "./features/vehicleCategories/vehicleCategoriesSlice";
import { vehicleFactoriesReducer } from "./features/vehicleFactories/vehicleFactoriesSlice";
import { vehiclesReducer } from "./features/vehicles/vehiclesSlice";

export const rootReducer = combineReducers({
  booking: bookingReducer,
  adminBookings: adminBookingsReducer,
  admins: adminsReducer,
  auth: authReducer,
  dashboard: dashboardReducer,
  faqs: faqsReducer,
  locationJourneys: locationJourneysReducer,
  locations: locationsReducer,
  perJourneys: perJourneysReducer,
  routePricings: routePricingsReducer,
  transferRoutes: transferRoutesReducer,
  ui: uiReducer,
  vehicleCategories: vehicleCategoriesReducer,
  vehicleFactories: vehicleFactoriesReducer,
  vehicles: vehiclesReducer,
});
