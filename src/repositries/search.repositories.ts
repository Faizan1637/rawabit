import { getDatabase } from '@/lib/db/mongodb';
import { Profile } from '@/types/profile';
import { SearchFilters } from '@/types/search';
import { getAgeRange } from '@/lib/utils/age-calculator';

const COLLECTION = 'profiles';

export const searchProfiles = async (
  filters: SearchFilters,
  currentUserGender: string,
  currentUserId?: string  // ADD this parameter
) => {
  const db = await getDatabase();
  const { page = 1, limit = 12 } = filters;
  const skip = (page - 1) * limit;

  // Build query
  const query: any = {
    isComplete: true, // Only show complete profiles
  };

  // Exclude current user's profile
  if (currentUserId) {
    query.userId = { $ne: new Object(currentUserId) };
  }

  // Gender filter - show opposite gender
  if (currentUserGender === 'male') {
    query.gender = 'female';
  } else if (currentUserGender === 'female') {
    query.gender = 'male';
  }

  // ... rest of the filters remain the same ...
  
  // Location filters
  if (filters.country) {
    query.livesInCountry = filters.country;
  }
  if (filters.state) {
    query.livesInState = filters.state;
  }
  if (filters.city) {
    query.livesInCity = filters.city;
  }

  // Religious & Cultural filters
  if (filters.religion) {
    query.religion = filters.religion;
  }
  if (filters.maslak) {
    query.maslak = filters.maslak;
  }
  if (filters.islamicEducation) {
    query.islamicEducation = filters.islamicEducation;
  }
  if (filters.caste) {
    query.caste = filters.caste;
  }

  // Marital status
  if (filters.maritalStatus) {
    query.maritalStatus = filters.maritalStatus;
  }

  // Age range filter
  if (filters.minAge || filters.maxAge) {
    const { minDate, maxDate } = getAgeRange(filters.minAge, filters.maxAge);
    query.dateOfBirth = {};
    if (minDate) {
      query.dateOfBirth.$gte = minDate;
    }
    if (maxDate) {
      query.dateOfBirth.$lte = maxDate;
    }
  }

  // Qualification filter
  if (filters.minQualification) {
    query.qualification = filters.minQualification;
  }

  // Serial number search
  if (filters.serialNo) {
    query._id = filters.serialNo;
  }

  // Execute query
  const profiles = await db
    .collection<Profile>(COLLECTION)
    .find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .toArray();

  const total = await db.collection<Profile>(COLLECTION).countDocuments(query);

  return { profiles, total };
};