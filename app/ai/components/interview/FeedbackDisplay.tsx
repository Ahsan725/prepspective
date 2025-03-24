import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
      {/* Transcript Approval Section */}
      <Card className="rounded-lg shadow-sm border border-slate-100">
        <CardHeader className="p-6 border-b bg-gradient-to-tr from-emerald-700 to-teal-400 text-white rounded-t-xl">
          <div className="flex items-center gap-3">
            <CheckCircle className="h-6 w-6" />
            <div>
              <CardTitle className="text-2xl font-bold flex items-center gap-2">
                Step 2. Ready to Grade?
              </CardTitle>
              <CardDescription className="text-slate-100 text-sm">
                Finalize your answer for AI evaluation
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-5 space-y-4">
          {showTranscript && (
            <div className="bg-slate-50 p-3 rounded-md text-sm text-slate-600 border border-slate-100">
              {approvedTranscript || 'No transcript provided.'}
            </div>
          )}

<div className="flex flex-col gap-3">
  {!isGrading && !feedback && approvedTranscript && (
    <div className="flex justify-center">
      <Button
        onClick={onGrade}
        size="sm"
        className="w-fit text-white text-base font-semibold px-6 py-6"
      >
        Grade Interview
      </Button>
    </div>
  )}

  {isGrading && (
    <div className="flex items-center justify-center gap-2 text-slate-500 text-sm">
      <Loader2 className="h-4 w-4 animate-spin" />
      <span>Analyzing response...</span>
    </div>
  )}
</div>

        </CardContent>
      </Card>

      {/* Feedback Section */}
      {feedback && (
        <Card className="rounded-lg shadow-sm border border-slate-100">
          <CardHeader className="p-6 border-b bg-gradient-to-tr from-orange-600 to-yellow-300 text-white rounded-t-xl">
            <div className="flex items-center gap-3">
              <Star className="h-6 w-6" />
              <div>
                <CardTitle className="text-2xl font-bold flex items-center gap-2">
                  Step 3. AI Evaluation
                </CardTitle>
                <CardDescription className="text-slate-100 text-sm">
                  Performance analysis and recommendations
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-5 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Metrics Column */}
              <div className="lg:col-span-1 space-y-4">
                <div className="bg-white p-4 rounded-lg border border-slate-100 shadow-xs">
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-12 w-12 ${
                            feedback.overallScore >= star
                              ? 'text-amber-500'
                              : 'text-slate-200'
                          }`}
                          fill={feedback.overallScore >= star ? '#f59e0b' : 'none'}
                        />
                      ))}
                    </div>
                    <p className="text-sm font-semibold text-slate-700">
                      Overall Score: {feedback.overallScore}/5
                    </p>
                  </div>
                </div>
              </div>

              {/* Content Column */}
              <div className="lg:col-span-2 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Strengths */}
                  <div className="p-3 bg-green-50 rounded-lg border border-green-100">
                    <h3 className="text-lg font-semibold text-green-700 mb-2">
                      Strengths
                    </h3>
                    <ul className="space-y-1.5 text-md text-slate-700">
                      {feedback.strengths.map((s, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-green-500 text-xl">✓</span>
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Improvements */}
                  <div className="p-3 bg-rose-50 rounded-lg border border-rose-100">
                    <h3 className="text-lg font-semibold text-rose-700 mb-2">
                      Areas to Improve
                    </h3>
                    <ul className="space-y-1.5 text-md text-slate-700">
                      {feedback.areasToImprove.map((a, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-rose-500 text-xl">x</span>
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Detailed Feedback */}
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <h3 className="text-lg font-semibold text-blue-700 mb-3">
                    Detailed Analysis
                  </h3>
                  <div className="text-md text-slate-700 leading-relaxed">
                    {feedback.detailedFeedback}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};