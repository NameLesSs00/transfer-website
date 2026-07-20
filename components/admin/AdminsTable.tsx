"use client";

import { FormEvent, useState } from "react";
import { KeyRound, Loader2, Trash2, X } from "lucide-react";
import {
  fetchAdmins,
  removeAdmin,
} from "@/store/features/admins/adminsSlice";
import { AdminUser } from "@/store/features/admins/adminsModels";
import { updateAdminPassword } from "@/store/features/auth/authSlice";
import { UpdatePasswordPayload } from "@/store/features/auth/authModels";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  formatAdminDate,
  getDisplayEmail,
  getDisplayName,
  getDisplayRole,
} from "./adminDisplay";

const initialPasswordForm: UpdatePasswordPayload = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export function AdminsTable() {
  const dispatch = useAppDispatch();
  const {
    deletingAdminId,
    items,
    listStatus,
    pageNumber,
    pageSize,
    totalPages,
    totalRecords,
  } = useAppSelector((state) => state.admins);
  const currentAdminEmail = useAppSelector((state) => state.auth.profile?.email ?? "");
  const updatePasswordStatus = useAppSelector((state) => state.auth.updatePasswordStatus);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [adminPendingDelete, setAdminPendingDelete] = useState<AdminUser | null>(null);
  const [passwordForm, setPasswordForm] =
    useState<UpdatePasswordPayload>(initialPasswordForm);

  function openPasswordModal() {
    setIsPasswordModalOpen(true);
    setPasswordForm(initialPasswordForm);
  }

  async function handlePasswordSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const result = await dispatch(updateAdminPassword(passwordForm));
    if (updateAdminPassword.fulfilled.match(result)) {
      setIsPasswordModalOpen(false);
      setPasswordForm(initialPasswordForm);
    }
  }

  async function handleDeleteAdmin() {
    if (!adminPendingDelete) return;

    const result = await dispatch(
      removeAdmin({
        id: adminPendingDelete.id,
        email: getDisplayEmail(adminPendingDelete),
      })
    );

    if (removeAdmin.fulfilled.match(result)) {
      setAdminPendingDelete(null);
      void dispatch(fetchAdmins({ pageNumber, pageSize }));
    }
  }

  return (
    <section className="flex min-h-[calc(100vh-220px)] flex-col rounded-xl border border-gray-100 bg-white shadow-[0_1px_8px_rgba(15,23,42,0.04)]">
      <div className="flex flex-col gap-3 border-b border-gray-100 p-5 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-bold text-transfer-dark">Admin Accounts</h2>
          <p className="mt-1 text-sm font-medium text-[#667085]">
            {totalRecords} admin records
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto">
        <table className="w-full min-w-[960px] text-left">
          <thead className="bg-[#fbfaf8] text-xs font-bold uppercase tracking-[0.08em] text-[#667085]">
            <tr>
              <th className="px-5 py-4">Name</th>
              <th className="px-5 py-4">Email</th>
              <th className="px-5 py-4">Role</th>
              <th className="px-5 py-4">Created</th>
              <th className="px-5 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {listStatus === "loading" ? (
              <tr>
                <td colSpan={5} className="px-5 py-10 text-center text-sm font-medium text-[#667085]">
                  <Loader2 className="mx-auto mb-3 h-5 w-5 animate-spin text-transfer-green" />
                  Loading admins...
                </td>
              </tr>
            ) : items.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-5 py-10 text-center text-sm font-medium text-[#667085]">
                  No admins found.
                </td>
              </tr>
            ) : (
              items.map((admin) => {
                const isCurrentAdmin =
                  getDisplayEmail(admin).toLowerCase() === currentAdminEmail.toLowerCase();

                return (
                <tr key={admin.id} className="text-sm font-medium text-transfer-dark">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fbf5f0] font-bold text-transfer-green">
                        {getDisplayName(admin).slice(0, 1).toUpperCase()}
                      </span>
                      <span className="font-bold">{getDisplayName(admin)}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-[#667085]">{getDisplayEmail(admin)}</td>
                  <td className="px-5 py-4">
                    <span className="inline-flex rounded-full bg-[#fbf5f0] px-3 py-1 text-xs font-bold text-transfer-green">
                      {getDisplayRole(admin)}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-[#667085]">{formatAdminDate(admin.createdAt)}</td>
                  <td className="px-5 py-4 text-right">
                    <div className="inline-flex flex-wrap items-center justify-end gap-2">
                      {isCurrentAdmin && (
                        <button
                          onClick={openPasswordModal}
                          className="inline-flex h-9 items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 text-xs font-bold text-transfer-dark hover:bg-gray-50"
                        >
                          <KeyRound className="h-4 w-4" />
                          Password
                        </button>
                      )}
                      <button
                        onClick={() => setAdminPendingDelete(admin)}
                        disabled={deletingAdminId === admin.id}
                        className="inline-flex h-9 items-center gap-2 rounded-lg border border-red-100 bg-red-50 px-3 text-xs font-bold text-red-700 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {deletingAdminId === admin.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-3 border-t border-gray-100 p-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-medium text-[#667085]">
          Page {pageNumber} of {totalPages}
        </p>
        <div className="flex gap-2">
          <button
            disabled={pageNumber <= 1 || listStatus === "loading"}
            onClick={() => dispatch(fetchAdmins({ pageNumber: pageNumber - 1, pageSize }))}
            className="h-9 rounded-lg border border-gray-200 px-4 text-sm font-bold text-transfer-dark disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>
          <button
            disabled={pageNumber >= totalPages || listStatus === "loading"}
            onClick={() => dispatch(fetchAdmins({ pageNumber: pageNumber + 1, pageSize }))}
            className="h-9 rounded-lg border border-gray-200 px-4 text-sm font-bold text-transfer-dark disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {isPasswordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-4">
          <section className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-[0_18px_70px_rgba(15,23,42,0.18)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-transfer-dark">Update Password</h2>
                <p className="mt-1 text-sm font-medium text-[#667085]">
                  Change the password for your signed-in admin account.
                </p>
              </div>
              <button
                onClick={() => setIsPasswordModalOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-[#667085] hover:bg-gray-50"
                aria-label="Close password modal"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handlePasswordSubmit} className="mt-6 grid gap-4">
              <input
                type="password"
                placeholder="Old password"
                value={passwordForm.oldPassword}
                onChange={(event) =>
                  setPasswordForm((current) => ({
                    ...current,
                    oldPassword: event.target.value,
                  }))
                }
                className="h-11 rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-transfer-green focus:ring-2 focus:ring-transfer-green/15"
                required
              />
              <input
                type="password"
                placeholder="New password"
                value={passwordForm.newPassword}
                onChange={(event) =>
                  setPasswordForm((current) => ({
                    ...current,
                    newPassword: event.target.value,
                  }))
                }
                className="h-11 rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-transfer-green focus:ring-2 focus:ring-transfer-green/15"
                required
              />
              <input
                type="password"
                placeholder="Confirm password"
                value={passwordForm.confirmPassword}
                onChange={(event) =>
                  setPasswordForm((current) => ({
                    ...current,
                    confirmPassword: event.target.value,
                  }))
                }
                className="h-11 rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-transfer-green focus:ring-2 focus:ring-transfer-green/15"
                required
              />
              <button
                disabled={updatePasswordStatus === "loading"}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-transfer-green px-4 text-sm font-bold text-white hover:bg-[#ad743a] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {updatePasswordStatus === "loading" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <KeyRound className="h-4 w-4" />
                )}
                Update Password
              </button>
            </form>
          </section>
        </div>
      )}

      {adminPendingDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-4">
          <section className="w-full max-w-md rounded-2xl bg-white p-6 shadow-[0_18px_70px_rgba(15,23,42,0.18)]">
            <h2 className="text-xl font-bold text-transfer-dark">Delete Admin</h2>
            <p className="mt-2 text-sm font-medium leading-relaxed text-[#667085]">
              Delete {getDisplayEmail(adminPendingDelete)}? This will remove the admin account.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                onClick={() => setAdminPendingDelete(null)}
                disabled={deletingAdminId === adminPendingDelete.id}
                className="h-10 rounded-lg border border-gray-200 px-4 text-sm font-bold text-transfer-dark hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAdmin}
                disabled={deletingAdminId === adminPendingDelete.id}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-red-600 px-4 text-sm font-bold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {deletingAdminId === adminPendingDelete.id ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4" />
                )}
                Delete
              </button>
            </div>
          </section>
        </div>
      )}
    </section>
  );
}
