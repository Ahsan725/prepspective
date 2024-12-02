'use client';

import React from 'react';
import InterviewForm from '@/components/ui/InterviewForm'; // Adjust import path as needed

const NewInterviewPage: React.FC = () => {
  return (
    <div className="container mx-auto p-6 mb-52">
                  <div className="flex items-center justify-center mb-4">
        <h2 className="inline-block font-extrabold text-xs sm:text-xs md:text-sm lg:text-md text-indigo-700 text-center tracking-wider bg-indigo-200 rounded-md px-2 py-0">
          INTERVIEW EXPERIENCE
        </h2>
      </div>

      <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
      Share Your Interview Journey
      </h2>

      <h3 className="md:w-1/2 mx-auto text-center mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
      Help others prepare by sharing your interview experience. Your insights could be the key to someone else&apos;s success.
      </h3>
      <InterviewForm />
    </div>
  );
};

export default NewInterviewPage;
