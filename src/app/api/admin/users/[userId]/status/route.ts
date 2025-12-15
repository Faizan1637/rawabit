import { NextRequest } from 'next/server';
import { verifyAuth } from '@/middleware/auth';
import { 
  updateUserStatus 
} from '@/services/backened/user.service';
import { 
  getUserById, 
} from '@/services/backened/auth.service';
import { createSuccessResponse } from '@/lib/utils/api-response';
import { handleError, AppError } from '@/lib/utils/error-handler';
import { HTTP_STATUS } from '@/constants/responseConstant/status-codes';

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ userId: string }> }
) {
  try {
    // Verify admin
    const requesterId = await verifyAuth(request);
    const requester = await getUserById(requesterId);
    
    if (requester.role !== 'admin') {
      throw new AppError('Unauthorized', HTTP_STATUS.FORBIDDEN);
    }

    const { userId } = await context.params;
    const body = await request.json();
    const { status } = body;

    // Validate status
    if (!status || !['active', 'blocked'].includes(status)) {
      throw new AppError(
        'Invalid status. Must be "active" or "blocked"',
        HTTP_STATUS.BAD_REQUEST
      );
    }

    // Prevent admin from blocking themselves
    if (userId === requesterId) {
      throw new AppError(
        'You cannot change your own account status',
        HTTP_STATUS.BAD_REQUEST
      );
    }

    // Update status
    const updatedUser = await updateUserStatus(userId, status);

    return createSuccessResponse(
      updatedUser,
      `User status updated to ${status}`
    );
  } catch (error) {
    return handleError(error);
  }
}