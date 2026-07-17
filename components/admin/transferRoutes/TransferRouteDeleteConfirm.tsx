"use client";

import { Loader2, Trash2 } from "lucide-react";
import {
  closeDeleteTransferRouteConfirm,
  fetchTransferRoutes,
  removeTransferRoute,
} from "@/store/features/transferRoutes/transferRoutesSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export function TransferRouteDeleteConfirm() {
  const dispatch = useAppDispatch();
  const {
    deleteStatus,
    isDeleteConfirmOpen,
    pageNumber,
    pageSize,
    routePendingDelete,
  } = useAppSelector((state) => state.transferRoutes);

  if (!isDeleteConfirmOpen || !routePendingDelete) return null;

  async function handleDelete() {
    if (!routePendingDelete) return;

    const result = await dispatch(removeTransferRoute(routePendingDelete.id));
    if (removeTransferRoute.fulfilled.match(result)) {
      void dispatch(fetchTransferRoutes({ pageNumber, pageSize }));
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-4">
      <section className="w-full max-w-md rounded-2xl bg-white p-6 shadow-[0_18px_70px_rgba(15,23,42,0.18)]">
        <h2 className="text-xl font-bold text-transfer-dark">Delete Transfer Route</h2>
        <p className="mt-2 text-sm font-medium leading-relaxed text-[#667085]">
          Delete the route from {routePendingDelete.originLocationName} to{" "}
          {routePendingDelete.destinationLocationName}? This will remove it from the route list.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            onClick={() => dispatch(closeDeleteTransferRouteConfirm())}
            className="h-10 rounded-lg border border-gray-200 px-4 text-sm font-bold text-transfer-dark hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={deleteStatus === "loading"}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-red-600 px-4 text-sm font-bold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {deleteStatus === "loading" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="h-4 w-4" />
            )}
            Delete
          </button>
        </div>
      </section>
    </div>
  );
}
