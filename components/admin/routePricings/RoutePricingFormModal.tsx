"use client";

import { FormEvent, useMemo, useState } from "react";
import { BadgeDollarSign, Loader2, Save } from "lucide-react";
import {
  closeRoutePricingModal,
  createRoutePricing,
  fetchRoutePricings,
  updateRoutePricing,
} from "@/store/features/routePricings/routePricingsSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  findMatchingTransferRoute,
  findMatchingVehicleCategory,
  getTransferRouteLabel,
} from "./routePricingDisplay";

type RoutePricingFormState = {
  transferRouteId: string;
  vehicleCategoryId: string;
  price: string;
  isActive: boolean;
};

export function RoutePricingFormModal() {
  const { formMode, isFormModalOpen, selectedPricing } = useAppSelector(
    (state) => state.routePricings
  );

  if (!isFormModalOpen) return null;

  return <RoutePricingFormModalContent key={`${formMode}-${selectedPricing?.id ?? "new"}`} />;
}

function RoutePricingFormModalContent() {
  const dispatch = useAppDispatch();
  const {
    createStatus,
    formMode,
    pageSize,
    selectedPricing,
    transferRouteOptions,
    transferRouteOptionsStatus,
    updateStatus,
    vehicleCategoryOptions,
    vehicleCategoryOptionsStatus,
  } = useAppSelector((state) => state.routePricings);
  const isEditing = formMode === "edit";
  const isSubmitting = createStatus === "loading" || updateStatus === "loading";
  const matchedRoute = useMemo(
    () =>
      selectedPricing
        ? findMatchingTransferRoute(selectedPricing, transferRouteOptions)
        : null,
    [selectedPricing, transferRouteOptions]
  );
  const matchedCategory = useMemo(
    () =>
      selectedPricing
        ? findMatchingVehicleCategory(selectedPricing, vehicleCategoryOptions)
        : null,
    [selectedPricing, vehicleCategoryOptions]
  );
  const [form, setForm] = useState<RoutePricingFormState>({
    transferRouteId: matchedRoute ? String(matchedRoute.id) : "",
    vehicleCategoryId: matchedCategory ? String(matchedCategory.id) : "",
    price:
      selectedPricing?.price || selectedPricing?.price === 0
        ? String(selectedPricing.price)
        : "",
    isActive: selectedPricing?.isActive ?? true,
  });

  const transferRouteId = Number(form.transferRouteId);
  const vehicleCategoryId = Number(form.vehicleCategoryId);
  const price = Number(form.price);
  const canSubmit =
    Boolean(form.transferRouteId) &&
    Boolean(form.vehicleCategoryId) &&
    Boolean(form.price) &&
    Number.isFinite(transferRouteId) &&
    Number.isFinite(vehicleCategoryId) &&
    Number.isFinite(price) &&
    price >= 0;

  function updateField<Key extends keyof RoutePricingFormState>(
    key: Key,
    value: RoutePricingFormState[Key]
  ) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) return;

    const payload = {
      transferRouteId,
      vehicleCategoryId,
      price,
      isActive: form.isActive,
    };

    const result =
      isEditing && selectedPricing
        ? await dispatch(updateRoutePricing({ id: selectedPricing.id, ...payload }))
        : await dispatch(createRoutePricing(payload));

    if (createRoutePricing.fulfilled.match(result) || updateRoutePricing.fulfilled.match(result)) {
      void dispatch(fetchRoutePricings({ pageNumber: 1, pageSize }));
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-4">
      <section className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-[0_18px_70px_rgba(15,23,42,0.18)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-transfer-dark">
              {isEditing ? "Edit Route Pricing" : "Add Route Pricing"}
            </h2>
            <p className="mt-1 text-sm font-medium text-[#667085]">
              Choose a transfer route and vehicle category, then set the active price.
            </p>
          </div>
          <button
            onClick={() => dispatch(closeRoutePricingModal())}
            className="rounded-lg px-3 py-1 text-sm font-bold text-[#667085] hover:bg-gray-100"
          >
            Close
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-transfer-dark">Transfer Route</span>
            <select
              value={form.transferRouteId}
              onChange={(event) => updateField("transferRouteId", event.target.value)}
              className="h-11 rounded-lg border border-gray-200 px-3 text-sm font-medium outline-none focus:border-transfer-green focus:ring-2 focus:ring-transfer-green/15"
              required
            >
              <option value="">
                {transferRouteOptionsStatus === "loading"
                  ? "Loading routes..."
                  : "Select transfer route"}
              </option>
              {transferRouteOptions.map((route) => (
                <option key={route.id} value={route.id}>
                  {getTransferRouteLabel(route)}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-transfer-dark">Vehicle Category</span>
            <select
              value={form.vehicleCategoryId}
              onChange={(event) => updateField("vehicleCategoryId", event.target.value)}
              className="h-11 rounded-lg border border-gray-200 px-3 text-sm font-medium outline-none focus:border-transfer-green focus:ring-2 focus:ring-transfer-green/15"
              required
            >
              <option value="">
                {vehicleCategoryOptionsStatus === "loading"
                  ? "Loading categories..."
                  : "Select vehicle category"}
              </option>
              {vehicleCategoryOptions.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-transfer-dark">Price</span>
            <input
              value={form.price}
              onChange={(event) => updateField("price", event.target.value)}
              placeholder="200"
              inputMode="decimal"
              className="h-11 rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-transfer-green focus:ring-2 focus:ring-transfer-green/15"
              required
            />
          </label>

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
              <BadgeDollarSign className="h-4 w-4" />
            )}
            {isEditing ? "Save Changes" : "Create Pricing"}
          </button>
        </form>
      </section>
    </div>
  );
}
