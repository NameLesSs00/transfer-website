"use client";

import { LocationDeleteConfirm } from "./LocationDeleteConfirm";
import { LocationFormModal } from "./LocationFormModal";
import { LocationsTable } from "./LocationsTable";
import { LocationsToolbar } from "./LocationsToolbar";

export function LocationsPanel() {
  return (
    <section className="rounded-xl border border-gray-100 bg-white shadow-[0_1px_8px_rgba(15,23,42,0.04)]">
      <LocationsToolbar />
      <LocationsTable />
      <LocationFormModal />
      <LocationDeleteConfirm />
    </section>
  );
}
