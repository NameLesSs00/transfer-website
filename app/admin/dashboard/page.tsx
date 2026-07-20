"use client";

import { useEffect } from "react";
import Link from "next/link";
import {
  BadgeDollarSign,
  CalendarCheck,
  CarFront,
  CircleDollarSign,
  Clock3,
  Loader2,
  MapPin,
  MapPinned,
  Route,
  Star,
  Tags,
  Users,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminNotice } from "@/components/admin/AdminNotice";
import { hydrateAuth } from "@/store/features/auth/authSlice";
import { fetchDashboard } from "@/store/features/dashboard/dashboardSlice";
import { DashboardData } from "@/store/features/dashboard/dashboardModels";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

const emptyDashboard: DashboardData = {
  general: {
    totalVehicles: 0,
    totalVehicleCategories: 0,
    totalVehicleFactories: 0,
    totalLocations: 0,
    totalTransferRoutes: 0,
    totalPerJourneys: 0,
    totalServices: 0,
    totalBookings: 0,
    totalReviews: 0,
  },
  bookings: {
    pending: 0,
    confirmed: 0,
    completed: 0,
    cancelled: 0,
  },
  bookingTypes: {
    totalTransferBookings: 0,
    totalPerJourneyBookings: 0,
  },
  tripTypes: {
    oneWayBookings: 0,
    roundTripBookings: 0,
  },
  payments: {
    totalPayments: 0,
    successfulPayments: 0,
    failedPayments: 0,
    pendingPayments: 0,
  },
  revenue: {
    totalRevenue: 0,
    revenueToday: 0,
    revenueThisWeek: 0,
    revenueThisMonth: 0,
  },
  reviews: {
    averageRating: 0,
    totalReviews: 0,
  },
};

const quickLinks = [
  {
    description: "Manage operators and account access.",
    href: "/admin/admins",
    icon: Users,
    label: "Admins",
  },
  {
    description: "Manage fleet vehicles and image assignments.",
    href: "/admin/vehicles",
    icon: CarFront,
    label: "Vehicles",
  },
  {
    description: "Maintain manufacturer records for the fleet.",
    href: "/admin/vehicle-factories",
    icon: CarFront,
    label: "Vehicle Factories",
  },
  {
    description: "Manage fleet categories and pricing types.",
    href: "/admin/vehicle-categories",
    icon: Tags,
    label: "Vehicle Categories",
  },
  {
    description: "Manage pickup and drop-off coordinates.",
    href: "/admin/locations",
    icon: MapPin,
    label: "Locations",
  },
  {
    description: "Connect locations into transfer routes.",
    href: "/admin/transfer-routes",
    icon: Route,
    label: "Transfer Routes",
  },
  {
    description: "Set route prices by vehicle category.",
    href: "/admin/route-pricings",
    icon: BadgeDollarSign,
    label: "Route Pricings",
  },
  {
    description: "Manage named transfer journey locations.",
    href: "/admin/location-journeys",
    icon: MapPinned,
    label: "Location Journeys",
  },
  {
    description: "Set vehicle prices between location journeys.",
    href: "/admin/per-journeys",
    icon: BadgeDollarSign,
    label: "Per Journeys",
  },
];

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
    style: "currency",
    currency: "USD",
  }).format(value);
}

function formatRating(value: number) {
  return `${value.toFixed(1)} / 5`;
}

type SummaryCardProps = {
  icon: React.ElementType;
  label: string;
  value: string;
};

function SummaryCard({ icon: Icon, label, value }: SummaryCardProps) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-[0_1px_8px_rgba(15,23,42,0.04)]">
      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#fbf5f0] text-transfer-green">
        <Icon className="h-5 w-5" />
      </span>
      <p className="mt-5 text-sm font-semibold text-[#667085]">{label}</p>
      <p className="mt-2 text-3xl font-bold text-transfer-dark">{value}</p>
    </div>
  );
}

type DataPanelProps = {
  items: Array<{ label: string; value: string }>;
  title: string;
};

function DataPanel({ items, title }: DataPanelProps) {
  return (
    <section className="rounded-xl border border-gray-100 bg-white p-5 shadow-[0_1px_8px_rgba(15,23,42,0.04)]">
      <h2 className="text-lg font-bold text-transfer-dark">{title}</h2>
      <div className="mt-4 flex flex-col divide-y divide-gray-100">
        {items.map((item) => (
          <div key={item.label} className="flex items-center justify-between gap-4 py-3">
            <span className="text-sm font-semibold text-[#667085]">{item.label}</span>
            <span className="text-sm font-bold text-transfer-dark">{item.value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function AdminDashboardPage() {
  const dispatch = useAppDispatch();
  const { hydrated } = useAppSelector((state) => state.auth);
  const { data, status } = useAppSelector((state) => state.dashboard);
  const dashboard = data ?? emptyDashboard;
  const isLoadingDashboard = status === "loading";

  useEffect(() => {
    dispatch(hydrateAuth());
  }, [dispatch]);

  useEffect(() => {
    if (!hydrated) return;

    void dispatch(fetchDashboard());
  }, [dispatch, hydrated]);

  if (!hydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fbfaf8] text-transfer-dark">
        <Loader2 className="mr-3 h-5 w-5 animate-spin text-transfer-green" />
        Checking admin session...
      </div>
    );
  }

  const summaryCards = [
    {
      icon: CalendarCheck,
      label: "Total Bookings",
      value: formatNumber(dashboard.general.totalBookings),
    },
    {
      icon: CircleDollarSign,
      label: "Revenue Today",
      value: formatCurrency(dashboard.revenue.revenueToday),
    },
    {
      icon: Clock3,
      label: "Pending Bookings",
      value: formatNumber(dashboard.bookings.pending),
    },
    {
      icon: Star,
      label: "Average Rating",
      value: formatRating(dashboard.reviews.averageRating),
    },
  ];

  const panels = [
    {
      title: "General",
      items: [
        { label: "Vehicles", value: formatNumber(dashboard.general.totalVehicles) },
        { label: "Vehicle Categories", value: formatNumber(dashboard.general.totalVehicleCategories) },
        { label: "Vehicle Factories", value: formatNumber(dashboard.general.totalVehicleFactories) },
        { label: "Locations", value: formatNumber(dashboard.general.totalLocations) },
        { label: "Transfer Routes", value: formatNumber(dashboard.general.totalTransferRoutes) },
        { label: "Per Journeys", value: formatNumber(dashboard.general.totalPerJourneys) },
        { label: "Services", value: formatNumber(dashboard.general.totalServices) },
        { label: "Reviews", value: formatNumber(dashboard.general.totalReviews) },
      ],
    },
    {
      title: "Booking Status",
      items: [
        { label: "Pending", value: formatNumber(dashboard.bookings.pending) },
        { label: "Confirmed", value: formatNumber(dashboard.bookings.confirmed) },
        { label: "Completed", value: formatNumber(dashboard.bookings.completed) },
        { label: "Cancelled", value: formatNumber(dashboard.bookings.cancelled) },
      ],
    },
    {
      title: "Booking Types",
      items: [
        { label: "Transfer Bookings", value: formatNumber(dashboard.bookingTypes.totalTransferBookings) },
        { label: "Per Journey Bookings", value: formatNumber(dashboard.bookingTypes.totalPerJourneyBookings) },
        { label: "One Way", value: formatNumber(dashboard.tripTypes.oneWayBookings) },
        { label: "Round Trip", value: formatNumber(dashboard.tripTypes.roundTripBookings) },
      ],
    },
    {
      title: "Payments",
      items: [
        { label: "Total Payments", value: formatNumber(dashboard.payments.totalPayments) },
        { label: "Successful", value: formatNumber(dashboard.payments.successfulPayments) },
        { label: "Failed", value: formatNumber(dashboard.payments.failedPayments) },
        { label: "Pending", value: formatNumber(dashboard.payments.pendingPayments) },
      ],
    },
    {
      title: "Revenue",
      items: [
        { label: "Total Revenue", value: formatCurrency(dashboard.revenue.totalRevenue) },
        { label: "Today", value: formatCurrency(dashboard.revenue.revenueToday) },
        { label: "This Week", value: formatCurrency(dashboard.revenue.revenueThisWeek) },
        { label: "This Month", value: formatCurrency(dashboard.revenue.revenueThisMonth) },
      ],
    },
    {
      title: "Reviews",
      items: [
        { label: "Average Rating", value: formatRating(dashboard.reviews.averageRating) },
        { label: "Total Reviews", value: formatNumber(dashboard.reviews.totalReviews) },
      ],
    },
  ];

  return (
    <AdminLayout>
      <AdminNotice />

      {isLoadingDashboard && (
        <div className="inline-flex w-fit items-center gap-2 rounded-xl border border-gray-100 bg-white px-4 py-3 text-sm font-bold text-[#667085] shadow-[0_1px_8px_rgba(15,23,42,0.04)]">
          <Loader2 className="h-4 w-4 animate-spin text-transfer-green" />
          Loading dashboard data...
        </div>
      )}

      <section className="grid gap-5 lg:grid-cols-4">
        {summaryCards.map((card) => (
          <SummaryCard key={card.label} {...card} />
        ))}
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-[0_1px_8px_rgba(15,23,42,0.04)]">
          <div className="flex flex-col gap-2 border-b border-gray-100 pb-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-transfer-dark">Admin Shortcuts</h2>
              <p className="mt-1 text-sm font-medium text-[#667085]">
                Open the management pages used most often.
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {quickLinks.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg border border-gray-100 p-4 transition-colors hover:border-transfer-green/30 hover:bg-[#fbf5f0]"
                >
                  <Icon className="h-6 w-6 text-transfer-green" />
                  <h3 className="mt-3 text-base font-bold text-transfer-dark">{item.label}</h3>
                  <p className="mt-1 text-sm font-medium leading-6 text-[#667085]">
                    {item.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-1">
          <DataPanel
            title="Trip Types"
            items={[
              { label: "One Way", value: formatNumber(dashboard.tripTypes.oneWayBookings) },
              { label: "Round Trip", value: formatNumber(dashboard.tripTypes.roundTripBookings) },
            ]}
          />
          <DataPanel
            title="Payment Health"
            items={[
              { label: "Successful", value: formatNumber(dashboard.payments.successfulPayments) },
              { label: "Failed", value: formatNumber(dashboard.payments.failedPayments) },
              { label: "Pending", value: formatNumber(dashboard.payments.pendingPayments) },
            ]}
          />
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
        {panels.map((panel) => (
          <DataPanel key={panel.title} {...panel} />
        ))}
      </section>
    </AdminLayout>
  );
}
