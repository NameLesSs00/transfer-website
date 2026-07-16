"use client";

import { LogOut, Menu, Plus, RefreshCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { fetchAdmins, openAddAdminModal } from "@/store/features/admins/adminsSlice";
import { logoutAdmin } from "@/store/features/auth/authSlice";
import { openAdminSidebar } from "@/store/features/ui/uiSlice";
import {
  fetchVehicleFactories,
  openCreateVehicleFactoryModal,
} from "@/store/features/vehicleFactories/vehicleFactoriesSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export function AdminTopbar() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const activeSection = useAppSelector((state) => state.ui.activeAdminSection);
  const admins = useAppSelector((state) => state.admins);
  const vehicleFactories = useAppSelector((state) => state.vehicleFactories);
  const logoutStatus = useAppSelector((state) => state.auth.logoutStatus);
  const isVehicleFactories = activeSection === "vehicleFactories";
  const title = isVehicleFactories ? "Vehicle Factories" : "Admins";

  function handleRefresh() {
    if (isVehicleFactories) {
      dispatch(
        fetchVehicleFactories({
          pageNumber: vehicleFactories.pageNumber,
          pageSize: vehicleFactories.pageSize,
          search: vehicleFactories.search,
          sortBy: vehicleFactories.sortBy,
          isDescending: vehicleFactories.isDescending,
        })
      );
      return;
    }

    dispatch(fetchAdmins({ pageNumber: admins.pageNumber, pageSize: admins.pageSize }));
  }

  function handleAdd() {
    if (isVehicleFactories) {
      dispatch(openCreateVehicleFactoryModal());
      return;
    }

    dispatch(openAddAdminModal());
  }

  async function handleLogout() {
    await dispatch(logoutAdmin());
    router.replace("/admin/login");
  }

  return (
    <header className="flex flex-col gap-4 border-b border-gray-200 bg-white px-4 py-5 md:px-8 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex items-start gap-3">
        <button
          onClick={() => dispatch(openAdminSidebar())}
          className="mt-1 flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-transfer-dark lg:hidden"
          aria-label="Open admin sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-transfer-green">
            Admin Dashboard
          </p>
          <h1 className="mt-2 text-2xl font-bold text-transfer-dark md:text-3xl">
            {title}
          </h1>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={handleRefresh}
          className="inline-flex h-10 items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 text-sm font-bold text-transfer-dark hover:bg-gray-50"
        >
          <RefreshCcw className="h-4 w-4" />
          Refresh
        </button>
        <button
          onClick={handleAdd}
          className="inline-flex h-10 items-center gap-2 rounded-lg bg-transfer-green px-4 text-sm font-bold text-white hover:bg-[#3d8525]"
        >
          <Plus className="h-4 w-4" />
          {isVehicleFactories ? "Add Factory" : "Add Admin"}
        </button>
        <button
          onClick={handleLogout}
          disabled={logoutStatus === "loading"}
          className="inline-flex h-10 items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 text-sm font-bold text-[#667085] hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <LogOut className="h-4 w-4" />
          {logoutStatus === "loading" ? "Logging out..." : "Logout"}
        </button>
      </div>
    </header>
  );
}
