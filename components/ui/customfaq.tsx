'use client';

import React, { useState } from "react";

const FAQSection = () => {
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  const faqs = [
    {
      id: "faq-1",
      question: "Can I still use this platform if I’m just starting and don’t have an interview yet?",
      answer: "Absolutely! Use it to understand the general expectations of interviews at your dream companies, start identifying patterns, and focus your preparation. Knowing what’s commonly asked and how processes work can give you a huge advantage before you even apply.",
    },
    {
      id: "faq-2",
      question: "Are the submissions anonymous?",
      answer: "Yes, all information is 100% anonymous. Nothing is ever linked to you or any other information that could be used to identify you. We prioritize your privacy so you can share your experiences candidly.",
    },
    {
      id: "faq-3",
      question: "What if I can’t find interview experiences for a specific company or role?",
      answer: "Our database grows as users contribute. If you can’t find information for your target company or role, you can be the first to add your experience after completing your interview. This way, you help others while we continue building the database.",
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
    <section className="py-24">
      <div className="w-full px-4 sm:px-6 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-3 items-start">
          {/* Left Side: Headings */}
          <div className="space-y-4 lg:pr-8 z-30">
            <div className="flex items-center justify-center">
              <h2 className="inline-block font-extrabold text-xs sm:text-sm lg:text-md text-indigo-700 text-center tracking-wider bg-indigo-200 rounded-md px-2 py-0">
                FREQUENTLY ASKED QUESTIONS
              </h2>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-center">
              Your Burning Questions (Extinguished)
            </h2>
            <p className="text-center mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
              Here’s a list of questions people keep asking us. If yours isn’t here, don’t panic we’re not psychic, but we do answer emails!
            </p>
          </div>

          {/* Right Side: Accordion */}
          <div className="lg:col-span-2 space-y-4 z-30 bg-white rounded-lg">
            {faqs.map((faq) => (
              <button
                key={faq.id}
                onClick={() => toggleAccordion(faq.id)}
                className={`accordion w-full text-left py-4 px-4 shadow-sm rounded-md transition-all duration-500 ${
                  activeAccordion === faq.id
                    ? "bg-indigo-50 border-indigo-700"
                    : "bg-white hover:bg-indigo-50 border-gray-200"
                }`}
              >
                <div className="flex justify-between items-center">
                  <h5
                    className={`transition-transform duration-300 ${
                      activeAccordion === faq.id
                        ? "text-indigo-700 font-medium text-xs lg:text-sm scale-105 pl-2"
                        : "text-gray-800 font-medium text-xs lg:text-sm pl-2"
                    }`}
                  >
                    {faq.question}
                  </h5>
                  <svg
                    className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                      activeAccordion === faq.id ? "rotate-180" : ""
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
                <div
                  className={`mt-2 overflow-hidden transition-max-height duration-500 ${
                    activeAccordion === faq.id ? "max-h-40" : "max-h-0"
                  }`}
                >
                  <p className="text-xs lg:text-sm text-gray-700 leading-6 mt-2">
                    {faq.answer}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
