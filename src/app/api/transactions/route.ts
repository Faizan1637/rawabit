import { NextRequest } from 'next/server';
import { verifyAuth } from '@/middleware/auth';
import { createNewTransaction, getUserTransactions } from '@/services/backened/transaction.service';
import { createSuccessResponse, createCreatedResponse } from '@/lib/utils/api-response';
import { handleError } from '@/lib/utils/error-handler';
import { validateRequiredProfileFields } from '@/lib/validators/profile';

export async function POST(req: NextRequest) {
  try {
    const userId = await verifyAuth(req);
    const body = await req.json();

    validateRequiredProfileFields(body, ['packageId', 'paymentMethod', 'mobileNo']);

    const transaction = await createNewTransaction(userId, body);

    return createCreatedResponse(
      { transaction },
      'Payment submitted successfully. Please wait for verification.'
    );
  } catch (error) {
    return handleError(error);
  }
}

export async function GET(req: NextRequest) {
  try {
    const userId = await verifyAuth(req);
    const transactions = await getUserTransactions(userId);
    
    return createSuccessResponse({ transactions });
  } catch (error) {
    return handleError(error);
  }
}