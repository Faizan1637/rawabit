// src/client/api/package.api.ts
import apiClient from '@/hooks/useAxios';
import { PackageResponse } from '@/types/package';

interface PackageListResponse {
  success: boolean;
  data?: { packages: PackageResponse[] };
  message?: string;
  error?: string;
}

interface PackageResponseSingle {
  success: boolean;
  data?: { package: PackageResponse };
  message?: string;
  error?: string;
}

export const packageApi = {
  getAll: async (): Promise<PackageListResponse> => {
    const res = await apiClient.get<PackageListResponse>('/api/packages');
    return res.data;
  },

  getById: async (id: string): Promise<PackageResponseSingle> => {
    const res = await apiClient.get<PackageResponseSingle>(`/api/packages/${id}`);
    return res.data;
  },
};