'use client';

import { useEffect, useState } from 'react';
import { Spin, Alert, Tag, Empty } from 'antd';
import { 
  CheckCircleOutlined, 
  ClockCircleOutlined, 
  CloseCircleOutlined,
  SyncOutlined 
} from '@ant-design/icons';
import { useTransaction } from '@/hooks/useTransaction';

interface Transaction {
  id: string;
  packageTitle: string;
  mobileNo: string;
  transactionDetails: string;
  amount: number;
  status: string;
  createdAt: string;
}

const Transaction = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { getTransactions } = useTransaction();

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getTransactions();
      console.log('Fetched transactions:', data); // Debug log
      setTransactions(data || []);
    } catch (err) {
      console.error('Transaction fetch error:', err); // Debug log
      setError(err instanceof Error ? err.message : 'Failed to load transactions');
    } finally {
      setLoading(false);
    }
  };

  const getStatusConfig = (status: string) => {
    switch (status.toLowerCase()) {
      case 'verified':
        return { color: 'success', icon: <CheckCircleOutlined />, text: 'Verified' };
      case 'pending':
        return { color: 'default', icon: <ClockCircleOutlined />, text: 'Pending' };
      case 'verifying':
        return { color: 'processing', icon: <SyncOutlined spin />, text: 'Verifying' };
      case 'rejected':
        return { color: 'error', icon: <CloseCircleOutlined />, text: 'Rejected' };
      default:
        return { color: 'default', icon: <ClockCircleOutlined />, text: status };
    }
  };

  const getPaymentMethodLabel = (method: string) => {
    const labels: Record<string, string> = {
      'bank_transfer': 'Bank Transfer',
      'cash': 'Cash',
      'CASH': 'Cash',
      'telenor_easypaisa': 'Easypaisa',
      'easypaisa': 'Easypaisa'
    };
    return labels[method] || method;
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateString;
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl p-8 shadow-md border border-slate-200">
        <div className="flex justify-center items-center py-12">
          <Spin size="large" tip="Loading transactions..." />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl p-5 shadow-md border border-slate-200">
        <Alert
          message="Error"
          description={error}
          type="error"
          showIcon
          closable
          onClose={() => setError(null)}
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-white rounded-xl p-5 shadow-md border border-slate-200">
        <h2 className="text-xl font-bold text-slate-800">Payment History</h2>
        <p className="text-sm text-slate-600 mt-1">View all your transaction records</p>
      </div>

      {/* Transactions List */}
      {transactions.length === 0 ? (
        <div className="bg-white rounded-xl p-8 shadow-md border border-slate-200">
          <Empty
            description="No transactions found"
            className="py-8"
          />
        </div>
      ) : (
        <div className="space-y-3">
          {transactions.map((transaction) => {
            const statusConfig = getStatusConfig(transaction.status);
            
            return (
              <div
                key={transaction.id}
                className="bg-white rounded-xl p-4 shadow-md border border-slate-200 hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  {/* Left Section */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-base font-bold text-slate-800">
                          {transaction.packageTitle}
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {formatDate(transaction.createdAt)}
                        </p>
                      </div>
                      <Tag
                        icon={statusConfig.icon}
                        color={statusConfig.color}
                        className="ml-2"
                      >
                        {statusConfig.text}
                      </Tag>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-slate-500">Mobile:</span>
                        <span className="ml-1 font-medium text-slate-700">
                          {transaction.mobileNo}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-500">MOP:</span>
                        <span className="ml-1 font-medium text-slate-700">
                          {getPaymentMethodLabel(transaction.transactionDetails)}
                        </span>
                      </div>
                      {transaction.transactionDetails && transaction.transactionDetails.toLowerCase() !== 'cash' && (
                        <div className="col-span-2">
                          <span className="text-slate-500">Ref No:</span>
                          <span className="ml-1 font-medium text-slate-700">
                            {transaction.transactionDetails}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Section - Amount */}
                  <div className="flex items-center justify-between md:flex-col md:items-end md:justify-center gap-1 pt-3 md:pt-0 border-t md:border-t-0 md:border-l md:pl-4 border-slate-200">
                    <span className="text-xs text-slate-500 md:mb-1">Amount</span>
                    <span className="text-xl font-bold text-orange-600">
                      {transaction.amount.toLocaleString()} PKR
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Transaction;