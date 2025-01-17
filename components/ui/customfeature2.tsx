import { Icon } from "@/components/ui/icon";
import { icons } from "lucide-react";
import CardHoverEffect from "@/components/ui/card-hover-effect";
import { motion } from "framer-motion";

interface FeaturesProps {
  icon: string;
  title: string;
  description: string;
}

const featureList: FeaturesProps[] = [
  {
    icon: "Users",
    title: "Community-Driven Insights",
    description: "Tap into a wealth of real, anonymous interview experiences shared by individuals who've been in your shoes, giving you unmatched preparation advantages.",
  },
  {
    icon: "TrendingUp",
    title: "Company-Specific Preparation",
    description: "Learn the exact trends, technical expectations, and interview patterns of your target companies to tailor your preparation effectively.",
  },
  {
    icon: "Clock",
    title: "Effortless Time Optimization",
    description: "Focus only on what truly matters by cutting out unnecessary preparation and targeting high-value areas, saving you countless hours.",
  },
  {
    icon: "FileText",
    title: "Detailed Interview Breakdown",
    description: "Understand interview structures, including question types, expected difficulty, recruiter timelines, and what it takes to succeed at each stage.",
  },
  {
    icon: "Target",
    title: "Clarity & Confidence",
    description: "Minimize uncertainty with actionable insights on interview expectations, boosting your confidence and helping you perform at your best.",
  },
  {
    icon: "Infinity",
    title: "Unparalleled Accessibility",
    description: "Access a robust platform offering comprehensive insights and resources that evolve with your needs—empowering everyone from students to seasoned professionals.",
  },
];

export const FeaturesSection = () => {
  const fadeInWithBlurVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.6, staggerChildren: 0.2 },
    },
  };

  return (
    <motion.section
      id="features"
      className="ml-8 mr-8 py-16 px-0"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeInWithBlurVariants}
    >
      {/* Section Header */}
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
          FEATURES
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
        What Sets Us Apart
      </motion.h2>

      <motion.h3
        className="md:w-1/2 mx-auto text-center mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400"
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
        Our platform revolutionizes interview preparation with tailored insights, expert breakdowns, and a supportive community designed to help you succeed.
      </motion.h3>

      {/* Feature List using CardHoverEffect */}
      <motion.div
        className="max-w-5xl mx-auto mt-12"
        variants={{
          hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
          visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: { duration: 0.6, delay: 0.6 },
          },
        }}
      >
        <CardHoverEffect items={featureList} />
      </motion.div>
    </motion.section>
  );
};
