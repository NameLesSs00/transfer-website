"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const steps = [
  {
    icon: "/Hompage/gis_route-start.png",
    alt: "Route icon",
    title: "Choose Route",
    description: "Airport ↔ Hotel",
  },
  {
    icon: "/Hompage/hugeicons_date-time.png",
    alt: "Date and time icon",
    title: "Select Date & Passengers",
    description: "Pick your schedule and group size.",
  },
  {
    icon: "/Hompage/famicons_car-sport-outline.png",
    alt: "Car icon",
    title: "Choose Vehicle",
    description: "Find the perfect ride for your needs.",
  },
  {
    icon: "/Hompage/line-md_confirm-circle.png",
    alt: "Confirm icon",
    title: "Confirm & Travel",
    description: "Book instantly and enjoy a stress-free transfer.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function FourSteps() {
  return (
    <section className="w-full bg-white py-16 md:py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">

        {/* Section Header */}
        <motion.div
          className="flex flex-col items-center gap-3"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-center text-3xl font-bold text-transfer-green md:text-4xl">
            Book Your Ride in 4 Simple Steps
          </h2>
          <div
            className="rounded-full"
            style={{
              width: "120px",
              height: "4px",
              background: "rgba(251, 245, 240, 1)",
            }}
          />
        </motion.div>

        {/* Cards Grid — 4 cols desktop / 2 cols mobile */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {steps.map((step) => (
            <motion.div
              key={step.title}
              variants={cardVariants}
              className="flex flex-col items-center gap-5 rounded-[12px] bg-transfer-light-green p-6 text-center shadow-[0_1px_8px_rgba(14,24,33,0.05)] md:p-8"
            >
              {/* Icon */}
              <div className="relative w-16 h-16 flex-shrink-0">
                <Image
                  src={step.icon}
                  alt={step.alt}
                  fill
                  className="object-contain"
                  sizes="64px"
                />
              </div>

              {/* Title */}
              <h3
                className="text-base md:text-lg font-semibold leading-snug"
                style={{ color: "rgba(196, 135, 70, 1)" }}
              >
                {step.title}
              </h3>

              {/* Description */}
              <p
                className="text-sm md:text-base leading-relaxed"
                style={{ color: "rgba(151, 155, 167, 1)" }}
              >
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
