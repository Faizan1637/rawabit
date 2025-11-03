// src/client/components/packages/PackageList.tsx
'use client';

import { PackageResponse } from '@/types/package';
import { PackageCard } from '@/components/packages/PackageCard';
import { Empty } from 'antd';

interface Props {
  packages: PackageResponse[];
}

export function PackageList({ packages }: Props) {
  if (packages.length === 0) {
    return <Empty description="No packages available" />;
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
      {packages.map((pkg) => (
        <PackageCard key={pkg.id} pkg={pkg} />
      ))}
    </div>
  );
}