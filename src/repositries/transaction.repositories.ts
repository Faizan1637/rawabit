import { ObjectId } from 'mongodb';
import { getDatabase } from '@/lib/db/mongodb';
import { Transaction } from '@/types/transaction';

const COLLECTION = 'transactions';

/** Insert a new transaction and return its string id */
export const createTransaction = async (
  transaction: Omit<Transaction, '_id'>
): Promise<string> => {
  const db = await getDatabase();
  const result = await db.collection<Transaction>(COLLECTION).insertOne(transaction);
  return result.insertedId.toString();
};

/** Find one transaction by its id */
export const findTransactionById = async (id: string): Promise<Transaction | null> => {
  const db = await getDatabase();
  return db
    .collection<Transaction>(COLLECTION)
    .findOne({ _id: new ObjectId(id) });
};

/** All transactions of a user (newest first) */
export const findUserTransactions = async (userId: string): Promise<Transaction[]> => {
  const db = await getDatabase();
  return db
    .collection<Transaction>(COLLECTION)
    .find({ userId })
    .sort({ createdAt: -1 })
    .toArray();
};

/** Update status (and optional verification fields) */
export const updateTransactionStatus = async (
  id: string,
  status: Transaction['status'],
  verifiedBy?: string,
  rejectionReason?: string
): Promise<boolean> => {
  const db = await getDatabase();

  const updateData: Partial<
    Pick<
      Transaction,
      | 'status'
      | 'updatedAt'
      | 'verifiedBy'
      | 'verifiedAt'
      | 'rejectionReason'
    >
  > = {
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

/** All transactions that are waiting for admin verification */
export const findPendingTransactions = async (): Promise<Transaction[]> => {
  const db = await getDatabase();
  return db
    .collection<Transaction>(COLLECTION)
    .find({ status: 'verifying' })
    .sort({ createdAt: -1 })
    .toArray();
};

/** Light-weight list for admin UI (no sensitive fields) */
export const getPendingTransactions = async (): Promise<
  {
    id: string;
    packageTitle: string;
    amount: number;
    paymentMethod: Transaction['paymentMethod'];
    mobileNo: string;
  }[]
> => {
  const db = await getDatabase();
  const transactions = await db
    .collection<Transaction>(COLLECTION)
    .find({ status: 'verifying' })
    .toArray();

  return transactions.map(t => ({
    id: t._id!.toString(),
    packageTitle: t.packageTitle,
    amount: t.amount,
    paymentMethod: t.paymentMethod,
    mobileNo: t.mobileNo,
  }));
};