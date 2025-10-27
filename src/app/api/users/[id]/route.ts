import { NextRequest } from 'next/server';
import { verifyAuth } from '@/middleware/auth';
import { getUser, updateUserProfile, removeUser } from '@/services/backened/user.service';
import { createSuccessResponse, createErrorResponse } from '@/lib/utils/api-response';
import { handleError } from '@/lib/utils/error-handler';
import { SUCCESS_MESSAGES, ERROR_MESSAGES } from '@/constants/responseConstant/message';
import { HTTP_STATUS } from '@/constants/responseConstant/status-codes';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await verifyAuth(req);
    const user = await getUser(params.id);
    return createSuccessResponse(user);
  } catch (error) {
    return handleError(error);
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = await verifyAuth(req);
    
    // Only allow users to update their own profile
    if (userId !== params.id) {
      return createErrorResponse(
        ERROR_MESSAGES.FORBIDDEN,
        HTTP_STATUS.FORBIDDEN
      );
    }

    const body = await req.json();
    const user = await updateUserProfile(params.id, body);
    
    return createSuccessResponse(user, SUCCESS_MESSAGES.USER_UPDATED);
  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = await verifyAuth(req);
    
    if (userId !== params.id) {
      return createErrorResponse(
        ERROR_MESSAGES.FORBIDDEN,
        HTTP_STATUS.FORBIDDEN
      );
    }

    await removeUser(params.id);
    return createSuccessResponse(null, SUCCESS_MESSAGES.USER_DELETED);
  } catch (error) {
    return handleError(error);
  }
}