"use client";

import { FormEvent, useState } from "react";
import { ArrowDownAZ, ArrowUpAZ, Search } from "lucide-react";
import {
  fetchTransferRoutes,
  setTransferRoutesSearch,
  setTransferRoutesSort,
} from "@/store/features/transferRoutes/transferRoutesSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export function TransferRoutesToolbar() {
  const dispatch = useAppDispatch();
  const { isDescending, pageSize, search, sortBy } = useAppSelector(
    (state) => state.transferRoutes
  );
  const [searchValue, setSearchValue] = useState(search);

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    dispatch(setTransferRoutesSearch(searchValue));
    void dispatch(fetchTransferRoutes({ pageNumber: 1, pageSize, search: searchValue }));
  }

  function handleSortToggle() {
    const nextIsDescending = !isDescending;
    dispatch(
      setTransferRoutesSort({
        sortBy: "originLocationName",
        isDescending: nextIsDescending,
      })
    );
    void dispatch(
      fetchTransferRoutes({
        pageNumber: 1,
        pageSize,
        search,
        sortBy: "originLocationName",
        isDescending: nextIsDescending,
      })
    );
  }

  return (
    <div className="flex flex-col gap-3 border-b border-gray-100 p-5 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h2 className="text-xl font-bold text-transfer-dark">Transfer Routes</h2>
        <p className="mt-1 text-sm font-medium text-[#667085]">
          Connect pickup and drop-off locations into bookable transfer routes.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <form onSubmit={handleSearch} className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#98a2b3]" />
          <input
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            placeholder="Search routes"
            className="h-10 w-full rounded-lg border border-gray-200 bg-white pl-10 pr-3 text-sm font-medium text-transfer-dark outline-none focus:border-transfer-green focus:ring-2 focus:ring-transfer-green/15 sm:w-[240px]"
          />
        </form>

        <button
          onClick={handleSortToggle}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 text-sm font-bold text-transfer-dark hover:bg-gray-50"
        >
          {isDescending ? <ArrowDownAZ className="h-4 w-4" /> : <ArrowUpAZ className="h-4 w-4" />}
          {sortBy === "originLocationName" && isDescending ? "Origin Z-A" : "Origin A-Z"}
        </button>
      </div>
    </div>
  );
}
