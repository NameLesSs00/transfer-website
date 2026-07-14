"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const features = [
  "Professional & Experienced Drivers",
  "Fixed Prices with No Hidden Fees",
  "Comfortable & Well-Maintained Vehicles",
  "24/7 Customer Support",
  "Free Cancellation up to 24 Hours",
  "Instant Booking Confirmation",
];

export function AboutUs() {
  return (
    <section className="w-full bg-white py-16 md:py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

        {/* ── Image Grid (bottom on mobile, left on desktop) ── */}
        <motion.div
          className="relative w-full lg:w-[45%] order-2 lg:order-1 flex-shrink-0"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* 2×2 composite image */}
          <div className="relative w-full aspect-square max-w-[560px] mx-auto lg:mx-0">
            <Image
              src="/Hompage/GroupImages.png"
              alt="Professional drivers, vehicles and navigation — about our service"
              fill
              className="object-cover rounded-[24px]"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
          </div>
        </motion.div>

        {/* ── Text Block (top on mobile, right on desktop) ── */}
        <motion.div
          className="w-full lg:w-[55%] order-1 lg:order-2 flex flex-col gap-6"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* About Us Heading */}
          <h2 className="text-3xl md:text-4xl font-bold text-transfer-dark">
            About Us
          </h2>

          {/* Description */}
          <p className="text-base md:text-lg text-transfer-gray leading-relaxed">
            we provide safe, comfortable, and reliable transportation between
            Hurghada Airport and the Red Sea&apos;s top destinations. Whether
            you&apos;re arriving for a relaxing vacation or heading back to the
            airport, our mission is to make every journey smooth and
            stress-free.
          </p>

          {/* Features */}
          <div className="flex flex-col gap-4 mt-2">
            <h3 className="text-2xl md:text-3xl font-bold text-transfer-dark">
              Features
            </h3>
            <ul className="flex flex-col gap-2">
              {features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-2 text-base md:text-lg text-transfer-dark"
                >
                  <span className="text-transfer-green font-bold mt-0.5">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
