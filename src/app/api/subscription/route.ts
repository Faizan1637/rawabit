import { NextRequest } from 'next/server';
import { verifyAuth } from '@/middleware/auth';
import { getUserSubscriptions, getUserActiveSubscription } from '@/services/backened/subscription.service';
import { createSuccessResponse } from '@/lib/utils/api-response';
import { handleError } from '@/lib/utils/error-handler';

export async function GET(req: NextRequest) {
  try {
    const userId = await verifyAuth(req);
    
    const subscriptions = await getUserSubscriptions(userId);
    const activeSubscription = await getUserActiveSubscription(userId);
    
    return createSuccessResponse({
      subscriptions,
      activeSubscription,
    });
  } catch (error) {
    return handleError(error);
  }
}