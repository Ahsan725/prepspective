export type Question = {
    id: string;
    type: 'behavioral' | 'technical';
    question: string;
    leetcodeLink?: string;
  };
  
  export type Rating = {
    category: string;
    score: number;
  };
  
  export type Round = {
    id: string;
    roundType: string;
    roundDate: string;
    experience: string;
  };
  
  export type InterviewLevel =
    | "Intern"
    | "New Grad"
    | "Junior Engineer"
    | "Senior Engineer"
    | "Staff Engineer"
    | "Principal Engineer"
    | "Associate"
    | "Engineering Manager";
  
  export type FormData = {
    company: string;
    interviewDate: string;
    level: InterviewLevel;
    jobOffer: boolean | null;
    overallExperience: string;
    questions: Question[];
    ratings: Rating[];
    rounds: Round[];
  };