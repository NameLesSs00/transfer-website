"use client";

import React, { useEffect, useState } from "react";
import { getReportsVehicles, ReportVehicles } from "@/lib/api/reportsApi";
import { Loader2 } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export function VehiclesReportTab() {
  const [topN, setTopN] = useState<number>(10);
  const [data, setData] = useState<ReportVehicles | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await getReportsVehicles(topN);
        if (res.success) {
          setData(res.data);
        } else {
          setError(res.message || "Failed to load vehicles data.");
        }
      } catch (err: any) {
        setError(err.message || "An error occurred.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [topN]);

  return (
    <div className="flex flex-col gap-8">
      {/* Filters */}
      <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <label htmlFor="topN" className="text-sm font-medium text-gray-700">
          Top N Vehicles:
        </label>
        <input
          id="topN"
          type="number"
          min="1"
          max="100"
          value={topN}
          onChange={(e) => setTopN(Number(e.target.value) || 10)}
          className="w-24 rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:border-transfer-green focus:outline-none focus:ring-1 focus:ring-transfer-green"
        />
      </div>

      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-transfer-green" />
        </div>
      ) : error || !data ? (
        <div className="flex h-64 items-center justify-center text-red-500">
          {error || "No data available."}
        </div>
      ) : (
        <>
          {/* Charts */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-6 text-lg font-semibold text-gray-800">Most Booked Vehicles (Top {topN})</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data.mostBooked}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="vehicleName" />
                  <YAxis yAxisId="left" orientation="left" stroke="#3b82f6" />
                  <YAxis yAxisId="right" orientation="right" stroke="#10b981" />
                  <Tooltip cursor={{ fill: "#f3f4f6" }} />
                  <Legend />
                  <Bar
                    yAxisId="left"
                    dataKey="bookingCount"
                    fill="#3b82f6"
                    radius={[4, 4, 0, 0]}
                    name="Bookings"
                  />
                  <Bar
                    yAxisId="right"
                    dataKey="totalRevenue"
                    fill="#10b981"
                    radius={[4, 4, 0, 0]}
                    name="Revenue (€)"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Most Booked Table */}
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
              <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                <h3 className="text-lg font-semibold text-gray-800">Most Booked</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-transfer-dark">
                  <thead className="bg-white text-xs font-semibold uppercase text-transfer-gray">
                    <tr>
                      <th className="px-6 py-3">Vehicle</th>
                      <th className="px-6 py-3">Category</th>
                      <th className="px-6 py-3 text-right">Bookings</th>
                      <th className="px-6 py-3 text-right">Revenue</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {data.mostBooked.map((v) => (
                      <tr key={v.vehicleId} className="hover:bg-gray-50">
                        <td className="px-6 py-3">
                          <div className="font-medium">{v.vehicleName || "Unknown"}</div>
                          <div className="text-xs text-gray-500">{v.vehicleFactoryName}</div>
                        </td>
                        <td className="px-6 py-3">{v.vehicleCategoryName}</td>
                        <td className="px-6 py-3 text-right font-semibold">{v.bookingCount}</td>
                        <td className="px-6 py-3 text-right font-semibold text-transfer-green">
                          €{v.totalRevenue.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                    {data.mostBooked.length === 0 && (
                      <tr>
                        <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                          No vehicles found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Least Booked Table */}
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
              <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                <h3 className="text-lg font-semibold text-gray-800">Least Booked</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-transfer-dark">
                  <thead className="bg-white text-xs font-semibold uppercase text-transfer-gray">
                    <tr>
                      <th className="px-6 py-3">Vehicle</th>
                      <th className="px-6 py-3">Category</th>
                      <th className="px-6 py-3 text-right">Bookings</th>
                      <th className="px-6 py-3 text-right">Revenue</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {data.leastBooked.map((v) => (
                      <tr key={v.vehicleId} className="hover:bg-gray-50">
                        <td className="px-6 py-3">
                          <div className="font-medium">{v.vehicleName || "Unknown"}</div>
                          <div className="text-xs text-gray-500">{v.vehicleFactoryName}</div>
                        </td>
                        <td className="px-6 py-3">{v.vehicleCategoryName}</td>
                        <td className="px-6 py-3 text-right font-semibold">{v.bookingCount}</td>
                        <td className="px-6 py-3 text-right font-semibold text-transfer-green">
                          €{v.totalRevenue.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                    {data.leastBooked.length === 0 && (
                      <tr>
                        <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                          No vehicles found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
