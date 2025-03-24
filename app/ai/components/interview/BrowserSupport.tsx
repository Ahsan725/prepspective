'use client';
import React, { useEffect, useState } from 'react';
import { AlertCircle, CheckCircle, Loader2 } from 'lucide-react';

interface BrowserSupportProps {
  isChecking: boolean;
  isSupported: boolean | null;
}

export const BrowserSupport: React.FC<BrowserSupportProps> = ({
  isChecking,
  isSupported,
}) => {
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (!isChecking) {
      const delay = setTimeout(() => setShowResult(true), 2000); // Extend delay here (2000ms)
      return () => clearTimeout(delay);
    }
  }, [isChecking]);

  const baseClasses = `flex items-center text-sm px-4 py-2 font-semibold rounded-lg shadow-md transition-all duration-300`;

  return (
    <div className="flex-1 mb-4 md:mb-0 text-center" role="alert">
      <div
        className={`${baseClasses} ${
          isChecking || !showResult
            ? 'bg-indigo-50 border border-indigo-300 text-indigo-700'
            : isSupported
            ? 'bg-emerald-100 border border-emerald-400 text-emerald-700'
            : 'bg-red-100 border border-red-400 text-red-700'
        }`}
      >
        {isChecking || !showResult ? (
          <>
            <Loader2 className="h-6 w-6 animate-spin text-indigo-600 mr-2" />
            <span className="animate-pulse">Verifying browser compatibility...</span>
          </>
        ) : isSupported ? (
          <>
            <CheckCircle className="h-6 w-6 mr-2" />
            <span className="font-bold text-emerald-700">
              Speech recognition is supported.
            </span>
          </>
        ) : (
          <>
            <AlertCircle className="h-6 w-6 mr-2" />
            <span className="font-bold text-red-800">
              ⚠️ Speech recognition is not supported. Please use a supported browser like Chrome.
            </span>
          </>
        )}
      </div>
    </div>
  );
};
