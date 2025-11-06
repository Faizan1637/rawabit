// src/app/api/admin/transactions/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getPendingTransactions } from '@/repositries/transaction.repositories';
import { verifyAuth } from '@/middleware/auth';
import { getUser } from '@/services/backened/user.service';

export async function GET(request: NextRequest) {
  try {
    const userId = await verifyAuth(request);

    const user=await getUser(userId)
    // Optional: check if user is admin
    if (!(user.role === 'admin')) throw new Error('Unauthorized');

    const txns = await getPendingTransactions();
    return NextResponse.json({
      success: true,
      data: { transactions: txns },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}