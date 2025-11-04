// src/app/(admin)/transactions/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { Button, Table, message, Spin } from 'antd';

interface Transaction {
  id: string;
  packageTitle: string;
  amount: number;
  paymentMethod: string;
  mobileNo: string;
}

export default function AdminTransactions() {
  const [txns, setTxns] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/transactions')
      .then(r => r.json())
      .then(res => {
        if (res.success) setTxns(res.data.transactions);
        else throw new Error(res.error);
      })
      .catch(() => message.error('Failed to load'))
      .finally(() => setLoading(false));
  }, []);

  const handleVerify = async (id: string) => {
    const res = await fetch(`/api/admin/transactions/${id}/verify`, {
      method: 'POST',
    });
    const json = await res.json();
    if (json.success) {
      message.success('Verified!');
      setTxns(prev => prev.filter(t => t.id !== id));
    } else {
      message.error(json.error);
    }
  };

  const columns = [
    { title: 'Package', dataIndex: 'packageTitle' },
    { title: 'Amount', dataIndex: 'amount', render: (a: number) => `PKR ${a}` },
    { title: 'Method', dataIndex: 'paymentMethod' },
    { title: 'Mobile', dataIndex: 'mobileNo' },
    {
      title: 'Action',
      render: (t: Transaction) => (
        <Button type="primary" size="small" onClick={() => handleVerify(t.id)}>
          Verify
        </Button>
      ),
    },
  ];

  if (loading) return <Spin size="large" className="block mt-10" />;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Pending Transactions</h1>
      <Table dataSource={txns} columns={columns} rowKey="id" />
    </div>
  );
}