// src/app/api/admin/transactions/[id]/verify/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { verifyTransaction } from '@/services/backened/transaction.service';
import { verifyAuth } from '@/middleware/auth';

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }   
) {
  try {
    const { id } = await context.params;
    const userId = await verifyAuth(request);

    await verifyTransaction(id, userId);
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    // ✅ Type-safe error handling
    const message =
      error instanceof Error ? error.message : 'An unexpected error occurred';

    return NextResponse.json(
      { success: false, error: message },
      { status: 400 }
    );
  }
}
