import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Loader2, Star } from 'lucide-react';
import { FeedbackData } from '../../types';

interface FeedbackDisplayProps {
  approvedTranscript: string;
  isGrading: boolean;
  feedback: FeedbackData | null;
  onGrade: () => void;
}

export const FeedbackDisplay: React.FC<FeedbackDisplayProps> = ({
  approvedTranscript,
  isGrading,
  feedback,
  onGrade,
}) => {
  const [showTranscript, setShowTranscript] = useState(false);

  return (
    <div className="space-y-6">
      {/* Approved Transcript Card */}
      <Card className="shadow-lg">
        <CardHeader className="border-b">
          <CardTitle className="text-2xl flex items-center">
            <CheckCircle className="h-6 w-6 mr-2 text-emerald-600" />
            Ready for Grading?
          </CardTitle>
          <CardDescription className="text-gray-600">
            You can rerecord your answer if you want. Be clear and specific. When you are satisfied with your answer click Grade Interview.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4 space-y-4">
          {/* the transcript is being generated and eveyrthing is working as fine i have made it invisible by commenting it out just uncomment and you will get the old fubnctionality back */}
          {/* <label className="flex items-center space-x-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={showTranscript}
              onChange={() => setShowTranscript(!showTranscript)}
            />
            <span>Show transcript</span>
          </label> */}

          {showTranscript && (
            <div className="bg-white p-4 rounded-lg border border-gray-100">
              <p className="text-gray-800 whitespace-pre-wrap">
                {approvedTranscript || 'No approved transcript yet.'}
              </p>
            </div>
          )}

          {approvedTranscript && !isGrading && !feedback && (
            <Button onClick={onGrade} className="w-full">
              Grade Interview
            </Button>
          )}

          {isGrading && (
            <div className="flex items-center justify-center space-x-2">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Grading interview...</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Feedback Display */}
      {feedback && (
        <Card className="shadow-lg">
          <CardHeader className="border-b">
            <CardTitle className="text-2xl flex items-center">
              <Star className="h-6 w-6 mr-2 text-yellow-500" />
              Interview Feedback
            </CardTitle>
            <CardDescription className="text-gray-600">
              AI-powered interview analysis
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-4">
            {/* Overall Score */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">Overall Score</span>
                <span className="text-lg font-bold">{feedback.overallScore}/5</span>
              </div>
              <Progress value={feedback.overallScore * 15} className="h-2" />
            </div>

            {/* Strengths */}
            <div>
              <h3 className="font-semibold text-green-600 mb-2">Strengths</h3>
              <ul className="list-disc pl-5 space-y-1">
                {feedback.strengths.map((strength, index) => (
                  <li key={index} className="text-gray-700">{strength}</li>
                ))}
              </ul>
            </div>

            {/* Areas to Improve */}
            <div>
              <h3 className="font-semibold text-amber-600 mb-2">Areas to Improve</h3>
              <ul className="list-disc pl-5 space-y-1">
                {feedback.areasToImprove.map((area, index) => (
                  <li key={index} className="text-gray-700">{area}</li>
                ))}
              </ul>
            </div>

            {/* Detailed Feedback */}
            <div>
              <h3 className="font-semibold text-indigo-600 mb-2">Feedback</h3>
              <p className="text-gray-700 whitespace-pre-wrap">{feedback.detailedFeedback}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
