'use client'
import React, { useState } from "react";

const FAQSection = () => {
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  const faqs = [
    {
      id: "faq-1",
      question: "How do I update my billing information?",
      answer:
        "To contact customer support, look for a 'Contact us' or 'Help' button or link on the website or platform. You may be able to email, call, or chat with customer support for assistance.",
    },
    {
      id: "faq-2",
      question: "How can I contact customer support?",
      answer:
        "To contact customer support, look for a 'Contact us' or 'Help' button or link on the website or platform. You may be able to email, call, or chat with customer support for assistance.",
    },
    {
      id: "faq-3",
      question: "How do I update my profile information?",
      answer:
        "To contact customer support, look for a 'Contact us' or 'Help' button or link on the website or platform. You may be able to email, call, or chat with customer support for assistance.",
    },
    {
      id: "faq-4",
      question: "How do I find my purchase history?",
      answer:
        "To contact customer support, look for a 'Contact us' or 'Help' button or link on the website or platform. You may be able to email, call, or chat with customer support for assistance.",
    },
  ];

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-36">
        {/* Header */}
        <div className="mb-16 text-center">
        <div className="flex items-center justify-center mb-4">
  <h2 className="inline-block font-extrabold text-xs sm:text-xs md:text-sm lg:text-md text-indigo-700 text-center tracking-wider bg-indigo-200 rounded-md px-2 py-0">
    FREQUENTLY ASKED QUESTIONS
  </h2>
</div>

          <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
            Some Questions You Might Have
          </h2>
        </div>

        {/* Accordion */}
        <div className="">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className={`accordion py-4 px-4  shadow-sm rounded-md transition-all duration-500 ${
                activeAccordion === faq.id ? "bg-indigo-50" : "hover:bg-indigo-50"
              }`}
            >
              <button
                onClick={() => toggleAccordion(faq.id)}
                className="accordion-toggle group inline-flex items-center justify-between w-full text-left leading-8 text-gray-900 hover:text-indigo-700 transition duration-500"
              >
               <h5
  className={`transition-all duration-300 ${
    activeAccordion === faq.id
      ? "text-indigo-700 font-medium text-sm lg:text-lg scale-100 opacity-100"
      : "font-medium scale-90 text-sm lg:text-lg opacity-80"
  }`}
>
  {faq.question}
</h5>

                <svg
                  className={`text-gray-500 transition-transform duration-500 group-hover:text-indigo-700 ${
                    activeAccordion === faq.id ? "rotate-180 text-indigo-700" : ""
                  }`}
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.5 8.25L12.4142 12.3358C11.7475 13.0025 11.4142 13.3358 11 13.3358C10.5858 13.3358 10.2525 13.0025 9.58579 12.3358L5.5 8.25"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </button>
              <div
                className={`accordion-content w-full px-0 overflow-hidden transition-max-height duration-500 ${
                  activeAccordion === faq.id ? "max-h-40" : "max-h-0"
                }`}
              >
                <p className="text-xs lg:text-sm text-gray-900 leading-6 mt-4">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
