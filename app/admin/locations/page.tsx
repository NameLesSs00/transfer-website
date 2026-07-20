"use client";

import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminNotice } from "@/components/admin/AdminNotice";
import { LocationsPanel } from "@/components/admin/locations/LocationsPanel";
import { hydrateAuth } from "@/store/features/auth/authSlice";
import { fetchLocations } from "@/store/features/locations/locationsSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export default function LocationsPage() {
  const dispatch = useAppDispatch();
  const { hydrated } = useAppSelector((state) => state.auth);
  const { isDescending, pageSize, search, sortBy } = useAppSelector(
    (state) => state.locations
  );

  useEffect(() => {
    dispatch(hydrateAuth());
  }, [dispatch]);

  useEffect(() => {
    if (!hydrated) return;

    void dispatch(
      fetchLocations({
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
        Preparing locations...
      </div>
    );
  }

  return (
    <AdminLayout>
      <AdminNotice />
      <LocationsPanel />
    </AdminLayout>
  );
}
