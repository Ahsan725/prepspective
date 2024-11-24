import React from "react";

const FeaturesGrid: React.FC = () => {
  return (
    <div className="sm:py-32 px-2 lg:pt-0">
      <div className="lg:max-w-7xl sm:px-6 lg:px-0 mx-auto max-w-full">
        {/* Mission Statement */}
        <div className="flex items-center justify-center mb-4">
          <h2 className="inline-block font-extrabold text-xs sm:text-xs md:text-sm lg:text-md text-indigo-700 text-center tracking-wider bg-indigo-200 rounded-md px-2 py-0">
            MISSION STATEMENT
          </h2>
        </div>

        <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
          What is PrepSpective
        </h2>

        <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
          {/* Feature 1: Comprehensive Insights */}
          <div className="relative lg:row-span-2 flex items-center justify-center text-center py-8">
            <div className="absolute inset-px rounded-lg bg-gradient-to-l from-indigo-800 via-indigo-500 to-indigo-800 lg:rounded-l-[2rem]"></div>
            <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-l-[calc(2rem+1px)] px-8 py-8">
              <p className="text-6xl font-bold text-white">1,500+</p>
              <p className="mt-2 text-xl font-semibold tracking-tight text-white">
                Anonymous Interviews Shared
              </p>
              <p className="mt-4 text-sm/6 text-white">
                Leverage the collective wisdom of thousands of candidates to
                better prepare for your interviews.
              </p>
              <div className="border-t border-white/30 mt-6 pt-4 w-full">
                <h3 className="text-lg font-semibold text-white">
                  Extensive Insights
                </h3>
                <p className="mt-2 text-sm text-white">
                  Access detailed breakdowns of interview processes, including
                  past questions, difficulty levels, and candidate feedback.
                </p>
                          </div>
                          <div className="border-t border-white/30 mt-6 pt-4 w-full">
                <h3 className="text-lg font-semibold text-white">
                  Built for the Community
                </h3>
                <p className="mt-2 text-sm text-white">
                  Join events, share insights, and collaborate with others to
                  grow and succeed in your career.
                </p>
              </div>
            </div>
          </div>

          {/* Feature 2: Community-Powered Platform */}
          <div className="relative max-lg:row-start-1 flex items-center justify-center text-center py-8">
            <div className="absolute inset-px rounded-lg bg-gradient-to-l from-indigo-200 via-indigo-100 to-indigo-50 max-lg:rounded-t-[2rem]"></div>
            <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)] px-8 py-8">
              <p className="text-6xl font-bold text-indigo-700">500+</p>
              <p className="mt-2 text-xl font-semibold tracking-tight text-indigo-700">
                Companies Covered
              </p>
              <p className="mt-4 text-sm/6 text-indigo-700">
                Insights from startups to tech giants across industries,
                tailored to your preparation.
              </p>
            </div>
          </div>

          {/* Feature 3: Targeted Preparation */}
          <div className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2 flex items-center justify-center text-center py-8">
            <div className="absolute inset-px rounded-lg bg-gradient-to-l from-indigo-50 via-indigo-100 to-indigo-200"></div>
            <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] px-8 py-8">
              <p className="text-6xl font-bold text-indigo-700">10,000+</p>
              <p className="mt-2 text-xl font-semibold tracking-tight text-indigo-700">
                Questions Categorized
              </p>
              <p className="mt-4 text-sm/6 text-indigo-700">
                Real interview questions organized by difficulty, type, and
                company for targeted preparation.
              </p>
            </div>
          </div>

          {/* Feature 4: Free and Accessible */}
          <div className="relative lg:row-span-2 flex items-center justify-center text-center py-8">
            <div className="absolute inset-px rounded-lg bg-gradient-to-l from-indigo-800 via-indigo-500 to-indigo-800 max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"></div>
            <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)] px-8 py-8">
              <p className="text-6xl font-bold text-white">1 Platform</p>
              <p className="mt-2 text-xl font-semibold tracking-tight text-white">
                Infinite Possibilities
              </p>
              <p className="mt-4 text-sm/6 text-white">
                Empower yourself with everything from timelines to question
                types for confident interview preparation.
              </p>
              <div className="border-t border-white/30 mt-6 pt-4 w-full">
                <h3 className="text-lg font-semibold text-white">
                  Built for the Community
                </h3>
                <p className="mt-2 text-sm text-white">
                  Join events, share insights, and collaborate with others to
                  grow and succeed in your career.
                </p>
                          </div>
                          <div className="border-t border-white/30 mt-6 pt-4 w-full">
                <h3 className="text-lg font-semibold text-white">
                  Built for the Community
                </h3>
                <p className="mt-2 text-sm text-white">
                  Join events, share insights, and collaborate with others to
                  grow and succeed in your career.
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
