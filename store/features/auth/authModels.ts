export type LoginRequest = {
  email: string;
  password: string;
};

export type AuthSession = {
  accessToken: string;
  refreshToken: string;
  email: string;
  fullName: string;
};

export type AdminProfile = {
  email: string;
  fullName: string;
};

export type UpdatePasswordPayload = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  profile: AdminProfile | null;
  hydrated: boolean;
  loginStatus: "idle" | "loading" | "succeeded" | "failed";
  logoutStatus: "idle" | "loading" | "succeeded" | "failed";
  updatePasswordStatus: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  notice: string | null;
};
