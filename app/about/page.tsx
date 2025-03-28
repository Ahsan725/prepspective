"use client";

import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <section className="container mx-auto px-6 py-12 max-w-4xl">
      {/* Page Header */}
      <motion.div
        className="flex items-center justify-center mb-4"
        variants={{
          hidden: { opacity: 0, y: 10, filter: "blur(10px)" },
          visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: { duration: 0.5 },
          },
        }}
      >
        <h2 className="inline-block font-extrabold text-xs sm:text-xs md:text-sm lg:text-md text-indigo-700 text-center tracking-wider bg-indigo-200 rounded-md px-2 py-0">
          ABOUT
        </h2>
      </motion.div>

      <motion.h2
        className="text-3xl md:text-4xl text-center font-bold mb-4"
        variants={{
          hidden: { opacity: 0, y: 10, filter: "blur(10px)" },
          visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: { duration: 0.5, delay: 0.2 },
          },
        }}
      >
        A Bit About{" "}
        <span className="text-4xl font-extrabold text-indigo-700">
          {"{P}rep"}
          <span className="font-bold text-indigo-700 text-4xl">Spective</span>
        </span>
      </motion.h2>

      <motion.h3
        className="md:w-3/4 mx-auto text-center mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400"
        variants={{
          hidden: { opacity: 0, y: 10, filter: "blur(10px)" },
          visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: { duration: 0.5, delay: 0.4 },
          },
        }}
      >
        &quot;Rome wasn&apos;t built in a day, but that&apos;s because I was not on
        that job!&quot; <br></br> ~ Our Founder
      </motion.h3>

      {/* Rome Story Section */}
      <motion.p
        className="text-xl text-slate-600 text-center italic mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}>

      </motion.p>

      {/* Intro Section */}
      <motion.p
        className="text-lg text-gray-700 dark:text-gray-300 text-center mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}>
        Welcome to{" "}
        <span className="text-md font-extrabold text-indigo-700">
          {"{P}rep"}
          <span className="font-bold text-indigo-700 text-md">Spective</span>
        </span>{" "}
        a community-driven initiative established to empower job seekers in
        today’s competitive market. Our journey began from personal experience
        with the overwhelming challenges of interview preparation. We believe
        that success should be accessible, effective, and yes – even enjoyable.
      </motion.p>

      <div className="border-t-2 border-gray-200 dark:border-gray-700 my-10"></div>

      {/* Why We Created PrepSpective */}
      <motion.div
        className="mb-10"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}>
        <h2 className="text-3xl font-semibold text-gray-400 dark:text-white mb-4">
          Why We Created PrepSpective
        </h2>
        <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          Driven by a genuine desire to support our community,{" "}
          <span className="text-md font-extrabold text-indigo-700">
            {"{P}rep"}
            <span className="font-bold text-indigo-700 text-md">Spective</span>
          </span>{" "}
          was founded to address the real struggles of technical interview
          preparation. Our mission is to empower candidates with a suite of
          tools designed to enhance confidence and readiness, ensuring you land
          that coveted entry-level role or internship even in challenging
          markets.
        </p>
      </motion.div>

      <div className="border-t-2 border-gray-200 dark:border-gray-700 my-10"></div>

      {/* Our Products & Impact */}
      <motion.div
        className="mb-10"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}>
        <h2 className="text-3xl font-semibold text-gray-400 dark:text-white mb-4">
          Our Products &amp; Impact
        </h2>
        <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          Our offerings range from comprehensive interview guides and
          interactive coding walkthroughs to personalized mock interview
          sessions. Each resource is crafted with precision and passion. The
          positive feedback we’ve received is overwhelming – many in our
          community have secured entry-level positions and internships thanks to
          these tools. For more details, check out our{" "}
          <a href="/testimonials" className="text-slate-600 hover:underline">
            testimonials
          </a>
          .
        </p>
      </motion.div>

      <div className="border-t-2 border-gray-200 dark:border-gray-700 my-10"></div>

      {/* Community Section */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}>
        <h2 className="text-3xl font-semibold text-gray-400 dark:text-white mb-4">
          A Community Project
        </h2>
        <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          More than a suite of tools,     <span className="text-md font-extrabold text-indigo-700">
      {"{P}rep"}
      <span className="font-bold text-indigo-700 text-md">Spective</span>
    </span> is a thriving community built
          on trust, shared experiences, and a touch of humor. In one of the most
          challenging job markets, we united to create a support system that
          celebrates every success – no matter how small. Thank you for being a
          part of our journey as we continue to innovate and empower job seekers
          across the globe.
        </p>
      </motion.div>
    </section>
  );
}
