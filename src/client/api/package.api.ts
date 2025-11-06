import apiClient from '@/hooks/useAxios';
import { PackageResponse } from '@/types/package';
import { ApiResponse } from '@/types/api';

export const packageApi = {
  getAllPackages: async (): Promise<PackageResponse[]> => {
    const response = await apiClient.get<ApiResponse<{ packages: PackageResponse[] }>>('/api/packages');
    if (response.data.success && response.data.data) {
      return response.data.data.packages;
    }
    throw new Error('Failed to fetch packages');
  },

  getById: async (id: string): Promise<PackageResponse> => {
    const response = await apiClient.get<ApiResponse<PackageResponse>>(`/api/packages/${id}`);
    if (response.data.success && response.data.data) {
      return response.data.data;
    }
    throw new Error('Failed to fetch package');
  },
};
