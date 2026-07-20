"use client";

import { Shield, Home } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SecurityContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order") || searchParams.get("id");

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-[#f8fafc] px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white p-8 text-center shadow-xl shadow-slate-200/50 border-t-4 border-[#3b82f6]">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-blue-50">
          <Shield className="h-12 w-12 text-blue-500" />
        </div>
        
        <h1 className="mt-8 text-3xl font-extrabold tracking-tight text-slate-900">
          Payment Processing
        </h1>
        
        <p className="mt-4 text-base leading-relaxed text-slate-600">
          Your payment is currently under review or requires further security verification from your bank. 
          We will notify you once the status is updated.
        </p>

        {orderId && (
          <div className="mt-6 flex flex-col items-center justify-center gap-1 rounded-xl bg-slate-50 py-4 border border-slate-100">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Reference Number</span>
            <span className="font-mono text-lg font-bold text-slate-800">#{orderId}</span>
          </div>
        )}

        <div className="mt-10 flex flex-col gap-3">
          <Link
            href="/"
            className="group flex w-full items-center justify-center gap-2 rounded-xl bg-transfer-dark px-6 py-4 text-base font-bold text-white transition-all hover:bg-slate-800 hover:shadow-lg"
          >
            <Home className="h-5 w-5" />
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function PaymentSecurityPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-[70vh] items-center justify-center bg-[#f8fafc]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
      </div>
    }>
      <SecurityContent />
    </Suspense>
  );
}
