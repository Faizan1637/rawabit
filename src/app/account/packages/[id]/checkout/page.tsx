'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { packageApi } from '@/client/api/package.api';
import PaymentForm from '@/components/payment/PaymentForm';
import { Spin, Alert } from 'antd';

export default function CheckoutPage() {
  const { id } = useParams();
  const [pkg, setPkg] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("Before Checking ID in useeffect",id)
    if (!id) return;
     console.log("Checking ID in useeffect",id)
    packageApi
      .getById(id as string)
      .then((res) => {
        if (res.success && res.data?.package) {
          setPkg(res.data.package);
        } else {
          setError(res.error || 'Package not found');
        }
      })
      .catch(() => setError('Failed to load package'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="text-center py-20"><Spin size="large" /></div>;
  if (error) return <Alert message={error} type="error" showIcon />;
  if (!pkg) return null;

  return (
    <div style={{ padding: '48px 24px', background: '#f5f5f5', minHeight: '100vh' }}>
      <div style={{ maxWidth: 500, margin: '0 auto' }}>
        <PaymentForm package={pkg} />
      </div>
    </div>
  );
}
