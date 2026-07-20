"use client";

import React, { useState } from "react";
import { Button } from "./ui/Button";
import { Calendar, Clock, Minus, Plus } from "lucide-react";

export function BookingForm() {
  const [passengers, setPassengers] = useState(1);

  const incrementPassengers = () => setPassengers(prev => prev + 1);
  const decrementPassengers = () => setPassengers(prev => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="w-full rounded-2xl bg-white p-6 shadow-[0_18px_50px_rgba(14,24,33,0.18)] md:p-8">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-transfer-dark mb-8">
        Where are you going?
      </h2>

      <form className="flex flex-col gap-5">
        {/* Pick up */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-transfer-dark">Pick up</label>
          <div className="relative">
            <select className="h-12 w-full appearance-none rounded-xl border border-transfer-green/40 bg-white px-4 text-transfer-dark transition-colors focus:border-transfer-green focus:outline-none focus:ring-1 focus:ring-transfer-green">
              <option value="hurghada">Hurghada airport</option>
              <option value="cairo">Cairo airport</option>
              <option value="sharm">Sharm El Sheikh airport</option>
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
            <select className="h-12 w-full appearance-none rounded-xl border border-transfer-green/40 bg-white px-4 text-transfer-dark transition-colors focus:border-transfer-green focus:outline-none focus:ring-1 focus:ring-transfer-green">
              <option value="el-gouna">El Gouna</option>
              <option value="makadi">Makadi Bay</option>
              <option value="sahl-hasheesh">Sahl Hasheesh</option>
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
                className="h-12 w-full rounded-xl border border-transfer-green/40 bg-white pl-10 pr-4 text-transfer-dark transition-colors focus:border-transfer-green focus:outline-none focus:ring-1 focus:ring-transfer-green"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Passengers */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-transfer-dark">Passengers</label>
            <div className="flex items-center gap-4 mt-1">
              <button 
                type="button" 
                onClick={decrementPassengers}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-transfer-green text-white transition-colors hover:bg-[#ad743a]"
                aria-label="Decrease passengers"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-lg font-medium text-transfer-dark min-w-[1ch] text-center">
                {passengers}
              </span>
              <button 
                type="button" 
                onClick={incrementPassengers}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-transfer-green text-white transition-colors hover:bg-[#ad743a]"
                aria-label="Increase passengers"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Vehicle Type */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-transfer-dark">Vehicle Type</label>
            <div className="relative">
              <select defaultValue="select" className="h-12 w-full appearance-none rounded-xl border border-transfer-green/40 bg-white px-4 text-transfer-dark transition-colors focus:border-transfer-green focus:outline-none focus:ring-1 focus:ring-transfer-green">
                <option value="select" disabled>select</option>
                <option value="sedan">Sedan</option>
                <option value="suv">SUV</option>
                <option value="van">Van</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Search Button */}
        <div className="mt-4">
          <Button className="w-full text-lg py-4">Search</Button>
        </div>
      </form>
    </div>
  );
}
