import { ObjectId } from 'mongodb';

export interface Package {
  _id?: ObjectId;
  name: string;
  price: number;
  validity: number; // in months
  totalCount: number; // total profiles that can be viewed
  features: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface PackageResponse {
  id: string;
  name: string;
  price: number;
  validity: number;
  totalCount: number;
  features: string[];
  isActive: boolean;
}