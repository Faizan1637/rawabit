'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { packageApi } from '@/client/api/package.api';
import PaymentForm from '@/components/payment/PaymentForm';
import { Spin, Alert } from 'antd';
import { PackageResponse } from '@/types/package';

export default function CheckoutPage() {
  const { id } = useParams();
  const [pkg, setPkg] = useState<PackageResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchPackage = async () => {
      try {
        setLoading(true);
        const pkgData = await packageApi.getById(id as string);
        setPkg(pkgData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load package');
      } finally {
        setLoading(false);
      }
    };

    fetchPackage();
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
