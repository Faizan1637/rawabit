// src/app/api/auth/forgot-password/route.ts
import { NextRequest } from 'next/server';
import { sendResetOTP } from '@/services/backened/auth.service';
import { createSuccessResponse } from '@/lib/utils/api-response';
import { handleError } from '@/lib/utils/error-handler';
import { validateRequiredFields, validateEmail } from '@/lib/validators/auth';
import { SUCCESS_MESSAGES } from '@/constants/responseConstant/message';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;

    validateRequiredFields(body, ['email']);
    validateEmail(email);

    await sendResetOTP(email);

    return createSuccessResponse(
      null,
      'OTP sent to your email'
    );
  } catch (error) {
    return handleError(error);
  }
}