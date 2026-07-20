"use client";

import React, { useState, useEffect } from "react";
import { ChevronUp, ChevronDown, Loader2, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchFaqs } from "@/store/features/faqs/faqsSlice";
import { hydrateAuth } from "@/store/features/auth/authSlice";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const dispatch = useAppDispatch();
  const { hydrated } = useAppSelector((state) => state.auth);
  const { items: faqs, listStatus } = useAppSelector((state) => state.faqs);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    dispatch(hydrateAuth());
  }, [dispatch]);

  useEffect(() => {
    if (!hydrated) return;
    dispatch(fetchFaqs({ pageNumber: 1, pageSize: 5 }));
  }, [dispatch, hydrated]);

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
            style={{ width: "120px", height: "4px", background: "#fbf5f0" }}
          />
        </motion.div>

        {/* Loading */}
        {listStatus === "loading" && (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-transfer-green" />
          </div>
        )}

        {/* Accordion */}
        {listStatus !== "loading" && faqs.length > 0 && (
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
                  key={faq.id}
                  className="rounded-2xl overflow-hidden"
                  style={{ background: "#fbf5f0" }}
                >
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
        )}

        {/* View All button */}
        {listStatus !== "loading" && (
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 rounded-full border border-transfer-green px-8 py-3 text-sm font-semibold text-transfer-green transition-all hover:bg-transfer-green hover:text-white"
            >
              View All FAQs
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        )}

      </div>
    </section>
  );
}
