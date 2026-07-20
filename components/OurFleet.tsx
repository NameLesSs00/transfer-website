"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Users, Briefcase, Wind, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Loader2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchVehicles } from "@/store/features/vehicles/vehiclesSlice";
import { fetchVehicleCategories } from "@/store/features/vehicleCategories/vehicleCategoriesSlice";
import { hydrateAuth } from "@/store/features/auth/authSlice";
import { buildVehicleImageUrl } from "@/components/admin/vehicles/vehicleDisplay";

export function OurFleet() {
  const [activeFilter, setActiveFilter] = useState("All Vehicle");
  const dispatch = useAppDispatch();
  const { hydrated } = useAppSelector((state) => state.auth);
  const { items: vehicles, listStatus, totalPages } = useAppSelector((state) => state.vehicles);
  const { items: categories, listStatus: categoriesStatus } = useAppSelector((state) => state.vehicleCategories);

  useEffect(() => {
    dispatch(hydrateAuth());
  }, [dispatch]);

  useEffect(() => {
    if (!hydrated) return;
    dispatch(fetchVehicles({ pageNumber: 1, pageSize: 100 }));
    dispatch(fetchVehicleCategories({ pageNumber: 1, pageSize: 100 }));
  }, [dispatch, hydrated]);

  const displayVehicles = activeFilter === "All Vehicle" 
    ? vehicles 
    : vehicles.filter((v) => v.vehicleCategoryName === activeFilter);

  const filters = ["All Vehicle", ...categories.map(c => c.name).filter(Boolean)];

  return (
    <section className="w-full bg-white py-12 md:py-16 px-6 md:px-12 lg:px-24 min-h-screen">
      <div className="max-w-6xl mx-auto flex flex-col gap-10">
        
        {/* Header Section */}
        <motion.div 
          className="flex flex-col items-center gap-2 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-transfer-dark">Our Fleet</h1>
          <p className="text-base md:text-lg text-transfer-gray">Choose Perfect vehicle for your transfer</p>
        </motion.div>

        {/* Category Filters */}
        {categories.length > 0 && (
          <motion.div 
            className="flex overflow-x-auto gap-4 snap-x pb-4 justify-start lg:justify-center [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: "none" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`flex-none snap-center px-8 py-3 rounded-full font-medium text-sm md:text-base transition-all duration-300 ${
                  activeFilter === filter
                    ? "bg-transfer-dark text-white shadow-md"
                    : "border border-gray-300 bg-white text-transfer-dark hover:border-transfer-dark"
                }`}
              >
                {filter}
              </button>
            ))}
          </motion.div>
        )}

        {/* Vehicle List */}
        <div className="flex flex-col gap-10">
          {listStatus === "loading" && (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-transfer-green" />
            </div>
          )}
          
          {listStatus !== "loading" && displayVehicles.length === 0 && (
            <div className="text-center py-12 text-transfer-gray">
              No vehicles available in the fleet at the moment.
            </div>
          )}

          {displayVehicles.map((vehicle, index) => (
            <motion.div
              key={index} // Using index to avoid exposing IDs as requested, though React key doesn't expose it to DOM directly, it's safer against potential ID rendering bugs
              className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden flex flex-col lg:flex-row p-6 md:p-8 lg:p-10 gap-8 lg:gap-12 items-center hover:shadow-lg transition-shadow duration-300"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Image Side */}
              <div className="w-full lg:w-[45%] relative h-[250px] md:h-[300px] lg:h-[350px] flex-shrink-0 flex items-center justify-center bg-[#fbf5f0] rounded-xl p-4">
                {vehicle.imageUrl ? (
                  <Image
                    src={buildVehicleImageUrl(vehicle.imageUrl)}
                    alt={vehicle.name}
                    fill
                    draggable={false}
                    className="object-contain p-4"
                    sizes="(max-width: 1024px) 100vw, 45vw"
                  />
                ) : (
                  <span className="text-sm text-transfer-gray">No Image Available</span>
                )}
              </div>

              {/* Content Side */}
              <div className="w-full lg:w-[55%] flex flex-col gap-6">
                
                {/* Title & Subtitle */}
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h2 className="text-2xl md:text-3xl font-bold text-transfer-dark">{vehicle.name}</h2>
                    {vehicle.vehicleCategoryName && (
                      <span className="rounded-full bg-[#e8f8ee] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#3aa765]">
                        {vehicle.vehicleCategoryName}
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-medium text-transfer-green mt-1">{vehicle.model} - {vehicle.year}</p>
                </div>

                {/* Icons Row */}
                <div className="flex items-center justify-between border-t border-b border-gray-100 py-4">
                  <div className="flex flex-col items-center gap-2 w-1/3 text-center border-r border-gray-100">
                    <Users className="w-5 h-5 text-gray-400" />
                    <div className="flex flex-col">
                      <span className="text-[10px] md:text-xs text-gray-400 uppercase tracking-wider">Passengers</span>
                      <span className="text-sm md:text-base font-bold text-transfer-dark">Up to {vehicle.capacity}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-2 w-1/3 text-center border-r border-gray-100">
                    <Briefcase className="w-5 h-5 text-gray-400" />
                    <div className="flex flex-col">
                      <span className="text-[10px] md:text-xs text-gray-400 uppercase tracking-wider">Luggage</span>
                      <span className="text-sm md:text-base font-bold text-transfer-dark">Standard</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-2 w-1/3 text-center">
                    <Wind className="w-5 h-5 text-gray-400" />
                    <div className="flex flex-col">
                      <span className="text-[10px] md:text-xs text-gray-400 uppercase tracking-wider">Conditioned</span>
                      <span className="text-sm md:text-base font-bold text-transfer-dark">Air Con</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm md:text-base text-transfer-gray leading-relaxed">
                  Experience a premium transfer in our {vehicle.name}. Enjoy a comfortable and reliable journey with professional drivers and top-tier amenities.
                </p>

                {/* Book Now Button */}
                <Link href="/cities" className="mt-2 w-full rounded-full bg-transfer-dark py-4 text-center text-base font-bold text-white shadow-md transition-transform duration-200 hover:scale-[1.02] hover:bg-[#182634] hover:shadow-lg active:scale-[0.98]">
                  Select Destination & Book
                </Link>

              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div 
            className="flex items-center justify-center gap-2 mt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-transfer-dark hover:bg-gray-50 transition-colors">
              <ChevronsLeft className="w-4 h-4" />
            </button>
            <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-transfer-dark hover:bg-gray-50 transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="w-10 h-10 rounded-full bg-transfer-dark text-white font-medium flex items-center justify-center shadow-sm">
              1
            </button>
            <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-transfer-dark hover:bg-gray-50 transition-colors font-medium">
              2
            </button>
            <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-transfer-dark hover:bg-gray-50 transition-colors font-medium">
              3
            </button>
            <span className="w-10 h-10 flex items-center justify-center text-transfer-gray">...</span>
            <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-transfer-dark hover:bg-gray-50 transition-colors font-medium">
              10
            </button>
            <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-transfer-dark hover:bg-gray-50 transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
            <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-transfer-dark hover:bg-gray-50 transition-colors">
              <ChevronsRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}

      </div>
    </section>
  );
}
