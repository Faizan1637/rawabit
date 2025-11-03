// src/client/api/subscription.api.ts
import apiClient from '@/hooks/useAxios';
import { SubscriptionResponse } from '@/types/subscription';

interface SubscriptionResponseData {
  success: boolean;
  data?: {
    subscriptions: SubscriptionResponse[];
    activeSubscription: SubscriptionResponse | null;
  };
  message?: string;
  error?: string;
}

export const subscriptionApi = {
  getAll: async (): Promise<SubscriptionResponseData> => {
    const res = await apiClient.get<SubscriptionResponseData>('/api/subscriptions');
    return res.data;
  },
};