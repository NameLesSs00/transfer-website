"use client";

import { BadgeDollarSign, Edit3, Loader2, Route, Tags, Trash2 } from "lucide-react";
import {
  fetchRoutePricings,
  openDeleteRoutePricingConfirm,
  openEditRoutePricingModal,
} from "@/store/features/routePricings/routePricingsSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  findMatchingTransferRoute,
  findMatchingVehicleCategory,
  formatPrice,
  getRoutePricingRouteLabel,
  getTransferRouteLabel,
} from "./routePricingDisplay";

export function RoutePricingsTable() {
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
    transferRouteOptions,
    transferRouteOptionsStatus,
    vehicleCategoryOptions,
  } = useAppSelector((state) => state.routePricings);

  function fetchPage(targetPage: number) {
    void dispatch(
      fetchRoutePricings({
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
        <table className="w-full min-w-[1040px] text-left">
          <thead className="bg-[#f8fafb] text-xs font-bold uppercase tracking-[0.08em] text-[#667085]">
            <tr>
              <th className="px-5 py-4">Vehicle Category</th>
              <th className="px-5 py-4">Route</th>
              <th className="px-5 py-4">Price</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {listStatus === "loading" ? (
              <tr>
                <td colSpan={5} className="px-5 py-10 text-center text-sm font-medium text-[#667085]">
                  <Loader2 className="mx-auto mb-3 h-5 w-5 animate-spin text-transfer-green" />
                  Loading route pricings...
                </td>
              </tr>
            ) : items.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-5 py-10 text-center text-sm font-medium text-[#667085]">
                  No route pricings found.
                </td>
              </tr>
            ) : (
              items.map((pricing) => {
                const matchedRoute = findMatchingTransferRoute(pricing, transferRouteOptions);
                const matchedCategory = findMatchingVehicleCategory(
                  pricing,
                  vehicleCategoryOptions
                );
                const categoryName =
                  matchedCategory?.name ?? pricing.vehicleCategoryName ?? "Category pending";
                const routeLabel = matchedRoute
                  ? getTransferRouteLabel(matchedRoute)
                  : getRoutePricingRouteLabel(pricing);

                return (
                  <tr key={pricing.id} className="text-sm font-medium text-transfer-dark">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#edf8f1] text-transfer-green">
                          <Tags className="h-5 w-5" />
                        </span>
                        <span className="font-bold">{categoryName}</span>
                      </div>
                    </td>
                    <td className="max-w-[360px] px-5 py-4">
                      <div className="flex items-start gap-3">
                        <span className="mt-1 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#edf8f1] text-transfer-green">
                          <Route className="h-4 w-4" />
                        </span>
                        <div className="min-w-0">
                          <p className="line-clamp-2 font-bold">{routeLabel}</p>
                          {!matchedRoute && transferRouteOptionsStatus === "loading" && (
                            <p className="mt-1 text-xs font-semibold text-[#98a2b3]">
                              Loading route details...
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center gap-2 rounded-full bg-[#f6f8fb] px-3 py-1 text-sm font-bold text-transfer-dark">
                        <BadgeDollarSign className="h-4 w-4 text-transfer-green" />
                        {formatPrice(pricing.price)}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                          pricing.isActive
                            ? "bg-[#edf8f1] text-transfer-green"
                            : "bg-gray-100 text-[#667085]"
                        }`}
                      >
                        {pricing.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() => dispatch(openEditRoutePricingModal(pricing))}
                          className="inline-flex h-9 items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 text-xs font-bold text-transfer-dark hover:bg-gray-50"
                        >
                          <Edit3 className="h-4 w-4" />
                          Edit
                        </button>
                        <button
                          onClick={() => dispatch(openDeleteRoutePricingConfirm(pricing))}
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
