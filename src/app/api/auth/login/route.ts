import { NextRequest } from 'next/server';
import { loginUser } from '@/services/backened/auth.service';
import { generateToken } from '@/lib/auth/jwt';
import { setAuthCookie } from '@/lib/auth/cookies';
import { createSuccessResponse } from '@/lib/utils/api-response';
import { handleError } from '@/lib/utils/error-handler';
import { validateEmail, validateRequiredFields } from '@/lib/validators/auth';
import { SUCCESS_MESSAGES } from '@/constants/responseConstant/message';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    // Validate input
    validateRequiredFields(body, ['email', 'password']);
    validateEmail(email);

    // Login user
    const { user, userId } = await loginUser({ email, password });

    // Generate token
    const token = generateToken(userId);

    // Create response with cookie
    const response = createSuccessResponse(
      { user },
      SUCCESS_MESSAGES.LOGIN_SUCCESS
    );

    return setAuthCookie(response, token);
  } catch (error) {
    return handleError(error);
  }
}