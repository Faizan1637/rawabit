import { ObjectId } from 'mongodb';

export interface Transaction {
  _id?: ObjectId;
  userId: string;
  packageId: ObjectId;
  packageTitle: string;
  amount: number;
  paymentMethod: 'bank_transfer' | 'cash' | 'telenor_easypaisa';
  mobileNo: string;
  transactionRefNo?: string;
  status: 'pending' | 'verifying' | 'verified' | 'rejected';
  verifiedBy?: ObjectId;
  verifiedAt?: Date;
  rejectionReason?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TransactionResponse {
  id?: string;
  packageTitle: string;
  mobileNo: string;
  transactionDetails: string;
  amount: number;
  status: string;
  createdAt: string;
}

export interface CreateTransactionInput {
  packageId: string;
  paymentMethod: 'bank_transfer' | 'cash' | 'telenor_easypaisa';
  mobileNo: string;
  transactionRefNo?: string;
}