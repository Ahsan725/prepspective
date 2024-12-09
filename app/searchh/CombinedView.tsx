'use client';

import React from 'react';
import { Badge } from '@/components/ui/badge';
import Loader from '@/components/ui/loader';
import { useCombinedViewData } from './useCombinedViewData';
import { useRouter } from 'next/navigation';
import logos from '@/data/logos.json';
import Image from 'next/image';

const CombinedView: React.FC = () => {
  const {
    results,
    filteredResults,
    query,
    setQuery,
    loading,
    selectedInterviewId,
    interview,
    activeTab,
    setActiveTab,
    handleViewDetails,
  } = useCombinedViewData();

  const router = useRouter();

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;

  const handleMobileRedirect = (id: number) => {
    if (isMobile) {
      router.push(`/interview/search/${id}`);
    } else {
      handleViewDetails(id);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header Section */}
      <div className="bg-indigo-600 text-white p-2">
        <h1 className="text-3xl font-bold mb-2 text-center">Prepare for Your Dream Job</h1>
        <p className="text-lg mb-2">
          Looking for jobs? Browse our latest job openings to view.
        </p>
        <div className="flex flex-wrap gap-4">
          <input
            type="text"
            placeholder="Search jobs..."
            className="p-1 w-full text-indigo-800 lg:w-1/3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Main Content Section */}
      <div className="flex flex-col lg:flex-row gap-4 p-6 h-full">
        {/* Left Column: Results */}
        <div className="w-full lg:w-2/6 bg-white rounded-lg shadow-md p-4 overflow-y-auto max-h-full">
          <h2 className="text-xl font-semibold mb-4">Related Jobs</h2>
          <ul className="space-y-4">
            {loading ? (
              <Loader />
            ) : filteredResults.length > 0 ? (
              filteredResults.map((result) => (
                <li
                  key={result.id}
                  className={`p-4 bg-white border rounded-lg shadow-md hover:shadow-lg cursor-pointer ${
                    selectedInterviewId === result.id ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => handleMobileRedirect(result.id)}
                >
                  {/* Company Logo and Name */}
                  <div className="flex items-center mb-2">
                    <Image
                      src={logos.find((logo) => logo.name === result.company)?.logo || '/placeholder.png'}
                      alt={result.company}
                      width={40}
                      height={40}
                      className="mr-4 object-contain"
                    />
                    <h3 className="text-lg font-bold">{result.company}</h3>
                  </div>

                  {/* Date */}
                  <p className="text-sm text-gray-500 mb-2">
                    {new Date(result.interviewDate).toLocaleDateString()}
                  </p>

                  {/* Display All Badges */}
                  <div className="flex flex-wrap gap-2">
                    {/* Job Offer */}
                    {result.level && (
                      <Badge className="bg-indigo-500 text-white text-[10px]">
                        {result.level}
                      </Badge>
                    )}
                    {result.jobOffer === true && (
                      <Badge className="bg-green-100 text-green-800 text-[10px]">
                        Offer
                      </Badge>
                    )}
                    {result.jobOffer === false && (
                      <Badge className="bg-red-100 text-red-800 text-[10px]">
                        No Offer
                      </Badge>
                    )}
                    {result.questions.some((q) => q.type.toLowerCase() === 'behavioral') && (
                      <Badge className="bg-yellow-100 text-yellow-800 text-[10px]">
                        Behavioral
                      </Badge>
                    )}
                    {result.questions.some((q) => q.type.toLowerCase() === 'technical') && (
                      <Badge className="bg-purple-100 text-purple-800 text-[10px]">
                        Technical
                      </Badge>
                    )}
                    {result.rounds.some((round) =>
                      round.roundType.toLowerCase().includes('system design')
                    ) && (
                      <Badge className="bg-indigo-100 text-indigo-800 text-[10px]">
                        System Design
                      </Badge>
                    )}
                    {result.questions.some((q) => q.leetcodeLink) && (
                      <Badge className="bg-teal-100 text-teal-800 text-[10px]">
                        LeetCode
                      </Badge>
                    )}
                    {result.rounds.some((round) =>
                      round.roundType.toLowerCase().includes('pre screen')
                    ) && (
                      <Badge className="bg-cyan-100 text-cyan-800 text-[10px]">
                        Pre Screen
                      </Badge>
                    )}
                    {result.rounds.some((round) =>
                      round.roundType.toLowerCase().includes('oa')
                    ) && (
                      <Badge className="bg-pink-100 text-pink-800 text-[10px]">
                        OA
                      </Badge>
                    )}
                  </div>
                </li>
              ))
            ) : (
              <p className="text-gray-500">No results found</p>
            )}
          </ul>
        </div>

        {/* Right Column: Detailed View */}
        <div className="w-full lg:w-4/6 bg-white border rounded-lg shadow-md p-6 overflow-y-auto max-h-full">
          {selectedInterviewId && interview ? (
            <>
              <div className="flex items-center mb-4">
                <Image
                  src={logos.find((logo) => logo.name === interview.company)?.logo || '/placeholder.png'}
                  alt={interview.company}
                  width={60}
                  height={60}
                  className="mr-4 object-contain"
                />
                <div>
                  <h2 className="text-2xl font-bold">{interview.company}</h2>
                  <p className="text-sm text-gray-500">
                    {logos.find((logo) => logo.name === interview.company)?.intro || ''}
                  </p>
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Job Overview</h3>
              <p className="text-gray-700 text-sm mb-4">{interview.overallExperience}</p>
              <h3 className="text-lg font-semibold mb-2">What You Will Do</h3>
              <ul className="list-disc ml-5 text-sm text-gray-700 space-y-2">
                <li>Collaborate with cross-functional teams to deliver high-quality solutions.</li>
                <li>Write clean, maintainable code that aligns with best practices.</li>
                <li>Analyze and troubleshoot production issues effectively.</li>
              </ul>
              <h3 className="text-lg font-semibold mt-4 mb-2">About {interview.company}</h3>
              <p className="text-sm text-gray-700">
                {logos.find((logo) => logo.name === interview.company)?.intro || 'No additional information available.'}
              </p>
            </>
          ) : (
            <p className="text-center text-gray-500">Select a job to view details</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CombinedView;
