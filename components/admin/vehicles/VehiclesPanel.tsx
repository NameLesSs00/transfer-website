"use client";

import { VehicleDeleteConfirm } from "./VehicleDeleteConfirm";
import { VehicleFormModal } from "./VehicleFormModal";
import { VehiclesTable } from "./VehiclesTable";
import { VehiclesToolbar } from "./VehiclesToolbar";

export function VehiclesPanel() {
  return (
    <section className="flex min-h-[calc(100vh-220px)] flex-col rounded-xl border border-gray-100 bg-white shadow-[0_1px_8px_rgba(15,23,42,0.04)]">
      <VehiclesToolbar />
      <VehiclesTable />
      <VehicleFormModal />
      <VehicleDeleteConfirm />
    </section>
  );
}
