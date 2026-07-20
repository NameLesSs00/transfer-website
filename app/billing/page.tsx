"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import {
  BadgeCheck,
  CalendarDays,
  Car,
  Clock,
  Lock,
  Plane,
  Shield,
  User,
  Loader2,
  AlertCircle,
  ArrowRightLeft,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";
import {
  setTripType,
  createBooking,
  initializePayment,
  clearError,
} from "@/store/features/bookings/bookingSlice";
import { buildVehicleImageUrl } from "@/components/admin/vehicles/vehicleDisplay";

const inputClass =
  "h-11 w-full rounded-lg border border-gray-200 bg-white px-4 text-sm text-transfer-dark shadow-[0_1px_2px_rgba(15,23,42,0.04)] outline-none transition-colors placeholder:text-gray-400 focus:border-transfer-green focus:ring-2 focus:ring-transfer-green/15 disabled:bg-gray-50 disabled:text-gray-500";

const labelClass = "text-sm font-medium text-[#5f6b7a]";

function RequiredMark() {
  return <span className="text-red-500">*</span>;
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className={labelClass}>
        {label} {required && <RequiredMark />}
      </span>
      {children}
    </label>
  );
}

function Section({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-gray-100 bg-white p-5 shadow-[0_1px_8px_rgba(15,23,42,0.04)] md:p-6">
      <div className="mb-6 flex items-center gap-3">
        <span className="flex h-7 w-7 items-center justify-center text-transfer-green">
          {icon}
        </span>
        <h2 className="text-xl font-bold text-transfer-dark md:text-2xl">{title}</h2>
      </div>
      {children}
    </section>
  );
}

export default function BillingPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const bookingState = useAppSelector((state) => state.booking);
  const {
    perJourneyId,
    journeySnapshot,
    tripType,
    basePrice,
    bookingStatus,
    paymentStatus,
    error,
  } = bookingState;

  // Form states
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [returnTime, setReturnTime] = useState("");
  const [passengarCount, setPassengarCount] = useState(1);
  const [agreedToTerms, setAgreedToTerms] = useState(true);

  // Redirect back if no journey selected (e.g. direct load of /billing)
  useEffect(() => {
    if (!perJourneyId) {
      router.push("/cities");
    }
  }, [perJourneyId, router]);

  if (!perJourneyId || !journeySnapshot) {
    return null; // Will redirect shortly
  }

  const finalPrice = basePrice ? (tripType === 2 ? basePrice * 2 : basePrice) : 0;
  const isLoading = bookingStatus === "loading" || paymentStatus === "loading";

  const handleToggleTripType = (type: 1 | 2) => {
    dispatch(setTripType(type));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(clearError());

    if (!agreedToTerms) {
      alert("Please agree to the Terms & Conditions.");
      return;
    }

    let depDateIso = "";
    if (departureDate && departureTime) {
      const d = new Date(`${departureDate}T${departureTime}`);
      if (!isNaN(d.getTime())) {
        depDateIso = d.toISOString();
      }
    } else {
      alert("Please provide departure date and time.");
      return;
    }

    let retDateIso = undefined;
    if (tripType === 2) {
      if (returnDate && returnTime) {
        const d = new Date(`${returnDate}T${returnTime}`);
        if (!isNaN(d.getTime())) {
          retDateIso = d.toISOString();
        }
      } else {
        alert("Please provide return date and time.");
        return;
      }
    }

    const payload = {
      customerName,
      customerEmail,
      customerPhoneNumber,
      bookingDate: new Date().toISOString(), // client UTC time
      departureDate: depDateIso,
      departureTime: `${departureTime}:00`, // HH:mm:ss
      returnDate: retDateIso,
      returnTime: tripType === 2 && returnTime ? `${returnTime}:00` : undefined,
      tripType,
      passengarCount,
      perJourneyId,
    };

    try {
      const bookingId = await dispatch(createBooking(payload)).unwrap();
      const paymentUrl = await dispatch(initializePayment(bookingId)).unwrap();
      window.location.href = paymentUrl;
    } catch (err) {
      console.error(err);
      // error is also handled in Redux and displayed below
    }
  };

  return (
    <div className="bg-white">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-4 rounded-2xl bg-white p-8 shadow-2xl">
            <Loader2 className="h-10 w-10 animate-spin text-transfer-green" />
            <p className="text-lg font-bold text-transfer-dark">Processing your booking...</p>
            <p className="text-sm text-gray-500">Please do not close this window.</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mx-auto grid w-full max-w-[1280px] gap-6 px-4 py-6 md:px-8 md:py-10 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-8 lg:px-10">
        
        {/* Booking Summary Sidebar */}
        <aside className="order-1 rounded-xl border border-gray-100 bg-white shadow-[0_1px_8px_rgba(15,23,42,0.04)] lg:sticky lg:top-[116px] lg:order-2 lg:self-start">
          <div className="p-5 md:p-6">
            <h2 className="text-xl font-bold text-transfer-dark md:text-2xl">Booking Summary</h2>

            <div className="relative mx-auto mt-8 h-[150px] w-full max-w-[330px] md:mt-12 md:h-[180px]">
              {journeySnapshot.imageUrl ? (
                <Image
                  src={buildVehicleImageUrl(journeySnapshot.imageUrl)}
                  alt={journeySnapshot.vehicleName}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 85vw, 360px"
                  priority
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gray-50 rounded-xl">
                  <Plane className="h-10 w-10 text-gray-300" />
                </div>
              )}
            </div>

            {journeySnapshot.vehicleCategoryName && (
              <span className="mt-4 inline-flex rounded bg-transfer-light-green px-3 py-1 text-xs font-bold text-transfer-green">
                {journeySnapshot.vehicleCategoryName}
              </span>
            )}

            <div className="mt-4 flex flex-col gap-2 border-b border-gray-100 pb-4">
              <strong className="text-lg text-transfer-dark">{journeySnapshot.vehicleName}</strong>
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-[#667085]">
                <span className="inline-flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Up to {journeySnapshot.vehicleCapacity} Passengers
                </span>
              </div>
              <div className="mt-2 text-sm text-gray-500">
                <p><strong>From:</strong> {journeySnapshot.fromLocation}</p>
                <p><strong>To:</strong> {journeySnapshot.toLocation}</p>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-4 text-sm text-[#667085]">
              <div className="flex justify-between gap-4">
                <span>Trip Type</span>
                <strong className="font-semibold text-transfer-dark">
                  {tripType === 1 ? "One-Way" : "Round-Trip"}
                </strong>
              </div>
              {basePrice !== null && (
                <div className="flex justify-between gap-4">
                  <span>Base Price (One-Way)</span>
                  <strong className="font-semibold text-transfer-dark">€{basePrice}</strong>
                </div>
              )}
              {tripType === 2 && basePrice !== null && (
                <div className="flex justify-between gap-4">
                  <span>Multiplier</span>
                  <strong className="font-semibold text-transfer-dark">x 2</strong>
                </div>
              )}
            </div>
          </div>

          <div className="border-t border-gray-100 bg-[#fbfcfd] p-5 md:p-6 rounded-b-xl">
            <div className="flex items-center justify-between gap-4">
              <span className="text-lg font-bold text-transfer-dark">Total</span>
              <strong className="text-3xl font-bold text-transfer-green">
                {basePrice !== null ? `€${finalPrice}` : "Calculating..."}
              </strong>
            </div>
            <div className="mt-5 flex items-start gap-3 rounded-lg bg-transfer-light-green p-4 text-transfer-green">
              <BadgeCheck className="mt-0.5 h-5 w-5 flex-shrink-0" />
              <div>
                <p className="text-sm font-bold">No Hidden Charges</p>
                <p className="text-xs font-medium text-transfer-green/75">
                  All taxes and fees are included
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Form Fields */}
        <div className="order-2 flex flex-col gap-6 lg:order-1">
          <header className="pt-2">
            <h1 className="text-2xl font-bold text-transfer-dark md:text-4xl">
              Complete Your Booking
            </h1>
            <p className="mt-2 max-w-3xl text-sm font-medium leading-relaxed text-[#667085] md:text-base">
              Your transfer is almost confirmed. Please fill in your details and complete the payment.
            </p>
          </header>

          {/* Contact Information */}
          <Section icon={<User className="h-6 w-6" />} title="Contact Information">
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Full Name" required>
                <input
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className={inputClass}
                  placeholder="Enter full name"
                />
              </Field>
              <Field label="Email Address" required>
                <input
                  required
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className={inputClass}
                  placeholder="Enter email address"
                />
              </Field>
              <Field label="Phone Number" required>
                <input
                  required
                  type="tel"
                  value={customerPhoneNumber}
                  onChange={(e) => setCustomerPhoneNumber(e.target.value)}
                  className={inputClass}
                  placeholder="e.g. +20 10 1234 5678"
                />
              </Field>
            </div>
          </Section>

          {/* Transfer Details */}
          <Section icon={<Car className="h-6 w-6" />} title="Transfer Details">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <span className={labelClass}>
                  Trip Type <RequiredMark />
                </span>
                <div className="grid gap-3 md:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => handleToggleTripType(1)}
                    className={`flex min-h-[78px] cursor-pointer items-center justify-center gap-3 rounded-lg border px-4 py-3 text-center transition-colors ${
                      tripType === 1
                        ? "border-transfer-green bg-transfer-light-green text-transfer-green"
                        : "border-gray-200 bg-white text-[#667085] hover:border-transfer-green/60 hover:bg-transfer-light-green"
                    }`}
                  >
                    <Plane className="h-5 w-5" />
                    <span>
                      <strong className="block text-base font-bold text-transfer-dark">One-Way</strong>
                      <span className="text-xs font-medium text-[#8a94a3]">Single journey</span>
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleToggleTripType(2)}
                    className={`flex min-h-[78px] cursor-pointer items-center justify-center gap-3 rounded-lg border px-4 py-3 text-center transition-colors ${
                      tripType === 2
                        ? "border-transfer-green bg-transfer-light-green text-transfer-green"
                        : "border-gray-200 bg-white text-[#667085] hover:border-transfer-green/60 hover:bg-transfer-light-green"
                    }`}
                  >
                    <ArrowRightLeft className="h-5 w-5" />
                    <span>
                      <strong className="block text-base font-bold text-transfer-dark">Round-Trip</strong>
                      <span className="text-xs font-medium text-[#8a94a3]">Return journey included</span>
                    </span>
                  </button>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2 mt-4">
                <Field label="Departure Date" required>
                  <div className="relative">
                    <CalendarDays className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#98a2b3]" />
                    <input
                      required
                      type="date"
                      value={departureDate}
                      onChange={(e) => setDepartureDate(e.target.value)}
                      className={`${inputClass} pl-11`}
                    />
                  </div>
                </Field>
                <Field label="Departure Time" required>
                  <div className="relative">
                    <Clock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#98a2b3]" />
                    <input
                      required
                      type="time"
                      value={departureTime}
                      onChange={(e) => setDepartureTime(e.target.value)}
                      className={`${inputClass} pl-11`}
                    />
                  </div>
                </Field>

                {tripType === 2 && (
                  <>
                    <Field label="Return Date" required>
                      <div className="relative">
                        <CalendarDays className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#98a2b3]" />
                        <input
                          required
                          type="date"
                          value={returnDate}
                          onChange={(e) => setReturnDate(e.target.value)}
                          className={`${inputClass} pl-11`}
                        />
                      </div>
                    </Field>
                    <Field label="Return Time" required>
                      <div className="relative">
                        <Clock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#98a2b3]" />
                        <input
                          required
                          type="time"
                          value={returnTime}
                          onChange={(e) => setReturnTime(e.target.value)}
                          className={`${inputClass} pl-11`}
                        />
                      </div>
                    </Field>
                  </>
                )}

                <Field label="Passengers No" required>
                  <input
                    required
                    type="number"
                    min="1"
                    max={journeySnapshot.vehicleCapacity}
                    value={passengarCount}
                    onChange={(e) => setPassengarCount(parseInt(e.target.value) || 1)}
                    className={inputClass}
                  />
                </Field>
              </div>
            </div>
          </Section>

          {/* Action Area */}
          <section className="flex flex-col gap-4 pt-4">
            {error && (
              <div className="flex items-center gap-3 rounded-lg bg-red-50 p-4 text-red-700">
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                <p className="text-sm font-medium">{error}</p>
              </div>
            )}

            <label className="flex items-start gap-3 text-sm font-medium text-[#667085]">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-gray-300 text-transfer-green accent-transfer-green"
              />
              <span>
                I have read and agree to the{" "}
                <a href="#" className="font-medium text-transfer-green">
                  Terms & Conditions
                </a>{" "}
                and{" "}
                <a href="#" className="font-medium text-transfer-green">
                  Privacy Policy
                </a>
              </span>
            </label>

            <button
              type="submit"
              disabled={isLoading || !basePrice}
              className="flex min-h-[68px] w-full flex-col items-center justify-center rounded-lg bg-transfer-dark px-6 py-4 text-center font-bold text-white transition-transform duration-200 hover:scale-[1.01] hover:bg-[#182634] active:scale-[0.99] disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed"
            >
              <span className="inline-flex items-center gap-3 text-lg">
                <Lock className="h-5 w-5" />
                Continue to Payment
              </span>
              <span className="text-sm font-medium text-white/80">Total: €{finalPrice}</span>
            </button>

            <p className="flex items-center justify-center gap-2 text-center text-sm font-medium text-[#8a94a3]">
              <Shield className="h-4 w-4 fill-transfer-green text-transfer-green" />
              Free cancellation up to 24 hours before your transfer
            </p>
          </section>

        </div>
      </form>
    </div>
  );
}
