// src/client/hooks/useSubscription.ts
'use client';

import { useState, useEffect } from 'react';
import { subscriptionApi } from '@/client/api/subscription.api';
import { SubscriptionResponse } from '@/types/subscription';

export const useSubscription = () => {
  const [subscriptions, setSubscriptions] = useState<SubscriptionResponse[]>([]);
  const [activeSubscription, setActiveSubscription] = useState<SubscriptionResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await subscriptionApi.getAll();
        if (response.success && response.data) {
          setSubscriptions(response.data.subscriptions);
          setActiveSubscription(response.data.activeSubscription);
        } else {
          throw new Error(response.error || 'Failed to fetch subscriptions');
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to fetch subscriptions';
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptions();
  }, []);

  return { subscriptions, activeSubscription, loading, error };
};