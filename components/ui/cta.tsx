import React from "react";

const CallToAction: React.FC = () => {
  return (
    <section className="bg-white dark:bg-gray-900 py-16 px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        {/* Section Header */}
        <div className="space-y-4">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            Ready to Ace Your Next Interview?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Join thousands of users who have gained the confidence and insights
            they need to succeed. It’s time to take control of your interview
            preparation with our free and community-driven platform.
          </p>
        </div>

        {/* Divider */}
        <div className="my-8">
          <hr className="border-gray-300 dark:border-gray-700" />
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          {/* <button className="px-6 py-3 text-base font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-800">
            Get Started
          </button> */}
          {/* <button className="px-6 py-3 text-base font-medium text-indigo-600 bg-white border border-indigo-600 rounded-lg hover:bg-indigo-50 focus:ring-4 focus:ring-indigo-300 dark:bg-gray-800 dark:text-indigo-400 dark:border-indigo-400 dark:hover:bg-gray-700 dark:focus:ring-indigo-800">
            Learn More
          </button> */}
        </div>

        {/* Secondary Text */}
        <div className="mt-10 text-gray-500 dark:text-gray-400 text-sm">
          <p>
            Don’t worry—it’s completely free, anonymous, and built by the
            community for the community.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
