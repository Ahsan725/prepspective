'use client';

import React from 'react';
import { Badge } from '@/components/ui/badge';
import Loader from '@/components/ui/loader';
import { Building, MessageCircle, Star, List, CheckCircle } from 'lucide-react';
import { useCombinedViewData } from './useCombinedViewData';
import { useRouter } from 'next/navigation';
import logos from '@/data/logos.json'; // Import the JSON file
import Image from 'next/image'; // Import the Image component

const CombinedView: React.FC = () => {
  const {
    results,
    filteredResults,
    query,
    setQuery,
    loading,
    selectedInterviewId,
    interview,
    error,
    activeTab,
    setActiveTab,
    handleViewDetails,
    selectedBadges,
    setSelectedBadges,
    levelOptions,
  } = useCombinedViewData();

  const router = useRouter();

  // Check if the device is mobile
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;

  const handleMobileRedirect = (id: number) => {
    if (isMobile) {
      router.push(`/interview/search/${id}`);
    } else {
      handleViewDetails(id);
    }
  };

  const toggleBadge = (badge: string) => {
    setSelectedBadges((prev) =>
      prev.includes(badge)
        ? prev.filter((selected) => selected !== badge)
        : [...prev, badge]
    );
  };

  const renderContent = () => {
    if (error) {
      return <div className="text-red-600">{error}</div>;
    }
    if (!interview) {
      return <Loader />;
    }

    const headingClasses = "leading-tight font-bold text-xl lg:text-2xl text-center";
    const subheadingClasses = "leading-tight text-md font-semibold text-indigo-600";
    const paragraphClasses = "text-sm font-light text-gray-700";
    const labelClasses = "leading-tight font-semibold text-indigo-600";
    const sublabelClasses = "leading-tight text-sm font-medium uppercase text-indigo-700";
    
    switch (activeTab) {
      case 'company':
        return (
          <div className="p-4 rounded-lg">
            <h3 className={headingClasses}>Company Information</h3>
            <hr className="border-t border-gray-300 my-4" />
            <div className="mt-4 space-y-2">
              {/* <p>
                <span className={sublabelClasses}></span>{' '}
                <span className={`${paragraphClasses} text-xl font-semibold`}>{interview.company}</span>
              </p> */}
              <p>
                <span className={sublabelClasses}>Interview Date:</span>{' '}
                <span className={paragraphClasses}>{interview.interviewDate}</span>
              </p>
              <p>
                <span className={sublabelClasses}>Level:</span>{' '}
                <span className={paragraphClasses}>{interview.level}</span>
              </p>
              <p>
                <span className={sublabelClasses}>Job Offer:</span>{' '}
                {interview.jobOffer === true ? (
                  <Badge className="bg-green-100 text-green-800">Yes</Badge>
                ) : interview.jobOffer === false ? (
                  <Badge className="bg-red-100 text-red-800">No</Badge>
                ) : (
                  <span className="px-2 py-1 text-xs font-semibold text-yellow-800 bg-yellow-100 rounded-full">
                    Unsure
                  </span>
                )}
              </p>
              <p>
                <span className={sublabelClasses}>Overall Experience:</span>{' '}
                <span className={paragraphClasses}>{interview.overallExperience}</span>
              </p>
            </div>
          </div>
        );
      
      case 'questions':
        const technicalQuestions = interview.questions.filter(
          (q) => q.type.toLowerCase() === 'technical'
        );
        const behavioralQuestions = interview.questions.filter(
          (q) => q.type.toLowerCase() === 'behavioral'
        );
    
        return (
<div className="p-4 rounded-lg">
  <h3 className={headingClasses}>Interview Questions</h3>
  <hr className="border-t border-gray-300 my-4" />
  <div className="mt-4">
    {technicalQuestions.length > 0 && (
      <>
        <h4 className={subheadingClasses}>Technical Questions</h4>
        <ul className="list-disc pl-6 mt-2 mb-4">
          {technicalQuestions.map((q) => (
            <li key={q.id} className={paragraphClasses}>
              {q.question}
              {q.leetcodeLink && (
                <a
                  href={q.leetcodeLink || undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 text-indigo-500 underline"
                >
                  Open Link
                </a>
              )}
            </li>
          ))}
        </ul>
        <hr className="border-t border-gray-300 my-4" />
      </>
    )}
    {behavioralQuestions.length > 0 && (
      <>
        <h4 className={subheadingClasses}>Behavioral Questions</h4>
        <ul className="list-disc pl-6 mt-2">
          {behavioralQuestions.map((q, index) => (
            <div key={q.id}>
              <li className={paragraphClasses}>{q.question}</li>
              {index < behavioralQuestions.length - 1 && (
                <hr className="border-t border-gray-300 my-2" />
              )}
            </div>
          ))}
        </ul>
      </>
    )}
  </div>
</div>

        );
    
      case 'ratings':
        return (
          <div className="p-4 rounded-lg">
            <h3 className={headingClasses}>Ratings</h3>
            <hr className="border-t border-gray-300 my-4" />
            <ul className="mt-4 space-y-2">
              {interview.ratings.map((r) => (
                <li key={r.id} className={paragraphClasses}>
                  <span className={subheadingClasses}>{r.category}:</span>{' '}
                  <span>{r.score}/5</span>
                </li>
              ))}
            </ul>
          </div>
        );
    
      case 'rounds':
        return (
          <div className="p-4 rounded-lg">
            <h3 className={headingClasses}>Interview Rounds</h3>
            <hr className="border-t border-gray-300 my-4" />
            <div className="mt-4 space-y-4">
              {interview.rounds.map((round, index) => (
                <div key={round.id}>
                  <h4 className={subheadingClasses}>{round.roundType}</h4>
                  <p className={paragraphClasses}>
                    <span className={sublabelClasses}>Date:</span>{' '}
                    {new Date(round.roundDate).toLocaleDateString()}
                  </p>
                  <p className={paragraphClasses}>
                    <span className={sublabelClasses}>Experience:</span>{' '}
                    {round.experience}
                  </p>
                  {index !== interview.rounds.length - 1 && (
                    <hr className="border-t border-gray-300 my-4" />
                  )}
                </div>
              ))}
            </div>
          </div>
        );
    
      case 'leetcode':
        const leetcodeQuestions = interview.questions.filter(
          (q) => q.leetcodeLink && q.leetcodeLink.trim() !== ''
        );
    
        return (
          <div className="p-4 rounded-lg">
            <h3 className={headingClasses}>LeetCode Questions</h3>
            <hr className="border-t border-gray-300 my-4" />
            <ul className="list-disc pl-6 space-y-2 mt-4">
              {leetcodeQuestions.map((q) => (
                <li key={q.id} className={paragraphClasses}>
                  {q.question}
                  <a
                    href={q.leetcodeLink || undefined}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 text-indigo-500 underline"
                  >
                    Open Link
                  </a>
                </li>
              ))}
            </ul>
          </div>
        );
    
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col sm:flex-row">
      {/* Search Section */}
      <div className="w-full sm:w-3/5 p-2 relative">
        <div className="flex items-center justify-center mb-2">
          <h2 className="inline-block font-extrabold text-xs sm:text-xs md:text-sm lg:text-sm text-indigo-700 text-center tracking-wider bg-indigo-200 rounded-md px-2 py-0">
            SEARCH INTERVIEWS
          </h2>
        </div>
        <input
          type="text"
          placeholder="Search by company"
          className="w-full mt-1 mb-0 p-2 text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {/* Badge Filters */}
        <div className="flex flex-wrap gap-2 mb-4 mt-4">
  <div className="w-full">
    {[...levelOptions, 'LeetCode', 'System Design', 'Pre Screen', 'OA', 'Behavioral', 'Technical', 'HR'].map((badge) => (
      <button
        key={badge}
        className={`px-2 py-1 text-[9px] font-semibold rounded-full mr-1 mb-1 ${
          selectedBadges.includes(badge)
            ? 'bg-gradient-to-r from-indigo-800 to-indigo-500 text-white'
            : 'bg-gray-100 text-gray-700'
        }`}
        onClick={() => toggleBadge(badge)}
      >
        {badge}
      </button>
    ))}
  </div>
</div>


        <ul className="mt-0 lg:max-h-[28rem] max-h-[24rem] overflow-y-auto relative">
          {loading ? (
            <div className="flex justify-center items-center h-[8rem] mt-4">
              <Loader />
            </div>
          ) : filteredResults.length > 0 ? (
            filteredResults.map((result) => {
              const hasBehavioral = result.questions.some(
                (q) => q.type.toLowerCase() === 'behavioral'
              );
              const hasTechnical = result.questions.some(
                (q) => q.type.toLowerCase() === 'technical'
              );

              return (
                <li
                  key={result.id}
                  className={`p-1 lg:p-4 my-0 border rounded-md cursor-pointer hover:bg-gray-100 ${
                    selectedInterviewId === result.id
                      ? 'border-indigo-700 my-0 lg:p-4 p-1 bg-indigo-50 text-white border-2'
                      : ''
                  } sm:p-2 sm:border sm:rounded`}
                  onClick={() => handleMobileRedirect(result.id)}
                >
                  <div className="font-semibold lg:text-base text-gray-900 text-sm">{result.company}</div>
                  <div className="text-xs text-gray-500 sm:text-[10px]">
                    {new Date(result.interviewDate).toLocaleDateString()}
                  </div>
                  <div className="flex flex-wrap gap-1 mt-1 sm:mt-1">
                    {result.jobOffer === true ? (
                      <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full sm:px-1 sm:py-0.5 sm:text-[10px]">
                        Offer
                      </span>
                    ) : result.jobOffer === false ? (
                      <span className="px-2 py-1 text-xs font-semibold text-red-800 bg-red-100 rounded-full sm:px-1 sm:py-0.5 sm:text-[10px]">
                        No Offer
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs font-semibold text-yellow-800 bg-yellow-100 rounded-full sm:px-1 sm:py-0.5 sm:text-[10px]">
                        Unsure
                      </span>
                    )}

                    {/* Level Badge */}
                    {result.level && (
                      <span className="px-2 py-1 text-xs font-semibold text-indigo-800 bg-indigo-100 rounded-full sm:px-1 sm:py-0.5 sm:text-[10px]">
                        {result.level}
                      </span>
                    )}

                    {hasBehavioral && (
                      <span className="px-2 py-1 text-xs font-semibold text-orange-800 bg-orange-100 rounded-full sm:px-1 sm:py-0.5 sm:text-[10px]">
                        Behavioral
                      </span>
                    )}

                    {hasTechnical && (
                      <span className="px-2 py-1 text-xs font-semibold text-purple-800 bg-purple-100 rounded-full sm:px-1 sm:py-0.5 sm:text-[10px]">
                        Technical
                      </span>
                    )}

                    {result.rounds.some((round) =>
                      round.roundType.toLowerCase().includes('system design')
                    ) && (
                      <span className="px-2 py-1 text-xs font-semibold text-blue-800 bg-blue-100 rounded-full sm:px-1 sm:py-0.5 sm:text-[10px]">
                        System Design
                      </span>
                    )}

                    {result.rounds.some((round) =>
                      round.roundType.toLowerCase().includes('pre screen')
                    ) && (
                      <span className="px-2 py-1 text-xs font-semibold text-cyan-800 bg-cyan-100 rounded-full sm:px-1 sm:py-0.5 sm:text-[10px]">
                        Pre Screen
                      </span>
                    )}

                    {result.rounds.some((round) =>
                      round.roundType.toLowerCase().includes('oa')
                    ) && (
                      <span className="px-2 py-1 text-xs font-semibold text-fuchsia-800 bg-fuchsia-100 rounded-full sm:px-1 sm:py-0.5 sm:text-[10px]">
                        OA
                      </span>
                    )}

                    {/* LeetCode Badge */}
                    {result.questions.some((q) => q.leetcodeLink) && (
                      <span className="px-2 py-1 text-xs font-semibold text-teal-800 bg-teal-100 rounded-full sm:px-1 sm:py-0.5 sm:text-[10px]">
                        LeetCode
                      </span>
                    )}
                  </div>
                </li>
              );
            })
          ) : (
            <div className="text-sm text-gray-500">No results found</div>
          )}
        </ul>
      </div>

      {/* Detailed View Section */}
      <div
  className="hidden sm:block sm:w-2/5 lg:w-full p-4 rounded-lg mx-2 lg:max-h-[39rem] overflow-y-scroll relative"
>
  {selectedInterviewId && !interview ? (
    <div className="flex justify-center items-center min-h-[10rem]">
      <Loader />
    </div>
  ) : interview ? (
    <>
      <div className="border-b pb-2">
        <ul className="flex text-sm">
          {[
            { key: 'company', label: 'Company', icon: <Building /> },
            { key: 'questions', label: 'Questions', icon: <MessageCircle /> },
            { key: 'ratings', label: 'Ratings', icon: <Star /> },
            { key: 'rounds', label: 'Rounds', icon: <List /> },
            { key: 'leetcode', label: 'LeetCode', icon: <CheckCircle /> },
          ].map(({ key, label, icon }) => (
            <li key={key} className="mr-2">
              <button
                onClick={() => setActiveTab(key)}
                className={`flex items-center gap-1 px-3 py-2 rounded-md ${
                  activeTab === key
                    ? 'text-white bg-indigo-700 font-semibold border-indigo-600 rounded-t-lg px-4 py-2 dark:text-indigo-500 dark:border-indigo-500'
                    : 'border-transparent px-4 py-2 font-semibold hover:text-indigo-700 hover:border-indigo-700 dark:hover:text-gray-300'
                }`}
              >
                {icon}
                <span className="hidden sm:inline">{label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Logo and Intro Display */}
      <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg mt-4">
        {interview?.company && (
          <div className="grid grid-cols-5 gap-4 items-center">
            {/* Left Column: Logo and Company Name (1/5) */}
            <div className="col-span-1 flex flex-col items-center justify-center text-center">
              {(() => {
                const logoData = logos.find((logo) => logo.name === interview.company);
                return (
                  logoData && (
                    <>
                      <div className="flex items-center justify-center h-16 w-full">
                        {/* Display Logo */}
                        {logoData.logo && (
                          <Image
                            src={logoData.logo}
                            alt={`${interview.company} logo`}
                            height={60} // Adjust height for smaller logos
                            width={90} // Keep width proportional
                            className="object-contain"
                          />
                        )}
                      </div>
                      {/* Display Company Name */}
                      <h2 className="text-2xl font-bold mt-4">{interview.company}</h2>
                    </>
                  )
                );
              })()}
            </div>

            {/* Right Column: Company Intro (4/5) */}
            <div className="col-span-4">
              {(() => {
                const logoData = logos.find((logo) => logo.name === interview.company);
                return (
                  logoData?.intro && (
                    <p className="text-base leading-6 text-gray-700">{logoData.intro}</p>
                  )
                );
              })()}
            </div>
          </div>
        )}

        {renderContent()}
      </div>
    </>
  ) : (
    <div className="text-sm text-gray-500 text-center">
      Select an interview to view details
    </div>
  )}
</div>
    </div>
  );
};

export default CombinedView;

