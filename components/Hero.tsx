"use client";

import React from "react";
import Image from "next/image";
import { BookingForm } from "./BookingForm";
import { Clock, Banknote, UserCheck } from "lucide-react";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative w-full min-h-[850px] lg:min-h-[750px] flex items-center justify-center overflow-hidden py-12 lg:py-0">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/Hompage/HeroImage.png" 
          alt="Luxury airport transfer" 
          fill 
          priority
          className="object-cover"
        />
      </div>
      
      {/* Multiply Gradient Overlay */}
      <div 
        className="absolute inset-0 z-10 mix-blend-multiply"
        style={{ background: "linear-gradient(270deg, #7E7E7E 0%, #737373 100%)" }}
      ></div>

      {/* Content Container */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 h-full">
        
        {/* Booking Form (Top on Mobile, Right on Desktop) */}
        <motion.div 
          className="w-full lg:w-[480px] order-1 lg:order-2 flex-shrink-0"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.0, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <BookingForm />
        </motion.div>

        {/* Hero Text (Bottom on Mobile, Left on Desktop) */}
        <div className="flex flex-col gap-8 order-2 lg:order-1 text-white max-w-[600px]">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          >
            Premium Airport Transfers Across the Red Sea Resorts
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-gray-200 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            Travel between Hurghada Airport and your resort with professional drivers, fixed prices,
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap gap-4 mt-2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-2 bg-transfer-green/90 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 shadow-lg">
              <Clock className="w-4 h-4 text-white" />
              <span className="text-sm font-medium text-white">24/7 Support</span>
            </div>
            <div className="flex items-center gap-2 bg-transfer-green/90 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 shadow-lg">
              <Banknote className="w-4 h-4 text-white" />
              <span className="text-sm font-medium text-white">Pay cash</span>
            </div>
            <div className="flex items-center gap-2 bg-transfer-green/90 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 shadow-lg">
              <UserCheck className="w-4 h-4 text-white" />
              <span className="text-sm font-medium text-white">Professional Drivers</span>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
