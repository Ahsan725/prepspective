'use client';

import React, { useState, useMemo } from 'react';
import { useCombinedViewData } from './useCombinedViewData';
import { useRouter } from 'next/navigation';
import Header from './components/Header';
import JobList from './components/JobList';
import JobDetails from './components/JobDetails';

const CombinedView: React.FC = () => {
  const {
    results,
    query,
    setQuery,
    loading,
    selectedInterviewId,
    interview,
    handleViewDetails,
  } = useCombinedViewData();

  const router = useRouter();
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]); // Manage filters state

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;

  const handleMobileRedirect = (id: number) => {
    if (isMobile) {
      router.push(`/interview/search/${id}`);
    } else {
      handleViewDetails(id);
    }
  };

  const filteredResults = useMemo(() => {
    if (!results) return [];
  
    return results.filter((result) => {
      const normalizedQuery = query.toLowerCase();
  
      // Check if the query matches the company name or any question
      const queryMatch =
        result.company.toLowerCase().includes(normalizedQuery) ||
        result.questions.some((question) =>
          question.question.toLowerCase().includes(normalizedQuery)
        );
  
      // Check if any selected filter matches
      const filtersMatch = selectedFilters.some((filter) => {
        const normalizedFilter = filter.toLowerCase();
  
        // Match interview level
        if (result.level.toLowerCase() === normalizedFilter) return true;
  
        // Match job offer
        if ((result.jobOffer ? "offer" : "no offer") === normalizedFilter) return true;
  
        // Match question types
        if (result.questions.some((question) => question.type.toLowerCase() === normalizedFilter))
          return true;
  
        // Match round types
        if (result.rounds.some((round) => round.roundType.toLowerCase() === normalizedFilter))
          return true;
  
        return false;
      });
  
      // Combine query and filter matches
      return queryMatch && (selectedFilters.length === 0 || filtersMatch);
    });
  }, [results, query, selectedFilters]);
  
  return (
    <div className="flex flex-col h-screen">
      {/* Header Section */}
      <Header
        query={query}
        setQuery={setQuery}
        selectedFilters={selectedFilters} // Pass selectedFilters
        setSelectedFilters={setSelectedFilters} // Pass setSelectedFilters
      />

      {/* Main Content Section */}
      <div className="flex flex-col lg:flex-row gap-4 p-6 h-full">
        {/* Job List (Left Column) */}
        <JobList
          results={results}
          filteredResults={filteredResults} // Pass filtered results
          loading={loading}
          selectedInterviewId={selectedInterviewId}
          handleMobileRedirect={handleMobileRedirect}
        />

        {/* Job Details (Right Column) */}
        <JobDetails selectedInterviewId={selectedInterviewId} interview={interview} />
      </div>
    </div>
  );
};

export default CombinedView;
