import apiClient from '@/hooks/useAxios';

export const packageApi = {
  getAllPackages: async () => {
    const response = await apiClient.get('/api/packages');
    if (response.data.success && response.data.data) {
      return response.data.data.packages;
    }
    throw new Error('Failed to fetch packages');
  },

  getById: async (id: string) => {
    const response = await apiClient.get(`/api/packages/${id}`);
    return response.data;
  },
};
