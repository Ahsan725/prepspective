import { useState, useEffect } from 'react';

type Question = {
  id: number;
  interviewId: number;
  type: string;
  question: string;
  leetcodeLink?: string | null;
};

type Rating = {
  id: number;
  interviewId: number;
  category: string;
  score: number;
};

type Round = {
  id: number;
  interviewId: number;
  roundType: string;
  roundDate: string;
  experience: string;
};

type Interview = {
  id: number;
  company: string;
  interviewDate: string;
  level: string;
  createdAt: string;
  updatedAt: string;
  overallExperience: string;
  jobOffer: boolean | null;
  questions: Question[];
  ratings: Rating[];
  rounds: Round[];
};

const levelOptions = [
  "Intern",
  "New Grad",
  "Junior Engineer",
  "Senior Engineer",
  "Staff Engineer",
  "Principal Engineer",
  "Associate",
  "Engineering Manager"
];

export const useCombinedViewData = () => {
  const [results, setResults] = useState<Interview[]>([]);
  const [filteredResults, setFilteredResults] = useState<Interview[]>([]);
  const [query, setQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedBadges, setSelectedBadges] = useState<string[]>([]); // Allow multiple badges

  const [selectedInterviewId, setSelectedInterviewId] = useState<number | null>(null);
  const [interview, setInterview] = useState<Interview | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('company');

  // Fetch all results
  const fetchResults = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/interviews`);
      const data: Interview[] = await res.json();
      const sortedData = data.sort(
        (a, b) => new Date(b.interviewDate).getTime() - new Date(a.interviewDate).getTime()
      );
      setResults(sortedData);
      setFilteredResults(sortedData);
    } catch (err) {
      console.error('Error fetching results:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  // Filter results dynamically based on the query and selected badges
  useEffect(() => {
    let filtered = results;

    if (query.trim()) {
      const lowerCaseQuery = query.toLowerCase();
      filtered = filtered.filter((r) =>
        r.company.toLowerCase().includes(lowerCaseQuery)
      );
    }

    if (selectedBadges.length > 0) {
      filtered = filtered.filter((r) => {
        return selectedBadges.every((badge) => {
          if (badge === 'LeetCode') {
            return r.questions.some((q) => q.leetcodeLink);
          }
          if (badge === 'System Design') {
            return r.rounds.some((round) =>
              round.roundType.toLowerCase().includes('system design')
            );
          }
          if (badge === 'Pre Screen') {
            return r.rounds.some((round) =>
              round.roundType.toLowerCase().includes('pre screen')
            );
          }
          if (badge === 'OA') {
            return r.rounds.some((round) =>
              round.roundType.toLowerCase().includes('oa')
            );
          }
          if (badge === 'Behavioral') {
            return r.questions.some(
              (q) => q.type.toLowerCase() === 'behavioral'
            );
          }
          if (badge === 'Technical') {
            return r.questions.some(
              (q) => q.type.toLowerCase() === 'technical'
            );
          }
          // New logic for filtering by level
          if (levelOptions.includes(badge)) {
            return r.level === badge;
          }
          return false;
        });
      });
    }

    setFilteredResults(filtered);
  }, [query, results, selectedBadges]);

  // Fetch interview details
  const fetchInterview = async (id: number) => {
    setError(null);
    setInterview(null);
    try {
      const res = await fetch(`/api/interviews/${id}`);
      if (!res.ok) throw new Error('Failed to fetch interview details');
      const data: Interview = await res.json();
      setInterview(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    }
  };

  const handleViewDetails = (id: number) => {
    setSelectedInterviewId(id);
    fetchInterview(id);
  };

  return {
    results,
    filteredResults,
    query,
    setQuery,
    loading,
    selectedInterviewId,
    setSelectedInterviewId,
    interview,
    error,
    activeTab,
    setActiveTab,
    handleViewDetails,
    selectedBadges,
    setSelectedBadges,
    levelOptions, // Add this to make it available in the component
  };
};

