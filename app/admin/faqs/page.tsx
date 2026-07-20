"use client";

import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminNotice } from "@/components/admin/AdminNotice";
import { FaqsPanel } from "@/components/admin/faqs/FaqsPanel";
import { hydrateAuth } from "@/store/features/auth/authSlice";
import { fetchFaqs } from "@/store/features/faqs/faqsSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export default function FaqsPage() {
  const dispatch = useAppDispatch();
  const { hydrated } = useAppSelector((state) => state.auth);
  const { isDescending, pageSize, search, sortBy } = useAppSelector((state) => state.faqs);

  useEffect(() => {
    dispatch(hydrateAuth());
  }, [dispatch]);

  useEffect(() => {
    if (!hydrated) return;

    void dispatch(
      fetchFaqs({
        pageNumber: 1,
        pageSize,
        search,
        sortBy,
        isDescending,
      })
    );
  }, [dispatch, hydrated, isDescending, pageSize, search, sortBy]);

  if (!hydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fbfaf8] text-transfer-dark">
        <Loader2 className="mr-3 h-5 w-5 animate-spin text-transfer-green" />
        Preparing FAQs...
      </div>
    );
  }

  return (
    <AdminLayout>
      <AdminNotice />
      <FaqsPanel />
    </AdminLayout>
  );
}
