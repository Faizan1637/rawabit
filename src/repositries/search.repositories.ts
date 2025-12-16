import { ObjectId } from 'mongodb';
import { getDatabase } from '@/lib/db/mongodb';
import { Profile } from '@/types/profile';
import { SearchFilters } from '@/types/search';
import { getAgeRange } from '@/lib/utils/age-calculator';

const COLLECTION = 'profiles';

interface ProfileQuery {
  [key: string]: unknown;
}

export const searchProfiles = async (
  filters: SearchFilters,
  currentUserId?: string
) => {
  const db = await getDatabase();
  const { page = 1, limit = 12 } = filters;
  const skip = (page - 1) * limit;

  // ✅ Linter-safe query initialization
  const query: ProfileQuery = {
    isComplete: true,
  };

  // ✅ Exclude current user's profile safely
  if (currentUserId) {
    try {
      query.userId = { $ne: new ObjectId(currentUserId) };
    } catch {
      // Ignore invalid ObjectId
    }
  }

  // ✅ Gender filter — opposite gender
  // if (currentUserGender === 'male') query.gender = 'female';
  // else if (currentUserGender === 'female') query.gender = 'male';

  //Gender filters
  if(filters.gender)query.gender=filters.gender;

  // ✅ Location filters
  if (filters.country) query.livesInCountry = filters.country;
  if (filters.state) query.livesInState = filters.state;
  if (filters.city) query.livesInCity = filters.city;

  // ✅ Religious & Cultural filters
  if (filters.religion) query.religion = filters.religion;
  if (filters.maslak) query.maslak = filters.maslak;
  if (filters.islamicEducation) query.islamicEducation = filters.islamicEducation;
  if (filters.caste) query.caste = filters.caste;

  // ✅ Marital status
  if (filters.maritalStatus) query.maritalStatus = filters.maritalStatus;

  // ✅ Age range filter
  if (filters.minAge || filters.maxAge) {
    const { minDate, maxDate } = getAgeRange(filters.minAge, filters.maxAge);
    const dateFilter: Record<string, Date> = {};
    if (minDate) dateFilter.$gte = minDate;
    if (maxDate) dateFilter.$lte = maxDate;
    query.dateOfBirth = dateFilter;
  }

  // ✅ Qualification filter
  if (filters.minQualification) query.qualification = filters.minQualification;

  // ✅ Serial number search
  if (filters._id) {
    try {
      query._id = new ObjectId(filters._id);
    } catch {
      query._id = filters.serialNo;
    }
  }

  // ✅ Execute query safely
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
