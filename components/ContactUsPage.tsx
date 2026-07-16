"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Button } from "./ui/Button";

export function ContactUsPage() {
  return (
    <div className="w-full flex flex-col bg-white">
      
      {/* 1. Hero Section */}
      <section className="relative w-full h-[280px] md:h-[450px] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/ContactUs/contactUsHero.png" 
            alt="Contact Us Hero" 
            fill 
            draggable={false}
            className="object-cover object-[center_20%]"
            priority
          />
        </div>
        
        {/* Same gradient overlay on all screen sizes, exactly as specified */}
        <div 
          className="absolute inset-0 z-10"
          style={{ 
            background: "linear-gradient(89.54deg, rgba(25, 24, 24, 0.7) 0.4%, rgba(44, 42, 42, 0.7) 53.51%, rgba(72, 72, 72, 0.14) 67.88%, rgba(73, 73, 73, 0) 81.33%)",
          }}
        />

        {/* Hero Content */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-8 lg:px-12 flex flex-col gap-3 md:gap-4">
          <motion.h1 
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          >
            Contact Us
          </motion.h1>
          
          <motion.p 
            className="text-sm md:text-xl text-gray-200 max-w-[240px] md:max-w-[500px] leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            We&apos;re here to help! Reach out to us for inquiries, booking assistance, or any questions about your transfer.
          </motion.p>
        </div>
      </section>

      {/* 2. Floating Contact Information Cards */}
      <section className="relative z-30 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 -mt-16 md:-mt-20">
        <motion.div 
          className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-6 md:p-10"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
            
            {/* Location */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#ddf0d6] flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-transfer-green" />
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="text-lg font-bold text-transfer-green">Location</h4>
                <p className="text-sm text-transfer-gray">Hurghada, Red Sea, Egypt</p>
              </div>
            </div>

            {/* Call Us */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#ddf0d6] flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-transfer-green" />
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="text-lg font-bold text-transfer-green">Call Us</h4>
                <p className="text-sm text-transfer-gray">+20 123 456 7890</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#ddf0d6] flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-transfer-green" />
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="text-lg font-bold text-transfer-green">Email</h4>
                <p className="text-sm text-transfer-gray">info@example.com</p>
              </div>
            </div>

            {/* Working Hours */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#ddf0d6] flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-transfer-green" />
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="text-lg font-bold text-transfer-green">Working Hours</h4>
                <p className="text-sm text-transfer-gray">Saturday – Thursday<br/>9:00 AM – 6:00 PM</p>
              </div>
            </div>

          </div>
        </motion.div>
      </section>

      {/* 3. Contact Form & Map Section */}
      <section className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-16 md:py-24 flex flex-col lg:flex-row gap-12 lg:gap-16">
        
        {/* Left Column: Form */}
        <motion.div 
          className="w-full lg:w-1/2 flex flex-col gap-8 bg-white border border-gray-100 rounded-[32px] p-8 md:p-10 shadow-[0_4px_20px_rgb(0,0,0,0.03)]"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex flex-col gap-3">
            <h2 className="text-3xl font-bold text-transfer-green">Send Us a Message</h2>
            <p className="text-transfer-gray text-base leading-relaxed">
              Have a question or need more information about our products? Fill out the form below and we&apos;ll get back to you as soon as possible.
            </p>
          </div>

          <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-transfer-dark font-medium">Your name</label>
              <input 
                type="text" 
                id="name" 
                placeholder="Enter Name" 
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-transfer-green transition-colors text-transfer-dark placeholder:text-gray-400"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-transfer-dark font-medium">Email address</label>
              <input 
                type="email" 
                id="email" 
                placeholder="Enter Email" 
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-transfer-green transition-colors text-transfer-dark placeholder:text-gray-400"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-transfer-dark font-medium">Message</label>
              <textarea 
                id="message" 
                placeholder="Write your message" 
                rows={5}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-transfer-green transition-colors text-transfer-dark placeholder:text-gray-400 resize-none"
              ></textarea>
            </div>

            <Button type="submit" className="w-full md:w-auto px-8 py-4 text-lg self-start mt-2">
              Send Message
            </Button>
          </form>
        </motion.div>

        {/* Right Column: Map */}
        <motion.div 
          className="w-full lg:w-1/2 h-[400px] lg:h-auto min-h-[500px] rounded-[32px] overflow-hidden relative shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 bg-gray-50"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113426.23075240212!2d33.72911226027151!3d27.245053225211995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145287b416dc5ad1%3A0x6b4ebecdfd0b28e2!2sHurghada%2C%20Red%20Sea%20Governorate%2C%20Egypt!5e0!3m2!1sen!2sus!4v1704207122116!5m2!1sen!2sus" 
            className="absolute inset-0 w-full h-full border-0" 
            allowFullScreen={false} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Hurghada Map"
          ></iframe>
        </motion.div>
        
      </section>

    </div>
  );
}
