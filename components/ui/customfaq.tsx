'use client';

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Script from "next/script";

const FAQSection = () => {
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  const faqs = [
    {
      id: "faq-1",
      question: "Can I still use this platform if I'm just starting and don't have an interview yet?",
      answer: "Use it to understand the general expectations of interviews at your dream companies, start identifying patterns, and focus your preparation. Knowing what's commonly asked and how processes work can give you a huge advantage before you even apply.",
    },
    {
      id: "faq-2",
      question: "Are the submissions anonymous?",
      answer: "Yes, all information is 100% anonymous. Nothing is ever linked to you or any other information that could be used to identify you. We prioritize your privacy so you can share your experiences candidly.",
    },
    {
      id: "faq-3",
      question: "What if I can't find interview experiences for a specific company or role?",
      answer: "Our database grows as users contribute. If you can't find information for your target company or role, you can be the first to add your experience after completing your interview. This way, you help others while we continue building the database.",
    },
    {
      id: "faq-4",
      question: "How do I know if the experiences shared apply to my specific role or location?",
      answer: "We tag entries by job title, level, location, and many other filters so you can filter results to match your specific circumstances. While some companies have consistent processes across roles, we recommend using filters for the most relevant results.",
    },
    {
      id: "faq-5",
      question: "Is this website really free?",
      answer: "Yes! Our goal is to democratize access to interview preparation. No hidden charges or subscriptions.",
    },
  ];

  return (
<section className="py-12 lg:py-24 overflow-hidden">
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.8 }}
    className="container mx-auto px-4 sm:px-6 lg:px-8"
  >
    <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 items-start">
      {/* Left Side: Headings */}
      <motion.div
        className="space-y-4 mb-8 lg:mb-0 flex flex-col items-center lg:sticky lg:top-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <motion.div
          className="flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="inline-block font-extrabold text-xs sm:text-sm lg:text-md text-indigo-700 text-center tracking-wider bg-indigo-200 rounded-md px-2 py-0">
            FREQUENTLY ASKED QUESTIONS
          </h2>
        </motion.div>
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Your Burning Questions
        </motion.h2>
        <p className="text-center mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
  Here&apos;s a list of questions people keep asking us. If yours isn&apos;t here, don&apos;t panic we&apos;re not psychic, but we do answer emails!
</p>

      </motion.div>

      {/* Right Side: Accordion */}
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        {faqs.map((faq, index) => (
          <motion.div
            key={faq.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
          >
            <button
              onClick={() => toggleAccordion(faq.id)}
              className={`accordion w-full text-left py-4 px-4 shadow-sm rounded-md transition-all duration-500 ${
                activeAccordion === faq.id
                  ? "bg-indigo-50 border-indigo-700"
                  : "bg-white hover:bg-indigo-50 border-gray-200"
              }`}
            >
              <div className="flex justify-between items-center">
                <h3
                  className={`transition-colors duration-300 ${
                    activeAccordion === faq.id
                      ? "text-indigo-700 font-medium text-xs lg:text-sm pl-2"
                      : "text-gray-800 font-medium text-xs lg:text-sm pl-2"
                  }`}
                >
                  {faq.question}
                </h3>
                <motion.svg
                  className="w-5 h-5 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                  animate={{ rotate: activeAccordion === faq.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </motion.svg>
              </div>
            </button>
            <AnimatePresence>
              {activeAccordion === faq.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-xs lg:text-sm text-gray-700 leading-6 mt-2 px-4 py-2">
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>
    </div>
      </motion.div>
      <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome to My Page</h1>
      <p>Here is some content...</p>

      {/* Google AdSense Ad */}
      <div className="mt-6 flex justify-center">
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-1030596789108573"
          data-ad-slot="1234567890"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>

      <Script id="adsense-init" strategy="afterInteractive">
        {`(adsbygoogle = window.adsbygoogle || []).push({});`}
      </Script>
    </div>
</section>
  );
};

export default FAQSection;

