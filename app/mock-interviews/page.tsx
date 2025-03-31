'use client';

import React from 'react';
import { Lock, CheckCircle2, Mic, Users, Briefcase } from 'lucide-react';

export default function MockInterviewPage() {
  const packages = [
    {
      title: '1 Mock Interview',
      price: '$39',
      original: null,
      description: 'One 45-minute session with someone who landed a role at your dream company.',
      icon: Mic,
      features: [
        'Realistic interview simulation',
        'Live feedback session',
        'Tailored for interns & new grads',
        'Any discipline — not just tech',
        'Choose your interviewer based on role/field'
      ],
      cta: 'Book a Session',
      link: 'https://buy.stripe.com/bIY7uqaWAgxO7p65kq'
    },
    {
      title: '3 Interview Bundle',
      price: '$99',
      original: '$117',
      discount: '15%',
      description: 'Prep across multiple rounds or companies with different interviewers.',
      icon: Users,
      features: [
        '3 x 45-minute mock interviews',
        'Rotating interviewers from different fields',
        'Targeted for behavioral + technical prep',
        'Optional resume review add-on',
        'Access to post-interview notes & scorecard'
      ],
      cta: 'Get the Bundle',
      link: 'https://buy.stripe.com/9AQbKG7Ko6XedNufZ5'
    },
    {
      title: 'Ultimate 7 Pack',
      price: '$199',
      original: '$273',
      discount: '27%',
      description: 'Master your interviews with 7 rounds led by professionals who got the offer.',
      icon: Briefcase,
      popular: true,
      features: [
        '7 x 45-minute mock interviews',
        'Mix of technical, behavioral, & system design (if relevant)',
        'Peer-level mentors from Google, Meta, Amazon, and more',
        'Personalized improvement roadmap',
        'Free scheduling flexibility'
      ],
      cta: 'Start Full Prep',
      link: 'https://buy.stripe.com/fZe01Y8Os3L2dNueV2'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-l from-teal-50 via-indigo-50 to-purple-50 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Professional Mock Interviews with <span className="text-indigo-700">People Who Made It</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get interview practice with interns and new grads who landed roles at top companies — no matter your field or major.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl shadow-xl p-8 transition-transform duration-300 ${pkg.popular ? 'border-2 border-indigo-500 transform scale-105' : 'hover:scale-105'}`}
            >
              {pkg.popular && (
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
                  <span className="bg-indigo-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              <div className="flex items-center justify-center mb-4">
                <pkg.icon className={`w-12 h-12 ${pkg.popular ? 'text-indigo-500' : 'text-gray-600'}`} />
              </div>
              <h3 className="text-2xl font-bold text-center mb-2">{pkg.title}</h3>
              <p className="text-gray-600 text-center mb-6 h-24">{pkg.description}</p>
              <div className="text-center mb-6">
                <span className="text-4xl font-bold">{pkg.price}</span>
                {pkg.original && (
                  <>
                    <p className="text-base text-gray-500 line-through">{pkg.original}</p>
                    <p className="text-xl font-bold text-indigo-600">SAVE {pkg.discount}!</p>
                  </>
                )}
                <p className="text-sm text-gray-500">One-time payment</p>
              </div>
              <ul className="space-y-4 mb-8">
                {pkg.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-indigo-500 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-3 px-6 rounded-lg font-semibold text-lg transition-colors ${pkg.popular ? 'bg-indigo-500 text-white hover:bg-indigo-600' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                onClick={() => window.location.href = pkg.link}
              >
                {pkg.cta}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-lg text-gray-700 font-semibold">
            Get real-world prep — not textbook rehearsals
          </p>
          <p className="text-sm text-gray-500 mt-2 max-w-xl mx-auto">
            All sessions are run by successful interns and grads who have gone through the same process as you. From behavioral prep to whiteboard and product Qs, you are learning directly from those who cracked it.
          </p>
          <div className="text-base text-indigo-700 flex items-center justify-center gap-1 mt-4">
            <Lock className="h-5 w-5" />
            <p>Secure checkout powered by Stripe</p>
          </div>
        </div>
      </div>
    </div>
  );
}
