import apiClient from '@/hooks/useAxios';
import { SearchFilters, SearchResponse } from '@/types/search';

interface SearchApiResponse {
  success: boolean;
  data?: SearchResponse;
  message?: string;
  error?: string;
}

export const searchApi = {
  searchProfiles: async (filters: SearchFilters): Promise<SearchResponse> => {
    // Build query string
    const params = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, value.toString());
      }
    });

    const response = await apiClient.get<SearchApiResponse>(
      `/api/search/profiles?${params.toString()}`
    );

    if (response.data.success && response.data.data) {
      return response.data.data;
    }

    throw new Error(response.data.error || 'Failed to search profiles');
  },
};