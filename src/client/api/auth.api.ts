import apiClient from '@/hooks/useAxios';
import { RegisterFormData, RegisterPayload, LoginFormData } from '@/types/auth.types';
import { formatDateOfBirth } from '@/utils/date/date.util';

// Import shared types from backend
import { UserResponse } from '@/types/user';

interface AuthApiResponse {
  success: boolean;
  data?: {
    user: UserResponse;
  };
  message?: string;
  error?: string;
}

export const authApi = {
  // Register
  register: async (formData: RegisterFormData): Promise<AuthApiResponse> => {
    // Transform form data to API payload
    const payload: RegisterPayload = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim().toLowerCase(),
      password: formData.password,
      gender: formData.gender,
      dateOfBirth: formatDateOfBirth(formData.day, formData.month, formData.year),
    };

    const response = await apiClient.post<AuthApiResponse>('/api/auth/register', payload);
    return response.data;
  },

  // Login
  login: async (formData: LoginFormData): Promise<AuthApiResponse> => {
    const response = await apiClient.post<AuthApiResponse>('/auth/login', {
      email: formData.email.trim().toLowerCase(),
      password: formData.password,
    });
    return response.data;
  },

  // Logout
  logout: async (): Promise<void> => {
    await apiClient.post('/auth/logout');
  },

  // Get current user
  me: async (): Promise<AuthApiResponse> => {
    const response = await apiClient.get<AuthApiResponse>('/auth/me');
    return response.data;
  },
};