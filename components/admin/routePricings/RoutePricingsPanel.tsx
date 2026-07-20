"use client";

import { RoutePricingDeleteConfirm } from "./RoutePricingDeleteConfirm";
import { RoutePricingFormModal } from "./RoutePricingFormModal";
import { RoutePricingsTable } from "./RoutePricingsTable";
import { RoutePricingsToolbar } from "./RoutePricingsToolbar";

export function RoutePricingsPanel() {
  return (
    <section className="flex min-h-[calc(100vh-220px)] flex-col rounded-xl border border-gray-100 bg-white shadow-[0_1px_8px_rgba(15,23,42,0.04)]">
      <RoutePricingsToolbar />
      <RoutePricingsTable />
      <RoutePricingFormModal />
      <RoutePricingDeleteConfirm />
    </section>
  );
}
