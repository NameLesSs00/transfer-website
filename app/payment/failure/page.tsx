"use client";

import { XCircle, RefreshCcw, Home } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function FailureContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order") || searchParams.get("id");
  const errorMessage = searchParams.get("message");

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-[#f8fafc] px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white p-8 text-center shadow-xl shadow-slate-200/50 border-t-4 border-red-500">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-red-50">
          <XCircle className="h-12 w-12 text-red-500" />
        </div>
        
        <h1 className="mt-8 text-3xl font-extrabold tracking-tight text-slate-900">
          Payment Failed
        </h1>
        
        <p className="mt-4 text-base leading-relaxed text-slate-600">
          Unfortunately, we could not process your payment. 
          {errorMessage ? (
            <span className="mt-2 block font-medium text-red-600">{errorMessage}</span>
          ) : (
            " Please check your card details or try a different payment method."
          )}
        </p>

        {orderId && (
          <div className="mt-6 flex flex-col items-center justify-center gap-1 rounded-xl bg-slate-50 py-4 border border-slate-100">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Reference Number</span>
            <span className="font-mono text-lg font-bold text-slate-800">#{orderId}</span>
          </div>
        )}

        <div className="mt-10 flex flex-col gap-3">
          <Link
            href="/cities"
            className="group flex w-full items-center justify-center gap-2 rounded-xl bg-transfer-green px-6 py-4 text-base font-bold text-white transition-all hover:bg-transfer-green/90 hover:shadow-lg hover:shadow-transfer-green/20"
          >
            <RefreshCcw className="h-5 w-5" />
            Try Again
          </Link>
          <Link
            href="/"
            className="group flex w-full items-center justify-center gap-2 rounded-xl bg-slate-100 px-6 py-4 text-base font-bold text-slate-700 transition-all hover:bg-slate-200"
          >
            <Home className="h-5 w-5" />
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function PaymentFailurePage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-[70vh] items-center justify-center bg-[#f8fafc]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-red-500 border-t-transparent" />
      </div>
    }>
      <FailureContent />
    </Suspense>
  );
}
