import { ObjectId } from 'mongodb';
import { getDatabase } from '@/lib/db/mongodb';
import { User } from '@/types';

const COLLECTION = 'users';
const PROFILES_COLLECTION = 'profiles';
const SUBSCRIPTIONS_COLLECTION = 'subscriptions';
const PROFILE_VIEWS_COLLECTION = 'profile_views';
const TRANSACTIONS_COLLECTION = 'transactions';

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
): Promise<boolean | User |null> => {
  const db = await getDatabase();
  const result = await db.collection<User>(COLLECTION).updateOne(
    { _id: new ObjectId(id) },
    { $set: { ...data, updatedAt: new Date() } }
  );
  const user=await db.collection<User>(COLLECTION).findOne({ _id: new ObjectId(id) })
  if(result.modifiedCount > 0){
    return user;
  }
  return result.modifiedCount > 0;
};

export const deleteUser = async (id: string): Promise<boolean> => {
  const db = await getDatabase();
  const userObjectId = new ObjectId(id);

  try {
    // 1. Find user's profile to get profile ID
    const profile = await db
      .collection(PROFILES_COLLECTION)
      .findOne({ userId: userObjectId });

    // 2. Find user's subscriptions to get subscription IDs
    const subscriptions = await db
      .collection(SUBSCRIPTIONS_COLLECTION)
      .find({ userId: id })
      .toArray();

    const subscriptionIds = subscriptions.map(sub => sub._id);

    // 3. Delete profile views associated with user's subscriptions
    if (subscriptionIds.length > 0) {
      await db.collection(PROFILE_VIEWS_COLLECTION).deleteMany({
        subscriptionId: { $in: subscriptionIds },
      });
    }

    // 4. Delete profile views where user's profile was viewed
    if (profile) {
      await db.collection(PROFILE_VIEWS_COLLECTION).deleteMany({
        viewedProfileId: profile._id,
      });
    }

    // 5. Delete user's subscriptions
    await db.collection(SUBSCRIPTIONS_COLLECTION).deleteMany({
      userId: id,
    });

    // 6. Delete user's transactions
    await db.collection(TRANSACTIONS_COLLECTION).deleteMany({
      userId: id,
    });

    // 7. Delete user's profile
    await db.collection(PROFILES_COLLECTION).deleteMany({
      userId: userObjectId,
    });

    // 8. Finally, delete the user
    const result = await db.collection<User>(COLLECTION).deleteOne({
      _id: userObjectId,
    });

    return result.deletedCount > 0;
  } catch (error) {
    console.error('Error during cascading delete:', error);
    throw new Error('Failed to delete user and related data');
  }
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

export const setResetOTP = async (userId: string, otp: string, expires: Date): Promise<boolean> => {
  const db = await getDatabase();
  const result = await db.collection<User>(COLLECTION).updateOne(
    { _id: new ObjectId(userId) },
    {
      $set: {
        resetOTP: otp,
        resetOTPExpires: expires,
        updatedAt: new Date(),
      },
    }
  );
  return result.modifiedCount > 0;
};

export const clearResetOTP = async (userId: string): Promise<boolean> => {
  const db = await getDatabase();
  const result = await db.collection<User>(COLLECTION).updateOne(
    { _id: new ObjectId(userId) },
    {
      $unset: { resetOTP: '', resetOTPExpires: '' },
      $set: { updatedAt: new Date() },
    }
  );
  return result.modifiedCount > 0;
};