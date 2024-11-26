import { useState, useEffect } from 'react';
import { Interview } from '../types';

export const useFetchResults = (limit: number) => {
  const [results, setResults] = useState<Interview[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchResults = async (append = false) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/interviews?limit=${limit}&offset=${offset}`);
      const data: Interview[] = await res.json();
      if (data.length < limit) {
        setHasMore(false);
      }
      setResults((prev) => (append ? [...prev, ...data] : data));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
  }, [offset]);

  const loadMore = () => {
    if (hasMore) setOffset((prev) => prev + limit);
  };

  return { results, loading, error, fetchResults, loadMore, hasMore };
};
