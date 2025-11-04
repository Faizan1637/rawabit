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

// ADD these new validator functions

export const validateName = (name: string, fieldName: string): void => {
  if (!name || name.trim().length < 2) {
    throw new AppError(
      `${fieldName} must be at least 2 characters`,
      HTTP_STATUS.BAD_REQUEST
    );
  }
  
  if (name.trim().length > 50) {
    throw new AppError(
      `${fieldName} must not exceed 50 characters`,
      HTTP_STATUS.BAD_REQUEST
    );
  }
};

export const validateGender = (gender: string): void => {
  const validGenders = ['male', 'female', 'other'];
  if (!validGenders.includes(gender.toLowerCase())) {
    throw new AppError(
      'Gender must be male, female, or other',
      HTTP_STATUS.BAD_REQUEST
    );
  }
};

export const validateDateOfBirth = (dateOfBirth: string): void => {
  // Check if valid date format
  const date = new Date(dateOfBirth);
  
  if (isNaN(date.getTime())) {
    throw new AppError(
      'Invalid date of birth format',
      HTTP_STATUS.BAD_REQUEST
    );
  }

  // Check if user is at least 13 years old
  const thirteenYearsAgo = new Date();
  thirteenYearsAgo.setFullYear(thirteenYearsAgo.getFullYear() - 13);
  
  if (date > thirteenYearsAgo) {
    throw new AppError(
      'You must be at least 13 years old to register',
      HTTP_STATUS.BAD_REQUEST
    );
  }
  
  // Check if date is not in the future
  if (date > new Date()) {
    throw new AppError(
      'Date of birth cannot be in the future',
      HTTP_STATUS.BAD_REQUEST
    );
  }
};

export const validateOTP = (otp: string): void => {
  const otpRegex = /^\d{6}$/;  // 6-digit number
  if (!otpRegex.test(otp)) {
    throw new AppError('Invalid OTP format', HTTP_STATUS.BAD_REQUEST);
  }
};