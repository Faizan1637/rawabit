import { ObjectId } from 'mongodb';
import { getDatabase } from '@/lib/db/mongodb';
import { Profile } from '@/types/profile';

const COLLECTION = 'profiles';
const SUBSCRIPTIONS_COLLECTION = 'subscriptions';

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
  filters?: Partial<Profile>
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
    'firstName',
    'lastName',
    'email',
    'gender',
    'dateOfBirth',
    'height',
    'bodyType',
    'complexion',
    'rishtaCreatedBy',  // NEW: Required field
    'fathersName',
    'fatherAlive',
    'fathersOccupation',
    'address',
    'fromCountry',
    'fromState',
    'fromCity',
    'religion',
    'caste',
    'qualification',
    'profession',
    'maritalStatus'
  ] as const;

  type RequiredField = (typeof requiredFields)[number];

  const rec = profile as unknown as Record<RequiredField, unknown>;

  for (const field of requiredFields) {
    const value = rec[field];

    // missing or null
    if (value === undefined || value === null) return false;

    // empty string check
    if (typeof value === 'string' && value.trim() === '') return false;
  }

  // Gender-specific validation
  if (profile.gender === 'male') {
    // Male profiles must have hasBeard
    if (!profile.hasBeard || profile.hasBeard.trim() === '') return false;
  } else if (profile.gender === 'female') {
    // Female profiles must have hasHijab
    if (!profile.hasHijab || profile.hasHijab.trim() === '') return false;
  }

  return true;
};

/**
 * Get latest featured profiles from users with active subscriptions
 */
export const getFeaturedProfiles = async (limit: number = 8): Promise<Profile[]> => {
  const db = await getDatabase();
  const now = new Date();

  const activeSubscriptions = await db
    .collection(SUBSCRIPTIONS_COLLECTION)
    .find({
      status: 'active',
      endDate: { $gte: now },
    })
    .toArray();

  const subscribedUserIds = [...new Set(activeSubscriptions.map(sub => sub.userId))];

  if (subscribedUserIds.length === 0) {
    return [];
  }

  const userObjectIds = subscribedUserIds
    .map(id => {
      try {
        return typeof id === 'string' ? new ObjectId(id) : id;
      } catch {
        return null;
      }
    })
    .filter((id): id is ObjectId => id !== null);

  if (userObjectIds.length === 0) {
    return [];
  }

  const profiles = await db
    .collection<Profile>(COLLECTION)
    .find({
      userId: { $in: userObjectIds },
      isComplete: true,
    })
    .sort({ createdAt: -1 })
    .limit(limit)
    .toArray();

  return profiles;
};