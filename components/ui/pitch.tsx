import React from 'react';

const Pitch: React.FC = () => {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:grid-cols-3 lg:gap-8 xl:gap-0 lg:py-16">
        <div className="order-2 lg:order-1 place-self-center lg:col-span-2 text-center lg:text-left">
          <h1 className="max-w-2xl mb-4 text-4xl font-bold tracking-tight leading-none md:text-5xl lg:text-6xl bg-gradient-to-b from-indigo-800 via-indigo-500 to-indigo-800 text-transparent bg-clip-text">
            Take the Fear Out of Interviews
          </h1>
          <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
            What’s your biggest fear before an interview? Is it walking into the unknown, unsure of what to expect? Is it spending weeks preparing the wrong way, only to stumble when it matters most? With our platform, you’ll never have to face those fears alone again.
          </p>
          <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
            Gain clarity, confidence, and control with real insights from others who’ve been in your shoes. It’s free, anonymous, and designed to prepare you for success. Let’s make sure you walk into your next interview fearless and ready to conquer it.
          </p>
          <a
            href="#"
            className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
          >
            Get Started
            <svg
              className="w-5 h-5 ml-2 -mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </a>
        </div>
        <div className="order-1 lg:order-2 flex justify-center lg:justify-end lg:col-span-1 mb-8 lg:mb-0">
          <img
            className="w-3/4 lg:w-full"
            src="/pic2.svg"
            // #4F4ECE is the color for graphics
            alt="mockup"
          />
        </div>
      </div>
    </section>
  );
};

export default Pitch;
