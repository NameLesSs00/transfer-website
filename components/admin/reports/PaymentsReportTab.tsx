"use client";

import React, { useEffect, useState, useCallback } from "react";
import { getReportsPayments, ReportPayment, PaginatedResponse } from "@/lib/api/reportsApi";
import { Loader2, Filter } from "lucide-react";
import { format } from "date-fns";

export function PaymentsReportTab() {
  const [data, setData] = useState<PaginatedResponse<ReportPayment> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination & Filters
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(10);
  const [status, setStatus] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const params = {
        PageNumber: pageNumber,
        PageSize: pageSize,
        Status: status,
        DateFrom: dateFrom ? new Date(dateFrom).toISOString() : undefined,
        DateTo: dateTo ? new Date(dateTo).toISOString() : undefined,
      };

      const res = await getReportsPayments(params);
      if (res.success) {
        setData(res as unknown as PaginatedResponse<ReportPayment>);
      } else {
        setError(res.message || "Failed to load payments.");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  }, [pageNumber, pageSize, status, dateFrom, dateTo]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPageNumber(1);
    fetchData();
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "N/A";
    try {
      const d = new Date(dateStr);
      return format(d, "MMM dd, yyyy HH:mm");
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Filters Form */}
      <form
        onSubmit={handleFilterSubmit}
        className="grid grid-cols-1 gap-4 rounded-xl border border-gray-200 bg-gray-50 p-6 sm:grid-cols-3 lg:grid-cols-4"
      >
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-600 uppercase">Payment Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-transfer-green focus:outline-none focus:ring-1 focus:ring-transfer-green bg-white"
          >
            <option value="">All Statuses</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
            <option value="Refunded">Refunded</option>
          </select>
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

        <div className="flex items-end sm:col-span-3 lg:col-span-1">
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-transfer-green px-6 py-2 font-semibold text-white hover:bg-green-600 transition-colors"
          >
            <Filter className="h-4 w-4" />
            Apply
          </button>
        </div>
      </form>

      {/* Data Table */}
      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm text-transfer-dark">
          <thead className="bg-gray-50 text-xs font-semibold uppercase text-transfer-gray">
            <tr>
              <th className="px-6 py-4">Reference</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Amount</th>
              <th className="px-6 py-4">Paid At</th>
              <th className="px-6 py-4">Booking Type</th>
              <th className="px-6 py-4">Customer</th>
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
                  No payments found for the selected filters.
                </td>
              </tr>
            ) : (
              data?.data.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-gray-600">
                    {p.paymentReference || p.transactionId || "N/A"}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        p.status === "Paid"
                          ? "bg-green-100 text-green-700"
                          : p.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : p.status === "Refunded"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-semibold text-gray-900">
                    €{p.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{formatDate(p.paidAt)}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700">
                      {p.bookingType}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {p.customerName}
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
