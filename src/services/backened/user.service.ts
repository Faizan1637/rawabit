// services/backend/user.service.ts
import { findUserById, updateUser, deleteUser, findAllUsers } from '@/repositries/user.repositories';
import { UpdateUserInput, UserResponse } from '@/types';
import { AppError } from '@/lib/utils/error-handler';
import { ERROR_MESSAGES } from '@/constants/responseConstant/message';
import { HTTP_STATUS } from '@/constants/responseConstant/status-codes';
import { sanitizeUser } from './auth.service';

export const getUser = async (id: string): Promise<UserResponse> => {
  const user = await findUserById(id);
  if (!user) {
    throw new AppError(ERROR_MESSAGES.NOT_FOUND, HTTP_STATUS.NOT_FOUND);
  }
  return sanitizeUser(user);
};

export const updateUserProfile = async (
  id: string,
  input: UpdateUserInput
): Promise<UserResponse> => {
  const updated = await updateUser(id, input);
  if (!updated) {
    throw new AppError(ERROR_MESSAGES.NOT_FOUND, HTTP_STATUS.NOT_FOUND);
  }

  const user = await findUserById(id);
  return sanitizeUser(user!);
};

// NEW: Update user status (active/blocked)
export const updateUserStatus = async (
  id: string,
  status: 'active' | 'blocked'
): Promise<UserResponse> => {
  const user = await findUserById(id);
  if (!user) {
    throw new AppError(ERROR_MESSAGES.NOT_FOUND, HTTP_STATUS.NOT_FOUND);
  }

  const updated = await updateUser(id, { status });
  if (!updated) {
    throw new AppError('Failed to update user status', HTTP_STATUS.INTERNAL_ERROR);
  }

  const updatedUser = await findUserById(id);
  return sanitizeUser(updatedUser!);
};

export const removeUser = async (id: string): Promise<boolean> => {
  const deleted = await deleteUser(id);
  if (!deleted) {
    throw new AppError(ERROR_MESSAGES.NOT_FOUND, HTTP_STATUS.NOT_FOUND);
  }
  return true;
};

export const getAllUsers = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  const { users, total } = await findAllUsers(skip, limit);

  return {
    data: users.map(sanitizeUser),
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};