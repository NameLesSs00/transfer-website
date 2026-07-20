"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Eye, Trash2, Calendar, User, Hash, Loader2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchAdminBookings,
  openViewBookingModal,
  openDeleteBookingConfirm,
} from "@/store/features/adminBookings/adminBookingsSlice";

const PAGE_SIZE = 10;

function formatDateTime(dateStr: string, timeStr?: string | null) {
  try {
    const d = new Date(dateStr);
    const datePart = d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    return timeStr ? `${datePart} ${timeStr}` : datePart;
  } catch {
    return dateStr;
  }
}

export function BookingsTable() {
  const dispatch = useAppDispatch();
  const { items, listStatus, totalPages, totalRecords } = useAppSelector(
    (state) => state.adminBookings
  );
  const [page, setPage] = useState(1);

  const load = useCallback(
    (p: number) => {
      void dispatch(fetchAdminBookings({ pageNumber: p, pageSize: PAGE_SIZE }));
    },
    [dispatch]
  );

  // Load page 1 on mount
  useEffect(() => {
    load(1);
  }, [load]);

  const handlePrev = () => {
    if (page <= 1) return;
    const next = page - 1;
    setPage(next);
    load(next);
  };

  const handleNext = () => {
    if (page >= totalPages) return;
    const next = page + 1;
    setPage(next);
    load(next);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm text-transfer-dark">
          <thead className="bg-gray-50 text-xs font-semibold uppercase text-transfer-gray">
            <tr>
              <th className="px-6 py-4">Code / Date</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Departure</th>
              <th className="px-6 py-4">Trip Type</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {listStatus === "loading" ? (
              <tr>
                <td colSpan={7} className="px-6 py-10 text-center text-transfer-gray">
                  <Loader2 className="mx-auto mb-2 h-5 w-5 animate-spin text-transfer-green" />
                  Loading bookings...
                </td>
              </tr>
            ) : items.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-transfer-gray">
                  No bookings found.
                </td>
              </tr>
            ) : (
              items.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1 font-mono font-medium text-transfer-green text-xs">
                        <Hash className="w-3 h-3" />
                        {booking.code || `ID: ${booking.id}`}
                      </div>
                      <span className="text-xs text-gray-500">
                        {formatDateTime(booking.bookingDate)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-0.5">
                      <span className="font-semibold text-transfer-dark flex items-center gap-1">
                        <User className="w-3 h-3 text-gray-400" />
                        {booking.customerName}
                      </span>
                      <span className="text-xs text-gray-500">{booking.customerPhoneNumber}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1 text-transfer-dark text-xs">
                      <Calendar className="w-3 h-3 text-gray-400" />
                      {formatDateTime(booking.departureDate, booking.departureTime)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
                      {booking.tripType}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        booking.status === "Confirmed"
                          ? "bg-green-100 text-green-700"
                          : booking.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-semibold text-transfer-dark">
                    €{booking.finalPrice.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => dispatch(openViewBookingModal(booking))}
                        className="rounded-lg p-2 text-blue-600 hover:bg-blue-50 transition-colors"
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => dispatch(openDeleteBookingConfirm(booking))}
                        className="rounded-lg p-2 text-red-600 hover:bg-red-50 transition-colors"
                        title="Delete Booking"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-sm text-transfer-gray">
          Showing{" "}
          <span className="font-semibold text-transfer-dark">{items.length}</span> of{" "}
          <span className="font-semibold text-transfer-dark">{totalRecords}</span> bookings
        </span>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrev}
            disabled={page <= 1 || listStatus === "loading"}
            className="h-9 rounded-lg border border-gray-200 bg-white px-4 text-sm font-semibold text-transfer-dark hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 transition-colors"
          >
            Previous
          </button>
          <span className="text-sm font-medium text-transfer-dark">
            Page {page} of {totalPages || 1}
          </span>
          <button
            onClick={handleNext}
            disabled={page >= totalPages || listStatus === "loading"}
            className="h-9 rounded-lg border border-gray-200 bg-white px-4 text-sm font-semibold text-transfer-dark hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
