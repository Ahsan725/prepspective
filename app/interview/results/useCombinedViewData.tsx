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
  createdAt: string;
  updatedAt: string;
  overallExperience: string;
  jobOffer: boolean | null;
  questions: Question[];
  ratings: Rating[];
  rounds: Round[];
};

export const useCombinedViewData = () => {
  const [results, setResults] = useState<Interview[]>([]);
  const [filteredResults, setFilteredResults] = useState<Interview[]>([]);
  const [query, setQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const [selectedInterviewId, setSelectedInterviewId] = useState<number | null>(null);
  const [interview, setInterview] = useState<Interview | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('company');

  // Fetch all results  s
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

  // Filter results dynamically based on the query
  useEffect(() => {
    if (query.trim() === '') {
      setFilteredResults(results);
    } else {
      const lowerCaseQuery = query.toLowerCase();
      const filtered = results.filter((r) =>
        r.company.toLowerCase().includes(lowerCaseQuery)
      );
      setFilteredResults(filtered);
    }
  }, [query, results]);

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
  };
};
