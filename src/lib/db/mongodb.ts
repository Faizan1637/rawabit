import { MongoClient, Db } from 'mongodb';
import { databaseConfig } from '@/config/database';

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export const connectToDatabase = async () => {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = await MongoClient.connect(databaseConfig.uri);
  const db = client.db(databaseConfig.name);

  cachedClient = client;
  cachedDb = db;

  return { client, db };
};

export const getDatabase = async (): Promise<Db> => {
  const { db } = await connectToDatabase();
  return db;
};