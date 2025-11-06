// src/app/api/profile/[id]/contact/route.ts
import { NextRequest } from 'next/server';
import { viewProfileContact } from '@/services/backened/subscription.service';
import { getProfileById } from '@/services/backened/profile.service';
import { verifyAuth } from '@/middleware/auth';
import { createSuccessResponse } from '@/lib/utils/api-response';
import { handleError } from '@/lib/utils/error-handler';


type RouteContext = {
  params: Awaited<{ id: string }>;
};

export async function POST(req: NextRequest, context: RouteContext) {
  try {
    const { params } = await Promise.resolve(context); 
    const userId = await verifyAuth(req);

    const profile = await getProfileById(params.id);
    const result = await viewProfileContact(userId, params.id, profile.fullName);

    if (!result.canView) throw new Error(result.message);

    return createSuccessResponse({
      parentsMobileNo: profile.parentsMobileNo,
      parentsPhone: profile.parentsPhone,
      message: result.message,
      subscription: result.subscription,
    });
  } catch (error) {
    return handleError(error);
  }
}
