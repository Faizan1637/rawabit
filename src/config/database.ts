export const databaseConfig = {
  uri: process.env.MONGODB_URI!,
  name: process.env.DB_NAME || 'myapp',
} as const;