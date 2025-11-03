import apiClient from '@/hooks/useAxios';

export const subscriptionApi = {
  getUserSubscriptions: async () => {
    const response = await apiClient.get('/subscriptions');
    if (response.data.success && response.data.data) {
      return response.data.data;
    }
    throw new Error('Failed to fetch subscriptions');
  },
};