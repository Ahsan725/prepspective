'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useParams } from 'next/navigation';

type Interview = {
  company: string;
  interviewDate: string;
  jobOffer: boolean;
  overallExperience: string;
  questions: { type: string; question: string }[];
  ratings: { category: string; score: number }[];
  rounds: { roundType: string; roundDate: string; experience: string }[];
};

const DetailView: React.FC = () => {
  const params = useParams(); // Use the Next.js `useParams` hook
  const [interview, setInterview] = useState<Interview | null>(null);

  useEffect(() => {
    const fetchInterview = async () => {
      try {
        if (params.id) {
          const res = await fetch(`/api/interviews/${params.id}`);
          const data = await res.json();
          setInterview(data);
        }
      } catch (error) {
        console.error('Error fetching interview details:', error);
      }
    };

    fetchInterview();
  }, [params.id]);

  if (!interview)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-indigo-600 text-xl font-bold">Loading...</div>
      </div>
    );

  return (
    <div className="container mx-auto p-6">
      {/* Company Header */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-indigo-600">
            {interview.company}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <span className="font-semibold text-gray-600">Date:</span>{' '}
              {interview.interviewDate}
            </div>
            <div>
              <span className="font-semibold text-gray-600">Job Offer:</span>{' '}
              <Badge
                className={`${
                  interview.jobOffer
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {interview.jobOffer ? 'Yes' : 'No'}
              </Badge>
            </div>
            <div>
              <span className="font-semibold text-gray-600">Experience:</span>{' '}
              {interview.overallExperience}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Questions Section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-xl text-indigo-600">Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {interview.questions.map((q, index) => (
              <li key={index} className="flex items-center">
                <Badge className="bg-indigo-100 text-indigo-600 mr-2">
                  {q.type}
                </Badge>
                <span>{q.question}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Ratings Section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-xl text-indigo-600">Ratings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {interview.ratings.map((r, index) => (
              <div
                key={index}
                className="p-4 border rounded-md bg-gray-50 shadow-sm flex justify-between"
              >
                <span className="font-semibold text-gray-600">{r.category}:</span>
                <span className="font-bold text-indigo-600">{r.score}/5</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Rounds Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-indigo-600">Rounds</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {interview.rounds.map((round, index) => (
              <li
                key={index}
                className="p-4 border rounded-md bg-gray-50 shadow-sm space-y-2"
              >
                <div className="font-bold text-indigo-600">{round.roundType}</div>
                <div className="text-gray-600">
                  <span className="font-semibold">Date:</span> {round.roundDate}
                </div>
                <div>{round.experience}</div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default DetailView;
