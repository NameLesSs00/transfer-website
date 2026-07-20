"use client";

import React, { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "Do you provide transfers 24/7?",
    answer:
      "Yes, our airport transfer service is available 24 hours a day, 7 days a week, including public holidays.",
  },
  {
    question: "Which destinations do you cover?",
    answer:
      "We cover all major Red Sea resorts including Hurghada, El Gouna, Safaga, Makadi Bay, Sahl Hasheesh, Marsa Alam, and more. If you're unsure about your destination, feel free to contact us.",
  },
  {
    question: "How can I book my transfer?",
    answer:
      "Simply fill in the booking form on our website with your pickup location, destination, date, and number of passengers. You'll receive instant confirmation via WhatsApp or email.",
  },
  {
    question: "How is the price calculated?",
    answer:
      "Our prices are fixed and based on the route and vehicle type you select. There are no hidden fees — the price you see is the price you pay, regardless of traffic or waiting time.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-white py-16 md:py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto flex flex-col gap-10">

        {/* Heading */}
        <motion.div 
          className="flex flex-col items-center gap-3"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-center text-3xl font-bold text-transfer-green md:text-4xl">
            FAQ
          </h2>
          <div
            className="rounded-full"
            style={{
              width: "120px",
              height: "4px",
              background: "#fbf5f0",
            }}
          />
        </motion.div>

        {/* Accordion */}
        <motion.div 
          className="flex flex-col gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className="rounded-2xl overflow-hidden"
                style={{ background: "#fbf5f0" }}
              >
                {/* Question row */}
                <button
                  id={`faq-item-${index}`}
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-base md:text-lg font-semibold text-transfer-dark pr-4">
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 flex-shrink-0 text-transfer-dark" />
                  ) : (
                    <ChevronDown className="w-5 h-5 flex-shrink-0 text-transfer-dark" />
                  )}
                </button>

                {/* Answer — animated */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      style={{ overflow: "hidden" }}
                    >
                      <p className="px-6 pb-6 text-sm md:text-base text-transfer-gray leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
