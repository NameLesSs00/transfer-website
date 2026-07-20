"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import { useAppDispatch } from "@/store/hooks";
import { fetchAdminBookings } from "@/store/features/adminBookings/adminBookingsSlice";
import { Button } from "@/components/ui/Button";

export function BookingsToolbar() {
  const dispatch = useAppDispatch();
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = () => {
    // Always reset to page 1 when searching
    void dispatch(fetchAdminBookings({ pageNumber: 1, pageSize: 10, search: searchValue }));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-col">
        <h2 className="text-xl font-bold text-transfer-dark">Bookings Management</h2>
        <p className="text-sm text-transfer-gray">View and manage all customer bookings.</p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search by name or code..."
            className="h-10 w-full sm:w-64 rounded-lg border border-gray-200 bg-white pl-9 pr-4 text-sm text-transfer-dark outline-none focus:border-transfer-green focus:ring-1 focus:ring-transfer-green transition-all"
          />
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleSearch} className="h-10 px-4">
            Search
          </Button>
        </div>
      </div>
    </div>
  );
}
