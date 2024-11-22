import React from "react";

const EyeCatchingSection: React.FC = () => {
  return (
    <section className="bg-white dark:bg-gray-900 py-16 px-6 lg:px-8 space-y-16">
      {/* Section 1: Hero-style with Big Numbers */}
      <div className="text-center space-y-6">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
          Why Choose Us?
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          With insights from thousands of candidates, our platform gives you
          unmatched transparency into the interview process.
        </p>
        <div className="flex justify-center gap-8 mt-8">
          <div className="text-center">
            <p className="text-5xl font-bold text-indigo-600 dark:text-indigo-400">50,000+</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Interviews Analyzed</p>
          </div>
          <div className="text-center">
            <p className="text-5xl font-bold text-indigo-600 dark:text-indigo-400">95%</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">User Satisfaction</p>
          </div>
          <div className="text-center">
            <p className="text-5xl font-bold text-indigo-600 dark:text-indigo-400">100%</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Free & Anonymous</p>
          </div>
        </div>
      </div>

      {/* Section 2: Split Image with Text */}
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
            Know What to Expect
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-4">
            Discover company-specific interview details, from the number of
            rounds to the types of questions asked. Be prepared, not surprised.
          </p>
        </div>
        <img
          src="/pic.svg"
          alt="Interview preparation"
          className="w-1/2"
        />
      </div>

      {/* Section 3: Highlighted Features */}
      <div className="bg-gray-50 dark:bg-gray-800 py-12 px-6 rounded-lg shadow-md">
        <h3 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
          Features Designed for You
        </h3>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div>
            <div className="p-4 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
              🔍
            </div>
            <h4 className="mt-4 text-lg font-bold text-gray-900 dark:text-white">
              Insights
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Detailed interview experiences tailored to your needs.
            </p>
          </div>
          <div>
            <div className="p-4 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
              🎯
            </div>
            <h4 className="mt-4 text-lg font-bold text-gray-900 dark:text-white">
              Focus
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Know what to study and skip unnecessary topics.
            </p>
          </div>
          <div>
            <div className="p-4 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
              ⚡
            </div>
            <h4 className="mt-4 text-lg font-bold text-gray-900 dark:text-white">
              Speed
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Save time with targeted prep and actionable insights.
            </p>
          </div>
          <div>
            <div className="p-4 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
              🤝
            </div>
            <h4 className="mt-4 text-lg font-bold text-gray-900 dark:text-white">
              Community
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Built by candidates, for candidates. 100% free.
            </p>
          </div>
        </div>
      </div>

      {/* Section 4: Final CTA */}
      <div className="text-center space-y-6">
        <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
          Ready to Take Control of Your Interviews?
        </h3>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Join thousands of others who have gained clarity, confidence, and the
          tools to succeed.
        </p>
        <button className="px-6 py-3 text-base font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-800">
          Get Started for Free
        </button>
      </div>
    </section>
  );
};

export default EyeCatchingSection;
