import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "@/store";
import {
  addAdminRequest,
  deleteAdminRequest,
  getAdminsRequest,
  updateAdminRequest,
} from "./adminsApi";
import {
  AddAdminPayload,
  AdminsResponse,
  AdminsState,
  UpdateAdminPayload,
} from "./adminsModels";

const initialState: AdminsState = {
  items: [],
  pageNumber: 1,
  pageSize: 10,
  totalPages: 1,
  totalRecords: 0,
  listStatus: "idle",
  addStatus: "idle",
  updateStatus: "idle",
  deleteStatus: "idle",
  deletingAdminId: null,
  isAddAdminOpen: false,
  error: null,
  notice: null,
};

function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

export const fetchAdmins = createAsyncThunk<
  AdminsResponse,
  { pageNumber: number; pageSize?: number },
  { state: RootState }
>("admins/fetchAdmins", async ({ pageNumber, pageSize }, { getState }) => {
  const state = getState();
  return getAdminsRequest(pageNumber, pageSize ?? state.admins.pageSize, state.auth.accessToken);
});

export const createAdmin = createAsyncThunk<string, AddAdminPayload, { state: RootState }>(
  "admins/createAdmin",
  async (payload, { getState }) => {
    const response = await addAdminRequest(payload, getState().auth.accessToken);
    return response.message || "Admin added successfully";
  }
);

export const saveAdminProfile = createAsyncThunk<
  string,
  UpdateAdminPayload,
  { state: RootState }
>("admins/saveAdminProfile", async (payload, { getState }) => {
  const response = await updateAdminRequest(payload, getState().auth.accessToken);
  return response.message || "Profile updated successfully";
});

export const removeAdmin = createAsyncThunk<
  string,
  { id: string; email: string },
  { state: RootState }
>("admins/removeAdmin", async ({ id }, { getState }) => {
  const response = await deleteAdminRequest(id, getState().auth.accessToken);
  return response.message || "Admin deleted successfully";
});

const adminsSlice = createSlice({
  name: "admins",
  initialState,
  reducers: {
    openAddAdminModal(state) {
      state.isAddAdminOpen = true;
    },
    closeAddAdminModal(state) {
      state.isAddAdminOpen = false;
    },
    clearAdminsNotice(state) {
      state.notice = null;
    },
    clearAdminsError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdmins.pending, (state) => {
        state.listStatus = "loading";
        state.error = null;
      })
      .addCase(fetchAdmins.fulfilled, (state, action) => {
        state.listStatus = "succeeded";
        state.items = action.payload.data ?? [];
        state.pageNumber = action.payload.pageNumber || state.pageNumber;
        state.pageSize = action.payload.pageSize || state.pageSize;
        state.totalPages = action.payload.totalPages || 1;
        state.totalRecords = action.payload.totalRecords || action.payload.data?.length || 0;
      })
      .addCase(fetchAdmins.rejected, (state, action) => {
        state.listStatus = "failed";
        state.error = getErrorMessage(action.error, "Unable to load admins");
      })
      .addCase(createAdmin.pending, (state) => {
        state.addStatus = "loading";
        state.error = null;
        state.notice = null;
      })
      .addCase(createAdmin.fulfilled, (state, action) => {
        state.addStatus = "succeeded";
        state.isAddAdminOpen = false;
        state.notice = action.payload;
      })
      .addCase(createAdmin.rejected, (state, action) => {
        state.addStatus = "failed";
        state.error = getErrorMessage(action.error, "Unable to add admin");
      })
      .addCase(saveAdminProfile.pending, (state) => {
        state.updateStatus = "loading";
        state.error = null;
        state.notice = null;
      })
      .addCase(saveAdminProfile.fulfilled, (state, action) => {
        state.updateStatus = "succeeded";
        state.notice = action.payload;
      })
      .addCase(saveAdminProfile.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.error = getErrorMessage(action.error, "Unable to update profile");
      })
      .addCase(removeAdmin.pending, (state, action) => {
        state.deleteStatus = "loading";
        state.deletingAdminId = action.meta.arg.id;
        state.error = null;
        state.notice = null;
      })
      .addCase(removeAdmin.fulfilled, (state, action) => {
        state.deleteStatus = "succeeded";
        state.deletingAdminId = null;
        state.notice = action.payload;
      })
      .addCase(removeAdmin.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.deletingAdminId = null;
        state.error = getErrorMessage(action.error, "Unable to delete admin");
      });
  },
});

export const {
  clearAdminsError,
  clearAdminsNotice,
  closeAddAdminModal,
  openAddAdminModal,
} = adminsSlice.actions;

export const adminsReducer = adminsSlice.reducer;
