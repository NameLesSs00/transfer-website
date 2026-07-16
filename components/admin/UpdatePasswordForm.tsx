"use client";

import { FormEvent, useState } from "react";
import { KeyRound, Loader2 } from "lucide-react";
import { updateAdminPassword } from "@/store/features/auth/authSlice";
import { UpdatePasswordPayload } from "@/store/features/auth/authModels";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

const initialForm: UpdatePasswordPayload = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export function UpdatePasswordForm() {
  const dispatch = useAppDispatch();
  const updateStatus = useAppSelector((state) => state.auth.updatePasswordStatus);
  const [form, setForm] = useState<UpdatePasswordPayload>(initialForm);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const result = await dispatch(updateAdminPassword(form));
    if (updateAdminPassword.fulfilled.match(result)) {
      setForm(initialForm);
    }
  }

  return (
    <section className="rounded-xl border border-gray-100 bg-white p-5 shadow-[0_1px_8px_rgba(15,23,42,0.04)]">
      <div className="mb-5 flex items-center gap-3">
        <KeyRound className="h-5 w-5 text-transfer-green" />
        <h2 className="text-lg font-bold text-transfer-dark">Update Password</h2>
      </div>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input
          type="password"
          placeholder="Old password"
          value={form.oldPassword}
          onChange={(event) =>
            setForm((current) => ({ ...current, oldPassword: event.target.value }))
          }
          className="h-11 rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-transfer-green focus:ring-2 focus:ring-transfer-green/15"
          required
        />
        <input
          type="password"
          placeholder="New password"
          value={form.newPassword}
          onChange={(event) =>
            setForm((current) => ({ ...current, newPassword: event.target.value }))
          }
          className="h-11 rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-transfer-green focus:ring-2 focus:ring-transfer-green/15"
          required
        />
        <input
          type="password"
          placeholder="Confirm password"
          value={form.confirmPassword}
          onChange={(event) =>
            setForm((current) => ({ ...current, confirmPassword: event.target.value }))
          }
          className="h-11 rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-transfer-green focus:ring-2 focus:ring-transfer-green/15"
          required
        />
        <button
          disabled={updateStatus === "loading"}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-transfer-green px-4 text-sm font-bold text-white hover:bg-[#3d8525] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {updateStatus === "loading" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <KeyRound className="h-4 w-4" />
          )}
          Update Password
        </button>
      </form>
    </section>
  );
}
