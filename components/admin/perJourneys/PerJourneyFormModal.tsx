"use client";

import { FormEvent, useMemo, useState } from "react";
import { BadgeDollarSign, Check, ChevronsUpDown, Loader2, Save, Search } from "lucide-react";
import {
  closePerJourneyModal,
  createPerJourney,
  fetchPerJourneys,
  updatePerJourney,
} from "@/store/features/perJourneys/perJourneysSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getVehicleLabel } from "./perJourneyDisplay";

type PerJourneyFormState = {
  fromLocationId: string;
  toLocationId: string;
  vehicleId: string;
  price: string;
};

type SelectOption = {
  id: number;
  label: string;
  caption?: string;
};

type SearchableSelectProps = {
  disabled: boolean;
  label: string;
  loadingLabel: string;
  onChange: (value: string) => void;
  open: boolean;
  options: SelectOption[];
  placeholder: string;
  query: string;
  selectedId: string;
  setOpen: (open: boolean) => void;
  setQuery: (value: string) => void;
};

function SearchableSelect({
  disabled,
  label,
  loadingLabel,
  onChange,
  open,
  options,
  placeholder,
  query,
  selectedId,
  setOpen,
  setQuery,
}: SearchableSelectProps) {
  const selectedOption = options.find((option) => String(option.id) === selectedId);
  const filteredOptions = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return options;

    return options.filter((option) =>
      `${option.label} ${option.caption ?? ""}`.toLowerCase().includes(normalizedQuery)
    );
  }, [options, query]);

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-semibold text-transfer-dark">{label}</span>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        disabled={disabled}
        className="flex min-h-11 w-full items-center justify-between gap-3 rounded-lg border border-gray-200 bg-white px-3 py-2 text-left text-sm font-medium text-transfer-dark outline-none transition-colors hover:bg-gray-50 focus:border-transfer-green focus:ring-2 focus:ring-transfer-green/15 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <span className="line-clamp-2">
          {disabled ? loadingLabel : selectedOption?.label ?? placeholder}
        </span>
        <ChevronsUpDown className="h-4 w-4 shrink-0 text-[#98a2b3]" />
      </button>

      {open && (
        <div className="rounded-lg border border-gray-200 bg-white shadow-[0_12px_30px_rgba(15,23,42,0.10)]">
          <label className="flex h-11 items-center gap-2 border-b border-gray-100 px-3">
            <Search className="h-4 w-4 text-[#98a2b3]" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search"
              className="min-w-0 flex-1 text-sm font-medium text-transfer-dark outline-none placeholder:text-[#98a2b3]"
            />
          </label>

          <div className="max-h-64 overflow-y-auto py-1">
            {filteredOptions.length === 0 ? (
              <div className="px-3 py-3 text-sm font-medium text-[#667085]">
                No options found.
              </div>
            ) : (
              filteredOptions.map((option) => {
                const value = String(option.id);
                const isSelected = selectedId === value;

                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => {
                      onChange(value);
                      setOpen(false);
                      setQuery("");
                    }}
                    className="flex w-full items-start gap-3 px-3 py-2 text-left text-sm font-medium text-transfer-dark hover:bg-[#fbfaf8]"
                  >
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center">
                      {isSelected && <Check className="h-4 w-4 text-transfer-green" />}
                    </span>
                    <span>
                      <span className="block font-bold">{option.label}</span>
                      {option.caption && (
                        <span className="mt-0.5 line-clamp-2 text-xs font-medium text-[#667085]">
                          {option.caption}
                        </span>
                      )}
                    </span>
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export function PerJourneyFormModal() {
  const { formMode, isFormModalOpen, selectedPerJourney } = useAppSelector(
    (state) => state.perJourneys
  );

  if (!isFormModalOpen) return null;

  return <PerJourneyFormModalContent key={`${formMode}-${selectedPerJourney?.id ?? "new"}`} />;
}

function PerJourneyFormModalContent() {
  const dispatch = useAppDispatch();
  const {
    createStatus,
    formMode,
    locationJourneyOptions,
    locationJourneyOptionsStatus,
    pageSize,
    selectedPerJourney,
    updateStatus,
    vehicleOptions,
    vehicleOptionsStatus,
  } = useAppSelector((state) => state.perJourneys);
  const isEditing = formMode === "edit";
  const isSubmitting = createStatus === "loading" || updateStatus === "loading";
  const locationOptions = useMemo(
    () =>
      locationJourneyOptions.map((journey) => ({
        id: journey.id,
        label: journey.name,
      })),
    [locationJourneyOptions]
  );
  const vehicleSelectOptions = useMemo(
    () =>
      vehicleOptions
        .filter((vehicle) => vehicle.vehicleCategory?.pricingType !== "PerPerson")
        .map((vehicle) => ({
          id: vehicle.id,
          label: getVehicleLabel(vehicle),
          caption: vehicle.vehicleCategoryName || vehicle.vehicleFactoryName || undefined,
        })),
    [vehicleOptions]
  );
  const [openField, setOpenField] = useState<"from" | "to" | "vehicle" | null>(null);
  const [fromQuery, setFromQuery] = useState("");
  const [toQuery, setToQuery] = useState("");
  const [vehicleQuery, setVehicleQuery] = useState("");
  const [form, setForm] = useState<PerJourneyFormState>({
    fromLocationId: selectedPerJourney?.fromLocationId
      ? String(selectedPerJourney.fromLocationId)
      : "",
    toLocationId: selectedPerJourney?.toLocationId ? String(selectedPerJourney.toLocationId) : "",
    vehicleId: selectedPerJourney?.vehicleId ? String(selectedPerJourney.vehicleId) : "",
    price:
      selectedPerJourney?.price || selectedPerJourney?.price === 0
        ? String(selectedPerJourney.price)
        : "",
  });

  const fromLocationId = Number(form.fromLocationId);
  const toLocationId = Number(form.toLocationId);
  const vehicleId = Number(form.vehicleId);
  const price = Number(form.price);
  const hasSameJourney =
    Boolean(form.fromLocationId) &&
    Boolean(form.toLocationId) &&
    form.fromLocationId === form.toLocationId;
  const canSubmit =
    Boolean(form.fromLocationId) &&
    Boolean(form.toLocationId) &&
    Boolean(form.vehicleId) &&
    form.price.trim() !== "" &&
    Number.isFinite(fromLocationId) &&
    Number.isFinite(toLocationId) &&
    Number.isFinite(vehicleId) &&
    Number.isFinite(price) &&
    price >= 0 &&
    !hasSameJourney;

  function updateField<Key extends keyof PerJourneyFormState>(
    key: Key,
    value: PerJourneyFormState[Key]
  ) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) return;

    const payload = {
      fromLocationId,
      toLocationId,
      vehicleId,
      price,
    };

    const result =
      isEditing && selectedPerJourney
        ? await dispatch(updatePerJourney({ id: selectedPerJourney.id, ...payload }))
        : await dispatch(createPerJourney(payload));

    if (createPerJourney.fulfilled.match(result) || updatePerJourney.fulfilled.match(result)) {
      void dispatch(fetchPerJourneys({ pageNumber: 1, pageSize }));
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-4">
      <section className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-[0_18px_70px_rgba(15,23,42,0.18)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-transfer-dark">
              {isEditing ? "Edit Per Journey" : "Add Per Journey"}
            </h2>
            <p className="mt-1 text-sm font-medium text-[#667085]">
              Choose two location journeys, assign a vehicle, and set the trip price.
            </p>
          </div>
          <button
            onClick={() => dispatch(closePerJourneyModal())}
            className="rounded-lg px-3 py-1 text-sm font-bold text-[#667085] hover:bg-gray-100"
          >
            Close
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
          <SearchableSelect
            disabled={locationJourneyOptionsStatus === "loading"}
            label="From Location Journey"
            loadingLabel="Loading location journeys..."
            onChange={(value) => updateField("fromLocationId", value)}
            open={openField === "from"}
            options={locationOptions}
            placeholder="Select from journey"
            query={fromQuery}
            selectedId={form.fromLocationId}
            setOpen={(open) => setOpenField(open ? "from" : null)}
            setQuery={setFromQuery}
          />

          <SearchableSelect
            disabled={locationJourneyOptionsStatus === "loading"}
            label="To Location Journey"
            loadingLabel="Loading location journeys..."
            onChange={(value) => updateField("toLocationId", value)}
            open={openField === "to"}
            options={locationOptions}
            placeholder="Select to journey"
            query={toQuery}
            selectedId={form.toLocationId}
            setOpen={(open) => setOpenField(open ? "to" : null)}
            setQuery={setToQuery}
          />

          {hasSameJourney && (
            <p className="rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">
              From and to location journeys must be different.
            </p>
          )}

          <SearchableSelect
            disabled={vehicleOptionsStatus === "loading"}
            label="Vehicle"
            loadingLabel="Loading vehicles..."
            onChange={(value) => updateField("vehicleId", value)}
            open={openField === "vehicle"}
            options={vehicleSelectOptions}
            placeholder="Select vehicle"
            query={vehicleQuery}
            selectedId={form.vehicleId}
            setOpen={(open) => setOpenField(open ? "vehicle" : null)}
            setQuery={setVehicleQuery}
          />

          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-transfer-dark">Price</span>
            <input
              value={form.price}
              onChange={(event) => updateField("price", event.target.value)}
              placeholder="100"
              inputMode="decimal"
              className="h-11 rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-transfer-green focus:ring-2 focus:ring-transfer-green/15"
              required
            />
          </label>

          {(locationJourneyOptions.length === 0 || vehicleOptions.length === 0) && (
            <div className="rounded-xl border border-amber-100 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-800">
              Add at least two location journeys and one vehicle before creating per journeys.
            </div>
          )}

          <button
            disabled={isSubmitting || !canSubmit}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-transfer-green px-4 text-sm font-bold text-white hover:bg-[#ad743a] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : isEditing ? (
              <Save className="h-4 w-4" />
            ) : (
              <BadgeDollarSign className="h-4 w-4" />
            )}
            {isEditing ? "Save Changes" : "Create Per Journey"}
          </button>
        </form>
      </section>
    </div>
  );
}
