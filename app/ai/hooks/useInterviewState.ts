import { useState, useEffect } from 'react';
import { InterviewMode, InterviewSession, FeedbackData } from '../types';
import { softwareQuestions } from '../data/softwareQuestions';
import { behavioralQuestions } from '../data/behavioralQuestions';

export const useInterviewState = () => {
  const [mode, setMode] = useState<InterviewMode>(null);
  const [currentQuestion, setCurrentQuestion] = useState<string | null>(null);
  const [approvedTranscript, setApprovedTranscript] = useState('');
  const [isGrading, setIsGrading] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackData | null>(null);
  const [sessions, setSessions] = useState<InterviewSession[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [practiceCount, setPracticeCount] = useState(0);
  const [averageScore, setAverageScore] = useState(0);
  const [showTips, setShowTips] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [countdownStarted, setCountdownStarted] = useState(false);

  useEffect(() => {
    const savedSessions = localStorage.getItem('interviewSessions');
    if (savedSessions) {
      const parsedSessions = JSON.parse(savedSessions);
      setSessions(parsedSessions);
      setPracticeCount(parsedSessions.length);
      
      const totalScore = parsedSessions.reduce((acc: number, session: InterviewSession) => 
        acc + session.feedback.overallScore, 0);
      setAverageScore(totalScore / parsedSessions.length);
    }
  }, []);

  useEffect(() => {
    if (countdownStarted && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown, countdownStarted]);

  const selectRandomQuestion = (selectedMode: Exclude<InterviewMode, null>) => {
    const questions = selectedMode === 'software' ? softwareQuestions : behavioralQuestions;
    const randomIndex = Math.floor(Math.random() * questions.length);
    setCurrentQuestion(questions[randomIndex]);
  };

  const handleModeSelect = (selectedMode: Exclude<InterviewMode, null>) => {
    setMode(selectedMode);
    selectRandomQuestion(selectedMode);
    setApprovedTranscript('');
    setFeedback(null);
  };

  const gradeInterview = async () => {
    if (!approvedTranscript || !currentQuestion) return;
    
    setIsGrading(true);
    try {
      const response = await fetch('/api/grade-interview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          transcript: approvedTranscript,
          question: currentQuestion,
          mode: mode
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to grade interview');
      }

      const feedbackData = await response.json();
      setFeedback(feedbackData);

      // Save session after feedback
      if (mode && currentQuestion) {
        const newSession: InterviewSession = {
          id: Date.now().toString(),
          date: new Date().toISOString(),
          mode,
          question: currentQuestion,
          transcript: approvedTranscript,
          feedback: feedbackData
        };
        
        const updatedSessions = [...sessions, newSession];
        setSessions(updatedSessions);
        localStorage.setItem('interviewSessions', JSON.stringify(updatedSessions));
        setPracticeCount(updatedSessions.length);
        
        const totalScore = updatedSessions.reduce((acc, session) => 
          acc + session.feedback.overallScore, 0);
        setAverageScore(totalScore / updatedSessions.length);
      }
    } catch (error) {
      console.error('Error grading interview:', error);
    } finally {
      setIsGrading(false);
    }
  };

  return {
    mode,
    currentQuestion,
    approvedTranscript,
    isGrading,
    feedback,
    sessions,
    showHistory,
    practiceCount,
    averageScore,
    showTips,
    countdown,
    countdownStarted,
    setMode,
    setCurrentQuestion,
    setApprovedTranscript,
    setShowHistory,
    setShowTips,
    setCountdownStarted,
    setCountdown,
    setFeedback,
    selectRandomQuestion,
    handleModeSelect,
    gradeInterview,
  };
};