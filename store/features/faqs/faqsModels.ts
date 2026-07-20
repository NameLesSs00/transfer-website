export type Faq = {
  id: number;
  question: string;
  answer: string;
  displayOrder?: number;
};

export type FaqsQuery = {
  pageNumber: number;
  pageSize: number;
  search: string;
  sortBy: string;
  isDescending: boolean;
};

export type FaqsResponse = {
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalRecords: number;
  success: boolean;
  message: string;
  data: Faq[];
  errors: unknown;
};

export type FaqResponse = {
  success: boolean;
  message: string;
  data: Faq;
  errors: unknown;
};

export type FaqPayload = {
  question: string;
  answer: string;
  displayOrder: number;
};

export type UpdateFaqPayload = FaqPayload & {
  id: number;
};

export type FaqsState = FaqsQuery & {
  items: Faq[];
  selectedFaq: Faq | null;
  faqPendingDelete: Faq | null;
  totalPages: number;
  totalRecords: number;
  listStatus: "idle" | "loading" | "succeeded" | "failed";
  detailStatus: "idle" | "loading" | "succeeded" | "failed";
  createStatus: "idle" | "loading" | "succeeded" | "failed";
  updateStatus: "idle" | "loading" | "succeeded" | "failed";
  deleteStatus: "idle" | "loading" | "succeeded" | "failed";
  isFormModalOpen: boolean;
  formMode: "create" | "edit";
  isDeleteConfirmOpen: boolean;
  error: string | null;
  notice: string | null;
};
