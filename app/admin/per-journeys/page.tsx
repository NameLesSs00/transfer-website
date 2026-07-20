"use client";

import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminNotice } from "@/components/admin/AdminNotice";
import { PerJourneysPanel } from "@/components/admin/perJourneys/PerJourneysPanel";
import { hydrateAuth } from "@/store/features/auth/authSlice";
import {
  fetchPerJourneyLocationJourneyOptions,
  fetchPerJourneys,
  fetchPerJourneyVehicleOptions,
} from "@/store/features/perJourneys/perJourneysSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export default function PerJourneysPage() {
  const dispatch = useAppDispatch();
  const { hydrated } = useAppSelector((state) => state.auth);
  const { isDescending, pageSize, search, sortBy } = useAppSelector(
    (state) => state.perJourneys
  );

  useEffect(() => {
    dispatch(hydrateAuth());
  }, [dispatch]);

  useEffect(() => {
    if (!hydrated) return;

    void dispatch(
      fetchPerJourneys({
        pageNumber: 1,
        pageSize,
        search,
        sortBy,
        isDescending,
      })
    );
    void dispatch(fetchPerJourneyLocationJourneyOptions());
    void dispatch(fetchPerJourneyVehicleOptions());
  }, [dispatch, hydrated, isDescending, pageSize, search, sortBy]);

  if (!hydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fbfaf8] text-transfer-dark">
        <Loader2 className="mr-3 h-5 w-5 animate-spin text-transfer-green" />
        Preparing per journeys...
      </div>
    );
  }

  return (
    <AdminLayout>
      <AdminNotice />
      <PerJourneysPanel />
    </AdminLayout>
  );
}
