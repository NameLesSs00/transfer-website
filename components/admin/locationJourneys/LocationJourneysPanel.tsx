"use client";

import { LocationJourneyDeleteConfirm } from "./LocationJourneyDeleteConfirm";
import { LocationJourneyFormModal } from "./LocationJourneyFormModal";
import { LocationJourneysTable } from "./LocationJourneysTable";
import { LocationJourneysToolbar } from "./LocationJourneysToolbar";

export function LocationJourneysPanel() {
  return (
    <section className="flex min-h-[calc(100vh-220px)] flex-col rounded-xl border border-gray-100 bg-white shadow-[0_1px_8px_rgba(15,23,42,0.04)]">
      <LocationJourneysToolbar />
      <LocationJourneysTable />
      <LocationJourneyFormModal />
      <LocationJourneyDeleteConfirm />
    </section>
  );
}
