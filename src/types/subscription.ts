import { ObjectId } from 'mongodb';

export interface Subscription {
  _id?: ObjectId;
  userId: ObjectId;
  packageId: ObjectId;
  packageName: string;
  startDate: Date;
  endDate: Date;
  totalCount: number;
  viewedCount: number;
  remainingCount: number;
  status: 'active' | 'expired' | 'cancelled';
  channel: 'web' | 'mobile';
  createdAt: Date;
  updatedAt: Date;
}

export interface SubscriptionResponse {
  id: string;
  userId: string;
  packageName: string;
  startDate: string;
  endDate: string;
  totalCount: number;
  viewedCount: number;
  remainingCount: number;
  status: string;
  expired: boolean;
  channel: string;
}

export interface ProfileView {
  _id?: ObjectId;
  subscriptionId: ObjectId;
  userId: ObjectId;
  viewedProfileId: ObjectId;
  profileName: string;
  trackingCode: string;
  profileLink: string;
  viewedAt: Date;
}