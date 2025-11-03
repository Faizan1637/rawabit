// src/client/components/packages/PackageCard.tsx
'use client';

import { PackageResponse } from '@/types/package';
import { Card, Button, Tag, List, Typography } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

const { Title, Text } = Typography;

interface Props {
  pkg: PackageResponse;
}

export function PackageCard({ pkg }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleBuy = () => {
    startTransition(() => {
      router.push(`/payment?packageId=${pkg.id}`);
    });
  };

  return (
    <Card
      hoverable
      style={{ height: '100%' }}
      actions={[
        <Button type="primary" size="large" onClick={handleBuy} loading={isPending} block>
          {isPending ? 'Loading...' : 'Buy Now'}
        </Button>,
      ]}
    >
      <div style={{ textAlign: 'center', marginBottom: 16 }}>
        <Title level={3}>{pkg.name}</Title>
        <Tag color="blue">{pkg.validity} months</Tag>
      </div>

      <Title level={2} style={{ textAlign: 'center', color: '#1890ff' }}>
        PKR {pkg.price.toLocaleString()}
      </Title>

      <List
        dataSource={pkg.features}
        renderItem={(item) => (
          <List.Item style={{ border: 'none', padding: '4px 0' }}>
            <CheckCircleFilled style={{ color: '#52c41a', marginRight: 8 }} />
            <Text>{item}</Text>
          </List.Item>
        )}
      />
    </Card>
  );
}