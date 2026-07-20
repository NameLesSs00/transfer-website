"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, Globe, MapPin } from "lucide-react";
import { motion } from "framer-motion";

export function Footer() {
  return (
    <motion.footer 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
      className="w-full bg-[linear-gradient(180deg,#0e1821_0%,#081018_100%)] px-6 pb-8 pt-16 text-white md:px-12 lg:px-24"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
        
        {/* Column 1: Logo & Text */}
        <div className="flex flex-col gap-6">
          <Image 
            src="/logoFotter.png" 
            alt="Rubin Tours" 
            width={58} 
            height={75} 
            className="h-20 w-auto object-contain md:h-24"
          />
          <p className="text-[#B3B9C4] leading-relaxed text-sm">
            Every transfer is designed to make your journey smooth, comfortable, and stress-free with professional drivers and reliable service.
          </p>
        </div>

        {/* Column 2: Quick action */}
        <div className="flex flex-col gap-6">
          <h3 className="text-xl font-semibold">Quick action</h3>
          <ul className="flex flex-col gap-4 text-[#B3B9C4]">
            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link href="/fleet" className="hover:text-white transition-colors">Fleet</Link></li>
            <li><Link href="/destinations" className="hover:text-white transition-colors">Destinations</Link></li>
            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
          </ul>
        </div>

        {/* Column 3: Contact Us */}
        <div className="flex flex-col gap-6">
          <h3 className="text-xl font-semibold">contact Us</h3>
          <ul className="flex flex-col gap-4 text-[#B3B9C4]">
            <li className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
              <span>+00 (123) 456 889</span>
            </li>
            <li className="flex items-start gap-3">
              <Globe className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
              <span>contact@example.com</span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
              <span>583 Main Street, NY, USA</span>
            </li>
          </ul>
        </div>

        {/* Column 4: Payment & Social */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-6">
            <h3 className="text-xl font-semibold">Payment Channels</h3>
            <div className="flex flex-wrap items-center gap-3">
              <Image src="/logos_paypal.png" alt="PayPal" width={40} height={25} className="h-[20px] w-auto" />
              <Image src="/logos_visaelectron.png" alt="Visa" width={40} height={25} className="h-[20px] w-auto" />
              <Image src="/logos_apple-pay.png" alt="Apple Pay" width={40} height={25} className="h-[20px] w-auto" />
              <Image src="/logos_mastercard.png" alt="Mastercard" width={40} height={25} className="h-[20px] w-auto" />
              <Image src="/logos_google-pay.png" alt="Google Pay" width={40} height={25} className="h-[20px] w-auto" />
            </div>
          </div>
          
          <div className="flex flex-col gap-6">
            <h3 className="text-xl font-semibold">Follow Us</h3>
            <div className="flex items-center gap-4">
              <a href="#" className="text-white transition-colors hover:text-transfer-green" aria-label="Facebook">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a href="#" className="text-white transition-colors hover:text-transfer-green" aria-label="Instagram">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a href="#" className="text-white transition-colors hover:text-transfer-green" aria-label="TikTok">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
              </a>
              <a href="#" className="text-white transition-colors hover:text-transfer-green" aria-label="X (Twitter)">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto border-t border-white/10 pt-8 text-center text-[#B3B9C4] text-sm">
        Powered By Tech Gear Solutions © 2026 All Rights Reserved
      </div>
    </motion.footer>
  );
}
