import React from 'react';
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
  return (
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
              <span className="font-medium">{timeLeft}s remaining</span>
            </div>
          )}
        </div>

        {/* Start/Stop Button */}
        {hasMicrophoneAccess && (
          <Button
            variant={isRecording ? 'destructive' : 'default'}
            onClick={isRecording ? onStopRecording : onStartRecording}
            disabled={!isSupported || isChecking}
            className="p-6 px-8 text-lg"
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
        )}

        {/* Transcript */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="transcript" className="text-sm font-medium text-gray-700">
            Transcript:
          </label>
          <textarea
            id="transcript"
            value={transcript}
            onChange={onTranscriptChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Your transcript will appear here..."
            rows={4}
            disabled={!transcript && !isRecording}
          />
          {transcript && (
            <Button
              onClick={onApproveTranscript}
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
  );
};