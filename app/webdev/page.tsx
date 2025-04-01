'use client';

import React from 'react';
import { Lock, CheckCircle2, Layout, Layers, ServerCog } from 'lucide-react';

export default function WebDevPage() {
  const packages = [
    {
      title: '1-Page Website',
      price: '$59',
      originalPrice: null,
      savingsPercent: null,
      description: 'Ideal for personal portfolios, landing pages, or business intros.',
      icon: Layout,
      features: [
        'Clean, responsive design',
        'Your own theme colors and accents',
        'Premium scroll and hover animations',
        'Mobile and desktop ready',
        'Deployed on your custom domain',
        'Help with domain registration'
      ],
      cta: 'Get My Website',
      link: 'https://buy.stripe.com/cN201Y6Gk95meRycMV'
    },
    {
      title: '3-Page Website',
      price: '$99',
      originalPrice: '$199',
      savingsPercent: 'SAVE 50%',
      description: 'Perfect for service-based businesses, freelancers, or small brands.',
      icon: Layers,
      features: [
        'All features from 1-page package',
        'Home, About, Contact pages',
        'Custom contact form',
        'SEO optimization basics',
        'Email integration and setup'
      ],
      cta: 'Build My Site',
      link: 'https://buy.stripe.com/bIY4ie6GkbdudNuaEO'
    },
    {
      title: 'Micro-SaaS Starter',
      price: '$699',
      originalPrice: null,
      savingsPercent: 'SAVE 22%',
      description: 'Launch your startup idea with a functional micro-SaaS MVP.',
      icon: ServerCog,
      popular: true,
      features: [
        'Multi-page dynamic web app',
        'AI Integration and AI solutions',
        'Authentication and user system',
        'CI/CD auto-deployment setup',
        'Integrated payment gateway (Stripe)',
        'Database integration',
        '1-on-1 onboarding call & tech walkthrough'
      ],
      cta: 'Launch My SaaS',
      link: 'https://buy.stripe.com/bIYg0W4yca9qfVC7sD'
    }
  ];

  const handleNavigation = (link: string): void => {
    console.log('Navigating to:', link);
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-gradient-to-l from-teal-50 via-indigo-50 to-purple-50 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Get a Website That <span className="text-indigo-700">Works for You</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Whether you need a sleek portfolio, a business site, or a fully functional SaaS app — we have a package for you.
            No tech skills required. We take care of it all.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl shadow-xl p-8 transition-transform duration-300 ${
                pkg.popular ? 'border-2 border-indigo-500 transform scale-105' : 'hover:scale-105'
              }`}
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
                {pkg.originalPrice && (
                  <>
                    <p className="text-sm text-gray-500 line-through">{pkg.originalPrice}</p>
                    <p className="text-xl font-bold text-indigo-600">{pkg.savingsPercent}!</p>
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
                type="button"
                onClick={() => handleNavigation(pkg.link)}
                className={`w-full py-3 px-6 rounded-lg font-semibold text-lg transition-colors ${
                  pkg.popular
                    ? 'bg-indigo-500 text-white hover:bg-indigo-600'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {pkg.cta}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-lg text-gray-700 font-semibold">
            Every website is built with care and backed by our <span className="text-indigo-500">100% satisfaction guarantee</span>
          </p>
          <p className="text-sm text-gray-500 mt-2 max-w-xl mx-auto">
            For just <strong>$29/month</strong>, you can also subscribe to our maintenance plan — covering proactive support, small fixes, performance tweaks, and technical updates. This ensures your site stays fast, secure, and running smoothly. Note: support is only included with an active subscription, not on-demand after issues arise.
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
