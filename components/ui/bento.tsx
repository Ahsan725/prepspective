"use client";
import React, { useEffect, useRef, useState } from "react";
import NumberTicker from "@/components/ui/number-ticker";
import SparklesText from "@/components/ui/sparkles-text";

const FeaturesGrid: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div className="sm:py-32 px-2 lg:pt-0">
      <div className="lg:max-w-7xl sm:px-6 lg:px-0 mx-auto max-w-full">
        {/* Mission Statement */}
        <div className="flex items-center justify-center mb-4">
          <h2 className="inline-block font-extrabold text-xs sm:text-xs md:text-sm lg:text-md text-indigo-700 text-center tracking-wider bg-indigo-200 rounded-md px-2 py-0">
            OUR MISSION
          </h2>
        </div>

        <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
          What is PrepSpective
        </h2>
        <h3 className="md:w-1/2 mx-auto text-center mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
          A powerful suite of tools and expertly developed for interview mastery, algorithm training, and progress analytics, all in one seamless platform.
        </h3>

        <div
          className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2"
          ref={ref}
        >
          {/* Feature 1: AI Interview Practice */}
          <div className="relative lg:row-span-2 flex items-center justify-center text-center py-8">
            <div className="absolute inset-px rounded-lg bg-gradient-to-l from-indigo-800 via-indigo-500 to-indigo-800 lg:rounded-l-[2rem]"></div>
            <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-l-[calc(2rem+1px)] px-8 py-8">
              {isVisible && (
                <p className="whitespace-pre-wrap tracking-tighter text-6xl font-bold text-white">
                  <NumberTicker
                    value={5000}
                    className="text-white tracking-tighter"
                  />
                  +
                </p>
              )}
              <p className="mt-2 text-xl font-semibold tracking-tight text-white">
                AI Interview Sessions Run
              </p>
              <p className="mt-4 text-md text-white">
                Train with lifelike AI interviewers across tech, business,
                finance, and more! Receive personalized feedback, including glows and grows, after every
                session.
              </p>
              <div className="border-t border-white/30 mt-6 pt-4 w-full">
                <h3 className="text-lg font-semibold text-white">
                  Lifelike Simulation
                </h3>
                <p className="mt-2 text-md text-white">
                  Dynamic, follow up questioning adapts to your answers for a
                  truly authentic interview experience.
                </p>
              </div>
              <div className="border-t border-white/30 mt-6 pt-4 w-full">
                <h3 className="text-lg font-semibold text-white">Actionable Feedback</h3>
                <p className="mt-2 text-md text-white">
                  Instant, targeted feedback pinpoints strengths and areas to
                  improve, so you level up faster.
                </p>
              </div>
            </div>
          </div>

          {/* Feature 2: LeetCode Progress Tracker */}
          <div className="relative max-lg:row-start-1 flex items-center justify-center text-center py-8">
            <div className="absolute inset-px rounded-lg bg-gradient-to-l from-indigo-200 via-indigo-100 to-indigo-50 max-lg:rounded-t-[2rem]"></div>
            <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)] px-8 py-8">
              {isVisible && (
                <p className="whitespace-pre-wrap tracking-tighter text-6xl font-bold text-indigo-700">
                  <NumberTicker
                    value={700}
                    className="text-indigo-700 tracking-tighter"
                  />
                  +
                </p>
              )}
              <p className="mt-2 text-xl font-semibold tracking-tight text-indigo-700">
                Problems Tracked
              </p>
              <p className="mt-4 text-md text-indigo-700">
                Built‑in spaced repetition, distraction‑free solutions, and
                progress dashboards keep your LeetCode grind strategic and
                efficient.
              </p>
            </div>
          </div>

          {/* Feature 3: SkillScan AI */}
          <div className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2 flex items-center justify-center text-center py-8">
            <div className="absolute inset-px rounded-lg bg-gradient-to-l from-indigo-50 via-indigo-100 to-indigo-200"></div>
            <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] px-8 py-8">
            {isVisible && (
                <p className="whitespace-pre-wrap tracking-tighter text-6xl font-bold text-indigo-700">
                  <NumberTicker
                    value={400}
                    className="text-indigo-700 tracking-tighter"
                  />
                  +
                </p>
              )}
              <p className="mt-2 text-xl font-semibold tracking-tight text-indigo-700">
                Skill Gaps Identified
              </p>
              <p className="mt-4 text-md text-indigo-700">
                SkillScan AI analyzes your code history and quiz results to
                surface exactly which data‑structure and algorithm concepts need
                attention.
              </p>
            </div>
          </div>

          {/* Feature 4: One Platform */}
          <div className="relative lg:row-span-2 flex items-center justify-center text-center py-8">
            <div className="absolute inset-px rounded-lg bg-gradient-to-l from-indigo-800 via-indigo-500 to-indigo-800 max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"></div>
            <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)] px-8 py-8">
              <SparklesText
                text="1 Platform"
                className="text-6xl font-Optima font-bold text-white"
              />
              <p className="mt-2 text-xl font-semibold tracking-tight text-white">
                Infinite Possibilities
              </p>
              <p className="mt-4 text-md text-white">
                Practice, track, and analyze—all within a single cohesive
                workspace built to accelerate your journey to mastery.
              </p>
              <div className="border-t border-white/30 mt-6 pt-4 w-full">
                <h3 className="text-lg font-semibold text-white">Data‑Driven Insights</h3>
                <p className="mt-2 text-md text-white">
                  Performance dashboards and adaptive drills ensure you focus on
                  high‑impact practice without burnout.
                </p>
              </div>
              <div className="border-t border-white/30 mt-6 pt-4 w-full">
                <h3 className="text-lg font-semibold text-white">
                  Prepare Smarter, Not Harder
                </h3>
                <p className="mt-2 text-md text-white">
                  Automated schedules adjust to your progress, so you maintain
                  momentum and confidence heading into any interview.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesGrid;
