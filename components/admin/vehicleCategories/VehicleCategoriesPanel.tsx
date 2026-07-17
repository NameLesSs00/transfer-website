"use client";

import { VehicleCategoriesTable } from "./VehicleCategoriesTable";
import { VehicleCategoriesToolbar } from "./VehicleCategoriesToolbar";
import { VehicleCategoryDeleteConfirm } from "./VehicleCategoryDeleteConfirm";
import { VehicleCategoryFormModal } from "./VehicleCategoryFormModal";

export function VehicleCategoriesPanel() {
  return (
    <section className="rounded-xl border border-gray-100 bg-white shadow-[0_1px_8px_rgba(15,23,42,0.04)]">
      <VehicleCategoriesToolbar />
      <VehicleCategoriesTable />
      <VehicleCategoryFormModal />
      <VehicleCategoryDeleteConfirm />
    </section>
  );
}
