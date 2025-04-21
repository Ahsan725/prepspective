'use client'
import React, { useState, useEffect } from 'react';
import { useSpeechRecognition } from './hooks/useSpeechRecognition';
import { useInterviewState } from './hooks/useInterviewState';
import { Statistics } from './components/interview/Statistics';
import { InterviewTips } from './components/interview/InterviewTips';
import { ModeSelection } from './components/interview/ModeSelection';
import { CurrentQuestion } from './components/interview/CurrentQuestion';
import { BrowserSupport } from './components/interview/BrowserSupport';
import { MicrophoneAccess } from './components/interview/MicrophoneAccess';
import { VoiceRecorder } from './components/interview/VoiceRecorder';
import { FeedbackDisplay } from './components/interview/FeedbackDisplay';
import { InterviewHistory } from './components/interview/InterviewHistory';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import Footer from "@/components/ui/footer";

// Helper to format milliseconds into "D days HH:MM:SS" format
const formatTime = (ms: number) => {
  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / (24 * 3600));
  const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  // return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  return `${days}d ${hours}h ${minutes}m`;
};

const App: React.FC = () => {
  const {
    isRecording,
    transcript,
    error,
    isChecking,
    isSupported,
    hasMicrophoneAccess,
    isRequestingMicAccess,
    isListening,
    timeLeft,
    requestMicrophoneAccess,
    startRecording,
    stopRecording,
    setTranscript,
  } = useSpeechRecognition();

  const [feedbackForm, setFeedbackForm] = useState({ name: '', message: '' });
  const [feedbackResult, setFeedbackResult] = useState('');
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);
  const [gradeCount, setGradeCount] = useState(0);
  const [hasSubmittedFeedback, setHasSubmittedFeedback] = useState(false);

  // Default credit limit is 3.
  const [creditLimit, setCreditLimit] = useState<number>(3);
  const FEEDBACK_TRIGGER_THRESHOLD = 1;

  const {
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
    handleModeSelect,
    selectRandomQuestion,
    setApprovedTranscript,
    setShowHistory,
    setShowTips,
    gradeInterview,
    setMode,
    setFeedback,
  } = useInterviewState();

  const [usageCount, setUsageCount] = useState<number>(0);
  const [isFeedbackRequired, setIsFeedbackRequired] = useState(false);

  // State for referral code feature.
  const [referralCode, setReferralCode] = useState('');
  // referralRedeemed tracks whether a valid referral code has been applied.
  const [referralRedeemed, setReferralRedeemed] = useState(false);

  // New state for credit expiry and countdown timer.
  const [creditsExpiry, setCreditsExpiry] = useState<number>(0);
  const [creditsCountdown, setCreditsCountdown] = useState<string>('');

  // Duration for one cycle in milliseconds (3 days)
  const cycleDuration = 3 * 24 * 60 * 60 * 1000;

  // Function to reset credits for a new cycle.
  const resetCredits = () => {
    setUsageCount(0);
    setCreditLimit(3);
    setReferralRedeemed(false);
    localStorage.removeItem('referralRedeemedTimestamp');
    const newExpiry = Date.now() + cycleDuration;
    setCreditsExpiry(newExpiry);
    localStorage.setItem('creditsExpiry', newExpiry.toString());
    toast({
      title: "More Credits Added",
      description: "More AI credits have been added to your account.",
    });
  };

  // On mount, load persisted data from localStorage and check expiry.
  useEffect(() => {
    // Get usage count.
    const storedCount = localStorage.getItem('aiUsageCount');
    setUsageCount(storedCount ? parseInt(storedCount, 10) : 0);

    // Get credit limit if it was updated earlier.
    const storedCreditLimit = localStorage.getItem('creditLimit');
    if (storedCreditLimit) {
      setCreditLimit(parseInt(storedCreditLimit, 10));
    }

    // Get referral redeemed status.
    const storedReferral = localStorage.getItem('referralRedeemedTimestamp');
    if (storedReferral) {
      const redeemedTime = parseInt(storedReferral, 10);
      // If the referral was redeemed less than 3 days ago, mark it as used.
      if (Date.now() < redeemedTime + cycleDuration) {
        setReferralRedeemed(true);
      } else {
        localStorage.removeItem('referralRedeemedTimestamp');
        setReferralRedeemed(false);
      }
    }

    // Handle credits expiry.
    const storedExpiry = localStorage.getItem('creditsExpiry');
    if (storedExpiry) {
      const expiry = parseInt(storedExpiry, 10);
      if (Date.now() >= expiry) {
        resetCredits();
      } else {
        setCreditsExpiry(expiry);
      }
    } else {
      // Set a new expiry if none exists.
      const newExpiry = Date.now() + cycleDuration;
      localStorage.setItem('creditsExpiry', newExpiry.toString());
      setCreditsExpiry(newExpiry);
    }
  }, []);

  // Set up an interval to update the countdown timer and automatically reset credits when needed.
  useEffect(() => {
    const timer = setInterval(() => {
      if (creditsExpiry) {
        const diff = creditsExpiry - Date.now();
        if (diff <= 0) {
          resetCredits();
        } else {
          setCreditsCountdown(formatTime(diff));
        }
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [creditsExpiry]);

  // Handle referral code submission with a cooldown of 3 days.
  const handleReferralSubmit = () => {
    const validCodes = ['REFCODE1', 'chonks', 'REFCODE3'];
    const storedReferralTimestamp = localStorage.getItem('referralRedeemedTimestamp');
    if (storedReferralTimestamp) {
      // Referral has been redeemed before: calculate the remaining time.
      const referralTime = parseInt(storedReferralTimestamp, 10);
      const timeLeftForReferral = referralTime + cycleDuration - Date.now();
      if (timeLeftForReferral > 0) {
        toast({
          title: "Referral Code Already Used",
          description: `You already applied a referral code. Try again in ${formatTime(timeLeftForReferral)}.`,
        });
        return;
      } else {
        // If expired, clear the old redeemed status.
        localStorage.removeItem('referralRedeemedTimestamp');
        setReferralRedeemed(false);
      }
    }
    
    // Validate the entered referral code.
    if (validCodes.includes(referralCode.trim())) {
      setCreditLimit(10);
      setReferralRedeemed(true);
      localStorage.setItem('creditLimit', '10');
      localStorage.setItem('referralRedeemedTimestamp', Date.now().toString());
      toast({
        title: "Referral Code Accepted!",
        description: "Your AI credits have been increased to 10 for this cycle.",
      });
    } else {
      toast({
        title: "Invalid Referral Code",
        description: "Please enter a valid referral code.",
      });
    }
  };

  const handleGradeInterview = async () => {
    if (usageCount >= creditLimit) {
      alert('You have reached the maximum usage of the AI feature for this session.');
      return;
    }
    if (gradeCount >= FEEDBACK_TRIGGER_THRESHOLD && !hasSubmittedFeedback) {
      setIsFeedbackRequired(true);
      return;
    }
    await gradeInterview();
    const newCount = usageCount + 1;
    setUsageCount(newCount);
    localStorage.setItem('aiUsageCount', newCount.toString());
    setGradeCount((prev) => prev + 1);
  };

  const handleTranscriptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setTranscript(e.target.value);
  const handleApproveTranscript = () => {
    setApprovedTranscript(transcript);
    setTranscript('');
  };
  const handleChangeMode = () => setMode(null);
  const handleNewQuestion = () => {
    if (mode) {
      selectRandomQuestion(mode);
      setFeedback(null);
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-screen-2xl mx-auto">
        {/* Left Sidebar */}
        <div className="lg:col-span-4 space-y-4">
          <Statistics practiceCount={practiceCount} averageScore={averageScore} />
          <div className="flex flex-col gap-2">
            {creditLimit - usageCount > 0 ? (
              <div className="text-sm font-bold text-indigo-600 bg-indigo-100 px-4 py-1 rounded-full border border-indigo-400">
                AI Credits: {creditLimit - usageCount} remaining
              </div>
            ) : (
              <div className="text-sm font-bold text-red-600 bg-red-100 px-4 py-1 rounded-full border border-red-400">
                AI Credits: 0 remaining
              </div>
            )}
            {/* Display Countdown Timer */}
            {creditsCountdown && (
              <div className="text-xs text-gray-600">
                Credits reset in: {creditsCountdown}
              </div>
            )}
            {/* Referral Code Input and Button */}
            <div className="mt-4">
              <Input 
                placeholder="Enter Referral Code"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value)}
              />
              {/* The Button is disabled when referralRedeemed is true. Its wrapper handles clicks to show a toast message. */}
              <div
                onClick={(e) => {
                  if (referralRedeemed) {
                    const storedReferralTimestamp = localStorage.getItem('referralRedeemedTimestamp');
                    if (storedReferralTimestamp) {
                      const referralTime = parseInt(storedReferralTimestamp, 10);
                      const timeLeftForReferral = referralTime + cycleDuration - Date.now();
                      if (timeLeftForReferral > 0) {
                        toast({
                          title: "Referral Code Already Used",
                          description: `Try again in ${formatTime(timeLeftForReferral)}.`,
                        });
                      }
                      e.stopPropagation();
                    }
                  }
                }}
              >
                <Button
                  disabled={referralRedeemed}
                  onClick={handleReferralSubmit}
                  className="mt-2 w-full"
                >
                  {referralRedeemed ? 'Referral Code Applied' : 'Apply Referral Code'}
                </Button>
              </div>
            </div>
          </div>
          <InterviewTips showTips={!showTips} onToggleTips={() => setShowTips(showTips)} />
          <InterviewHistory showHistory={showHistory} sessions={sessions} onToggleHistory={() => setShowHistory(!showHistory)} />
        </div>

        {/* Main Content */}
        <div className="lg:col-span-8 space-y-6">
          {/* Status Checks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <BrowserSupport isChecking={isChecking} isSupported={isSupported} />
            <MicrophoneAccess
              isSupported={isSupported}
              hasMicrophoneAccess={hasMicrophoneAccess}
              isRequestingMicAccess={isRequestingMicAccess}
              onRequestAccess={requestMicrophoneAccess}
            />
          </div>

          {/* Mode Selection */}
          {!mode && <ModeSelection onModeSelect={handleModeSelect} />}

          {/* Question */}
          {mode && currentQuestion && (
            <CurrentQuestion
              mode={mode}
              question={currentQuestion}
              onNewQuestion={handleNewQuestion}
              onChangeMode={handleChangeMode}
            />
          )}

          {/* Voice Recorder + Feedback */}
          {mode && (
            <>
              <VoiceRecorder
                isRecording={isRecording}
                isListening={isListening}
                timeLeft={timeLeft}
                transcript={transcript}
                hasMicrophoneAccess={hasMicrophoneAccess}
                isSupported={isSupported}
                isChecking={isChecking}
                error={error}
                onStartRecording={startRecording}
                onStopRecording={stopRecording}
                onTranscriptChange={handleTranscriptChange}
                onApproveTranscript={handleApproveTranscript}
              />
              <FeedbackDisplay
                approvedTranscript={approvedTranscript}
                isGrading={isGrading}
                feedback={feedback}
                onGrade={handleGradeInterview}
              />
            </>
          )}
        </div>
      </div>

      {/* Feedback Modal */}
      <Dialog open={isFeedbackRequired} onOpenChange={() => setIsFeedbackRequired(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Feedback Required</DialogTitle>
            <DialogDescription>Please let us know how the experience has been so far.</DialogDescription>
          </DialogHeader>
          <form
            className="space-y-4"
            onSubmit={async (e) => {
              e.preventDefault();
              setIsSubmittingFeedback(true);
              setFeedbackResult('Sending...');
              const formData = new FormData();
              formData.append('access_key', '89b85a1d-9630-4362-85b2-76ff6fc9f6ee');
              if (feedbackForm.name) formData.append('name', feedbackForm.name);
              formData.append('message', feedbackForm.message);
              try {
                const res = await fetch('https://api.web3forms.com/submit', {
                  method: 'POST',
                  body: formData,
                });
                const data = await res.json();
                if (data.success) {
                  toast({ title: 'Thanks for your feedback!', description: 'We really appreciate it 😊' });
                  setFeedbackForm({ name: '', message: '' });
                  setFeedbackResult('Submitted!');
                  setIsFeedbackRequired(false);
                  setHasSubmittedFeedback(true);
                } else {
                  setFeedbackResult(data.message);
                }
              } catch (err) {
                setFeedbackResult('An error occurred. Please try again.');
              } finally {
                setIsSubmittingFeedback(false);
              }
            }}
          >
            <div>
              <label htmlFor="name" className="text-sm font-semibold">Name (optional)</label>
              <Input
                id="name"
                value={feedbackForm.name}
                onChange={(e) => setFeedbackForm(f => ({ ...f, name: e.target.value }))}
              />
            </div>
            <div>
              <label htmlFor="message" className="text-sm font-semibold">Feedback</label>
              <Textarea
                id="message"
                required
                value={feedbackForm.message}
                onChange={(e) => setFeedbackForm(f => ({ ...f, message: e.target.value }))}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isSubmittingFeedback}>
              {isSubmittingFeedback ? 'Submitting...' : 'Submit Feedback'}
            </Button>
            <span className="text-sm text-gray-600">{feedbackResult}</span>
          </form>
        </DialogContent>
      </Dialog>
      <Footer/>
    </div>
  );
};

export default App;
