// src/client/components/subscription/SubscriptionStatus.tsx
'use client';

import { SubscriptionResponse } from '@/types/subscription';
import { Card, Progress, Tag, Button, Typography } from 'antd';
import Link from 'next/link';

const { Title, Text } = Typography;

interface Props {
  subscription: SubscriptionResponse | null;
}

export function SubscriptionStatus({ subscription }: Props) {
  if (!subscription) {
    return (
      <Card style={{ textAlign: 'center' }}>
        <Text strong type="warning">
          No Active Subscription
        </Text>
        <br />
        <Button type="primary" style={{ marginTop: 8 }}>
          <Link href="/packages">View Packages</Link>
        </Button>
      </Card>
    );
  }

  const percent = Math.round((subscription.viewedCount / subscription.totalCount) * 100);

  return (
    <Card>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
        <div>
          <Title level={4}>{subscription.packageName}</Title>
          <Text type="secondary">Expires: {subscription.endDate}</Text>
        </div>
        <Tag color={subscription.expired ? 'red' : 'green'}>
          {subscription.status.toUpperCase()}
        </Tag>
      </div>

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <Text>Views Used</Text>
          <Text>
            {subscription.viewedCount} / {subscription.totalCount}
          </Text>
        </div>
        <Progress percent={percent} showInfo={false} />
        <Text type="secondary" style={{ fontSize: 12, display: 'block', textAlign: 'center', marginTop: 4 }}>
          {subscription.remainingCount} views remaining
        </Text>
      </div>
    </Card>
  );
}