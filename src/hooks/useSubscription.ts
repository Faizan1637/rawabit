'use client';

import { useState, useEffect } from 'react';
import { subscriptionApi } from '@/client/api/subscription.api';

export const useSubscription = () => {
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [activeSubscription, setActiveSubscription] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSubscriptions = async () => {
    try {
      setLoading(true);
      const data = await subscriptionApi.getUserSubscriptions();
      setSubscriptions(data.subscriptions || []);
      setActiveSubscription(data.activeSubscription || null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch subscriptions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  return { subscriptions, activeSubscription, loading, error, refetch: fetchSubscriptions };
};