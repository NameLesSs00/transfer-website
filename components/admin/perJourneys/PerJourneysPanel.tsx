"use client";

import { PerJourneyDeleteConfirm } from "./PerJourneyDeleteConfirm";
import { PerJourneyFormModal } from "./PerJourneyFormModal";
import { PerJourneysTable } from "./PerJourneysTable";
import { PerJourneysToolbar } from "./PerJourneysToolbar";

export function PerJourneysPanel() {
  return (
    <section className="flex min-h-[calc(100vh-220px)] flex-col rounded-xl border border-gray-100 bg-white shadow-[0_1px_8px_rgba(15,23,42,0.04)]">
      <PerJourneysToolbar />
      <PerJourneysTable />
      <PerJourneyFormModal />
      <PerJourneyDeleteConfirm />
    </section>
  );
}
