import { ObjectId } from 'mongodb';
import { getDatabase } from '@/lib/db/mongodb';
import { Transaction } from '@/types/transaction';

const COLLECTION = 'transactions';

export const createTransaction = async (
  transaction: Omit<Transaction, '_id'>
): Promise<string> => {
  const db = await getDatabase();
  const result = await db.collection<Transaction>(COLLECTION).insertOne(transaction);
  return result.insertedId.toString();
};

export const findTransactionById = async (id: string): Promise<Transaction | null> => {
  const db = await getDatabase();
  return await db
    .collection<Transaction>(COLLECTION)
    .findOne({ _id: new ObjectId(id) });
};

export const findUserTransactions = async (userId: string) => {
  const db = await getDatabase();
  return await db
    .collection<Transaction>(COLLECTION)
    .find({ userId: new ObjectId(userId) })
    .sort({ createdAt: -1 })
    .toArray();
};

export const updateTransactionStatus = async (
  id: string,
  status: string,
  verifiedBy?: string,
  rejectionReason?: string
): Promise<boolean> => {
  const db = await getDatabase();
  const updateData: any = {
    status,
    updatedAt: new Date(),
  };

  if (status === 'verified' && verifiedBy) {
    updateData.verifiedBy = new ObjectId(verifiedBy);
    updateData.verifiedAt = new Date();
  }

  if (rejectionReason) {
    updateData.rejectionReason = rejectionReason;
  }

  const result = await db
    .collection<Transaction>(COLLECTION)
    .updateOne({ _id: new ObjectId(id) }, { $set: updateData });

  return result.modifiedCount > 0;
};

export const findPendingTransactions = async () => {
  const db = await getDatabase();
  return await db
    .collection<Transaction>(COLLECTION)
    .find({ status: 'verifying' })
    .sort({ createdAt: -1 })
    .toArray();
};