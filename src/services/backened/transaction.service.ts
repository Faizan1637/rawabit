import {
  createTransaction,
  findTransactionById,
  findUserTransactions,
  updateTransactionStatus,
} from '@/repositries/transaction.repositories';
import { findPackageById } from '@/repositries/package.repositories';
import { Transaction, TransactionResponse, CreateTransactionInput } from '@/types/transaction';
import { AppError } from '@/lib/utils/error-handler';
import { HTTP_STATUS } from '@/constants/responseConstant/status-codes';
import { createNewSubscription } from './subscription.service';

export const sanitizeTransaction = (txn: Transaction): TransactionResponse => {
  let transactionDetails = `${txn.paymentMethod.replace('_', ' ').toUpperCase()}`;
  if (txn.transactionRefNo) {
    transactionDetails += ` - Ref: ${txn.transactionRefNo}`;
  }

  return {
    id: txn._id!.toString(),
    packageTitle: txn.packageTitle,
    mobileNo: txn.mobileNo,
    transactionDetails,
    amount: txn.amount,
    status: txn.status,
    createdAt: txn.createdAt.toISOString().split('T')[0],
  };
};

export const createNewTransaction = async (
  userId: string,
  input: CreateTransactionInput
): Promise<TransactionResponse> => {
  const pkg = await findPackageById(input.packageId);
  if (!pkg) {
    throw new AppError('Package not found', HTTP_STATUS.NOT_FOUND);
  }

  const transactionData: Omit<Transaction, '_id'> = {
    userId: userId as any,
    packageId: input.packageId as any,
    packageTitle: pkg.name,
    amount: pkg.price,
    paymentMethod: input.paymentMethod,
    mobileNo: input.mobileNo,
    transactionRefNo: input.transactionRefNo,
    status: 'verifying',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const transactionId = await createTransaction(transactionData);
  const transaction = { ...transactionData, _id: transactionId as any };
  
  return sanitizeTransaction(transaction as Transaction);
};

export const verifyTransaction = async (
  transactionId: string,
  adminUserId: string
): Promise<{ transaction: TransactionResponse; message: string }> => {
  const transaction = await findTransactionById(transactionId);
  if (!transaction) {
    throw new AppError('Transaction not found', HTTP_STATUS.NOT_FOUND);
  }

  if (transaction.status === 'verified') {
    throw new AppError('Transaction already verified', HTTP_STATUS.BAD_REQUEST);
  }

  // Update transaction status
  await updateTransactionStatus(transactionId, 'verified', adminUserId);

  // Create subscription
  await createNewSubscription(
    transaction.userId.toString(),
    transaction.packageId.toString()
  );

  const updatedTransaction = await findTransactionById(transactionId);
  
  return {
    transaction: sanitizeTransaction(updatedTransaction!),
    message: 'Transaction verified and subscription created successfully',
  };
};

export const rejectTransaction = async (
  transactionId: string,
  adminUserId: string,
  reason: string
): Promise<TransactionResponse> => {
  await updateTransactionStatus(transactionId, 'rejected', adminUserId, reason);
  const transaction = await findTransactionById(transactionId);
  return sanitizeTransaction(transaction!);
};

export const getUserTransactions = async (userId: string) => {
  const transactions = await findUserTransactions(userId);
  return transactions.map(sanitizeTransaction);
};