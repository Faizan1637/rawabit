import { NextRequest } from 'next/server';
import { verifyAuth } from '@/middleware/auth';
import { searchPartnerProfiles } from '@/services/backened/search.service';
import { findUserById } from '@/repositries/user.repositories';
import { createSuccessResponse } from '@/lib/utils/api-response';
import { handleError, AppError } from '@/lib/utils/error-handler';
import { SearchFilters } from '@/types/search';
import { HTTP_STATUS } from '@/constants/responseConstant/status-codes';

export async function GET(req: NextRequest) {
  try {
    // Verify authentication
    const userId = await verifyAuth(req);
    
    // Get current user from database to determine gender
    const currentUser = await findUserById(userId);
    if (!currentUser) {
      throw new AppError('User not found', HTTP_STATUS.NOT_FOUND);
    }
    
    // Parse query parameters
    const { searchParams } = new URL(req.url);
    
    const filters: SearchFilters = {
      country: searchParams.get('country') || undefined,
      state: searchParams.get('state') || undefined,
      city: searchParams.get('city') || undefined,
      gender:searchParams.get('gender') || undefined,
      religion: searchParams.get('religion') || undefined,
      maslak: searchParams.get('maslak') || undefined,
      islamicEducation: searchParams.get('islamicEducation') || undefined,
      caste: searchParams.get('caste') || undefined,
      maritalStatus: searchParams.get('maritalStatus') || undefined,
      minQualification: searchParams.get('minQualification') || undefined,
      serialNo: searchParams.get('serialNo') || undefined,
      minAge: searchParams.get('minAge') ? parseInt(searchParams.get('minAge')!) : undefined,
      maxAge: searchParams.get('maxAge') ? parseInt(searchParams.get('maxAge')!) : undefined,
      page: searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1,
      limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 12,
    };

    // Search profiles - pass user's gender
    const results = await searchPartnerProfiles(filters,userId);

    return createSuccessResponse(results);
  } catch (error) {
    return handleError(error);
  }
}