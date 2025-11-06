import { NextRequest } from 'next/server';
import { verifyAuth } from '@/middleware/auth';
import { getInquiryById, updateInquiryStatus } from '@/services/backened/inquiry.service';
import { createSuccessResponse } from '@/lib/utils/api-response';
import { handleError } from '@/lib/utils/error-handler';

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> } 
) {
  try {
    const { id } = await context.params; 
    await verifyAuth(req);
    const inquiry = await getInquiryById(id);
    return createSuccessResponse({ inquiry });
  } catch (error) {
    return handleError(error);
  }
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> } 
) {
  try {
    const { id } = await context.params;
    const userId = await verifyAuth(req);
    const body = await req.json();

    const inquiry = await updateInquiryStatus(id, body, userId);

    return createSuccessResponse({ inquiry }, 'Inquiry updated successfully');
  } catch (error) {
    return handleError(error);
  }
}
