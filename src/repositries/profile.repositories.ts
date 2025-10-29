import { ObjectId } from 'mongodb';
import { getDatabase } from '@/lib/db/mongodb';
import { Profile } from '@/types/profile';

const COLLECTION = 'profiles';

export const findProfileByUserId = async (userId: string): Promise<Profile | null> => {
  const db = await getDatabase();
  return await db
    .collection<Profile>(COLLECTION)
    .findOne({ userId: new ObjectId(userId) });
};

export const findProfileById = async (id: string): Promise<Profile | null> => {
  const db = await getDatabase();
  return await db
    .collection<Profile>(COLLECTION)
    .findOne({ _id: new ObjectId(id) });
};

export const createProfile = async (profile: Omit<Profile, '_id'>): Promise<string> => {
  const db = await getDatabase();
  const result = await db.collection<Profile>(COLLECTION).insertOne(profile);
  return result.insertedId.toString();
};

export const updateProfile = async (
  id: string,
  data: Partial<Profile>
): Promise<boolean> => {
  const db = await getDatabase();
  const result = await db.collection<Profile>(COLLECTION).updateOne(
    { _id: new ObjectId(id) },
    { $set: { ...data, updatedAt: new Date() } }
  );
  return result.modifiedCount > 0;
};

export const updateProfileByUserId = async (
  userId: string,
  data: Partial<Profile>
): Promise<boolean> => {
  const db = await getDatabase();
  const result = await db.collection<Profile>(COLLECTION).updateOne(
    { userId: new ObjectId(userId) },
    { $set: { ...data, updatedAt: new Date() } }
  );
  return result.modifiedCount > 0;
};

export const deleteProfile = async (id: string): Promise<boolean> => {
  const db = await getDatabase();
  const result = await db.collection<Profile>(COLLECTION).deleteOne({
    _id: new ObjectId(id),
  });
  return result.deletedCount > 0;
};

export const findAllProfiles = async (
  skip = 0,
  limit = 10,
  filters?: any
) => {
  const db = await getDatabase();
  
  const query = filters || {};
  
  const profiles = await db
    .collection<Profile>(COLLECTION)
    .find(query)
    .skip(skip)
    .limit(limit)
    .toArray();
  
  const total = await db.collection<Profile>(COLLECTION).countDocuments(query);
  
  return { profiles, total };
};

export const checkProfileCompletion = (profile: Profile): boolean => {
  const requiredFields = [
    'firstName', 'lastName', 'email', 'gender', 'dateOfBirth',
    'height', 'bodyType', 'complexion', 'fathersName', 'fatherAlive',
    'fathersOccupation', 'address', 'fromCountry', 'fromState', 'fromCity',
    'religion', 'caste', 'qualification', 'profession', 'maritalStatus'
  ];
  
  return requiredFields.every(field => {
    const value = (profile as any)[field];
    return value !== undefined && value !== null && value !== '';
  });
};