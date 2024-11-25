'use client';

import React, { useEffect, useState } from 'react';

type Question = {
  id: number;
  type: string;
  question: string;
  leetcodeLink?: string | null;
};

type Rating = {
  id: number;
  category: string;
  score: number;
};

type Round = {
  id: number;
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
        if (!res.ok) {
          throw new Error('Failed to fetch interviews');
        }
        const data: Interview[] = await res.json();
        setInterviews(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch interviews:', error);
        setLoading(false);
      }
    };

    fetchInterviews();
  }, []);

  if (loading) {
    return <div>Loading interviews...</div>;
  }

  if (interviews.length === 0) {
    return <div>No interviews found.</div>;
  }

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
                  {interview.questions.map((q) => (
                    <li key={q.id}>
                      {q.type}: {q.question}
                      {q.leetcodeLink && (
                        <a
                          href={q.leetcodeLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 underline"
                        >
                          {' '}
                          (LeetCode)
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </td>
              <td className="px-4 py-2 border">
                <ul className="list-disc pl-4">
                  {interview.ratings.map((r) => (
                    <li key={r.id}>
                      {r.category}: {r.score}/5
                    </li>
                  ))}
                </ul>
              </td>
              <td className="px-4 py-2 border">
                <ul className="list-disc pl-4">
                  {interview.rounds.map((r) => (
                    <li key={r.id}>
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
