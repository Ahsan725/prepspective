// Speech Recognition Types
export interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

export interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

export interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

export interface SpeechRecognitionResult {
  isFinal: boolean;
  [index: number]: SpeechRecognitionAlternative;
}

export interface SpeechRecognitionAlternative {
  transcript: string;
}

// Application Types
export interface FeedbackData {
  overallScore: number;
  strengths: string[];
  areasToImprove: string[];
  detailedFeedback: string;
}

export interface InterviewSession {
  id: string;
  date: string;
  mode: 'software' | 'behavioral';
  question: string;
  transcript: string;
  feedback: FeedbackData;
}

export type InterviewMode = 'software' | 'behavioral' | null;