"use client";

import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminNotice } from "@/components/admin/AdminNotice";
import { VehicleCategoriesPanel } from "@/components/admin/vehicleCategories/VehicleCategoriesPanel";
import { hydrateAuth } from "@/store/features/auth/authSlice";
import { fetchVehicleCategories } from "@/store/features/vehicleCategories/vehicleCategoriesSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export default function VehicleCategoriesPage() {
  const dispatch = useAppDispatch();
  const { hydrated } = useAppSelector((state) => state.auth);
  const { isDescending, pageSize, search, sortBy } = useAppSelector(
    (state) => state.vehicleCategories
  );

  useEffect(() => {
    dispatch(hydrateAuth());
  }, [dispatch]);

  useEffect(() => {
    if (!hydrated) return;

    void dispatch(
      fetchVehicleCategories({
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
        Preparing vehicle categories...
      </div>
    );
  }

  return (
    <AdminLayout>
      <AdminNotice />
      <VehicleCategoriesPanel />
    </AdminLayout>
  );
}
