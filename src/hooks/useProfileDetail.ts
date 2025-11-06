'use client';

import { useState, useEffect } from 'react';
import { profileApi } from '@/client/api/profile.api';
import { ProfileResponse } from '@/types/profile';

export const useProfileDetail = (profileId: string) => {
  const [profile, setProfile] = useState<ProfileResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError(null);

        const apiResponse = await profileApi.getProfileById(profileId);

        // ✅ Access the nested profile data properly
        if (apiResponse.success && apiResponse.data?.profile) {
          setProfile(apiResponse.data.profile);
        } else {
          setError(apiResponse.message || 'Profile not found');
        }

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
