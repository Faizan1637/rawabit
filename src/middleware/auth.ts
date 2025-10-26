import { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth/jwt';
import { authConfig } from '@/config/auth';
import { AppError } from '@/lib/utils/error-handler';
import { ERROR_MESSAGES } from '@/constants/responseConstant/message';
import { HTTP_STATUS } from '@/constants/responseConstant/status-codes';

export const verifyAuth = async (request: NextRequest): Promise<string> => {
  const token = request.cookies.get(authConfig.cookieName)?.value;

  if (!token) {
    throw new AppError(ERROR_MESSAGES.UNAUTHORIZED, HTTP_STATUS.UNAUTHORIZED);
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    throw new AppError(ERROR_MESSAGES.UNAUTHORIZED, HTTP_STATUS.UNAUTHORIZED);
  }

  return decoded.userId;
};