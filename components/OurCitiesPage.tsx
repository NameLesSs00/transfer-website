"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Plane,
  CalendarDays,
  Users,
  ChevronRight,
  Check,
  CalendarCheck,
  DollarSign,
  User,
  PhoneCall,
  Star,
  Luggage,
  AirVent,
} from "lucide-react";
import { Button } from "./ui/Button";

/* ─── Data ─────────────────────────────────────────────────────────── */
const cities = [
  {
    id: "hurghada",
    name: "Hurghada",
    price: "$10.00",
    image: "/ourCities/Hurghada.jpg",
    description:
      "Hurghada is one of the most popular destinations on the Red Sea. We provide reliable and comfortable airport transfers from Hurghada Airport to all hotels and resorts in Hurghada.",
    destinations: [
      { name: "Soma Bay", km: 24 },
      { name: "Sahl Hasheesh", km: 27 },
      { name: "El Gouna", km: 25 },
      { name: "Makadi Bay", km: 34 },
    ],
  },
  {
    id: "soma-bay",
    name: "Soma Bay",
    price: "$18.00",
    image: "/ourCities/SomaBay.png",
    description:
      "Soma Bay is an exclusive peninsula resort area located 45 km south of Hurghada. Known for its crystal clear waters and world-class resorts, we provide seamless transfers to all properties.",
    destinations: [
      { name: "Hurghada", km: 45 },
      { name: "Sahl Hasheesh", km: 18 },
      { name: "El Gouna", km: 70 },
      { name: "Makadi Bay", km: 12 },
    ],
  },
  {
    id: "sahl-hasheesh",
    name: "Sahl Hasheesh",
    price: "$15.00",
    image: "/ourCities/SahlHasheesh.png",
    description:
      "Sahl Hasheesh is a planned resort town located 18 km south of Hurghada. It features beautiful beaches and luxurious hotels, all easily accessible with our professional transfer service.",
    destinations: [
      { name: "Hurghada", km: 18 },
      { name: "Soma Bay", km: 27 },
      { name: "El Gouna", km: 43 },
      { name: "Makadi Bay", km: 16 },
    ],
  },
  {
    id: "el-gouna",
    name: "El Gouna",
    price: "$12.00",
    image: "/ourCities/ElGouna.png",
    description:
      "El Gouna is a self-contained resort town located 22 km north of Hurghada. This unique lagoon city offers a tranquil escape, and our drivers know every corner of it.",
    destinations: [
      { name: "Hurghada", km: 22 },
      { name: "Soma Bay", km: 65 },
      { name: "Sahl Hasheesh", km: 40 },
      { name: "Makadi Bay", km: 56 },
    ],
  },
];

const vehicles = [
  { type: "Private Car", badge: "PRIVATE", passengers: 3, luggage: 3, price: "$10.00" },
  { type: "Private Limousine", badge: "PRIVATE", passengers: 3, luggage: 3, price: "$10.00" },
  { type: "Private Limousine", badge: "PRIVATE", passengers: 3, luggage: 3, price: "$10.00" },
];

const features = [
  { icon: CalendarCheck, title: "Easy Booking", desc: "Book in advance in just a few steps" },
  { icon: DollarSign, title: "Fixed Prices", desc: "No hidden fees, what you see is what you pay" },
  { icon: User, title: "Professional Drivers", desc: "Experienced, friendly and always on time" },
  { icon: PhoneCall, title: "24/7 Support", desc: "We're here to help you anytime, anywhere" },
];

/* ─── Component ─────────────────────────────────────────────────────── */
export function OurCitiesPage() {
  const [selectedCity, setSelectedCity] = useState(cities[0]);

  return (
    <div className="w-full flex flex-col overflow-x-clip bg-white">

      {/* ── 1. Hero ───────────────────────────────────────────────────── */}
      <section className="relative w-full h-[340px] md:h-[420px] overflow-hidden flex items-center">
        {/* BG image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/ourCities/ourCitiesBg.png"
            alt="Our Cities"
            fill
            draggable={false}
            className="object-cover object-center"
            priority
          />
        </div>
        {/* Gradient overlay */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(90deg, rgba(14, 24, 33, 0.86) 0%, rgba(14, 24, 33, 0) 100%)",
          }}
        />

        {/* Text */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 flex flex-col gap-4">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          >
            Our Cities
          </motion.h1>
          <motion.p
            className="text-base md:text-lg text-gray-300 max-w-[480px] leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            Choose your destination and book your airport transfer to any of the Red Sea&apos;s top locations.
          </motion.p>
        </div>
      </section>

      {/* ── Booking Bar (floating over hero) ─────────────────────────── */}
      <div className="w-full max-w-7xl mx-auto px-4 md:px-12 lg:px-24 -mt-12 md:-mt-14 relative z-30">
        <motion.div
          className="bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] p-4 md:p-5"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 md:divide-x md:divide-gray-200">
            {/* FROM */}
            <div className="flex flex-col gap-1 md:px-5 pl-1 first:pl-0">
              <span className="text-[9px] md:text-[10px] font-semibold uppercase tracking-widest text-gray-400">From</span>
              <div className="flex items-center gap-1.5 md:gap-2">
                <Plane className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#aeb6c0] flex-shrink-0" />
                <span className="text-xs md:text-sm font-medium text-transfer-dark leading-tight line-clamp-2">Hurghada Airport (HRG)</span>
              </div>
            </div>
            {/* TO */}
            <div className="flex flex-col gap-1 md:px-5 pl-2 md:pl-5 border-l border-gray-100 md:border-none">
              <span className="text-[9px] md:text-[10px] font-semibold uppercase tracking-widest text-gray-400">To</span>
              <div className="flex items-center gap-1.5 md:gap-2">
                <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#aeb6c0] flex-shrink-0" />
                <span className="text-xs md:text-sm text-gray-400 leading-tight line-clamp-2">Pick-up Location</span>
              </div>
            </div>
            {/* DATE & TIME */}
            <div className="flex flex-col gap-1 md:px-5 pl-1 md:pl-5 pt-3 md:pt-0 border-t border-gray-100 md:border-none">
              <span className="text-[9px] md:text-[10px] font-semibold uppercase tracking-widest text-gray-400">Date & Time</span>
              <div className="flex items-center gap-1.5 md:gap-2">
                <CalendarDays className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#aeb6c0] flex-shrink-0" />
                <span className="text-xs md:text-sm font-medium text-transfer-dark leading-tight line-clamp-2">20 May 2025, 10:00 AM</span>
              </div>
            </div>
            {/* PASSENGERS */}
            <div className="flex flex-col gap-1 md:px-5 pl-2 md:pl-5 pt-3 md:pt-0 border-t border-l border-gray-100 md:border-none md:flex-row md:items-center md:justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-[9px] md:text-[10px] font-semibold uppercase tracking-widest text-gray-400">Passengers</span>
                <div className="flex items-center gap-1.5 md:gap-2">
                  <Users className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#aeb6c0] flex-shrink-0" />
                  <span className="text-xs md:text-sm font-medium text-transfer-dark leading-tight">2</span>
                </div>
              </div>
              <Button className="col-span-2 md:col-span-1 mt-2 md:mt-0 px-6 py-3 text-sm md:ml-4 flex-shrink-0 hidden md:flex">
                Search
              </Button>
            </div>
          </div>
          {/* Mobile search button */}
          <Button className="w-full mt-4 py-3 md:hidden">Search</Button>
        </motion.div>
      </div>

      {/* ── 2. City Cards ────────────────────────────────────────────── */}
      <section className="relative z-30 w-full max-w-7xl mx-auto px-4 md:px-12 lg:px-24 pt-8 pb-0 md:pt-10">
        <div className="flex gap-3 overflow-x-auto overflow-y-visible pb-4 scrollbar-hide snap-x md:gap-4 lg:grid lg:grid-cols-4 lg:overflow-visible">
          {cities.map((city, i) => (
            <motion.button
              key={city.id}
              onClick={() => setSelectedCity(city)}
              className={`relative w-[240px] flex-none rounded-2xl overflow-hidden cursor-pointer focus:outline-none snap-center shadow-sm ring-offset-2 ring-offset-white transition-shadow md:w-[260px] lg:w-full lg:min-w-0 ${
                selectedCity.id === city.id ? "ring-2 ring-[#2f9e44]" : "ring-0"
              }`}
              style={{ aspectRatio: "4/3" }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -2 }}
            >
              <Image
                src={city.image}
                alt={city.name}
                fill
                draggable={false}
                className="object-cover"
              />
              {/* Dark gradient bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Selected checkmark */}
              <AnimatePresence>
                {selectedCity.id === city.id && (
                  <motion.div
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#2f9e44] flex items-center justify-center shadow-lg"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Check className="w-4 h-4 text-white" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* City label */}
              <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between">
                <div className="flex flex-col items-start gap-0.5">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-white" />
                    <span className="text-white text-base font-bold drop-shadow-md">{city.name}</span>
                  </div>
                  <span className="text-gray-200 text-xs font-medium pl-5 drop-shadow-md">From {city.price}</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
                  <ChevronRight className="w-4 h-4 text-transfer-dark" />
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      {/* ── 3 & 4. Vehicles + City Info ──────────────────────────────── */}
      <section className="w-full max-w-7xl mx-auto overflow-x-clip px-4 py-12 md:px-12 md:py-16 lg:px-24">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-10">

          {/* ── City Info (left on desktop, bottom on mobile) ────────── */}
          <div className="w-full lg:w-[380px] flex-shrink-0 flex flex-col gap-8 order-2 lg:order-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCity.id + "-info"}
                className="flex flex-col gap-6"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.4 }}
              >
                {/* City title */}
                <div className="flex items-center gap-2">
                  <MapPin className="w-6 h-6 text-transfer-green flex-shrink-0" />
                  <h2 className="text-3xl font-bold text-transfer-dark">{selectedCity.name}</h2>
                </div>

                {/* Description */}
                <p className="text-transfer-gray leading-relaxed text-base">{selectedCity.description}</p>

                {/* Features grid */}
                <div className="grid grid-cols-2 gap-6 pt-2">
                  {features.map((f) => {
                    const Icon = f.icon;
                    return (
                      <div key={f.title} className="flex flex-col items-center text-center gap-2.5">
                        <div className="mb-1 flex h-14 w-14 items-center justify-center rounded-full bg-transfer-light-green">
                          <Icon className="w-6 h-6 text-transfer-green" />
                        </div>
                        <span className="text-sm font-bold text-transfer-dark leading-tight">{f.title}</span>
                        <span className="text-xs text-transfer-gray leading-relaxed">{f.desc}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Popular Destinations */}
                <div className="flex flex-col gap-4 mt-4">
                  <h3 className="text-xl font-bold text-transfer-dark">
                    Popular Destinations from {selectedCity.name}
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedCity.destinations.map((d) => (
                      <div
                        key={d.name}
                        className="border border-gray-100 bg-gray-50 rounded-xl px-4 py-3.5 flex flex-col gap-1.5 shadow-sm"
                      >
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#aeb6c0]" />
                          <span className="text-sm font-bold text-transfer-dark leading-tight">{d.name}</span>
                        </div>
                        <span className="text-xs text-transfer-gray font-medium pl-5">{d.km} km</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── Vehicles (right on desktop, top on mobile) ───────────── */}
          <div className="flex-1 flex flex-col gap-6 order-1 lg:order-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCity.id + "-vehicles"}
                className="flex flex-col gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-transfer-dark">
                    Available Vehicles in {selectedCity.name}
                  </h2>
                  <span className="text-sm text-transfer-gray font-medium">Prices are per vehicle</span>
                </div>

                {/* Vehicle list */}
                <div className="flex flex-col divide-y divide-gray-100">
                  {vehicles.map((v, i) => (
                    <motion.div
                      key={i}
                      className="flex flex-col sm:flex-row items-center sm:items-start md:items-center gap-6 py-8"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.1 }}
                    >
                      {/* Car image - Made much bigger for mobile and desktop */}
                      <div className="relative w-full max-w-[280px] sm:w-[240px] md:w-[320px] lg:w-[360px] flex-shrink-0 aspect-[16/9] lg:mr-4">
                        <Image
                          src="/ourCities/whiteCarWhiteBg.png"
                          alt={v.type}
                          fill
                          draggable={false}
                          className="object-contain"
                        />
                      </div>

                      {/* Info & Price Wrapper */}
                      <div className="w-full flex-1 flex flex-col sm:flex-row gap-6 justify-between">
                        {/* Info */}
                        <div className="flex flex-col gap-3">
                          <div className="flex items-center gap-3 flex-wrap">
                            <span className="text-lg font-bold text-transfer-dark">{v.type}</span>
                            <span className="rounded-full bg-[#e8f8ee] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#3aa765]">
                              {v.badge}
                            </span>
                          </div>
                          <div className="flex flex-col gap-2 text-sm text-transfer-gray mt-1">
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4 text-transfer-green" />
                              <span className="font-medium">Up to {v.passengers} Passengers</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Luggage className="w-4 h-4 text-transfer-green" />
                              <span className="font-medium">{v.luggage} Luggage</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <AirVent className="w-4 h-4 text-transfer-green" />
                              <span className="font-medium">Air Conditioned</span>
                            </div>
                          </div>
                        </div>

                        {/* Price + rating + button */}
                        <div className="flex flex-col items-start sm:items-end gap-3 flex-shrink-0 mt-2 sm:mt-0 border-t sm:border-t-0 border-gray-100 pt-4 sm:pt-0">
                          <div className="text-left sm:text-right">
                            <div className="text-3xl font-bold text-transfer-green">{v.price}</div>
                            <div className="text-xs font-medium text-transfer-gray mt-0.5">Per Person</div>
                            <div className="flex items-center gap-1 sm:justify-end mt-2">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm font-bold text-transfer-dark">5.0</span>
                              <span className="text-xs font-medium text-transfer-gray">(128)</span>
                            </div>
                          </div>
                          <Button href="/billing" className="w-full sm:w-auto px-8 py-3 text-sm mt-1">Book Now</Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </section>

    </div>
  );
}
