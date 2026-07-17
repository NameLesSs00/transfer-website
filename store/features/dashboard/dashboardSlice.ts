import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "@/store";
import { getDashboardRequest } from "./dashboardApi";
import { DashboardData, DashboardState } from "./dashboardModels";

const initialState: DashboardState = {
  data: null,
  status: "idle",
  error: null,
  notice: null,
};

function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

export const fetchDashboard = createAsyncThunk<DashboardData, void, { state: RootState }>(
  "dashboard/fetchDashboard",
  async (_, { getState }) => {
    const response = await getDashboardRequest(getState().auth.accessToken);

    if (!response.success || !response.data) {
      throw new Error(response.message || "Unable to load dashboard");
    }

    return response.data;
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    clearDashboardError(state) {
      state.error = null;
    },
    clearDashboardNotice(state) {
      state.notice = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboard.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchDashboard.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchDashboard.rejected, (state, action) => {
        state.status = "failed";
        state.error = getErrorMessage(action.error, "Unable to load dashboard");
      });
  },
});

export const { clearDashboardError, clearDashboardNotice } = dashboardSlice.actions;

export const dashboardReducer = dashboardSlice.reducer;
