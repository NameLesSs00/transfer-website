"use client";

import { AdminSidebar } from "./AdminSidebar";
import { AdminTopbar } from "./AdminTopbar";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f6f8fb] text-transfer-dark">
      <div className="flex min-h-screen">
        <AdminSidebar />
        <main className="min-w-0 flex-1">
          <AdminTopbar />
          <div className="flex flex-col gap-6 p-4 md:p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
