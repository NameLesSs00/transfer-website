"use client";

import { FormEvent, useState } from "react";
import { Loader2, MapPinPlus, Save } from "lucide-react";
import {
  closeLocationJourneyModal,
  createLocationJourney,
  fetchLocationJourneys,
  updateLocationJourney,
} from "@/store/features/locationJourneys/locationJourneysSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export function LocationJourneyFormModal() {
  const { formMode, isFormModalOpen, selectedJourney } = useAppSelector(
    (state) => state.locationJourneys
  );

  if (!isFormModalOpen) return null;

  return (
    <LocationJourneyFormModalContent
      key={`${formMode}-${selectedJourney?.id ?? "new"}`}
    />
  );
}

function LocationJourneyFormModalContent() {
  const dispatch = useAppDispatch();
  const {
    createStatus,
    formMode,
    pageSize,
    selectedJourney,
    updateStatus,
  } = useAppSelector((state) => state.locationJourneys);
  const [name, setName] = useState(selectedJourney?.name ?? "");
  const isEditing = formMode === "edit";
  const isSubmitting = createStatus === "loading" || updateStatus === "loading";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedName = name.trim();
    if (!trimmedName) return;

    const result =
      isEditing && selectedJourney
        ? await dispatch(updateLocationJourney({ id: selectedJourney.id, name: trimmedName }))
        : await dispatch(createLocationJourney({ name: trimmedName }));

    if (
      createLocationJourney.fulfilled.match(result) ||
      updateLocationJourney.fulfilled.match(result)
    ) {
      void dispatch(fetchLocationJourneys({ pageNumber: 1, pageSize }));
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-4">
      <section className="w-full max-w-md rounded-2xl bg-white p-6 shadow-[0_18px_70px_rgba(15,23,42,0.18)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-transfer-dark">
              {isEditing ? "Edit Location Journey" : "Add Location Journey"}
            </h2>
            <p className="mt-1 text-sm font-medium text-[#667085]">
              Enter the journey name exactly as it should appear.
            </p>
          </div>
          <button
            onClick={() => dispatch(closeLocationJourneyModal())}
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
              placeholder="Hurghada Airport to El Gouna"
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
              <MapPinPlus className="h-4 w-4" />
            )}
            {isEditing ? "Save Changes" : "Create Journey"}
          </button>
        </form>
      </section>
    </div>
  );
}
