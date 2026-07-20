"use client";

import { FaqDeleteConfirm } from "./FaqDeleteConfirm";
import { FaqFormModal } from "./FaqFormModal";
import { FaqsTable } from "./FaqsTable";
import { FaqsToolbar } from "./FaqsToolbar";

export function FaqsPanel() {
  return (
    <section className="flex min-h-[calc(100vh-220px)] flex-col rounded-xl border border-gray-100 bg-white shadow-[0_1px_8px_rgba(15,23,42,0.04)]">
      <FaqsToolbar />
      <FaqsTable />
      <FaqFormModal />
      <FaqDeleteConfirm />
    </section>
  );
}
