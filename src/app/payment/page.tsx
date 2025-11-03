// src/app/payment/page.tsx
'use client';

import { PaymentForm } from '@/components/payment/PaymentForm';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { packageApi } from '@/client/api/package.api';
import { PackageResponse } from '@/types/package';
import { Spin, Alert } from 'antd';

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const packageId = searchParams.get('packageId');
  const [pkg, setPkg] = useState<PackageResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!packageId) {
      setError('Invalid package');
      setLoading(false);
      return;
    }

    packageApi
      .getById(packageId)
      .then((res) => {
        if (res.success && res.data?.package) {
          setPkg(res.data.package);
        } else {
          setError(res.error || 'Package not found');
        }
      })
      .catch(() => setError('Failed to load package'))
      .finally(() => setLoading(false));
  }, [packageId]);

  if (loading) return <div style={{ textAlign: 'center', padding: 40 }}><Spin size="large" /></div>;
  if (error) return <Alert message={error} type="error" showIcon />;
  if (!pkg) return null;

  return (
    <div style={{ padding: '48px 24px', background: '#f5f5f5', minHeight: '100vh' }}>
      <div style={{ maxWidth: 500, margin: '0 auto' }}>
        <PaymentForm pkg={pkg} />
      </div>
    </div>
  );
}