'use client';

import { useState } from 'react';
import { transactionApi } from '@/client/api/transaction.api';
import { CreateTransactionInput } from '@/types/transaction';

interface Transaction {
  id: string;
  packageTitle: string;
  mobileNo: string;
  transactionDetails: string;
  amount: number;
  status: string;
  createdAt: string;
}

export const useTransaction = () => {
  const [transactionLoading, setLoading] = useState(false);
  const [errorTransaction, setError] = useState<string | null>(null);

  const createTransaction = async (input: CreateTransactionInput): Promise<Transaction | null> => {
    try {
      setLoading(true);
      setError(null);
      const response = await transactionApi.createTransaction(input);
      if (response.success && response.data?.transaction) {
        console.log(response.message || 'Payment submitted!');
        return response.data.transaction;
      } else {
        throw new Error(response.error || 'Failed to submit payment');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Payment failed';
      setError(message);
      console.error('Create transaction error:', message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getTransactions = async (): Promise<Transaction[]> => {
    try {
      setLoading(true);
      setError(null);
      const transactions = await transactionApi.getUserTransactions();
      console.log('Hook received transactions:', transactions);
      return transactions || [];
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch transactions';
      setError(message);
      console.error('Get transactions error:', message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError(null);

  return { createTransaction, getTransactions, transactionLoading, errorTransaction, clearError };
};