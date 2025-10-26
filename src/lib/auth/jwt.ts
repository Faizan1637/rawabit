import jwt from 'jsonwebtoken';
import { authConfig } from '@/config/auth';

export const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, authConfig.jwtSecret, {
    expiresIn: authConfig.jwtExpiresIn,
  });
};

export const verifyToken = (token: string): { userId: string } | null => {
  try {
    return jwt.verify(token, authConfig.jwtSecret) as { userId: string };
  } catch {
    return null;
  }
};