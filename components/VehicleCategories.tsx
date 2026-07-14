"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const vehicles = [
  {
    src: "/Hompage/blackCar.png",
    alt: "Black luxury sedan – Private Limousine",
    label: "Private Limousine",
  },
  {
    src: "/Hompage/Kostar.png",
    alt: "White microbus – Microbus",
    label: "Microbus",
  },
  {
    src: "/Hompage/Van.png",
    alt: "White van – Hiacbus",
    label: "Hiacbus",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.18 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function VehicleCategories() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Track active slide on mobile via IntersectionObserver
  const observerCallback: IntersectionObserverCallback = useCallback(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number((entry.target as HTMLElement).dataset.index);
          setActiveIndex(index);
        }
      });
    },
    []
  );

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const slides = carousel.querySelectorAll<HTMLElement>("[data-index]");
    const observer = new IntersectionObserver(observerCallback, {
      root: carousel,
      threshold: 0.6,
    });

    slides.forEach((slide) => observer.observe(slide));
    return () => observer.disconnect();
  }, [observerCallback]);

  const scrollToSlide = (index: number) => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const slide = carousel.querySelector<HTMLElement>(
      `[data-index="${index}"]`
    );
    slide?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  return (
    <section
      className="w-full py-16 md:py-24"
      style={{ background: "rgba(0, 31, 72, 1)" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 flex flex-col gap-12">

        {/* Section Header */}
        <motion.div
          className="flex flex-col items-center gap-3"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center">
            Vehicle Categories
          </h2>
          <div
            className="rounded-full"
            style={{
              width: "120px",
              height: "4px",
              background: "rgba(180, 200, 220, 0.45)",
            }}
          />
        </motion.div>

        {/* ── DESKTOP: 3-column grid (hidden on mobile) ── */}
        <motion.div
          className="hidden md:grid grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {vehicles.map((vehicle) => (
            <motion.div
              key={vehicle.label}
              variants={cardVariants}
              className="flex flex-col items-center gap-6"
            >
              {/* Blob backdrop + image */}
              <div className="relative flex items-center justify-center w-full">
                {/* Circular blob */}
                <div
                  className="absolute rounded-full"
                  style={{
                    width: "220px",
                    height: "200px",
                    background: "rgba(120, 150, 185, 0.18)",
                    filter: "blur(2px)",
                  }}
                />
                {/* Vehicle image */}
                <div className="relative w-full max-w-[320px] aspect-[3/2]">
                  <Image
                    src={vehicle.src}
                    alt={vehicle.alt}
                    fill
                    className="object-contain drop-shadow-2xl"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              </div>

              {/* Label */}
              <p className="text-white text-lg md:text-xl font-medium text-center">
                {vehicle.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* ── MOBILE: Swipe carousel (hidden on desktop) ── */}
        <div className="flex flex-col items-center gap-6 md:hidden">
          <div
            ref={carouselRef}
            className="w-full flex overflow-x-auto gap-4 snap-x snap-mandatory scroll-smooth pb-2 [&::-webkit-scrollbar]:hidden"
            style={{
              scrollbarWidth: "none",
            }}
          >
            {vehicles.map((vehicle, index) => (
              <div
                key={vehicle.label}
                data-index={index}
                className="flex-none w-[80vw] snap-center flex flex-col items-center gap-5"
              >
                {/* Blob + image */}
                <div className="relative flex items-center justify-center w-full">
                  <div
                    className="absolute rounded-full"
                    style={{
                      width: "180px",
                      height: "160px",
                      background: "rgba(120, 150, 185, 0.18)",
                      filter: "blur(2px)",
                    }}
                  />
                  <div className="relative w-full max-w-[280px] aspect-[3/2]">
                    <Image
                      src={vehicle.src}
                      alt={vehicle.alt}
                      fill
                      className="object-contain drop-shadow-2xl"
                      sizes="80vw"
                    />
                  </div>
                </div>

                {/* Label */}
                <p className="text-white text-lg font-medium text-center">
                  {vehicle.label}
                </p>
              </div>
            ))}
          </div>

          {/* Dot indicators */}
          <div className="flex items-center gap-3">
            {vehicles.map((_, index) => (
              <button
                key={index}
                id={`vehicle-dot-${index}`}
                aria-label={`Go to ${vehicles[index].label}`}
                onClick={() => scrollToSlide(index)}
                className="rounded-full transition-all duration-300 focus:outline-none"
                style={{
                  width: activeIndex === index ? "28px" : "10px",
                  height: "10px",
                  background:
                    activeIndex === index
                      ? "#4d9f31"
                      : "rgba(255,255,255,0.35)",
                  border: "none",
                  cursor: "pointer",
                }}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
