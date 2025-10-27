export interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: 'male' | 'female' | 'other';
  day: string;
  month: string;
  year: string;
  agreeToTerms: boolean;
}

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  gender: string;
  dateOfBirth: string; // ISO format: YYYY-MM-DD
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  data?: {
    user: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
      fullName: string;
      gender: string;
      dateOfBirth: string;
      role: string;
    };
  };
  message?: string;
  error?: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  gender: string;
  dateOfBirth: string;
  role: string;
}