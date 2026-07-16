"use client";

import { useAppSelector } from "@/store/hooks";

export function AdminNotice() {
  const adminsError = useAppSelector((state) => state.admins.error);
  const adminsNotice = useAppSelector((state) => state.admins.notice);
  const authError = useAppSelector((state) => state.auth.error);
  const authNotice = useAppSelector((state) => state.auth.notice);
  const factoriesError = useAppSelector((state) => state.vehicleFactories.error);
  const factoriesNotice = useAppSelector((state) => state.vehicleFactories.notice);

  const error = adminsError || authError || factoriesError;
  const notice = adminsNotice || authNotice || factoriesNotice;
  const message = error || notice;

  if (!message) return null;

  return (
    <div
      className={`rounded-xl border px-4 py-3 text-sm font-semibold ${
        error
          ? "border-red-100 bg-red-50 text-red-700"
          : "border-green-100 bg-green-50 text-green-700"
      }`}
    >
      {message}
    </div>
  );
}
