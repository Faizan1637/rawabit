import {
  findActiveSubscription,
  findUserSubscriptions,
  createSubscription,
  incrementViewedCount,
  recordProfileView,
  hasViewedProfile,
  getProfileViews,
} from '@/repositries/subscription.repositories';
import { findPackageById } from '@/repositries/package.repositories';
import { Subscription, SubscriptionResponse } from '@/types/subscription';
import { AppError } from '@/lib/utils/error-handler';
import { HTTP_STATUS } from '@/constants/responseConstant/status-codes';

export const sanitizeSubscription = (sub: Subscription): SubscriptionResponse => {
  const now = new Date();
  const isExpired = sub.endDate < now || sub.status !== 'active';

  return {
    id: sub._id!.toString(),
    userId: sub.userId.toString(),
    packageName: sub.packageName,
    startDate: sub.startDate.toISOString().split('T')[0],
    endDate: sub.endDate.toISOString().split('T')[0],
    totalCount: sub.totalCount,
    viewedCount: sub.viewedCount,
    remainingCount: sub.remainingCount,
    status: sub.status,
    expired: isExpired,
    channel: sub.channel,
  };
};

export const createNewSubscription = async (
  userId: string,
  packageId: string,
  channel: 'web' | 'mobile' = 'web'
): Promise<SubscriptionResponse> => {
  const pkg = await findPackageById(packageId);
  if (!pkg) {
    throw new AppError('Package not found', HTTP_STATUS.NOT_FOUND);
  }

  const startDate = new Date();
  const endDate = new Date();
  endDate.setMonth(endDate.getMonth() + pkg.validity);

  const subscriptionData: Omit<Subscription, '_id'> = {
    userId: userId as any,
    packageId: packageId as any,
    packageName: pkg.name,
    startDate,
    endDate,
    totalCount: pkg.totalCount,
    viewedCount: 0,
    remainingCount: pkg.totalCount,
    status: 'active',
    channel,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const subscriptionId = await createSubscription(subscriptionData);
  const subscription = { ...subscriptionData, _id: subscriptionId as any };
  
  return sanitizeSubscription(subscription as Subscription);
};

export const getUserActiveSubscription = async (
  userId: string
): Promise<SubscriptionResponse | null> => {
  const subscription = await findActiveSubscription(userId);
  console.log("Active subcritpion in service in active subscription function ..",subscription)
  if (!subscription) {
    return null;
  }
  return sanitizeSubscription(subscription);
};

export const getUserSubscriptions = async (userId: string) => {
  const subscriptions = await findUserSubscriptions(userId);
  console.log(" User Subscriptions in service file is ..",subscriptions)
  return subscriptions.map(sanitizeSubscription);
};

export const viewProfileContact = async (
  userId: string,
  profileId: string,
  profileName: string
): Promise<{ canView: boolean; message: string; subscription?: SubscriptionResponse }> => {
  const subscription = await findActiveSubscription(userId);

  if (!subscription) {
    return {
      canView: false,
      message: 'No active subscription found. Please purchase a package.',
    };
  }

  if (subscription.remainingCount <= 0) {
    return {
      canView: false,
      message: 'Your profile view limit has been reached. Please renew your subscription.',
      subscription: sanitizeSubscription(subscription),
    };
  }

  // Check if already viewed
  const alreadyViewed = await hasViewedProfile(subscription._id!.toString(), profileId);
  if (alreadyViewed) {
    return {
      canView: true,
      message: 'Contact already viewed',
      subscription: sanitizeSubscription(subscription),
    };
  }

  // Record the view
  await incrementViewedCount(subscription._id!.toString());
  
  const trackingCode = `${subscription._id!.toString().slice(-6)}-${Date.now()}`;
  
  await recordProfileView({
    subscriptionId: subscription._id!,
    userId: subscription.userId,
    viewedProfileId: profileId as any,
    profileName,
    trackingCode,
    profileLink: `/account/profile/${profileId}`,
    viewedAt: new Date(),
  });

  // Get updated subscription
  const updatedSub = await findActiveSubscription(userId);
  
  return {
    canView: true,
    message: 'Contact view recorded successfully',
    subscription: updatedSub ? sanitizeSubscription(updatedSub) : undefined,
  };
};

export const getSubscriptionProfileViews = async (subscriptionId: string) => {
  const views = await getProfileViews(subscriptionId);
  return views.map(view => ({
    name: view.profileName,
    trackingCode: view.trackingCode,
    profileLink: view.profileLink,
    viewedAt: view.viewedAt.toISOString(),
  }));
};