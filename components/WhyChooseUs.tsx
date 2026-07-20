"use client";

import React from "react";
import Image from "next/image";
import { History, Ban } from "lucide-react";
import { motion } from "framer-motion";

export function WhyChooseUs() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }
    }
  };

  return (
    <section className="w-full bg-white py-16 md:py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        
        {/* Header Section */}
        <motion.div 
          className="flex flex-col items-center justify-center gap-3"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-transfer-green">Why choose us?</h2>
          <div className="h-1.5 w-32 rounded-full bg-transfer-light-green"></div>
        </motion.div>

        {/* Content Section */}
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 mt-8">
          
          {/* Image Container (Bottom on mobile, Left on desktop) */}
          <motion.div 
            className="w-full lg:w-1/2 order-2 lg:order-1 flex justify-center lg:justify-start"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative w-full max-w-[600px] aspect-[4/3] rounded-[32px] overflow-hidden bg-[#F8F9FB]">
              <Image 
                src="/Hompage/whyChooseUs.png" 
                alt="Professional driver with luxury vehicle" 
                fill 
                className="object-contain lg:object-cover mix-blend-multiply" 
              />
            </div>
          </motion.div>

          {/* Feature Grid (Top on mobile, Right on desktop) */}
          <motion.div 
            className="w-full lg:w-1/2 order-1 lg:order-2 grid grid-cols-2 gap-4 md:gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Card 1: 24/7 service */}
            <motion.div 
              variants={itemVariants}
              className="flex aspect-square flex-col items-center justify-center gap-4 rounded-[18px] bg-transfer-light-green p-6 text-center shadow-sm md:p-8"
            >
              <History className="w-12 h-12 md:w-16 md:h-16 text-transfer-green stroke-[1.5]" />
              <h3 className="text-lg md:text-xl font-medium text-transfer-green">24/7 service</h3>
            </motion.div>

            {/* Card 2: Professional Drivers */}
            <motion.div 
              variants={itemVariants}
              className="flex aspect-square flex-col items-center justify-center gap-4 rounded-[18px] border-2 border-transfer-green bg-white p-6 text-center shadow-sm md:p-8"
            >
              <div className="relative w-12 h-12 md:w-16 md:h-16">
                <Image 
                  src="/fluent-emoji-high-contrast_police-officer.png" 
                  alt="Professional Drivers" 
                  fill 
                  className="object-contain" 
                />
              </div>
              <h3 className="text-lg md:text-xl font-medium text-transfer-green">Professional Drivers</h3>
            </motion.div>

            {/* Card 3: Free Cancellation */}
            <motion.div 
              variants={itemVariants}
              className="flex aspect-square flex-col items-center justify-center gap-4 rounded-[18px] border-2 border-transfer-green bg-white p-6 text-center shadow-sm md:p-8"
            >
              <Ban className="w-12 h-12 md:w-16 md:h-16 text-transfer-green stroke-[1.5]" />
              <h3 className="text-lg md:text-xl font-medium text-transfer-green">Free Cancellation</h3>
            </motion.div>

            {/* Card 4: Fixed Prices */}
            <motion.div 
              variants={itemVariants}
              className="flex aspect-square flex-col items-center justify-center gap-4 rounded-[18px] bg-transfer-light-green p-6 text-center shadow-sm md:p-8"
            >
              <div className="relative w-12 h-12 md:w-16 md:h-16">
                <Image 
                  src="/solar_tag-price-bold.png" 
                  alt="Fixed Prices" 
                  fill 
                  className="object-contain" 
                />
              </div>
              <h3 className="text-lg md:text-xl font-medium text-transfer-green">Fixed Prices</h3>
            </motion.div>

          </motion.div>
        </div>

      </div>
    </section>
  );
}
