"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/Button";
import { MobileMenu } from "./MobileMenu";
import { Globe, ChevronDown, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Fleet", href: "/fleet" },
    { name: "Cities", href: "/cities" },
    { name: "About us", href: "/about" },
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
          <Link href="/">
            <Image 
              src="/Logo.png" 
              alt="Logoipsum" 
              width={160} 
              height={45} 
              className="w-[140px] md:w-[160px] h-auto"
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
                className={`relative pb-1 transition-colors ${isActive ? "text-transfer-green font-medium" : "text-transfer-gray hover:text-transfer-green"}`}
              >
                {link.name}
                {isActive && (
                  <motion.span 
                    layoutId="underline"
                    className="absolute left-0 bottom-0 w-full h-[2px] bg-transfer-green"
                  ></motion.span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-8">
          <div className="flex items-center gap-2 cursor-pointer group">
            <Globe className="w-5 h-5 text-transfer-green group-hover:scale-110 transition-transform" />
            <span className="font-medium text-transfer-dark group-hover:text-transfer-green transition-colors">En</span>
            <ChevronDown className="w-4 h-4 text-transfer-dark group-hover:text-transfer-green transition-colors" />
          </div>
          
          <Button>Book Transfer</Button>
        </div>

        {/* Mobile Hamburger Menu */}
        <button 
          className="lg:hidden flex items-center justify-center p-2 text-transfer-green hover:bg-green-50 rounded-lg transition-colors"
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
          />
        )}
      </AnimatePresence>
    </>
  );
}
