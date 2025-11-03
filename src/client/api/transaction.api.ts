// src/client/api/transaction.api.ts
import apiClient from '@/hooks/useAxios';
import { CreateTransactionInput, TransactionResponse } from '@/types/transaction';

interface CreateTransactionResponse {
  success: boolean;
  data?: { transaction: TransactionResponse };
  message?: string;
  error?: string;
}

interface TransactionListResponse {
  success: boolean;
  data?: { transactions: TransactionResponse[] };
  message?: string;
  error?: string;
}

export const transactionApi = {
  create: async (input: CreateTransactionInput): Promise<CreateTransactionResponse> => {
    const res = await apiClient.post<CreateTransactionResponse>('/api/transactions', input);
    return res.data;
  },

  getAll: async (): Promise<TransactionListResponse> => {
    const res = await apiClient.get<TransactionListResponse>('/api/transactions');
    return res.data;
  },
};