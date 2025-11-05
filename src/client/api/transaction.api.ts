import apiClient from '@/hooks/useAxios';

export interface CreateTransactionData {
  packageId: string;
  paymentMethod: 'bank_transfer' | 'cash' | 'telenor_easypaisa';
  mobileNo: string;
  transactionRefNo?: string;
}

export const transactionApi = {
  createTransaction: async (data: CreateTransactionData) => {
    const response = await apiClient.post('/api/transactions', data);
    if (response.data.success) {
      return response.data;
    }
    throw new Error(response.data.error || 'Failed to create transaction');
  },

  getUserTransactions: async () => {
    const response = await apiClient.get('/api/transactions');
    console.log('API Response:', response.data); // Debug log
    
    if (response.data.success && response.data.data?.transactions) {
      return response.data.data.transactions;
    }
    throw new Error('Failed to fetch transactions');
  },

  viewContact: async (profileId: string) => {
    const response = await apiClient.post(`/api/profile/${profileId}/contact`);
    if (response.data.success && response.data.data) {
      return response.data.data;
    }
    throw new Error(response.data.error || 'Failed to view contact');
  },
};