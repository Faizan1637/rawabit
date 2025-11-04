'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '@/client/api/auth.api';
import { RegisterFormData, LoginFormData } from '@/types/auth.types';
import {useAuthContext} from "@/context/AuthContext"

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const {setUser} =useAuthContext()

  const register = async (formData: RegisterFormData) => {
    try {
      setLoading(true);
      setError(null);

      // Frontend validation
      if (formData.password !== formData.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      if (!formData.agreeToTerms) {
        throw new Error('You must agree to the terms and conditions');
      }

      if (formData.password.length < 8) {
        throw new Error('Password must be at least 6 characters');
      }

      // Call API
      const response = await authApi.register(formData);

      if (response.success) {
        router.push('/account/dashboard');
        return response.data?.user;
      } else {
        throw new Error(response.error || 'Registration failed');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Registration failed';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const login = async (formData: LoginFormData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await authApi.login(formData);

      
    if(response.success && response.data?.user) {
      setUser(response.data.user); // ✅ instantly update context
      localStorage.setItem('user', JSON.stringify(response.data.user)); // keep in sync
      router.push('/account/dashboard');
      return response.data.user;
    }
    else {
        throw new Error(response.error || 'Login failed');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      setError(null);
      await authApi.logout();
      router.push('/login');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Logout failed';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await authApi.forgotPassword({ email });

      if (response.success) {
        return response;
      } else {
        throw new Error(response.error || 'Failed to send OTP');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async (email: string, otp: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await authApi.verifyOTP({ email, otp });

      if (response.success) {
        return response;
      } else {
        throw new Error(response.error || 'Invalid OTP');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (
    email: string,
    otp: string,
    newPassword: string,
    confirmPassword: string
  ) => {
    try {
      setLoading(true);
      setError(null);

      const response = await authApi.resetPassword({
        email,
        otp,
        newPassword,
        confirmPassword,
      });

      if (response.success) {
        router.push('/login');
        return response;
      } else {
        throw new Error(response.error || 'Failed to reset password');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError(null);

  return {
    register,
    login,
    logout,
    loading,
    error,
    clearError,
    forgotPassword,
    resetPassword,
    verifyOTP,
  };
};