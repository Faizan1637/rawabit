// src/client/hooks/useTransaction.ts
'use client';

import { useState } from 'react';
import { transactionApi } from '@/client/api/transaction.api';
import { CreateTransactionInput, TransactionResponse } from '@/types/transaction';


export const useTransaction = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createTransaction = async (input: CreateTransactionInput): Promise<TransactionResponse | null> => {
    try {
      setLoading(true);
      setError(null);
      const response = await transactionApi.create(input);
      if (response.success && response.data?.transaction) {
        console.log(response.message || 'Payment submitted!');
        return response.data.transaction;
      } else {
        throw new Error(response.error || 'Failed to submit payment');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Payment failed';
      setError(message);
      console.error(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getTransactions = async (): Promise<TransactionResponse[]> => {
    const response = await transactionApi.getAll();
    if (response.success && response.data?.transactions) {
      return response.data.transactions;
    }
    throw new Error(response.error || 'Failed to fetch transactions');
  };

  const clearError = () => setError(null);

  return { createTransaction, getTransactions, loading, error, clearError };
};