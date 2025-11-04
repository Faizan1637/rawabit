import apiClient from '@/hooks/useAxios';
import { SubscriptionResponse } from '@/types/subscription';

interface Response {
  success: boolean;
  data?: {
    subscriptions: SubscriptionResponse[];
    activeSubscription: SubscriptionResponse | null;
  };
  error?: string;
}

export const subscriptionApi = {
  getAll: async (): Promise<Response> => {
    const res = await apiClient.get<Response>('/api/subscription');
    return res.data;
  },
};