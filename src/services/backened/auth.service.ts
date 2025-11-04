import { hashPassword, verifyPassword } from '@/lib/auth/password';
import { findUserByEmail, createUser, findUserById,updateUser } from '@/repositries/user.repositories';
import { CreateUserInput, LoginInput, User, UserResponse } from '@/types';
import { AppError } from '@/lib/utils/error-handler';
import { ERROR_MESSAGES } from '@/constants/responseConstant/message';
import { HTTP_STATUS } from '@/constants/responseConstant/status-codes';
import { setResetOTP, clearResetOTP } from '@/repositries/user.repositories';
import { sendResetOTPEmail } from './email.service';  

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
    profileCompleted:user.profileCompleted,
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

export const changeUserPassword = async (
  userId: string,
  currentPassword: string,
  newPassword: string
): Promise<void> => {
  const user = await findUserById(userId);
  if (!user) {
    throw new AppError(ERROR_MESSAGES.NOT_FOUND, HTTP_STATUS.NOT_FOUND);
  }

  // Verify current password
  const isValid = await verifyPassword(currentPassword, user.password);
  if (!isValid) {
    throw new AppError(ERROR_MESSAGES.INVALID_CREDENTIALS, HTTP_STATUS.UNAUTHORIZED);
  }

  // Hash new password
  const hashedPassword = await hashPassword(newPassword);

  // Update
  const updated = await updateUser(userId, { password: hashedPassword });
  if (!updated) {
    throw new AppError(ERROR_MESSAGES.INTERNAL_ERROR, HTTP_STATUS.INTERNAL_ERROR);
  }
}


export const sendResetOTP = async (email: string): Promise<void> => {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new AppError(ERROR_MESSAGES.NOT_FOUND, HTTP_STATUS.NOT_FOUND);
  }

  // Generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // Set expiry (10 minutes)
  const expires = new Date(Date.now() + 10 * 60 * 1000);

  // Save to user
  const saved = await setResetOTP(user._id!.toString(), otp, expires);
  if (!saved) {
    throw new AppError(ERROR_MESSAGES.INTERNAL_ERROR, HTTP_STATUS.INTERNAL_ERROR);
  }

  // Send email
  await sendResetOTPEmail({ email, otp });
};

export const verifyResetOTP = async (email: string, otp: string): Promise<boolean> => {
  const user = await findUserByEmail(email);
  if (!user || !user.resetOTP || !user.resetOTPExpires) {
    throw new AppError(ERROR_MESSAGES.INVALID_OTP, HTTP_STATUS.BAD_REQUEST);
  }

  // Check expiry
  if (new Date() > user.resetOTPExpires) {
    await clearResetOTP(user._id!.toString());
    throw new AppError(ERROR_MESSAGES.OTP_EXPIRED, HTTP_STATUS.BAD_REQUEST);
  }

  // Check OTP
  if (user.resetOTP !== otp) {
    throw new AppError(ERROR_MESSAGES.INVALID_OTP, HTTP_STATUS.BAD_REQUEST);
  }

  return true;
};

export const resetUserPassword = async (
  email: string,
  otp: string,
  newPassword: string
): Promise<void> => {
  // Verify OTP first
  const valid = await verifyResetOTP(email, otp);
  if (!valid) {
    throw new AppError(ERROR_MESSAGES.INVALID_OTP, HTTP_STATUS.BAD_REQUEST);
  }

  const user = await findUserByEmail(email);
  const hashed = await hashPassword(newPassword);

  const updated = await updateUser(user!._id!.toString(), { password: hashed });
  if (!updated) {
    throw new AppError(ERROR_MESSAGES.INTERNAL_ERROR, HTTP_STATUS.INTERNAL_ERROR);
  }

  // Clear OTP
  await clearResetOTP(user!._id!.toString());
};