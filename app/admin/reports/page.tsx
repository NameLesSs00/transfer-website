import React from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { ReportsPanel } from "@/components/admin/reports/ReportsPanel";

export default function AdminReportsPage() {
  return (
    <AdminLayout>
      <ReportsPanel />
    </AdminLayout>
  );
}
