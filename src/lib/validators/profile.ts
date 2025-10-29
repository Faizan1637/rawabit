import { AppError } from '@/lib/utils/error-handler';
import { ERROR_MESSAGES } from '@/constants/responseConstant/message';
import { HTTP_STATUS } from '@/constants/responseConstant/status-codes';

export const validateHeight = (height: string): void => {
  const heightRegex = /^\d+ft\s\d+in$/;
  if (!heightRegex.test(height)) {
    throw new AppError(
      'Height must be in format "6ft 2in"',
      HTTP_STATUS.BAD_REQUEST
    );
  }
};

export const validatePhoneNumber = (phone: string): void => {
  const phoneRegex = /^\+\d{10,15}$/;
  if (!phoneRegex.test(phone)) {
    throw new AppError(
      'Phone number must be in format +923001234567',
      HTTP_STATUS.BAD_REQUEST
    );
  }
};

export const validateMonthlyIncome = (income: number): void => {
  if (income < 0) {
    throw new AppError(
      'Monthly income cannot be negative',
      HTTP_STATUS.BAD_REQUEST
    );
  }
  if (income > 10000000) {
    throw new AppError(
      'Monthly income seems unrealistic',
      HTTP_STATUS.BAD_REQUEST
    );
  }
};

export const validateNumberOfSiblings = (count: number, field: string): void => {
  if (count < 0 || count > 30) {
    throw new AppError(
      `${field} must be between 0 and 30`,
      HTTP_STATUS.BAD_REQUEST
    );
  }
};

export const validateMaritalStatus = (status: string): void => {
  const validStatuses = ['single', 'divorced', 'widowed'];
  if (!validStatuses.includes(status.toLowerCase())) {
    throw new AppError(
      'Marital status must be single, divorced, or widowed',
      HTTP_STATUS.BAD_REQUEST
    );
  }
};

export const validateRequiredProfileFields = (data: any, fields: string[]): void => {
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