'use client';

import { useState, useEffect } from 'react';
import { searchApi } from '@/client/api/search.api';
import { SearchFilters, ProfileSearchResult } from '@/types/search';

export const useSearch = (initialFilters: SearchFilters = {}) => {
  const [profiles, setProfiles] = useState<ProfileSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<SearchFilters>(initialFilters);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 12,
    totalPages: 0,
  });

  const searchProfiles = async (newFilters?: SearchFilters) => {
    try {
      setLoading(true);
      setError(null);

      const searchFilters = newFilters || filters;
      const results = await searchApi.searchProfiles(searchFilters);

      setProfiles(results.profiles);
      setPagination({
        total: results.total,
        page: results.page,
        limit: results.limit,
        totalPages: results.totalPages,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to search profiles';
      setError(message);
      setProfiles([]);
    } finally {
      setLoading(false);
    }
  };

  const updateFilters = (newFilters: Partial<SearchFilters>) => {
    const updated = { ...filters, ...newFilters, page: 1 }; // Reset to page 1
    setFilters(updated);
    searchProfiles(updated);
  };

  const clearFilters = () => {
    const cleared: SearchFilters = { page: 1, limit: 12 };
    setFilters(cleared);
    searchProfiles(cleared);
  };

  const changePage = (page: number) => {
    const updated = { ...filters, page };
    setFilters(updated);
    searchProfiles(updated);
  };

  useEffect(() => {
    searchProfiles();
  }, []);

  return {
    profiles,
    loading,
    error,
    filters,
    pagination,
    updateFilters,
    clearFilters,
    changePage,
    searchProfiles,
  };
};