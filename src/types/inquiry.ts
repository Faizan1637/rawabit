import { ObjectId } from 'mongodb';

export interface Inquiry {
  _id?: ObjectId;
  fullName: string;
  email: string;
  phoneNumber: string;
  message: string;
  status: 'pending' | 'responded' | 'archived';
  userId?: ObjectId;              // Optional - if user is logged in
  createdAt: Date;
  respondedAt?: Date;
  respondedBy?: ObjectId;
  adminNotes?: string;
}

export interface InquiryResponse {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  message: string;
  status: string;
  createdAt: string;
  respondedAt?: string;
}

export interface CreateInquiryInput {
  fullName: string;
  email: string;
  phoneNumber: string;
  message: string;
  userId?: string;
}

export interface UpdateInquiryInput {
  status?: 'pending' | 'responded' | 'archived';
  adminNotes?: string;
  respondedBy?: string;
}