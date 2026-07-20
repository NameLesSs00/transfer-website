"use client";

import { LogOut, Menu, Plus } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { openAddAdminModal } from "@/store/features/admins/adminsSlice";
import { logoutAdmin } from "@/store/features/auth/authSlice";
import { openCreateFaqModal } from "@/store/features/faqs/faqsSlice";
import { openCreateLocationJourneyModal } from "@/store/features/locationJourneys/locationJourneysSlice";
import { openCreateLocationModal } from "@/store/features/locations/locationsSlice";
import { openCreatePerJourneyModal } from "@/store/features/perJourneys/perJourneysSlice";
import { openCreateRoutePricingModal } from "@/store/features/routePricings/routePricingsSlice";
import { openCreateTransferRouteModal } from "@/store/features/transferRoutes/transferRoutesSlice";
import { openAdminSidebar } from "@/store/features/ui/uiSlice";
import { openCreateVehicleCategoryModal } from "@/store/features/vehicleCategories/vehicleCategoriesSlice";
import { openCreateVehicleFactoryModal } from "@/store/features/vehicleFactories/vehicleFactoriesSlice";
import { openCreateVehicleModal } from "@/store/features/vehicles/vehiclesSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

type AdminPageAction =
  | "addAdmin"
  | "addCategory"
  | "addFaq"
  | "addFactory"
  | "addJourney"
  | "addLocation"
  | "addPerJourney"
  | "addRoutePricing"
  | "addTransferRoute"
  | "addVehicle";

function getPageConfig(pathname: string): {
  action?: AdminPageAction;
  addLabel?: string;
  eyebrow: string;
  title: string;
} {
  if (pathname.startsWith("/admin/admins")) {
    return {
      action: "addAdmin",
      addLabel: "Add Admin",
      eyebrow: "Access Management",
      title: "Admins",
    };
  }

  if (pathname.startsWith("/admin/faqs")) {
    return {
      action: "addFaq",
      addLabel: "Add FAQ",
      eyebrow: "Content Management",
      title: "FAQs",
    };
  }

  if (pathname.startsWith("/admin/vehicle-factories")) {
    return {
      action: "addFactory",
      addLabel: "Add Factory",
      eyebrow: "Fleet Configuration",
      title: "Vehicle Factories",
    };
  }

  if (pathname.startsWith("/admin/vehicles")) {
    return {
      action: "addVehicle",
      addLabel: "Add Vehicle",
      eyebrow: "Fleet Management",
      title: "Vehicles",
    };
  }

  if (pathname.startsWith("/admin/vehicle-categories")) {
    return {
      action: "addCategory",
      addLabel: "Add Category",
      eyebrow: "Fleet Configuration",
      title: "Vehicle Categories",
    };
  }

  if (pathname.startsWith("/admin/location-journeys")) {
    return {
      action: "addJourney",
      addLabel: "Add Journey",
      eyebrow: "Route Configuration",
      title: "Location Journeys",
    };
  }

  if (pathname.startsWith("/admin/per-journeys")) {
    return {
      action: "addPerJourney",
      addLabel: "Add Per Journey",
      eyebrow: "Pricing Configuration",
      title: "Per Journeys",
    };
  }

  if (pathname.startsWith("/admin/transfer-routes")) {
    return {
      action: "addTransferRoute",
      addLabel: "Add Route",
      eyebrow: "Route Configuration",
      title: "Transfer Routes",
    };
  }

  if (pathname.startsWith("/admin/route-pricings")) {
    return {
      action: "addRoutePricing",
      addLabel: "Add Pricing",
      eyebrow: "Pricing Configuration",
      title: "Route Pricings",
    };
  }

  if (pathname.startsWith("/admin/locations")) {
    return {
      action: "addLocation",
      addLabel: "Add Location",
      eyebrow: "Route Configuration",
      title: "Locations",
    };
  }

  return {
    eyebrow: "Admin Dashboard",
    title: "Dashboard",
  };
}

export function AdminTopbar() {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const router = useRouter();
  const logoutStatus = useAppSelector((state) => state.auth.logoutStatus);
  const page = getPageConfig(pathname);

  function handleAdd() {
    if (page.action === "addFactory") {
      dispatch(openCreateVehicleFactoryModal());
      return;
    }

    if (page.action === "addAdmin") {
      dispatch(openAddAdminModal());
      return;
    }

    if (page.action === "addFaq") {
      dispatch(openCreateFaqModal());
      return;
    }

    if (page.action === "addJourney") {
      dispatch(openCreateLocationJourneyModal());
      return;
    }

    if (page.action === "addLocation") {
      dispatch(openCreateLocationModal());
      return;
    }

    if (page.action === "addTransferRoute") {
      dispatch(openCreateTransferRouteModal());
      return;
    }

    if (page.action === "addRoutePricing") {
      dispatch(openCreateRoutePricingModal());
      return;
    }

    if (page.action === "addPerJourney") {
      dispatch(openCreatePerJourneyModal());
      return;
    }

    if (page.action === "addCategory") {
      dispatch(openCreateVehicleCategoryModal());
      return;
    }

    if (page.action === "addVehicle") {
      dispatch(openCreateVehicleModal());
    }
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
            {page.eyebrow}
          </p>
          <h1 className="mt-2 text-2xl font-bold text-transfer-dark md:text-3xl">
            {page.title}
          </h1>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {page.action && (
          <button
            onClick={handleAdd}
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-transfer-green px-4 text-sm font-bold text-white hover:bg-[#ad743a]"
          >
            <Plus className="h-4 w-4" />
            {page.addLabel}
          </button>
        )}
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
