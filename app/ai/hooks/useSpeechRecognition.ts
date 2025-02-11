import { useEffect, useRef, useState } from 'react';

export const useSpeechRecognition = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(true);
  const [isSupported, setIsSupported] = useState<boolean | null>(null);
  const [hasMicrophoneAccess, setHasMicrophoneAccess] = useState<boolean | null>(null);
  const [isRequestingMicAccess, setIsRequestingMicAccess] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const accumulatedTranscript = useRef('');

  useEffect(() => {
    const checkSupport = () => {
      const SpeechRecognitionConstructor =
        window.SpeechRecognition || window.webkitSpeechRecognition;

      if (SpeechRecognitionConstructor) {
        setIsSupported(true);
      } else {
        console.error('Speech recognition is not supported in this browser');
        setIsSupported(false);
      }

      setIsChecking(false);
    };

    const timer = setTimeout(checkSupport, 1000);
    return () => clearTimeout(timer);
  }, []);

  const requestMicrophoneAccess = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setError('Your browser does not support microphone access.');
      return;
    }

    setIsRequestingMicAccess(true);
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setHasMicrophoneAccess(true);
      setError(null);
    } catch (err) {
      console.error('Microphone access denied:', err);
      setHasMicrophoneAccess(false);
      setError('Microphone access is required to use the Voice Recorder.');
    } finally {
      setIsRequestingMicAccess(false);
    }
  };

  const initializeRecognition = () => {
    const SpeechRecognitionConstructor =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognitionConstructor && hasMicrophoneAccess) {
      const recog = new SpeechRecognitionConstructor();
      recog.continuous = true;
      recog.interimResults = false;
      recog.lang = 'en-US';

      recog.onstart = () => {
        setIsRecording(true);
        setIsListening(true);
        setError(null);
        setTimeLeft(60);

        timerRef.current = setInterval(() => {
          setTimeLeft((prev) => {
            if (prev <= 1) {
              stopRecording();
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      };

      recog.onresult = (event: any) => {
        let newFinalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            newFinalTranscript += event.results[i][0].transcript + ' ';
          }
        }
        setTranscript((prev) => prev + newFinalTranscript);
        accumulatedTranscript.current += newFinalTranscript;
      };

      recog.onerror = (event: any) => {
        console.error('Speech recognition error detected: ' + event.error);
        setError(`Error: ${event.error}`);
        setIsRecording(false);
        setIsListening(false);
        if (timerRef.current) clearInterval(timerRef.current);
      };

      recog.onend = () => {
        setIsRecording(false);
        setIsListening(false);
        if (timerRef.current) clearInterval(timerRef.current);
      };

      setRecognition(recog);
    }
  };

  useEffect(() => {
    if (hasMicrophoneAccess) {
      initializeRecognition();
    }

    return () => {
      if (recognition) {
        recognition.abort();
        setRecognition(null);
      }
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [hasMicrophoneAccess]);

  const startRecording = () => {
    if (recognition) {
      accumulatedTranscript.current = '';
      setTranscript('');
      try {
        recognition.start();
      } catch (err) {
        console.error('Failed to start recognition:', err);
        setError('Failed to start recognition.');
      }
    }
  };

  const stopRecording = () => {
    if (recognition) {
      recognition.stop();
    }
  };

  return {
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
  };
};