// src/app/api/auth/verify-otp/route.ts
import { NextRequest } from 'next/server';
import { verifyResetOTP } from '@/services/backened/auth.service';
import { createSuccessResponse } from '@/lib/utils/api-response';
import { handleError } from '@/lib/utils/error-handler';
import { validateRequiredFields, validateOTP, validateEmail } from '@/lib/validators/auth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, otp } = body;

    validateRequiredFields(body, ['email', 'otp']);
    validateEmail(email);
    validateOTP(otp);

    const valid = await verifyResetOTP(email, otp);

    return createSuccessResponse(
      { valid },
      valid ? 'OTP verified' : 'Invalid OTP'
    );
  } catch (error) {
    return handleError(error);
  }
}