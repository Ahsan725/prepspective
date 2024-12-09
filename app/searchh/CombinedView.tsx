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
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]); // Badge filters
  const [selectedRole, setSelectedRole] = useState<string>(''); // Role level filter

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;

  const handleMobileRedirect = (id: number) => {
    if (isMobile) {
      router.push(`/interview/search/${id}`);
    } else {
      handleViewDetails(id);
    }
  };

  const handleRoleChange = (role: string) => {
    setSelectedRole(role); // Update the selected role
    setSelectedFilters([]); // Reset badge filters
  };

  const filteredResults = useMemo(() => {
    if (!results) return [];

    return results.filter((result) => {
      const normalizedQuery = query.toLowerCase();

      // Match query (search)
      const queryMatch =
        result.company.toLowerCase().includes(normalizedQuery) ||
        result.questions.some((question) =>
          question.question.toLowerCase().includes(normalizedQuery)
        );

      // Match role level (dropdown)
      const roleMatch =
        !selectedRole || result.level.toLowerCase() === selectedRole.toLowerCase();

      // Match badge filters (e.g., LeetCode)
      const filtersMatch =
        selectedFilters.length === 0 ||
        selectedFilters.every((filter) => {
          const normalizedFilter = filter.toLowerCase();

          // Match job offer status
          if (
            (result.jobOffer ? 'offer' : 'no offer').toLowerCase() ===
            normalizedFilter
          )
            return true;

// Match LeetCode badge filter
if (
  filter.toLowerCase() === 'leetcode' &&
    result.questions.some((question) => question.leetcodeLink)
  ) {
    return true;
  }
  

          // Match round types (e.g., system design)
          if (
            result.rounds.some(
              (round) => round.roundType.toLowerCase() === normalizedFilter
            )
          )
            return true;

          return false;
        });

      // Combine search, role, and badge filters
      return queryMatch && roleMatch && filtersMatch;
    });
  }, [results, query, selectedFilters, selectedRole]);

  return (
    <div className="flex flex-col h-screen">
      {/* Header Section */}
      <Header
        query={query}
        setQuery={setQuery}
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
        selectedRole={selectedRole} // Pass the selected role
        onRoleChange={handleRoleChange} // Pass role change handler
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
