// Updated VoiceRecorder component with premium look and feel
import React, { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Loader2, Mic } from 'lucide-react';

interface VoiceRecorderProps {
  isRecording: boolean;
  isListening: boolean;
  timeLeft: number;
  transcript: string;
  hasMicrophoneAccess: boolean | null;
  isSupported: boolean | null;
  isChecking: boolean;
  error: string | null;
  onStartRecording: () => void;
  onStopRecording: () => void;
  onTranscriptChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onApproveTranscript: () => void;
}

export const VoiceRecorder: React.FC<VoiceRecorderProps> = ({
  isRecording,
  isListening,
  timeLeft,
  transcript,
  hasMicrophoneAccess,
  isSupported,
  isChecking,
  error,
  onStartRecording,
  onStopRecording,
  onTranscriptChange,
  onApproveTranscript,
}) => {
  const [showTranscript, setShowTranscript] = useState(false);
  const MAX_TIME = 60;
  const [timer, setTimer] = useState<number>(MAX_TIME);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRecording) {
      setTimer(MAX_TIME);
      intervalRef.current = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current!);
            onStopRecording();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current!);
  }, [isRecording]);

  useEffect(() => {
    if (!isRecording && transcript) {
      onApproveTranscript();
    }
  }, [isRecording, transcript, onApproveTranscript]);

  return (
    <Card className="rounded-xl border-none bg-white shadow-xl ring-1 ring-slate-200">
      <CardHeader className="bg-gradient-to-tr from-indigo-600 to-purple-600 text-white rounded-t-xl p-6">
        <CardTitle className="text-2xl font-bold flex items-center gap-2">
          <Mic className="h-6 w-6" />
          Step 1. Record your Response
        </CardTitle>
        <CardDescription className="text-indigo-100 text-sm font-medium mt-1">
          Read the question properly. Record your interview response (max {MAX_TIME} seconds)
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          {isListening && (
            <div className="flex items-center gap-2 font-semibold text-rose-600">
              <span className="relative flex h-5 w-5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-5 w-5 bg-red-500"></span>
              </span>
              <span>Recording in progress</span>
            </div>
          )}
          {isRecording && (
            <span className="text-sm text-slate-600 font-medium">{timer}s remaining</span>
          )}
        </div>

        {hasMicrophoneAccess && (
          <div className="flex justify-center">
            <Button
              size="lg"
              onClick={isRecording ? onStopRecording : onStartRecording}
              disabled={!isSupported || isChecking}
              className={`transition-all duration-200 text-white text-base font-semibold px-6 py-3 ${
                isRecording ? 'bg-red-600 hover:bg-red-700' : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
            >
              {isRecording ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Stop Recording
                </>
              ) : (
                <>
                  <Mic className="h-5 w-5 mr-2" />
                  Start Recording
                </>
              )}
            </Button>
          </div>
        )}

        {/* Transcript toggle */}
        {/* <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="toggle-transcript"
            checked={showTranscript}
            onChange={(e) => setShowTranscript(e.target.checked)}
          />
          <label htmlFor="toggle-transcript" className="text-sm text-slate-700">
            Edit transcript
          </label>
        </div> */}

        {showTranscript && (
          <div className="space-y-3">
            <textarea
              id="transcript"
              value={transcript}
              onChange={onTranscriptChange}
              className="w-full resize-none border border-slate-300 rounded-md p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Your transcript will appear here..."
              rows={4}
            />
            <div className="flex justify-end">
              <Button onClick={onApproveTranscript} className="bg-indigo-600 text-white hover:bg-indigo-700">
                Save Transcript
              </Button>
            </div>
          </div>
        )}

        {error && (
          <div className="text-center text-sm text-red-600 font-medium">
            {error}
          </div>
        )}
      </CardContent>
    </Card>
  );
};