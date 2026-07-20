"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const reviews = [
  {
    profile: "/Hompage/profile1.jpg",
    name: "Sarah M.",
    country: "United Kingdom",
    date: "3:00Pm 12/1/2025",
    review:
      'Excellent service from start to finish. Our driver was waiting for us at the airport, the car was spotless, and the journey to our hotel was smooth and comfortable."',
  },
  {
    profile: "/Hompage/profile2.jpg",
    name: "Mark D.",
    country: "Germany",
    date: "3:00Pm 12/1/2025",
    review:
      'Booking was quick and easy. The fixed price was exactly what we paid, with no hidden fees. Highly recommended."',
  },
  {
    profile: "/Hompage/profile3.jpg",
    name: "Emily R.",
    country: "France",
    date: "3:00Pm 12/1/2025",
    review:
      'We booked a Microbus for our family group, and everything was perfectly organized. Great communication via WhatsApp and an on-time pickup."',
  },
];

function StarRating() {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className="w-5 h-5"
          viewBox="0 0 20 20"
          fill="#F59E0B"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({
  review,
  isActive,
}: {
  review: (typeof reviews)[0];
  isActive: boolean;
}) {
  return (
    <div
      className="flex flex-col gap-4 rounded-[24px] p-6 md:p-8 h-full"
      style={{
        background: isActive ? "#ffffff" : "#fbf5f0",
        minHeight: "280px",
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="relative w-14 h-14 flex-shrink-0 rounded-full overflow-hidden">
          <Image
            src={review.profile}
            alt={review.name}
            fill
            draggable={false}
            className="object-cover"
            sizes="56px"
          />
        </div>
        <div className="flex flex-col">
          <p className="font-bold text-transfer-dark text-sm md:text-base">
            {review.name}{" "}
            <span className="font-normal text-transfer-gray">
              – {review.country}
            </span>
          </p>
          <p className="text-xs text-transfer-gray">{review.date}</p>
          <StarRating />
        </div>
      </div>

      {/* Review text */}
      <p className="text-sm md:text-base text-transfer-gray leading-relaxed">
        {review.review}
      </p>
    </div>
  );
}

export function Customers() {
  // Desktop carousel state
  const [activeIndex, setActiveIndex] = useState(1);

  const prev = () =>
    setActiveIndex((i) => (i - 1 + reviews.length) % reviews.length);
  const next = () =>
    setActiveIndex((i) => (i + 1) % reviews.length);

  // Mobile carousel state
  const carouselRef = useRef<HTMLDivElement>(null);
  const [mobileActive, setMobileActive] = useState(0);

  const observerCallback: IntersectionObserverCallback = useCallback(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setMobileActive(Number((entry.target as HTMLElement).dataset.index));
        }
      });
    },
    []
  );

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const slides = carousel.querySelectorAll<HTMLElement>("[data-index]");
    const observer = new IntersectionObserver(observerCallback, {
      root: carousel,
      threshold: 0.6,
    });
    slides.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [observerCallback]);

  const scrollToSlide = (index: number) => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    carousel
      .querySelector<HTMLElement>(`[data-index="${index}"]`)
      ?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  // Ordered indices for desktop: left, center (active), right
  const leftIndex = (activeIndex - 1 + reviews.length) % reviews.length;
  const rightIndex = (activeIndex + 1) % reviews.length;
  const orderedDesktop = [leftIndex, activeIndex, rightIndex];

  return (
    <section
      className="w-full py-16 md:py-24 px-6 md:px-12 lg:px-16"
      style={{ background: "rgba(14, 24, 33, 1)" }}
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-12">

        {/* Heading */}
        <motion.div
          className="flex flex-col items-center gap-3"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center">
            What Our Customer say?
          </h2>
          <div
            className="rounded-full"
            style={{
              width: "120px",
              height: "4px",
              background: "rgba(251, 245, 240, 0.45)",
            }}
          />
        </motion.div>

        {/* ── DESKTOP: 3-card carousel with arrows (hidden on mobile) ── */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Left arrow */}
          <button
            id="customers-prev"
            onClick={prev}
            aria-label="Previous review"
            className="flex-shrink-0 w-11 h-11 rounded-full border-2 border-white/60 flex items-center justify-center text-white hover:bg-white/10 transition-colors duration-200 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Cards */}
          <div className="flex-1 grid grid-cols-3 gap-4">
            {orderedDesktop.map((reviewIndex, position) => (
              <motion.div
                key={reviewIndex}
                layout
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <ReviewCard
                  review={reviews[reviewIndex]}
                  isActive={position === 1}
                />
              </motion.div>
            ))}
          </div>

          {/* Right arrow */}
          <button
            id="customers-next"
            onClick={next}
            aria-label="Next review"
            className="flex-shrink-0 w-11 h-11 rounded-full border-2 border-white/60 flex items-center justify-center text-white hover:bg-white/10 transition-colors duration-200 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* ── MOBILE: swipe carousel + dots (hidden on desktop) ── */}
        <div className="flex flex-col items-center gap-6 lg:hidden">
          <div
            ref={carouselRef}
            className="w-full flex overflow-x-auto gap-4 snap-x snap-mandatory scroll-smooth pb-2 [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: "none" }}
          >
            {reviews.map((review, index) => (
              <div
                key={review.name}
                data-index={index}
                className="flex-none w-[85vw] snap-center"
              >
                <ReviewCard review={review} isActive={index === 1} />
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="flex items-center gap-3">
            {reviews.map((_, index) => (
              <button
                key={index}
                id={`customer-dot-${index}`}
                aria-label={`Go to review ${index + 1}`}
                onClick={() => scrollToSlide(index)}
                className="rounded-full transition-all duration-300 focus:outline-none"
                style={{
                  width: mobileActive === index ? "28px" : "10px",
                  height: "10px",
                  background:
                    mobileActive === index
                      ? "#c48746"
                      : "rgba(255,255,255,0.35)",
                  border: "none",
                  cursor: "pointer",
                }}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
