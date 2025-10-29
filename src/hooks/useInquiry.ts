'use client';

import { useState } from 'react';
import { inquiryApi, InquiryFormData } from '@/client/api/inquiry.api';

export const useInquiry = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const sendInquiry = async (formData: InquiryFormData) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      const response = await inquiryApi.createInquiry(formData);

      if (response.success) {
        setSuccess(true);
        return response.data?.inquiry;
      } else {
        throw new Error(response.error || 'Failed to send message');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to send message';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError(null);
  const clearSuccess = () => setSuccess(false);

  return {
    sendInquiry,
    loading,
    error,
    success,
    clearError,
    clearSuccess,
  };
};