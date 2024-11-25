'use client';

import React, { useEffect, useState } from 'react';

type Question = {
  type: string;
  question: string;
  leetcodeLink?: string;
};

type Rating = {
  category: string;
  score: number;
};

type Round = {
  roundType: string;
  roundDate: string;
  experience: string;
};

type Interview = {
  id: number;
  company: string;
  interviewDate: string;
  jobOffer: boolean;
  overallExperience: string;
  questions: Question[];
  ratings: Rating[];
  rounds: Round[];
};

const InterviewTable: React.FC = () => {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const res = await fetch('/api/interviews');
        const data = await res.json();

        // Ensure all nested fields default to an empty array if undefined
        const normalizedData = data.map((interview: Interview) => ({
          ...interview,
          questions: interview.questions || [],
          ratings: interview.ratings || [],
          rounds: interview.rounds || [],
        }));

        setInterviews(normalizedData);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch interviews:', error);
        setLoading(false);
      }
    };

    fetchInterviews();
  }, []);

  if (loading) return <div>Loading interviews...</div>;

  if (interviews.length === 0) return <div>No interviews found.</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Interviews</h1>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Company</th>
            <th className="px-4 py-2 border">Interview Date</th>
            <th className="px-4 py-2 border">Job Offer</th>
            <th className="px-4 py-2 border">Overall Experience</th>
            <th className="px-4 py-2 border">Questions</th>
            <th className="px-4 py-2 border">Ratings</th>
            <th className="px-4 py-2 border">Rounds</th>
          </tr>
        </thead>
        <tbody>
          {interviews.map((interview) => (
            <tr key={interview.id}>
              <td className="px-4 py-2 border">{interview.company}</td>
              <td className="px-4 py-2 border">{interview.interviewDate}</td>
              <td className="px-4 py-2 border">{interview.jobOffer ? 'Yes' : 'No'}</td>
              <td className="px-4 py-2 border">{interview.overallExperience}</td>
              <td className="px-4 py-2 border">
                <ul className="list-disc pl-4">
                  {interview.questions.map((q, index) => (
                    <li key={index}>
                      {q.type}: {q.question}
                      {q.leetcodeLink && <a href={q.leetcodeLink} target="_blank" rel="noopener noreferrer"> (LeetCode)</a>}
                    </li>
                  ))}
                </ul>
              </td>
              <td className="px-4 py-2 border">
                <ul className="list-disc pl-4">
                  {interview.ratings.map((r, index) => (
                    <li key={index}>
                      {r.category}: {r.score}/5
                    </li>
                  ))}
                </ul>
              </td>
              <td className="px-4 py-2 border">
                <ul className="list-disc pl-4">
                  {interview.rounds.map((r, index) => (
                    <li key={index}>
                      {r.roundType} on {r.roundDate}: {r.experience}
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InterviewTable;
