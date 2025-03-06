"use client";

import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <section className="container mx-auto px-6 py-12 max-w-4xl">
      {/* Page Header */}
      <motion.h1 
        className="text-5xl font-bold text-center mb-8 text-gray-900 dark:text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        About Us
      </motion.h1>

      {/* Intro Section */}
      <motion.p
        className="text-lg text-gray-700 dark:text-gray-300 text-center mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        &quot;Rome wasn&apos;t built in a day, but that&apos;s because I was not on that job!&quot;
        <br />
        Our founder&apos;s words ring true today even after 2 days. Welcome to PrepSpective, where we prepare you to ace your technical interviews and ensure your success in the tech industry.
      </motion.p>

      {/* Divider */}
      <div className="border-t-2 border-gray-200 dark:border-gray-700 my-8"></div>

      {/* Mission Section */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4">
          Our Mission
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          We empower individuals to succeed in their technical careers by providing comprehensive interview preparation resources. Our goal is to ensure you are always prepared and equipped to ace every interview, paving the way for a long and fulfilling career in tech.
        </p>
      </motion.div>

      {/* Divider */}
      <div className="border-t-2 border-gray-200 dark:border-gray-700 my-8"></div>

      {/* Values Section */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4">
          Our Values
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          At PrepSpective, we value preparation, persistence, and passion. Our commitment to excellence drives us to provide you with the most effective tools and support as you journey through your interview process.
        </p>
      </motion.div>

      {/* Divider */}
      <div className="border-t-2 border-gray-200 dark:border-gray-700 my-8"></div>

      {/* Vision Section */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4">
          Our Vision
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          We envision a future where tech professionals consistently excel in their interviews and rise to their full potential, achieving success through preparation, knowledge, and confidence.
        </p>
      </motion.div>
    </section>
  );
}
