import { NextRequest } from 'next/server';
import { verifyAuth } from '@/middleware/auth';
import { createUserProfile, getProfileByUserId,removeProfile } from '@/services/backened/profile.service';
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
    console.log("Entering ")
    const userId = await verifyAuth(req);
    console.log("User Id is ",userId)
    const body = await req.json();
    console.log("Body is ", body)

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
    const { profile } = await createUserProfile({
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

export async function DELETE(req: NextRequest) {
  try {
    const userId = await verifyAuth(req);
    const profile = await removeProfile(userId);
    return createSuccessResponse({ profile });
  } catch (error) {
    return handleError(error);
  }
}