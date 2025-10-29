import { NextRequest } from 'next/server';
import { verifyAuth } from '@/middleware/auth';
import { createUserProfile, getProfileByUserId } from '@/services/backened/profile.service';
import { createSuccessResponse, createCreatedResponse } from '@/lib/utils/api-response';
import { handleError } from '@/lib/utils/error-handler';
import {
  validateRequiredProfileFields,
  validateHeight,
  validatePhoneNumber,
  validateMonthlyIncome,
  validateNumberOfSiblings,
} from '@/lib/validators/profile';

export async function POST(req: NextRequest) {
  try {
    const userId = await verifyAuth(req);
    const body = await req.json();

    // Validate required fields
    const requiredFields = [
      'firstName', 'lastName', 'email', 'gender', 'dateOfBirth',
      'height', 'bodyType', 'complexion', 'fathersName', 'fatherAlive',
      'fathersOccupation', 'numberOfBrothers', 'numberOfSisters',
      'numberOfMarriedBrothers', 'parentsMobileNo', 'parentsPhone',
      'address', 'fromCountry', 'fromState', 'fromCity',
      'livesInCountry', 'livesInState', 'livesInCity',
      'religion', 'caste', 'islamicEducation', 'qualification',
      'degree', 'profession', 'monthlyIncome', 'maritalStatus',
      'lifeStyle', 'houseStatus'
    ];

    validateRequiredProfileFields(body, requiredFields);

    // Validate specific fields
    validateHeight(body.height);
    validatePhoneNumber(body.parentsMobileNo);
    validatePhoneNumber(body.parentsPhone);
    validateMonthlyIncome(body.monthlyIncome);
    validateNumberOfSiblings(body.numberOfBrothers, 'Number of brothers');
    validateNumberOfSiblings(body.numberOfSisters, 'Number of sisters');
    validateNumberOfSiblings(body.numberOfMarriedBrothers, 'Number of married brothers');
    

    // Create profile
    const { profile, profileId } = await createUserProfile({
      userId,
      ...body,
    });

    return createCreatedResponse(
      { profile },
      'Profile created successfully'
    );
  } catch (error) {
    return handleError(error);
  }
}

export async function GET(req: NextRequest) {
  try {
    const userId = await verifyAuth(req);
    const profile = await getProfileByUserId(userId);
    return createSuccessResponse({ profile });
  } catch (error) {
    return handleError(error);
  }
}