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

const App: React.FC = () => {
  // Speech recognition state from hook
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

  // Interview state from hook (assumes useInterviewState exposes setMode)
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
    setMode, // used to reset the mode
  } = useInterviewState();

  // New state to track AI feature usage (max 2 times per session for demo purposes)
  const [usageCount, setUsageCount] = useState<number>(0);
  const maxUsage = 2;

  // Load initial usage count from sessionStorage
  useEffect(() => {
    const storedCount = sessionStorage.getItem('aiUsageCount');
    if (storedCount) {
      setUsageCount(parseInt(storedCount, 10));
    }
  }, []);

  // Wrap the gradeInterview function to track usage and disable after maxUsage.
  const handleGradeInterview = async () => {
    if (usageCount >= maxUsage) {
      alert('You have reached the maximum usage of the AI feature for this session.');
      return;
    }
    await gradeInterview();
    const newCount = usageCount + 1;
    setUsageCount(newCount);
    sessionStorage.setItem('aiUsageCount', newCount.toString());
  };

  const handleTranscriptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTranscript(e.target.value);
  };

  const handleApproveTranscript = () => {
    setApprovedTranscript(transcript);
    setTranscript('');
  };

  // New function to reset the interview mode, showing the mode selection screen again.
  const handleChangeMode = () => {
    // Reset the mode to null so that ModeSelection is shown.
    setMode(null);
  };

  return (
    <div className="min-h-screen p-4 bg-gray-50">
      <Statistics 
        practiceCount={practiceCount}
        averageScore={averageScore}
          />
                    {/* Display running total of AI feature usage as a centered badge */}
                    <div className="mt-4 flex justify-center">
              <div className="text-center text-sm font-extrabold text-indigo-500 bg-indigo-200 px-4 py-2 rounded-full border-2 border-indigo-500">
                  
              AI Credits: {maxUsage - usageCount} remaining
            </div>
          </div>

      <InterviewTips
        showTips={showTips}
        onToggleTips={() => setShowTips(!showTips)}
      />

      {!mode && (
        <ModeSelection onModeSelect={handleModeSelect} />
      )}

      {mode && currentQuestion && (
        <CurrentQuestion
          mode={mode}
          question={currentQuestion}
          onNewQuestion={() => selectRandomQuestion(mode)}
          onChangeMode={handleChangeMode}
        />
      )}

      <div className="w-full max-w-4xl mx-auto mb-4 flex flex-col md:flex-row md:space-x-4">
        <BrowserSupport
          isChecking={isChecking}
          isSupported={isSupported}
        />
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

          {/* Notice when the limit is reached */}
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
    </div>
  );
};

export default App;
