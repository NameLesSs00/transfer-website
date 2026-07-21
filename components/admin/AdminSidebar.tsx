"use client";

import Image from "next/image";
import Link from "next/link";
import { BadgeDollarSign, BarChart3, CarFront, ClipboardList, Factory, HelpCircle, LayoutDashboard, MapPin, MapPinned, Route, Tags, Users, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { closeAdminSidebar } from "@/store/features/ui/uiSlice";

const navigationItems = [
  {
    href: "/admin/dashboard",
    icon: LayoutDashboard,
    label: "Dashboard",
  },
  {
    href: "/admin/reports",
    icon: BarChart3,
    label: "Reports",
  },
  {
    href: "/admin/admins",
    icon: Users,
    label: "Admins",
  },
  {
    href: "/admin/bookings",
    icon: ClipboardList,
    label: "Bookings",
  },
  {
    href: "/admin/faqs",
    icon: HelpCircle,
    label: "FAQs",
  },
  {
    href: "/admin/vehicles",
    icon: CarFront,
    label: "Vehicles",
  },
  {
    href: "/admin/vehicle-factories",
    icon: Factory,
    label: "Vehicle Factories",
  },
  {
    href: "/admin/vehicle-categories",
    icon: Tags,
    label: "Vehicle Categories",
  },
  {
    href: "/admin/locations",
    icon: MapPin,
    label: "Locations",
  },
  {
    href: "/admin/transfer-routes",
    icon: Route,
    label: "Transfer Routes",
  },
  {
    href: "/admin/route-pricings",
    icon: BadgeDollarSign,
    label: "Route Pricings",
  },
  {
    href: "/admin/location-journeys",
    icon: MapPinned,
    label: "Location Journeys",
  },
  {
    href: "/admin/per-journeys",
    icon: BadgeDollarSign,
    label: "Per Journeys",
  },
];

function SidebarContent() {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const profile = useAppSelector((state) => state.auth.profile);

  const activeClass = "bg-[#fbf5f0] text-transfer-green";
  const inactiveClass = "text-[#667085] hover:bg-gray-50";

  return (
    <>
      <Image
        src="/Logo.png"
        alt="Rubin Tours"
        width={38}
        height={49}
        className="h-12 w-auto object-contain"
        priority
      />

      <nav className="mt-10 flex flex-col gap-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => dispatch(closeAdminSidebar())}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-bold ${
                isActive ? activeClass : inactiveClass
              }`}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto rounded-xl bg-[#fbfaf8] p-4">
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
