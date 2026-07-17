import { combineReducers } from "@reduxjs/toolkit";
import { adminsReducer } from "./features/admins/adminsSlice";
import { authReducer } from "./features/auth/authSlice";
import { dashboardReducer } from "./features/dashboard/dashboardSlice";
import { locationJourneysReducer } from "./features/locationJourneys/locationJourneysSlice";
import { locationsReducer } from "./features/locations/locationsSlice";
import { routePricingsReducer } from "./features/routePricings/routePricingsSlice";
import { transferRoutesReducer } from "./features/transferRoutes/transferRoutesSlice";
import { uiReducer } from "./features/ui/uiSlice";
import { vehicleCategoriesReducer } from "./features/vehicleCategories/vehicleCategoriesSlice";
import { vehicleFactoriesReducer } from "./features/vehicleFactories/vehicleFactoriesSlice";
import { vehiclesReducer } from "./features/vehicles/vehiclesSlice";

export const rootReducer = combineReducers({
  admins: adminsReducer,
  auth: authReducer,
  dashboard: dashboardReducer,
  locationJourneys: locationJourneysReducer,
  locations: locationsReducer,
  routePricings: routePricingsReducer,
  transferRoutes: transferRoutesReducer,
  ui: uiReducer,
  vehicleCategories: vehicleCategoriesReducer,
  vehicleFactories: vehicleFactoriesReducer,
  vehicles: vehiclesReducer,
});
