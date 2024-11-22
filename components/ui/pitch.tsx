import React from 'react';
import Image from 'next/image';

const Pitch: React.FC = () => {
  return (
    <>
      {/* First Section */}
      <section className="bg-white dark:bg-gray-900">
      <div className="flex items-center justify-center mb-4">
        <h2 className="inline-block font-extrabold text-xs sm:text-xs md:text-sm lg:text-md text-indigo-700 text-center tracking-wider bg-indigo-200 rounded-md px-2 py-0">
          MISSION STATEMENT
        </h2>
      </div>

      <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
        What is PrepSpective
      </h2>
        <div className="grid max-w-screen-xl px-4 py-6 mx-auto lg:grid-cols-3 lg:gap-8 xl:gap-0 lg:py-10">
          <div className="order-2 lg:order-1 place-self-center lg:col-span-2 text-center lg:text-left">
            <h1 className="max-w-2xl mb-4 text-2xl font-bold tracking-tight leading-none md:text-3xl lg:text-3xl">
              
              <span className="bg-gradient-to-b from-indigo-800 via-indigo-700 to-indigo-400 text-transparent bg-clip-text">
              Take the{' '}Fear of Uncertainty{' '}Out of the Interviews
              </span>
              
            </h1>
            <div className="my-4">
              <hr className="border-gray-300 dark:border-gray-700" />
            </div>
            <p className="max-w-2xl mb-4 font-light text-gray-500 lg:mb-6 md:text-lg lg:text-xl dark:text-gray-400">
              What’s your biggest fear before an interview? Is it walking into the unknown, unsure of what to expect? Is it spending weeks preparing the wrong way, only to stumble when it matters most? With our platform, you’ll never have to face those fears alone again.
            </p>
            <p className="max-w-2xl mb-4 font-light text-gray-500 lg:mb-6 md:text-lg lg:text-xl dark:text-gray-400">
            </p>
            <div className="bg-gradient-to-l from-indigo-800 via-indigo-600 to-indigo-500 rounded-xl lg:mx-32">
              <h3 className="text-2xl font-bold text-white px-8 py-8">Get Started Today On That Long Sentence That We Will Use To Get Your Attention</h3>
              <p className="text-white text-lg px-8 pb-8">This is the other text that needs to go here. What’s your biggest fear before an interview? Is it walking into the unknown, unsure of what to expect? Is it spending weeks preparing the wrong way, only to stumble when it matters most? With our platform, you’ll never have to face those fears alone again.</p>
            </div>
          </div>
          <div className="hidden order-1 lg:order-2 lg:flex justify-center lg:justify-end lg:col-span-1 mb-6 lg:mb-0">
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
              
              <span className="bg-gradient-to-b from-indigo-800 via-indigo-700 to-indigo-400 text-transparent bg-clip-text">
              Designed for{' '} Your Success
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
            <div className="bg-gradient-to-r from-indigo-800 via-indigo-500 to-indigo-700 rounded-xl lg:mx-32">
              <h3 className="text-2xl font-bold text-white px-8 py-8">Get Started Today On That Long Sentence That We Will Use To Get Your Attention</h3>
              <p className="text-white text-lg px-8 pb-8">This is the other text that needs to go here. What’s your biggest fear before an interview? Is it walking into the unknown, unsure of what to expect? Is it spending weeks preparing the wrong way, only to stumble when it matters most? With our platform, you’ll never have to face those fears alone again.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Pitch;
