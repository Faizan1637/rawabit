export const authConfig = {
  jwtSecret: process.env.JWT_SECRET!,
  jwtExpiresIn: '7d',
  bcryptRounds: 12,
  cookieName: 'auth_token',
  cookieMaxAge: 7 * 24 * 60 * 60, // 7 days in seconds
} as const;