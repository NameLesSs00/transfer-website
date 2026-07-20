"use client";

import { VehicleFactoriesTable } from "./VehicleFactoriesTable";
import { VehicleFactoriesToolbar } from "./VehicleFactoriesToolbar";
import { VehicleFactoryDeleteConfirm } from "./VehicleFactoryDeleteConfirm";
import { VehicleFactoryFormModal } from "./VehicleFactoryFormModal";

export function VehicleFactoriesPanel() {
  return (
    <section className="flex min-h-[calc(100vh-220px)] flex-col rounded-xl border border-gray-100 bg-white shadow-[0_1px_8px_rgba(15,23,42,0.04)]">
      <VehicleFactoriesToolbar />
      <VehicleFactoriesTable />
      <VehicleFactoryFormModal />
      <VehicleFactoryDeleteConfirm />
    </section>
  );
}
