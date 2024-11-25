'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type SearchFilters = {
  company?: string;
  startDate?: string;
  endDate?: string;
  sort?: 'asc' | 'desc';
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
  const [query, setQuery] = useState<string>('');
  const [debouncedQuery, setDebouncedQuery] = useState<string>('');
  const router = useRouter();

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300); // Adjust delay as needed
    return () => clearTimeout(handler);
  }, [query]);

  const fetchResults = async () => {
    if (!debouncedQuery && !searchFilters.startDate && !searchFilters.endDate) {
      setResults([]); // Show no results when there's no input
      return;
    }
  
    setLoading(true);
    try {
      const params = new URLSearchParams({
        ...searchFilters,
        company: debouncedQuery || '',
      } as Record<string, string>);
  
      const res = await fetch(`/api/interviews?${params.toString()}`);
      const data = await res.json();
  
      // Only show results that match the query
      const filteredData = data.filter((item: Interview) =>
        (!debouncedQuery || item.company.toLowerCase().includes(debouncedQuery.toLowerCase())) &&
        (!searchFilters.startDate || item.interviewDate >= searchFilters.startDate) &&
        (!searchFilters.endDate || item.interviewDate <= searchFilters.endDate)
      );
  
      setResults(filteredData);
    } catch (error) {
      console.error('Error fetching results:', error);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchResults();
  }, [debouncedQuery, searchFilters]);

  const handleViewDetails = (id: number) => {
    router.push(`/interview/results/${id}`);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchFilters({ ...searchFilters, sort: e.target.value as 'asc' | 'desc' });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Search Interviews</h1>
      <div className="space-y-4 mb-6">
        <input
          type="text"
          placeholder="Search by company"
          className="w-full p-2 border rounded"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
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
        <select
          className="w-full p-2 border rounded"
          onChange={handleSortChange}
        >
          <option value="">Sort by Date</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : results.length > 0 ? (
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
      ) : (
        <div>No results found</div>
      )}
    </div>
  );
};

export default ResultsPage;
