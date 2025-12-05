import { NextRequest } from 'next/server';
import { verifyAuth } from '@/middleware/auth';
import { 
  removeUser, 
  getUser 
} from '@/services/backened/user.service';
import { 
  getUserById, 
} from '@/services/backened/auth.service';
import { createSuccessResponse } from '@/lib/utils/api-response';
import { handleError, AppError } from '@/lib/utils/error-handler';
import { HTTP_STATUS } from '@/constants/responseConstant/status-codes';

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    // Verify admin
    const requesterId = await verifyAuth(request);
    const requester = await getUserById(requesterId);
    
    if (requester.role !== 'admin') {
      throw new AppError('Unauthorized', HTTP_STATUS.FORBIDDEN);
    }

    const { userId } = params;
    const user = await getUser(userId);

    return createSuccessResponse(user);
  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    // Verify admin
    const requesterId = await verifyAuth(request);
    const requester = await getUserById(requesterId);
    
    if (requester.role !== 'admin') {
      throw new AppError('Unauthorized', HTTP_STATUS.FORBIDDEN);
    }

    const { userId } = params;

    // Prevent admin from deleting themselves
    if (userId === requesterId) {
      throw new AppError(
        'You cannot delete your own account',
        HTTP_STATUS.BAD_REQUEST
      );
    }

    // Get user info before deletion
    const targetUser = await getUser(userId);
    
    // Delete user
    await removeUser(userId);

    return createSuccessResponse(
      { userId },
      `User ${targetUser.email} deleted successfully`
    );
  } catch (error) {
    return handleError(error);
  }
}