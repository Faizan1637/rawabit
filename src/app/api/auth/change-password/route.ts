// src/app/api/auth/change-password/route.ts
import { NextRequest } from 'next/server';
import { verifyAuth } from '@/middleware/auth';
import { changeUserPassword } from '@/services/backened/auth.service';
import { createSuccessResponse } from '@/lib/utils/api-response';
import { handleError } from '@/lib/utils/error-handler';
import { validateRequiredFields, validatePassword } from '@/lib/validators/auth';
import { SUCCESS_MESSAGES } from '@/constants/responseConstant/message';

export async function POST(req: NextRequest) {
  try {
    const userId = await verifyAuth(req);
    const body = await req.json();
    const { currentPassword, newPassword, confirmPassword } = body;

    // Validate
    validateRequiredFields(body, ['currentPassword', 'newPassword', 'confirmPassword']);
    validatePassword(newPassword);
    if (newPassword !== confirmPassword) {
      throw new Error('New passwords do not match');
    }

    // Change password
    await changeUserPassword(userId, currentPassword, newPassword);

    return createSuccessResponse(
      null,
      SUCCESS_MESSAGES.PASSWORD_CHANGED
    );
  } catch (error) {
    return handleError(error);
  }
}