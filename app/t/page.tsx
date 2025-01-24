"use client"

import React, { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { CheckCircle, AlertCircle, Loader2, Mic, XCircle, Star, Code, Users } from 'lucide-react'
import { softwareQuestions } from '@/app/ai-practice/data/softwareQuestions'
import { behavioralQuestions } from '@/app/ai-practice/data/behavioralQuestions'
import { motion } from "framer-motion";

// Extend the Window interface to include SpeechRecognition and webkitSpeechRecognition
declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition
    webkitSpeechRecognition: typeof SpeechRecognition
  }
}

// Define the SpeechRecognition class
class SpeechRecognition extends EventTarget {
  continuous: boolean = false
  interimResults: boolean = false
  lang: string = 'en-US'
  onstart: (() => void) | null = null
  onresult: ((event: SpeechRecognitionEvent) => void) | null = null
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null = null
  onend: (() => void) | null = null

  start() {}
  stop() {}
  abort() {}
}

// Define the SpeechRecognitionEvent type
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList
  resultIndex: number
}

// Define the SpeechRecognitionErrorEvent type
interface SpeechRecognitionErrorEvent extends Event {
  error: string
}

// Define the SpeechRecognitionResultList type
interface SpeechRecognitionResultList {
  length: number
  item(index: number): SpeechRecognitionResult
  [index: number]: SpeechRecognitionResult
}

// Define the SpeechRecognitionResult type
interface SpeechRecognitionResult {
  isFinal: boolean
  [index: number]: SpeechRecognitionAlternative
}

// Define the SpeechRecognitionAlternative type
interface SpeechRecognitionAlternative {
  transcript: string
}

interface FeedbackData {
  overallScore: number;
  strengths: string[];
  areasToImprove: string[];
  detailedFeedback: string;
}

const VoiceRecorder: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [approvedTranscript, setApprovedTranscript] = useState('')
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isChecking, setIsChecking] = useState(true)
  const [isSupported, setIsSupported] = useState<boolean | null>(null)
  const [hasMicrophoneAccess, setHasMicrophoneAccess] = useState<boolean | null>(null)
  const [isRequestingMicAccess, setIsRequestingMicAccess] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [timeLeft, setTimeLeft] = useState(60)
  const [isGrading, setIsGrading] = useState(false)
  const [feedback, setFeedback] = useState<FeedbackData | null>(null)
  const [mode, setMode] = useState<'software' | 'behavioral' | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState<string | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const accumulatedTranscript = useRef('') // Ref to accumulate the transcript

  useEffect(() => {
    // Function to check Speech Recognition support
    const checkSupport = () => {
      const SpeechRecognitionConstructor =
        window.SpeechRecognition || window.webkitSpeechRecognition

      if (SpeechRecognitionConstructor) {
        setIsSupported(true)
      } else {
        console.error('Speech recognition is not supported in this browser')
        setIsSupported(false)
      }

      setIsChecking(false)
    }

    // Simulate a 1-second delay for verification
    const timer = setTimeout(checkSupport, 1000)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  // Function to select random question based on mode
  const selectRandomQuestion = (selectedMode: 'software' | 'behavioral') => {
    const questions = selectedMode === 'software' ? softwareQuestions : behavioralQuestions
    const randomIndex = Math.floor(Math.random() * questions.length)
    setCurrentQuestion(questions[randomIndex])
  }

  // Function to handle mode selection
  const handleModeSelect = (selectedMode: 'software' | 'behavioral') => {
    setMode(selectedMode)
    selectRandomQuestion(selectedMode)
    // Reset states
    setTranscript('')
    setApprovedTranscript('')
    setFeedback(null)
  }

  // Function to request microphone access
  const requestMicrophoneAccess = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setError('Your browser does not support microphone access.')
      return
    }

    setIsRequestingMicAccess(true)
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true })
      setHasMicrophoneAccess(true)
      setError(null)
    } catch (err) {
      console.error('Microphone access denied:', err)
      setHasMicrophoneAccess(false)
      setError('Microphone access is required to use the Voice Recorder.')
    } finally {
      setIsRequestingMicAccess(false)
    }
  }

  const initializeRecognition = () => {
    const SpeechRecognitionConstructor =
      window.SpeechRecognition || window.webkitSpeechRecognition

    if (SpeechRecognitionConstructor && hasMicrophoneAccess) {
      const recog = new SpeechRecognitionConstructor()
      recog.continuous = true // Continue recording even if there are pauses
      recog.interimResults = false // Disable interim results
      recog.lang = 'en-US'

      recog.onstart = () => {
        console.log('Speech recognition started')
        setIsRecording(true)
        setIsListening(true)
        setError(null)
        setTimeLeft(60)

        // Start the countdown timer
        timerRef.current = setInterval(() => {
          setTimeLeft((prev) => {
            if (prev <= 1) {
              stopRecording()
              return 0
            }
            return prev - 1
          })
        }, 1000)
      }

      recog.onresult = (event: SpeechRecognitionEvent) => {
        let newFinalTranscript = ''

        // Loop through the results and accumulate the transcript
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            newFinalTranscript += event.results[i][0].transcript + ' '
          }
        }

        // Update the transcript state by appending new results
        setTranscript((prevTranscript) => prevTranscript + newFinalTranscript)
        accumulatedTranscript.current += newFinalTranscript // Update the ref
      }

      recog.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error('Speech recognition error detected: ' + event.error)
        setError(`Error: ${event.error}`)
        setIsRecording(false)
        setIsListening(false)
        if (timerRef.current) clearInterval(timerRef.current)
      }

      recog.onend = () => {
        console.log('Speech recognition ended')
        setIsRecording(false)
        setIsListening(false)
        if (timerRef.current) clearInterval(timerRef.current)
      }

      setRecognition(recog)
    }
  }

  useEffect(() => {
    if (hasMicrophoneAccess) {
      initializeRecognition()
    }

    return () => {
      if (recognition) {
        recognition.abort()
        setRecognition(null)
      }
      if (timerRef.current) clearInterval(timerRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasMicrophoneAccess])

  const startRecording = () => {
    if (recognition) {
      accumulatedTranscript.current = '' // Reset the accumulated transcript
      setTranscript('') // Clear the transcript state
      try {
        recognition.start()
      } catch (err) {
        console.error('Failed to start recognition:', err)
        setError('Failed to start recognition.')
      }
    }
  }

  const stopRecording = () => {
    if (recognition) {
      recognition.stop()
    }
  }

  const handleTranscriptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTranscript(e.target.value)
  }

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
    } catch (error) {
      console.error('Error grading interview:', error);
      setError('Failed to grade interview. Please try again.');
    } finally {
      setIsGrading(false);
    }
  };

  const approveTranscript = () => {
    setApprovedTranscript(transcript)
    setTranscript('')
    setFeedback(null) // Reset feedback when new transcript is approved
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      {/* Bento Grid Layout */}
      <div className="grid grid-cols-12 gap-4 h-full">
        {/* Mode Selection */}
        {!mode && (
          <div className="col-span-12">
            <Card className="shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Select Interview Mode</CardTitle>
                <CardDescription>Choose the type of interview questions you want to practice</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center gap-4">
                <Button
                  onClick={() => handleModeSelect('software')}
                  className="flex items-center gap-2 px-6 py-4"
                  size="lg"
                >
                  <Code className="h-5 w-5" />
                  Software Engineering
                </Button>
                <Button
                  onClick={() => handleModeSelect('behavioral')}
                  className="flex items-center gap-2 px-6 py-4"
                  size="lg"
                >
                  <Users className="h-5 w-5" />
                  Behavioral
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Current Question */}
        {mode && currentQuestion && (
          <div className="col-span-12 md:col-span-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  {mode === 'software' ? <Code className="h-5 w-5" /> : <Users className="h-5 w-5" />}
                  Current Question
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-medium text-gray-800">{currentQuestion}</p>
                <div className="mt-4 flex justify-end">
                  <Button
                    variant="outline"
                    onClick={() => selectRandomQuestion(mode)}
                    className="text-sm"
                  >
                    Try Another Question
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Recording Section - Centered */}
        <div className="col-span-12 md:col-span-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Mic className="h-5 w-5" />
                Voice Recorder
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Recording UI */}
              <div className="flex flex-col items-center justify-center space-y-4">
                <motion.div
                  className="relative"
                  animate={{ scale: isRecording ? 1.1 : 1 }}
                  transition={{ repeat: isRecording ? Number.POSITIVE_INFINITY : 0, duration: 1 }}
                >
                  <div
                    className={`h-32 w-32 rounded-full bg-indigo-100 p-8 transition-all duration-300 ${
                      isRecording ? "animate-pulse bg-red-100" : ""
                    }`}
                  >
                    <Mic
                      className={`h-full w-full transition-transform duration-300 ${
                        isRecording ? "text-red-500" : "text-indigo-700"
                      }`}
                    />
                  </div>
                  {isRecording && <div className="absolute inset-0 animate-ping rounded-full bg-red-400/20" />}
                </motion.div>
                <Button
                  size="lg"
                  variant={isRecording ? "destructive" : "default"}
                  onClick={isRecording ? stopRecording : startRecording}
                  className={isRecording ? "" : "bg-indigo-700 hover:bg-indigo-800"}
                >
                  {isRecording ? "Stop Recording" : "Start Recording"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Feedback Section */}
        {feedback && (
          <div className="col-span-12 md:col-span-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Feedback
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Feedback Content */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Overall Score</span>
                    <span className="text-lg font-bold">{feedback.overallScore}/10</span>
                  </div>
                  <Progress value={feedback.overallScore * 10} className="h-2" />
                  <div>
                    <h3 className="font-semibold text-green-600 mb-2">Strengths</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {feedback.strengths.map((strength, index) => (
                        <li key={index} className="text-gray-700">{strength}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-amber-600 mb-2">Areas to Improve</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {feedback.areasToImprove.map((area, index) => (
                        <li key={index} className="text-gray-700">{area}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-indigo-600 mb-2">Detailed Feedback</h3>
                    <p className="text-gray-700 whitespace-pre-wrap">{feedback.detailedFeedback}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

export default VoiceRecorder