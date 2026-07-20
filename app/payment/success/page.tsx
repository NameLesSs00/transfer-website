"use client";

import { CheckCircle2, Home, FileText } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code") || searchParams.get("order") || searchParams.get("id");

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-[#f8fafc] px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white p-8 text-center shadow-xl shadow-slate-200/50">
        {/* Success icon */}
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-50">
          <CheckCircle2 className="h-12 w-12 text-transfer-green" />
        </div>

        <h1 className="mt-8 text-3xl font-extrabold tracking-tight text-slate-900">
          Payment Successful
        </h1>

        <p className="mt-4 text-base leading-relaxed text-slate-600">
          Thank you! Your booking has been confirmed successfully. We have sent a receipt to your email address.
        </p>

        {/* Booking code badge */}
        {code && (
          <div className="mt-6 flex flex-col items-center gap-1 rounded-xl bg-slate-50 py-4 border border-slate-100">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Booking Reference
            </span>
            <span className="font-mono text-lg font-bold text-slate-800">{code}</span>
          </div>
        )}

        {/* Actions */}
        <div className="mt-8 flex flex-col gap-3">
          {code && (
            <Link
              href={`/booking/${code}`}
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-transfer-green px-6 py-4 text-base font-bold text-white transition-all hover:bg-transfer-green/90 hover:shadow-lg hover:shadow-transfer-green/20"
            >
              <FileText className="h-5 w-5" />
              View Booking Details
            </Link>
          )}
          <Link
            href="/"
            className="group flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-4 text-base font-bold text-slate-700 transition-all hover:bg-gray-50"
          >
            <Home className="h-5 w-5" />
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[70vh] items-center justify-center bg-[#f8fafc]">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-transfer-green border-t-transparent" />
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
