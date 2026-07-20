"use client";

import { FormEvent, useState } from "react";
import { Loader2, Save, Tags } from "lucide-react";
import {
  closeVehicleCategoryModal,
  createVehicleCategory,
  fetchVehicleCategories,
  updateVehicleCategory,
} from "@/store/features/vehicleCategories/vehicleCategoriesSlice";
import { VehicleCategoryPricingTypeValue } from "@/store/features/vehicleCategories/vehicleCategoriesModels";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  getPricingTypeDescription,
  pricingTypeToValue,
} from "./vehicleCategoryDisplay";

export function VehicleCategoryFormModal() {
  const { formMode, isFormModalOpen, selectedCategory } = useAppSelector(
    (state) => state.vehicleCategories
  );

  if (!isFormModalOpen) return null;

  return (
    <VehicleCategoryFormModalContent
      key={`${formMode}-${selectedCategory?.id ?? "new"}`}
    />
  );
}

function VehicleCategoryFormModalContent() {
  const dispatch = useAppDispatch();
  const {
    createStatus,
    formMode,
    pageSize,
    selectedCategory,
    updateStatus,
  } = useAppSelector((state) => state.vehicleCategories);
  const [name, setName] = useState(selectedCategory?.name ?? "");
  const [description, setDescription] = useState(selectedCategory?.description ?? "");
  const [pricingType, setPricingType] = useState<VehicleCategoryPricingTypeValue>(
    selectedCategory ? pricingTypeToValue(selectedCategory.pricingType) : 0
  );
  const isEditing = formMode === "edit";
  const isSubmitting = createStatus === "loading" || updateStatus === "loading";
  const canSubmit = Boolean(name.trim()) && Boolean(description.trim());

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedDescription = description.trim();
    if (!trimmedName || !trimmedDescription) return;

    const payload = {
      name: trimmedName,
      description: trimmedDescription,
      pricingType,
    };

    const result =
      isEditing && selectedCategory
        ? await dispatch(updateVehicleCategory({ id: selectedCategory.id, ...payload }))
        : await dispatch(createVehicleCategory(payload));

    if (
      createVehicleCategory.fulfilled.match(result) ||
      updateVehicleCategory.fulfilled.match(result)
    ) {
      void dispatch(fetchVehicleCategories({ pageNumber: 1, pageSize }));
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-4">
      <section className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-[0_18px_70px_rgba(15,23,42,0.18)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-transfer-dark">
              {isEditing ? "Edit Vehicle Category" : "Add Vehicle Category"}
            </h2>
            <p className="mt-1 text-sm font-medium text-[#667085]">
              Choose how this category should be priced for customers.
            </p>
          </div>
          <button
            onClick={() => dispatch(closeVehicleCategoryModal())}
            className="rounded-lg px-3 py-1 text-sm font-bold text-[#667085] hover:bg-gray-100"
          >
            Close
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-transfer-dark">Name</span>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Car"
              className="h-11 rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-transfer-green focus:ring-2 focus:ring-transfer-green/15"
              required
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-transfer-dark">Description</span>
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Comfortable vehicle category for airport transfers"
              rows={4}
              className="resize-none rounded-lg border border-gray-200 px-3 py-3 text-sm outline-none focus:border-transfer-green focus:ring-2 focus:ring-transfer-green/15"
              required
            />
          </label>

          <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-transfer-dark">Pricing Type</span>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { label: "Fixed Trip", value: 0 as const },
                { label: "Per Person", value: 1 as const },
              ].map((option) => {
                const isSelected = pricingType === option.value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setPricingType(option.value)}
                    className={`rounded-xl border p-4 text-left transition-colors ${
                      isSelected
                        ? "border-transfer-green bg-[#fbf5f0] text-transfer-dark"
                        : "border-gray-200 bg-white text-[#667085] hover:bg-gray-50"
                    }`}
                  >
                    <span className="block text-sm font-bold">{option.label}</span>
                    <span className="mt-1 block text-xs font-medium leading-5">
                      {getPricingTypeDescription(option.value)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <button
            disabled={isSubmitting || !canSubmit}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-transfer-green px-4 text-sm font-bold text-white hover:bg-[#ad743a] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : isEditing ? (
              <Save className="h-4 w-4" />
            ) : (
              <Tags className="h-4 w-4" />
            )}
            {isEditing ? "Save Changes" : "Create Category"}
          </button>
        </form>
      </section>
    </div>
  );
}
