import { ObjectId } from 'mongodb';
import { getDatabase } from '@/lib/db/mongodb';
import { User } from '@/types';

const COLLECTION = 'users';

export const findUserByEmail = async (email: string): Promise<User | null> => {
  const db = await getDatabase();
  return await db.collection<User>(COLLECTION).findOne({ email });
};

export const findUserById = async (id: string): Promise<User | null> => {
  const db = await getDatabase();
  return await db.collection<User>(COLLECTION).findOne({ _id: new ObjectId(id) });
};

export const createUser = async (user: Omit<User, '_id'>): Promise<string> => {
  const db = await getDatabase();
  const result = await db.collection<User>(COLLECTION).insertOne(user);
  return result.insertedId.toString();
};

export const updateUser = async (
  id: string,
  data: Partial<User>
): Promise<boolean> => {
  const db = await getDatabase();
  const result = await db.collection<User>(COLLECTION).updateOne(
    { _id: new ObjectId(id) },
    { $set: { ...data, updatedAt: new Date() } }
  );
  return result.modifiedCount > 0;
};

export const deleteUser = async (id: string): Promise<boolean> => {
  const db = await getDatabase();
  const result = await db.collection<User>(COLLECTION).deleteOne({
    _id: new ObjectId(id),
  });
  return result.deletedCount > 0;
};

export const findAllUsers = async (skip = 0, limit = 10) => {
  const db = await getDatabase();
  
  const users = await db
    .collection<User>(COLLECTION)
    .find()
    .skip(skip)
    .limit(limit)
    .toArray();
  
  const total = await db.collection<User>(COLLECTION).countDocuments();
  
  return { users, total };
};