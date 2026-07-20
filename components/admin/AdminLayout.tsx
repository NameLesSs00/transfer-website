"use client";

import { AdminSidebar } from "./AdminSidebar";
import { AdminTopbar } from "./AdminTopbar";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#fbfaf8] text-transfer-dark">
      <div className="flex min-h-screen">
        <AdminSidebar />
        <main className="flex min-w-0 flex-1 flex-col">
          <AdminTopbar />
          <div className="flex flex-1 flex-col gap-6 p-4 md:p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
