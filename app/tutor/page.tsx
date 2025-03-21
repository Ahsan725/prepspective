'use client';

import React from 'react';
import { Star, Lock, Check, CheckCircle2, Target, CalendarClock, Rocket } from 'lucide-react';
import { motion, useAnimation } from 'framer-motion';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Software Engineer at Google",
    text: "The tutoring sessions were instrumental in helping me land my dream job. The structured approach and personalized feedback made all the difference.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&h=128&q=80"
  },
  {
    name: "Michael Rodriguez",
    role: "Senior Developer at Meta",
    text: "I went from struggling with medium problems to confidently solving hard ones. The pattern recognition techniques taught were invaluable.",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&h=128&q=80"
  },
  {
    name: "Emily Johnson",
    role: "Software Engineer at Amazon",
    text: "The 5-session package was exactly what I needed to prepare for my technical interviews. Worth every penny!",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&h=128&q=80"
  }
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-5 w-5 ${rating > 4.5 || i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
        />
      ))}
      <span className="ml-2 text-lg font-semibold text-gray-700">{rating.toFixed(1)}</span>
    </div>
  );
}

export default function TutorPage() {
  const controls = useAnimation();
  const [currentTestimonial, setCurrentTestimonial] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-l from-teal-50 via-indigo-50 to-purple-50 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Master LeetCode with <span className="text-indigo-700 font-bold">1-on-1 Tutoring</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Personalized sessions designed to help you break through coding interviews with confidence and consistency.
          </p>
          <div className="flex flex-col items-center justify-center gap-2 mt-6">
            <StarRating rating={4.9} />
            <p className="text-gray-600">from 100+ satisfied students</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg max-w-3xl mx-auto mb-20">
          <div className="flex items-start gap-4">
            <img
              src={testimonials[currentTestimonial].image}
              alt={testimonials[currentTestimonial].name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <StarRating rating={testimonials[currentTestimonial].rating} />
              <p className="text-gray-700 mt-3 text-lg italic">{testimonials[currentTestimonial].text}</p>
              <div className="mt-4">
                <p className="font-semibold text-gray-900">{testimonials[currentTestimonial].name}</p>
                <p className="text-gray-600">{testimonials[currentTestimonial].role}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Single Session */}
          <div className="relative bg-white rounded-2xl shadow-xl p-8 hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-center mb-4">
              <CalendarClock className="w-12 h-12 text-gray-600" />
            </div>
            <h3 className="text-2xl font-bold text-center mb-2">Single Session</h3>
            <p className="text-gray-600 text-center mb-6 h-20">Perfect for debugging tough problems or getting help on a specific topic.</p>
            <div className="text-center mb-6">
              <span className="text-4xl font-bold">$19</span>
              <p className="text-sm text-gray-500">One-time session</p>
            </div>
            <ul className="space-y-4 mb-8">
              {["45-minute personalized session", "Problem-solving strategies", "Interview preparation tips", "Post-session resources"].map((feature, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-indigo-500 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>
            <button
              className="w-full py-3 px-6 rounded-lg font-semibold text-lg bg-gray-100 text-gray-800 hover:bg-gray-200"
              onClick={() => window.location.href = "https://book.stripe.com/00g2a6c0E2GY38Q7ss"}
            >
              Book Now
            </button>
          </div>

          {/* Targeted Prep Accelerator */}
          <div className="relative bg-white rounded-2xl shadow-xl p-8 border-2 border-indigo-500 transform scale-105">
            <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
              <span className="bg-indigo-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </span>
            </div>
            <div className="flex items-center justify-center mb-4">
              <Target className="w-12 h-12 text-indigo-500" />
            </div>
            <h3 className="text-2xl font-bold text-center mb-2">Targeted Prep Accelerator</h3>
            <p className="text-gray-600 text-center mb-6 h-20">Got an interview next week? This package helps you prep fast and effectively for one specific company.</p>
            <div className="text-center mb-6">
              <span className="text-4xl font-bold">$65</span>
              <p className="text-sm text-gray-500 line-through">$95</p>
              <p className="text-xl font-bold text-indigo-600">SAVE 32%!</p>
              <p className="text-sm text-gray-500">Focused 3-day prep</p>
            </div>
            <ul className="space-y-4 mb-8">
              {["3 x 60-minute targeted sessions", "Company-specific question patterns", "Live mock interviews", "Custom feedback & action plan", "No LeetCode Premium Required"].map((feature, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-indigo-500 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>
            <button
              className="w-full py-3 px-6 rounded-lg font-semibold text-lg bg-indigo-500 text-white hover:bg-indigo-600"
              onClick={() => window.location.href = "https://book.stripe.com/test-targeted-package"}
            >
              Start Interview Prep
            </button>
          </div>

          {/* 5-Session Package */}
          <div className="relative bg-white rounded-2xl shadow-xl p-8 hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-center mb-4">
              <Rocket className="w-12 h-12 text-gray-600" />
            </div>
            <h3 className="text-2xl font-bold text-center mb-2">5-Session Package</h3>
            <p className="text-gray-600 text-center mb-6 h-20">Best value for consistent growth and interview prep mastery.</p>
            <div className="text-center mb-6">
              <span className="text-4xl font-bold">$49</span>
              <p className="text-sm text-gray-500 line-through">$95</p>
              <p className="text-xl font-bold text-indigo-600">SAVE 48%!</p>
              <p className="text-sm text-gray-500">Complete bundle</p>
            </div>
            <ul className="space-y-4 mb-8">
              {["5 x 45-minute sessions", "Structured learning path", "Progress tracking", "Interview simulation"].map((feature, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-indigo-500 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>
            <button
              className="w-full py-3 px-6 rounded-lg font-semibold text-lg bg-gray-100 text-gray-800 hover:bg-gray-200"
              onClick={() => window.location.href = "https://book.stripe.com/4gweWS7Ko95m6l24gh"}
            >
              Get Package Deal
            </button>
          </div>
        </div>

        <div className="text-base text-indigo-700 flex items-center justify-center gap-1 mt-12">
          <Lock className="h-5 w-5" />
          <p>Secure payment powered by Stripe</p>
        </div>
      </div>
    </div>
  );
}
