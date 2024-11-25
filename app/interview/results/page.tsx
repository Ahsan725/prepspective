'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type SearchFilters = {
  company?: string;
  startDate?: string;
  endDate?: string;
};

type Interview = {
  id: number;
  company: string;
  interviewDate: string;
  overallExperience: string;
};

const ResultsPage: React.FC = () => {
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({});
  const [results, setResults] = useState<Interview[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const fetchResults = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams(searchFilters as Record<string, string>);
      const res = await fetch(`/api/interviews?${params.toString()}`);
      const data = await res.json();
      setResults(data);
    } catch (error) {
      console.error('Error fetching results:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
  }, [searchFilters]);

  const handleViewDetails = (id: number) => {
    router.push(`/interview/results/${id}`);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Search Interviews</h1>
      <div className="space-y-4 mb-6">
        <input
          type="text"
          placeholder="Search by company"
          className="w-full p-2 border rounded"
          onChange={(e) => setSearchFilters({ ...searchFilters, company: e.target.value })}
        />
        <input
          type="date"
          placeholder="Start Date"
          className="w-full p-2 border rounded"
          onChange={(e) => setSearchFilters({ ...searchFilters, startDate: e.target.value })}
        />
        <input
          type="date"
          placeholder="End Date"
          className="w-full p-2 border rounded"
          onChange={(e) => setSearchFilters({ ...searchFilters, endDate: e.target.value })}
        />
        <button
          className="p-2 bg-blue-500 text-white rounded"
          onClick={fetchResults}
        >
          Search
        </button>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <ul className="space-y-4">
          {results.map((result) => (
            <li
              key={result.id}
              className="p-4 border rounded cursor-pointer hover:bg-gray-100"
              onClick={() => handleViewDetails(result.id)}
            >
              <div className="font-bold">{result.company}</div>
              <div>{result.interviewDate}</div>
              <div>{result.overallExperience}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ResultsPage;
