import { hashPassword, verifyPassword } from '@/lib/auth/password';
import { findUserByEmail, createUser, findUserById } from '@/repositries/user.repositories';
import { CreateUserInput, LoginInput, User, UserResponse } from '@/types';
import { AppError } from '@/lib/utils/error-handler';
import { ERROR_MESSAGES } from '@/constants/responseConstant/message';
import { HTTP_STATUS } from '@/constants/responseConstant/status-codes';

// UPDATE the sanitizeUser function
export const sanitizeUser = (user: User): UserResponse => {
  return {
    id: user._id!.toString(),
    email: user.email,
    firstName: user.firstName,                         
    lastName: user.lastName,                           
    fullName: `${user.firstName} ${user.lastName}`,    
    gender: user.gender,                                
    dateOfBirth: user.dateOfBirth,                      
    role: user.role,
  };
};

// UPDATE the registerUser function
export const registerUser = async (
  input: CreateUserInput
): Promise<{ user: UserResponse; userId: string }> => {
  // Check if user exists
  const existingUser = await findUserByEmail(input.email);
  if (existingUser) {
    throw new AppError(ERROR_MESSAGES.USER_EXISTS, HTTP_STATUS.CONFLICT);
  }

  // Hash password
  const hashedPassword = await hashPassword(input.password);

  // Create user with NEW fields
  const userId = await createUser({
    firstName: input.firstName,          // NEW
    lastName: input.lastName,            // NEW
    email: input.email,
    password: hashedPassword,
    gender: input.gender,                // NEW
    dateOfBirth: input.dateOfBirth,      // NEW
    role: 'user',
    profileCompleted:false,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const user = await findUserById(userId);
  if (!user) {
    throw new AppError(ERROR_MESSAGES.INTERNAL_ERROR, HTTP_STATUS.INTERNAL_ERROR);
  }

  return {
    user: sanitizeUser(user),
    userId,
  };
};

export const loginUser = async (
  input: LoginInput
): Promise<{ user: UserResponse; userId: string }> => {
  const user = await findUserByEmail(input.email);
  if (!user) {
    throw new AppError(ERROR_MESSAGES.INVALID_CREDENTIALS, HTTP_STATUS.UNAUTHORIZED);
  }

  const isValidPassword = await verifyPassword(input.password, user.password);
  if (!isValidPassword) {
    throw new AppError(ERROR_MESSAGES.INVALID_CREDENTIALS, HTTP_STATUS.UNAUTHORIZED);
  }

  return {
    user: sanitizeUser(user),
    userId: user._id!.toString(),
  };
};

export const getUserById = async (id: string): Promise<UserResponse> => {
  const user = await findUserById(id);
  if (!user) {
    throw new AppError(ERROR_MESSAGES.NOT_FOUND, HTTP_STATUS.NOT_FOUND);
  }
  return sanitizeUser(user);
};