import React from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { BookingsPanel } from "@/components/admin/bookings/BookingsPanel";

export default function AdminBookingsPage() {
  return (
    <AdminLayout>
      <BookingsPanel />
    </AdminLayout>
  );
}
