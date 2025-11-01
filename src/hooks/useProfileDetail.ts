'use client';

import { useState, useEffect } from 'react';
import { profileApi } from '@/client/api/profile.api';

export const useProfileDetail = (profileId: string) => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await profileApi.getProfileById(profileId);
        setProfile(data);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to fetch profile';
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    if (profileId) {
      fetchProfile();
    }
  }, [profileId]);

  return { profile, loading, error };
};