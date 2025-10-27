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