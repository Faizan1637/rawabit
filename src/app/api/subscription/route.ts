import { NextRequest } from 'next/server';
import { verifyAuth } from '@/middleware/auth';
import { getUserSubscriptions, getUserActiveSubscription } from '@/services/backened/subscription.service';
import { createSuccessResponse } from '@/lib/utils/api-response';
import { handleError } from '@/lib/utils/error-handler';

export async function GET(req: NextRequest) {
  try {
    const userId = await verifyAuth(req);
    console.log("User id in backened subscription function is ",userId)
    const subscriptions = await getUserSubscriptions(userId);
    const activeSubscription = await getUserActiveSubscription(userId);
    
    console.log("subscriptions of the User...",subscriptions)
    console.log("Active subscriptions of the User...",activeSubscription)

    return createSuccessResponse({
      subscriptions,
      activeSubscription,
    });
  } catch (error) {
    return handleError(error);
  }
}