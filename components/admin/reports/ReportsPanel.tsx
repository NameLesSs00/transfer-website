"use client";

import React, { useState } from "react";
import { BarChart3, CalendarDays, Car, CreditCard, Wrench } from "lucide-react";
import { BookingsReportTab } from  "./BookingsReportTab";
import { PaymentsReportTab } from "./PaymentsReportTab";
import { RevenueReportTab } from "./RevenueReportTab";
import { VehiclesReportTab } from "./VehiclesReportTab";

const tabs = [
  { id: "bookings", label: "Bookings", icon: CalendarDays },
  { id: "payments", label: "Payments", icon: CreditCard },
  { id: "revenue", label: "Revenue", icon: BarChart3 },
  { id: "vehicles", label: "Vehicles", icon: Car },
];

export function ReportsPanel() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <div className="flex h-full flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-transfer-dark">Reports</h1>
      </div>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium
                  ${
                    isActive
                      ? "border-transfer-green text-transfer-green"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  }
                `}
              >
                <Icon
                  className={`
                    -ml-0.5 mr-2 h-5 w-5
                    ${isActive ? "text-transfer-green" : "text-gray-400 group-hover:text-gray-500"}
                  `}
                />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="flex-1 overflow-auto rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
        {activeTab === "bookings" && <BookingsReportTab />}
        {activeTab === "payments" && <PaymentsReportTab />}
        {activeTab === "revenue" && <RevenueReportTab />}
        {activeTab === "vehicles" && <VehiclesReportTab />}
      </div>
    </div>
  );
}
