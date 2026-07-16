"use client";

import { Loader2, Trash2 } from "lucide-react";
import { fetchAdmins, removeAdmin } from "@/store/features/admins/adminsSlice";
import { AdminUser } from "@/store/features/admins/adminsModels";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  formatAdminDate,
  getDisplayEmail,
  getDisplayName,
  getDisplayRole,
} from "./adminDisplay";

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

  async function handleDeleteAdmin(admin: AdminUser) {
    const confirmed = window.confirm(`Delete admin ${getDisplayEmail(admin)}?`);
    if (!confirmed) return;

    const result = await dispatch(
      removeAdmin({ id: admin.id, email: getDisplayEmail(admin) })
    );

    if (removeAdmin.fulfilled.match(result)) {
      void dispatch(fetchAdmins({ pageNumber, pageSize }));
    }
  }

  return (
    <section className="rounded-xl border border-gray-100 bg-white shadow-[0_1px_8px_rgba(15,23,42,0.04)]">
      <div className="flex flex-col gap-3 border-b border-gray-100 p-5 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-bold text-transfer-dark">Admin Accounts</h2>
          <p className="mt-1 text-sm font-medium text-[#667085]">
            {totalRecords} admin records
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left">
          <thead className="bg-[#f8fafb] text-xs font-bold uppercase tracking-[0.08em] text-[#667085]">
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
              items.map((admin) => (
                <tr key={admin.id} className="text-sm font-medium text-transfer-dark">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#edf8f1] font-bold text-transfer-green">
                        {getDisplayName(admin).slice(0, 1).toUpperCase()}
                      </span>
                      <span className="font-bold">{getDisplayName(admin)}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-[#667085]">{getDisplayEmail(admin)}</td>
                  <td className="px-5 py-4">
                    <span className="inline-flex rounded-full bg-[#edf8f1] px-3 py-1 text-xs font-bold text-transfer-green">
                      {getDisplayRole(admin)}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-[#667085]">{formatAdminDate(admin.createdAt)}</td>
                  <td className="px-5 py-4 text-right">
                    <button
                      onClick={() => handleDeleteAdmin(admin)}
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
                  </td>
                </tr>
              ))
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
    </section>
  );
}
