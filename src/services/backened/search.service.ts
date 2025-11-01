import { searchProfiles } from '@/repositries/search.repositories';
import { SearchFilters, ProfileSearchResult, SearchResponse } from '@/types/search';
import { calculateAge } from '@/lib/utils/age-calculator';
import { Profile } from '@/types/profile';

const sanitizeSearchResult = (profile: Profile): ProfileSearchResult => {
  return {
    id: profile._id!.toString(),
    firstName: profile.firstName,
    lastName: profile.lastName,
    fullName: `${profile.firstName} ${profile.lastName}`,
    gender: profile.gender,
    age: calculateAge(profile.dateOfBirth),
    maritalStatus: profile.maritalStatus,
    city: profile.livesInCity,
    state: profile.livesInState,
    country: profile.livesInCountry,
    qualification: profile.qualification,
    profession: profile.profession,
    caste: profile.caste,
    religion: profile.religion,
    islamicEducation: profile.islamicEducation,
    serialNo: profile._id!.toString().slice(-6), // Last 6 chars as serial
  };
};

export const searchPartnerProfiles = async (
  filters: SearchFilters,
  currentUserGender: string,
  currentUserId?: string  // ADD this parameter
): Promise<SearchResponse> => {
  const { page = 1, limit = 12 } = filters;
  
  const { profiles, total } = await searchProfiles(
    filters, 
    currentUserGender,
    currentUserId  // PASS it here
  );

  return {
    profiles: profiles.map(sanitizeSearchResult),
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
};