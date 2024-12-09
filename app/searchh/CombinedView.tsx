'use client';

import React from 'react';
import { useCombinedViewData } from './useCombinedViewData';
import { useRouter } from 'next/navigation';
import Header from './components/Header';
import JobList from './components/JobList';
import JobDetails from './components/JobDetails';

const CombinedView: React.FC = () => {
  const {
    results,
    filteredResults,
    query,
    setQuery,
    loading,
    selectedInterviewId,
    interview,
    handleViewDetails,
  } = useCombinedViewData();

  const router = useRouter();

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;

  const handleMobileRedirect = (id: number) => {
    if (isMobile) {
      router.push(`/interview/search/${id}`);
    } else {
      handleViewDetails(id);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header Section */}
      <Header query={query} setQuery={setQuery} />

      {/* Main Content Section */}
      <div className="flex flex-col lg:flex-row gap-4 p-6 h-full">
        {/* Job List (Left Column) */}
        <JobList
          results={results}
          filteredResults={filteredResults}
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
