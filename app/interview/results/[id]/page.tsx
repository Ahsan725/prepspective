'use client';

import React, { useEffect, useState } from 'react';

type Interview = {
  company: string;
  interviewDate: string;
  jobOffer: boolean;
  overallExperience: string;
  questions: { type: string; question: string }[];
  ratings: { category: string; score: number }[];
  rounds: { roundType: string; roundDate: string; experience: string }[];
};

const DetailView: React.FC<{ params: { id: string } }> = ({ params }) => {
  const [interview, setInterview] = useState<Interview | null>(null);

  useEffect(() => {
    const fetchInterview = async () => {
      try {
        const res = await fetch(`/api/interviews/${params.id}`);
        const data = await res.json();
        setInterview(data);
      } catch (error) {
        console.error('Error fetching interview details:', error);
      }
    };

    if (params.id) fetchInterview();
  }, [params.id]);

  if (!interview) return <div>Loading...</div>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">{interview.company}</h1>
      <div>Date: {interview.interviewDate}</div>
      <div>Job Offer: {interview.jobOffer ? 'Yes' : 'No'}</div>
      <div>Overall Experience: {interview.overallExperience}</div>
      <h2 className="text-lg font-bold mt-4">Questions</h2>
      <ul>
        {interview.questions.map((q, index) => (
          <li key={index}>
            {q.type}: {q.question}
          </li>
        ))}
      </ul>
      <h2 className="text-lg font-bold mt-4">Ratings</h2>
      <ul>
        {interview.ratings.map((r, index) => (
          <li key={index}>
            {r.category}: {r.score}/5
          </li>
        ))}
      </ul>
      <h2 className="text-lg font-bold mt-4">Rounds</h2>
      <ul>
        {interview.rounds.map((round, index) => (
          <li key={index}>
            {round.roundType} on {round.roundDate}: {round.experience}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DetailView;
