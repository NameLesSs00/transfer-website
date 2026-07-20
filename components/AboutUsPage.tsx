"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Shield, Tag, Headset, Target, Eye, User, Car, CheckCircle, XCircle } from "lucide-react";
import { Button } from "./ui/Button";

export function AboutUsPage() {
  return (
    <div className="w-full flex flex-col bg-white">
      
      {/* 1. Hero Section */}
      <section className="relative w-full h-[400px] md:h-[450px] flex items-start pt-24 md:pt-32 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/AboutUs/AboutUsHeroBg.png" 
            alt="About Us Hero" 
            fill 
            draggable={false}
            className="object-cover object-right md:object-center"
            priority
          />
        </div>
        
        {/* Exact Gradient Overlay requested */}
        <div 
          className="absolute inset-0 z-10"
          style={{ 
            background: "linear-gradient(270deg, rgba(74, 74, 74, 0.7) 0%, rgba(71, 71, 71, 0.7) 100%)",
            mixBlendMode: "multiply"
          }}
        />

        {/* Hero Content */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-8 lg:px-8 flex flex-col gap-6">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          >
            About Us
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-gray-200"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            Your Trusted Airport Transfer Partner
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap gap-4 mt-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-2 border border-white/20 bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <Shield className="w-4 h-4 text-transfer-green" />
              <span className="text-sm font-medium text-white">Safe & Reliable</span>
            </div>
            <div className="flex items-center gap-2 border border-white/20 bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <Tag className="w-4 h-4 text-transfer-green" />
              <span className="text-sm font-medium text-white">Fixed Prices</span>
            </div>
            <div className="flex items-center gap-2 border border-white/20 bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <Headset className="w-4 h-4 text-transfer-green" />
              <span className="text-sm font-medium text-white">24/7 support</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Our Story Section */}
      <section className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-16 md:py-24">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <motion.div 
            className="w-full lg:w-1/2 flex flex-col gap-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex flex-col gap-2">
              <h2 className="text-3xl md:text-4xl font-bold text-transfer-dark">Our Story</h2>
              <div className="h-[4px] w-24 rounded-full bg-transfer-light-green" />
            </div>
            <p className="text-base md:text-lg text-transfer-gray leading-relaxed">
              We are dedicated to providing safe, reliable, and comfortable airport transfer services across the Red Sea region. Whether you&apos;re arriving for a relaxing vacation or heading back to the airport, our goal is to make every journey smooth and stress-free.
            </p>
            <p className="text-base md:text-lg text-transfer-gray leading-relaxed">
              With years of experience in transportation and hospitality, we understand the importance of punctuality, comfort, and exceptional customer service. Our professional drivers and modern fleet ensure that every trip is enjoyable from start to finish.
            </p>
          </motion.div>
          
          {/* Image */}
          <motion.div 
            className="w-full lg:w-1/2 relative flex justify-center"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* The Group 2.png likely has the green blob in it already */}
            <div className="relative w-full aspect-[4/3] max-w-[500px]">
              <Image 
                src="/AboutUs/Group 2.png" 
                alt="Our Fleet lineup" 
                fill
                draggable={false}
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. Mission & Vision */}
      <section className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 pb-16 md:pb-24">
        <div className="flex flex-col md:flex-row gap-6 md:gap-10">
          
          <motion.div 
            className="flex flex-1 flex-col gap-6 rounded-3xl bg-transfer-light-green p-8 md:p-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-white">
                <Target className="w-7 h-7 text-transfer-green" />
              </div>
              <h3 className="text-2xl font-bold text-transfer-dark">Our Mission</h3>
            </div>
            <p className="text-transfer-gray text-base md:text-lg leading-relaxed">
              To deliver reliable, comfortable, and punctual airport transfer services while providing exceptional customer care and ensuring every traveler enjoys a seamless experience.
            </p>
          </motion.div>

          <motion.div 
            className="flex flex-1 flex-col gap-6 rounded-3xl bg-transfer-light-green p-8 md:p-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-white">
                <Eye className="w-7 h-7 text-transfer-green" />
              </div>
              <h3 className="text-2xl font-bold text-transfer-dark">Our Vision</h3>
            </div>
            <p className="text-transfer-gray text-base md:text-lg leading-relaxed">
              To become the preferred airport transfer provider in the Red Sea region by delivering safe, premium, and customer-focused transportation solutions.
            </p>
          </motion.div>

        </div>
      </section>

      {/* 4. Why Choose us ? */}
      <section className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 pb-16 md:pb-24">
        <motion.div 
          className="flex flex-col items-center gap-2 mb-16 text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-transfer-dark">Why Choose us ?</h2>
          <div className="h-[4px] w-24 rounded-full bg-transfer-light-green" />
        </motion.div>

        {/* Grid of 5 items */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-10">
          
          {[
            {
              icon: User,
              title: "Professional Drivers",
              desc: "Experienced and licensed chauffeurs dedicated to your safety and comfort."
            },
            {
              icon: Tag,
              title: "Fixed Prices",
              desc: "Transparent pricing with no hidden fees."
            },
            {
              icon: Car,
              title: "Modern Fleet",
              desc: "Well-maintained vehicles equipped to provide a pleasant travel experience."
            },
            {
              icon: CheckCircle,
              title: "Instant Confirmation",
              desc: "Receive your booking confirmation immediately after completing your reservation."
            },
            {
              icon: XCircle,
              title: "Free Cancellation",
              desc: "Flexible cancellation policy up to 24 hours before your transfer."
            }
          ].map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div 
                key={feature.title}
                className="flex flex-col md:flex-row lg:flex-col gap-4 items-start md:items-center lg:items-start text-left md:text-center lg:text-left"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-transfer-light-green">
                  <Icon className="w-6 h-6 text-transfer-green" />
                </div>
                <div className="flex flex-col gap-2">
                  <h4 className="text-lg font-bold text-transfer-dark">{feature.title}</h4>
                  <p className="text-sm text-transfer-gray leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
          
        </div>
      </section>

      {/* 5. Bottom CTA Banner */}
      <section className="w-full max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 pb-16 md:pb-24">
        <motion.div 
          className="relative w-full rounded-[32px] overflow-hidden flex flex-row items-center justify-between p-8 md:p-10 lg:p-14 gap-4"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Background */}
          <div className="absolute inset-0 z-0">
            <Image 
              src="/AboutUs/readyForBg.png" 
              alt="Ready for a transfer" 
              fill
              draggable={false}
              className="object-cover"
            />
          </div>
          
          {/* Exact overlay requested */}
          <div 
            className="absolute inset-0 z-10 mix-blend-multiply"
            style={{ backgroundColor: "rgba(140, 140, 140, 1)" }}
          />

          {/* Content */}
          <div className="relative z-20 flex flex-col gap-2 md:gap-4 max-w-[60%] md:max-w-[600px]">
            <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold text-white leading-tight">
              Ready for a Stress-Free Transfer?
            </h2>
            <p className="hidden md:block text-base md:text-lg text-gray-200 leading-relaxed">
              Book your airport transfer today and enjoy reliable service, fixed prices, and professional drivers across Hurghada and the Red Sea resorts.
            </p>
          </div>

          <div className="relative z-20 flex-shrink-0">
            <Button href="/billing" className="bg-[rgba(196,135,70,1)] px-5 py-4 text-sm hover:bg-[#ad743a] md:px-8 md:py-6 md:text-lg">
              Book Transfer
            </Button>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
