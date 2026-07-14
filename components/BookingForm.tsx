"use client";

import React, { useState } from "react";
import { Button } from "./ui/Button";
import { Calendar, Clock, Minus, Plus } from "lucide-react";

export function BookingForm() {
  const [passengers, setPassengers] = useState(1);

  const incrementPassengers = () => setPassengers(prev => prev + 1);
  const decrementPassengers = () => setPassengers(prev => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 w-full shadow-lg">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-transfer-dark mb-8">
        Where are you going?
      </h2>

      <form className="flex flex-col gap-5">
        {/* Pick up */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-transfer-dark">Pick up</label>
          <div className="relative">
            <select className="w-full h-12 px-4 rounded-xl border border-gray-300 appearance-none bg-white focus:outline-none focus:border-transfer-green focus:ring-1 focus:ring-transfer-green transition-colors text-transfer-dark">
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
            <select className="w-full h-12 px-4 rounded-xl border border-gray-300 appearance-none bg-white focus:outline-none focus:border-transfer-green focus:ring-1 focus:ring-transfer-green transition-colors text-transfer-dark">
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
                className="w-full h-12 pl-10 pr-4 rounded-xl border border-gray-300 bg-white focus:outline-none focus:border-transfer-green focus:ring-1 focus:ring-transfer-green transition-colors text-transfer-dark"
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
                className="w-full h-12 pl-10 pr-4 rounded-xl border border-gray-300 bg-white focus:outline-none focus:border-transfer-green focus:ring-1 focus:ring-transfer-green transition-colors text-transfer-dark"
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
                className="w-8 h-8 rounded-full bg-transfer-green text-white flex items-center justify-center hover:bg-[#3d8525] transition-colors"
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
                className="w-8 h-8 rounded-full bg-transfer-green text-white flex items-center justify-center hover:bg-[#3d8525] transition-colors"
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
              <select defaultValue="select" className="w-full h-12 px-4 rounded-xl border border-gray-300 appearance-none bg-white focus:outline-none focus:border-transfer-green focus:ring-1 focus:ring-transfer-green transition-colors text-transfer-dark">
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
