"use client";

import Image from "next/image";
import { Factory, Users, X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  closeAdminSidebar,
  setActiveAdminSection,
} from "@/store/features/ui/uiSlice";

function SidebarContent() {
  const dispatch = useAppDispatch();
  const activeSection = useAppSelector((state) => state.ui.activeAdminSection);
  const profile = useAppSelector((state) => state.auth.profile);

  function activateSection(section: "admins" | "vehicleFactories") {
    dispatch(setActiveAdminSection(section));
    dispatch(closeAdminSidebar());
  }

  const activeClass = "bg-[#edf8f1] text-transfer-green";
  const inactiveClass = "text-[#667085] hover:bg-gray-50";

  return (
    <>
      <Image
        src="/Logo.png"
        alt="Transfer website"
        width={160}
        height={45}
        className="h-auto w-[150px]"
        priority
      />

      <nav className="mt-10 flex flex-col gap-2">
        <button
          onClick={() => activateSection("admins")}
          className={`flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-bold ${
            activeSection === "admins" ? activeClass : inactiveClass
          }`}
        >
          <Users className="h-5 w-5" />
          Admins
        </button>
        <button
          onClick={() => activateSection("vehicleFactories")}
          className={`flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-bold ${
            activeSection === "vehicleFactories" ? activeClass : inactiveClass
          }`}
        >
          <Factory className="h-5 w-5" />
          Vehicle Factories
        </button>
      </nav>

      <div className="mt-auto rounded-xl bg-[#f6f8fb] p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#8a94a3]">
          Signed in as
        </p>
        <p className="mt-2 text-sm font-bold text-transfer-dark">
          {profile?.fullName || "Admin"}
        </p>
        <p className="mt-1 truncate text-xs font-medium text-[#667085]">
          {profile?.email || "No email saved"}
        </p>
      </div>
    </>
  );
}

export function AdminSidebar() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.ui.adminSidebarOpen);

  return (
    <>
      <aside className="hidden w-[280px] flex-shrink-0 border-r border-gray-200 bg-white px-5 py-6 lg:flex lg:flex-col">
        <SidebarContent />
      </aside>

      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            className="absolute inset-0 bg-black/35"
            onClick={() => dispatch(closeAdminSidebar())}
            aria-label="Close admin sidebar"
          />
          <aside className="relative flex h-full w-[280px] flex-col bg-white px-5 py-6 shadow-xl">
            <button
              onClick={() => dispatch(closeAdminSidebar())}
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-transfer-dark"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
            <SidebarContent />
          </aside>
        </div>
      )}
    </>
  );
}
