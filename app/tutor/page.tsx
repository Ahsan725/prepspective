'use client'
import React from 'react';
import { motion, useAnimation } from "framer-motion";
import { Star, Lock, CheckCircle2 } from "lucide-react";

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

export default function Tutor() {
  const controls = useAnimation();
  const [currentTestimonial, setCurrentTestimonial] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.div 
        initial="initial"
        animate="animate"
        variants={stagger}
        className="container mx-auto px-4 py-12"
      >
        <motion.div variants={fadeIn} className="text-center mb-8">
          <div className="inline-block bg-indigo-100 text-indigo-800 rounded-full px-3 py-1 text-sm font-medium mb-3">
            Limited Time Offer
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Master LeetCode With
            <span className="text-indigo-600"> Confidence</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Transform your problem-solving skills with personalized 1-on-1 tutoring sessions
            designed to help you crack coding interviews.
          </p>

          {/* Overall Rating */}
          <div className="flex flex-col items-center justify-center gap-2 mb-8">
            <StarRating rating={4.9} />
            <p className="text-gray-600">from 100+ satisfied students</p>
          </div>
        </motion.div>

        {/* Testimonials Section */}
        <motion.div 
          variants={fadeIn}
          className="max-w-3xl mx-auto mb-16"
        >
          <motion.div
            key={currentTestimonial}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
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
          </motion.div>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div 
          variants={stagger}
          className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          {/* Single Session Card */}
          <motion.div variants={fadeIn}>
            <div className="p-6 h-full bg-white backdrop-blur-sm border-2 border-indigo-200 hover:border-indigo-400 transition-all duration-300 hover:shadow-lg rounded-2xl">
              <div className="flex flex-col h-full">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Single Session</h2>
                  <p className="text-gray-600 mb-4">Perfect for specific problems</p>
                  <div className="mb-4">
                    <span className="text-7xl font-bold tracking-tighter text-indigo-600">$19</span>
                    <span className="text-gray-600 text-lg">/ session</span>
                  </div>
                </div>
                <ul className="space-y-2 flex-grow">
                  {[
                    "45-minute personalized session",
                    "Problem-solving strategies",
                    "Pattern recognition techniques",
                    "Interview preparation tips",
                    "Post-session resources"
                  ].map((benefit, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <button
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-base py-4 rounded-lg shadow-md"
                    onClick={() => window.location.href = "https://book.stripe.com/00g2a6c0E2GY38Q7ss"}
                  >
                    Book Single Session
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Package Deal Card */}
          <motion.div variants={fadeIn}>
            <div className="p-6 h-full bg-gradient-to-br from-yellow-50 via-pink-50 to-indigo-50 border-2 border-indigo-200 hover:border-indigo-400 transition-all duration-300 hover:shadow-lg relative overflow-hidden rounded-2xl">
              <div className="absolute top-2 right-2">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full px-3 py-1 text-sm font-medium">
                  Best Value
                </div>
              </div>
              <div className="flex flex-col h-full">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">5-Session Package</h2>
                  <p className="text-gray-600 mb-4">Comprehensive interview prep</p>
                  <div className="mb-2">
                    <span className="text-7xl font-bold tracking-tighter text-indigo-600">$49</span>
                    <span className="text-gray-600 text-lg">/ package</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-4">
                    <span className="line-through text-2xl">$95</span>
                    <span className="ml-2 text-green-600 font-semibold text-2xl">Save 48%</span>
                  </p>
                </div>
                <ul className="space-y-2 flex-grow">
                  {[
                    "5 x 45-minute sessions",
                    "Structured learning path",
                    "Priority scheduling",
                    "Extended support between sessions",
                    "Comprehensive study plan",
                    "Progress tracking",
                    "Interview simulation"
                  ].map((benefit, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <button
                    className="w-full bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indigo-700 hover:to-indigo-900 text-white text-base py-4 shadow-md rounded-lg"
                    onClick={() => window.location.href = "https://book.stripe.com/4gweWS7Ko95m6l24gh"}
                  >
                    Get Package Deal
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <div className="text-base text-indigo-700 flex items-center justify-center gap-1 mt-8">
          <Lock className="h-5 w-5" />
          <p>Secure payment powered by Stripe</p>
        </div>
      </motion.div>
    </div>
  );
}
