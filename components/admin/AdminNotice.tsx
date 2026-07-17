"use client";

import { useAppSelector } from "@/store/hooks";

export function AdminNotice() {
  const adminsError = useAppSelector((state) => state.admins.error);
  const adminsNotice = useAppSelector((state) => state.admins.notice);
  const authError = useAppSelector((state) => state.auth.error);
  const authNotice = useAppSelector((state) => state.auth.notice);
  const dashboardError = useAppSelector((state) => state.dashboard.error);
  const dashboardNotice = useAppSelector((state) => state.dashboard.notice);
  const categoriesError = useAppSelector((state) => state.vehicleCategories.error);
  const categoriesNotice = useAppSelector((state) => state.vehicleCategories.notice);
  const factoriesError = useAppSelector((state) => state.vehicleFactories.error);
  const factoriesNotice = useAppSelector((state) => state.vehicleFactories.notice);
  const journeysError = useAppSelector((state) => state.locationJourneys.error);
  const journeysNotice = useAppSelector((state) => state.locationJourneys.notice);
  const locationsError = useAppSelector((state) => state.locations.error);
  const locationsNotice = useAppSelector((state) => state.locations.notice);
  const routePricingsError = useAppSelector((state) => state.routePricings.error);
  const routePricingsNotice = useAppSelector((state) => state.routePricings.notice);
  const transferRoutesError = useAppSelector((state) => state.transferRoutes.error);
  const transferRoutesNotice = useAppSelector((state) => state.transferRoutes.notice);
  const vehiclesError = useAppSelector((state) => state.vehicles.error);
  const vehiclesNotice = useAppSelector((state) => state.vehicles.notice);

  const error =
    adminsError ||
    authError ||
    dashboardError ||
    categoriesError ||
    factoriesError ||
    journeysError ||
    locationsError ||
    routePricingsError ||
    transferRoutesError ||
    vehiclesError;
  const notice =
    adminsNotice ||
    authNotice ||
    dashboardNotice ||
    categoriesNotice ||
    factoriesNotice ||
    journeysNotice ||
    locationsNotice ||
    routePricingsNotice ||
    transferRoutesNotice ||
    vehiclesNotice;
  const message = error || notice;

  if (!message) return null;

  return (
    <div
      className={`rounded-xl border px-4 py-3 text-sm font-semibold ${
        error
          ? "border-red-100 bg-red-50 text-red-700"
          : "border-green-100 bg-green-50 text-green-700"
      }`}
    >
      {message}
    </div>
  );
}
