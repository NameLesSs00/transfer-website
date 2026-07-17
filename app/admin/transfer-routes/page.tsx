"use client";

import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminNotice } from "@/components/admin/AdminNotice";
import { TransferRoutesPanel } from "@/components/admin/transferRoutes/TransferRoutesPanel";
import { hydrateAuth } from "@/store/features/auth/authSlice";
import {
  fetchTransferRouteLocationOptions,
  fetchTransferRoutes,
} from "@/store/features/transferRoutes/transferRoutesSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export default function TransferRoutesPage() {
  const dispatch = useAppDispatch();
  const { hydrated } = useAppSelector((state) => state.auth);
  const { isDescending, pageSize, search, sortBy } = useAppSelector(
    (state) => state.transferRoutes
  );

  useEffect(() => {
    dispatch(hydrateAuth());
  }, [dispatch]);

  useEffect(() => {
    if (!hydrated) return;

    void dispatch(fetchTransferRouteLocationOptions());
  }, [dispatch, hydrated]);

  useEffect(() => {
    if (!hydrated) return;

    void dispatch(
      fetchTransferRoutes({
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
      <div className="flex min-h-screen items-center justify-center bg-[#f6f8fb] text-transfer-dark">
        <Loader2 className="mr-3 h-5 w-5 animate-spin text-transfer-green" />
        Preparing transfer routes...
      </div>
    );
  }

  return (
    <AdminLayout>
      <AdminNotice />
      <TransferRoutesPanel />
    </AdminLayout>
  );
}
