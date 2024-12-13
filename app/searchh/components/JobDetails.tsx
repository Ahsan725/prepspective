import React from 'react';
import Image from 'next/image';
import logos from '@/data/logos.json'; // Import your JSON file here
import { Interview } from '@/app/searchh/useCombinedViewData'; // Import Interview type
import Link from 'next/link';
import Loader from '@/components/ui/loader';

interface JobDetailsProps {
  selectedInterviewId: number | null;
  interview: Interview | null; // Use Interview type
}

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const getBadgeClass = (score: number) => {
  if (score <= 2) return 'bg-red-100 text-red-800 border-2 border-red-600';
  if (score === 3) return 'bg-orange-100 text-orange-800 border-2 border-orange-600';
  if (score >= 4) return 'bg-green-100 text-green-800 border-2 border-green-600';
  return 'bg-gray-100 text-gray-800';
};

const JobDetails: React.FC<JobDetailsProps> = ({ selectedInterviewId, interview }) => {
  if (!selectedInterviewId) {
    return <p className="text-center text-gray-500 ml-20">Select an interview to view details</p>;
  }

  if (!interview) {
    return <div className="items-start h-screen ml-80 mr-[-60]">
    <Loader />
  </div>;
  }

  // Fetch logo and intro from the JSON file
  const logoData = logos.find((logo) => logo.name === interview.company);

  // Extract ratings for specific categories
  const friendlinessRating = interview.ratings.find((rating) => rating.category === 'Friendliness');
  const difficultyRating = interview.ratings.find((rating) => rating.category === 'Difficulty');
  const responsivenessRating = interview.ratings.find((rating) => rating.category === 'Responsiveness');

  return (
    <div className="w-full lg:w-8/12 bg-white border rounded-lg shadow-md mt-1 p-6 overflow-y-auto max-h-full">
      {/* Header Section */}
      <div className="flex items-center mb-4">
        <Image
          src={logoData?.logo || '/placeholder.png'}
          alt={interview.company || 'Company Logo'}
          width={60}
          height={60}
          className="mr-4 object-contain"
        />
        <div>
          <h2 className="text-2xl font-bold">{interview.company || 'Unknown Company'}</h2>
          <p className="text-sm text-gray-500">{logoData?.intro || 'No introduction available.'}</p>
        </div>
      </div>

      {/* Interview Date and Badges */}
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-gray-700">
          <strong>Interview Date:</strong> {formatDate(interview.interviewDate)}
        </p>
        <div className="flex gap-2">
          {friendlinessRating && (
            <span
              className={`px-2 py-1 rounded-full text-xs font-semibold ${getBadgeClass(friendlinessRating.score)}`}
            >
              Friendliness: {['Rude', 'Not Friendly', 'Formal', 'Friendly', 'Super Friendly'][friendlinessRating.score - 1]}
            </span>
          )}
          {difficultyRating && (
            <span
              className={`px-2 py-1 rounded-full text-xs font-semibold ${getBadgeClass(difficultyRating.score)}`}
            >
              Difficulty: {['Super Hard', 'Hard', 'Medium', 'Easy', 'Super Easy'][difficultyRating.score - 1]}
            </span>
          )}
          {responsivenessRating && (
            <span
              className={`px-2 py-1 rounded-full text-xs font-semibold ${getBadgeClass(responsivenessRating.score)}`}
            >
              Responsiveness: {['Unresponsive', 'Very Slow', 'Slow', 'Prompt', 'Very Prompt'][responsivenessRating.score - 1]}
            </span>
          )}
        </div>
      </div>

      <hr className="my-4" />

      {/* Interview Overview */}
      <h3 className="text-lg font-semibold mb-2">Interview Overview</h3>
      <p className="text-gray-700 text-sm mb-4">
        {interview.overallExperience || 'No overview available.'}
      </p>

      <hr className="my-4" />

      {/* LeetCode Questions Section */}
      {interview.questions.some((q) => q.leetcodeLink) && (
        <>
          <h3 className="text-lg font-semibold mb-2">LeetCode Questions</h3>
          <ul className="list-disc ml-5 text-sm text-gray-700 space-y-2">
            {interview.questions
              .filter((q) => q.leetcodeLink)
              .map((question, index) => (
                <li key={index}>
                  {question.question}
                  {question.leetcodeLink && (
                    <Link
                      href={question.leetcodeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline ml-2"
                    >
                      Open on LeetCode
                    </Link>
                  )}
                </li>
              ))}
          </ul>
          <hr className="my-4" />
        </>
      )}

      {/* Interview Rounds */}
      <h3 className="text-lg font-semibold mb-2">Interview Rounds</h3>
      {interview.rounds && interview.rounds.length > 0 ? (
        <div className="space-y-4">
          {interview.rounds.map((round, index) => (
            <div key={index} className="border p-3 rounded-md">
              <h4 className="text-md font-semibold">{round.roundType}</h4>
              <p className="text-sm text-gray-500 mb-2">
                <strong>Date:</strong> {formatDate(round.roundDate)}
              </p>
              <p className="text-sm text-gray-700">{round.experience}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-700 text-sm">No interview rounds listed.</p>
      )}

      <hr className="my-4" />

      {/* All Questions */}
      <h3 className="text-lg font-semibold mb-2">All Questions</h3>
      <ul className="list-none ml-0 text-sm text-gray-700 space-y-4">
        {interview.questions && interview.questions.length > 0 ? (
          interview.questions.map((question, index) => (
            <li key={index} className="flex flex-col gap-1">
              {question.type === 'technical' && (
                <span className="self-start px-2 py-1 bg-blue-200 text-xs font-semibold rounded">
                  Technical
                </span>
              )}
              {question.type === 'behavioral' && (
                <span className="self-start px-2 py-1 bg-purple-200 text-xs font-semibold rounded">
                  Behavioral
                </span>
              )}
              <span className="text-gray-800">{question.question}</span>
            </li>
          ))
        ) : (
          <li>No questions listed.</li>
        )}
      </ul>
    </div>
  );
};

export default JobDetails;
