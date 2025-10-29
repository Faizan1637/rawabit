import apiClient from '@/hooks/useAxios';

export interface InquiryFormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  message: string;
}

interface InquiryApiResponse {
  success: boolean;
  data?: {
    inquiry: any;
  };
  message?: string;
  error?: string;
}

export const inquiryApi = {
  // Create Inquiry (PUBLIC - No authentication required)
  createInquiry: async (formData: InquiryFormData): Promise<InquiryApiResponse> => {
    const response = await apiClient.post<InquiryApiResponse>('/api/inquiry', {
      fullName: formData.fullName.trim(),
      email: formData.email.trim().toLowerCase(),
      phoneNumber: formData.phoneNumber.trim(),
      message: formData.message.trim(),
    });
    return response.data;
  },
};