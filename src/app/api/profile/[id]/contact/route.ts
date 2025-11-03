import { NextRequest } from 'next/server';
import { verifyAuth } from '@/middleware/auth';
import { viewProfileContact } from '@/services/backened/subscription.service';
import { getProfileById } from '@/services/backened/profile.service';
import { createSuccessResponse } from '@/lib/utils/api-response';
import { handleError, AppError } from '@/lib/utils/error-handler';
import { HTTP_STATUS } from '@/constants/responseConstant/status-codes';

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = await verifyAuth(req);
    
    // Get profile to get contact info
    const profile = await getProfileById(params.id);
    
    // Record view and check subscription
    const result = await viewProfileContact(
      userId,
      params.id,
      profile.fullName
    );

    if (!result.canView) {
      throw new AppError(result.message, HTTP_STATUS.FORBIDDEN);
    }

    // Return contact information
    return createSuccessResponse({
      parentsMobileNo: profile.parentsMobileNo,
      parentsPhone: profile.parentsPhone,
      message: result.message,
      subscription: result.subscription,
    });
  } catch (error) {
    return handleError(error);
  }
}
