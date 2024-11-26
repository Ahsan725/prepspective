export type Question = {
    id: number;
    interviewId: number;
    type: string;
    question: string;
    leetcodeLink?: string | null;
  };
  
  export type Rating = {
    id: number;
    interviewId: number;
    category: string;
    score: number;
  };
  
  export type Round = {
    id: number;
    interviewId: number;
    roundType: string;
    roundDate: string;
    experience: string;
  };
  
  export type Interview = {
    id: number;
    company: string;
    interviewDate: string;
    createdAt: string;
    updatedAt: string;
    overallExperience: string;
    jobOffer: boolean | null; // Includes Pending
    questions: Question[];
    ratings: Rating[];
    rounds: Round[];
  };
  