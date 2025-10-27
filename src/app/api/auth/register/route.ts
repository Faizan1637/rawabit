import { NextRequest } from 'next/server';
import { registerUser } from '@/services/backened/auth.service';
import { generateToken } from '@/lib/auth/jwt';
import { setAuthCookie } from '@/lib/auth/cookies';
import { createCreatedResponse } from '@/lib/utils/api-response';
import { handleError } from '@/lib/utils/error-handler';
import { validateEmail, validatePassword, validateRequiredFields } from '@/lib/validators/auth';
import { SUCCESS_MESSAGES } from '@/constants/responseConstant/message';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password, firstName,lastName,dateOfBirth,gender} = body;

    // Validate input
    validateRequiredFields(body, ['email', 'password','firstName','lastName','dateOfBirth']);
    validateEmail(email);
    validatePassword(password);

    // Register user
    const { user, userId } = await registerUser({ email, password, firstName,lastName,dateOfBirth,gender});

    // Generate token
    const token = generateToken(userId);

    // Create response with cookie
    const response = createCreatedResponse(
      { user },
      SUCCESS_MESSAGES.USER_CREATED
    );

    return setAuthCookie(response, token);
  } catch (error) {
    return handleError(error);
  }
}