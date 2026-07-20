export type AdminUser = {
  id: string;
  username: string;
  role: string;
  email: string;
  createdAt: string;
};

export type AdminsResponse = {
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalRecords: number;
  success: boolean;
  message: string;
  data: AdminUser[];
  errors: unknown;
};

export type AddAdminPayload = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type AdminsState = {
  items: AdminUser[];
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalRecords: number;
  listStatus: "idle" | "loading" | "succeeded" | "failed";
  addStatus: "idle" | "loading" | "succeeded" | "failed";
  deleteStatus: "idle" | "loading" | "succeeded" | "failed";
  deletingAdminId: string | null;
  isAddAdminOpen: boolean;
  error: string | null;
  notice: string | null;
};
