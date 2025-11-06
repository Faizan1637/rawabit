// src/app/api/profile/[id]/contact/route.ts
import { NextRequest } from 'next/server';
import { viewProfileContact } from '@/services/backened/subscription.service';
import { getProfileById } from '@/services/backened/profile.service';
import { verifyAuth } from '@/middleware/auth';
import { createSuccessResponse } from '@/lib/utils/api-response';
import { handleError } from '@/lib/utils/error-handler';

// 👇 The key fix: define `params` as a Promise to match Next.js 15 type expectations
export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // ✅ Await the params promise — matches the new Next.js type signature
    const { id } = await context.params;

    const userId = await verifyAuth(req);
    const profile = await getProfileById(id);
    const result = await viewProfileContact(userId, id, profile.fullName);

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
