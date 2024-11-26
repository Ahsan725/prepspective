import React from 'react';
import { Badge } from '@/components/ui/badge';
import Loader from '@/components/ui/loader';
import { Interview } from '../types';

type SearchResultsProps = {
  results: Interview[];
  query: string;
  setQuery: (query: string) => void;
  loading: boolean;
  loadMore: () => void;
  hasMore: boolean;
  handleViewDetails: (id: number) => void;
  selectedInterviewId: number | null;
};

const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  query,
  setQuery,
  loading,
  loadMore,
  hasMore,
  handleViewDetails,
  selectedInterviewId,
}) => (
  <div className="w-full sm:w-1/3 p-4 border-b sm:border-r sm:border-b-0">
    <h1 className="text-2xl font-bold mb-4">Search Interviews</h1>
    <input
      type="text"
      placeholder="Search by company"
      className="w-full p-2 border rounded"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
    <ul className="mt-4">
      {loading ? (
        <Loader />
      ) : results.length > 0 ? (
        results.map((result) => (
          <li
            key={result.id}
            className={`p-2 border rounded cursor-pointer hover:bg-gray-100 ${
              selectedInterviewId === result.id ? 'bg-gray-100' : ''
            }`}
            onClick={() => handleViewDetails(result.id)}
          >
            <div className="font-bold">{result.company}</div>
            <div>{new Date(result.interviewDate).toLocaleDateString()}</div>
          </li>
        ))
      ) : (
        <div>No results found</div>
      )}
    </ul>
    {hasMore && !query && (
      <button
        className="mt-4 w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600"
        onClick={loadMore}
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Load More'}
      </button>
    )}
  </div>
);

export default SearchResults;
