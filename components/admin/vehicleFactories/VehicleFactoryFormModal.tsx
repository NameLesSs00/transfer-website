"use client";

import { FormEvent, useState } from "react";
import { Loader2, Plus, Save } from "lucide-react";
import {
  closeVehicleFactoryModal,
  createVehicleFactory,
  fetchVehicleFactories,
  updateVehicleFactory,
} from "@/store/features/vehicleFactories/vehicleFactoriesSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export function VehicleFactoryFormModal() {
  const { formMode, isFormModalOpen, selectedFactory } = useAppSelector(
    (state) => state.vehicleFactories
  );

  if (!isFormModalOpen) return null;

  return (
    <VehicleFactoryFormModalContent
      key={`${formMode}-${selectedFactory?.id ?? "new"}`}
    />
  );
}

function VehicleFactoryFormModalContent() {
  const dispatch = useAppDispatch();
  const {
    createStatus,
    formMode,
    pageSize,
    selectedFactory,
    updateStatus,
  } = useAppSelector((state) => state.vehicleFactories);
  const [name, setName] = useState(selectedFactory?.name ?? "");
  const isEditing = formMode === "edit";
  const isSubmitting = createStatus === "loading" || updateStatus === "loading";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedName = name.trim();
    if (!trimmedName) return;

    const result =
      isEditing && selectedFactory
        ? await dispatch(updateVehicleFactory({ id: selectedFactory.id, name: trimmedName }))
        : await dispatch(createVehicleFactory({ name: trimmedName }));

    if (
      createVehicleFactory.fulfilled.match(result) ||
      updateVehicleFactory.fulfilled.match(result)
    ) {
      void dispatch(fetchVehicleFactories({ pageNumber: 1, pageSize }));
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-4">
      <section className="w-full max-w-md rounded-2xl bg-white p-6 shadow-[0_18px_70px_rgba(15,23,42,0.18)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-transfer-dark">
              {isEditing ? "Edit Vehicle Factory" : "Add Vehicle Factory"}
            </h2>
            <p className="mt-1 text-sm font-medium text-[#667085]">
              Enter the manufacturer name exactly as it should appear.
            </p>
          </div>
          <button
            onClick={() => dispatch(closeVehicleFactoryModal())}
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
              placeholder="BMW"
              className="h-11 rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-transfer-green focus:ring-2 focus:ring-transfer-green/15"
              required
            />
          </label>

          <button
            disabled={isSubmitting || !name.trim()}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-transfer-green px-4 text-sm font-bold text-white hover:bg-[#3d8525] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : isEditing ? (
              <Save className="h-4 w-4" />
            ) : (
              <Plus className="h-4 w-4" />
            )}
            {isEditing ? "Save Changes" : "Create Factory"}
          </button>
        </form>
      </section>
    </div>
  );
}
