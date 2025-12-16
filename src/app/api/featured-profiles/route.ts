// app/api/featured-profiles/route.ts
// import { NextRequest } from 'next/server';
import { getFeaturedProfilesForHomepage } from '@/services/backened/featured-profiles.service';
import { createSuccessResponse } from '@/lib/utils/api-response';
import { handleError } from '@/lib/utils/error-handler';

/**
 * GET /api/featured-profiles
 * Public endpoint - no authentication required
 * Returns latest 8 profiles from users with active subscriptions
 */
export async function GET() {
  try {
    const profiles = await getFeaturedProfilesForHomepage();

    return createSuccessResponse({
      profiles,
      count: profiles.length,
    });
  } catch (error) {
    return handleError(error);
  }
}