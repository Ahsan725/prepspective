'use client'
import React, { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { 
  CheckCircle, 
  AlertCircle, 
  Loader2, 
  Mic, 
  XCircle, 
  Star, 
  Code, 
  Users,
  Save,
  History,
  RefreshCw,
  BookOpen,
  Timer,
  Award
} from 'lucide-react'
import { softwareQuestions } from './data/softwareQuestions'
import { behavioralQuestions } from './data/behavioralQuestions'

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

interface InterviewSession {
  id: string;
  date: string;
  mode: 'software' | 'behavioral';
  question: string;
  transcript: string;
  feedback: FeedbackData;
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
  const [sessions, setSessions] = useState<InterviewSession[]>([])
  const [showHistory, setShowHistory] = useState(false)
  const [practiceCount, setPracticeCount] = useState(0)
  const [averageScore, setAverageScore] = useState(0)
  const [showTips, setShowTips] = useState(false)
  const [countdownStarted, setCountdownStarted] = useState(false)
  const [countdown, setCountdown] = useState(3)
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

  // Load practice statistics on mount
  useEffect(() => {
    const savedSessions = localStorage.getItem('interviewSessions')
    if (savedSessions) {
      const parsedSessions = JSON.parse(savedSessions)
      setSessions(parsedSessions)
      setPracticeCount(parsedSessions.length)
      
      const totalScore = parsedSessions.reduce((acc: number, session: InterviewSession) => 
        acc + session.feedback.overallScore, 0)
      setAverageScore(totalScore / parsedSessions.length)
    }
  }, [])

  // Save session after feedback
  useEffect(() => {
    if (feedback && approvedTranscript && currentQuestion && mode) {
      const newSession: InterviewSession = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        mode,
        question: currentQuestion,
        transcript: approvedTranscript,
        feedback
      }
      
      const updatedSessions = [...sessions, newSession]
      setSessions(updatedSessions)
      localStorage.setItem('interviewSessions', JSON.stringify(updatedSessions))
      setPracticeCount(updatedSessions.length)
      
      const totalScore = updatedSessions.reduce((acc, session) => 
        acc + session.feedback.overallScore, 0)
      setAverageScore(totalScore / updatedSessions.length)
    }
  }, [feedback])

  // Countdown timer for recording preparation
  useEffect(() => {
    if (countdownStarted && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else if (countdownStarted && countdown === 0) {
      setCountdownStarted(false)
      setCountdown(3)
      startRecording()
    }
  }, [countdown, countdownStarted])

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

  const handleStartRecording = () => {
    setCountdownStarted(true)
  }

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
    <div className="min-h-screen flex flex-col p-4 bg-gray-50">
      {/* Header with Statistics */}
      <div className="w-full max-w-6xl mx-auto mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-lg font-semibold">Practice Sessions</p>
                <p className="text-3xl font-bold">{practiceCount}</p>
              </div>
              <Award className="h-12 w-12 opacity-80" />
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-lg font-semibold">Average Score</p>
                <p className="text-3xl font-bold">{averageScore.toFixed(1)}/10</p>
              </div>
              <Star className="h-12 w-12 opacity-80" />
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-red-600 text-white">
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-lg font-semibold">Time Practiced</p>
                <p className="text-3xl font-bold">{practiceCount * 60}s</p>
              </div>
              <Timer className="h-12 w-12 opacity-80" />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Tips Button */}
      <div className="w-full max-w-6xl mx-auto mb-4">
        <Button
          variant="outline"
          onClick={() => setShowTips(!showTips)}
          className="flex items-center gap-2"
        >
          <BookOpen className="h-4 w-4" />
          {showTips ? 'Hide Tips' : 'Show Interview Tips'}
        </Button>
        
        {showTips && (
          <Card className="mt-4 bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Quick Interview Tips</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <div className="mt-1 flex-shrink-0">•</div>
                  <p>Structure your answers using the STAR method (Situation, Task, Action, Result)</p>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 flex-shrink-0">•</div>
                  <p>Speak clearly and at a moderate pace</p>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 flex-shrink-0">•</div>
                  <p>Use specific examples to support your points</p>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 flex-shrink-0">•</div>
                  <p>Keep your answers focused and relevant to the question</p>
                </li>
              </ul>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Mode Selection */}
      {!mode && (
        <div className="w-full max-w-4xl mx-auto mb-8">
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

      {/* Current Question Display */}
      {mode && currentQuestion && (
        <div className="w-full max-w-4xl mx-auto mb-8">
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

      {/* Support and Microphone Access Banner */}
      <div className="w-full max-w-4xl mx-auto mb-4 flex flex-col md:flex-row md:space-x-4">
        {/* Support Banner */}
        <div className="flex-1 mb-4 md:mb-0" role="alert">
          <div
            className={`flex items-center text-sm px-4 py-2 font-semibold rounded-lg shadow-md ${
              isSupported
                ? 'bg-indigo-100 border border-indigo-400 text-indigo-700'
                : 'bg-red-100 border border-red-400 text-red-700'
            }`}
          >
            {isChecking ? (
              <>
                <Loader2 className="h-6 w-6 animate-spin text-indigo-600 mr-2" />
                <span>Verifying browser compatibility...</span>
              </>
            ) : isSupported ? (
              <>
                <CheckCircle className="h-6 w-6 mr-2" />
                <span>Speech recognition is supported in this browser.</span>
              </>
            ) : (
              <>
                <AlertCircle className="h-6 w-6 mr-2" />
                <span>⚠️ Speech recognition is not supported. Please use a supported browser like Chrome.</span>
              </>
            )}
          </div>
        </div>

        {/* Microphone Access Section */}
        {isSupported && (
          <div className="flex-1">
            {hasMicrophoneAccess === null && !isChecking && (
              <Button
                onClick={requestMicrophoneAccess}
                disabled={isRequestingMicAccess}
                className="w-full flex items-center justify-center"
                aria-label="Allow Microphone Access"
              >
                {isRequestingMicAccess ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Allowing Microphone Access...
                  </>
                ) : (
                  <>
                    <Mic className="h-5 w-5 mr-2" />
                    Allow Microphone Access
                  </>
                )}
              </Button>
            )}

            {/* Confirmation of Microphone Access */}
            {hasMicrophoneAccess && (
              <div className="flex items-center justify-center space-x-2 bg-emerald-100 border border-emerald-400 text-emerald-700 px-4 py-2 rounded-lg shadow-md">
                <CheckCircle className="h-6 w-6" />
                <span>Microphone access granted.</span>
              </div>
            )}

            {/* Denied Microphone Access */}
            {hasMicrophoneAccess === false && (
              <div className="flex items-center justify-center space-x-2 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-lg shadow-md">
                <XCircle className="h-6 w-6" />
                <span>Microphone access denied.</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Main Content */}
      {mode && (
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Voice Recorder Card */}
          <Card className="shadow-lg">
            <CardHeader className="border-b bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-t-lg">
              <CardTitle className="text-2xl flex items-center">
                <Mic className="h-6 w-6 mr-2" />
                Voice Recorder
              </CardTitle>
              <CardDescription className="text-gray-100">
                Record your interview response
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              {/* Countdown Display */}
              {countdownStarted && (
                <div className="flex justify-center items-center h-24">
                  <span className="text-6xl font-bold text-indigo-600 animate-pulse">
                    {countdown}
                  </span>
                </div>
              )}

              {/* Recording Status */}
              <div className="flex items-center justify-between">
                {isListening && (
                  <div className="flex items-center space-x-2 text-indigo-600">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    <span className="font-medium">Recording in progress...</span>
                  </div>
                )}
                {isRecording && (
                  <div className="flex items-center space-x-2">
                    <Timer className="h-5 w-5 text-gray-600" />
                    <span className="font-medium">{timeLeft}s remaining</span>
                  </div>
                )}
              </div>

              {/* Start/Stop Button */}
              {hasMicrophoneAccess && (
                <Button
                  variant={isRecording ? 'destructive' : 'default'}
                  onClick={isRecording ? stopRecording : handleStartRecording}
                  disabled={!isSupported || isChecking || countdownStarted}
                  className="w-full h-12 text-lg"
                >
                  {isRecording ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Stop Recording
                    </>
                  ) : countdownStarted ? (
                    'Preparing to record...'
                  ) : (
                    <>
                      <Mic className="h-5 w-5 mr-2" />
                      Start Recording
                    </>
                  )}
                </Button>
              )}

              {/* Editable Transcript */}
              <div className="flex flex-col space-y-2">
                <label htmlFor="transcript" className="text-sm font-medium text-gray-700">
                  Transcript:
                </label>
                <textarea
                  id="transcript"
                  value={transcript}
                  onChange={handleTranscriptChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Your transcript will appear here..."
                  rows={4}
                  disabled={!transcript && !isRecording}
                />
                {transcript && (
                  <Button
                    onClick={approveTranscript}
                    disabled={!transcript}
                    className="self-end mt-2"
                  >
                    Approve
                  </Button>
                )}
              </div>

              {/* Error Message */}
              {error && (
                <div className="text-red-500 text-center">
                  {error}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Feedback Card */}
          <div className="space-y-6">
            {/* Approved Transcript Card */}
            <Card className="shadow-lg">
              <CardHeader className="border-b">
                <CardTitle className="text-2xl flex items-center">
                  <CheckCircle className="h-6 w-6 mr-2 text-emerald-600" />
                  Approved Transcript
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Your approved transcription
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="bg-white p-4 rounded-lg border border-gray-100">
                  <p className="text-gray-800 whitespace-pre-wrap">
                    {approvedTranscript || 'No approved transcript yet.'}
                  </p>
                </div>
                {approvedTranscript && !isGrading && !feedback && (
                  <Button 
                    onClick={gradeInterview}
                    className="w-full mt-4"
                  >
                    Grade Interview
                  </Button>
                )}
                {isGrading && (
                  <div className="flex items-center justify-center space-x-2 mt-4">
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
                      <span className="text-lg font-bold">{feedback.overallScore}/10</span>
                    </div>
                    <Progress value={feedback.overallScore * 10} className="h-2" />
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
        </div>
      )}

      {/* Interview History */}
      <div className="w-full max-w-6xl mx-auto mt-8">
        <Button
          variant="outline"
          onClick={() => setShowHistory(!showHistory)}
          className="flex items-center gap-2 mb-4"
        >
          <History className="h-4 w-4" />
          {showHistory ? 'Hide History' : 'Show Interview History'}
        </Button>
        
        {showHistory && (
          <div className="space-y-4">
            {sessions.map((session) => (
              <Card key={session.id} className="shadow-sm">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">
                        {session.mode === 'software' ? 'Software Engineering' : 'Behavioral'} Interview
                      </CardTitle>
                      <CardDescription>
                        {new Date(session.date).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-indigo-600">
                        {session.feedback.overallScore}/10
                      </span>
                    </div>
                   </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="font-medium">Question:</p>
                    <p className="text-gray-600">{session.question}</p>
                    <p className="font-medium mt-4">Your Response:</p>
                    <p className="text-gray-600">{session.transcript}</p>
                  </div>
                </CardContent>
                <CardFooter className="bg-gray-50">
                  <div className="w-full">
                    <p className="font-medium text-sm text-gray-600">Key Feedback:</p>
                    <p className="text-sm mt-1">{session.feedback.detailedFeedback}</p>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default VoiceRecorder