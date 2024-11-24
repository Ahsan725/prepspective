import React from "react";

const FeaturesGrid: React.FC = () => {
  return (
    <div className="sm:py-32 px-2 lg:pt-0 bg-gray-50">
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
          <div className="relative lg:row-span-2">
            <div className="absolute inset-px rounded-lg bg-gradient-to-l from-indigo-800 via-indigo-500 to-indigo-800 lg:rounded-l-[2rem]"></div>
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
              <div className="px-8 pb-3 pt-8 sm:px-10 sm:pb-0 sm:pt-10">
                <p className="mt-2 text-lg font-medium tracking-tight text-white max-lg:text-center">
                  Comprehensive Insights
                </p>
                <p className="py-4 max-w-lg text-sm/6 text-white max-lg:text-center">
                  Gain detailed information about interview processes, from past
                  questions to technical and behavioral round expectations. Be
                  ready for every step of your dream job’s interview.
                </p>
              </div>
            </div>
          </div>

          {/* Feature 2: Community-Powered Platform */}
          <div className="relative max-lg:row-start-1">
            <div className="absolute inset-px rounded-lg bg-gradient-to-l from-indigo-200 via-indigo-100 to-indigo-50 max-lg:rounded-t-[2rem]"></div>
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
              <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                <p className="mt-2 text-lg font-medium tracking-tight text-indigo-700 max-lg:text-center">
                  Community-Powered Platform
                </p>
                <p className="py-4 max-w-lg text-sm/6 text-indigo-700 max-lg:text-center">
                  Share anonymous interview experiences and help others succeed.
                  Together, we create a supportive ecosystem for career growth.
                </p>
              </div>
            </div>
          </div>

          {/* Feature 3: Targeted Preparation */}
          <div className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
            <div className="absolute inset-px rounded-lg bg-gradient-to-l from-indigo-50 via-indigo-100 to-indigo-200"></div>
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)]">
              <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                <p className="mt-2 text-lg font-medium tracking-tight text-indigo-700 max-lg:text-center">
                  Targeted Preparation
                </p>
                <p className="py-4 max-w-lg text-sm/6 text-indigo-700 max-lg:text-center">
                  Know what to expect in your interviews: from specific company
                  questions to required skills and round formats. Prep smart,
                  not hard.
                </p>
              </div>
            </div>
          </div>

          {/* Feature 4: Free and Accessible */}
          <div className="relative lg:row-span-2">
            <div className="absolute inset-px rounded-lg bg-gradient-to-l from-indigo-800 via-indigo-500 to-indigo-800 max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"></div>
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
              <div className="px-8 pb-3 pt-8 sm:px-10 sm:pb-0 sm:pt-10">
                <p className="mt-2 text-lg font-medium tracking-tight text-white max-lg:text-center">
                  Free and Accessible
                </p>
                <p className="py-4 max-w-lg text-sm/6 text-white max-lg:text-center">
                  PrepSpective is 100% free to use. No hidden costs, no premium
                  subscriptions—just honest, community-driven resources for
                  everyone.
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
