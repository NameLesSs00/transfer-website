"use client";

import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminNotice } from "@/components/admin/AdminNotice";
import { VehicleFactoriesPanel } from "@/components/admin/vehicleFactories/VehicleFactoriesPanel";
import { hydrateAuth } from "@/store/features/auth/authSlice";
import { fetchVehicleFactories } from "@/store/features/vehicleFactories/vehicleFactoriesSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export default function VehicleFactoriesPage() {
  const dispatch = useAppDispatch();
  const { hydrated } = useAppSelector((state) => state.auth);
  const { isDescending, pageSize, search, sortBy } = useAppSelector(
    (state) => state.vehicleFactories
  );

  useEffect(() => {
    dispatch(hydrateAuth());
  }, [dispatch]);

  useEffect(() => {
    if (!hydrated) return;

    void dispatch(
      fetchVehicleFactories({
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
        Preparing vehicle factories...
      </div>
    );
  }

  return (
    <AdminLayout>
      <AdminNotice />
      <VehicleFactoriesPanel />
    </AdminLayout>
  );
}
