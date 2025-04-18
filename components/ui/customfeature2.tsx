import { Icon } from "@/components/ui/icon";
import { icons } from "lucide-react";
import CardHoverEffect from "@/components/ui/card-hover-effect";
import { motion } from "framer-motion";

interface FeaturesProps {
  icon: string;
  title: string;
  description: string;
}

// Focused exclusively on AI interview practice, LeetCode tracking, and SkillScan AI.
const featureList: FeaturesProps[] = [
  {
    icon: "Bot",
    title: "AI Interview Practice",
    description:
      "Simulate real‑world interviews with adaptive AI interviewers—technical, behavioral, or case study—across tech, business, and finance domains.",
  },
  {
    icon: "LayoutGrid",
    title: "Cross‑Domain Coverage",
    description:
      "One click swaps personas: software engineer, product manager, data analyst, marketer, and more—all in the same practice environment.",
  },
  {
    icon: "MessageCircle",
    title: "Instant Coaching",
    description:
      "Receive structured feedback, suggested talking points, and follow‑up questions immediately after each answer to accelerate growth.",
  },
  {
    icon: "ListTodo",
    title: "LeetCode Smart Tracker",
    description:
      "Progress lists with built‑in spaced repetition, difficulty tagging, and timers keep your algorithm grind efficient and distraction‑free.",
  },
  {
    icon: "BookOpen",
    title: "Clean, Focused Solutions",
    description:
      "View editor‑ready reference solutions side‑by‑side—no ads, no spoilers—so you can stay in flow while learning best practices.",
  },
  {
    icon: "Radar",
    title: "SkillScan AI",
    description:
      "Pinpoint exactly which data‑structure and algorithm topics are weakest using code history and quiz analytics, then auto‑generate a remediation plan.",
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
        Built to Accelerate Your Prep
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
        PrepSpective unifies AI‑driven mock interviews, smart LeetCode tracking, and pinpoint skill analytics—so you can focus on what matters and land offers faster.
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
