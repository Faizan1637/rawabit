// src/app/api/admin/transactions/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getPendingTransactions } from '@/repositries/transaction.repositories';
import { verifyAuth } from '@/middleware/auth';
import { getUser } from '@/services/backened/user.service';
import { handleError, AppError } from '@/lib/utils/error-handler';
import { ERROR_MESSAGES } from '@/constants/responseConstant/message';
import { HTTP_STATUS } from '@/constants/responseConstant/status-codes';

export async function GET(request: NextRequest) {
  try {
    const userId = await verifyAuth(request);

    const user = await getUser(userId);
    
    // Check if user is admin
    if (user.role !== 'admin') {
      throw new AppError(ERROR_MESSAGES.FORBIDDEN, HTTP_STATUS.FORBIDDEN);
    }

    const txns = await getPendingTransactions();
    
    return NextResponse.json({
      success: true,
      data: { transactions: txns },
    });
  } catch (error) {
    return handleError(error);
  }
}