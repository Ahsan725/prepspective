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
    if (selectedFilters.length === 0) return results; // No filters applied
  
    return results.filter((result) => {
      // Check if any selected filter matches the result's properties
      const filtersMatch = selectedFilters.some((filter) => {
        const normalizedFilter = filter.toLowerCase(); // Normalize the filter to lowercase
  
        // Check interview level
        if (result.level.toLowerCase() === normalizedFilter) return true;
  
        // Check job offer
        if ((result.jobOffer ? 'offer' : 'no offer') === normalizedFilter) return true;
  
        // Check question types
        if (
          result.questions.some((question) => question.type.toLowerCase() === normalizedFilter)
        )
          return true;
  
        // Check for LeetCode filter
        if (
          normalizedFilter === 'leetcode' &&
          result.questions.some((question) => question.leetcodeLink)
        )
          return true;
  
        return false;
      });
  
      return filtersMatch;
    });
  }, [results, selectedFilters]);
  
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
