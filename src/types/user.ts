// ADD these new fields to existing types

export interface User {
  _id?: Object;
  firstName: string;      // NEW - replace 'name'
  lastName: string;       // NEW
  email: string;
  password: string;
  gender: string;         // NEW
  dateOfBirth: string;    // NEW (ISO format: YYYY-MM-DD)
  role: 'user' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}

export interface UserResponse {
  id: string;
  email: string;
  firstName: string;      // NEW
  lastName: string;       // NEW
  fullName: string;       // NEW (computed)
  gender: string;         // NEW
  dateOfBirth: string;    // NEW
  role: string;
}

export interface CreateUserInput {
  firstName: string;      // NEW - replace 'name'
  lastName: string;       // NEW
  email: string;
  password: string;
  gender: string;         // NEW
  dateOfBirth: string;    // NEW
}
export interface UpdateUserInput {
  name?: string;
  email?: string;
}

export interface LoginInput {
  email: string;
  password: string;
}