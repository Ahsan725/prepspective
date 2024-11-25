'use client';

import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { useParams } from 'next/navigation';
import Loader from '@/components/ui/loader';
import {
  Building,
  MessageCircle,
  Star,
  List,
  CheckCircle,
} from 'lucide-react';

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

const DetailView: React.FC = () => {
  const params = useParams();
  const [interview, setInterview] = useState<Interview | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('company'); // Default tab: company

  useEffect(() => {
    const fetchInterview = async () => {
      try {
        if (params.id) {
          const res = await fetch(`/api/interviews/${params.id}`);
          if (!res.ok) {
            throw new Error('Failed to fetch interview details');
          }
          const data: Interview = await res.json(); // Explicitly typing API response
          setInterview(data);
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error('Error fetching interview details:', error.message);
          setError(error.message);
        } else {
          console.error('Unexpected error:', error);
          setError('An unexpected error occurred');
        }
      }
    };

    fetchInterview();
  }, [params.id]);

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-600 text-xl font-bold">{error}</div>
      </div>
    );
  }

  if (!interview)
    return (
      <div className="flex justify-center items-center h-screen">
         <Loader />
      </div>
    );

  const taggedQuestion = interview.questions.find(
    (q) => q.leetcodeLink && q.leetcodeLink.trim() !== ''
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'company':
        return (
          <>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {interview.company}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-2">
              <strong>Interview Date:</strong> {interview.interviewDate}
            </p>
            <p className="text-gray-500 dark:text-gray-400 mb-2">
              <strong>Job Offer:</strong>{' '}
              {interview.jobOffer ? (
                <Badge className="bg-green-100 text-green-800">Yes</Badge>
              ) : (
                <Badge className="bg-red-100 text-red-800">No</Badge>
              )}
            </p>
            <p className="text-gray-500 dark:text-gray-400">
              <strong>Overall Experience:</strong> {interview.overallExperience}
            </p>
          </>
        );
      case 'questions':
        return (
          <>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Questions
            </h3>
            <ul className="space-y-3">
              {interview.questions.map((q) => (
                <li key={q.id}>
                  <Badge className="bg-indigo-100 text-indigo-600 mr-2">
                    {q.type}
                  </Badge>
                  <span>{q.question}</span>
                </li>
              ))}
            </ul>
          </>
        );
      case 'ratings':
        return (
          <>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Ratings
            </h3>
            <ul className="space-y-3">
              {interview.ratings.map((r) => (
                <li key={r.id}>
                  <span className="text-gray-500">{r.category}:</span>{' '}
                  <span className="font-bold">{r.score}/5</span>
                </li>
              ))}
            </ul>
          </>
        );
      case 'rounds':
        return (
          <>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Rounds
            </h3>
            <ul className="space-y-4">
              {interview.rounds.map((round) => (
                <li key={round.id}>
                  <p className="font-bold text-indigo-600">{round.roundType}</p>
                  <p>
                    <strong>Date:</strong> {round.roundDate}
                  </p>
                  <p>{round.experience}</p>
                </li>
              ))}
            </ul>
          </>
        );
      case 'leetcode':
        return taggedQuestion ? (
          <>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Tagged LeetCode Question
            </h3>
            <p>{taggedQuestion.question}</p>
            <a
              href={taggedQuestion.leetcodeLink || undefined}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-indigo-500 underline mt-2"
            >
              View LeetCode Problem
            </a>
          </>
        ) : (
          <p className="text-gray-600">No tagged LeetCode question available.</p>
        );
      default:
        return null;
    }
  };

  return (
    <div className="md:flex px-6 py-4">
      <ul className="flex-column space-y space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0">
        <li>
          <button
            onClick={() => setActiveTab('company')}
            className={`inline-flex items-center px-4 py-3 rounded-lg w-full ${
              activeTab === 'company'
                ? 'bg-indigo-700 text-white'
                : 'bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700'
            }`}
          >
            <Building className="w-4 h-4 mr-2" />
            Company
          </button>
        </li>
        <li>
          <button
            onClick={() => setActiveTab('questions')}
            className={`inline-flex items-center px-4 py-3 rounded-lg w-full ${
              activeTab === 'questions'
                ? 'bg-indigo-700 text-white'
                : 'bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700'
            }`}
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Questions
          </button>
        </li>
        <li>
          <button
            onClick={() => setActiveTab('ratings')}
            className={`inline-flex items-center px-4 py-3 rounded-lg w-full ${
              activeTab === 'ratings'
                ? 'bg-indigo-700 text-white'
                : 'bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700'
            }`}
          >
            <Star className="w-4 h-4 mr-2" />
            Ratings
          </button>
        </li>
        <li>
          <button
            onClick={() => setActiveTab('rounds')}
            className={`inline-flex items-center px-4 py-3 rounded-lg w-full ${
              activeTab === 'rounds'
                ? 'bg-indigo-700 text-white'
                : 'bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700'
            }`}
          >
            <List className="w-4 h-4 mr-2" />
            Rounds
          </button>
        </li>
        <li>
          <button
            onClick={() => setActiveTab('leetcode')}
            className={`inline-flex items-center px-4 py-3 rounded-lg w-full ${
              activeTab === 'leetcode'
                ? 'bg-indigo-700 text-white'
                : 'bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700'
            }`}
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            LeetCode
          </button>
        </li>
      </ul>
      <div className="p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full">
        {renderContent()}
      </div>
    </div>
  );
};

export default DetailView;
