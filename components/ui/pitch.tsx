import React from 'react';
import Image from 'next/image';

const Pitch: React.FC = () => {
  return (
    <>
      {/* First Section */}
      <section className="bg-white dark:bg-gray-900">
        <div className="grid max-w-screen-xl px-4 py-6 mx-auto lg:grid-cols-3 lg:gap-8 xl:gap-0 lg:py-10">
          <div className="order-2 lg:order-1 place-self-center lg:col-span-2 text-center lg:text-left">
            <h1 className="max-w-2xl mb-4 text-4xl font-bold tracking-tight leading-none md:text-5xl lg:text-3xl">
              Take the{' '}
              <span className="bg-gradient-to-b from-indigo-800 via-indigo-500 to-indigo-300 text-transparent bg-clip-text">
                Fear of Uncertainty{' '}
              </span>
              Out of Interviews
            </h1>
            <div className="my-4">
              <hr className="border-gray-300 dark:border-gray-700" />
            </div>
            <p className="max-w-2xl mb-4 font-light text-gray-500 lg:mb-6 md:text-lg lg:text-xl dark:text-gray-400">
              What’s your biggest fear before an interview? Is it walking into the unknown, unsure of what to expect? Is it spending weeks preparing the wrong way, only to stumble when it matters most? With our platform, you’ll never have to face those fears alone again.
            </p>
            <p className="max-w-2xl mb-4 font-light text-gray-500 lg:mb-6 md:text-lg lg:text-xl dark:text-gray-400">
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
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end lg:col-span-1 mb-6 lg:mb-0">
            <Image
              className="w-3/4 lg:w-full"
              src="/pic2.svg"
              alt="mockup"
              width={300}
              height={300}
            />
          </div>
        </div>
      </section>

      {/* New Section: Image on the Left, Text on the Right */}
      <section className="bg-white dark:bg-gray-900">
        <div className="grid max-w-screen-xl px-4 py-6 mx-auto lg:grid-cols-3 lg:gap-8 xl:gap-0 lg:py-10">
          <div className="order-1 lg:order-1 flex justify-center lg:justify-start lg:col-span-1 mb-6 lg:mb-0">
            <Image
              className="w-3/4 lg:w-full"
              src="/pic2.svg"
              alt="mockup"
              width={300}
              height={300}
            />
          </div>
          <div className="order-2 lg:order-2 place-self-center lg:col-span-2 text-center lg:text-left">
            <h1 className="max-w-2xl mb-4 text-4xl font-bold tracking-tight leading-none md:text-5xl lg:text-3xl">
              Designed for{' '}
              <span className="bg-gradient-to-b from-indigo-800 via-indigo-500 to-indigo-300 text-transparent bg-clip-text">
                Your Success
              </span>
            </h1>
            <div className="my-4">
              <hr className="border-gray-300 dark:border-gray-700" />
            </div>
            <p className="max-w-2xl mb-4 font-light text-gray-500 lg:mb-6 md:text-lg lg:text-xl dark:text-gray-400">
              We know the challenges you face, from preparing for the unknown to understanding how to focus your efforts. That’s why our platform is here to guide you every step of the way.
            </p>
            <p className="max-w-2xl mb-4 font-light text-gray-500 lg:mb-6 md:text-lg lg:text-xl dark:text-gray-400">
            Gain clarity, confidence, and control with real insights from others who’ve been in your shoes. It’s free, anonymous, and designed to prepare you for success. Let’s make sure you walk into your next interview fearless and ready to conquer it.
            </p>
            <a
              href="#"
              className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
            >
              Learn More
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
        </div>
      </section>
    </>
  );
};

export default Pitch;
