'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { profileApi } from '@/client/api/profile.api';
import { ProfileFormData } from '@/types/profile';
import { useAuthContext } from "@/context/AuthContext";
import { User, UserResponse } from '@/types/user';

export const useProfile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { setUser } = useAuthContext();

  // Helper function to transform User to UserResponse
  const transformUserToResponse = (user: User): UserResponse => {
    return {
      id: user._id?.toString(),
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      fullName: `${user.firstName} ${user.lastName}`,
      status: user.status,
      createdAt: user.createdAt?.toISOString(), // Convert Date to string
      gender: user.gender,
      dateOfBirth: user.dateOfBirth,
      role: user.role,
      profileCompleted: user.profileCompleted,
    };
  };

  const createProfile = async (formData: ProfileFormData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await profileApi.createProfile(formData);

      if (response.success) {
        if (response.data?.updatedUser && typeof response.data.updatedUser === 'object') {
          // Transform User to UserResponse before setting
          const userResponse = transformUserToResponse(response.data.updatedUser);
          setUser(userResponse);
        }
        return response.data?.profile;
      } else {
        throw new Error(response.error || 'Failed to create profile');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create profile';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getMyProfile = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await profileApi.getMyProfile();

      if (response.success) {
        return response.data?.profile;
      } else {
        throw new Error(response.error || 'Failed to fetch profile');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch profile';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (id: string, formData: Partial<ProfileFormData>) => {
    try {
      setLoading(true);
      setError(null);

      const response = await profileApi.updateProfile(id, formData);

      if (response.success) {
        return response.data?.profile;
      } else {
        throw new Error(response.error || 'Failed to update profile');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update profile';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteProfile = async () => {
    try {
      setLoading(true);
      setError(null);

      await profileApi.deleteProfile();
      router.push('/');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete profile';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError(null);

  return {
    createProfile,
    getMyProfile,
    updateProfile,
    deleteProfile,
    loading,
    error,
    clearError,
  };
};