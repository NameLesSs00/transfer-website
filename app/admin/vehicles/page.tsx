"use client";

import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminNotice } from "@/components/admin/AdminNotice";
import { VehiclesPanel } from "@/components/admin/vehicles/VehiclesPanel";
import { hydrateAuth } from "@/store/features/auth/authSlice";
import { fetchVehicleCategories } from "@/store/features/vehicleCategories/vehicleCategoriesSlice";
import { fetchVehicleFactories } from "@/store/features/vehicleFactories/vehicleFactoriesSlice";
import { fetchVehicles } from "@/store/features/vehicles/vehiclesSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export default function VehiclesPage() {
  const dispatch = useAppDispatch();
  const { hydrated } = useAppSelector((state) => state.auth);
  const { isDescending, pageSize, search, sortBy } = useAppSelector((state) => state.vehicles);

  useEffect(() => {
    dispatch(hydrateAuth());
  }, [dispatch]);

  useEffect(() => {
    if (!hydrated) return;

    void dispatch(
      fetchVehicles({
        pageNumber: 1,
        pageSize,
        search,
        sortBy,
        isDescending,
      })
    );
    void dispatch(fetchVehicleCategories({ pageNumber: 1, pageSize: 100, sortBy: "name" }));
    void dispatch(fetchVehicleFactories({ pageNumber: 1, pageSize: 100, sortBy: "name" }));
  }, [dispatch, hydrated, isDescending, pageSize, search, sortBy]);

  if (!hydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fbfaf8] text-transfer-dark">
        <Loader2 className="mr-3 h-5 w-5 animate-spin text-transfer-green" />
        Preparing vehicles...
      </div>
    );
  }

  return (
    <AdminLayout>
      <AdminNotice />
      <VehiclesPanel />
    </AdminLayout>
  );
}
