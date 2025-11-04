// src/app/(dashboard)/subscriptions/page.tsx
'use client';

import { useSubscription } from '@/hooks/useSubscription';
import { Card, Spin, Alert, Progress, Tag, Table } from 'antd';

export default function SubscriptionsPage() {
  const { list, active, loading, error } = useSubscription();

  if (loading) return <Spin size="large" style={{ display: 'block', margin: '40px auto' }} />;
  if (error) return <Alert message={error} type="error" />;

  const columns = [
    { title: 'Package', dataIndex: 'packageName' },
    { title: 'Start', dataIndex: 'startDate' },
    { title: 'End', dataIndex: 'endDate' },
    { title: 'Status', render: (s: any) => <Tag color={s.expired ? 'red' : 'green'}>{s.status}</Tag> },
    { title: 'Views', render: (s: any) => `${s.viewedCount}/${s.totalCount}` },
  ];

  return (
    <div style={{ padding: 24 }}>
      <h1>Subscription Status</h1>
      {active ? (
        <Card style={{ marginBottom: 24 }}>
          <h3>{active.packageName}</h3>
          <Progress percent={Math.round((active.viewedCount / active.totalCount) * 100)} />
          <p>{active.remainingCount} views left</p>
        </Card>
      ) : (
        <Alert message="No active subscription" type="info" />
      )}
      <Table dataSource={list} columns={columns} rowKey="id" />
    </div>
  );
}