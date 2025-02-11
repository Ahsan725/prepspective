import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Code, Users } from 'lucide-react';
import { InterviewMode } from '../../types';

interface CurrentQuestionProps {
  mode: Exclude<InterviewMode, null>;
  question: string;
  onNewQuestion: () => void;
  onChangeMode: () => void;
}

export const CurrentQuestion: React.FC<CurrentQuestionProps> = ({
  mode,
  question,
  onNewQuestion,
  onChangeMode,
}) => {
  return (
    <div className="w-full max-w-6xl mx-auto mb-8">
      <Card className="shadow-lg relative">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            {mode === 'software' ? <Code className="h-5 w-5" /> : <Users className="h-5 w-5" />}
            Current Question
          </CardTitle>
        </CardHeader>
        {/* Container with both buttons, fixed at the top-right */}
        <div className="absolute top-2 right-2 flex gap-2">
          <Button
            variant="outline"
            onClick={onNewQuestion}
            className="text-sm"
          >
            Try Another Question
          </Button>
          <Button
            variant="outline"
            onClick={onChangeMode}
            className="text-sm"
          >
            Change Interview Mode
          </Button>
        </div>
        {/* Extra top padding prevents content from overlapping the buttons */}
        <CardContent className="pt-12">
          <p className="text-lg font-medium text-gray-800">{question}</p>
        </CardContent>
      </Card>
    </div>
  );
};
