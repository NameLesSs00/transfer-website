"use client";

import React from "react";
import { X, User, Phone, Mail, Calendar, MapPin, Hash, CheckCircle, Car } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { closeViewBookingModal } from "@/store/features/adminBookings/adminBookingsSlice";

export function BookingViewModal() {
  const dispatch = useAppDispatch();
  const { selectedBooking, isViewModalOpen } = useAppSelector((state) => state.adminBookings);

  if (!selectedBooking) return null;

  const b = selectedBooking;
  
  const formatDate = (dateStr: string, timeStr?: string | null) => {
    try {
      const d = new Date(dateStr);
      const datePart = d.toLocaleDateString(undefined, {
        year: 'numeric', month: 'long', day: 'numeric'
      });
      return timeStr ? `${datePart} at ${timeStr}` : datePart;
    } catch {
      return dateStr;
    }
  };

  return (
    <AnimatePresence>
      {isViewModalOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => dispatch(closeViewBookingModal())}
          />
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
          >
            <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl flex flex-col">
              
              {/* Header */}
              <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4 bg-gray-50/50 sticky top-0 z-10">
                <div>
                  <h3 className="text-xl font-bold text-transfer-dark flex items-center gap-2">
                    Booking Details
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider ${
                      b.status === "Confirmed" ? "bg-green-100 text-green-700" : 
                      b.status === "Pending" ? "bg-yellow-100 text-yellow-800" : "bg-gray-200 text-gray-800"
                    }`}>
                      {b.status}
                    </span>
                  </h3>
                  <p className="text-sm text-transfer-gray font-mono mt-1 flex items-center gap-1">
                    <Hash className="w-3 h-3" /> {b.code || `ID: ${b.id}`}
                  </p>
                </div>
                <button
                  onClick={() => dispatch(closeViewBookingModal())}
                  className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 flex flex-col gap-8">
                
                {/* 1. Customer Info */}
                <section>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-transfer-gray mb-4 border-b border-gray-100 pb-2">
                    Customer Information
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="flex flex-col gap-1">
                      <span className="flex items-center gap-2 text-sm text-gray-500"><User className="w-4 h-4" /> Name</span>
                      <span className="font-semibold text-transfer-dark">{b.customerName}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="flex items-center gap-2 text-sm text-gray-500"><Mail className="w-4 h-4" /> Email</span>
                      <span className="font-semibold text-transfer-dark">{b.customerEmail}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="flex items-center gap-2 text-sm text-gray-500"><Phone className="w-4 h-4" /> Phone</span>
                      <span className="font-semibold text-transfer-dark">{b.customerPhoneNumber}</span>
                    </div>
                  </div>
                </section>

                {/* 2. Journey Info */}
                <section>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-transfer-gray mb-4 border-b border-gray-100 pb-2 flex justify-between items-center">
                    Journey Details
                    <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-700">
                      {b.tripType} - {b.type}
                    </span>
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                    
                    <div className="flex flex-col gap-4">
                      {b.perJourney && (
                        <>
                          <div className="flex items-start gap-3">
                            <MapPin className="w-5 h-5 text-transfer-green mt-0.5 shrink-0" />
                            <div className="flex flex-col">
                              <span className="text-xs text-gray-500 font-medium">Pick up</span>
                              <span className="font-bold text-transfer-dark text-lg">{b.perJourney.fromLocation.name}</span>
                            </div>
                          </div>
                          
                          <div className="w-0.5 h-6 bg-gray-200 ml-2.5"></div>
                          
                          <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
                            <div className="flex flex-col">
                              <span className="text-xs text-gray-500 font-medium">Drop off</span>
                              <span className="font-bold text-transfer-dark text-lg">{b.perJourney.toLocation.name}</span>
                            </div>
                          </div>
                        </>
                      )}

                      {b.transferBookingDetails && (
                        <>
                          <div className="flex items-start gap-3">
                            <MapPin className="w-5 h-5 text-transfer-green mt-0.5 shrink-0" />
                            <div className="flex flex-col">
                              <span className="text-xs text-gray-500 font-medium">Pick up</span>
                              <span className="font-bold text-transfer-dark text-lg">{b.transferBookingDetails.from}</span>
                            </div>
                          </div>
                          <div className="w-0.5 h-6 bg-gray-200 ml-2.5"></div>
                          <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
                            <div className="flex flex-col">
                              <span className="text-xs text-gray-500 font-medium">Drop off</span>
                              <span className="font-bold text-transfer-dark text-lg">{b.transferBookingDetails.to}</span>
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    <div className="flex flex-col gap-4 justify-center">
                      <div className="flex flex-col gap-1">
                        <span className="flex items-center gap-2 text-sm text-gray-500"><Calendar className="w-4 h-4" /> Departure</span>
                        <span className="font-semibold text-transfer-dark">{formatDate(b.departureDate, b.departureTime)}</span>
                      </div>
                      
                      {b.tripType === "RoundTrip" && b.returnDate && (
                        <div className="flex flex-col gap-1">
                          <span className="flex items-center gap-2 text-sm text-gray-500"><Calendar className="w-4 h-4" /> Return</span>
                          <span className="font-semibold text-transfer-dark">{formatDate(b.returnDate, b.returnTime)}</span>
                        </div>
                      )}

                      <div className="flex flex-col gap-1">
                        <span className="flex items-center gap-2 text-sm text-gray-500"><User className="w-4 h-4" /> Passengers</span>
                        <span className="font-semibold text-transfer-dark">{b.passengarCount} Passengers</span>
                      </div>
                    </div>

                  </div>
                </section>

                {/* 3. Vehicle Info */}
                <section>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-transfer-gray mb-4 border-b border-gray-100 pb-2">
                    Vehicle Details
                  </h4>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gray-100 rounded-xl">
                      <Car className="w-6 h-6 text-transfer-dark" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-transfer-dark text-lg">
                        {b.perJourney?.vehicle?.name || b.transferBookingDetails?.vehicleCategoryName || "N/A"}
                      </span>
                      {b.perJourney?.vehicle && (
                        <span className="text-sm text-gray-500">
                          {b.perJourney.vehicle.model} • Capacity: {b.perJourney.vehicle.capacity} • {b.perJourney.vehicle.licensePlate}
                        </span>
                      )}
                    </div>
                  </div>
                </section>

                {/* 4. Pricing Info */}
                <section className="bg-transfer-dark rounded-2xl p-6 text-white flex flex-col sm:flex-row justify-between items-center gap-4 shadow-xl">
                  <div className="flex flex-col gap-1">
                    <span className="text-gray-400 text-sm">Booking Date: {formatDate(b.bookingDate)}</span>
                    <span className="text-sm">Original Price: €{b.originalPrice.toFixed(2)}</span>
                    {b.discountAmount > 0 && (
                      <span className="text-transfer-green font-medium text-sm">Discount: €{b.discountAmount.toFixed(2)} ({b.discountPercentage}%)</span>
                    )}
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-sm text-gray-400 uppercase tracking-widest font-semibold mb-1">Total Paid</span>
                    <span className="text-4xl font-bold text-transfer-green">€{b.finalPrice.toFixed(2)}</span>
                  </div>
                </section>

              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
