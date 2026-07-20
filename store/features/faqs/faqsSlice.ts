import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/store";
import {
  createFaqRequest,
  deleteFaqRequest,
  getFaqRequest,
  getFaqsRequest,
  updateFaqRequest,
} from "./faqsApi";
import {
  Faq,
  FaqPayload,
  FaqsQuery,
  FaqsResponse,
  FaqsState,
  UpdateFaqPayload,
} from "./faqsModels";

const initialQuery: FaqsQuery = {
  pageNumber: 1,
  pageSize: 10,
  search: "",
  sortBy: "question",
  isDescending: false,
};

const initialState: FaqsState = {
  ...initialQuery,
  items: [],
  selectedFaq: null,
  faqPendingDelete: null,
  totalPages: 1,
  totalRecords: 0,
  listStatus: "idle",
  detailStatus: "idle",
  createStatus: "idle",
  updateStatus: "idle",
  deleteStatus: "idle",
  isFormModalOpen: false,
  formMode: "create",
  isDeleteConfirmOpen: false,
  error: null,
  notice: null,
};

function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

function getQueryFromState(state: RootState, overrides: Partial<FaqsQuery> = {}) {
  const current = state.faqs;

  return {
    pageNumber: current.pageNumber,
    pageSize: current.pageSize,
    search: current.search,
    sortBy: current.sortBy,
    isDescending: current.isDescending,
    ...overrides,
  };
}

export const fetchFaqs = createAsyncThunk<
  FaqsResponse,
  Partial<FaqsQuery> | undefined,
  { state: RootState }
>("faqs/fetchFaqs", async (overrides, { getState }) => {
  const state = getState();
  const query = getQueryFromState(state, overrides);
  return getFaqsRequest(query, state.auth.accessToken);
});

export const fetchFaq = createAsyncThunk<Faq, number, { state: RootState }>(
  "faqs/fetchFaq",
  async (id, { getState }) => {
    const response = await getFaqRequest(id, getState().auth.accessToken);
    return response.data;
  }
);

export const createFaq = createAsyncThunk<string, FaqPayload, { state: RootState }>(
  "faqs/createFaq",
  async (payload, { getState }) => {
    const response = await createFaqRequest(payload, getState().auth.accessToken);
    return response.message || "FAQ created successfully";
  }
);

export const updateFaq = createAsyncThunk<string, UpdateFaqPayload, { state: RootState }>(
  "faqs/updateFaq",
  async (payload, { getState }) => {
    const response = await updateFaqRequest(payload, getState().auth.accessToken);
    return response.message || "FAQ updated successfully";
  }
);

export const removeFaq = createAsyncThunk<string, number, { state: RootState }>(
  "faqs/removeFaq",
  async (id, { getState }) => {
    const response = await deleteFaqRequest(id, getState().auth.accessToken);
    return response.message || "FAQ deleted successfully";
  }
);

const faqsSlice = createSlice({
  name: "faqs",
  initialState,
  reducers: {
    openCreateFaqModal(state) {
      state.formMode = "create";
      state.selectedFaq = null;
      state.isFormModalOpen = true;
    },
    openEditFaqModal(state, action: PayloadAction<Faq>) {
      state.formMode = "edit";
      state.selectedFaq = action.payload;
      state.isFormModalOpen = true;
    },
    closeFaqModal(state) {
      state.isFormModalOpen = false;
      state.selectedFaq = null;
      state.formMode = "create";
    },
    openDeleteFaqConfirm(state, action: PayloadAction<Faq>) {
      state.faqPendingDelete = action.payload;
      state.isDeleteConfirmOpen = true;
    },
    closeDeleteFaqConfirm(state) {
      state.faqPendingDelete = null;
      state.isDeleteConfirmOpen = false;
    },
    setFaqsSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
      state.pageNumber = 1;
    },
    setFaqsSort(state, action: PayloadAction<{ sortBy: string; isDescending: boolean }>) {
      state.sortBy = action.payload.sortBy;
      state.isDescending = action.payload.isDescending;
      state.pageNumber = 1;
    },
    clearFaqsNotice(state) {
      state.notice = null;
    },
    clearFaqsError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFaqs.pending, (state) => {
        state.listStatus = "loading";
        state.error = null;
      })
      .addCase(fetchFaqs.fulfilled, (state, action) => {
        state.listStatus = "succeeded";
        state.items = action.payload.data ?? [];
        state.pageNumber = action.payload.pageNumber || state.pageNumber;
        state.pageSize = action.payload.pageSize || state.pageSize;
        state.totalPages = action.payload.totalPages || 1;
        state.totalRecords = action.payload.totalRecords || action.payload.data?.length || 0;
      })
      .addCase(fetchFaqs.rejected, (state, action) => {
        state.listStatus = "failed";
        state.error = getErrorMessage(action.error, "Unable to load FAQs");
      })
      .addCase(fetchFaq.pending, (state) => {
        state.detailStatus = "loading";
        state.error = null;
      })
      .addCase(fetchFaq.fulfilled, (state, action) => {
        state.detailStatus = "succeeded";
        state.selectedFaq = action.payload;
      })
      .addCase(fetchFaq.rejected, (state, action) => {
        state.detailStatus = "failed";
        state.error = getErrorMessage(action.error, "Unable to load FAQ");
      })
      .addCase(createFaq.pending, (state) => {
        state.createStatus = "loading";
        state.error = null;
        state.notice = null;
      })
      .addCase(createFaq.fulfilled, (state, action) => {
        state.createStatus = "succeeded";
        state.isFormModalOpen = false;
        state.notice = action.payload;
      })
      .addCase(createFaq.rejected, (state, action) => {
        state.createStatus = "failed";
        state.error = getErrorMessage(action.error, "Unable to add FAQ");
      })
      .addCase(updateFaq.pending, (state) => {
        state.updateStatus = "loading";
        state.error = null;
        state.notice = null;
      })
      .addCase(updateFaq.fulfilled, (state, action) => {
        state.updateStatus = "succeeded";
        state.isFormModalOpen = false;
        state.selectedFaq = null;
        state.notice = action.payload;
      })
      .addCase(updateFaq.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.error = getErrorMessage(action.error, "Unable to update FAQ");
      })
      .addCase(removeFaq.pending, (state) => {
        state.deleteStatus = "loading";
        state.error = null;
        state.notice = null;
      })
      .addCase(removeFaq.fulfilled, (state, action) => {
        state.deleteStatus = "succeeded";
        state.faqPendingDelete = null;
        state.isDeleteConfirmOpen = false;
        state.notice = action.payload;
      })
      .addCase(removeFaq.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.error = getErrorMessage(action.error, "Unable to delete FAQ");
      });
  },
});

export const {
  clearFaqsError,
  clearFaqsNotice,
  closeDeleteFaqConfirm,
  closeFaqModal,
  openCreateFaqModal,
  openDeleteFaqConfirm,
  openEditFaqModal,
  setFaqsSearch,
  setFaqsSort,
} = faqsSlice.actions;

export const faqsReducer = faqsSlice.reducer;
