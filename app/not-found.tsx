"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Home, Phone, Navigation } from "lucide-react";
import { Button } from "@/components/ui/Button";

// Animated dashed GPS route path
function RouteAnimation() {
  return (
    <div className="relative w-full flex justify-center my-6 overflow-hidden">
      <svg
        viewBox="0 0 400 60"
        className="w-full max-w-sm h-[60px]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Completed route — solid green */}
        <motion.line
          x1="20"
          y1="30"
          x2="180"
          y2="30"
          stroke="#c48746"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        />

        {/* Origin pin */}
        <motion.circle
          cx="20"
          cy="30"
          r="6"
          fill="#c48746"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        />

        {/* Broken / lost route — dashed gray */}
        <motion.line
          x1="200"
          y1="30"
          x2="380"
          y2="30"
          stroke="#757a87"
          strokeWidth="3"
          strokeDasharray="10 8"
          strokeLinecap="round"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 0.4, delay: 1.2 }}
        />

        {/* Midpoint — question mark pin */}
        <motion.circle
          cx="200"
          cy="30"
          r="8"
          fill="#f9fffb"
          stroke="#c48746"
          strokeWidth="2.5"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4, delay: 1.0 }}
        />
        <motion.text
          x="196"
          y="35"
          fill="#c48746"
          fontSize="11"
          fontWeight="700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          ?
        </motion.text>

        {/* Destination pin — empty / lost */}
        <motion.circle
          cx="380"
          cy="30"
          r="6"
          fill="#f9fffb"
          stroke="#757a87"
          strokeWidth="2"
          strokeDasharray="3 3"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4, delay: 1.4 }}
        />
      </svg>
    </div>
  );
}

// Floating digit for the "404" hero
function FloatingDigit({
  char,
  delay,
  color = "text-transfer-dark",
}: {
  char: string;
  delay: number;
  color?: string;
}) {
  return (
    <motion.span
      className={`inline-block ${color} font-extrabold`}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.span
        className="inline-block"
        animate={{ y: [0, -10, 0] }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay * 0.5,
        }}
      >
        {char}
      </motion.span>
    </motion.span>
  );
}

export default function NotFound() {
  const [dots, setDots] = useState(".");

  // Animate the "Searching for destination..." dots
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "." : prev + "."));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[calc(100vh-90px)] bg-transfer-bg flex items-center justify-center overflow-hidden px-6 py-20">
      {/* Decorative background grid dots */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #c48746 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Decorative blurred green blob */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-transfer-green/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main card */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center max-w-xl w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* GPS status badge */}
        <motion.div
          className="flex items-center gap-2 bg-white border border-transfer-light-green rounded-full px-4 py-1.5 mb-8 shadow-sm"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.span
            className="w-2 h-2 rounded-full bg-transfer-green"
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          />
          <span className="text-sm font-medium text-transfer-gray">
            GPS signal lost{dots}
          </span>
        </motion.div>

        {/* 404 Hero Number */}
        <div className="text-[120px] md:text-[160px] leading-none mb-2 select-none tracking-tight">
          <FloatingDigit char="4" delay={0.3} color="text-transfer-dark" />
          <FloatingDigit char="0" delay={0.45} color="text-transfer-green" />
          <FloatingDigit char="4" delay={0.6} color="text-transfer-dark" />
        </div>

        {/* Route animation */}
        <RouteAnimation />

        {/* Headline */}
        <motion.h1
          className="text-2xl md:text-3xl font-bold text-transfer-dark mt-4 mb-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          Looks like you took a wrong turn.
        </motion.h1>

        {/* Sub-text */}
        <motion.p
          className="text-transfer-gray text-base md:text-lg leading-relaxed mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
        >
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          <br className="hidden md:block" />
          Let us get you back on the right route.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link href="/">
            <Button className="flex items-center gap-2 px-8 py-3 text-base">
              <Home className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>

          <Link href="/contact">
            <Button variant="secondary" className="flex items-center gap-2 px-8 py-3 text-base">
              <Phone className="w-4 h-4" />
              Contact Us
            </Button>
          </Link>
        </motion.div>

        {/* Quick links */}
        <motion.div
          className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-transfer-gray"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.5 }}
        >
          <span className="font-medium text-transfer-dark flex items-center gap-1.5">
            <Navigation className="w-3.5 h-3.5 text-transfer-green" />
            Or explore:
          </span>
          {[
            { label: "Fleet", href: "/fleet" },
            { label: "About Us", href: "/about" },
            { label: "FAQ", href: "/faq" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative group text-transfer-gray hover:text-transfer-green transition-colors"
            >
              {link.label}
              <span className="absolute left-0 bottom-[-2px] w-0 h-[1.5px] bg-transfer-green transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </motion.div>

        {/* Location pin decoration */}
        <motion.div
          className="mt-14 flex items-center gap-1.5 text-xs text-transfer-gray/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          <MapPin className="w-3.5 h-3.5 text-transfer-green/50" />
          <span>Hurghada Airport Transfer Service</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
