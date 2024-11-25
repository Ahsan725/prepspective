'use client';

import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import Loader from '@/components/ui/loader';
import { Building, MessageCircle, Star, List, CheckCircle } from 'lucide-react';

type Question = {
  id: number;
  interviewId: number;
  type: string;
  question: string;
  leetcodeLink?: string | null;
};

type Rating = {
  id: number;
  interviewId: number;
  category: string;
  score: number;
};

type Round = {
  id: number;
  interviewId: number;
  roundType: string;
  roundDate: string;
  experience: string;
};

type Interview = {
  id: number;
  company: string;
  interviewDate: string;
  createdAt: string;
  updatedAt: string;
  overallExperience: string;
  jobOffer: boolean;
  questions: Question[];
  ratings: Rating[];
  rounds: Round[];
};

const CombinedView: React.FC = () => {
  const [results, setResults] = useState<Interview[]>([]);
  const [filteredResults, setFilteredResults] = useState<Interview[]>([]);
  const [query, setQuery] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const [selectedInterviewId, setSelectedInterviewId] = useState<number | null>(null);
  const [interview, setInterview] = useState<Interview | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('company');

  // Fetch all results
  const fetchResults = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/interviews`);
      let data: Interview[] = await res.json();
      // Sort results by `interviewDate` in descending order
      data = data.sort((a, b) => new Date(b.interviewDate).getTime() - new Date(a.interviewDate).getTime());
      setResults(data);
      setFilteredResults(data); // Set initial filtered results
    } catch (error) {
      console.error('Error fetching results:', error);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchResults();
  }, []);

  // Filter results dynamically based on the query
  useEffect(() => {
    if (query.trim() === '') {
      setFilteredResults(results); // Show all results if query is empty
    } else {
      const lowerCaseQuery = query.toLowerCase();
      const filtered = results
        .filter((result) =>
          result.company.toLowerCase().includes(lowerCaseQuery)
        )
        .sort((a, b) => new Date(b.interviewDate).getTime() - new Date(a.interviewDate).getTime()); // Keep descending order
      setFilteredResults(filtered);
    }
  }, [query, results]);
  

  // Fetch interview details
  const fetchInterview = async (id: number) => {
    setError(null);
    setInterview(null);
    try {
      const res = await fetch(`/api/interviews/${id}`);
      if (!res.ok) {
        throw new Error('Failed to fetch interview details');
      }
      const data: Interview = await res.json();
      setInterview(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
    }
  };

  const handleViewDetails = (id: number) => {
    setSelectedInterviewId(id);
    fetchInterview(id);
  };

  const renderContent = () => {
    if (error) {
      return <div className="text-red-600">{error}</div>;
    }
    if (!interview) {
      return <Loader />;
    }

    const taggedQuestion = interview.questions.find(
      (q) => q.leetcodeLink && q.leetcodeLink.trim() !== ''
    );

    switch (activeTab) {
      case 'company':
        return (
          <>
            <h3 className="text-2xl font-bold">{interview.company}</h3>
            <p>
              <strong>Interview Date:</strong> {interview.interviewDate}
            </p>
            <p>
              <strong>Job Offer:</strong>{' '}
              {interview.jobOffer ? (
                <Badge className="bg-green-100 text-green-800">Yes</Badge>
              ) : (
                <Badge className="bg-red-100 text-red-800">No</Badge>
              )}
            </p>
            <p>
              <strong>Overall Experience:</strong> {interview.overallExperience}
            </p>
          </>
        );
      case 'questions':
        return (
          <>
            <h3 className="text-lg font-bold">Questions</h3>
            <ul>
              {interview.questions.map((q) => (
                <li key={q.id}>
                  <Badge>{q.type}</Badge> {q.question}
                </li>
              ))}
            </ul>
          </>
        );
      case 'ratings':
        return (
          <>
            <h3 className="text-lg font-bold">Ratings</h3>
            <ul>
              {interview.ratings.map((r) => (
                <li key={r.id}>
                  {r.category}: {r.score}/5
                </li>
              ))}
            </ul>
          </>
        );
      case 'rounds':
        return (
          <>
            <h3 className="text-lg font-bold">Rounds</h3>
            <ul>
              {interview.rounds.map((round) => (
                <li key={round.id}>
                  <p>{round.roundType}</p>
                  <p>{round.roundDate}</p>
                  <p>{round.experience}</p>
                </li>
              ))}
            </ul>
          </>
        );
      case 'leetcode':
        return taggedQuestion ? (
          <>
            <h3 className="text-lg font-bold">LeetCode Question</h3>
            <p>{taggedQuestion.question}</p>
            <a
              href={taggedQuestion.leetcodeLink ?? undefined}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-indigo-500 underline mt-2"
            >
              View LeetCode Problem
            </a>
          </>
        ) : (
          <p>No tagged LeetCode question available</p>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col sm:flex-row">
      {/* Search and Results - Full width on mobile, 1/3 of screen on larger screens */}
      <div className="w-full sm:w-1/3 p-4 border-b sm:border-r sm:border-b-0">
        <h1 className="text-2xl font-bold mb-4">Search Interviews</h1>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Search by company"
            className="w-full p-2 border rounded"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <ul className="mt-4">
  {loading ? (
    <Loader />
  ) : filteredResults.length > 0 ? (
    filteredResults.map((result) => {
      // Determine if the entry has behavioral or technical questions
      const hasBehavioral = result.questions.some((q) => q.type.toLowerCase() === 'behavioral');
      const hasTechnical = result.questions.some((q) => q.type.toLowerCase() === 'technical');

      return (
        <li
          key={result.id}
          className={`p-2 border rounded cursor-pointer hover:bg-gray-100 ${
            selectedInterviewId === result.id ? 'bg-gray-100' : ''
          }`}
          onClick={() => handleViewDetails(result.id)}
        >
          <div className="font-bold">{result.company}</div>
          <div>{new Date(result.interviewDate).toLocaleDateString()}</div>
          <div className="flex gap-2">
            {result.jobOffer === true ? (
              <span className="inline-block px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
                Offer Received
              </span>
            ) : result.jobOffer === false ? (
              <span className="inline-block px-2 py-1 text-xs font-semibold text-red-800 bg-red-100 rounded-full">
                Offer Not Received
              </span>
            ) : (
              <span className="inline-block px-2 py-1 text-xs font-semibold text-yellow-800 bg-yellow-100 rounded-full">
                Pending
              </span>
            )}
          </div>
          {/* Add badges for question types */}
          <div className="mt-2 flex gap-2">
            {hasBehavioral && (
              <Badge className="bg-blue-100 text-blue-800">Behavioral</Badge>
            )}
            {hasTechnical && (
              <Badge className="bg-purple-100 text-purple-800">Technical</Badge>
            )}
          </div>
        </li>
      );
    })
  ) : (
    <div>No results found</div>
  )}
</ul>


      </div>

      {/* Detailed View with Tabs - Full width on mobile, 2/3 of screen on larger screens */}
{/* Detailed View with Tabs - Full width on mobile, 2/3 of screen on larger screens */}
<div className="w-full sm:w-2/3 p-4">
  {selectedInterviewId && !interview ? (
    // Show the loader while fetching interview details
    <div className="flex justify-center items-center h-full">
      <Loader />
    </div>
  ) : interview ? (
    <>
      <div className="border-b border-gray-200 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
          {[
            { key: 'company', label: 'Company', icon: <Building className="w-4 h-4" /> },
            { key: 'questions', label: 'Questions', icon: <MessageCircle className="w-4 h-4" /> },
            { key: 'ratings', label: 'Ratings', icon: <Star className="w-4 h-4" /> },
            { key: 'rounds', label: 'Rounds', icon: <List className="w-4 h-4" /> },
            { key: 'leetcode', label: 'LeetCode', icon: <CheckCircle className="w-4 h-4" /> },
          ].map(({ key, label, icon }) => (
            <li key={key} className="me-2">
              <button
                onClick={() => setActiveTab(key)}
                className={`inline-flex items-center justify-center p-4 border-b-2 ${
                  activeTab === key
                    ? 'text-white bg-indigo-700 font-semibold border-indigo-600 rounded-t-lg px-4 py-2 dark:text-indigo-500 dark:border-indigo-500'
                    : 'border-transparent px-4 py-2 font-semibold hover:text-indigo-700 hover:border-indigo-700 dark:hover:text-gray-300'
                }`}
              >
                <span className="block">{icon}</span>
                <span className="hidden sm:block ml-2">{label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg mt-4">{renderContent()}</div>
    </>
  ) : (
    // Placeholder for when no interview is selected
    <div className="text-gray-500 text-center">Select an interview to view details</div>
  )}
</div>

    </div>
  );
};

export default CombinedView;
