"use client";

import React, { useEffect, useState } from "react";
import { getReportsRevenue, ReportRevenue } from "@/lib/api/reportsApi";
import { Loader2, TrendingUp, Calendar, CalendarDays, DollarSign } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"];

export function RevenueReportTab() {
  const [data, setData] = useState<ReportRevenue | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await getReportsRevenue();
        if (res.success) {
          setData(res.data);
        } else {
          setError(res.message || "Failed to load revenue data.");
        }
      } catch (err: any) {
        setError(err.message || "An error occurred.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-transfer-green" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex h-64 items-center justify-center text-red-500">
        {error || "No data available."}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex items-center gap-4 rounded-xl border border-gray-100 bg-gray-50 p-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
            <DollarSign className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Revenue Today</p>
            <p className="text-2xl font-bold text-gray-900">€{data.revenueToday.toFixed(2)}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-xl border border-gray-100 bg-gray-50 p-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
            <Calendar className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Revenue This Week</p>
            <p className="text-2xl font-bold text-gray-900">€{data.revenueThisWeek.toFixed(2)}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-xl border border-gray-100 bg-gray-50 p-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100 text-yellow-600">
            <CalendarDays className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Revenue This Month</p>
            <p className="text-2xl font-bold text-gray-900">€{data.revenueThisMonth.toFixed(2)}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-xl border border-gray-100 bg-gray-50 p-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-purple-600">
            <TrendingUp className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Revenue This Year</p>
            <p className="text-2xl font-bold text-gray-900">€{data.revenueThisYear.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Revenue by Booking Type Chart */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-6 text-lg font-semibold text-gray-800">Revenue by Booking Type</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data.revenueByBookingType}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="bookingType" />
                <YAxis />
                <Tooltip cursor={{ fill: "#f3f4f6" }} />
                <Bar dataKey="totalRevenue" fill="#10b981" radius={[4, 4, 0, 0]} name="Revenue (€)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue by Vehicle Category Chart */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-6 text-lg font-semibold text-gray-800">Revenue by Vehicle Category</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.revenueByVehicleCategory}
                  dataKey="totalRevenue"
                  nameKey="vehicleCategoryName"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {data.revenueByVehicleCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
