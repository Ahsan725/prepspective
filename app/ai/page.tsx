// Refactored /app/ai/page.tsx using a modern grid layout for a sleek, premium look
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

  const [feedbackForm, setFeedbackForm] = useState({ name: '', message: '' });
  const [feedbackResult, setFeedbackResult] = useState('');
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);
  const [gradeCount, setGradeCount] = useState(0);
  const [hasSubmittedFeedback, setHasSubmittedFeedback] = useState(false);

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
  const maxUsage = 3;

  useEffect(() => {
    const storedCount = localStorage.getItem('aiUsageCount');
    const parsedCount = storedCount ? parseInt(storedCount, 10) : 0;
    setUsageCount(parsedCount);
  }, []);  

  const handleGradeInterview = async () => {
    if (usageCount >= maxUsage) {
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

  const handleTranscriptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setTranscript(e.target.value);
  const handleApproveTranscript = () => { setApprovedTranscript(transcript); setTranscript(''); };
  const handleChangeMode = () => setMode(null);
  const handleNewQuestion = () => { if (mode) { selectRandomQuestion(mode); setFeedback(null); } };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-screen-2xl mx-auto">
        <div className="lg:col-span-4 space-y-4">
          <Statistics practiceCount={practiceCount} averageScore={averageScore} />
          <InterviewTips showTips={showTips} onToggleTips={() => setShowTips(!showTips)} />
          <InterviewHistory showHistory={showHistory} sessions={sessions} onToggleHistory={() => setShowHistory(!showHistory)} />
        </div>

        <div className="lg:col-span-8 space-y-6">
          <div className="flex justify-end">
            {maxUsage - usageCount > 0 ? (
              <div className="text-sm font-bold text-indigo-600 bg-indigo-100 px-4 py-1 rounded-full border border-indigo-400">
                AI Credits: {maxUsage - usageCount} remaining
              </div>
            ) : (
              <div className="text-sm font-bold text-red-600 bg-red-100 px-4 py-1 rounded-full border border-red-400">
                AI Credits: 0 remaining
              </div>
            )}
          </div>

          {!mode && <ModeSelection onModeSelect={handleModeSelect} />}

          {mode && currentQuestion && (
            <CurrentQuestion
              mode={mode}
              question={currentQuestion}
              onNewQuestion={handleNewQuestion}
              onChangeMode={handleChangeMode}
            />
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <BrowserSupport isChecking={isChecking} isSupported={isSupported} />
            <MicrophoneAccess
              isSupported={isSupported}
              hasMicrophoneAccess={hasMicrophoneAccess}
              isRequestingMicAccess={isRequestingMicAccess}
              onRequestAccess={requestMicrophoneAccess}
            />
          </div>

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
              <Input id="name" value={feedbackForm.name} onChange={(e) => setFeedbackForm(f => ({ ...f, name: e.target.value }))} />
            </div>
            <div>
              <label htmlFor="message" className="text-sm font-semibold">Feedback</label>
              <Textarea id="message" required value={feedbackForm.message} onChange={(e) => setFeedbackForm(f => ({ ...f, message: e.target.value }))} />
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