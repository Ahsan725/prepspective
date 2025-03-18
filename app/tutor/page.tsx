"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code2, Brain, Rocket, Clock, CheckCircle2, Sparkles } from "lucide-react";

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

export default function TutoringPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.div 
        initial="initial"
        animate="animate"
        variants={stagger}
        className="container mx-auto px-4 py-16"
      >
        <motion.div variants={fadeIn} className="text-center mb-12">
          <Badge className="mb-3 bg-indigo-100 text-indigo-800 hover:bg-indigo-200 rounded-full px-3 py-1 text-sm font-medium">
            Limited Time Offer
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Master LeetCode With
            <span className="text-indigo-600"> Confidence</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Transform your problem-solving skills with personalized 1-on-1 tutoring sessions
            designed to help you crack coding interviews.
          </p>
              </motion.div>
              <p className="text-sm text-center mb-4 text-gray-500">Secure payment powered by Stripe</p>

        {/* Pricing Section */}
        <motion.div 
          variants={stagger}
          className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          {/* Single Session Card */}
          <motion.div variants={fadeIn}>
            <Card className="p-6 h-full bg-white backdrop-blur-sm border border-gray-100 hover:border-indigo-200 transition-all duration-300 hover:shadow-lg rounded-2xl">
              <div className="flex flex-col h-full">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Single Session</h2>
                  <p className="text-gray-600 mb-4">Perfect for specific problems</p>
                  <div className="mb-4">
                    <span className="text-7xl font-bold text-indigo-600">$19</span>
                    <span className="text-gray-600 text-lg">/session</span>
                  </div>
                </div>
                <ul className="text-left space-y-2 flex-grow">
                  {[
                    "45-minute personalized session",
                    "Problem-solving strategies",
                    "Pattern recognition techniques",
                    "Interview preparation tips",
                    "Post-session resources"
                  ].map((benefit, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-700 text-base">{benefit}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <Button
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-base py-4 rounded-lg shadow-md"
                    onClick={() => window.location.href = "https://book.stripe.com/test_9AQcPK06Xe2d5qw3cc"}
                  >
                    Book Single Session
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Package Deal Card */}
          <motion.div variants={fadeIn}>
            <Card className="p-6 h-full bg-gradient-to-br from-indigo-50 via-white to-indigo-50 border-2 border-indigo-200 hover:border-indigo-400 transition-all duration-300 hover:shadow-lg relative overflow-hidden rounded-2xl">
              <div className="absolute top-1 right-1">
                <Badge className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full px-3 py-1 text-sm font-medium">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Best Value
                </Badge>
              </div>
              <div className="flex flex-col h-full">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">5-Session Package</h2>
                  <p className="text-gray-600 mb-4">Comprehensive interview prep</p>
                  <div className="mb-2">
                    <span className="text-7xl font-bold text-indigo-600">$49</span>
                    <span className="text-gray-600 text-lg">/package</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-4">
                    <span className="line-through">$95</span>
                    <span className="ml-2 text-green-600 font-semibold">Save 48%</span>
                  </p>
                </div>
                <ul className="text-left space-y-2 flex-grow">
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
                      <span className="text-gray-700 text-base">{benefit}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <Button
                    className="w-full bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indigo-700 hover:to-indigo-900 text-base py-4 shadow-md rounded-lg"
                    onClick={() => window.location.href = "https://book.stripe.com/test_9AQcPK06Xe2d5qw3cc"}
                  >
                    Get Package Deal
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>

        {/* Footer Note */}
        <motion.div variants={fadeIn} className="mt-8 text-center">
        </motion.div>
      </motion.div>
    </div>
  );
}