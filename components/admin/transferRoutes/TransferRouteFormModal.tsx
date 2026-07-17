"use client";

import { FormEvent, useState } from "react";
import { Loader2, Route, Save } from "lucide-react";
import {
  closeTransferRouteModal,
  createTransferRoute,
  fetchTransferRoutes,
  updateTransferRoute,
} from "@/store/features/transferRoutes/transferRoutesSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

type TransferRouteFormState = {
  originLocationId: string;
  destinationLocationId: string;
  isActive: boolean;
};

export function TransferRouteFormModal() {
  const { formMode, isFormModalOpen, selectedRoute } = useAppSelector(
    (state) => state.transferRoutes
  );

  if (!isFormModalOpen) return null;

  return <TransferRouteFormModalContent key={`${formMode}-${selectedRoute?.id ?? "new"}`} />;
}

function TransferRouteFormModalContent() {
  const dispatch = useAppDispatch();
  const {
    createStatus,
    formMode,
    locationOptions,
    locationOptionsStatus,
    pageSize,
    selectedRoute,
    updateStatus,
  } = useAppSelector((state) => state.transferRoutes);
  const isEditing = formMode === "edit";
  const isSubmitting = createStatus === "loading" || updateStatus === "loading";
  const [form, setForm] = useState<TransferRouteFormState>({
    originLocationId: selectedRoute?.originLocationId
      ? String(selectedRoute.originLocationId)
      : "",
    destinationLocationId: selectedRoute?.destinationLocationId
      ? String(selectedRoute.destinationLocationId)
      : "",
    isActive: selectedRoute?.isActive ?? true,
  });

  const originLocationId = Number(form.originLocationId);
  const destinationLocationId = Number(form.destinationLocationId);
  const hasSameLocation =
    Boolean(form.originLocationId) &&
    Boolean(form.destinationLocationId) &&
    form.originLocationId === form.destinationLocationId;
  const hasValidLocations =
    Number.isFinite(originLocationId) && Number.isFinite(destinationLocationId);
  const canSubmit =
    Boolean(form.originLocationId) &&
    Boolean(form.destinationLocationId) &&
    hasValidLocations &&
    !hasSameLocation;

  function updateField<Key extends keyof TransferRouteFormState>(
    key: Key,
    value: TransferRouteFormState[Key]
  ) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) return;

    const payload = {
      originLocationId,
      destinationLocationId,
      isActive: form.isActive,
    };

    const result =
      isEditing && selectedRoute
        ? await dispatch(updateTransferRoute({ id: selectedRoute.id, ...payload }))
        : await dispatch(createTransferRoute(payload));

    if (createTransferRoute.fulfilled.match(result) || updateTransferRoute.fulfilled.match(result)) {
      void dispatch(fetchTransferRoutes({ pageNumber: 1, pageSize }));
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-4">
      <section className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-[0_18px_70px_rgba(15,23,42,0.18)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-transfer-dark">
              {isEditing ? "Edit Transfer Route" : "Add Transfer Route"}
            </h2>
            <p className="mt-1 text-sm font-medium text-[#667085]">
              Choose the public location names that form this transfer route.
            </p>
          </div>
          <button
            onClick={() => dispatch(closeTransferRouteModal())}
            className="rounded-lg px-3 py-1 text-sm font-bold text-[#667085] hover:bg-gray-100"
          >
            Close
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-transfer-dark">Origin Location</span>
            <select
              value={form.originLocationId}
              onChange={(event) => updateField("originLocationId", event.target.value)}
              className="h-11 rounded-lg border border-gray-200 px-3 text-sm font-medium outline-none focus:border-transfer-green focus:ring-2 focus:ring-transfer-green/15"
              required
            >
              <option value="">
                {locationOptionsStatus === "loading" ? "Loading locations..." : "Select origin"}
              </option>
              {locationOptions.map((location) => (
                <option key={location.id} value={location.id}>
                  {location.name} - {location.address}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-transfer-dark">Destination Location</span>
            <select
              value={form.destinationLocationId}
              onChange={(event) => updateField("destinationLocationId", event.target.value)}
              className="h-11 rounded-lg border border-gray-200 px-3 text-sm font-medium outline-none focus:border-transfer-green focus:ring-2 focus:ring-transfer-green/15"
              required
            >
              <option value="">
                {locationOptionsStatus === "loading" ? "Loading locations..." : "Select destination"}
              </option>
              {locationOptions.map((location) => (
                <option key={location.id} value={location.id}>
                  {location.name} - {location.address}
                </option>
              ))}
            </select>
          </label>

          {hasSameLocation && (
            <p className="rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">
              Origin and destination must be different locations.
            </p>
          )}

          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-transfer-dark">Status</span>
            <select
              value={form.isActive ? "active" : "inactive"}
              onChange={(event) => updateField("isActive", event.target.value === "active")}
              className="h-11 rounded-lg border border-gray-200 px-3 text-sm font-medium outline-none focus:border-transfer-green focus:ring-2 focus:ring-transfer-green/15"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </label>

          <button
            disabled={isSubmitting || !canSubmit}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-transfer-green px-4 text-sm font-bold text-white hover:bg-[#3d8525] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : isEditing ? (
              <Save className="h-4 w-4" />
            ) : (
              <Route className="h-4 w-4" />
            )}
            {isEditing ? "Save Changes" : "Create Route"}
          </button>
        </form>
      </section>
    </div>
  );
}
