"use client";

import { FormEvent, useState } from "react";
import { Loader2, MapPinPlus, Save } from "lucide-react";
import {
  closeLocationModal,
  createLocation,
  fetchLocations,
  updateLocation,
} from "@/store/features/locations/locationsSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

type LocationFormState = {
  name: string;
  address: string;
  latitude: string;
  longitude: string;
  isActive: boolean;
};

export function LocationFormModal() {
  const { formMode, isFormModalOpen, selectedLocation } = useAppSelector(
    (state) => state.locations
  );

  if (!isFormModalOpen) return null;

  return <LocationFormModalContent key={`${formMode}-${selectedLocation?.id ?? "new"}`} />;
}

function LocationFormModalContent() {
  const dispatch = useAppDispatch();
  const {
    createStatus,
    formMode,
    pageSize,
    selectedLocation,
    updateStatus,
  } = useAppSelector((state) => state.locations);
  const isEditing = formMode === "edit";
  const isSubmitting = createStatus === "loading" || updateStatus === "loading";
  const [form, setForm] = useState<LocationFormState>({
    name: selectedLocation?.name ?? "",
    address: selectedLocation?.address ?? "",
    latitude:
      selectedLocation?.latitude || selectedLocation?.latitude === 0
        ? String(selectedLocation.latitude)
        : "",
    longitude:
      selectedLocation?.longitude || selectedLocation?.longitude === 0
        ? String(selectedLocation.longitude)
        : "",
    isActive: selectedLocation?.isActive ?? true,
  });

  const latitude = Number(form.latitude);
  const longitude = Number(form.longitude);
  const hasValidCoordinates = Number.isFinite(latitude) && Number.isFinite(longitude);
  const canSubmit =
    Boolean(form.name.trim()) &&
    Boolean(form.address.trim()) &&
    Boolean(form.latitude) &&
    Boolean(form.longitude) &&
    hasValidCoordinates;

  function updateField<Key extends keyof LocationFormState>(
    key: Key,
    value: LocationFormState[Key]
  ) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) return;

    const payload = {
      name: form.name.trim(),
      address: form.address.trim(),
      latitude,
      longitude,
      isActive: form.isActive,
    };

    const result =
      isEditing && selectedLocation
        ? await dispatch(updateLocation({ id: selectedLocation.id, ...payload }))
        : await dispatch(createLocation(payload));

    if (createLocation.fulfilled.match(result) || updateLocation.fulfilled.match(result)) {
      void dispatch(fetchLocations({ pageNumber: 1, pageSize }));
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-4">
      <section className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-[0_18px_70px_rgba(15,23,42,0.18)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-transfer-dark">
              {isEditing ? "Edit Location" : "Add Location"}
            </h2>
            <p className="mt-1 text-sm font-medium text-[#667085]">
              Save the address and exact map coordinates used by transfer routes.
            </p>
          </div>
          <button
            onClick={() => dispatch(closeLocationModal())}
            className="rounded-lg px-3 py-1 text-sm font-bold text-[#667085] hover:bg-gray-100"
          >
            Close
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-2 sm:col-span-2">
            <span className="text-sm font-semibold text-transfer-dark">Name</span>
            <input
              value={form.name}
              onChange={(event) => updateField("name", event.target.value)}
              placeholder="Hurghada Airport"
              className="h-11 rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-transfer-green focus:ring-2 focus:ring-transfer-green/15"
              required
            />
          </label>

          <label className="flex flex-col gap-2 sm:col-span-2">
            <span className="text-sm font-semibold text-transfer-dark">Address</span>
            <textarea
              value={form.address}
              onChange={(event) => updateField("address", event.target.value)}
              placeholder="Airport Road, Hurghada, Red Sea Governorate"
              className="min-h-[96px] rounded-lg border border-gray-200 px-3 py-3 text-sm outline-none focus:border-transfer-green focus:ring-2 focus:ring-transfer-green/15"
              required
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-transfer-dark">Latitude</span>
            <input
              value={form.latitude}
              onChange={(event) => updateField("latitude", event.target.value)}
              placeholder="27.178300"
              inputMode="decimal"
              className="h-11 rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-transfer-green focus:ring-2 focus:ring-transfer-green/15"
              required
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-transfer-dark">Longitude</span>
            <input
              value={form.longitude}
              onChange={(event) => updateField("longitude", event.target.value)}
              placeholder="33.799400"
              inputMode="decimal"
              className="h-11 rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-transfer-green focus:ring-2 focus:ring-transfer-green/15"
              required
            />
          </label>

          <label className="flex flex-col gap-2 sm:col-span-2">
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
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-transfer-green px-4 text-sm font-bold text-white hover:bg-[#3d8525] disabled:cursor-not-allowed disabled:opacity-60 sm:col-span-2"
          >
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : isEditing ? (
              <Save className="h-4 w-4" />
            ) : (
              <MapPinPlus className="h-4 w-4" />
            )}
            {isEditing ? "Save Changes" : "Create Location"}
          </button>
        </form>
      </section>
    </div>
  );
}
