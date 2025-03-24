'use client';

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

  const [feedbackForm, setFeedbackForm] = useState({
    name: '',
    message: '',
  });
  const [feedbackResult, setFeedbackResult] = useState('');
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);
  const [gradeCount, setGradeCount] = useState(0);
  const [hasSubmittedFeedback, setHasSubmittedFeedback] = useState(false);

  const FEEDBACK_TRIGGER_THRESHOLD = 1; // Change this to 5, 10, etc. to delay feedback modal

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
  const maxUsage = 3;

  useEffect(() => {
    const storedCount = sessionStorage.getItem('aiUsageCount');
    const parsedCount = storedCount ? parseInt(storedCount, 10) : 0;
    setUsageCount(parsedCount);
  }, []);

  const handleGradeInterview = async () => {
    if (usageCount >= maxUsage) {
      alert('You have reached the maximum usage of the AI feature for this session.');
      return;
    }

    // Check if feedback is required after a certain number of uses
    if (gradeCount >= FEEDBACK_TRIGGER_THRESHOLD && !hasSubmittedFeedback) {
      setIsFeedbackRequired(true);
      return;
    }

    await gradeInterview();

    const newCount = usageCount + 1;
    setUsageCount(newCount);
    sessionStorage.setItem('aiUsageCount', newCount.toString());

    setGradeCount((prev) => prev + 1);
  };

  const handleTranscriptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTranscript(e.target.value);
  };

  const handleApproveTranscript = () => {
    setApprovedTranscript(transcript);
    setTranscript('');
  };

  const handleChangeMode = () => {
    setMode(null);
  };

  const handleNewQuestion = () => {
    if (mode) {
      selectRandomQuestion(mode);
      setFeedback(null);
    }
  };

  return (
    <div className="min-h-screen p-4 bg-gray-50">
      <Statistics practiceCount={practiceCount} averageScore={averageScore} />

      <div className="mt-4 flex justify-center">
        <div className="text-center text-sm font-extrabold text-indigo-500 bg-indigo-200 px-4 py-2 rounded-full border-2 border-indigo-500">
          AI Credits: {maxUsage - usageCount} remaining
        </div>
      </div>

      <InterviewTips showTips={showTips} onToggleTips={() => setShowTips(!showTips)} />

      {!mode && <ModeSelection onModeSelect={handleModeSelect} />}

      {mode && currentQuestion && (
        <CurrentQuestion
          mode={mode}
          question={currentQuestion}
          onNewQuestion={handleNewQuestion}
          onChangeMode={handleChangeMode}
        />
      )}

      <div className="w-full max-w-4xl mx-auto mb-4 flex flex-col md:flex-row md:space-x-4">
        <BrowserSupport isChecking={isChecking} isSupported={isSupported} />
        <MicrophoneAccess
          isSupported={isSupported}
          hasMicrophoneAccess={hasMicrophoneAccess}
          isRequestingMicAccess={isRequestingMicAccess}
          onRequestAccess={requestMicrophoneAccess}
        />
      </div>

      {mode && (
        <div className="w-full max-w-6xl mx-auto">
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

          {usageCount >= maxUsage && (
            <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
              You have reached the maximum usage of the AI feature for this session.
            </div>
          )}
        </div>
      )}

      <InterviewHistory
        showHistory={showHistory}
        sessions={sessions}
        onToggleHistory={() => setShowHistory(!showHistory)}
      />

      <Dialog open={isFeedbackRequired} onOpenChange={() => setIsFeedbackRequired(false)}>
        <DialogContent>
          <DialogHeader>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-extrabold text-indigo-700">
                {'{P}rep'}<span className="font-bold text-indigo-700 text-2xl">Spective</span>
              </span>
            </div>
            <DialogTitle>Feedback is required to continue using this feature</DialogTitle>
            <DialogDescription>
              Please let us know how the experience has been so far.
            </DialogDescription>
          </DialogHeader>
          <form
            className="space-y-4"
            onSubmit={async (e) => {
              e.preventDefault();
              setIsSubmittingFeedback(true);
              setFeedbackResult('Sending...');

              const formDataToSend = new FormData();
              formDataToSend.append('access_key', '89b85a1d-9630-4362-85b2-76ff6fc9f6ee');
              if (feedbackForm.name) formDataToSend.append('name', feedbackForm.name);
              formDataToSend.append('message', feedbackForm.message);

              try {
                const res = await fetch('https://api.web3forms.com/submit', {
                  method: 'POST',
                  body: formDataToSend,
                });

                const data = await res.json();

                if (data.success) {
                  toast({
                    title: 'Thanks for your feedback!',
                    description: 'We really appreciate it 😊',
                  });
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
              <label htmlFor="name" className="text-sm font-semibold text-gray-700">
                Name (optional)
              </label>
              <Input
                id="name"
                name="name"
                value={feedbackForm.name}
                onChange={(e) => setFeedbackForm((f) => ({ ...f, name: e.target.value }))}
              />
            </div>
            <div>
              <label htmlFor="message" className="text-sm font-semibold text-gray-700">
                Feedback
              </label>
              <Textarea
                id="message"
                name="message"
                value={feedbackForm.message}
                onChange={(e) => setFeedbackForm((f) => ({ ...f, message: e.target.value }))}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isSubmittingFeedback}>
              {isSubmittingFeedback ? 'Submitting...' : 'Submit Feedback'}
            </Button>
            <span className="text-sm text-gray-600">{feedbackResult}</span>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default App;
