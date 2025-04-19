"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQSection: React.FC = () => {
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  const faqs = [
    {
      id: "faq-1",
      question:
        "I'm brand‑new to interviewing. Is PrepSpective still useful for me?",
      answer:
        "Definitely. Start with our AI Interview Practice to get a feel for real questions and professional feedback before you even apply. You can also track foundational LeetCode problems and let SkillScan AI highlight which data‑structures & algorithms to learn next.",
    },
    {
      id: "faq-2",
      question: "How does the AI Interview Practice actually work?",
      answer:
        "We pair state‑of‑the‑art language models with domain‑specific question banks. The AI interviewer adapts follow‑ups on the fly and scores your responses on clarity, depth, and structure—then delivers an actionable report within seconds.",
    },
    {
      id: "faq-3",
      question: "What makes your LeetCode progress tracker different?",
      answer:
        "Every problem you solve is scheduled for spaced repetition so you retain patterns long‑term. A distraction‑free workspace keeps you focused, while dashboards show success rates and average solve times across topics.",
    },
    {
      id: "faq-4",
      question: "What is SkillScan AI and how accurate is it?",
      answer:
        "SkillScan AI analyzes your solved problems, interview transcripts, and code submissions to pinpoint weak areas—down to specific DS&A concepts like binary search or graph traversal. Its recommendations are continuously refined from thousands of data points across users and mock sessions.",
    },
    {
      id: "faq-5",
      question: "Is PrepSpective really free?",
      answer:
        "Yes! We believe elite interview prep should be accessible to everyone. All core features—including AI practice, tracking, and SkillScan insights—are available at no cost.",
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
              We get these a lot—if yours is not here, hit us up and we will add it!
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
    </section>
  );
};

export default FAQSection;
