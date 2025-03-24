'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { BookOpen, EyeOff, Eye } from 'lucide-react';

interface InterviewTipsProps {
  showTips: boolean;
  onToggleTips: () => void;
}

export const InterviewTips: React.FC<InterviewTipsProps> = ({
  showTips,
  onToggleTips,
}) => {
  return (
    <div className="w-full max-w-6xl mx-auto relative">
      {/* Toggle Button */}
      {/* <div className="absolute top-2 right-2 z-10">
        <Button
          size="icon"
          variant="ghost"
          onClick={onToggleTips}
          className="rounded-full hover:bg-slate-200"
          title={showTips ? 'Hide Tips' : 'Show Tips'}
        >
          {showTips ? (
            <EyeOff className="h-5 w-5 text-slate-600" />
          ) : (
            <Eye className="h-5 w-5 text-slate-600" />
          )}
        </Button>
      </div> */}

      {showTips && (
        <Card className="mb-4 bg-white border border-slate-200 shadow-sm rounded-xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="h-5 w-5 text-indigo-600" />
              <h3 className="text-lg font-semibold text-slate-800">Quick Interview Tips</h3>
            </div>
            <ul className="space-y-2 text-slate-700 text-sm leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="mt-1 text-indigo-500">•</span>
                <p>Structure your answers using the STAR method (Situation, Task, Action, Result)</p>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-indigo-500">•</span>
                <p>Speak clearly and at a moderate pace</p>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-indigo-500">•</span>
                <p>Use specific examples to support your points</p>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-indigo-500">•</span>
                <p>Keep your answers focused and relevant to the question</p>
              </li>
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
