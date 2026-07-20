"use client";

import React from "react";
import { AlertTriangle } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  closeDeleteBookingConfirm,
  removeAdminBooking,
} from "@/store/features/adminBookings/adminBookingsSlice";
import { Button } from "@/components/ui/Button";

export function BookingDeleteConfirm() {
  const dispatch = useAppDispatch();
  const { bookingPendingDelete, isDeleteConfirmOpen, deleteStatus } = useAppSelector(
    (state) => state.adminBookings
  );

  if (!isDeleteConfirmOpen || !bookingPendingDelete) return null;

  const handleDelete = () => {
    dispatch(removeAdminBooking(bookingPendingDelete.id));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
        onClick={() => dispatch(closeDeleteBookingConfirm())}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl flex flex-col items-center text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
          <AlertTriangle className="h-8 w-8 text-red-600" />
        </div>
        
        <h3 className="mb-2 text-xl font-bold text-transfer-dark">Delete Booking?</h3>
        
        <p className="mb-6 text-sm text-transfer-gray">
          Are you sure you want to delete the booking for{" "}
          <span className="font-semibold text-transfer-dark">{bookingPendingDelete.customerName}</span>?
          <br/>
          This action cannot be undone.
        </p>

        <div className="flex w-full gap-3">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => dispatch(closeDeleteBookingConfirm())}
            disabled={deleteStatus === "loading"}
          >
            Cancel
          </Button>
          <Button
            className="flex-1 bg-red-600 text-white hover:bg-red-700 hover:text-white border-transparent"
            onClick={handleDelete}
            disabled={deleteStatus === "loading"}
          >
            {deleteStatus === "loading" ? "Deleting..." : "Delete Booking"}
          </Button>
        </div>
      </div>
    </div>
  );
}
