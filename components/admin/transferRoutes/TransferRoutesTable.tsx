"use client";

import { Edit3, ExternalLink, Loader2, MapPin, Route, Trash2 } from "lucide-react";
import { Location } from "@/store/features/locations/locationsModels";
import {
  fetchTransferRoutes,
  openDeleteTransferRouteConfirm,
  openEditTransferRouteModal,
} from "@/store/features/transferRoutes/transferRoutesSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  buildGoogleMapsUrl,
  findRouteLocation,
  formatCoordinate,
  getRouteLocationName,
} from "./transferRouteDisplay";

type LocationSummaryProps = {
  label: string;
  location: Location | null;
  name: string;
};

function LocationSummary({ label, location, name }: LocationSummaryProps) {
  return (
    <div className="flex min-w-0 gap-3">
      <span className="mt-1 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#edf8f1] text-transfer-green">
        <MapPin className="h-4 w-4" />
      </span>
      <div className="min-w-0">
        <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#98a2b3]">{label}</p>
        <p className="mt-1 truncate font-bold text-transfer-dark">{name}</p>
        {location?.address && (
          <p className="mt-1 line-clamp-2 text-xs font-medium leading-5 text-[#667085]">
            {location.address}
          </p>
        )}
        {location && (
          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs font-semibold text-[#667085]">
            <span>
              {formatCoordinate(location.latitude)}, {formatCoordinate(location.longitude)}
            </span>
            <a
              href={buildGoogleMapsUrl(location.latitude, location.longitude)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-transfer-green hover:underline"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Map
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export function TransferRoutesTable() {
  const dispatch = useAppDispatch();
  const {
    isDescending,
    items,
    listStatus,
    locationOptions,
    locationOptionsStatus,
    pageNumber,
    pageSize,
    search,
    sortBy,
    totalPages,
    totalRecords,
  } = useAppSelector((state) => state.transferRoutes);

  function fetchPage(targetPage: number) {
    void dispatch(
      fetchTransferRoutes({
        pageNumber: targetPage,
        pageSize,
        search,
        sortBy,
        isDescending,
      })
    );
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1080px] text-left">
          <thead className="bg-[#f8fafb] text-xs font-bold uppercase tracking-[0.08em] text-[#667085]">
            <tr>
              <th className="px-5 py-4">Route</th>
              <th className="px-5 py-4">Origin</th>
              <th className="px-5 py-4">Destination</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {listStatus === "loading" ? (
              <tr>
                <td colSpan={5} className="px-5 py-10 text-center text-sm font-medium text-[#667085]">
                  <Loader2 className="mx-auto mb-3 h-5 w-5 animate-spin text-transfer-green" />
                  Loading transfer routes...
                </td>
              </tr>
            ) : items.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-5 py-10 text-center text-sm font-medium text-[#667085]">
                  No transfer routes found.
                </td>
              </tr>
            ) : (
              items.map((route) => {
                const origin = findRouteLocation(route, locationOptions, "origin");
                const destination = findRouteLocation(route, locationOptions, "destination");
                const originName = getRouteLocationName(route, origin, "origin");
                const destinationName = getRouteLocationName(route, destination, "destination");

                return (
                  <tr key={route.id} className="text-sm font-medium text-transfer-dark">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#edf8f1] text-transfer-green">
                          <Route className="h-5 w-5" />
                        </span>
                        <div className="min-w-0">
                          <p className="max-w-[260px] truncate font-bold">
                            {originName} to {destinationName}
                          </p>
                          {locationOptionsStatus === "loading" && (
                            <p className="mt-1 text-xs font-semibold text-[#98a2b3]">
                              Loading location details...
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="max-w-[300px] px-5 py-4">
                      <LocationSummary label="Origin" location={origin} name={originName} />
                    </td>
                    <td className="max-w-[300px] px-5 py-4">
                      <LocationSummary
                        label="Destination"
                        location={destination}
                        name={destinationName}
                      />
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                          route.isActive
                            ? "bg-[#edf8f1] text-transfer-green"
                            : "bg-gray-100 text-[#667085]"
                        }`}
                      >
                        {route.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() => dispatch(openEditTransferRouteModal(route))}
                          className="inline-flex h-9 items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 text-xs font-bold text-transfer-dark hover:bg-gray-50"
                        >
                          <Edit3 className="h-4 w-4" />
                          Edit
                        </button>
                        <button
                          onClick={() => dispatch(openDeleteTransferRouteConfirm(route))}
                          className="inline-flex h-9 items-center gap-2 rounded-lg border border-red-100 bg-red-50 px-3 text-xs font-bold text-red-700 hover:bg-red-100"
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-3 border-t border-gray-100 p-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-medium text-[#667085]">
          Page {pageNumber} of {totalPages} - {totalRecords} records
        </p>
        <div className="flex gap-2">
          <button
            disabled={pageNumber <= 1 || listStatus === "loading"}
            onClick={() => fetchPage(pageNumber - 1)}
            className="h-9 rounded-lg border border-gray-200 px-4 text-sm font-bold text-transfer-dark disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>
          <button
            disabled={pageNumber >= totalPages || listStatus === "loading"}
            onClick={() => fetchPage(pageNumber + 1)}
            className="h-9 rounded-lg border border-gray-200 px-4 text-sm font-bold text-transfer-dark disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}
