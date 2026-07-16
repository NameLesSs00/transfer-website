"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { AddAdminModal } from "@/components/admin/AddAdminModal";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminNotice } from "@/components/admin/AdminNotice";
import { AdminsTable } from "@/components/admin/AdminsTable";
import { UpdatePasswordForm } from "@/components/admin/UpdatePasswordForm";
import { UpdateProfileForm } from "@/components/admin/UpdateProfileForm";
import { VehicleFactoriesPanel } from "@/components/admin/vehicleFactories/VehicleFactoriesPanel";
import { fetchAdmins } from "@/store/features/admins/adminsSlice";
import { hydrateAuth } from "@/store/features/auth/authSlice";
import { fetchVehicleFactories } from "@/store/features/vehicleFactories/vehicleFactoriesSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export default function AdminDashboardPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { accessToken, hydrated } = useAppSelector((state) => state.auth);
  const activeSection = useAppSelector((state) => state.ui.activeAdminSection);
  const adminsPageSize = useAppSelector((state) => state.admins.pageSize);
  const vehicleFactories = useAppSelector((state) => state.vehicleFactories);

  useEffect(() => {
    dispatch(hydrateAuth());
  }, [dispatch]);

  useEffect(() => {
    if (!hydrated) return;

    if (!accessToken) {
      router.replace("/admin/login");
      return;
    }

    if (activeSection === "vehicleFactories") {
      void dispatch(
        fetchVehicleFactories({
          pageNumber: 1,
          pageSize: vehicleFactories.pageSize,
          search: vehicleFactories.search,
          sortBy: vehicleFactories.sortBy,
          isDescending: vehicleFactories.isDescending,
        })
      );
      return;
    }

    void dispatch(fetchAdmins({ pageNumber: 1, pageSize: adminsPageSize }));
  }, [
    accessToken,
    activeSection,
    adminsPageSize,
    dispatch,
    hydrated,
    router,
    vehicleFactories.isDescending,
    vehicleFactories.pageSize,
    vehicleFactories.search,
    vehicleFactories.sortBy,
  ]);

  if (!hydrated || !accessToken) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f6f8fb] text-transfer-dark">
        <Loader2 className="mr-3 h-5 w-5 animate-spin text-transfer-green" />
        Checking admin session...
      </div>
    );
  }

  return (
    <AdminLayout>
      <AdminNotice />
      {activeSection === "vehicleFactories" ? (
        <VehicleFactoriesPanel />
      ) : (
        <>
          <AdminsTable />
          <div className="grid gap-6 xl:grid-cols-2">
            <UpdateProfileForm />
            <UpdatePasswordForm />
          </div>
          <AddAdminModal />
        </>
      )}
    </AdminLayout>
  );
}
