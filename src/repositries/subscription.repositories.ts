import { ObjectId } from 'mongodb';
import { getDatabase } from '@/lib/db/mongodb';
import { Subscription, ProfileView } from '@/types/subscription';

const SUBSCRIPTION_COLLECTION = 'subscriptions';
const PROFILE_VIEW_COLLECTION = 'profile_views';

export const findActiveSubscription = async (
  userId: string
): Promise<Subscription | null> => {
  const db = await getDatabase();
  const now = new Date();

  // ✅ userId is a string, so match as string
  return await db.collection<Subscription>(SUBSCRIPTION_COLLECTION).findOne({
    userId: userId,
    status: 'active',
    endDate: { $gte: now },
    remainingCount: { $gt: 0 },
  });
};

export const findUserSubscriptions = async (id: string) => {
  const db = await getDatabase();
  return await db
    .collection<Subscription>(SUBSCRIPTION_COLLECTION)
    .find({ userId: id }) // ✅ string match
    .sort({ createdAt: -1 })
    .toArray();
};

export const createSubscription = async (
  subscription: Omit<Subscription, '_id'>
): Promise<string> => {
  const db = await getDatabase();
  const result = await db
    .collection<Subscription>(SUBSCRIPTION_COLLECTION)
    .insertOne(subscription);
  return result.insertedId.toString();
};

export const incrementViewedCount = async (subscriptionId: string): Promise<boolean> => {
  const db = await getDatabase();
  const result = await db
    .collection<Subscription>(SUBSCRIPTION_COLLECTION)
    .updateOne(
      { _id: new ObjectId(subscriptionId) }, // ✅ _id remains ObjectId
      {
        $inc: { viewedCount: 1, remainingCount: -1 },
        $set: { updatedAt: new Date() },
      }
    );
  return result.modifiedCount > 0;
};

export const recordProfileView = async (
  profileView: Omit<ProfileView, '_id'>
): Promise<string> => {
  const db = await getDatabase();
  const result = await db
    .collection<ProfileView>(PROFILE_VIEW_COLLECTION)
    .insertOne(profileView);
  return result.insertedId.toString();
};

export const hasViewedProfile = async (
  subscriptionId: string,
  profileId: string
): Promise<boolean> => {
  const db = await getDatabase();
  const count = await db
    .collection<ProfileView>(PROFILE_VIEW_COLLECTION)
    .countDocuments({
      subscriptionId: new ObjectId(subscriptionId), // ✅ these are ObjectIds
      viewedProfileId: new ObjectId(profileId),
    });
  return count > 0;
};

export const getProfileViews = async (subscriptionId: string) => {
  const db = await getDatabase();
  return await db
    .collection<ProfileView>(PROFILE_VIEW_COLLECTION)
    .find({ subscriptionId: new ObjectId(subscriptionId) })
    .sort({ viewedAt: -1 })
    .toArray();
};
