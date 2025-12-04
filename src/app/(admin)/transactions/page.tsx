'use client';

import { useEffect, useState } from 'react';
import { Button, Table, message, Spin } from 'antd';
import { ArrowLeftOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

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
  const [verifyingId, setVerifyingId] = useState<string | null>(null);
  const router = useRouter();

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
    setVerifyingId(id);
    const res = await fetch(`/api/admin/transactions/${id}/verify`, {
      method: 'POST',
    });
    const json = await res.json();
    if (json.success) {
      message.success('Transaction verified successfully!');
      setTxns(prev => prev.filter(t => t.id !== id));
    } else {
      message.error(json.error || 'Failed to verify transaction');
    }
    setVerifyingId(null);
  };

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
      render: (a: number) => (
        <span className="font-semibold text-slate-700">PKR {a.toLocaleString()}</span>
      ),
    },
    { 
      title: 'Payment Method', 
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
      render: (method: string) => (
        <span className="px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-sm font-medium">
          {method}
        </span>
      ),
    },
    { 
      title: 'Mobile No', 
      dataIndex: 'mobileNo',
      key: 'mobileNo',
    },
    {
      title: 'Action',
      key: 'action',
      render: (t: Transaction) => (
        <Button 
          type="primary"
          icon={<CheckCircleOutlined />}
          loading={verifyingId === t.id}
          onClick={() => handleVerify(t.id)}
          className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 border-0 font-semibold shadow-md"
        >
          Verify
        </Button>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <Spin size="large" />
          <p className="mt-4 text-lg font-semibold text-orange-600">Loading transactions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 pt-0">
      <div className="container mx-auto px-4 py-6">
        <div className="space-y-6">
          {/* Back Button */}
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => router.push('/account/admin/dashboard')}
            className="flex items-center gap-2 text-slate-700 hover:text-orange-600 border-slate-300 hover:border-orange-400 font-medium"
          >
            Back to Dashboard
          </Button>

          {/* Header Section */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white shadow-lg">
            <h1 className="text-2xl md:text-3xl font-bold mb-1">
              Pending Transactions
            </h1>
            <p className="text-orange-100">
              Review and verify user payment transactions
            </p>
          </div>

          {/* Table Section */}
          <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
            {txns.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-5xl mb-3">✅</div>
                <h2 className="text-xl font-bold text-slate-800 mb-1">All Caught Up!</h2>
                <p className="text-slate-600 text-sm">No pending transactions to verify</p>
              </div>
            ) : (
              <Table 
                dataSource={txns} 
                columns={columns} 
                rowKey="id"
                pagination={{
                  pageSize: 10,
                  showTotal: (total) => `Total ${total} transactions`,
                  className: "px-4 py-3"
                }}
                className="custom-table"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}