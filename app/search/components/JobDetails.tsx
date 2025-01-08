import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Interview } from '@/app/search/useCombinedViewData';
import Loader from '@/components/ui/loader';
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CalendarIcon, BookOpenIcon, BriefcaseIcon, CodeIcon, FileQuestion } from 'lucide-react'

interface JobDetailsProps {
  selectedInterviewId: number | null;
  interview: Interview | null;
}

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const getBadgeVariant = (score: number) => {
  if (score <= 2) return 'destructive';
  if (score === 3) return 'warning';
  if (score >= 4) return 'success';
  return 'secondary';
};

const getRatingLabel = (category: string, score: number) => {
  const labels = {
    'Friendliness': ['Rude', 'Not Friendly', 'Formal', 'Friendly', 'Super Friendly'],
    'Difficulty': ['Super Hard', 'Hard', 'Medium', 'Easy', 'Super Easy'],
    'Responsiveness': ['Unresponsive', 'Very Slow', 'Slow', 'Prompt', 'Very Prompt']
  };
  return labels[category as keyof typeof labels][score - 1];
};

const JobDetails: React.FC<JobDetailsProps> = ({ selectedInterviewId, interview }) => {
  if (!selectedInterviewId) {
    return (
      <Card className="w-full lg:w-8/12 mt-1">
        <CardContent className="flex items-center justify-center h-64">
          <p className="text-center text-gray-500">Select an interview to view details</p>
        </CardContent>
      </Card>
    );
  }

  if (!interview) {
    return (
      <Card className="w-full lg:w-8/12 mt-1">
        <CardContent className="flex items-center justify-center h-64">
          <Loader />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full lg:w-8/12 mt-1 overflow-hidden mb-1">
      <CardHeader className="pb-2">
        <div className="flex items-center space-x-4">
          <div className="relative w-16 h-16 rounded-full overflow-hidden">
            <Image
              src={`/${interview.company.toLowerCase().replace(/\s+/g, '-')}.png`}
              alt={`${interview.company} logo`}
              layout="fill"
              objectFit="contain"
              className="p-2"
            />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold">{interview.role}</CardTitle>
            <p className="text-lg text-muted-foreground">{interview.company}</p>
          </div>
        </div>
        <Separator />
      </CardHeader>
      <CardContent className="pt-2 pb-6 h-[calc(100vh-200px)] overflow-y-auto">
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="flex items-center">
              <CalendarIcon className="mr-1 h-3 w-3" />
              {formatDate(interview.interviewDate)}
            </Badge>
            {interview.ratings.map((rating) => (
              <Badge key={rating.category} variant={getBadgeVariant(rating.score)}>
                {rating.category}: {getRatingLabel(rating.category, rating.score)}
              </Badge>
            ))}
          </div>
          <Separator />
          <div>
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              Interview Overview
            </h3>
            <p className="text-sm">{interview.overallExperience}</p>
          </div>
          <Separator />
          {interview.questions.some((q) => q.leetcodeLink) && (
            <div>
              <h3 className="text-lg font-semibold mb-2 flex items-center">
                LeetCode Questions
              </h3>
              <ul className="space-y-2">
                {interview.questions
                  .filter((q) => q.leetcodeLink)
                  .map((question, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-sm mr-2">•</span>
                      <span className="text-sm">{question.question}</span>
                      {question.leetcodeLink && (
                        <Link
                          href={question.leetcodeLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-1 inline-flex items-center px-2 py-1 text-[10px] font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
                        >
                          Open
                        </Link>
                      )}
                    </li>
                  ))}
              </ul>
            </div>
          )}
          <Separator />
          <div>
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              Interview Rounds
            </h3>
            {interview.rounds && interview.rounds.length > 0 ? (
              <div className="space-y-4">
                {interview.rounds.map((round, index) => (
                  <Card key={index}>
                    <CardContent className="pt-4">
                      <h4 className="text-md font-semibold">{round.roundType}</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        {formatDate(round.roundDate)}
                      </p>
                      <p className="text-sm">{round.experience}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No interview rounds listed.</p>
            )}
          </div>
          <Separator />
          <div>
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              All Questions
            </h3>
            <ul className="space-y-4">
              {interview.questions && interview.questions.length > 0 ? (
                interview.questions.map((question, index) => (
                  <li key={index} className="flex flex-col gap-1">
                    <Badge variant={question.type === 'technical' ? 'accent' : 'accent2'} className="self-start">
                      {question.type === 'technical' ? 'Technical' : 'Behavioral'}
                    </Badge>
                    <span className="text-sm">{question.question}</span>
                  </li>
                ))
              ) : (
                <li className="text-sm text-muted-foreground">No questions listed.</li>
              )}
            </ul>
          </div>
          <br /><br /><br />
        </div>
      </CardContent>
    </Card>
  );
};

export default JobDetails;
