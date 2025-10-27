import { NextRequest } from 'next/server';
import { verifyAuth } from '@/middleware/auth';
import { getUserById } from '@/services/backened/auth.service';
import { createSuccessResponse } from '@/lib/utils/api-response';
import { handleError } from '@/lib/utils/error-handler';

export async function GET(req: NextRequest) {
  try {
    const userId = await verifyAuth(req);
    const user = await getUserById(userId);
    return createSuccessResponse({ user });
  } catch (error) {
    return handleError(error);
  }
}