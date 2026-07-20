"use client";

import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { CarFront, ImageIcon, Loader2, Save, Upload } from "lucide-react";
import {
  closeVehicleModal,
  createVehicle,
  fetchVehicles,
  updateVehicle,
} from "@/store/features/vehicles/vehiclesSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { buildVehicleImageUrl } from "./vehicleDisplay";

type VehicleFormState = {
  name: string;
  model: string;
  year: string;
  licensePlate: string;
  capacity: string;
  imageUrl: string;
  isActive: boolean;
  vehicleCategoryId: string;
  vehicleFactoryId: string;
};

export function VehicleFormModal() {
  const { formMode, isFormModalOpen, selectedVehicle } = useAppSelector(
    (state) => state.vehicles
  );

  if (!isFormModalOpen) return null;

  return <VehicleFormModalContent key={`${formMode}-${selectedVehicle?.id ?? "new"}`} />;
}

function VehicleFormModalContent() {
  const dispatch = useAppDispatch();
  const {
    createStatus,
    formMode,
    pageSize,
    selectedVehicle,
    updateStatus,
  } = useAppSelector((state) => state.vehicles);
  const categories = useAppSelector((state) => state.vehicleCategories.items);
  const factories = useAppSelector((state) => state.vehicleFactories.items);
  const isEditing = formMode === "edit";
  const isSubmitting = createStatus === "loading" || updateStatus === "loading";
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [form, setForm] = useState<VehicleFormState>({
    name: selectedVehicle?.name ?? "",
    model: selectedVehicle?.model ?? "",
    year: selectedVehicle?.year != null ? String(selectedVehicle.year) : "",
    licensePlate: selectedVehicle?.licensePlate ?? "",
    capacity: selectedVehicle?.capacity != null ? String(selectedVehicle.capacity) : "",
    imageUrl: selectedVehicle?.imageUrl ?? "",
    isActive: selectedVehicle?.isActive ?? true,
    vehicleCategoryId: selectedVehicle?.vehicleCategoryId ? String(selectedVehicle.vehicleCategoryId) : "",
    vehicleFactoryId: selectedVehicle?.vehicleFactoryId ? String(selectedVehicle.vehicleFactoryId) : "",
  });
  const imagePreviewUrl = useMemo(() => {
    if (imageFile) return URL.createObjectURL(imageFile);
    return buildVehicleImageUrl(form.imageUrl);
  }, [form.imageUrl, imageFile]);
  const canSubmit =
    Boolean(form.name.trim()) &&
    Boolean(form.model.trim()) &&
    Boolean(form.year) &&
    Boolean(form.licensePlate.trim()) &&
    Boolean(form.capacity) &&
    Boolean(form.vehicleCategoryId) &&
    Boolean(form.vehicleFactoryId) &&
    (isEditing || Boolean(imageFile));
  const fieldClass =
    "h-11 rounded-lg border border-gray-200 bg-white px-3 text-sm font-medium text-transfer-dark outline-none transition focus:border-transfer-green focus:ring-2 focus:ring-transfer-green/15";
  const labelClass = "text-sm font-semibold text-transfer-dark";

  function updateField<Key extends keyof VehicleFormState>(
    key: Key,
    value: VehicleFormState[Key]
  ) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    setImageFile(event.target.files?.[0] ?? null);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) return;

    const year = Number(form.year);
    const capacity = Number(form.capacity);
    const vehicleCategoryId = Number(form.vehicleCategoryId);
    const vehicleFactoryId = Number(form.vehicleFactoryId);

    if (!Number.isFinite(year) || !Number.isFinite(capacity)) return;

    const basePayload = {
      name: form.name.trim(),
      model: form.model.trim(),
      year,
      licensePlate: form.licensePlate.trim(),
      capacity,
      isActive: isEditing ? form.isActive : true,
      vehicleCategoryId,
      vehicleFactoryId,
    };

    const result =
      isEditing && selectedVehicle
        ? await dispatch(
            updateVehicle({
              id: selectedVehicle.id,
              imageFile,
              ...basePayload,
            })
          )
        : imageFile
          ? await dispatch(createVehicle({ imageFile, ...basePayload }))
          : null;

    if (
      result &&
      (createVehicle.fulfilled.match(result) || updateVehicle.fulfilled.match(result))
    ) {
      void dispatch(fetchVehicles({ pageNumber: 1, pageSize }));
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/35 px-4 py-6">
      <section className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-[0_18px_70px_rgba(15,23,42,0.18)]">
        <div className="flex items-start justify-between gap-4 border-b border-gray-100 px-6 py-5">
          <div>
            <h2 className="text-xl font-bold text-transfer-dark">
              {isEditing ? "Edit Vehicle" : "Add Vehicle"}
            </h2>
            <p className="mt-1 text-sm font-medium text-[#667085]">
              Select categories and factories by name. IDs are kept hidden from the interface.
            </p>
          </div>
          <button
            onClick={() => dispatch(closeVehicleModal())}
            className="rounded-lg px-3 py-1 text-sm font-bold text-[#667085] hover:bg-gray-100"
          >
            Close
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-4 px-6 py-5 md:grid-cols-2">
          <label className="flex flex-col gap-2">
            <span className={labelClass}>Name</span>
            <input
              value={form.name}
              onChange={(event) => updateField("name", event.target.value)}
              placeholder="Mercedes V Class"
              className={fieldClass}
              required
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className={labelClass}>Model</span>
            <input
              value={form.model}
              onChange={(event) => updateField("model", event.target.value)}
              placeholder="V250"
              className={fieldClass}
              required
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className={labelClass}>Year</span>
            <input
              type="number"
              value={form.year}
              onChange={(event) => updateField("year", event.target.value)}
              min={1900}
              max={2100}
              className={fieldClass}
              required
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className={labelClass}>Capacity</span>
            <input
              type="number"
              value={form.capacity}
              onChange={(event) => updateField("capacity", event.target.value)}
              min={1}
              className={fieldClass}
              required
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className={labelClass}>License Plate</span>
            <input
              value={form.licensePlate}
              onChange={(event) => updateField("licensePlate", event.target.value)}
              placeholder="A-B-C-1234"
              className={fieldClass}
              required
            />
          </label>

          {isEditing && (
            <label className="flex flex-col gap-2">
              <span className={labelClass}>Status</span>
              <span className="flex h-11 items-center justify-between rounded-lg border border-gray-200 bg-white px-3 text-sm font-semibold text-transfer-dark">
                Active
                <input
                  type="checkbox"
                  checked={form.isActive}
                  onChange={(event) => updateField("isActive", event.target.checked)}
                  className="h-4 w-4 accent-transfer-green"
                />
              </span>
            </label>
          )}

          <label className="flex flex-col gap-2">
            <span className={labelClass}>Vehicle Category</span>
            <select
              value={form.vehicleCategoryId}
              onChange={(event) => updateField("vehicleCategoryId", event.target.value)}
              className={fieldClass}
              required
            >
              <option value="">Select category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2">
            <span className={labelClass}>Vehicle Factory</span>
            <select
              value={form.vehicleFactoryId}
              onChange={(event) => updateField("vehicleFactoryId", event.target.value)}
              className={fieldClass}
              required
            >
              <option value="">Select factory</option>
              {factories.map((factory) => (
                <option key={factory.id} value={factory.id}>
                  {factory.name}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2 md:col-span-2">
            <span className={labelClass}>
              {isEditing ? "Replace Vehicle Image" : "Vehicle Image"}
            </span>
            <span className="flex min-h-14 flex-col gap-3 rounded-lg border border-dashed border-gray-200 bg-[#fbfaf8] p-3 sm:flex-row sm:items-center sm:justify-between">
              <span className="flex min-w-0 items-center gap-3 text-sm font-medium text-[#667085]">
                <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-white text-transfer-green">
                  <ImageIcon className="h-4 w-4" />
                </span>
                <span className="min-w-0 truncate">
                  {imageFile?.name || (isEditing ? "Keep current image or upload a replacement" : "Choose an image to upload")}
                </span>
              </span>
              <span className="inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-lg bg-transfer-green px-4 text-sm font-bold text-white hover:bg-[#ad743a]">
                <Upload className="h-4 w-4" />
                Choose Image
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="sr-only"
                required={!isEditing}
              />
            </span>
          </label>

          {imagePreviewUrl && (
            <div className="flex flex-col gap-4 rounded-xl border border-gray-100 bg-[#fbfaf8] p-4 md:col-span-2 sm:flex-row sm:items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imagePreviewUrl}
                alt="Vehicle preview"
                className="h-24 w-32 rounded-lg border border-gray-100 bg-white object-contain p-2"
              />
              <div>
                <p className="text-sm font-bold text-transfer-dark">
                  {imageFile ? "Selected replacement image" : "Current vehicle image"}
                </p>
                <p className="mt-1 text-sm font-medium leading-6 text-[#667085]">
                  {imageFile ? imageFile.name : "This image will be kept if no replacement is chosen."}
                </p>
              </div>
            </div>
          )}

          {(categories.length === 0 || factories.length === 0) && (
            <div className="rounded-xl border border-amber-100 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-800 md:col-span-2">
              Add at least one vehicle category and one vehicle factory before creating vehicles.
            </div>
          )}

          <button
            disabled={isSubmitting || !canSubmit}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-transfer-green px-4 text-sm font-bold text-white hover:bg-[#ad743a] disabled:cursor-not-allowed disabled:opacity-60 md:col-span-2"
          >
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : isEditing ? (
              <Save className="h-4 w-4" />
            ) : (
              <CarFront className="h-4 w-4" />
            )}
            {isEditing ? "Save Changes" : "Create Vehicle"}
          </button>
        </form>
      </section>
    </div>
  );
}
