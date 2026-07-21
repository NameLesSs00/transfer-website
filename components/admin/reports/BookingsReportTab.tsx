"use client";

import React, { useEffect, useState, useCallback } from "react";
import { getReportsBookings, ReportBooking, PaginatedResponse } from "@/lib/api/reportsApi";
import { Loader2, Search, Filter } from "lucide-react";
import { format } from "date-fns";

export function BookingsReportTab() {
  const [data, setData] = useState<PaginatedResponse<ReportBooking> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination & Filters
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [status, setStatus] = useState("");
  const [bookingType, setBookingType] = useState("");
  const [tripType, setTripType] = useState("");

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const params = {
        PageNumber: pageNumber,
        PageSize: pageSize,
        Search: search,
        DateFrom: dateFrom ? new Date(dateFrom).toISOString() : undefined,
        DateTo: dateTo ? new Date(dateTo).toISOString() : undefined,
        Status: status,
        BookingType: bookingType,
        TripType: tripType,
      };

      const res = await getReportsBookings(params);
      if (res.success) {
        setData(res as unknown as PaginatedResponse<ReportBooking>);
      } else {
        setError(res.message || "Failed to load bookings.");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  }, [pageNumber, pageSize, search, dateFrom, dateTo, status, bookingType, tripType]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPageNumber(1); // Reset to page 1 on filter change
    fetchData();
  };

  const formatDate = (dateStr: string, timeStr?: string | null) => {
    try {
      const d = new Date(dateStr);
      const formattedDate = format(d, "MMM dd, yyyy");
      return timeStr ? `${formattedDate} ${timeStr}` : formattedDate;
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Filters Form */}
      <form
        onSubmit={handleFilterSubmit}
        className="grid grid-cols-1 gap-4 rounded-xl border border-gray-200 bg-gray-50 p-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-600 uppercase">Search</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search customers..."
              className="w-full rounded-lg border border-gray-300 py-2 pl-9 pr-3 text-sm focus:border-transfer-green focus:outline-none focus:ring-1 focus:ring-transfer-green"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-600 uppercase">Date From</label>
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-transfer-green focus:outline-none focus:ring-1 focus:ring-transfer-green"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-600 uppercase">Date To</label>
          <input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-transfer-green focus:outline-none focus:ring-1 focus:ring-transfer-green"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-600 uppercase">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-transfer-green focus:outline-none focus:ring-1 focus:ring-transfer-green bg-white"
          >
            <option value="">All Statuses</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Pending">Pending</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-600 uppercase">Booking Type</label>
          <select
            value={bookingType}
            onChange={(e) => setBookingType(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-transfer-green focus:outline-none focus:ring-1 focus:ring-transfer-green bg-white"
          >
            <option value="">All Types</option>
            <option value="Transfer">Transfer</option>
            <option value="PerJourney">Per Journey</option>
            <option value="Hour">Hour</option>
          </select>
        </div>
        
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-600 uppercase">Trip Type</label>
          <select
            value={tripType}
            onChange={(e) => setTripType(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-transfer-green focus:outline-none focus:ring-1 focus:ring-transfer-green bg-white"
          >
            <option value="">All</option>
            <option value="OneWay">One Way</option>
            <option value="Return">Return</option>
          </select>
        </div>

        <div className="lg:col-span-2 flex items-end">
          <button
            type="submit"
            className="flex items-center gap-2 rounded-lg bg-transfer-green px-6 py-2 font-semibold text-white hover:bg-green-600 transition-colors"
          >
            <Filter className="h-4 w-4" />
            Apply Filters
          </button>
        </div>
      </form>

      {/* Data Table */}
      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm text-transfer-dark">
          <thead className="bg-gray-50 text-xs font-semibold uppercase text-transfer-gray">
            <tr>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Booking Date</th>
              <th className="px-6 py-4">Departure</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Price</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading && !data ? (
              <tr>
                <td colSpan={6} className="px-6 py-10 text-center">
                  <Loader2 className="mx-auto mb-2 h-6 w-6 animate-spin text-transfer-green" />
                  Loading...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={6} className="px-6 py-10 text-center text-red-500">
                  {error}
                </td>
              </tr>
            ) : data?.data && data.data.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                  No bookings found for the selected filters.
                </td>
              </tr>
            ) : (
              data?.data.map((b) => (
                <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-gray-900">{b.customerName}</div>
                    <div className="text-xs text-gray-500">{b.customerPhoneNumber}</div>
                  </td>
                  <td className="px-6 py-4">{formatDate(b.bookingDate)}</td>
                  <td className="px-6 py-4">{formatDate(b.departureDate, b.departureTime)}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                      {b.bookingType} - {b.tripType}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        b.status === "Confirmed"
                          ? "bg-green-100 text-green-700"
                          : b.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {b.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-semibold">
                    €{b.finalPrice.toFixed(2)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {data && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-sm text-transfer-gray">
            Showing <span className="font-semibold text-transfer-dark">{data.data.length}</span> of{" "}
            <span className="font-semibold text-transfer-dark">{data.totalRecords}</span> results
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
              disabled={pageNumber <= 1 || loading}
              className="h-9 rounded-lg border border-gray-200 bg-white px-4 text-sm font-semibold text-transfer-dark hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>
            <span className="text-sm font-medium text-transfer-dark">
              Page {data.pageNumber} of {data.totalPages || 1}
            </span>
            <button
              onClick={() => setPageNumber((p) => p + 1)}
              disabled={pageNumber >= data.totalPages || loading}
              className="h-9 rounded-lg border border-gray-200 bg-white px-4 text-sm font-semibold text-transfer-dark hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
