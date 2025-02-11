import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, Loader2, Mic, XCircle } from 'lucide-react';

interface MicrophoneAccessProps {
  isSupported: boolean | null;
  hasMicrophoneAccess: boolean | null;
  isRequestingMicAccess: boolean;
  onRequestAccess: () => void;
}

export const MicrophoneAccess: React.FC<MicrophoneAccessProps> = ({
  isSupported,
  hasMicrophoneAccess,
  isRequestingMicAccess,
  onRequestAccess,
}) => {
  if (!isSupported) return null;

  return (
    <div className="flex-1">
      {hasMicrophoneAccess === null && (
        <Button
          onClick={onRequestAccess}
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

      {hasMicrophoneAccess && (
        <div className="flex items-center justify-center space-x-2 bg-emerald-100 border border-emerald-400 text-emerald-700 px-4 py-2 rounded-lg shadow-md">
          <CheckCircle className="h-6 w-6" />
          <span>Microphone access granted.</span>
        </div>
      )}

      {hasMicrophoneAccess === false && (
        <div className="flex items-center justify-center space-x-2 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-lg shadow-md">
          <XCircle className="h-6 w-6" />
          <span>Microphone access denied.</span>
        </div>
      )}
    </div>
  );
};