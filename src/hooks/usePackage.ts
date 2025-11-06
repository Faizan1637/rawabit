'use client';

import { useState, useEffect } from 'react';
import { packageApi } from '@/client/api/package.api';
import { PackageResponse } from '@/types/package'; // adjust path if needed

export const usePackages = () => {
  const [packages, setPackages] = useState<PackageResponse[]>([]);
  const [packagesLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true);
        const data = await packageApi.getAllPackages();
        setPackages(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch packages');
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  return { packages, packagesLoading, error };
};
