import { AppError } from '@/lib/utils/error-handler';
import { ERROR_MESSAGES } from '@/constants/responseConstant/message';
import { HTTP_STATUS } from '@/constants/responseConstant/status-codes';

export const validateFullName = (name: string): void => {
  if (!name || name.trim().length < 2) {
    throw new AppError(
      'Full name must be at least 2 characters',
      HTTP_STATUS.BAD_REQUEST
    );
  }
  
  if (name.trim().length > 100) {
    throw new AppError(
      'Full name must not exceed 100 characters',
      HTTP_STATUS.BAD_REQUEST
    );
  }
};

export const validateInquiryPhone = (phone: string): void => {
  // Accept formats: +92-XXX-XXXXXXX or +923001234567
  const phoneRegex = /^\+92-?\d{3}-?\d{7}$/;
  if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
    throw new AppError(
      'Phone number must be in format +92-XXX-XXXXXXX',
      HTTP_STATUS.BAD_REQUEST
    );
  }
};

export const validateMessage = (message: string): void => {
  if (!message || message.trim().length < 10) {
    throw new AppError(
      'Message must be at least 10 characters',
      HTTP_STATUS.BAD_REQUEST
    );
  }
  
  if (message.trim().length > 2000) {
    throw new AppError(
      'Message must not exceed 2000 characters',
      HTTP_STATUS.BAD_REQUEST
    );
  }
};

export const validateInquiryFields = (data: any, fields: string[]): void => {
  const missing = fields.filter(field => {
    const value = data[field];
    return value === undefined || value === null || value === '';
  });
  
  if (missing.length > 0) {
    throw new AppError(
      `Missing required fields: ${missing.join(', ')}`,
      HTTP_STATUS.BAD_REQUEST
    );
  }
};