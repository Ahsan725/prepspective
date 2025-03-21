// app/resume/page.tsx
'use client';

import React from 'react';
import { Check, FileText, FileEdit, FileDown, LucideIcon } from 'lucide-react';

type PricingCardProps = {
  title: string;
  price: string;
  features: string[];
  description: string;
  popular?: boolean;
  icon: LucideIcon;
};

function PricingCard({
  title,
  price,
  features,
  description,
  popular = false,
  icon: Icon,
}: PricingCardProps) {
  return (
    <div
      className={`relative bg-white rounded-2xl shadow-xl p-8 transition-transform duration-300 ${
        popular ? 'border-2 border-indigo-500 transform scale-105' : 'hover:scale-105'
      }`}
    >
      {popular && (
        <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
          <span className="bg-indigo-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
            Most Popular
          </span>
        </div>
      )}
      <div className="flex items-center justify-center mb-4">
        <Icon className={`w-12 h-12 ${popular ? 'text-indigo-500' : 'text-gray-600'}`} />
      </div>
      <h3 className="text-2xl font-bold text-center mb-2">{title}</h3>
      <p className="text-gray-600 text-center mb-6 h-24">{description}</p>
      <div className="text-center mb-6">
        <span className="text-4xl font-bold">${price}</span>
        <p className="text-sm text-gray-500">One-time investment in your career</p>
      </div>
      <ul className="space-y-4 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <Check className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
            <span className="text-gray-600">{feature}</span>
          </li>
        ))}
      </ul>
      <button
        className={`w-full py-3 px-6 rounded-lg font-semibold text-lg transition-colors ${
          popular
            ? 'bg-indigo-500 text-white hover:bg-indigo-600'
            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
        }`}
      >
        {popular ? 'Boost My Resume Now' : 'Choose This Plan'}
      </button>
    </div>
  );
}

export default function ResumePage() {
  const plans: PricingCardProps[] = [
    {
      title: 'ATS-Optimized Resume',
      price: '30',
      description:
        'We will professionally rewrite your resume using a format that consistently gets past Applicant Tracking Systems (ATS) and into recruiter hands.',
      features: [
        'ATS-optimized resume template',
        'Professional rewrite by experts',
        'Keyword optimization',
        'Delivered as PDF',
        '48-hour turnaround',
        '1 round of revisions',
      ],
      icon: FileText,
    },
    {
      title: 'Premium Editable Resume',
      price: '60',
      description:
        'Our best-seller. You receive everything from the basic package — plus full editability and personalized support to keep your resume future-proof.',
      popular: true,
      features: [
        'ATS-optimized resume template',
        'Professional rewrite by experts',
        'Keyword optimization',
        'Editable Word and Google Doc format',
        '48-hour turnaround',
        '2 rounds of revisions',
        '6 months of email support',
      ],
      icon: FileEdit,
    },
    {
      title: 'ATS Killer Template',
      price: '20',
      description:
        'Prefer to do it yourself? Use the exact template our experts use — complete with a guide, sample content, and keyword suggestions.',
      features: [
        'ATS-optimized template',
        'Fully editable format',
        'Step-by-step writing guide',
        'Real resume sample content',
        'Keyword bank included',
        'Lifetime access',
      ],
      icon: FileDown,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-l from-teal-50 via-indigo-50 to-purple-50 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Land More Interviews with a <span className=" text-indigo-700 font-bold">Resume That Works!</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
        85% of resumes never reach human eyes. Do not let yours be one of them. Our proven,
            ATS-optimized solutions have helped hundreds get interviews faster and repeatedly.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <PricingCard key={plan.title} {...plan} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-lg text-gray-700 font-semibold">
            Every package is backed by our <span className="text-indigo-500">100% satisfaction guarantee.</span>
          </p>
          <p className="text-sm text-gray-500 mt-2">
            If you do not go past the screening stage in the next 12 months of regularly applying, we will simply refund you. That is how much we believe in our product.
          </p>
        </div>
      </div>
    </div>
  );
}
