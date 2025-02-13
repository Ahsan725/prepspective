import React from 'react';
import { AlertCircle, CheckCircle, Loader2 } from 'lucide-react';

interface BrowserSupportProps {
  isChecking: boolean;
  isSupported: boolean | null;
}

export const BrowserSupport: React.FC<BrowserSupportProps> = ({
  isChecking,
  isSupported,
}) => {
  return (
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
  );
};