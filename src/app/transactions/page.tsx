// src/app/(dashboard)/transactions/page.tsx
'use client';

import { useTransaction } from '@/hooks/useTransaction';
import { TransactionResponse } from '@/types/transaction';
import { Table, Tag, Spin, Empty } from 'antd';
import { useEffect, useState } from 'react';

export default function TransactionsPage() {
  const { getTransactions } = useTransaction();
  const [transactions, setTransactions] = useState<TransactionResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTransactions()
      .then(setTransactions)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [getTransactions]);

  const columns = [
    {
      title: 'Package',
      dataIndex: 'packageTitle',
      key: 'packageTitle',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => `PKR ${amount.toLocaleString()}`,
    },
    {
      title: 'Method',
      dataIndex: 'transactionDetails',
      key: 'method',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        let color = 'default';
        if (status === 'verified') color = 'success';
        if (status === 'rejected') color = 'error';
        if (status === 'verifying') color = 'processing';
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'date',
    },
  ];

  return (
    <div style={{ padding: '48px 24px', background: '#f5f5f5', minHeight: '100vh' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <h1 style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 24 }}>Transaction History</h1>

        {loading && <Spin size="large" style={{ display: 'block', margin: '40px auto' }} />}

        {!loading && transactions.length === 0 && <Empty description="No transactions yet" />}

        {!loading && transactions.length > 0 && (
          <Table dataSource={transactions} columns={columns} rowKey="id" pagination={false} />
        )}
      </div>
    </div>
  );
}