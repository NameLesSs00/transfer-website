import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UiState } from "./uiModels";

const initialState: UiState = {
  adminSidebarOpen: false,
  activeAdminSection: "admins",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openAdminSidebar(state) {
      state.adminSidebarOpen = true;
    },
    closeAdminSidebar(state) {
      state.adminSidebarOpen = false;
    },
    setActiveAdminSection(state, action: PayloadAction<UiState["activeAdminSection"]>) {
      state.activeAdminSection = action.payload;
    },
  },
});

export const { closeAdminSidebar, openAdminSidebar, setActiveAdminSection } =
  uiSlice.actions;

export const uiReducer = uiSlice.reducer;
