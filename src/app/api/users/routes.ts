// app/api/admin/users/route.ts - Get all users
import { NextRequest } from 'next/server';
import { verifyAuth } from '@/middleware/auth';
import { getAllUsers } from '@/services/backened/user.service';
import { getUserById } from '@/services/backened/auth.service';
import { createSuccessResponse } from '@/lib/utils/api-response';
import { handleError, AppError } from '@/lib/utils/error-handler';
import { HTTP_STATUS } from '@/constants/responseConstant/status-codes';

export async function GET(request: NextRequest) {
  try {
    // Verify admin
    const requesterId = await verifyAuth(request);
    const requester = await getUserById(requesterId);
    
    if (requester.role !== 'admin') {
      throw new AppError('Unauthorized', HTTP_STATUS.FORBIDDEN);
    }

    // Get pagination params
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    const result = await getAllUsers(page, limit);

    return createSuccessResponse(result);
  } catch (error) {
    return handleError(error);
  }
}
