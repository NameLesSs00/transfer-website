"use client";

import React, { useState, useEffect } from "react";
import { ChevronUp, ChevronDown, Loader2, Home, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchFaqs } from "@/store/features/faqs/faqsSlice";
import { hydrateAuth } from "@/store/features/auth/authSlice";

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
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
    dispatch(fetchFaqs({ pageNumber: 1, pageSize: 100 }));
  }, [dispatch, hydrated]);

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Hero */}
      <section className="w-full bg-transfer-dark py-20 px-6 md:px-12 lg:px-24">
        <motion.div
          className="max-w-4xl mx-auto flex flex-col items-center gap-4 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-transfer-green/20">
            <HelpCircle className="h-8 w-8 text-transfer-green" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Frequently Asked Questions
          </h1>
          <p className="text-base md:text-lg text-gray-300 max-w-xl leading-relaxed">
            Everything you need to know about our transfer service. Can&apos;t find the answer? Contact our support team.
          </p>
        </motion.div>
      </section>

      {/* FAQ Content */}
      <section className="w-full max-w-4xl mx-auto px-6 md:px-12 lg:px-24 py-16">

        {/* Loading */}
        {listStatus === "loading" && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="h-10 w-10 animate-spin text-transfer-green" />
            <p className="text-sm text-gray-500">Loading FAQs...</p>
          </div>
        )}

        {/* Empty */}
        {listStatus !== "loading" && faqs.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
            <HelpCircle className="h-12 w-12 text-gray-300" />
            <p className="text-lg font-semibold text-slate-600">No FAQs available yet.</p>
            <p className="text-sm text-gray-400">Check back soon or contact our support team.</p>
          </div>
        )}

        {/* Accordion */}
        {listStatus !== "loading" && faqs.length > 0 && (
          <motion.div
            className="flex flex-col gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <motion.div
                  key={faq.id}
                  className="rounded-2xl overflow-hidden bg-white shadow-sm border border-gray-100"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
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
                      <ChevronUp className="w-5 h-5 flex-shrink-0 text-transfer-green" />
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
                        <p className="px-6 pb-6 text-sm md:text-base text-transfer-gray leading-relaxed border-t border-gray-100 pt-3">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* Back to Home */}
        <motion.div
          className="flex justify-center mt-14"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-transfer-green px-8 py-3.5 text-sm font-bold text-white transition-all hover:bg-transfer-green/90 hover:shadow-lg hover:shadow-transfer-green/20"
          >
            <Home className="h-4 w-4" />
            Return to Homepage
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
