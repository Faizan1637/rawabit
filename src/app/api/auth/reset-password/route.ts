// src/app/api/auth/reset-password/route.ts
import { NextRequest } from 'next/server';
import { resetUserPassword } from '@/services/backened/auth.service';
import { createSuccessResponse } from '@/lib/utils/api-response';
import { handleError ,AppError} from '@/lib/utils/error-handler';
import { validateRequiredFields, validatePassword, validateOTP, validateEmail } from '@/lib/validators/auth';
import { SUCCESS_MESSAGES } from '@/constants/responseConstant/message';
import { HTTP_STATUS } from '@/constants/responseConstant/status-codes';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, otp, newPassword, confirmPassword } = body;

    validateRequiredFields(body, ['email', 'otp', 'newPassword', 'confirmPassword']);
    validateEmail(email);
    validateOTP(otp);
    validatePassword(newPassword);
    if (newPassword !== confirmPassword) {
      throw new AppError('Passwords do not match', HTTP_STATUS.BAD_REQUEST);
    }

    await resetUserPassword(email, otp, newPassword);

    return createSuccessResponse(
      null,
      SUCCESS_MESSAGES.PASSWORD_RESET
    );
  } catch (error) {
    return handleError(error);
  }
}