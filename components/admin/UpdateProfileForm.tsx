"use client";

import { FormEvent, useState } from "react";
import { Loader2, ShieldCheck, UserCog } from "lucide-react";
import { saveAdminProfile } from "@/store/features/admins/adminsSlice";
import { UpdateAdminPayload } from "@/store/features/admins/adminsModels";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export function UpdateProfileForm() {
  const dispatch = useAppDispatch();
  const profile = useAppSelector((state) => state.auth.profile);
  const updateStatus = useAppSelector((state) => state.admins.updateStatus);
  const [form, setForm] = useState<UpdateAdminPayload>({
    userName: profile?.fullName ?? "",
    email: profile?.email ?? "",
    phoneNumber: "",
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void dispatch(saveAdminProfile(form));
  }

  return (
    <section className="rounded-xl border border-gray-100 bg-white p-5 shadow-[0_1px_8px_rgba(15,23,42,0.04)]">
      <div className="mb-5 flex items-center gap-3">
        <UserCog className="h-5 w-5 text-transfer-green" />
        <h2 className="text-lg font-bold text-transfer-dark">Update Admin Profile</h2>
      </div>
      <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-transfer-dark">User Name</span>
          <input
            value={form.userName}
            onChange={(event) =>
              setForm((current) => ({ ...current, userName: event.target.value }))
            }
            className="h-11 rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-transfer-green focus:ring-2 focus:ring-transfer-green/15"
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-transfer-dark">Email</span>
          <input
            type="email"
            value={form.email}
            onChange={(event) =>
              setForm((current) => ({ ...current, email: event.target.value }))
            }
            className="h-11 rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-transfer-green focus:ring-2 focus:ring-transfer-green/15"
          />
        </label>
        <label className="flex flex-col gap-2 md:col-span-2">
          <span className="text-sm font-semibold text-transfer-dark">Phone Number</span>
          <input
            value={form.phoneNumber}
            onChange={(event) =>
              setForm((current) => ({ ...current, phoneNumber: event.target.value }))
            }
            className="h-11 rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-transfer-green focus:ring-2 focus:ring-transfer-green/15"
          />
        </label>
        <button
          disabled={updateStatus === "loading"}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-transfer-green px-4 text-sm font-bold text-white hover:bg-[#3d8525] disabled:cursor-not-allowed disabled:opacity-60 md:col-span-2"
        >
          {updateStatus === "loading" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <ShieldCheck className="h-4 w-4" />
          )}
          Save Profile
        </button>
      </form>
    </section>
  );
}
