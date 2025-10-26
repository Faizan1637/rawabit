import { NextRequest } from 'next/server';
import { verifyAuth } from '@/middleware/auth';
import { getAllUsers } from '@/services/user.service';
import { createSuccessResponse } from '@/lib/utils/api-response';
import { handleError } from '@/lib/utils/error-handler';

export async function GET(req: NextRequest) {
  try {
    await verifyAuth(req);
    
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    
    const result = await getAllUsers(page, limit);
    return createSuccessResponse(result);
  } catch (error) {
    return handleError(error);
  }
}