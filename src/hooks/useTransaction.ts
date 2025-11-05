'use client';

import { useState, useEffect } from 'react';
import { transactionApi } from '@/client/api/transaction.api';
import { CreateTransactionInput, TransactionResponse } from '@/types/transaction';

export const useTransaction = () => {
  const [transactions, setTransactions] = useState<TransactionResponse[]>([]);
  const [transactionLoading, setLoading] = useState(false);
  const [errorTransaction, setError] = useState<string | null>(null);

  // Fetch transactions on mount
  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await transactionApi.getUserTransactions();
      console.log('Fetched transactions:', data);
      setTransactions(data || []);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load transactions';
      setError(message);
      console.error('Transaction fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const createTransaction = async (input: CreateTransactionInput): Promise<TransactionResponse | null> => {
    try {
      setLoading(true);
      setError(null);
      const response = await transactionApi.createTransaction(input);
      
      if (response.success && response.data?.transaction) {
        console.log(response.message || 'Payment submitted!');
        // Refresh transactions list after creating new transaction
        await fetchTransactions();
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

  const clearError = () => setError(null);

  return { 
    transactions,
    createTransaction, 
    fetchTransactions,
    transactionLoading, 
    errorTransaction, 
    clearError 
  };
};