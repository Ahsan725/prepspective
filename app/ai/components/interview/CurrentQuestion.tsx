import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Code, Users, ClipboardCopy } from 'lucide-react';
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
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(question);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const modeLabel =
    mode === 'software' ? 'Software Engineering' : 'Behavioral';
  const modeIcon = mode === 'software' ? <Code className="h-6 w-6" /> : <Users className="h-6 w-6" />;

  return (
    <div className="w-full max-w-6xl mx-auto mb-8">
      <Card className="relative border-none shadow-xl ring-1 ring-slate-200 rounded-xl overflow-hidden">
        <CardHeader className="bg-gradient-to-tr from-indigo-600 to-purple-600 text-white p-6">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold flex items-center gap-3">
              {modeIcon}
              {modeLabel}
            </CardTitle>
            <span className="bg-white text-indigo-700 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
              Current Question
            </span>
          </div>
        </CardHeader>

        <CardContent className="p-6 bg-white">
          <div className="flex justify-between items-start flex-col md:flex-row md:items-center md:space-y-0 space-y-4 mb-6 animate-fade-in">
            <p className="text-lg md:text-xl leading-relaxed text-slate-800 max-w-4xl md:mr-8">
              {question}
            </p>
            <div className="flex gap-2 flex-shrink-0">
              <Button
                variant="outline"
                onClick={onNewQuestion}
              >
                Try Another Question
              </Button>
              <Button
                variant="outline"
                onClick={onChangeMode}
              >
                Change Mode
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCopy}
                title="Copy question"
              >
                <ClipboardCopy className="h-5 w-5 text-slate-600 hover:text-indigo-600 transition" />
              </Button>
            </div>
          </div>
          {copied && (
            <p className="text-sm text-green-600 font-medium mt-1">Copied to clipboard!</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
