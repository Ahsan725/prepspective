"use client";

import { useState } from "react";
import type React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CodeSnippet } from "./codesnippet";
import { questions, Question } from "./questions";
import { motion } from "framer-motion";

import {
  CheckCircle2,
  Code,
  Database,
  Hash,
  HelpCircle,
  LayoutGrid,
  Server,
  XCircle,
  GitMerge,
  BarChart3,
  Layers,
  Repeat,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { RadarChart } from "./radar-chart";

const dataStructureIcons: Record<string, React.ReactNode> = {
  array: <LayoutGrid className="h-5 w-5" />,
  "hash-table": <Hash className="h-5 w-5" />,
  "linked-list": <Database className="h-5 w-5" />,
  tree: <GitMerge className="h-5 w-5" />,
  graph: <Server className="h-5 w-5" />,
  heap: <Layers className="h-5 w-5" />,
  stack: <BarChart3 className="h-5 w-5" />,
  queue: <Repeat className="h-5 w-5" />,
  default: <HelpCircle className="h-5 w-5" />,
};

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState<{ [key: string]: number }>({});
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const currentQ = questions[currentQuestion];
  const isCorrect = selectedAnswer === currentQ.correctAnswer;

  const handleAnswer = (optionIndex: number) => {
    setSelectedAnswer(optionIndex);
  };

  const handleNext = () => {
    if (selectedAnswer !== null) {
      setShowFeedback(true);

      if (selectedAnswer === currentQ.correctAnswer) {
        setScore((prev) => ({
          ...prev,
          [currentQ.dataStructure]: (prev[currentQ.dataStructure] || 0) + 1,
        }));
      }

      setTimeout(() => {
        setShowFeedback(false);
        setSelectedAnswer(null);

        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion((prev) => prev + 1);
        } else {
          setShowResults(true);
        }
      }, 1000);
    }
  };

  const calculateResults = () => {
    const results: { [key: string]: number } = {};
    const counts: { [key: string]: number } = {};

    questions.forEach((q) => {
      counts[q.dataStructure] = (counts[q.dataStructure] || 0) + 1;
    });

    Object.keys(counts).forEach((ds) => {
      results[ds] = ((score[ds] || 0) / counts[ds]) * 100;
    });

    return results;
  };

  const getIcon = (dataStructure: string) => {
    return dataStructureIcons[dataStructure] || dataStructureIcons.default;
  };

  // Analysis text based on the score percentage
  const getAnalysisText = (score: number): JSX.Element => {
    if (score < 40) {
      return (
        <>
          Performance is <span className="text-rose-500 font-semibold">below expectations</span> for technical interviews. Focus on foundational easy questions. Consider targeted LeetCode tutoring for accelerated improvement.
          <br /><br />
          <a href="/tutor" className="text-blue-500 underline">LeetCode Tutoring</a>
        </>
      );
    } else if (score < 70) {
      return (
        <>
          <span className="text-orange-400 font-semibold">Moderate performance</span>. Enhance your skills with medium-difficulty problems. Simulate real interview pressure with a mock interview session.
          <br /><br />
          <a href="/mock-interviews" className="text-blue-500 underline">Mock Interviews</a>
        </>
      );
    } else {
      return (
        <>
          <span className="text-emerald-500 font-semibold">Excellent performance</span>! Challenge yourself with hard questions to maintain momentum. If interviews are not yielding results, a resume revamp could be beneficial.
          <br /><br />
          <a href="/resume" className="text-blue-500 underline">Resume Revamp</a>
        </>
      );
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore({});
    setSelectedAnswer(null);
    setShowResults(false);
    setShowFeedback(false);
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-24 py-8">
      {/* Animated Page Heading */}
      <motion.div
        className="flex items-center justify-center mb-4"
        initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5 } }}
      >
        <h2 className="inline-block font-extrabold text-xs sm:text-xs md:text-sm lg:text-md text-indigo-700 text-center tracking-wider bg-indigo-200 rounded-md px-2 py-0">
          TECHNICAL SKIL SCAN
        </h2>
      </motion.div>

      <motion.h2
        className="text-3xl md:text-4xl text-center font-bold mb-4"
        initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5, delay: 0.2 } }}
      >
        Find Your Weak Spots
      </motion.h2>

      <motion.h3
        className="md:w-4/5 mx-auto text-center mb-6 font-light text-gray-500 lg:mb-0 md:text-lg lg:text-xl dark:text-gray-400"
        initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5, delay: 0.4 } }}
      >
        Understand exactly where you need to improve. This diagnostic tool pinpoints your specific data structure knowledge gaps, enabling targeted technical interview preparation and more effective learning.
      </motion.h3>

      {/* Conditional Rendering of Quiz or Results */}
      {showResults ? (
        <Card className="overflow-hidden border-0 shadow-lg mb-8 mt-8">
          <CardHeader className="bg-gradient-to-br from-indigo-800 to-indigo-500 text-white">
            <CardTitle className="text-2xl font-bold">Your Results</CardTitle>
            <CardDescription className="text-white/80 text-xl text-right">
                          Skill Scan Score:  <span className="font-extrabold text-3xl text-white">
  {Math.round(
    (Object.values(score).reduce((sum, val) => sum + val, 0) / questions.length) *
      1000 +
      Math.floor(Math.random() * 49) +
      1
  )}
</span>
                          {/* (
              {Object.values(score).reduce((sum, val) => sum + val, 0)} of {questions.length} correct) */}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center mb-8">
              <div className="w-full max-w-md h-80">
                <RadarChart
                  data={Object.entries(calculateResults()).map(([name, value]) => ({
                    subject: name.charAt(0).toUpperCase() + name.slice(1).replace("-", " "),
                    score: value,
                    fullMark: 100,
                  }))}
                />
              </div>
              <p className="text-sm mt-2">Your proficiency across different data structures</p>
            </div>
            {/* Grid of DS results with analysis */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(calculateResults()).map(([ds, score]) => (
                <div key={ds} className="p-4 border-none bg-slate-50 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    {getIcon(ds)}
                    <span className="font-medium capitalize">{ds.replace("-", " ")}</span>
                  </div>
                  <div className="text-lg font-bold text-indigo-700">{Math.round(score)}%</div>
                  <div className="text-sm mt-2 text-gray-700">{getAnalysisText(score)}</div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="px-6 py-4 flex justify-end">
            <Button onClick={restartQuiz}>Restart Quiz</Button>
          </CardFooter>
        </Card>
      ) : (
        <Card className="overflow-hidden border-0 shadow-none transition-all duration-300">
          <CardHeader>
            <div className="flex justify-center gap-2">
              {getIcon(currentQ.dataStructure)}
              <Badge variant="secondary" className="capitalize bg-indigo-500 text-white">
                {currentQ.dataStructure.replace("-", " ")}
              </Badge>
            </div>
            <CardTitle className="text-2xl mt-0 text-center pt-0 font-light">{currentQ.question}</CardTitle>
          </CardHeader>

          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left side: Options */}
              <div className="md:col-span-1 space-y-6">
                <div className="space-y-3">
                  {currentQ.options.map((option, index) => (
                    <button
  key={index}
  onClick={() => handleAnswer(index)}
  className={cn(
    "w-full text-left px-4 py-3 rounded-lg border-2 transition-all duration-200 flex items-center",
    selectedAnswer === index ? "bg-indigo-100 border-indigo-500" : "border-indigo-200 hover:border-indigo-300"
  )}
>
  <div className="flex-1">{option}</div>
</button>

                  ))}
                </div>
              </div>

              {/* Right side: Code snippet */}
              {currentQ.codeSnippet && (
                <div className="hidden md:block md:col-span-2">
                  <div className="sticky top-4">
                    <CodeSnippet code={currentQ.codeSnippet} />
                  </div>
                </div>
              )}
            </div>
          </CardContent>

          <CardFooter className="px-6 py-4 flex justify-between">
            <div className="text-sm text-indigo-700">Select an answer to continue</div>
            <Button onClick={handleNext} disabled={selectedAnswer === null || showFeedback} className="px-6 shadow-none hover:shadow-none">
              {currentQuestion === questions.length - 1 ? "Finish Quiz" : "Next Question"}
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
