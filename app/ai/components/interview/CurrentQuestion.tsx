'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Code, Users, ClipboardCopy, BarChart2, Briefcase } from 'lucide-react';
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
  const [animatingOut, setAnimatingOut] = useState(false);
  const [displayedQuestion, setDisplayedQuestion] = useState(question);

  const handleCopy = () => {
    navigator.clipboard.writeText(question);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleNewQuestionClick = () => {
    setAnimatingOut(true);
    setTimeout(() => {
      onNewQuestion();
      setAnimatingOut(false);
    }, 400); // duration matches animation below
  };

  // Update displayedQuestion when the question prop changes
  useEffect(() => {
    setDisplayedQuestion(question);
  }, [question]);

  // Define mode labels and icons based on the selected mode
  let modeLabel: string;
  let modeIcon: JSX.Element | null;
  switch (mode) {
    case 'software':
      modeLabel = 'Technical';
      modeIcon = <Code className="h-6 w-6 text-white" />;
      break;
    case 'behavioral':
      modeLabel = 'Behavioral';
      modeIcon = <Users className="h-6 w-6 text-white" />;
      break;
    case 'data-analytics':
      modeLabel = 'Data Analytics';
      modeIcon = <BarChart2 className="h-6 w-6 text-white" />;
      break;
    case 'product-management':
      modeLabel = 'Product Management';
      modeIcon = <Briefcase className="h-6 w-6 text-white" />;
      break;
    default:
      modeLabel = 'Interview';
      modeIcon = null;
  }

  return (
    <div className="w-full max-w-6xl mx-auto mb-8">
      <Card className="relative border-none shadow-xl ring-1 ring-slate-200 rounded-xl overflow-hidden">
        <CardHeader className="bg-gradient-to-tr from-blue-700 to-cyan-300 text-white p-6">
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
          <div className="flex justify-between items-start flex-col md:flex-row md:items-center md:space-y-0 space-y-4 mb-6">
            <motion.p
              key={displayedQuestion}
              initial={{ opacity: 0, filter: 'blur(26px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, filter: 'blur(16px)' }}
              transition={{ duration: 0.8 }}
              className="text-lg md:text-xl leading-relaxed text-slate-800 max-w-4xl md:mr-8"
            >
              {displayedQuestion}
            </motion.p>

            <div className="flex gap-2 flex-shrink-0">
              <Button variant="outline" onClick={handleNewQuestionClick}>
                Try Another Question
              </Button>
              <Button variant="outline" onClick={onChangeMode}>
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
            <p className="text-sm text-green-600 font-medium mt-1">
              Copied to clipboard!
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
