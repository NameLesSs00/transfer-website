import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/store";
import {
  clearStoredAuthSession,
  getStoredAuthSession,
  loginRequest,
  logoutRequest,
  refreshTokenRequest,
  storeAuthSession,
  updatePasswordRequest,
} from "./authApi";
import { AuthSession, AuthState, LoginRequest, UpdatePasswordPayload } from "./authModels";

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  profile: null,
  hydrated: false,
  loginStatus: "idle",
  logoutStatus: "idle",
  updatePasswordStatus: "idle",
  error: null,
  notice: null,
};

function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

export const loginAdmin = createAsyncThunk<AuthSession, LoginRequest>(
  "auth/loginAdmin",
  async (payload) => {
    const session = await loginRequest(payload);
    storeAuthSession(session);
    return session;
  }
);

export const logoutAdmin = createAsyncThunk<void, void, { state: RootState }>(
  "auth/logoutAdmin",
  async (_, { getState }) => {
    const { refreshToken, accessToken } = getState().auth;

    try {
      if (refreshToken) {
        await logoutRequest(refreshToken, accessToken);
      }
    } finally {
      clearStoredAuthSession();
    }
  }
);

export const refreshAdminToken = createAsyncThunk<AuthSession, void, { state: RootState }>(
  "auth/refreshAdminToken",
  async (_, { getState }) => {
    const { refreshToken, accessToken } = getState().auth;
    if (!refreshToken) throw new Error("Missing refresh token");

    const session = await refreshTokenRequest(refreshToken, accessToken);
    storeAuthSession(session);
    return session;
  }
);

export const updateAdminPassword = createAsyncThunk<
  string,
  UpdatePasswordPayload,
  { state: RootState }
>("auth/updateAdminPassword", async (payload, { getState }) => {
  const response = await updatePasswordRequest(payload, getState().auth.accessToken);
  return response.message || "Password updated successfully";
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    hydrateAuth(state) {
      const session = getStoredAuthSession();

      if (session) {
        state.accessToken = session.accessToken;
        state.refreshToken = session.refreshToken;
        state.profile = {
          email: session.email,
          fullName: session.fullName,
        };
      }

      state.hydrated = true;
    },
    clearAuthError(state) {
      state.error = null;
    },
    clearAuthNotice(state) {
      state.notice = null;
    },
    setAuthSession(state, action: PayloadAction<AuthSession>) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.profile = {
        email: action.payload.email,
        fullName: action.payload.fullName,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.loginStatus = "loading";
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loginStatus = "succeeded";
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.profile = {
          email: action.payload.email,
          fullName: action.payload.fullName,
        };
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loginStatus = "failed";
        state.error = getErrorMessage(action.error, "Unable to sign in");
      })
      .addCase(logoutAdmin.pending, (state) => {
        state.logoutStatus = "loading";
      })
      .addCase(logoutAdmin.fulfilled, (state) => {
        state.logoutStatus = "succeeded";
        state.accessToken = null;
        state.refreshToken = null;
        state.profile = null;
      })
      .addCase(logoutAdmin.rejected, (state, action) => {
        state.logoutStatus = "failed";
        state.error = getErrorMessage(action.error, "Unable to log out");
        state.accessToken = null;
        state.refreshToken = null;
        state.profile = null;
      })
      .addCase(refreshAdminToken.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.profile = {
          email: action.payload.email,
          fullName: action.payload.fullName,
        };
      })
      .addCase(updateAdminPassword.pending, (state) => {
        state.updatePasswordStatus = "loading";
        state.error = null;
        state.notice = null;
      })
      .addCase(updateAdminPassword.fulfilled, (state, action) => {
        state.updatePasswordStatus = "succeeded";
        state.notice = action.payload;
      })
      .addCase(updateAdminPassword.rejected, (state, action) => {
        state.updatePasswordStatus = "failed";
        state.error = getErrorMessage(action.error, "Unable to update password");
      });
  },
});

export const { clearAuthError, clearAuthNotice, hydrateAuth, setAuthSession } =
  authSlice.actions;

export const authReducer = authSlice.reducer;
