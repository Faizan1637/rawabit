import { createErrorResponse } from './api-response';
import { ERROR_MESSAGES } from '@/constants/responseConstant/message';
import { HTTP_STATUS } from '@/constants/responseConstant/status-codes';

export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = HTTP_STATUS.INTERNAL_ERROR
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export const handleError = (error: unknown) => {
  console.error('API Error:', error);

  if (error instanceof AppError) {
    return createErrorResponse(error.message, error.statusCode);
  }

  if (error instanceof Error) {
    return createErrorResponse(error.message, HTTP_STATUS.INTERNAL_ERROR);
  }

  return createErrorResponse(
    ERROR_MESSAGES.INTERNAL_ERROR,
    HTTP_STATUS.INTERNAL_ERROR
  );
};