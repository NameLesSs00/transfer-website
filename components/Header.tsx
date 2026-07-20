"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/Button";
import { MobileMenu } from "./MobileMenu";
import { Globe, ChevronDown, Menu, X, Search, Loader2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { apiRequest, ApiResponse } from "@/lib/apiClient";

function ViewBookingModal({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 100);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = code.trim();
    if (!trimmed) return;
    setLoading(true);
    setError(null);
    try {
      const res = await apiRequest<ApiResponse<{ code: string }>>(`Bookings/${trimmed}`);
      if (res.success && res.data) {
        onClose();
        router.push(`/booking/${trimmed}`);
      } else {
        setError("Booking not found. Please check your code and try again.");
      }
    } catch {
      setError("Booking not found. Please check your code and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 10 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 10 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-transfer-dark">View Your Booking</h2>
            <p className="text-sm text-transfer-gray mt-0.5">Enter your booking reference code</p>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <X className="h-4 w-4 text-gray-600" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              ref={inputRef}
              type="text"
              value={code}
              onChange={(e) => { setCode(e.target.value); setError(null); }}
              placeholder="Enter your booking reference code"
              className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm font-mono text-transfer-dark placeholder-gray-400 outline-none focus:border-transfer-green focus:ring-2 focus:ring-transfer-green/20 transition-all"
            />
          </div>

          {error && (
            <div className="flex items-start gap-2 rounded-lg bg-red-50 px-3 py-2.5 text-sm text-red-600">
              <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !code.trim()}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-transfer-green text-sm font-bold text-white transition-all hover:bg-transfer-green/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Searching...
              </>
            ) : (
              <>
                <Search className="h-4 w-4" />
                Find Booking
              </>
            )}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Fleet", href: "/fleet" },
    { name: "Cities", href: "/cities" },
    { name: "Routes", href: "/routes" },
    { name: "About us", href: "/about" },
    { name: "FAQ", href: "/faq" },
    { name: "Contact us", href: "/contact" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
        className="w-full bg-transfer-bg h-[90px] flex items-center justify-between px-6 md:px-12 lg:px-24 sticky top-0 z-40"
      >
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link href="/" className="flex h-16 items-center">
            <Image
              src="/Logo.png"
              alt="Rubin Tours"
              width={38}
              height={49}
              className="h-12 w-auto object-contain md:h-14"
              priority
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative pb-1 transition-colors ${isActive ? "text-transfer-dark font-semibold" : "text-transfer-gray hover:text-transfer-dark"}`}
              >
                {link.name}
                {isActive && (
                  <motion.span
                    layoutId="underline"
                    className="absolute left-0 bottom-0 w-full h-[2px] bg-transfer-dark"
                  ></motion.span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="flex items-center gap-2 cursor-pointer group">
            <Globe className="w-5 h-5 text-transfer-green group-hover:scale-110 transition-transform" />
            <span className="font-medium text-transfer-dark group-hover:text-transfer-green transition-colors">En</span>
            <ChevronDown className="w-4 h-4 text-transfer-dark group-hover:text-transfer-green transition-colors" />
          </div>

          <button
            onClick={() => setIsBookingModalOpen(true)}
            className="rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-transfer-dark transition-all hover:border-transfer-green hover:text-transfer-green"
          >
            View Your Booking
          </button>

          <Button href="/cities">Book Transfer</Button>
        </div>

        {/* Mobile Hamburger Menu */}
        <button
          className="flex items-center justify-center rounded-lg p-2 text-transfer-green transition-colors hover:bg-transfer-light-green lg:hidden"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu className="w-8 h-8" />
        </button>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
            onOpenBookingModal={() => { setIsMobileMenuOpen(false); setIsBookingModalOpen(true); }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isBookingModalOpen && (
          <ViewBookingModal onClose={() => setIsBookingModalOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
