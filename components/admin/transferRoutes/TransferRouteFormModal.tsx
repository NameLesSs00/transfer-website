"use client";

import { FormEvent, useMemo, useState } from "react";
import { Check, ChevronsUpDown, Loader2, Route, Save, Search } from "lucide-react";
import { Location } from "@/store/features/locations/locationsModels";
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

type LocationField = "originLocationId" | "destinationLocationId";

type LocationSelectProps = {
  disabled: boolean;
  label: string;
  loadingLabel: string;
  locations: Location[];
  name: LocationField;
  onChange: (name: LocationField, value: string) => void;
  open: boolean;
  query: string;
  selectedId: string;
  setOpen: (name: LocationField | null) => void;
  setQuery: (value: string) => void;
};

function getLocationLabel(location: Location) {
  return `${location.name} - ${location.address}`;
}

function LocationSelect({
  disabled,
  label,
  loadingLabel,
  locations,
  name,
  onChange,
  open,
  query,
  selectedId,
  setOpen,
  setQuery,
}: LocationSelectProps) {
  const selectedLocation = locations.find((location) => String(location.id) === selectedId);
  const filteredLocations = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return locations;

    return locations.filter((location) =>
      getLocationLabel(location).toLowerCase().includes(normalizedQuery)
    );
  }, [locations, query]);

  return (
    <div className="min-w-0 flex flex-col gap-2">
      <span className="text-sm font-semibold text-transfer-dark">{label}</span>
      <button
        type="button"
        onClick={() => setOpen(open ? null : name)}
        disabled={disabled}
        className="flex min-h-11 w-full items-center justify-between gap-3 rounded-lg border border-gray-200 bg-white px-3 py-2 text-left text-sm font-medium text-transfer-dark outline-none transition-colors hover:bg-gray-50 focus:border-transfer-green focus:ring-2 focus:ring-transfer-green/15 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <span className="min-w-0 flex-1 overflow-hidden break-words line-clamp-2">
          {disabled
            ? loadingLabel
            : selectedLocation
              ? getLocationLabel(selectedLocation)
              : `Select ${label.toLowerCase()}`}
        </span>
        <ChevronsUpDown className="h-4 w-4 shrink-0 text-[#98a2b3]" />
      </button>

      {open && (
        <div className="w-full min-w-0 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-[0_12px_30px_rgba(15,23,42,0.10)]">
          <label className="flex h-11 items-center gap-2 border-b border-gray-100 px-3">
            <Search className="h-4 w-4 text-[#98a2b3]" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search locations"
              className="min-w-0 flex-1 text-sm font-medium text-transfer-dark outline-none placeholder:text-[#98a2b3]"
            />
          </label>

          <div className="max-h-64 overflow-y-auto py-1">
            {filteredLocations.length === 0 ? (
              <div className="px-3 py-3 text-sm font-medium text-[#667085]">
                No locations found.
              </div>
            ) : (
              filteredLocations.map((location) => {
                const value = String(location.id);
                const isSelected = selectedId === value;

                return (
                  <button
                    key={location.id}
                    type="button"
                    onClick={() => {
                      onChange(name, value);
                      setOpen(null);
                      setQuery("");
                    }}
                    className="flex w-full min-w-0 items-start gap-3 px-3 py-2 text-left text-sm font-medium text-transfer-dark hover:bg-[#fbfaf8]"
                  >
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center">
                      {isSelected && <Check className="h-4 w-4 text-transfer-green" />}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block break-words font-bold">{location.name}</span>
                      <span className="mt-0.5 block overflow-hidden break-all text-xs font-medium leading-5 text-[#667085] line-clamp-2">
                        {location.address}
                      </span>
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
  const isLoadingLocations = locationOptionsStatus === "loading";
  const [openLocationField, setOpenLocationField] = useState<LocationField | null>(null);
  const [originQuery, setOriginQuery] = useState("");
  const [destinationQuery, setDestinationQuery] = useState("");
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
      isActive: isEditing ? form.isActive : true,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/35 px-4 py-6">
      <section className="max-h-[92vh] w-full max-w-2xl overflow-y-auto overflow-x-hidden rounded-2xl bg-white p-6 shadow-[0_18px_70px_rgba(15,23,42,0.18)]">
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

        <form onSubmit={handleSubmit} className="mt-6 grid min-w-0 gap-4">
          <LocationSelect
            disabled={isLoadingLocations}
            label="Origin Location"
            loadingLabel="Loading locations..."
            locations={locationOptions}
            name="originLocationId"
            onChange={updateField}
            open={openLocationField === "originLocationId"}
            query={originQuery}
            selectedId={form.originLocationId}
            setOpen={setOpenLocationField}
            setQuery={setOriginQuery}
          />

          <LocationSelect
            disabled={isLoadingLocations}
            label="Destination Location"
            loadingLabel="Loading locations..."
            locations={locationOptions}
            name="destinationLocationId"
            onChange={updateField}
            open={openLocationField === "destinationLocationId"}
            query={destinationQuery}
            selectedId={form.destinationLocationId}
            setOpen={setOpenLocationField}
            setQuery={setDestinationQuery}
          />

          {hasSameLocation && (
            <p className="rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">
              Origin and destination must be different locations.
            </p>
          )}

          {isEditing && (
            <label className="flex h-11 items-center gap-3 rounded-lg border border-gray-200 px-3 text-sm font-semibold text-transfer-dark">
              <input
                type="checkbox"
                checked={form.isActive}
                onChange={(event) => updateField("isActive", event.target.checked)}
                className="h-4 w-4 accent-transfer-green"
              />
              Active
            </label>
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
              <Route className="h-4 w-4" />
            )}
            {isEditing ? "Save Changes" : "Create Route"}
          </button>
        </form>
      </section>
    </div>
  );
}
