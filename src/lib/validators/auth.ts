import { AppError } from '@/lib/utils/error-handler';
import { ERROR_MESSAGES } from '@/constants/responseConstant/message';
import { HTTP_STATUS } from '@/constants/responseConstant/status-codes';

export const validateEmail = (email: string): void => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new AppError(ERROR_MESSAGES.INVALID_EMAIL, HTTP_STATUS.BAD_REQUEST);
  }
};

export const validatePassword = (password: string): void => {
  if (password.length < 8) {
    throw new AppError(ERROR_MESSAGES.WEAK_PASSWORD, HTTP_STATUS.BAD_REQUEST);
  }
};

export const validateRequiredFields = (
  data: Record<string, any>,
  fields: string[]
): void => {
  const missing = fields.filter(field => !data[field] || data[field].trim() === '');
  if (missing.length > 0) {
    throw new AppError(
      `${ERROR_MESSAGES.MISSING_FIELDS}: ${missing.join(', ')}`,
      HTTP_STATUS.BAD_REQUEST
    );
  }
};