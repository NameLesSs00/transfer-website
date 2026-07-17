"use client";

import { CarFront, Edit3, Loader2, Trash2 } from "lucide-react";
import {
  fetchVehicles,
  openDeleteVehicleConfirm,
  openEditVehicleModal,
} from "@/store/features/vehicles/vehiclesSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  buildVehicleImageUrl,
  getVehicleCategoryLabel,
  getVehicleFactoryLabel,
} from "./vehicleDisplay";

export function VehiclesTable() {
  const dispatch = useAppDispatch();
  const {
    isDescending,
    items,
    listStatus,
    pageNumber,
    pageSize,
    search,
    sortBy,
    totalPages,
    totalRecords,
  } = useAppSelector((state) => state.vehicles);

  function fetchPage(targetPage: number) {
    void dispatch(
      fetchVehicles({
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
              <th className="px-5 py-4">Vehicle</th>
              <th className="px-5 py-4">Model / Year</th>
              <th className="px-5 py-4">Plate</th>
              <th className="px-5 py-4">Capacity</th>
              <th className="px-5 py-4">Category</th>
              <th className="px-5 py-4">Factory</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {listStatus === "loading" ? (
              <tr>
                <td colSpan={8} className="px-5 py-10 text-center text-sm font-medium text-[#667085]">
                  <Loader2 className="mx-auto mb-3 h-5 w-5 animate-spin text-transfer-green" />
                  Loading vehicles...
                </td>
              </tr>
            ) : items.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-5 py-10 text-center text-sm font-medium text-[#667085]">
                  No vehicles found.
                </td>
              </tr>
            ) : (
              items.map((vehicle) => {
                const imageUrl = buildVehicleImageUrl(vehicle.imageUrl);

                return (
                  <tr key={vehicle.id} className="text-sm font-medium text-transfer-dark">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <span className="flex h-12 w-16 items-center justify-center overflow-hidden rounded-lg bg-[#edf8f1] text-transfer-green">
                          {imageUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={imageUrl}
                              alt={vehicle.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <CarFront className="h-5 w-5" />
                          )}
                        </span>
                        <span className="font-bold">{vehicle.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-[#667085]">
                      {vehicle.model} / {vehicle.year}
                    </td>
                    <td className="px-5 py-4 text-[#667085]">{vehicle.licensePlate}</td>
                    <td className="px-5 py-4 text-[#667085]">{vehicle.capacity}</td>
                    <td className="px-5 py-4">
                      <span className="inline-flex rounded-full bg-[#edf8f1] px-3 py-1 text-xs font-bold text-transfer-green">
                        {getVehicleCategoryLabel(vehicle)}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-[#667085]">{getVehicleFactoryLabel(vehicle)}</td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                          vehicle.isActive
                            ? "bg-[#edf8f1] text-transfer-green"
                            : "bg-gray-100 text-[#667085]"
                        }`}
                      >
                        {vehicle.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() => dispatch(openEditVehicleModal(vehicle))}
                          className="inline-flex h-9 items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 text-xs font-bold text-transfer-dark hover:bg-gray-50"
                        >
                          <Edit3 className="h-4 w-4" />
                          Edit
                        </button>
                        <button
                          onClick={() => dispatch(openDeleteVehicleConfirm(vehicle))}
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
