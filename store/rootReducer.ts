import { combineReducers } from "@reduxjs/toolkit";
import { adminsReducer } from "./features/admins/adminsSlice";
import { authReducer } from "./features/auth/authSlice";
import { uiReducer } from "./features/ui/uiSlice";
import { vehicleFactoriesReducer } from "./features/vehicleFactories/vehicleFactoriesSlice";

export const rootReducer = combineReducers({
  admins: adminsReducer,
  auth: authReducer,
  ui: uiReducer,
  vehicleFactories: vehicleFactoriesReducer,
});
