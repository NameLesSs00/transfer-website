"use client";

import React, { useState, useEffect } from "react";
import { Button } from "./ui/Button";
import { Calendar, Clock, Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchPerJourneys } from "@/store/features/perJourneys/perJourneysSlice";

export function BookingForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { items: journeys } = useAppSelector((state) => state.perJourneys);

  // Form State
  const [passengers, setPassengers] = useState(2);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const incrementPassengers = () => setPassengers((prev) => prev + 1);
  const decrementPassengers = () => setPassengers((prev) => (prev > 1 ? prev - 1 : 1));

  // Fetch unique locations on mount
  useEffect(() => {
    dispatch(fetchPerJourneys({ pageNumber: 1, pageSize: 100 }));
  }, [dispatch]);

  const uniqueFroms = Array.from(new Set(journeys.map(j => j.fromLocation?.name).filter(Boolean)));
  const uniqueTos = Array.from(new Set(journeys.map(j => j.toLocation?.name).filter(Boolean)));

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (from) params.set("from", from);
    if (to) params.set("to", to);
    if (date) params.set("date", date);
    if (time) params.set("time", time);
    params.set("passengers", passengers.toString());

    router.push(`/cities?${params.toString()}`);
  };

  return (
    <div className="w-full rounded-2xl bg-white p-6 shadow-[0_18px_50px_rgba(14,24,33,0.18)] md:p-8">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-transfer-dark mb-8">
        Where are you going?
      </h2>

      <form className="flex flex-col gap-5" onSubmit={handleSearch}>
        {/* Pick up */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-transfer-dark">Pick up</label>
          <div className="relative">
            <select
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="h-12 w-full appearance-none rounded-xl border border-transfer-green/40 bg-white px-4 text-transfer-dark transition-colors focus:border-transfer-green focus:outline-none focus:ring-1 focus:ring-transfer-green"
              required
            >
              <option value="" disabled>Select pickup location</option>
              {uniqueFroms.map((loc) => (
                <option key={loc} value={loc as string}>
                  {loc}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Drop-off */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-transfer-dark">Drop-off</label>
          <div className="relative">
            <select
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="h-12 w-full appearance-none rounded-xl border border-transfer-green/40 bg-white px-4 text-transfer-dark transition-colors focus:border-transfer-green focus:outline-none focus:ring-1 focus:ring-transfer-green"
              required
            >
              <option value="" disabled>Select drop-off location</option>
              {uniqueTos.map((loc) => (
                <option key={loc} value={loc as string}>
                  {loc}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Date */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-transfer-dark">Date</label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <Calendar className="w-4 h-4 text-gray-500" />
              </div>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="h-12 w-full rounded-xl border border-transfer-green/40 bg-white pl-10 pr-4 text-transfer-dark transition-colors focus:border-transfer-green focus:outline-none focus:ring-1 focus:ring-transfer-green"
              />
            </div>
          </div>

          {/* Time */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-transfer-dark">Time</label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <Clock className="w-4 h-4 text-gray-500" />
              </div>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="h-12 w-full rounded-xl border border-transfer-green/40 bg-white pl-10 pr-4 text-transfer-dark transition-colors focus:border-transfer-green focus:outline-none focus:ring-1 focus:ring-transfer-green"
              />
            </div>
          </div>
        </div>

        {/* Passengers */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-transfer-dark">Passengers</label>
          <div className="flex items-center justify-between mt-1 rounded-xl border border-transfer-green/40 bg-white px-4 h-12">
            <button
              type="button"
              onClick={decrementPassengers}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-transfer-dark transition-colors hover:bg-gray-200"
              aria-label="Decrease passengers"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="text-lg font-medium text-transfer-dark w-8 text-center">
              {passengers}
            </span>
            <button
              type="button"
              onClick={incrementPassengers}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-transfer-green text-white transition-colors hover:bg-transfer-green/90"
              aria-label="Increase passengers"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Search Button */}
        <div className="mt-4">
          <Button className="w-full text-lg py-4">Search Transfers</Button>
        </div>
      </form>
    </div>
  );
}
