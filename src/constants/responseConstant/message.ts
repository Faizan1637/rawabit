export const ERROR_MESSAGES = {
  UNAUTHORIZED: 'Unauthorized access',
  FORBIDDEN: 'Access forbidden',
  NOT_FOUND: 'Resource not found',
  BAD_REQUEST: 'Invalid request',
  INTERNAL_ERROR: 'Internal server error',
  USER_EXISTS: 'User already exists',
  INVALID_CREDENTIALS: 'Invalid email or password',
  MISSING_FIELDS: 'Missing required fields',
  INVALID_EMAIL: 'Invalid email format',
  WEAK_PASSWORD: 'Password must be at least 8 characters',
  PROFILE_EXISTS: 'Profile already exists for this user',
  PROFILE_NOT_FOUND: 'Profile not found',
  INQUIRY_NOT_FOUND: 'Inquiry not found',
} as const;

export const SUCCESS_MESSAGES = {
  USER_CREATED: 'User created successfully',
  USER_UPDATED: 'User updated successfully',
  USER_DELETED: 'User deleted successfully',
  LOGIN_SUCCESS: 'Login successful',
  LOGOUT_SUCCESS: 'Logout successful',
  PROFILE_CREATED: 'Profile created successfully',
  PROFILE_UPDATED: 'Profile updated successfully',
  PROFILE_DELETED: 'Profile deleted successfully',
  PASSWORD_CHANGED: 'Password changed successfully',
  INQUIRY_SENT: 'Your message has been sent successfully',
  INQUIRY_UPDATED: 'Inquiry updated successfully',
} as const;