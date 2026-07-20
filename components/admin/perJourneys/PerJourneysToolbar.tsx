"use client";

import { FormEvent, useState } from "react";
import { ArrowDownAZ, ArrowUpAZ, Search } from "lucide-react";
import {
  fetchPerJourneys,
  setPerJourneysSearch,
  setPerJourneysSort,
} from "@/store/features/perJourneys/perJourneysSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export function PerJourneysToolbar() {
  const dispatch = useAppDispatch();
  const { isDescending, pageSize, search, sortBy } = useAppSelector(
    (state) => state.perJourneys
  );
  const [searchValue, setSearchValue] = useState(search);

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    dispatch(setPerJourneysSearch(searchValue));
    void dispatch(fetchPerJourneys({ pageNumber: 1, pageSize, search: searchValue }));
  }

  function handleSortToggle() {
    const nextIsDescending = !isDescending;
    dispatch(setPerJourneysSort({ sortBy: "price", isDescending: nextIsDescending }));
    void dispatch(
      fetchPerJourneys({
        pageNumber: 1,
        pageSize,
        search,
        sortBy: "price",
        isDescending: nextIsDescending,
      })
    );
  }

  return (
    <div className="flex flex-col gap-3 border-b border-gray-100 p-5 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h2 className="text-xl font-bold text-transfer-dark">Per Journeys</h2>
        <p className="mt-1 text-sm font-medium text-[#667085]">
          Price journey-to-journey services by vehicle.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <form onSubmit={handleSearch} className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#98a2b3]" />
          <input
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            placeholder="Search per journeys"
            className="h-10 w-full rounded-lg border border-gray-200 bg-white pl-10 pr-3 text-sm font-medium text-transfer-dark outline-none focus:border-transfer-green focus:ring-2 focus:ring-transfer-green/15 sm:w-[240px]"
          />
        </form>

        <button
          onClick={handleSortToggle}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 text-sm font-bold text-transfer-dark hover:bg-gray-50"
        >
          {isDescending ? <ArrowDownAZ className="h-4 w-4" /> : <ArrowUpAZ className="h-4 w-4" />}
          {sortBy === "price" && isDescending ? "Price High-Low" : "Price Low-High"}
        </button>
      </div>
    </div>
  );
}
