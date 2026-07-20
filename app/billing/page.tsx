"use client";

import Image from "next/image";
import { useState } from "react";
import {
  BadgeCheck,
  BriefcaseBusiness,
  CalendarDays,
  Car,
  Clock,
  CreditCard,
  Hotel,
  Lock,
  Plane,
  Shield,
  User,
} from "lucide-react";

const inputClass =
  "h-11 w-full rounded-lg border border-gray-200 bg-white px-4 text-sm text-transfer-dark shadow-[0_1px_2px_rgba(15,23,42,0.04)] outline-none transition-colors placeholder:text-gray-400 focus:border-transfer-green focus:ring-2 focus:ring-transfer-green/15";

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

function PhoneField({ required }: { required?: boolean }) {
  return (
    <div className="flex h-11 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)] focus-within:border-transfer-green focus-within:ring-2 focus-within:ring-transfer-green/15">
      <select
        aria-label={required ? "Phone country code" : "WhatsApp country code"}
        defaultValue="+20"
        className="w-[88px] border-r border-gray-200 bg-white px-3 text-sm text-[#667085] outline-none"
      >
        <option value="+20">🇪🇬 +20</option>
      </select>
      <input
        type="tel"
        placeholder="10 1234 5678"
        className="min-w-0 flex-1 px-4 text-sm text-transfer-dark outline-none placeholder:text-gray-400"
      />
    </div>
  );
}

function PhoneNumberField() {
  return (
    <div className="flex h-11 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)] focus-within:border-transfer-green focus-within:ring-2 focus-within:ring-transfer-green/15">
      <span className="flex w-[88px] items-center border-r border-gray-200 bg-white px-3 text-sm text-[#667085]">
        🇪🇬 +20
      </span>
      <input
        type="tel"
        placeholder="10 1234 5678"
        className="min-w-0 flex-1 px-4 text-sm text-transfer-dark outline-none placeholder:text-gray-400"
      />
    </div>
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

function BookingSummary() {
  return (
    <aside className="order-1 rounded-xl border border-gray-100 bg-white shadow-[0_1px_8px_rgba(15,23,42,0.04)] lg:sticky lg:top-[116px] lg:order-2 lg:self-start">
      <div className="p-5 md:p-6">
        <h2 className="text-xl font-bold text-transfer-dark md:text-2xl">Booking Summary</h2>

        <div className="relative mx-auto mt-8 h-[150px] w-full max-w-[330px] md:mt-12 md:h-[180px]">
          <Image
            src="/Hompage/blackCar.png"
            alt="Private limousine"
            fill
            className="object-contain"
            sizes="(max-width: 1024px) 85vw, 360px"
            priority
          />
        </div>

        <span className="mt-4 inline-flex rounded bg-transfer-light-green px-3 py-1 text-xs font-bold text-transfer-green">
          Private Limousine
        </span>

        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 border-b border-gray-100 pb-4 text-sm font-medium text-[#667085]">
          <span className="inline-flex items-center gap-2">
            <User className="h-4 w-4" />
            Up to 3 Passengers
          </span>
          <span className="inline-flex items-center gap-2">
            <BriefcaseBusiness className="h-4 w-4" />
            3 Luggage
          </span>
        </div>

        <div className="mt-6 flex flex-col gap-4 text-sm text-[#667085]">
          <div className="flex justify-between gap-4">
            <span>Price per person</span>
            <strong className="font-semibold text-transfer-dark">$10.00</strong>
          </div>
          <div className="flex justify-between gap-4">
            <span>Passengers</span>
            <strong className="font-semibold text-transfer-dark">2</strong>
          </div>
          <div className="flex justify-between gap-4">
            <span>Subtotal</span>
            <strong className="font-semibold text-transfer-dark">$20.00</strong>
          </div>
          <div className="flex justify-between gap-4">
            <span>Service Fee</span>
            <strong className="font-semibold text-transfer-dark">$0.00</strong>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-100 bg-[#fbfcfd] p-5 md:p-6">
        <div className="flex items-center justify-between gap-4">
          <span className="text-lg font-bold text-transfer-dark">Total</span>
          <strong className="text-3xl font-bold text-transfer-green">$20.00</strong>
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
  );
}

function ContactInformation() {
  return (
    <Section icon={<User className="h-6 w-6" />} title="Contact Information">
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Full Name" required>
          <input className={inputClass} placeholder="Enter full name" />
        </Field>
        <Field label="Email Address" required>
          <input className={inputClass} type="email" placeholder="Enter email address" />
        </Field>
        <Field label="Phone Number" required>
          <PhoneNumberField />
        </Field>
        <Field label="WhatsApp Number">
          <PhoneField />
        </Field>
      </div>
      <label className="mt-4 flex items-center gap-3 text-sm font-medium text-[#667085]">
        <input
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 text-transfer-green accent-transfer-green"
        />
        Receive booking updates on WhatsApp
      </label>
    </Section>
  );
}

function TransferDetails() {
  const [transferType, setTransferType] = useState<"arrival" | "departure">("arrival");
  const isArrival = transferType === "arrival";

  const selectedTransferClass =
    "border-transfer-green bg-transfer-light-green text-transfer-green";
  const unselectedTransferClass =
    "border-gray-200 bg-white text-[#667085] hover:border-transfer-green/60 hover:bg-transfer-light-green";

  return (
    <Section icon={<Car className="h-6 w-6" />} title="Transfer Details">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <span className={labelClass}>
            Transfer Type <RequiredMark />
          </span>
          <div className="grid gap-3 md:grid-cols-2">
            <button
              type="button"
              onClick={() => setTransferType("arrival")}
              aria-pressed={isArrival}
              className={`flex min-h-[78px] cursor-pointer items-center justify-center gap-3 rounded-lg border px-4 py-3 text-center transition-colors ${
                isArrival ? selectedTransferClass : unselectedTransferClass
              }`}
            >
              <Plane className="h-5 w-5" />
              <span>
                <strong className="block text-base font-bold text-transfer-dark">
                  Airport → Hotel
                </strong>
                <span className="text-xs font-medium text-[#8a94a3]">You are arriving</span>
              </span>
            </button>
            <button
              type="button"
              onClick={() => setTransferType("departure")}
              aria-pressed={!isArrival}
              className={`flex min-h-[78px] cursor-pointer items-center justify-center gap-3 rounded-lg border px-4 py-3 text-center transition-colors ${
                !isArrival ? selectedTransferClass : unselectedTransferClass
              }`}
            >
              <Plane className="h-5 w-5 rotate-180" />
              <span>
                <strong className="block text-base font-bold text-transfer-dark">
                  Hotel → Airport
                </strong>
                <span className="text-xs font-medium text-[#8a94a3]">You are departing</span>
              </span>
            </button>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <Field label={isArrival ? "Arrival Airport" : "Departure Airport"}>
            <div className="relative">
              <Plane className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#98a2b3]" />
              <input
                className={`${inputClass} bg-gray-50 pl-11`}
                defaultValue="Hurghada Airport (HRG)"
                readOnly
              />
            </div>
          </Field>
          <Field label="Hotel / Resort" required>
            <div className="relative">
              <Hotel className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#98a2b3]" />
              <input className={`${inputClass} pl-11`} placeholder="Search your hotel / resort..." />
            </div>
          </Field>
          <Field label={isArrival ? "Arrival Date" : "Departure Date"} required>
            <div className="relative">
              <CalendarDays className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#98a2b3]" />
              <input className={`${inputClass} pl-11`} defaultValue="20 May 2025" />
            </div>
          </Field>
          <Field label={isArrival ? "Arrival Time" : "Departure Time"} required>
            <div className="relative">
              <Clock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#98a2b3]" />
              <input className={`${inputClass} pl-11`} defaultValue="10:00 AM" />
            </div>
          </Field>
          <Field label="Passengers No" required>
            <input className={inputClass} defaultValue="2" />
          </Field>
          <Field label="Luggage">
            <input className={inputClass} defaultValue="2" />
          </Field>
        </div>
      </div>
    </Section>
  );
}

function PaymentMethod() {
  return (
    <Section icon={<CreditCard className="h-6 w-6" />} title="Payment Method">
      <div className="flex flex-col gap-5">
        <div className="grid gap-3">
          <label className="flex min-h-[72px] cursor-pointer items-center justify-between gap-4 rounded-lg border border-transfer-green bg-transfer-light-green px-4 py-3">
            <span className="flex items-center gap-4">
              <span className="flex h-5 w-5 items-center justify-center rounded-full border-[6px] border-transfer-green" />
              <span>
                <strong className="block text-sm font-bold text-transfer-dark">Pay Now Online</strong>
                <span className="text-xs font-medium text-[#8a94a3]">
                  Secure payment by card
                </span>
              </span>
            </span>
            <span className="flex items-center gap-3">
              <Image src="/logos_mastercard.png" alt="Mastercard" width={36} height={24} />
              <Image src="/logos_visaelectron.png" alt="Visa" width={48} height={20} />
            </span>
          </label>

          <label className="flex min-h-[72px] cursor-pointer items-center justify-between gap-4 rounded-lg border border-gray-200 bg-white px-4 py-3">
            <span className="flex items-center gap-4">
              <span className="h-5 w-5 rounded-full border border-gray-300" />
              <span>
                <strong className="block text-sm font-bold text-transfer-dark">Pay Later</strong>
                <span className="text-xs font-medium text-[#8a94a3]">
                  Pay in cash to the driver
                </span>
              </span>
            </span>
            <CreditCard className="h-6 w-6 text-transfer-green" />
          </label>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Card holder name">
            <input className={inputClass} placeholder="Enter Your First Name..." />
          </Field>
          <Field label="Card number">
            <input className={inputClass} placeholder="Enter Your Card Number..." />
          </Field>
          <Field label="CVV">
            <input className={inputClass} placeholder="Example: 4567" />
          </Field>
          <Field label="Expiration Date">
            <input className={inputClass} placeholder="MM/YY" />
          </Field>
        </div>

        <div className="flex items-start gap-4 rounded-lg bg-transfer-light-green p-4">
          <Shield className="mt-0.5 h-5 w-5 flex-shrink-0 fill-transfer-green text-transfer-green" />
          <div>
            <p className="font-bold text-transfer-dark">Your payment is secure and encrypted</p>
            <p className="mt-1 text-sm font-medium text-[#667085]">
              We use industry-standard encryption to protect your information.
            </p>
          </div>
        </div>

        <label className="flex items-start gap-3 text-sm font-medium text-[#667085]">
          <input
            type="checkbox"
            defaultChecked
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

        <button className="flex min-h-[68px] w-full flex-col items-center justify-center rounded-lg bg-transfer-dark px-6 py-4 text-center font-bold text-white transition-transform duration-200 hover:scale-[1.01] hover:bg-[#182634] active:scale-[0.99]">
          <span className="inline-flex items-center gap-3 text-lg">
            <Lock className="h-5 w-5" />
            Pay Now & Confirm Booking
          </span>
          <span className="text-sm font-medium text-white/80">Total: $20.00</span>
        </button>

        <p className="flex items-center justify-center gap-2 text-center text-sm font-medium text-[#8a94a3]">
          <Shield className="h-4 w-4 fill-transfer-green text-transfer-green" />
          Free cancellation up to 24 hours before your transfer
        </p>
      </div>
    </Section>
  );
}

export default function BillingPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto grid w-full max-w-[1280px] gap-6 px-4 py-6 md:px-8 md:py-10 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-8 lg:px-10">
        <BookingSummary />

        <div className="order-2 flex flex-col gap-6 lg:order-1">
          <header className="pt-2">
            <h1 className="text-2xl font-bold text-transfer-dark md:text-4xl">
              Complete Your Booking
            </h1>
            <p className="mt-2 max-w-3xl text-sm font-medium leading-relaxed text-[#667085] md:text-base">
              Your transfer is almost confirmed. Please fill in your details and complete the payment.
            </p>
          </header>

          <ContactInformation />
          <TransferDetails />
          <PaymentMethod />
        </div>
      </div>
    </div>
  );
}
