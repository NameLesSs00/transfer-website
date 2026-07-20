"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { clearAdminsNotice } from "@/store/features/admins/adminsSlice";
import { clearAuthNotice } from "@/store/features/auth/authSlice";
import { clearDashboardNotice } from "@/store/features/dashboard/dashboardSlice";
import { clearFaqsNotice } from "@/store/features/faqs/faqsSlice";
import { clearLocationJourneysNotice } from "@/store/features/locationJourneys/locationJourneysSlice";
import { clearLocationsNotice } from "@/store/features/locations/locationsSlice";
import { clearRoutePricingsNotice } from "@/store/features/routePricings/routePricingsSlice";
import { clearTransferRoutesNotice } from "@/store/features/transferRoutes/transferRoutesSlice";
import { clearVehicleCategoriesNotice } from "@/store/features/vehicleCategories/vehicleCategoriesSlice";
import { clearVehicleFactoriesNotice } from "@/store/features/vehicleFactories/vehicleFactoriesSlice";
import { clearVehiclesNotice } from "@/store/features/vehicles/vehiclesSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

const NOTICE_TIMEOUT_MS = 4000;

export function AdminNotice() {
  const dispatch = useAppDispatch();
  const adminsError = useAppSelector((state) => state.admins.error);
  const adminsNotice = useAppSelector((state) => state.admins.notice);
  const authError = useAppSelector((state) => state.auth.error);
  const authNotice = useAppSelector((state) => state.auth.notice);
  const dashboardError = useAppSelector((state) => state.dashboard.error);
  const dashboardNotice = useAppSelector((state) => state.dashboard.notice);
  const faqsError = useAppSelector((state) => state.faqs.error);
  const faqsNotice = useAppSelector((state) => state.faqs.notice);
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
  const previousNoticesRef = useRef<Record<string, string | null>>({});
  const nextNoticeIdRef = useRef(0);
  const [visibleNotice, setVisibleNotice] = useState<{
    id: number;
    message: string;
  } | null>(null);

  const noticeEntries = useMemo(
    () => [
      { key: "admins", message: adminsNotice },
      { key: "auth", message: authNotice },
      { key: "dashboard", message: dashboardNotice },
      { key: "faqs", message: faqsNotice },
      { key: "categories", message: categoriesNotice },
      { key: "factories", message: factoriesNotice },
      { key: "journeys", message: journeysNotice },
      { key: "locations", message: locationsNotice },
      { key: "routePricings", message: routePricingsNotice },
      { key: "transferRoutes", message: transferRoutesNotice },
      { key: "vehicles", message: vehiclesNotice },
    ],
    [
      adminsNotice,
      authNotice,
      dashboardNotice,
      faqsNotice,
      categoriesNotice,
      factoriesNotice,
      journeysNotice,
      locationsNotice,
      routePricingsNotice,
      transferRoutesNotice,
      vehiclesNotice,
    ]
  );

  useEffect(() => {
    const previousNotices = previousNoticesRef.current;
    const changedNotice = [...noticeEntries]
      .reverse()
      .find((entry) => entry.message && previousNotices[entry.key] !== entry.message);

    previousNoticesRef.current = Object.fromEntries(
      noticeEntries.map((entry) => [entry.key, entry.message])
    );

    if (changedNotice?.message) {
      nextNoticeIdRef.current += 1;
      setVisibleNotice({
        id: nextNoticeIdRef.current,
        message: changedNotice.message,
      });
    }
  }, [noticeEntries]);

  useEffect(() => {
    if (!visibleNotice) return;

    const timeoutId = window.setTimeout(() => {
      setVisibleNotice(null);
      dispatch(clearAdminsNotice());
      dispatch(clearAuthNotice());
      dispatch(clearDashboardNotice());
      dispatch(clearFaqsNotice());
      dispatch(clearLocationJourneysNotice());
      dispatch(clearLocationsNotice());
      dispatch(clearRoutePricingsNotice());
      dispatch(clearTransferRoutesNotice());
      dispatch(clearVehicleCategoriesNotice());
      dispatch(clearVehicleFactoriesNotice());
      dispatch(clearVehiclesNotice());
    }, NOTICE_TIMEOUT_MS);

    return () => window.clearTimeout(timeoutId);
  }, [dispatch, visibleNotice]);

  const error =
    adminsError ||
    authError ||
    dashboardError ||
    faqsError ||
    categoriesError ||
    factoriesError ||
    journeysError ||
    locationsError ||
    routePricingsError ||
    transferRoutesError ||
    vehiclesError;
  const message = error || visibleNotice?.message;

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
