"use client";

import { FormEvent, useState } from "react";
import { Loader2, Plus } from "lucide-react";
import {
  closeAddAdminModal,
  createAdmin,
  fetchAdmins,
} from "@/store/features/admins/adminsSlice";
import { AddAdminPayload } from "@/store/features/admins/adminsModels";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

const initialForm: AddAdminPayload = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

export function AddAdminModal() {
  const dispatch = useAppDispatch();
  const { addStatus, isAddAdminOpen, pageSize } = useAppSelector((state) => state.admins);
  const [form, setForm] = useState<AddAdminPayload>(initialForm);

  if (!isAddAdminOpen) return null;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const result = await dispatch(createAdmin(form));
    if (createAdmin.fulfilled.match(result)) {
      setForm(initialForm);
      void dispatch(fetchAdmins({ pageNumber: 1, pageSize }));
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-4">
      <section className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-[0_18px_70px_rgba(15,23,42,0.18)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-transfer-dark">Add Admin</h2>
            <p className="mt-1 text-sm font-medium text-[#667085]">
              Create a new admin account.
            </p>
          </div>
          <button
            onClick={() => dispatch(closeAddAdminModal())}
            className="rounded-lg px-3 py-1 text-sm font-bold text-[#667085] hover:bg-gray-100"
          >
            Close
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 grid gap-4 md:grid-cols-2">
          <input
            placeholder="First name"
            value={form.firstName}
            onChange={(event) =>
              setForm((current) => ({ ...current, firstName: event.target.value }))
            }
            className="h-11 rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-transfer-green focus:ring-2 focus:ring-transfer-green/15"
            required
          />
          <input
            placeholder="Last name"
            value={form.lastName}
            onChange={(event) =>
              setForm((current) => ({ ...current, lastName: event.target.value }))
            }
            className="h-11 rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-transfer-green focus:ring-2 focus:ring-transfer-green/15"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(event) =>
              setForm((current) => ({ ...current, email: event.target.value }))
            }
            className="h-11 rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-transfer-green focus:ring-2 focus:ring-transfer-green/15 md:col-span-2"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(event) =>
              setForm((current) => ({ ...current, password: event.target.value }))
            }
            className="h-11 rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-transfer-green focus:ring-2 focus:ring-transfer-green/15 md:col-span-2"
            required
          />
          <button
            disabled={addStatus === "loading"}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-transfer-green px-4 text-sm font-bold text-white hover:bg-[#ad743a] disabled:cursor-not-allowed disabled:opacity-60 md:col-span-2"
          >
            {addStatus === "loading" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Plus className="h-4 w-4" />
            )}
            Create Admin
          </button>
        </form>
      </section>
    </div>
  );
}
