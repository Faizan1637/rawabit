// src/app/(dashboard)/packages/page.tsx
'use client';

import  PackageList  from '@/components/packages/PackageList';
import { usePackages } from '@/hooks/usePackage';
import { Spin, Alert } from 'antd';

export default function PackagesPage() {
  const { packages, loading, error } = usePackages();

  return (
    <div style={{ padding: '48px 24px', background: '#f5f5f5', minHeight: '100vh' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <h1 style={{ fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 8 }}>
          Choose Your Package
        </h1>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: 32 }}>
          Unlock contact details of verified profiles
        </p>

        {loading && (
          <div style={{ textAlign: 'center', padding: 40 }}>
            <Spin size="large" />
          </div>
        )}

        {error && <Alert message={error} type="error" showIcon style={{ marginBottom: 24 }} />}

        {!loading && !error && <PackageList packages={packages} loading={loading}/>}
      </div>
    </div>
  );
}