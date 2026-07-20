"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Car,
  ChevronRight,
  Loader2,
  ArrowRight,
  ArrowDown
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchTransferRoutes } from "@/store/features/transferRoutes/transferRoutesSlice";
import { fetchRoutePricings } from "@/store/features/routePricings/routePricingsSlice";
import { fetchLocations } from "@/store/features/locations/locationsSlice";
import { hydrateAuth } from "@/store/features/auth/authSlice";

// Dynamically import the map component since Leaflet requires the window object
const RouteMap = dynamic(() => import("./RouteMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[400px] flex items-center justify-center bg-gray-100 rounded-2xl border border-gray-200">
      <Loader2 className="w-8 h-8 animate-spin text-transfer-green" />
    </div>
  ),
});

export function OurRoutesPage() {
  const dispatch = useAppDispatch();
  const { hydrated } = useAppSelector((state) => state.auth);
  const { items: routes, listStatus: routesStatus } = useAppSelector((state) => state.transferRoutes);
  const { items: pricings, listStatus: pricingsStatus } = useAppSelector((state) => state.routePricings);
  const { items: locations, listStatus: locationsStatus } = useAppSelector((state) => state.locations);

  const [selectedRouteId, setSelectedRouteId] = useState<number | null>(null);

  // Hydrate auth first
  useEffect(() => {
    dispatch(hydrateAuth());
  }, [dispatch]);

  // Fetch data once auth is hydrated
  useEffect(() => {
    if (!hydrated) return;
    dispatch(fetchTransferRoutes({ pageNumber: 1, pageSize: 100 }));
    dispatch(fetchRoutePricings({ pageNumber: 1, pageSize: 100 }));
    dispatch(fetchLocations({ pageNumber: 1, pageSize: 100 }));
  }, [dispatch, hydrated]);

  const isLoading =
    routesStatus === "loading" ||
    pricingsStatus === "loading" ||
    locationsStatus === "loading";

  // Filter out routes that are inactive
  const activeRoutes = routes.filter((r) => r.isActive);

  // Filter routes to those that have active pricings
  const routesWithPricings = activeRoutes.filter((route) => {
    return pricings.some(
      (p) =>
        p.isActive &&
        p.locationFrom === route.originLocationName &&
        p.locationTo === route.destinationLocationName
    );
  });

  // Select the first valid route by default
  useEffect(() => {
    if (routesWithPricings.length > 0 && !selectedRouteId) {
      setSelectedRouteId(routesWithPricings[0].id);
    }
  }, [routesWithPricings, selectedRouteId]);

  const selectedRoute = routesWithPricings.find((r) => r.id === selectedRouteId);

  // Get prices for the currently selected route
  const currentPricings = selectedRoute
    ? pricings.filter(
        (p) =>
          p.isActive &&
          p.locationFrom === selectedRoute.originLocationName &&
          p.locationTo === selectedRoute.destinationLocationName
      )
    : [];

  // Map route locations to coordinates
  const originLocation = selectedRoute
    ? locations.find((l) => l.name === selectedRoute.originLocationName)
    : null;

  const destinationLocation = selectedRoute
    ? locations.find((l) => l.name === selectedRoute.destinationLocationName)
    : null;

  const originCoords = originLocation
    ? { name: originLocation.name, lat: originLocation.latitude, lng: originLocation.longitude }
    : null;

  const destinationCoords = destinationLocation
    ? { name: destinationLocation.name, lat: destinationLocation.latitude, lng: destinationLocation.longitude }
    : null;

  return (
    <div className="w-full min-h-screen bg-[#f8fafc] flex flex-col">
      {/* ── 1. Simple Hero ────────────────────────────────────────────── */}
      <section className="bg-transfer-dark text-white pt-16 pb-12 px-6 md:px-12 lg:px-24">
        <div className="max-w-[1400px] mx-auto">
          <motion.h1
            className="text-4xl md:text-5xl font-bold leading-tight mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Transfer Routes
          </motion.h1>
          <motion.p
            className="text-gray-300 max-w-2xl text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Explore our vast network of transfer routes. Select a route to view it on the map and check available pricing for our fleet.
          </motion.p>
        </div>
      </section>

      {/* ── 2. Split Content ────────────────────────────────────────── */}
      <section className="flex-1 w-full max-w-[1400px] mx-auto px-4 md:px-12 lg:px-24 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 h-full">
          
          {/* Left Column: Route List */}
          <div className="w-full lg:w-2/5 flex flex-col">
            <h2 className="text-xl font-bold text-transfer-dark mb-6 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-transfer-green" />
              Available Routes
            </h2>
            
            <div className="flex-1 overflow-y-auto px-1 pb-6 space-y-4 max-h-[600px] lg:max-h-[800px] custom-scrollbar">
              {isLoading && !routesWithPricings.length ? (
                <div className="py-12 flex justify-center">
                  <Loader2 className="w-8 h-8 animate-spin text-transfer-green" />
                </div>
              ) : routesWithPricings.length === 0 ? (
                <div className="py-8 text-center text-transfer-gray bg-white rounded-xl border border-gray-200">
                  No active routes with pricing available.
                </div>
              ) : (
                routesWithPricings.map((route, i) => (
                  <motion.button
                    key={route.id}
                    onClick={() => setSelectedRouteId(route.id)}
                    className={`w-full text-left group relative rounded-2xl p-5 cursor-pointer focus:outline-none transition-all duration-300 ${
                      selectedRouteId === route.id
                        ? "bg-white border-2 border-transfer-dark shadow-xl scale-[1.02] z-10"
                        : "bg-white border-2 border-transparent shadow-sm hover:border-transfer-green/30 hover:shadow-md"
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                  >
                    <div className="flex flex-col gap-3">
                      <div className="flex items-start gap-4">
                        <div className="flex flex-col items-center mt-1">
                          <div className={`w-3 h-3 rounded-full border-2 ${selectedRouteId === route.id ? 'border-transfer-dark bg-transfer-green' : 'border-gray-400 bg-white'}`}></div>
                          <div className={`w-0.5 h-8 my-1 ${selectedRouteId === route.id ? 'bg-transfer-dark' : 'bg-gray-200'}`}></div>
                          <div className={`w-3 h-3 rounded-full border-2 ${selectedRouteId === route.id ? 'border-transfer-dark bg-transfer-green' : 'border-gray-400 bg-white'}`}></div>
                        </div>
                        
                        <div className="flex flex-col justify-between flex-1 gap-4">
                          <div>
                            <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400 block mb-0.5">Origin</span>
                            <span className={`font-bold text-[15px] block ${selectedRouteId === route.id ? 'text-transfer-dark' : 'text-gray-700'}`}>
                              {route.originLocationName}
                            </span>
                          </div>
                          <div>
                            <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400 block mb-0.5">Destination</span>
                            <span className={`font-bold text-[15px] block ${selectedRouteId === route.id ? 'text-transfer-dark' : 'text-gray-700'}`}>
                              {route.destinationLocationName}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-center h-full my-auto ml-2">
                           <ChevronRight className={`w-5 h-5 transition-transform ${selectedRouteId === route.id ? 'text-transfer-dark translate-x-1' : 'text-gray-300 group-hover:text-transfer-green'}`} />
                        </div>
                      </div>
                    </div>
                  </motion.button>
                ))
              )}
            </div>
          </div>

          {/* Right Column: Map & Pricing */}
          <div className="w-full lg:w-3/5 flex flex-col gap-8">
            {/* Map Container */}
            <div className="w-full h-[400px] lg:h-[500px] rounded-2xl relative shadow-md">
               <RouteMap origin={originCoords} destination={destinationCoords} />
            </div>

            {/* Pricing Section */}
            {selectedRoute && (
              <div className="w-full flex flex-col">
                <div className="flex items-center justify-between mb-6">
                   <h3 className="text-2xl font-bold text-transfer-dark">Route Pricing</h3>
                   <div className="bg-transfer-dark text-white px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full">
                     {currentPricings.length} Options
                   </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {currentPricings.map((pricing, i) => (
                    <motion.div
                      key={pricing.id}
                      className="group flex flex-col bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden border border-gray-100"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.05 }}
                    >
                      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-transfer-green/10 to-transparent rounded-bl-full -z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      <div className="flex items-center gap-4 mb-6 relative z-10">
                        <div className="p-3.5 bg-gray-50 rounded-xl text-transfer-green group-hover:bg-transfer-light-green transition-colors duration-300">
                          <Car className="w-6 h-6" />
                        </div>
                        <span className="font-extrabold text-lg text-transfer-dark">
                          {pricing.vehicleCategoryName || "Standard Class"}
                        </span>
                      </div>
                      
                      <div className="mt-auto pt-5 border-t border-gray-100 flex items-center justify-between relative z-10">
                        <div className="flex flex-col">
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Fixed Trip Price</span>
                          <span className="text-3xl font-black text-transfer-dark group-hover:text-transfer-green transition-colors duration-300">€{pricing.price}</span>
                        </div>
                        <button 
                          className="px-6 py-3 rounded-xl font-bold text-sm bg-transfer-green text-white shadow-lg hover:bg-transfer-dark transition-colors"
                          onClick={() => alert("Booking functionality for route pricings is under construction.")}
                        >
                          Book Now
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {currentPricings.length === 0 && (
                  <div className="text-center py-8 text-gray-500 bg-white rounded-2xl border border-gray-100">
                    No pricing categories found for this route.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Custom Scrollbar Styles for the route list */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #cbd5e1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #94a3b8;
        }
      `}} />
    </div>
  );
}
