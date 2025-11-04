// src/client/hooks/useSubscription.ts
'use client';

import { useState, useEffect } from 'react';
import { subscriptionApi } from '@/client/api/subscription.api';
import { SubscriptionResponse } from '@/types/subscription';

export const useSubscription = () => {
  const [list, setList] = useState<SubscriptionResponse[]>([]);
  const [active, setActive] = useState<SubscriptionResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = async () => {
    try {
      setLoading(true);
      const res = await subscriptionApi.getAll();
      if (res.success) {
        setList(res.data?.subscriptions || []);
        setActive(res.data?.activeSubscription || null);
      } else throw new Error(res.error);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetch(); }, []);

  return { list, active, loading, error, refetch: fetch };
};