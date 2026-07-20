"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { apiRequest, ApiResponse } from "@/lib/apiClient";
import {
  CheckCircle2,
  Home,
  MapPin,
  CalendarDays,
  Users,
  Car,
  ArrowRight,
  Tag,
  ChevronLeft,
  Loader2,
  XCircle,
} from "lucide-react";
import { motion } from "framer-motion";

type BookingData = {
  id: number;
  customerName: string;
  customerEmail: string;
  code: string;
  customerPhoneNumber: string;
  bookingDate: string;
  departureDate: string;
  departureTime: string;
  returnDate: string | null;
  returnTime: string | null;
  passengarCount: number;
  status: string;
  type: string;
  tripType: string;
  perJourneyId: number | null;
  perJourney: {
    fromLocation: { id: number; name: string };
    toLocation: { id: number; name: string };
    vehicle: {
      name: string;
      model: string;
      year: number;
      capacity: number;
      imageUrl: string;
      vehicleCategoryName: string;
    };
    price: number;
  } | null;
  transferBookingDetails: {
    vehicleCategoryName: string;
    from: string;
    to: string;
  } | null;
  originalPrice: number;
  discountPercentage: number;
  discountAmount: number;
  finalPrice: number;
};

const formatDate = (dateStr: string | null) => {
  if (!dateStr) return "N/A";
  try {
    return new Date(dateStr).toLocaleDateString("en-US", {
      weekday: "short",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
};

const statusColor = (status: string) => {
  const s = status?.toLowerCase();
  if (s === "confirmed") return "bg-green-100 text-green-700";
  if (s === "pending") return "bg-yellow-100 text-yellow-700";
  if (s === "cancelled") return "bg-red-100 text-red-700";
  return "bg-gray-100 text-gray-700";
};

export default function BookingDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const code = params?.code as string;

  const [booking, setBooking] = useState<BookingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!code) return;
    setLoading(true);
    apiRequest<ApiResponse<BookingData>>(`Bookings/${code}`)
      .then((res) => {
        if (res.success && res.data) {
          setBooking(res.data);
        } else {
          setError(res.message || "Booking not found.");
        }
      })
      .catch(() => setError("Could not fetch booking. Please try again."))
      .finally(() => setLoading(false));
  }, [code]);

  const fromLocation =
    booking?.perJourney?.fromLocation?.name ||
    booking?.transferBookingDetails?.from ||
    "N/A";
  const toLocation =
    booking?.perJourney?.toLocation?.name ||
    booking?.transferBookingDetails?.to ||
    "N/A";
  const vehicleName = booking?.perJourney?.vehicle?.name || "N/A";
  const vehicleModel = booking?.perJourney?.vehicle?.model || null;
  const vehicleCategory =
    booking?.perJourney?.vehicle?.vehicleCategoryName ||
    booking?.transferBookingDetails?.vehicleCategoryName ||
    null;
  const vehicleCapacity = booking?.perJourney?.vehicle?.capacity || null;

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8fafc]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-transfer-green" />
          <p className="text-sm text-gray-500">Loading booking details...</p>
        </div>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8fafc] px-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-xl shadow-slate-200/50">
          <XCircle className="mx-auto h-14 w-14 text-red-400" />
          <h1 className="mt-6 text-2xl font-bold text-slate-800">Booking Not Found</h1>
          <p className="mt-3 text-sm text-slate-500">
            {error || "We couldn't find a booking with that code. Please double-check and try again."}
          </p>
          <div className="mt-8 flex flex-col gap-3">
            <Link
              href="/"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-transfer-green px-6 py-3 text-sm font-bold text-white hover:bg-transfer-green/90 transition-all"
            >
              <Home className="h-4 w-4" />
              Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] py-10 px-4">
      <div className="mx-auto max-w-2xl">
        <button
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-1 text-sm text-transfer-gray hover:text-transfer-dark transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="overflow-hidden rounded-2xl bg-white shadow-xl shadow-slate-200/50"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-transfer-dark to-slate-700 px-6 py-6 text-white">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                  <CheckCircle2 className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-white/60">
                    Booking Reference
                  </p>
                  <p className="font-mono text-lg font-bold">{booking.code}</p>
                </div>
              </div>
              <span
                className={`mt-1 rounded-full px-3 py-1 text-xs font-bold ${statusColor(booking.status)}`}
              >
                {booking.status}
              </span>
            </div>
          </div>



          <div className="p-6 flex flex-col gap-6">
            {/* Route */}
            <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-4">
              <div className="flex flex-1 flex-col items-start gap-0.5">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">From</span>
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-transfer-green flex-shrink-0" />
                  <span className="font-semibold text-slate-800">{fromLocation}</span>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 flex-shrink-0 text-gray-300" />
              <div className="flex flex-1 flex-col items-end gap-0.5">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">To</span>
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-slate-800">{toLocation}</span>
                  <MapPin className="h-4 w-4 text-red-400 flex-shrink-0" />
                </div>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1 rounded-xl bg-slate-50 px-4 py-3">
                <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-gray-400">
                  <CalendarDays className="h-3 w-3" />
                  Departure
                </div>
                <span className="text-sm font-semibold text-slate-800">
                  {formatDate(booking.departureDate)}
                </span>
                {booking.departureTime && (
                  <span className="text-xs text-slate-500">at {booking.departureTime}</span>
                )}
              </div>

              <div className="flex flex-col gap-1 rounded-xl bg-slate-50 px-4 py-3">
                <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-gray-400">
                  <CalendarDays className="h-3 w-3" />
                  Return
                </div>
                <span className="text-sm font-semibold text-slate-800">
                  {booking.returnDate ? formatDate(booking.returnDate) : "One-Way"}
                </span>
                {booking.returnTime && (
                  <span className="text-xs text-slate-500">at {booking.returnTime}</span>
                )}
              </div>

              <div className="flex flex-col gap-1 rounded-xl bg-slate-50 px-4 py-3">
                <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-gray-400">
                  <Users className="h-3 w-3" />
                  Passengers
                </div>
                <span className="text-sm font-semibold text-slate-800">{booking.passengarCount}</span>
              </div>

              <div className="flex flex-col gap-1 rounded-xl bg-slate-50 px-4 py-3">
                <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-gray-400">
                  <Tag className="h-3 w-3" />
                  Trip Type
                </div>
                <span className="text-sm font-semibold text-slate-800">{booking.tripType}</span>
              </div>
            </div>

            {/* Vehicle Info */}
            <div className="rounded-xl border border-gray-100 px-4 py-4">
              <div className="flex items-center gap-2 mb-3">
                <Car className="h-4 w-4 text-transfer-green" />
                <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">Vehicle</span>
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-1.5 text-sm text-slate-800">
                <span>
                  <span className="text-gray-400">Name: </span>
                  <span className="font-semibold">{vehicleName}</span>
                </span>
                {vehicleModel && (
                  <span>
                    <span className="text-gray-400">Model: </span>
                    <span className="font-semibold">{vehicleModel}</span>
                  </span>
                )}
                {vehicleCategory && (
                  <span>
                    <span className="text-gray-400">Category: </span>
                    <span className="font-semibold">{vehicleCategory}</span>
                  </span>
                )}
                {vehicleCapacity && (
                  <span>
                    <span className="text-gray-400">Capacity: </span>
                    <span className="font-semibold">{vehicleCapacity} passengers</span>
                  </span>
                )}
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="rounded-xl border border-gray-100 px-4 py-4 flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">
                Price Breakdown
              </span>
              <div className="flex justify-between text-sm text-slate-600">
                <span>Original Price</span>
                <span className="font-medium">€{booking.originalPrice}</span>
              </div>
              {booking.discountPercentage > 0 && (
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Discount ({booking.discountPercentage}%)</span>
                  <span className="font-medium text-green-600">-€{booking.discountAmount}</span>
                </div>
              )}
              <div className="mt-2 flex justify-between border-t border-dashed border-gray-200 pt-3">
                <span className="font-bold text-slate-800">Total Paid</span>
                <span className="text-xl font-extrabold text-transfer-green">€{booking.finalPrice}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3">
              <Link
                href="/"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-transfer-green px-6 py-3.5 text-sm font-bold text-white transition-all hover:bg-transfer-green/90 hover:shadow-lg hover:shadow-transfer-green/20"
              >
                <Home className="h-4 w-4" />
                Return to Homepage
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
