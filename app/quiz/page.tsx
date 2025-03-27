"use client";

import { useState } from "react";
import type React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CodeSnippet } from "../skillscan/codesnippet";
import { motion } from "framer-motion";
import {
  Database,
  Hash,
  HelpCircle,
  LayoutGrid,
  Server,
  GitMerge,
  BarChart3,
  Layers,
  Repeat,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { RadarChart } from "../skillscan/radar-chart";

// Define icons for topics. For topics not in this mapping, the default icon is used.
const topicIcons: Record<string, React.ReactNode> = {
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

// Define the Question type (note that "topic" is used in place of "dataStructure")
interface Question {
  id: number;
  question: string;
  codeSnippet: string;
  options: string[];
  correctAnswer: number;
  topic: string;
}

export default function QuizPage() {
  // Local states for quiz data and UI control
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<string>("datastructures");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState<{ [key: string]: number }>({});
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [loading, setLoading] = useState(false);

  // Function to fetch quiz data when user clicks "Start Quiz"
  async function fetchQuizData() {
    setLoading(true);
    try {
      const res = await fetch(`/api/quiz?topic=${encodeURIComponent(selectedTopic)}`);
      if (!res.ok) {
        throw new Error("Failed to fetch quiz data");
      }
      const data = await res.json();
      setQuestions(data);
      setCurrentQuestion(0);
      setScore({});
      setSelectedAnswer(null);
      setShowResults(false);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }

  // Trigger API call on button click
  const handleStartQuiz = () => {
    fetchQuizData();
  };

  const currentQ = questions[currentQuestion];

  const handleAnswer = (optionIndex: number) => {
    setSelectedAnswer(optionIndex);
  };

  const handleNext = () => {
    if (selectedAnswer !== null && currentQ) {
      setShowFeedback(true);
      if (selectedAnswer === currentQ.correctAnswer) {
        setScore((prev) => ({
          ...prev,
          [currentQ.topic]: (prev[currentQ.topic] || 0) + 1,
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

  // Calculate percentage results for each topic in the quiz.
  const calculateResults = () => {
    const results: { [key: string]: number } = {};
    const counts: { [key: string]: number } = {};
    questions.forEach((q) => {
      counts[q.topic] = (counts[q.topic] || 0) + 1;
    });
    Object.keys(counts).forEach((topic) => {
      results[topic] = ((score[topic] || 0) / counts[topic]) * 100;
    });
    return results;
  };

  const getIcon = (topic: string) => {
    return topicIcons[topic] || topicIcons.default;
  };

  // Analysis text based on score percentage.
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
          <span className="text-emerald-500 font-semibold">Great performance</span>! Challenge yourself with hard questions to maintain momentum. If interviews are not yielding results, a resume revamp could be beneficial.
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
    <div className="max-w-screen-2xl mx-auto px-4 md:px-24 py-8">
      {/* If no quiz data yet, show topic selector and Start Quiz button */}
      {questions.length === 0 && (
        <div className="mb-8">
          <div className="mb-4">
            <label htmlFor="topic" className="block text-sm font-medium text-gray-700">
              Select Topic
            </label>
            <select
              id="topic"
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="datastructures">Data Structures</option>
              <option value="time complexity">Time Complexity</option>
              <option value="problem solving">Problem Solving</option>
            </select>
          </div>
          <Button onClick={handleStartQuiz} disabled={loading}>
            {loading ? "Loading Quiz..." : "Start Quiz"}
          </Button>
        </div>
      )}

      {/* Loading state */}
      {loading && questions.length === 0 && (
        <div className="text-center">
          <p>Loading quiz...</p>
        </div>
      )}

      {/* Quiz Content */}
      {!loading && questions.length > 0 && !showResults && currentQ && (
        <Card className="overflow-hidden border-0 shadow-none transition-all duration-300">
          <CardHeader>
            <div className="flex justify-center gap-2">
              {getIcon(currentQ.topic)}
              <Badge variant="secondary" className="capitalize bg-indigo-500 text-white">
                {currentQ.topic.replace("-", " ")}
              </Badge>
            </div>
            <motion.div
              key={currentQ.question}
              initial={{ opacity: 0, filter: "blur(26px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(16px)" }}
              transition={{ duration: 0.8 }}
            >
              <CardTitle className="md:text-2xl text-xl mt-0 text-center pt-0 font-light">
                {currentQ.question}
              </CardTitle>
            </motion.div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Options */}
              <div className="md:col-span-1 space-y-6">
                <div className="space-y-3">
                  {currentQ.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(index)}
                      className={cn(
                        "w-full text-left px-4 py-3 rounded-lg border-2 transition-all duration-200 flex items-center",
                        selectedAnswer === index
                          ? "bg-indigo-100 border-indigo-500"
                          : "border-indigo-200 hover:border-indigo-300"
                      )}
                    >
                      <div className="flex-1">{option}</div>
                    </button>
                  ))}
                </div>
              </div>
              {/* Code snippet */}
              {currentQ.codeSnippet && (
                <div className="md:col-span-2">
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

      {/* Quiz Results */}
      {showResults && (
        <Card className="overflow-hidden border-0 shadow-lg mb-8 mt-8">
          <CardHeader className="bg-gradient-to-br from-indigo-800 to-indigo-500 text-white">
            <CardTitle className="text-2xl font-bold">Your Results</CardTitle>
            <CardDescription className="text-white/80 text-xl text-right">
              Skill Scan Score:{" "}
              <span className="font-extrabold text-3xl text-white">
                {Math.round(
                  (Object.values(score).reduce((sum, val) => sum + val, 0) / questions.length) *
                    1000 +
                    Math.floor(Math.random() * 49) +
                    1
                )}
              </span>
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
              <p className="text-sm mt-2">Your proficiency across different topics</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(calculateResults()).map(([topic, score]) => (
                <div key={topic} className="p-4 border-none bg-slate-50 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    {getIcon(topic)}
                    <span className="font-medium capitalize">{topic.replace("-", " ")}</span>
                  </div>
                  <div className="text-sm mt-2 text-gray-700">{getAnalysisText(score)}</div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="px-6 py-4 flex justify-end">
            <Button onClick={restartQuiz}>Restart Quiz</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
