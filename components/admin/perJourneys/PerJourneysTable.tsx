"use client";

import { BadgeDollarSign, CarFront, Edit3, Loader2, MapPinned, Trash2 } from "lucide-react";
import {
  fetchPerJourneys,
  openDeletePerJourneyConfirm,
  openEditPerJourneyModal,
} from "@/store/features/perJourneys/perJourneysSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  formatPerJourneyPrice,
  getPerJourneyFromName,
  getPerJourneyToName,
  getPerJourneyVehicleCategoryLabel,
  getPerJourneyVehicleLabel,
} from "./perJourneyDisplay";

export function PerJourneysTable() {
  const dispatch = useAppDispatch();
  const {
    isDescending,
    items,
    listStatus,
    locationJourneyOptions,
    pageNumber,
    pageSize,
    search,
    sortBy,
    totalPages,
    totalRecords,
    vehicleOptions,
  } = useAppSelector((state) => state.perJourneys);

  function fetchPage(targetPage: number) {
    void dispatch(
      fetchPerJourneys({
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
      <div className="flex-1 overflow-x-auto">
        <table className="w-full min-w-[1120px] text-left">
          <thead className="bg-[#fbfaf8] text-xs font-bold uppercase tracking-[0.08em] text-[#667085]">
            <tr>
              <th className="px-5 py-4">ID</th>
              <th className="px-5 py-4">From Location Journey</th>
              <th className="px-5 py-4">To Location Journey</th>
              <th className="px-5 py-4">Vehicle</th>
              <th className="px-5 py-4">Price</th>
              <th className="px-5 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {listStatus === "loading" ? (
              <tr>
                <td colSpan={6} className="px-5 py-10 text-center text-sm font-medium text-[#667085]">
                  <Loader2 className="mx-auto mb-3 h-5 w-5 animate-spin text-transfer-green" />
                  Loading per journeys...
                </td>
              </tr>
            ) : items.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-5 py-10 text-center text-sm font-medium text-[#667085]">
                  No per journeys found.
                </td>
              </tr>
            ) : (
              items.map((perJourney) => {
                const vehicleCategoryLabel = getPerJourneyVehicleCategoryLabel(perJourney);

                return (
                  <tr key={perJourney.id} className="text-sm font-medium text-transfer-dark">
                    <td className="px-5 py-4 text-[#667085]">#{perJourney.id}</td>
                    <td className="max-w-[240px] px-5 py-4">
                      <div className="flex items-start gap-3">
                        <span className="mt-1 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#fbf5f0] text-transfer-green">
                          <MapPinned className="h-4 w-4" />
                        </span>
                        <p className="line-clamp-2 font-bold">
                          {getPerJourneyFromName(perJourney, locationJourneyOptions)}
                        </p>
                      </div>
                    </td>
                    <td className="max-w-[240px] px-5 py-4">
                      <div className="flex items-start gap-3">
                        <span className="mt-1 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#fbf5f0] text-transfer-green">
                          <MapPinned className="h-4 w-4" />
                        </span>
                        <p className="line-clamp-2 font-bold">
                          {getPerJourneyToName(perJourney, locationJourneyOptions)}
                        </p>
                      </div>
                    </td>
                    <td className="max-w-[280px] px-5 py-4">
                      <div className="flex items-start gap-3">
                        <span className="mt-1 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#fbf5f0] text-transfer-green">
                          <CarFront className="h-4 w-4" />
                        </span>
                        <div className="min-w-0">
                          <p className="line-clamp-2 font-bold">
                            {getPerJourneyVehicleLabel(perJourney, vehicleOptions)}
                          </p>
                          {vehicleCategoryLabel && (
                            <p className="mt-1 text-xs font-semibold text-[#667085]">
                              {vehicleCategoryLabel}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center gap-2 rounded-full bg-[#fbfaf8] px-3 py-1 text-sm font-bold text-transfer-dark">
                        <BadgeDollarSign className="h-4 w-4 text-transfer-green" />
                        {formatPerJourneyPrice(perJourney.price)}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() => dispatch(openEditPerJourneyModal(perJourney))}
                          className="inline-flex h-9 items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 text-xs font-bold text-transfer-dark hover:bg-gray-50"
                        >
                          <Edit3 className="h-4 w-4" />
                          Edit
                        </button>
                        <button
                          onClick={() => dispatch(openDeletePerJourneyConfirm(perJourney))}
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
