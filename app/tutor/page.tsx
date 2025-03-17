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
        className="container mx-auto px-4 py-16 md:py-24"
      >
        <motion.div variants={fadeIn} className="text-center mb-16">
          <Badge className="mb-4 bg-indigo-100 text-indigo-800 hover:bg-indigo-200">
            Limited Time Offer
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Master LeetCode With
            <span className="text-indigo-600"> Confidence</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transform your problem-solving skills with personalized 1-on-1 tutoring sessions
            designed to help you crack coding interviews.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          variants={stagger}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {[
            {
              icon: <Clock className="h-6 w-6 text-indigo-600" />,
              title: "45-Minute Sessions",
              description: "Focused, intensive learning tailored to your needs"
            },
            {
              icon: <Brain className="h-6 w-6 text-indigo-600" />,
              title: "Pattern Recognition",
              description: "Learn to identify and master common problem patterns"
            },
            {
              icon: <Code2 className="h-6 w-6 text-indigo-600" />,
              title: "Live Coding",
              description: "Real-time problem solving with instant feedback"
            },
            {
              icon: <Rocket className="h-6 w-6 text-indigo-600" />,
              title: "Interview Ready",
              description: "Gain confidence for technical interviews"
            }
          ].map((feature, index) => (
            <motion.div variants={fadeIn} key={index}>
              <Card className="p-6 h-full hover:shadow-lg transition-shadow backdrop-blur-sm bg-white/90">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-indigo-50 rounded-lg">
                    {feature.icon}
                  </div>
                  <h3 className="mt-4 font-semibold text-lg">{feature.title}</h3>
                  <p className="mt-2 text-gray-600">{feature.description}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Pricing Section */}
        <motion.div 
          variants={stagger}
          className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          {/* Single Session Card */}
          <motion.div variants={fadeIn}>
            <Card className="p-8 h-full bg-white backdrop-blur-sm border-gray-200 hover:border-indigo-200 transition-all duration-300 hover:shadow-xl">
              <div className="flex flex-col h-full">
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-2">Single Session</h2>
                  <p className="text-gray-600 mb-6">Perfect for specific problems</p>
                  <div className="mb-6">
                    <span className="text-5xl font-bold text-indigo-600">$19</span>
                    <span className="text-gray-600">/session</span>
                  </div>
                </div>
                <ul className="text-left space-y-3 flex-grow">
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
                <div className="mt-8">
                  <Button
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-lg py-6"
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
            <Card className="p-8 h-full bg-gradient-to-br from-indigo-50 via-white to-indigo-50 border-2 border-indigo-200 hover:border-indigo-400 transition-all duration-300 hover:shadow-xl relative overflow-hidden">
              <div className="absolute top-3 right-3">
                <Badge className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                  <Sparkles className="h-4 w-4 mr-1" />
                  Best Value
                </Badge>
              </div>
              <div className="flex flex-col h-full">
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-2">5-Session Package</h2>
                  <p className="text-gray-600 mb-6">Comprehensive interview prep</p>
                  <div className="mb-2">
                    <span className="text-5xl font-bold text-indigo-600">$49</span>
                    <span className="text-gray-600">/package</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-6">
                    <span className="line-through">$95</span>
                    <span className="ml-2 text-green-600 font-semibold">Save 48%</span>
                  </p>
                </div>
                <ul className="text-left space-y-3 flex-grow">
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
                <div className="mt-8">
                  <Button
                    className="w-full bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indigo-700 hover:to-indigo-900 text-lg py-6 shadow-lg"
                    onClick={() => window.location.href = "https://book.stripe.com/test_9AQcPK06Xe2d5qw3cc"}
                  >
                    Get Package Deal
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>

        <p className="mt-8 text-center text-sm text-gray-500">Secure payment powered by Stripe</p>
      </motion.div>
    </div>
  );
}