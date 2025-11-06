import { NextRequest } from 'next/server';
import { verifyAuth } from '@/middleware/auth';
import { getUser, updateUserProfile, removeUser } from '@/services/backened/user.service';
import { createSuccessResponse, createErrorResponse } from '@/lib/utils/api-response';
import { handleError } from '@/lib/utils/error-handler';
import { SUCCESS_MESSAGES, ERROR_MESSAGES } from '@/constants/responseConstant/message';
import { HTTP_STATUS } from '@/constants/responseConstant/status-codes';


export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params; // ✅ Await params
    await verifyAuth(req);
    const user = await getUser(id);
    return createSuccessResponse(user);
  } catch (error) {
    return handleError(error);
  }
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params; // ✅ Await params
    const userId = await verifyAuth(req);

    // Only allow users to update their own profile
    if (userId !== id) {
      return createErrorResponse(ERROR_MESSAGES.FORBIDDEN, HTTP_STATUS.FORBIDDEN);
    }

    const body = await req.json();
    const user = await updateUserProfile(id, body);

    return createSuccessResponse(user, SUCCESS_MESSAGES.USER_UPDATED);
  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params; // ✅ Await params
    const userId = await verifyAuth(req);

    if (userId !== id) {
      return createErrorResponse(ERROR_MESSAGES.FORBIDDEN, HTTP_STATUS.FORBIDDEN);
    }

    await removeUser(id);
    return createSuccessResponse(null, SUCCESS_MESSAGES.USER_DELETED);
  } catch (error) {
    return handleError(error);
  }
}
