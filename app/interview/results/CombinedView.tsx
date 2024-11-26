'use client';

import React from 'react';
import { Badge } from '@/components/ui/badge';
import Loader from '@/components/ui/loader';
import { Building, MessageCircle, Star, List, CheckCircle } from 'lucide-react';
import { useCombinedViewData } from './useCombinedViewData';

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
  } = useCombinedViewData();

  const renderContent = () => {
    if (error) {
      return <div className="text-red-600">{error}</div>;
    }
    if (!interview) {
      return <Loader />;
    }

    const headingClasses = "leading-tight font-semibold text-indigo-700 text-xl";
    const subheadingClasses = "leading-tight text-lg font-semibold text-indigo-600";
    const paragraphClasses = "leading-tight text-sm text-gray-800";
    const labelClasses = "leading-tight font-semibold text-gray-600";
    
    switch (activeTab) {
      case 'company':
        return (
          <div className="p-4 rounded-lg">
            <h3 className={headingClasses}>Company Information</h3>
            <hr className="border-t border-gray-300 my-4" />
            <div className="mt-4 space-y-2">
              <p>
                <span className={labelClasses}>Company:</span>{' '}
                <span className={`${paragraphClasses} text-xl font-semibold`}>{interview.company}</span>
              </p>
              <p>
                <span className={labelClasses}>Interview Date:</span>{' '}
                <span className={paragraphClasses}>{interview.interviewDate}</span>
              </p>
              <p>
                <span className={labelClasses}>Job Offer:</span>{' '}
                {interview.jobOffer ? (
                  <Badge className="bg-green-100 text-green-800">Yes</Badge>
                ) : (
                  <Badge className="bg-red-100 text-red-800">No</Badge>
                )}
              </p>
              <p>
                <span className={labelClasses}>Overall Experience:</span>{' '}
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
                            View on LeetCode
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
                    {behavioralQuestions.map((q) => (
                      <li key={q.id} className={paragraphClasses}>
                        {q.question}
                      </li>
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
                  <span className={labelClasses}>{r.category}:</span>{' '}
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
                    <span className={labelClasses}>Date:</span>{' '}
                    {new Date(round.roundDate).toLocaleDateString()}
                  </p>
                  <p className={paragraphClasses}>
                    <span className={labelClasses}>Experience:</span>{' '}
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
                    View on LeetCode
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
    <div className="flex flex-col sm:flex-row gap-6">
      {/* Search Section */}
      <div className="w-full sm:w-1/3 p-4">
        <h1 className="text-lg font-bold text-indigo-700">Search Interviews</h1>
        <input
          type="text"
          placeholder="Search by company"
          className="w-full mt-4 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <ul className="mt-6 space-y-4 max-h-[34rem] overflow-y-auto">
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
                  className={`p-4 border rounded-md cursor-pointer hover:bg-gray-100 ${
                    selectedInterviewId === result.id ? 'border-indigo-700 bg-indigo-50 text-white border-2' : ''
                  }`}
                  onClick={() => handleViewDetails(result.id)}
                >
                  <div className="font-semibold text-base text-gray-900">{result.company}</div>
                  <div className="text-xs text-gray-500">
                    {new Date(result.interviewDate).toLocaleDateString()}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {result.jobOffer === true ? (
                      <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
                        Job Offered
                      </span>
                    ) : result.jobOffer === false ? (
                      <span className="px-2 py-1 text-xs font-semibold text-red-800 bg-red-100 rounded-full">
                        No Offer
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs font-semibold text-yellow-800 bg-yellow-100 rounded-full">
                        Pending
                      </span>
                    )}
                    {hasBehavioral && (
                      <span className="px-2 py-1 text-xs font-semibold text-orange-800 bg-orange-100 rounded-full">
                        Behavioral
                      </span>
                    )}
                    {hasTechnical && (
                      <span className="px-2 py-1 text-xs font-semibold text-purple-800 bg-purple-100 rounded-full">
                        Technical
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
      <div className="w-full sm:w-2/3 p-4 rounded-lg">
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
                          ? 'bg-indigo-700 text-white'
                          : 'text-gray-600 hover:text-indigo-700'
                      }`}
                    >
                      {icon}
                      <span className="hidden sm:inline">{label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            {renderContent()}
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
