"use client";

import { TransferRouteDeleteConfirm } from "./TransferRouteDeleteConfirm";
import { TransferRouteFormModal } from "./TransferRouteFormModal";
import { TransferRoutesTable } from "./TransferRoutesTable";
import { TransferRoutesToolbar } from "./TransferRoutesToolbar";

export function TransferRoutesPanel() {
  return (
    <section className="rounded-xl border border-gray-100 bg-white shadow-[0_1px_8px_rgba(15,23,42,0.04)]">
      <TransferRoutesToolbar />
      <TransferRoutesTable />
      <TransferRouteFormModal />
      <TransferRouteDeleteConfirm />
    </section>
  );
}
