"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/Button";
import { Globe, X, FileText } from "lucide-react";
import { motion } from "framer-motion";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBookingModal?: () => void;
}

export function MobileMenu({ onClose, onOpenBookingModal }: MobileMenuProps) {
  const pathname = usePathname();

  const linkVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    }),
  };

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-50 bg-transfer-bg flex flex-col pt-6 px-6 overflow-y-auto"
    >
      <div className="flex items-center justify-between mb-12">
        <Image src="/Logo.png" alt="Rubin Tours" width={38} height={49} className="h-12 w-auto object-contain" />
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 cursor-pointer">
            <Globe className="w-5 h-5 text-transfer-green" />
            <span className="font-medium text-transfer-dark">En</span>
            <svg className="w-4 h-4 text-transfer-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-6 h-6 text-gray-800" />
          </button>
        </div>
      </div>

      <nav className="flex flex-col gap-8 flex-grow">
        {[
          { name: "Home", href: "/" },
          { name: "Fleet", href: "/fleet" },
          { name: "Cities", href: "/cities" },
          { name: "Routes", href: "/routes" },
          { name: "Contact Us", href: "/contact" },
          { name: "About Us", href: "/about" },
        ].map((link, i) => {
          const isActive = pathname === link.href;
          return (
            <motion.div key={link.name} custom={i} initial="hidden" animate="visible" variants={linkVariants}>
              <Link
                href={link.href}
                className={`text-xl transition-colors ${
                  isActive
                    ? "font-medium text-transfer-green pb-2 border-b-2 border-transfer-green inline-block"
                    : "text-transfer-dark hover:text-transfer-green"
                }`}
                onClick={onClose}
              >
                {link.name}
              </Link>
            </motion.div>
          );
        })}
      </nav>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="pb-10 pt-4 mt-auto flex flex-col gap-3"
      >
        {onOpenBookingModal && (
          <button
            onClick={onOpenBookingModal}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-6 py-4 text-base font-semibold text-transfer-dark transition-all hover:border-transfer-green hover:text-transfer-green"
          >
            <FileText className="h-5 w-5" />
            View Your Booking
          </button>
        )}
        <Button href="/cities" onClick={onClose} className="w-full text-lg py-4">
          Book Transfer
        </Button>
      </motion.div>
    </motion.div>
  );
}
