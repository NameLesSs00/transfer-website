"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export function BookNow() {
  const router = useRouter();

  const handleBookNow = () => {
    router.push("/billing");
  };

  return (
    <section className="relative w-full min-h-[320px] md:min-h-[380px] overflow-hidden flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/Hompage/BookNowBg.png"
          alt="Luxury airport transfer at sunset"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* Multiply Overlay */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: "rgba(163, 163, 163, 1)",
          mixBlendMode: "multiply",
        }}
      />

      {/* Content */}
      <div className="relative z-20 w-full px-6 md:px-8 lg:px-10 py-14 md:py-20">
        <div className="flex flex-col gap-5 w-full max-w-[480px] lg:max-w-[44%]">

          {/* Heading */}
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            Reliable Airport Transfers to Every Red Sea Resort
          </motion.h2>

          {/* Subtext */}
          <motion.p
            className="text-base md:text-lg text-white/90 leading-relaxed"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            From airport pickups to hotel drop-offs, enjoy safe, comfortable
            transportation with transparent pricing and 24/7 support.
          </motion.p>

          {/* CTA Button */}
          <motion.button
            onClick={handleBookNow}
            className="bg-transfer-green text-white font-semibold text-sm md:text-base rounded-full px-8 py-3 cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95 self-start"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            Book Now
          </motion.button>

        </div>
      </div>
    </section>
  );
}
