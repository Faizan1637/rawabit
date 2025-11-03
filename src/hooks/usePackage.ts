// src/client/hooks/usePackages.ts
'use client';

import { useState, useEffect } from 'react';
import { packageApi } from '@/client/api/package.api';
import { PackageResponse } from '@/types/package';

export const usePackages = () => {
  const [packages, setPackages] = useState<PackageResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await packageApi.getAll();
        if (response.success && response.data?.packages) {
          setPackages(response.data.packages);
        } else {
          throw new Error(response.error || 'Failed to fetch packages');
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to fetch packages';
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  return { packages, loading, error };
};