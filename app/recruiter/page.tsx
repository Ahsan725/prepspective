"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function OpenLandingPage() {
  return (
    <main className="w-full flex flex-col">

      {/* 1. Hero / Introduction Section */}
      <section className="relative w-full min-h-[60vh] flex items-center justify-center bg-gray-50 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl text-center"
        >
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            No Log-In Required for Recruiters
          </h1>
          <p className="text-lg text-muted-foreground">
            Showcasing real-world solutions: AI-driven interview feedback, advanced LeetCode tracking, 
            and a specialized DSA skill scanner. No login required—dive right in!
          </p>
        </motion.div>
      </section>

      {/* 2. Capabilities & Achievements Section */}
      <section className="relative w-full bg-white py-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <h2 className="text-2xl font-semibold mb-4">
            Capabilities &amp; Achievements
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Over the course of my development journey, I’ve prioritized meticulous 
            design and seamless user experiences, employing user testing at each 
            iteration. Below are a few highlights of my recent work and skillset.
          </p>
          <ul className="list-disc list-inside space-y-3 text-gray-600">
            <li>
              <strong>Meticulous UI Craftsmanship:</strong> Invested in user tests 
              and refined designs that helped boost user retention and minimize bounce rates.
            </li>
            <li>
              <strong>Generative AI Innovations:</strong> Built proprietary AI 
              interview feedback mechanisms outperforming notable solutions like Claude, Gemini, GPT, 
              DeepSeek R1, and even paid AI services worth $400+ in side by side comparisons by the users.
            </li>
            <li>
              <strong>Rapid User Adoption:</strong> Gained over 400 active users 
              by continuously iterating on features and listening to real feedback.
            </li>
            <li>
              <strong>Data-Driven Performance:</strong> Employed analytics to 
              optimize every aspect, achieving a near-perfect performance score of 99 (Vercel).
            </li>
            <li>
              <strong>Responsive &amp; Intuitive UI:</strong> Ensured consistency 
              across devices, providing a smooth experience whether on mobile or desktop.
            </li>
            <li>
              <strong>Career-Ready Experience:</strong> Demonstrates how 
              well-structured code, thorough testing, and user-centric design 
              can align with broader organizational goals.
            </li>
          </ul>
        </motion.div>
      </section>

      {/* 3. Product Sections */}
      {/* Product 1: AI Interview Response Feedback */}
      <section className="relative w-full bg-gray-50 py-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8"
        >
          <div className="flex-1">
            <h2 className="text-2xl font-semibold mb-2">
              AI Interview Response Feedback
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Harness the power of an AI assistant that listens to your interview 
              responses and provides real-time, constructive feedback. 
              This tool refines your communication and analytical approach, 
              ensuring you’re always interview-ready.
            </p>
            <ul className="list-disc list-inside mb-4 text-gray-600">
              <li>Analyze clarity, structure, and completeness of responses.</li>
              <li>Gain targeted tips for improvement.</li>
              <li>Boost confidence before real interviews.</li>
            </ul>
            <Link href="/recruiter/ai">
              <Button variant="default">
                Explore AI Feedback
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Product 2: LeetCode Lists Tracking & Spaced Repetitions */}
      <section className="relative w-full bg-white py-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8"
        >
          <div className="flex-1">
            <h2 className="text-2xl font-semibold mb-2">
              LeetCode Lists &amp; Spaced Repetitions
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Streamline your coding practice with custom problem sets, 
              automated spaced-repetition scheduling, and real-time progress 
              tracking. Ensure consistent skill-building over time with minimal 
              guesswork.
            </p>
            <ul className="list-disc list-inside mb-4 text-gray-600">
              <li>Organize and categorize your problems effectively.</li>
              <li>Receive reminders for timely revisits.</li>
              <li>Track improvements and key insights after each session.</li>
            </ul>
            <Link href="/recruiter/lists">
              <Button variant="default">
                Manage Your Practice
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Product 3: SkillScan - Identify Your DSA Weaknesses */}
      <section className="relative w-full bg-gray-50 py-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8"
        >
          <div className="flex-1">
            <h2 className="text-2xl font-semibold mb-2">
              SkillScan: Pinpoint Your DSA Gaps
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Diagnose your Data Structures &amp; Algorithms proficiencies with 
              precision. By identifying key knowledge gaps, you will know exactly 
              where to focus your study efforts for better ROI on your practice time.
            </p>
            <ul className="list-disc list-inside mb-4 text-gray-600">
              <li>Comprehensive quizzes to reveal strengths and weaknesses.</li>
              <li>Targeted recommendations for growth.</li>
              <li>Track improvements over multiple attempts.</li>
            </ul>
            <Link href="/recruiter/skillscan">
              <Button variant="default">
                Scan Your Skills
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  )
}
