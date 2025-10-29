import { NextRequest } from 'next/server';
import { verifyAuth } from '@/middleware/auth';
import { getProfileById, updateUserProfile, removeProfile } from '@/services/backened/profile.service';
import { createSuccessResponse } from '@/lib/utils/api-response';
import { handleError } from '@/lib/utils/error-handler';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await verifyAuth(req);
    const profile = await getProfileById(params.id);
    return createSuccessResponse({ profile });
  } catch (error) {
    return handleError(error);
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = await verifyAuth(req);
    const body = await req.json();

    // User can only update their own profile
    const profile = await updateUserProfile(userId, body);

    return createSuccessResponse(
      { profile },
      'Profile updated successfully'
    );
  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const userId = await verifyAuth(req);
    await removeProfile(userId);
    return createSuccessResponse(null, 'Profile deleted successfully');
  } catch (error) {
    return handleError(error);
  }
}